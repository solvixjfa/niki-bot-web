<template>
  <div class="min-h-screen bg-gray-50 dark:bg-navy-950 text-gray-900 dark:text-gray-100 flex flex-col md:flex-row transition-colors duration-300">
    
    <!-- Top Bar Mobile -->
    <div class="md:hidden flex items-center justify-between p-4 bg-white dark:bg-navy-900 border-b border-gray-200 dark:border-navy-800 sticky top-0 z-30">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-brand rounded flex items-center justify-center text-white font-bold">N</div>
        <span class="font-bold text-brand dark:text-purple-400">Niki Web</span>
      </div>
      <div class="flex items-center gap-3">
        <button @click="toggleTheme" class="p-2 bg-gray-100 dark:bg-navy-800 rounded-lg text-gray-600 dark:text-gray-300">
          <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        </button>
        <button @click="isSidebarOpen = true" class="p-2 text-gray-600 dark:text-gray-300">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
    </div>

    <!-- Overlay Mobile -->
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="md:hidden fixed inset-0 bg-black/50 z-40"></div>

    <!-- SIDEBAR UTAMA (Sticky) -->
    <aside class="fixed md:sticky md:top-0 inset-y-0 left-0 z-50 w-64 h-[100dvh] bg-white dark:bg-navy-900 border-r border-gray-200 dark:border-navy-800 p-4 flex flex-col transform transition-transform duration-300 md:transform-none overflow-y-auto hide-scrollbar" :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'">
      
      <!-- Logo Desktop -->
      <div class="hidden md:flex items-center justify-between mb-6 shrink-0">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-brand rounded flex items-center justify-center text-white font-bold">N</div>
          <span class="font-bold text-brand dark:text-purple-400">Niki Web</span>
        </div>
        <button @click="toggleTheme" class="p-2 bg-gray-100 dark:bg-navy-800 rounded-lg text-gray-600 dark:text-gray-300">
          <svg v-if="isDark" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        </button>
      </div>
      
      <!-- Tombol Close Mobile -->
      <button @click="isSidebarOpen = false" class="md:hidden absolute top-4 right-4 p-2 text-gray-500 dark:text-gray-400">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <!-- Menu Container -->
      <div class="flex-1 flex flex-col mt-8 md:mt-0">
        <!-- MENU GLOBAL -->
        <p class="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2 shrink-0">Menu Utama</p>
        <RouterLink to="/app" @click="isSidebarOpen = false" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-navy-800 transition-colors shrink-0" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400" exact>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          Server List
        </RouterLink>
        <RouterLink to="/app/account" @click="isSidebarOpen = false" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-navy-800 transition-colors shrink-0" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          Account
        </RouterLink>

        <!-- MENU SERVER (Hanya muncul kalau lagi di dalam server) -->
        <div v-if="activeServer" class="mt-6 border-t border-gray-100 dark:border-navy-800 pt-4 flex-1">
          <p class="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 truncate">Server: {{ activeServer.clan_tag }}</p>
          
          <RouterLink :to="`/app/server/${activeServer.guild_id}`" @click="isSidebarOpen = false" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400" exact>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Dashboard
          </RouterLink>
          <RouterLink :to="`/app/server/${activeServer.guild_id}/members/list`" @click="isSidebarOpen = false" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            Clan
          </RouterLink>
          <RouterLink :to="`/app/server/${activeServer.guild_id}/war/status`" @click="isSidebarOpen = false" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            War
          </RouterLink>
          <RouterLink :to="`/app/server/${activeServer.guild_id}/war/cwl`" @click="isSidebarOpen = false" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            CWL
          </RouterLink>
          <RouterLink :to="`/app/server/${activeServer.guild_id}/capital`" @click="isSidebarOpen = false" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            Raid Weekend
          </RouterLink>
          <RouterLink :to="`/app/server/${activeServer.guild_id}/members/donations`" @click="isSidebarOpen = false" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Donations
          </RouterLink>
          
          <div class="border-t border-gray-100 dark:border-navy-800 my-2 pt-2"></div>
          
          <RouterLink :to="`/app/server/${activeServer.guild_id}/members/leaderboard`" @click="isSidebarOpen = false" class="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              Leaderboard
            </div>
            <span class="text-[9px] bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-1.5 py-0.5 rounded">STD</span>
          </RouterLink>
          <RouterLink :to="`/app/server/${activeServer.guild_id}/war/race`" @click="isSidebarOpen = false" class="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Race War
            </div>
            <span class="text-[9px] bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-1.5 py-0.5 rounded">STD</span>
          </RouterLink>
        </div>
      </div>
      
      <!-- Footer Sidebar -->
      <div class="pt-4 mt-auto border-t border-gray-100 dark:border-navy-800 shrink-0">
        <p v-if="user" class="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate px-3">@{{ user.username }}</p>
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
import { ref, onMounted, provide, computed, watch } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import { useTheme } from '../../composables/useTheme'
import { apiFetch } from '../../lib/api'

const { logout, user } = useAuth()
const { isDark, toggleTheme } = useTheme()
const route = useRoute()

const isSidebarOpen = ref(false)
const servers = ref([])
const serverTier = ref('free')
provide('serverTier', serverTier)

const activeServer = computed(() => {
  const id = route.params.guildId
  if (!id) return null
  return servers.value.find(s => s.guild_id === id)
})

watch(activeServer, (newServer) => {
  if (newServer) {
    serverTier.value = newServer.tier || 'free'
  } else {
    serverTier.value = 'free'
  }
}, { immediate: true })

onMounted(async () => {
  try {
    const data = await apiFetch('/auth/me')
    servers.value = data?.servers || []
  } catch (err) {
    console.error(err)
  }
})
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
