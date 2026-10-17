<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 mb-4">
      <img :src="ASSETS.capitalGold" class="w-8 h-8 object-contain" alt="Capital" />
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Clan Capital Raid Weekend</h2>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 dark:text-gray-400 text-sm">Memuat data Capital...</div>
    
    <div v-else-if="!capitalData || capitalData.error" class="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-8 text-center">
      <p class="text-sm text-gray-600 dark:text-gray-300 font-medium">{{ capitalData?.error || 'Belum ada data Raid Weekend.' }}</p>
    </div>

    <div v-else class="space-y-4">
      <!-- Card Ringkasan Raid -->
      <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
        <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4">Ringkasan Performa Distrik</h3>
        
        <div class="space-y-3 text-sm">
          <div class="flex justify-between items-center border-b border-gray-100 dark:border-zinc-800 pb-2">
            <span class="text-gray-500 dark:text-gray-400 flex items-center gap-2"><img :src="ASSETS.capitalGold" class="w-4 h-4" /> Total Loot</span>
            <span class="font-bold text-gray-900 dark:text-white">{{ capitalData.total_loot?.toLocaleString() }} Gold</span>
          </div>
          <div class="flex justify-between items-center border-b border-gray-100 dark:border-zinc-800 pb-2">
            <span class="text-gray-500 dark:text-gray-400 flex items-center gap-2"><img :src="ASSETS.war" class="w-4 h-4" /> Total Attack</span>
            <span class="font-bold text-gray-900 dark:text-white">{{ capitalData.total_attacks }} Serangan</span>
          </div>
          <div class="flex justify-between items-center border-b border-gray-100 dark:border-zinc-800 pb-2">
            <span class="text-gray-500 dark:text-gray-400 flex items-center gap-2">🔥 Distrik Rata-Rata</span>
            <span class="font-bold text-gray-900 dark:text-white">{{ capitalData.districts_destroyed }}</span>
          </div>
          <div class="flex justify-between items-center border-b border-gray-100 dark:border-zinc-800 pb-2">
            <span class="text-gray-500 dark:text-gray-400 flex items-center gap-2">🏆 Raid Selesai</span>
            <span class="font-bold text-gray-900 dark:text-white">{{ capitalData.completed_raids }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-500 dark:text-gray-400 flex items-center gap-2">🛡️ Bonus Pertahanan</span>
            <span class="font-bold text-gray-900 dark:text-white">{{ capitalData.defensive_rewards?.toLocaleString() }} Gold</span>
          </div>
        </div>
      </div>

      <!-- Card Top Donatur -->
      <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center gap-2 mb-4">
          <h3 class="font-bold text-gray-900 dark:text-white">Top 10 Donatur Capital Gold</h3>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
              <tr>
                <th class="px-4 py-3">Nama</th>
                <th class="px-4 py-3 text-center">TH</th>
                <th class="px-4 py-3 text-right">Kontribusi Gold</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(d, i) in donations" :key="i" class="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">{{ i + 1 }}. {{ d.name }}</td>
                <td class="px-4 py-3 text-center">
                  <div class="flex items-center justify-center gap-1">
                    <img :src="ASSETS.getTh(d.townhall)" class="w-6 h-6 object-contain drop-shadow-sm" :alt="'TH ' + d.townhall" />
                    <span class="font-bold text-gray-700 dark:text-gray-300">{{ d.townhall }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-right font-bold text-yellow-600 dark:text-yellow-500">
                  <div class="flex items-center justify-end gap-1">
                    <img :src="ASSETS.capitalGold" class="w-4 h-4 object-contain" />
                    {{ d.contributions.toLocaleString() }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
const capitalData = ref(null)
const donations = ref([])

onMounted(async () => {
  try {
    const [cap, don] = await Promise.all([
      apiFetch('/clan/capital'),
      apiFetch('/clan/capitaldonations')
    ])
    capitalData.value = cap
    donations.value = don
  } catch (err) {
    console.error('Failed to load capital:', err)
  } finally {
    loading.value = false
  }
})
</script>
