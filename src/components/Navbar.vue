<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const isSidebarOpen = ref(false)
const router = useRouter()
const { isAuthenticated, loginWithDiscord, user } = useAuth()

watch(isSidebarOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : 'auto'
})

const navLinks = [
  { name: 'Fitur', href: '#fitur' },
  { name: 'Dokumentasi', href: '#dokumentasi' },
  { name: 'Kontak', href: '#kontak' }
]

function handleLogin() {
  loginWithDiscord()
}
function goToDashboard() {
  router.push('/app')
}
</script>

<template>
  <header class="border-b border-purple-100 sticky top-0 bg-white z-40">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="font-extrabold text-xl text-brand tracking-tight cursor-pointer" @click="router.push('/')">
        Niki CoC Bot
      </div>

      <!-- Navigasi PC -->
      <nav class="hidden md:flex gap-6 items-center">
        <a v-for="link in navLinks" :key="link.name" :href="link.href" class="text-sm font-medium text-gray-600 hover:text-brand transition-colors">
          {{ link.name }}
        </a>
        
        <div class="flex items-center gap-3 border-l border-gray-200 pl-6">
          <button v-if="isAuthenticated" @click="goToDashboard" class="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-sm">
            Dashboard
          </button>
          <button v-else @click="handleLogin" class="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            Login Web
          </button>
          
          <a href="https://discord.com/oauth2/authorize?client_id=1553040946688696482&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" class="px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark transition-colors shadow-sm">
            Invite Bot
          </a>
        </div>
      </nav>

      <!-- Tombol Hamburger HP -->
      <button @click="isSidebarOpen = true" class="md:hidden p-2 rounded-lg text-gray-700 hover:bg-purple-50 focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <!-- Mobile Sidebar -->
    <Teleport to="body">
      <div v-if="isSidebarOpen" class="fixed inset-0 bg-black/50 z-[999] md:hidden" @click="isSidebarOpen = false"></div>

      <div
        class="fixed top-0 right-0 h-[100dvh] w-4/5 max-w-sm bg-white z-[1000] p-6 shadow-2xl transition-transform duration-300 md:hidden flex flex-col justify-between overflow-y-auto"
        :class="isSidebarOpen ? 'translate-x-0' : 'translate-x-full'"
      >
        <div>
          <div class="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
            <span class="font-bold text-lg text-brand">Niki CoC Bot</span>
            <button @click="isSidebarOpen = false" class="p-2 text-gray-500 hover:text-gray-800">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <nav class="flex flex-col gap-4">
            <a v-for="link in navLinks" :key="link.name" :href="link.href" @click="isSidebarOpen = false" class="text-base font-semibold text-gray-800 hover:text-brand py-2 border-b border-gray-50">
              {{ link.name }}
            </a>
          </nav>
        </div>
        <div class="pt-6 border-t border-gray-100 mt-auto flex flex-col gap-3">
          <button v-if="isAuthenticated" @click="goToDashboard" class="block w-full py-3 text-center bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 shadow-md">
            Buka Dashboard
          </button>
          <button v-else @click="handleLogin" class="block w-full py-3 text-center bg-gray-100 text-gray-800 text-sm font-semibold rounded-xl hover:bg-gray-200 shadow-sm">
            Login Web
          </button>
          <a href="https://discord.com/oauth2/authorize?client_id=1553040946688696482&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" class="block w-full py-3 text-center bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark shadow-md">
            Invite Bot ke Server
          </a>
        </div>
      </div>
    </Teleport>
  </header>
</template>
