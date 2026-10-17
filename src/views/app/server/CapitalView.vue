<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-2">
      <IconCapitalGold className="w-8 h-8" />
      <div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Clan Capital</h2>
        <p class="text-xs text-gray-500 dark:text-gray-400">Raid Weekend & Kontribusi</p>
      </div>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 dark:text-gray-400 text-sm">Memuat data...</div>
    
    <div v-else-if="!capitalData || capitalData.error" class="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-8 text-center">
      <p class="text-sm text-gray-600 dark:text-gray-300 font-medium">{{ capitalData?.error || 'Belum ada data Raid Weekend.' }}</p>
    </div>

    <div v-else>
      <!-- Tab Navigation -->
      <div class="border-b border-gray-200 dark:border-zinc-800 mb-6">
        <nav class="flex gap-1 -mb-px overflow-x-auto hide-scrollbar">
          <button 
            @click="activeTab = 'summary'"
            class="px-4 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap"
            :class="activeTab === 'summary' ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
          >
            Summary
          </button>
          <button 
            @click="activeTab = 'donations'"
            class="px-4 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap"
            :class="activeTab === 'donations' ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
          >
            Top Donations
          </button>
          <button 
            @click="activeTab = 'raid'"
            class="px-4 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap"
            :class="activeTab === 'raid' ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
          >
            Raid Stats
          </button>
        </nav>
      </div>

      <!-- KONTEN: TAB SUMMARY -->
      <div v-if="activeTab === 'summary'" class="space-y-4">
        <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
          <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4">Ringkasan Performa Distrik</h3>
          
          <div class="space-y-3 text-sm">
            <div class="flex justify-between items-center border-b border-gray-100 dark:border-zinc-800 pb-2">
              <span class="text-gray-500 dark:text-gray-400 flex items-center gap-2"><IconCapitalGold className="w-4 h-4" /> Total Loot</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ capitalData.total_loot?.toLocaleString() }} Gold</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-100 dark:border-zinc-800 pb-2">
              <span class="text-gray-500 dark:text-gray-400 flex items-center gap-2"><IconWar className="w-4 h-4 text-gray-600 dark:text-gray-400" /> Total Attack</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ capitalData.total_attacks }} Serangan</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-100 dark:border-zinc-800 pb-2">
              <span class="text-gray-500 dark:text-gray-400 flex items-center gap-2">Distrik Rata-Rata</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ capitalData.districts_destroyed }}</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-100 dark:border-zinc-800 pb-2">
              <span class="text-gray-500 dark:text-gray-400 flex items-center gap-2">Raid Selesai</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ capitalData.completed_raids }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-500 dark:text-gray-400 flex items-center gap-2">Bonus Pertahanan</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ capitalData.defensive_rewards?.toLocaleString() }} Gold</span>
            </div>
          </div>
        </div>
      </div>

      <!-- KONTEN: TAB DONATIONS -->
      <div v-if="activeTab === 'donations'" class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
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
                    <IconCapitalGold className="w-4 h-4" />
                    {{ d.contributions.toLocaleString() }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- KONTEN: TAB RAID STATS -->
      <div v-if="activeTab === 'raid'" class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 class="font-bold text-gray-900 dark:text-white">Rekap Partisipasi Raid</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Cek siapa yang belum menyerang minggu ini.</p>
          </div>
          <button @click="downloadCSV" class="px-4 py-2 bg-brand hover:bg-brand-dark text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Download CSV
          </button>
        </div>

        <!-- TOOLBAR SEARCH & FILTER -->
        <div class="flex flex-col sm:flex-row gap-3 mb-4">
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input v-model="searchQuery" type="text" placeholder="Cari nama member..." class="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand outline-none transition-all">
          </div>
          
          <div class="flex gap-1 overflow-x-auto hide-scrollbar">
            <button @click="filterStatus = 'all'" :class="filterStatus === 'all' ? 'bg-brand text-white border-brand' : 'bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-zinc-700'" class="px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap">Semua</button>
            <button @click="filterStatus = 'Belum Attack'" :class="filterStatus === 'Belum Attack' ? 'bg-red-500 text-white border-red-500' : 'bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-zinc-700'" class="px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap">Belum</button>
            <button @click="filterStatus = 'Sudah Attack'" :class="filterStatus === 'Sudah Attack' ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-zinc-700'" class="px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap">Sudah</button>
            <button @click="filterStatus = 'Max Attack'" :class="filterStatus === 'Max Attack' ? 'bg-green-500 text-white border-green-500' : 'bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-zinc-700'" class="px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap">Max</button>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
              <tr>
                <th class="px-4 py-3">Nama Member</th>
                <th class="px-4 py-3 text-center">Status</th>
                <th class="px-4 py-3 text-center">Serangan</th>
                <th class="px-4 py-3 text-right">Loot</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredRaidStats.length === 0">
                <td colspan="4" class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">Tidak ada member yang cocok dengan pencarian.</td>
              </tr>
              <tr v-for="(r, i) in filteredRaidStats" :key="i" class="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">{{ r.name }}</td>
                <td class="px-4 py-3 text-center">
                  <span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded" 
                    :class="{
                      'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400': r.status === 'Belum Attack',
                      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400': r.status === 'Sudah Attack',
                      'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400': r.status === 'Max Attack'
                    }"
                  >
                    {{ r.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-center text-gray-700 dark:text-gray-300 font-medium">{{ r.attacks }} / {{ r.max_attacks }}</td>
                <td class="px-4 py-3 text-right text-yellow-600 dark:text-yellow-500 font-bold">{{ r.loot.toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { apiFetch } from '../../../lib/api'
import { ASSETS } from '../../../lib/assets'
import IconCapitalGold from '../../../components/icons/IconCapitalGold.vue'
import IconWar from '../../../components/icons/IconWar.vue'

const loading = ref(true)
const activeTab = ref('summary')
const searchQuery = ref('')
const filterStatus = ref('all') // Default tab yang kebuka
const capitalData = ref(null)
const donations = ref([])
const raidStats = ref([])

const filteredRaidStats = computed(() => {
  return raidStats.value.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchStatus = filterStatus.value === 'all' || r.status === filterStatus.value
    return matchSearch && matchStatus
  })
})

onMounted(async () => {
  try {
    const [cap, don, stats] = await Promise.all([
      apiFetch('/clan/capital'),
      apiFetch('/clan/capitaldonations'),
      apiFetch('/clan/raidstats')
    ])
    capitalData.value = cap
    donations.value = don
    raidStats.value = stats
  } catch (err) {
    console.error('Failed to load capital:', err)
  } finally {
    loading.value = false
  }
})

function downloadCSV() {
  if (!raidStats.value.length) return
  let csvContent = "Nama Member,Status,Serangan Terpakai,Maksimal Serangan,Loot Diperoleh\n"
  raidStats.value.forEach(row => {
    csvContent += `"${row.name}","${row.status}",${row.attacks},${row.max_attacks},${row.loot}\n`
  })
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `Raid_Rekap_${new Date().toISOString().split('T')[0]}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
