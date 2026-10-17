<template>
  <div>
    <PremiumGate v-if="tier === 'free'" />
    <div v-else class="space-y-6">
      
      <!-- Header -->
      <div class="flex items-center gap-3 mb-2">
        <div class="w-8 h-8 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Race War</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">Klasemen performa Offense & Defense</p>
        </div>
      </div>

      <div v-if="loading" class="animate-pulse text-gray-500 py-8 text-center">Memuat data...</div>
      <div v-else-if="error" class="text-red-500 text-sm py-8 text-center">{{ error }}</div>
      
      <div v-else>
        <!-- Tab Navigation (Offense / Defense) -->
        <div class="border-b border-gray-200 dark:border-zinc-800 mb-4">
          <nav class="flex gap-1 -mb-px overflow-x-auto hide-scrollbar">
            <button 
              @click="activeTab = 'offense'"
              class="px-5 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap"
              :class="activeTab === 'offense' ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
            >
              Klasemen Offense
            </button>
            <button 
              @click="activeTab = 'defense'"
              class="px-5 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap"
              :class="activeTab === 'defense' ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
            >
              Klasemen Defense
            </button>
          </nav>
        </div>

        <!-- Search Bar -->
        <div class="mb-4">
          <SearchInput v-model="searchQuery" placeholder="Cari nama member..." />
        </div>

        <!-- TAB: OFFENSE -->
        <div v-if="activeTab === 'offense'" class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
              <tr>
                <th class="px-4 py-3">Nama Member</th>
                <th class="px-4 py-3 text-center">TH</th>
                <th class="px-4 py-3 text-right">Serangan</th>
                <th class="px-4 py-3 text-right">Bintang / Dest</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredOffense.length === 0">
                <td colspan="4" class="px-4 py-8 text-center text-gray-500">Member tidak ditemukan.</td>
              </tr>
              <tr v-for="(o, i) in filteredOffense" :key="i" class="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">{{ o.name }}</td>
                <td class="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{{ o.th || '-' }}</td>
                <td class="px-4 py-3 text-right text-xs text-gray-500">{{ o.atk_used }}/{{ o.atk_max }}</td>
                <td class="px-4 py-3 text-right">
                  <span class="text-yellow-500 font-bold">{{ o.stars }}★</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">({{ o.destruction }}%)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- TAB: DEFENSE -->
        <div v-if="activeTab === 'defense'" class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
              <tr>
                <th class="px-4 py-3">Nama Member</th>
                <th class="px-4 py-3 text-center">TH</th>
                <th class="px-4 py-3 text-center">Diserang</th>
                <th class="px-4 py-3 text-right">Bintang Diberi / Dest</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredDefense.length === 0">
                <td colspan="4" class="px-4 py-8 text-center text-gray-500">Member tidak ditemukan.</td>
              </tr>
              <tr v-for="(d, i) in filteredDefense" :key="i" class="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">{{ d.name }}</td>
                <td class="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{{ d.th || '-' }}</td>
                <td class="px-4 py-3 text-center text-xs text-gray-500">{{ d.defended_count }}x</td>
                <td class="px-4 py-3 text-right">
                  <span class="text-red-500 font-bold">{{ d.stars_given }}★</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">({{ d.destruction_given }}%)</span>
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
import { ref, computed, onMounted, inject } from 'vue'
import { apiFetch } from '../../../lib/api'
import PremiumGate from '../../../components/PremiumGate.vue'
import SearchInput from '../../../components/ui/SearchInput.vue'

const tier = inject('serverTier', ref('free'))
const loading = ref(true)
const error = ref('')
const data = ref({ offense: [], defense: [] })

// State untuk Tab
const activeTab = ref('offense') // default buka offense
const searchQuery = ref('')

const filteredOffense = computed(() => {
  if (!searchQuery.value) return data.value.offense
  return data.value.offense.filter(o => o.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const filteredDefense = computed(() => {
  if (!searchQuery.value) return data.value.defense
  return data.value.defense.filter(d => d.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

onMounted(async () => {
  if (tier.value === 'free') { loading.value = false; return }
  try {
    // apiFetch ini otomatis pakai cache dari lib/api.js
    const res = await apiFetch('/clan/racewar')
    if (res.error) error.value = res.error
    else data.value = res
  } catch (err) { error.value = err.message } 
  finally { loading.value = false }
})
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
