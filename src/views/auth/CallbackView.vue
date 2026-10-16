<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-950 text-white">
    <div class="text-center space-y-4">
      <div class="w-12 h-12 mx-auto border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-sm text-slate-400">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getApiUrl } from '../../lib/api'

const router = useRouter()
const route = useRoute()
const message = ref('Authenticating...')

onMounted(async () => {
  const code = route.query.code
  if (!code) {
    message.value = 'Missing authorization code. Redirecting...'
    setTimeout(() => router.push('/'), 1500)
    return
  }

  try {
    const res = await fetch(`${getApiUrl()}/auth/discord`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.detail || 'Login failed')
    }
    const data = await res.json()
    localStorage.setItem('niki_token', data.access_token)
    localStorage.setItem('niki_user', JSON.stringify(data.user))
    router.push('/app')
  } catch (err) {
    message.value = 'Login failed: ' + err.message
    setTimeout(() => router.push('/'), 2500)
  }
})
</script>
