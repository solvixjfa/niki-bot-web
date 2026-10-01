<script setup>
import { ref } from 'vue'

const isSidebarOpen = ref(false)

const navLinks = [
  { name: 'Fitur', href: '#fitur' },
  { name: 'Dokumentasi', href: '#dokumentasi' },
  { name: 'Panduan', href: '#panduan' },
  { name: 'Kontak', href: '#kontak' }
]
</script>

<template>
  <header class="border-b border-purple-100 sticky top-0 bg-white/95 backdrop-blur-md z-50">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="font-extrabold text-xl text-brand tracking-tight">Niki CoC Bot</div>

      <!-- Navigasi Desktop -->
      <nav class="hidden md:flex gap-8 items-center">
        <a v-for="link in navLinks" :key="link.name" :href="link.href" class="text-sm font-medium text-gray-600 hover:text-brand transition-colors">
          {{ link.name }}
        </a>
        <a href="https://discord.com/oauth2/authorize?client_id=1553040946688696482&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" class="px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark transition-colors shadow-sm">
          Invite Bot
        </a>
      </nav>

      <!-- Tombol Hamburger Mobile -->
      <button @click="isSidebarOpen = true" class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-purple-50">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <!-- Mobile Sidebar / Drawer Overlay -->
    <div v-if="isSidebarOpen" class="fixed inset-0 bg-black/40 z-50 md:hidden" @click="isSidebarOpen = false"></div>

    <!-- Mobile Sidebar Content -->
    <div class="fixed top-0 right-0 h-full w-64 bg-white z-50 p-6 shadow-2xl transition-transform duration-300 md:hidden flex flex-col justify-between" :class="isSidebarOpen ? 'translate-x-0' : 'translate-x-full'">
      <div>
        <div class="flex justify-between items-center mb-8">
          <span class="font-bold text-lg text-brand">Menu Niki Bot</span>
          <button @click="isSidebarOpen = false" class="text-gray-500 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <nav class="flex flex-col gap-5">
          <a v-for="link in navLinks" :key="link.name" :href="link.href" @click="isSidebarOpen = false" class="text-base font-medium text-gray-700 hover:text-brand">
            {{ link.name }}
          </a>
        </nav>
      </div>
      <div class="pt-6 border-t border-purple-100">
        <a href="https://discord.com/oauth2/authorize?client_id=1553040946688696482&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" class="block w-full py-3 text-center bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark">
          Invite Bot
        </a>
      </div>
    </div>
  </header>
</template>
