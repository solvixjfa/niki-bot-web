const API_URL = import.meta.env.VITE_API_URL || 'https://clashofclansbot-production.up.railway.app'

// --- MEMORY CACHE ---
const cache = new Map()
const CACHE_TTL = 2 * 60 * 1000 // 2 menit (dalam milidetik)

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('niki_token')
  const activeGuildId = localStorage.getItem('niki_active_guild')
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }
  
  if (token) headers['Authorization'] = `Bearer ${token}`
  if (activeGuildId) headers['X-Guild-Id'] = activeGuildId

  const method = (options.method || 'GET').toUpperCase()
  // Bikin cache key unik berdasarkan URL dan Guild ID (biar data server A gak ketuker sama server B)
  const cacheKey = `${activeGuildId}_${path}`

  // Cek Cache (Hanya untuk GET)
  if (method === 'GET' && path !== '/auth/me' && cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)
    if (Date.now() - cached.timestamp < CACHE_TTL) {
      // console.log('Serving from cache:', path)
      return cached.data
    } else {
      cache.delete(cacheKey) // Hapus cache kalau udah expired
    }
  }

  // Fetch ke Railway
  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  
  if (res.status === 401) {
    localStorage.removeItem('niki_token')
    localStorage.removeItem('niki_user')
    localStorage.removeItem('niki_active_guild')
    window.location.href = '/'
    throw new Error('Unauthorized')
  }
  
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || 'Request failed')
  }

  const data = await res.json()

  // Simpan ke Cache (Hanya untuk GET)
  if (method === 'GET' && path !== '/auth/me') {
    cache.set(cacheKey, { data, timestamp: Date.now() })
  }

  return data
}

export function getApiUrl() {
  return API_URL
}

// Fungsi opsional buat bersihin cache manual
export function clearApiCache() {
  cache.clear()
}
