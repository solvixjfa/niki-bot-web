<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 mb-4">
      <img :src="ASSETS.capitalGold" class="w-8 h-8 object-contain" alt="Capital" />
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Clan Capital & Raid</h2>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 text-sm">Memuat data Capital...</div>
    
    <div v-else-if="!data" class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
      <p class="text-sm text-gray-600 dark:text-gray-300 font-medium">Belum ada data Raid Weekend.</p>
    </div>

    <div v-else class="space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Capital Hall</p>
            <h3 class="text-2xl font-black text-gray-900 dark:text-white">{{ data.capital_hall }}</h3>
          </div>
          <div class="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center border border-gray-100 dark:border-gray-600">
            <img :src="ASSETS.getTh(10)" class="w-8 h-8 object-contain drop-shadow-sm" /> 
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Raid Medals</p>
            <div class="flex items-center gap-2">
              <img :src="ASSETS.raidMedal" class="w-6 h-6 object-contain" alt="Medal" />
              <h3 class="text-2xl font-black text-gray-900 dark:text-white">{{ data.raid_medals.toLocaleString() }}</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 shadow-lg">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-2">
            <img :src="ASSETS.capitalGold" class="w-6 h-6 object-contain" alt="Gold" />
            <h3 class="font-bold text-lg">Raid Weekend</h3>
          </div>
          <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase">{{ data.state }}</span>
        </div>
        
        <div class="grid grid-cols-2 gap-4 text-center">
          <div>
            <p class="text-xs text-gray-400 mb-1">Districts Destroyed</p>
            <p class="text-xl font-bold">{{ data.districts_destroyed }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-400 mb-1">Attacks Used</p>
            <p class="text-xl font-bold">{{ data.attacks_used }} / {{ data.attacks_used * 6 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
        <div class="flex items-center gap-2 mb-4">
          <img :src="ASSETS.capitalGold" class="w-5 h-5 object-contain" alt="Gold" />
          <h3 class="font-bold text-gray-900 dark:text-white">Top Donatur Capital Gold</h3>
        </div>
        <div class="space-y-2">
          <div v-for="(d, i) in data.top_donors" :key="i" class="flex justify-between items-center text-sm border-b border-gray-50 dark:border-gray-700 pb-2 last:border-0">
            <span class="font-medium text-gray-700 dark:text-gray-300">{{ i + 1 }}. {{ d.name }}</span>
            <div class="flex items-center gap-1 text-yellow-600 font-bold">
              <img :src="ASSETS.capitalGold" class="w-4 h-4 object-contain" />
              {{ d.donations.toLocaleString() }}
            </div>
          </div>
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
const data = ref(null)

onMounted(async () => {
  try {
    data.value = await apiFetch('/clan/capital')
  } catch (err) {
    console.error('Failed to load capital:', err)
  } finally {
    loading.value = false
  }
})
</script>
