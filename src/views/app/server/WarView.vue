<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 mb-4">
      <img src="/assets/coc/war.png" class="w-8 h-8 object-contain" alt="War" />
      <h2 class="text-xl font-bold text-gray-900">War Status</h2>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 text-sm">Memuat data war dari database...</div>
    
    <div v-else-if="!war || war.state === 'notInWar'" class="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
      <p class="text-sm text-gray-600 font-medium">Clan ini sedang tidak dalam perang.</p>
      <p class="text-xs text-gray-400 mt-1">Data diambil dari database sinkronisasi Niki.</p>
    </div>

    <div v-else class="space-y-6">
      <!-- Card War -->
      <div class="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10">
          <img src="/assets/coc/war.png" class="w-32 h-32" />
        </div>
        
        <div class="text-center mb-6 relative z-10">
          <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">{{ war.state }}</span>
        </div>

        <div class="flex justify-between items-center relative z-10">
          <div class="text-center flex-1">
            <div class="text-lg font-bold">Clan Kita</div>
            <div class="flex items-center justify-center gap-1 my-2">
              <img src="/assets/coc/star.png" class="w-5 h-5" />
              <span class="text-2xl font-black">{{ war.clan_stars }}</span>
            </div>
            <div class="text-sm text-gray-300">{{ war.clan_destruction }}%</div>
          </div>
          
          <div class="text-2xl font-black italic px-4 opacity-50">VS</div>
          
          <div class="text-center flex-1">
            <div class="text-lg font-bold">{{ war.opponent_name }}</div>
            <div class="flex items-center justify-center gap-1 my-2">
              <img src="/assets/coc/star.png" class="w-5 h-5" />
              <span class="text-2xl font-black">{{ war.opp_stars }}</span>
            </div>
            <div class="text-sm text-gray-300">{{ war.opp_destruction }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiFetch } from '../../../lib/api'

const loading = ref(true)
const war = ref(null)

onMounted(async () => {
  try {
    const data = await apiFetch('/clan/war')
    war.value = data
  } catch (err) {
    console.error('Failed to load war:', err)
  } finally {
    loading.value = false
  }
})
</script>
