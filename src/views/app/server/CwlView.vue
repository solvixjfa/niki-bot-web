<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg flex items-center justify-center">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
      </div>
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Clan War League</h2>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 dark:text-gray-400 text-sm">Memuat data CWL dari database...</div>
    
    <div v-else-if="wars.length === 0" class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
      <p class="text-sm text-gray-600 dark:text-gray-300 font-medium">Belum ada riwayat CWL.</p>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">Data akan muncul setelah bot sinkronisasi perang CWL.</p>
    </div>

    <div v-else class="grid grid-cols-1 gap-3">
      <div v-for="w in wars" :key="w.id" class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm gap-4">
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded" 
              :class="{
                'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400': w.result === 'win',
                'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400': w.result === 'lose',
                'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300': w.result === 'tie' || !w.result
              }"
            >
              {{ w.result || w.state }}
            </span>
          </div>
          <h3 class="font-bold text-gray-900 dark:text-white">{{ w.opponent_name }}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ w.opponent_tag }}</p>
        </div>

        <div class="flex items-center gap-4 sm:gap-6 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg">
          <div class="text-center">
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Kita</div>
            <div class="flex items-center justify-center gap-1 text-sm font-bold text-gray-900 dark:text-white">
              <span class="text-yellow-500">★</span> {{ w.clan_stars }}
            </div>
            <div class="text-[10px] text-gray-500 dark:text-gray-400">{{ w.clan_destruction }}%</div>
          </div>
          
          <div class="text-gray-300 dark:text-gray-600 font-black text-lg">-</div>
          
          <div class="text-center">
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Lawan</div>
            <div class="flex items-center justify-center gap-1 text-sm font-bold text-gray-900 dark:text-white">
              <span class="text-yellow-500">★</span> {{ w.opp_stars }}
            </div>
            <div class="text-[10px] text-gray-500 dark:text-gray-400">{{ w.opp_destruction }}%</div>
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
const wars = ref([])

onMounted(async () => {
  try {
    const data = await apiFetch('/clan/cwl')
    wars.value = data
  } catch (err) {
    console.error('Failed to load CWL:', err)
  } finally {
    loading.value = false
  }
})
</script>
