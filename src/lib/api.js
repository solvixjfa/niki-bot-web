const API_URL = import.meta.env.VITE_API_URL || 'https://clashofclansbot-production.up.railway.app'

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('niki_token')
  const activeGuildId = localStorage.getItem('niki_active_guild')
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  // Inject header khusus jika user sudah memilih server
  if (activeGuildId) {
    headers['X-Guild-Id'] = activeGuildId
  }

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
  return res.json()
}

export function getApiUrl() {
  return API_URL
}
