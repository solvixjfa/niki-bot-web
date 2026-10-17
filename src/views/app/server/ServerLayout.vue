<template>
  <div class="transition-colors duration-300">
    <div class="mb-4 md:mb-6 border-b border-gray-200 dark:border-zinc-800 pb-4 flex items-center gap-3">
      <RouterLink to="/app" class="p-2 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg text-gray-600 dark:text-zinc-300 transition-colors shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      </RouterLink>
      
      <div class="flex items-center gap-3">
        <div v-if="badgeUrl" class="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700 shrink-0">
          <img :src="badgeUrl" class="w-full h-full object-cover" alt="Clan Badge" />
        </div>
        <div>
          <p class="text-[10px] uppercase font-bold text-gray-500 dark:text-zinc-400 tracking-wider">Server</p>
          <h1 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">Clan: {{ serverClanTag }}</h1>
        </div>
      </div>
    </div>
    
    <div class="flex flex-col md:flex-row gap-4 md:gap-6">
      <nav class="w-full md:w-56 flex flex-row md:flex-col gap-2 shrink-0 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
        <RouterLink :to="`/app/server/${guildId}`" :class="[
            $route.path === `/app/server/${guildId}` ? 'bg-brand text-white border-brand' : 'bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800'
          ]" class="px-4 py-2.5 rounded-xl text-sm font-semibold border whitespace-nowrap transition-all">Overview</RouterLink>
          
        <RouterLink :to="`/app/server/${guildId}/war/status`" :class="[
            $route.path.includes('/war') ? 'bg-brand text-white border-brand' : 'bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800'
          ]" class="px-4 py-2.5 rounded-xl text-sm font-semibold border whitespace-nowrap transition-all">War Room</RouterLink>
          
        <RouterLink :to="`/app/server/${guildId}/members/list`" :class="[
            $route.path.includes('/members') ? 'bg-brand text-white border-brand' : 'bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800'
          ]" class="px-4 py-2.5 rounded-xl text-sm font-semibold border whitespace-nowrap transition-all">Members</RouterLink>
          
        <RouterLink :to="`/app/server/${guildId}/capital`" :class="[
            $route.path.includes('/capital') ? 'bg-brand text-white border-brand' : 'bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800'
          ]" class="px-4 py-2.5 rounded-xl text-sm font-semibold border whitespace-nowrap transition-all">Capital</RouterLink>
      </nav>

      <div class="flex-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 md:p-6 min-h-[400px] shadow-sm transition-colors duration-300">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { apiFetch } from '../../../lib/api'

const route = useRoute()
const guildId = route.params.guildId
const serverClanTag = ref('Loading...')
const badgeUrl = ref(null)
const serverTier = ref('free')

// KUNCI PERBAIKANNYA DI SINI: provide harus di luar onMounted
provide('serverTier', serverTier)

onMounted(async () => {
  try {
    const data = await apiFetch('/auth/me')
    const thisServer = data.servers.find(s => s.guild_id === guildId)
    if (thisServer) {
      serverClanTag.value = thisServer.clan_tag
      badgeUrl.value = thisServer.clan_badge_url
      
      // Update nilai ref-nya setelah data datang
      serverTier.value = thisServer.tier || 'free'
    } else {
      serverClanTag.value = 'Unknown'
    }
  } catch (e) {
    serverClanTag.value = 'Error'
  }
})
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
