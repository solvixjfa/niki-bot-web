<template>
  <div class="max-w-5xl mx-auto space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-sm text-gray-500 mt-1">Pilih server Discord untuk mulai mengelola clan.</p>
    </div>

    <div v-if="loading" class="text-sm text-gray-500 animate-pulse">Memuat server...</div>

    <div v-else-if="servers.length === 0" class="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
      <h3 class="text-lg font-bold text-gray-900 mb-2">Belum ada server</h3>
      <p class="text-sm text-gray-500 mb-6">Kamu belum menginstal bot Niki di server Discord manapun.</p>
      <a href="https://discord.com/oauth2/authorize?client_id=1553040946688696482&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" class="inline-block px-6 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark transition-colors shadow-sm">Invite Bot</a>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="server in servers" 
        :key="server.guild_id"
        class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        @click="selectServer(server)"
      >
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center border border-purple-100 overflow-hidden shrink-0">
              <img v-if="server.clan_badge_url" :src="server.clan_badge_url" class="w-full h-full object-cover" alt="Clan Badge" />
              <span v-else class="text-xl font-bold text-brand">#</span>
            </div>
            <div>
              <h3 class="font-bold text-gray-900 text-base">{{ server.clan_tag }}</h3>
              <p class="text-[11px] text-gray-500 mt-0.5">Server ID: {{ server.guild_id }}</p>
            </div>
          </div>
        </div>
        
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md" 
            :class="{
              'bg-gray-100 text-gray-600': server.tier === 'free',
              'bg-blue-100 text-blue-700': server.tier === 'standard',
              'bg-purple-100 text-purple-700': server.tier === 'pro'
            }"
          >
            {{ server.tier }}
          </span>
          <span class="text-xs font-bold text-brand flex items-center gap-1">
            Kelola <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiFetch } from '../../lib/api'

const router = useRouter()
const loading = ref(true)
const servers = ref([])

onMounted(async () => {
  try {
    const data = await apiFetch('/auth/me')
    servers.value = data.servers || []
  } catch (err) {
    console.error('Failed to load servers:', err)
  } finally {
    loading.value = false
  }
})

function selectServer(server) {
  localStorage.setItem('niki_active_guild', server.guild_id)
  router.push(`/app/server/${server.guild_id}`)
}
</script>
