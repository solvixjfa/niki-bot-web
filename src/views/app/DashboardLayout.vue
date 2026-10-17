<template>
  <div class="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 flex flex-col md:flex-row transition-colors duration-300">
    
    <!-- Top Bar Mobile -->
    <div class="md:hidden flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-30">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-brand rounded flex items-center justify-center text-white font-bold">N</div>
        <span class="font-bold text-brand dark:text-purple-400">Niki Web</span>
      </div>
      <div class="flex items-center gap-3">
        <button @click="toggleTheme" class="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg text-gray-600 dark:text-zinc-300">
          <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        </button>
        <button @click="isSidebarOpen = true" class="p-2 text-gray-600 dark:text-zinc-300">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
    </div>

    <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="md:hidden fixed inset-0 bg-black/50 z-40"></div>

    <!-- Sidebar Desktop & Mobile Drawer -->
    <aside class="fixed md:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 p-4 flex flex-col transform transition-transform duration-300 md:transform-none" :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'">
      <div class="hidden md:flex items-center justify-between mb-8">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-brand rounded flex items-center justify-center text-white font-bold">N</div>
          <span class="font-bold text-brand dark:text-purple-400">Niki Web</span>
        </div>
        <button @click="toggleTheme" class="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg text-gray-600 dark:text-zinc-300">
          <svg v-if="isDark" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        </button>
      </div>
      
      <button @click="isSidebarOpen = false" class="md:hidden absolute top-4 right-4 p-2 text-gray-500 dark:text-zinc-400">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <nav class="flex-1 space-y-1 mt-8 md:mt-0">
        <RouterLink to="/app" @click="isSidebarOpen = false" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-zinc-300 hover:bg-purple-50 dark:hover:bg-zinc-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-zinc-800 dark:text-purple-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          Server List
        </RouterLink>

        <RouterLink to="/app/account" @click="isSidebarOpen = false" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-zinc-300 hover:bg-purple-50 dark:hover:bg-zinc-800 transition-colors mt-2" active-class="bg-brand-light text-brand dark:bg-zinc-800 dark:text-purple-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          Account
        </RouterLink>
      </nav>
      
      <div class="mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800">
        <p v-if="user" class="text-xs text-gray-500 dark:text-zinc-400 mb-2 truncate px-3">@{{ user.username }}</p>
        <button @click="logout" class="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 text-left px-3 py-2 font-medium w-full flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Sign out
        </button>
      </div>
    </aside>

    <main class="flex-1 p-4 md:p-8 w-full overflow-x-hidden">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import { useTheme } from '../../composables/useTheme'

const { logout, user } = useAuth()
const { isDark, toggleTheme } = useTheme()
const isSidebarOpen = ref(false)
</script>
