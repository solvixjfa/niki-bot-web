<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
    <div class="text-center space-y-4">
      <div class="w-12 h-12 mx-auto border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      <p class="text-sm text-gray-500">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getApiUrl } from '../../lib/api'
import { useAuth } from '../../composables/useAuth'

const router = useRouter()
const route = useRoute()
const message = ref('Menghubungkan ke Discord...')
const { setAuth } = useAuth()

onMounted(async () => {
  const code = route.query.code
  if (!code) {
    message.value = 'Kode otorisasi tidak ditemukan. Kembali ke beranda...'
    setTimeout(() => router.push('/'), 1500)
    return
  }

  try {
    const res = await fetch(`${getApiUrl()}/auth/discord`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, redirect_uri: `${window.location.origin}/auth/callback` }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.detail || 'Login failed')
    }
    const data = await res.json()
    setAuth(data.access_token, data.user)
    
    // Kalau user punya server, lempar ke dashboard. Kalau nggak, lempar ke landing dengan pesan.
    if (data.servers && data.servers.length > 0) {
      router.push('/app')
    } else {
      message.value = 'Kamu belum setup bot di server manapun. Kembali ke beranda...'
      setTimeout(() => router.push('/'), 2000)
    }
  } catch (err) {
    message.value = 'Login gagal: ' + err.message
    setTimeout(() => router.push('/'), 2500)
  }
})
</script>
