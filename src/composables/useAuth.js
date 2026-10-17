import { ref, computed } from 'vue'

const user = ref(null)
const token = ref(localStorage.getItem('niki_token') || null)

const savedUser = localStorage.getItem('niki_user')
if (savedUser) {
  try { user.value = JSON.parse(savedUser) } catch(e) {}
}

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value)

  function loginWithDiscord() {
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID
    if (!clientId) {
      alert('Discord Client ID belum di-set di environment Vercel.')
      return
    }
    const redirect = `${window.location.origin}/auth/callback`
    const url = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirect)}&response_type=code&scope=identify%20guilds`
    window.location.href = url
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('niki_token')
    localStorage.removeItem('niki_user')
    window.location.href = '/'
  }

  function setAuth(newToken, newUser) {
    token.value = newToken
    user.value = newUser
    localStorage.setItem('niki_token', newToken)
    localStorage.setItem('niki_user', JSON.stringify(newUser))
  }

  return { user, token, isAuthenticated, loginWithDiscord, logout, setAuth }
}
