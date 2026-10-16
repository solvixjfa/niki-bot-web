<template>
  <div>
    <Navbar @login="handleLogin" />
    <Hero />
    <Features />
    <Documentation />
    <Footer />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Navbar from '../../components/Navbar.vue'
import Hero from '../../components/Hero.vue'
import Features from '../../components/Features.vue'
import Documentation from '../../components/Documentation.vue'
import Footer from '../../components/Footer.vue'
import { getApiUrl } from '../../lib/api'

const router = useRouter()

function handleLogin() {
  const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID
  if (!clientId) {
    alert('Discord Client ID belum di-set. Cek environment variable VITE_DISCORD_CLIENT_ID.')
    return
  }
  const redirect = `${window.location.origin}/auth/callback`
  const url = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirect)}&response_type=code&scope=identify%20guilds`
  window.location.href = url
}
</script>
