<template>
  <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 group">
        <div class="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-white font-black group-hover:scale-105 transition-transform shadow-md shadow-brand/20">N</div>
        <span class="font-bold text-lg text-gray-900 tracking-tight">Niki CoC</span>
      </RouterLink>

      <!-- Desktop Menu (Sembunyi di Mobile) -->
      <div class="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
        <a href="#fitur" class="hover:text-brand transition-colors">Fitur</a>
        <a href="#harga" class="hover:text-brand transition-colors">Harga</a>
        <a href="#faq" class="hover:text-brand transition-colors">FAQ</a>
      </div>

      <!-- Desktop Actions -->
      <div class="hidden md:flex items-center gap-3">
        <button @click="$emit('login')" class="text-sm font-bold text-gray-700 hover:text-brand transition-colors px-4 py-2">Login</button>
        <a href="https://discord.com/oauth2/authorize?client_id=1553040946688696482&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" class="px-5 py-2 bg-brand text-white text-sm font-bold rounded-xl hover:bg-brand-dark transition-colors shadow-lg shadow-brand/30">
          Invite Bot
        </a>
      </div>

      <!-- Hamburger Button (Muncul di Mobile) -->
      <button @click="isOpen = !isOpen" class="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
        <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>

    <!-- Mobile Menu Dropdown -->
    <Transition name="slide">
      <div v-if="isOpen" class="md:hidden absolute w-full left-0 top-16 bg-white border-b border-gray-100 shadow-xl overflow-hidden">
        <div class="flex flex-col p-6 space-y-4">
          <!-- Link Navigasi -->
          <a href="#fitur" @click="isOpen = false" class="text-base font-bold text-gray-700 py-2 border-b border-gray-50">Fitur</a>
          <a href="#harga" @click="isOpen = false" class="text-base font-bold text-gray-700 py-2 border-b border-gray-50">Harga</a>
          <a href="#faq" @click="isOpen = false" class="text-base font-bold text-gray-700 py-2 border-b border-gray-50">FAQ</a>
          
          <!-- Tombol CTA di Mobile -->
          <div class="pt-2 flex flex-col gap-3">
            <button @click="$emit('login'); isOpen = false" class="w-full py-3 bg-gray-900 text-white text-sm font-bold rounded-xl shadow-sm">Buka Dashboard</button>
            <a href="https://discord.com/oauth2/authorize?client_id=1553040946688696482&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" class="w-full py-3 bg-brand text-white text-sm font-bold rounded-xl text-center shadow-md shadow-brand/20 block">Invite Bot ke Server</a>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
defineEmits(['login'])
const isOpen = ref(false)
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.2s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
