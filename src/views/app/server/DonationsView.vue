<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
      </div>
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Top 5 Donatur</h2>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 dark:text-gray-400 text-sm">Memuat data...</div>
    
    <div v-else-if="donors.length === 0" class="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-8 text-center">
      <p class="text-sm text-gray-600 dark:text-gray-300 font-medium">Belum ada data donasi.</p>
    </div>

    <div v-else class="space-y-3">
      <div v-for="(m, index) in donors" :key="m.tag" class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg" 
            :class="{
              'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400': index === 0,
              'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300': index === 1,
              'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400': index === 2,
              'bg-gray-50 dark:bg-zinc-800 text-gray-400 dark:text-gray-500': index > 2
            }"
          >
            {{ index + 1 }}
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <img :src="ASSETS.getTh(m.townhall_level)" class="w-5 h-5 object-contain drop-shadow-sm" :alt="'TH ' + m.townhall_level" />
              <h3 class="font-bold text-gray-900 dark:text-white">{{ m.name }}</h3>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ m.role }}</p>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm font-bold text-green-600 dark:text-green-400">{{ m.donations }} <span class="text-xs font-normal text-gray-500 dark:text-gray-400">Donasi</span></div>
          <div class="text-[10px] text-gray-400 dark:text-gray-500">Diterima: {{ m.donations_received }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiFetch } from '../../../lib/api'
import { ASSETS } from '../../../lib/assets'

const loading = ref(true)
const donors = ref([])

onMounted(async () => {
  try {
    const data = await apiFetch('/clan/donations')
    donors.value = data
  } catch (err) {
    console.error('Failed to load donations:', err)
  } finally {
    loading.value = false
  }
})
</script>
