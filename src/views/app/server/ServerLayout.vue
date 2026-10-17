<template>
  <div class="flex flex-col lg:flex-row gap-6 transition-colors duration-300">
    
    <!-- Tombol Buka Menu Server (Khusus Mobile) -->
    <div class="lg:hidden flex items-center justify-between bg-white dark:bg-navy-900 p-4 rounded-xl border border-gray-200 dark:border-navy-800 shadow-sm cursor-pointer" @click="isMenuOpen = !isMenuOpen">
      <div class="flex items-center gap-3">
        <div v-if="badgeUrl" class="w-8 h-8 rounded-lg overflow-hidden border border-gray-200 dark:border-navy-700">
          <img :src="badgeUrl" class="w-full h-full object-cover" />
        </div>
        <div>
          <h1 class="text-sm font-bold text-gray-900 dark:text-white">Clan: {{ serverClanTag }}</h1>
        </div>
      </div>
      <svg class="w-5 h-5 text-gray-500 transition-transform" :class="isMenuOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
    </div>

    <!-- SIDEBAR KIRI SERVER (Menu) -->
    <aside :class="isMenuOpen ? 'block' : 'hidden lg:block'" class="w-full lg:w-64 shrink-0">
      <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-2xl p-4 shadow-sm sticky top-4">
        
        <!-- Header Server -->
        <div class="hidden lg:flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-navy-800">
          <div v-if="badgeUrl" class="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 dark:border-navy-700 shrink-0">
            <img :src="badgeUrl" class="w-full h-full object-cover" />
          </div>
          <div>
            <p class="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider">Server</p>
            <h1 class="text-sm font-bold text-gray-900 dark:text-white truncate">{{ serverClanTag }}</h1>
          </div>
        </div>

        <nav class="space-y-1">
          <RouterLink :to="`/app/server/${guildId}`" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400 font-bold">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Dashboard
          </RouterLink>
          <RouterLink :to="`/app/server/${guildId}/members/list`" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400 font-bold">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            Clan
          </RouterLink>
          <RouterLink :to="`/app/server/${guildId}/war/status`" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400 font-bold">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            War
          </RouterLink>
          <RouterLink :to="`/app/server/${guildId}/war/cwl`" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400 font-bold">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            CWL
          </RouterLink>
          <RouterLink :to="`/app/server/${guildId}/capital`" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400 font-bold">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            Raid Weekend
          </RouterLink>
          <RouterLink :to="`/app/server/${guildId}/members/donations`" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400 font-bold">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Donations
          </RouterLink>
          
          <div class="border-t border-gray-100 dark:border-navy-800 my-2 pt-2"></div>
          
          <RouterLink :to="`/app/server/${guildId}/members/leaderboard`" class="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400 font-bold">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              Leaderboard
            </div>
            <span class="text-[9px] bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-1.5 py-0.5 rounded">STD</span>
          </RouterLink>
          <RouterLink :to="`/app/server/${guildId}/war/race`" class="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400 font-bold">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Race War
            </div>
            <span class="text-[9px] bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-1.5 py-0.5 rounded">STD</span>
          </RouterLink>
        </nav>
      </div>
    </aside>

    <!-- KONTEN UTAMA -->
    <div class="flex-1 w-full min-w-0">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, provide, watch } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { apiFetch } from '../../../lib/api'

const route = useRoute()
const guildId = ref(route.params.guildId)
const serverClanTag = ref('Loading...')
const badgeUrl = ref(null)
const serverTier = ref('free')
const isMenuOpen = ref(false)

provide('serverTier', serverTier)

async function fetchServerData() {
  try {
    serverClanTag.value = 'Loading...'
    const data = await apiFetch('/auth/me')
    const servers = data?.servers || [] // Safety check
    const thisServer = servers.find(s => s.guild_id === guildId.value)
    
    if (thisServer) {
      serverClanTag.value = thisServer.clan_tag
      badgeUrl.value = thisServer.clan_badge_url
      serverTier.value = thisServer.tier || 'free'
    } else {
      serverClanTag.value = 'Unknown'
      badgeUrl.value = null
      serverTier.value = 'free'
    }
  } catch (e) {
    console.error(e)
    serverClanTag.value = 'Error'
    serverTier.value = 'free'
  }
}

watch(() => route.params.guildId, (newId) => {
  if (newId) {
    guildId.value = newId
    fetchServerData()
  }
})

onMounted(() => {
  fetchServerData()
})
</script>
