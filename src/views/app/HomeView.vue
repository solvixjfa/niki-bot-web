<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex justify-between items-end">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-sm text-gray-500 mt-1">Pilih server Discord untuk mulai mengelola clan.</p>
      </div>
    </div>

    <div v-if="loading" class="text-sm text-gray-500 animate-pulse">Memuat server...</div>

    <div v-else-if="servers.length === 0" class="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
      <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
      </div>
      <h3 class="text-lg font-bold text-gray-900 mb-2">Belum ada server</h3>
      <p class="text-sm text-gray-500 mb-6 max-w-md mx-auto">Kamu belum menginstal bot Niki di server Discord manapun, atau kamu bukan admin di server tersebut.</p>
      <a href="https://discord.com/oauth2/authorize?client_id=1553040946688696482&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" class="inline-block px-6 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark transition-colors shadow-sm">
        Invite Bot ke Server
      </a>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="server in servers" 
        :key="server.guild_id"
        class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group"
        @click="selectServer(server)"
      >
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-purple-100 text-brand rounded-lg flex items-center justify-center font-bold text-lg">
              #
            </div>
            <div>
              <h3 class="font-bold text-gray-900 group-hover:text-brand transition-colors">{{ server.clan_tag }}</h3>
              <p class="text-xs text-gray-500">ID: {{ server.guild_id }}</p>
            </div>
          </div>
          <span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border" 
            :class="{
              'bg-gray-50 text-gray-600 border-gray-200': server.tier === 'free',
              'bg-blue-50 text-blue-600 border-blue-200': server.tier === 'standard',
              'bg-purple-50 text-purple-600 border-purple-200': server.tier === 'pro'
            }"
          >
            {{ server.tier }}
          </span>
        </div>
        <div class="flex items-center text-sm font-semibold text-brand">
          Kelola Server &rarr;
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
