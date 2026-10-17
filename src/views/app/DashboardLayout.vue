<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 flex flex-col md:flex-row">
    
    <!-- Top Bar Mobile -->
    <div class="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-30">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-brand rounded flex items-center justify-center text-white font-bold">N</div>
        <span class="font-bold text-brand">Niki Web</span>
      </div>
      <button @click="isSidebarOpen = true" class="p-2 text-gray-600 hover:text-brand">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
    </div>

    <!-- Overlay Mobile -->
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="md:hidden fixed inset-0 bg-black/50 z-40"></div>

    <!-- Sidebar (Desktop & Mobile Drawer) -->
    <aside 
      class="fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 p-4 flex flex-col transform transition-transform duration-300 md:transform-none"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="hidden md:flex items-center gap-2 mb-6">
        <div class="w-8 h-8 bg-brand rounded flex items-center justify-center text-white font-bold">N</div>
        <span class="font-bold text-brand">Niki Web</span>
      </div>
      
      <button @click="isSidebarOpen = false" class="md:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <nav class="flex-1 space-y-1 mt-8 md:mt-0">
        <RouterLink to="/app" @click="isSidebarOpen = false" class="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 text-gray-700">Home</RouterLink>
      </nav>
      
      <div class="mt-auto pt-4 border-t border-gray-100">
        <p v-if="user" class="text-xs text-gray-500 mb-2 truncate px-3">@{{ user.username }}</p>
        <button @click="logout" class="text-xs text-red-500 hover:text-red-700 text-left px-3 py-2 font-medium w-full">Sign out</button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-4 md:p-8 w-full overflow-x-hidden">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { useAuth } from '../../composables/useAuth'

const { logout, user } = useAuth()
const isSidebarOpen = ref(false)
</script>
