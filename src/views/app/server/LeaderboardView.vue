<template>
  <div>
    <PremiumGate v-if="tier === 'free'" />
    <div v-else class="space-y-6">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-brand dark:text-purple-400 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Leaderboard Donasi</h2>
      </div>

      <div v-if="loading" class="animate-pulse text-gray-500">Memuat data...</div>
      
      <div v-else>
        <div class="mb-4">
          <SearchInput v-model="searchQuery" placeholder="Cari nama member..." />
        </div>

        <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
              <tr>
                <th class="px-4 py-3">Rank</th>
                <th class="px-4 py-3">Nama Member</th>
                <th class="px-4 py-3 text-right">Total Donasi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredLeaderboard.length === 0">
                <td colspan="3" class="px-4 py-8 text-center text-gray-500">Member tidak ditemukan.</td>
              </tr>
              <tr v-for="(d, i) in filteredLeaderboard" :key="i" class="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                <td class="px-4 py-3 font-bold" :class="i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-400' : 'text-gray-500'">#{{ i + 1 }}</td>
                <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">{{ d.name }}</td>
                <td class="px-4 py-3 text-right text-green-600 dark:text-green-400 font-bold">{{ d.score.toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { apiFetch } from '../../../lib/api'
import PremiumGate from '../../../components/PremiumGate.vue'
import SearchInput from '../../../components/ui/SearchInput.vue'

const tierRef = inject('serverTier', ref('free'))
const tier = computed(() => tierRef.value)
const loading = ref(true)
const leaderboard = ref([])
const searchQuery = ref('')

const filteredLeaderboard = computed(() => {
  if (!searchQuery.value) return leaderboard.value
  return leaderboard.value.filter(d => d.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

onMounted(async () => {
  if (tier.value === 'free') { loading.value = false; return }
  try {
    leaderboard.value = await apiFetch('/clan/leaderboard')
  } catch (err) { console.error(err) } 
  finally { loading.value = false }
})
</script>
