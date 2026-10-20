<template>
  <div class="min-h-screen bg-white text-gray-900 font-sans selection:bg-brand selection:text-white">
    <Navbar @login="handleLogin" />
    
    <main>
      <Hero @login="handleLogin" />
      
      <!-- SOCIAL PROOF STRIP (Putih/Ungu soft) -->
      <section class="border-y border-purple-100 bg-purple-50/30">
        <div class="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p class="text-sm font-medium text-gray-500 uppercase tracking-widest text-center md:text-left">
            Dipercaya oleh Clan Leader di Indonesia
          </p>
          <div class="flex items-center gap-8 md:gap-12">
            <div class="text-center">
              <p class="text-2xl font-black text-gray-900">29+</p>
              <p class="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Klan Aktif</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-black text-gray-900">100+</p>
              <p class="text-[10px] text-gray-500 uppercase font-bold tracking-wider">War Dianalisis</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-black text-gray-900">10k+</p>
              <p class="text-[10px] text-gray-500 uppercase font-bold tracking-wider">AI Credits</p>
            </div>
          </div>
        </div>
      </section>

      <Features />
      <HowItWorks />
      <Showcase />
      <Pricing @login="handleLogin" />
      <FAQ />
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Navbar from '../../components/Navbar.vue'
import Hero from '../../components/Hero.vue'
import Features from '../../components/Features.vue'
import HowItWorks from '../../components/HowItWorks.vue'
import Showcase from '../../components/Showcase.vue'
import Pricing from '../../components/Pricing.vue'
import FAQ from '../../components/FAQ.vue'
import Footer from '../../components/Footer.vue'

const router = useRouter()

function handleLogin() {
  const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID
  if (!clientId) return
  const redirect = `${window.location.origin}/auth/callback`
  const url = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirect)}&response_type=code&scope=identify%20guilds`
  window.location.href = url
}
</script>
