<template>
  <div>
    <div class="mb-6 border-b border-gray-200 pb-4">
      <RouterLink to="/app" class="text-xs font-bold text-gray-500 hover:text-brand mb-2 inline-block">&larr; Kembali ke Daftar Server</RouterLink>
      <h1 class="text-2xl font-bold text-gray-900">Clan: {{ serverClanTag }}</h1>
    </div>
    
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Menu Fitur -->
      <nav class="w-full md:w-48 flex flex-col gap-1 shrink-0">
        <RouterLink :to="`/app/server/${guildId}`" exact-active-class="bg-purple-50 text-brand font-bold" class="px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">Overview</RouterLink>
        <RouterLink :to="`/app/server/${guildId}/war`" active-class="bg-purple-50 text-brand font-bold" class="px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">War Status</RouterLink>
        <RouterLink :to="`/app/server/${guildId}/members`" active-class="bg-purple-50 text-brand font-bold" class="px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">Members</RouterLink>
      </nav>

      <!-- Konten -->
      <div class="flex-1 bg-white border border-gray-200 rounded-2xl p-6 min-h-[500px]">
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

onMounted(async () => {
  try {
    // Kita bisa ambil detail server dari state, atau endpoint. Untuk sekarang, filter dari /auth/me
    const data = await apiFetch('/auth/me')
    const thisServer = data.servers.find(s => s.guild_id === guildId)
    if (thisServer) {
      serverClanTag.value = thisServer.clan_tag
      provide('serverTier', thisServer.tier)
    } else {
      serverClanTag.value = 'Unknown'
    }
  } catch (e) {
    serverClanTag.value = 'Error'
  }
})
</script>
