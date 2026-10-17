<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Daftar Member</h2>
      <span class="text-xs font-bold bg-purple-100 dark:bg-navy-800 text-brand dark:text-purple-400 px-2 py-1 rounded">{{ members.length }} Orang</span>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 dark:text-gray-400 text-sm">Memuat data member dari database...</div>
    
    <div v-else-if="members.length === 0" class="bg-gray-50 dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-xl p-8 text-center">
      <p class="text-sm text-gray-600 dark:text-gray-300 font-medium">Belum ada data member.</p>
    </div>

    <div v-else class="space-y-4">
      <!-- Ringkasan Statistik Clan -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm flex flex-col justify-center">
          <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Member</span>
          <span class="text-xl font-black text-gray-900 dark:text-white">{{ members.length }}</span>
        </div>
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm flex flex-col justify-center">
          <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Donasi</span>
          <span class="text-xl font-black text-green-600 dark:text-green-400">{{ totalDonations.toLocaleString() }}</span>
        </div>
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm flex flex-col justify-center">
          <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">TH Tertinggi</span>
          <div class="flex items-center gap-2">
            <img :src="ASSETS.getTh(highestTH)" class="w-6 h-6 object-contain" />
            <span class="text-xl font-black text-gray-900 dark:text-white">{{ highestTH }}</span>
          </div>
        </div>
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm flex flex-col justify-center">
          <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">TH Terendah</span>
          <div class="flex items-center gap-2">
            <img :src="ASSETS.getTh(lowestTH)" class="w-6 h-6 object-contain" />
            <span class="text-xl font-black text-gray-900 dark:text-white">{{ lowestTH }}</span>
          </div>
        </div>
      </div>

      <!-- Tabel Member -->
      <div class="overflow-x-auto bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-navy-950 border-b border-gray-200 dark:border-navy-800">
            <tr>
              <th class="px-4 py-3">Nama</th>
              <th class="px-4 py-3">Role</th>
              <th class="px-4 py-3 text-center">TH</th>
              <th class="px-4 py-3 text-right">Donasi</th>
            </tr>
          </thead>
          <tbody class="text-gray-900 dark:text-gray-100">
            <tr 
              v-for="m in members" 
              :key="m.tag" 
              @click="openMemberStats(m.tag)"
              class="border-b border-gray-100 dark:border-navy-800 hover:bg-gray-50 dark:hover:bg-navy-800/50 cursor-pointer transition-colors"
            >
              <td class="px-4 py-3 font-medium text-brand dark:text-purple-400 hover:underline">{{ m.name }}</td>
              <td class="px-4 py-3 text-gray-500 dark:text-gray-400">{{ m.role }}</td>
              <td class="px-4 py-3 text-center">
                <div class="flex items-center justify-center gap-1">
                  <img :src="ASSETS.getTh(m.townhall_level)" class="w-6 h-6 object-contain drop-shadow-sm" :alt="'TH ' + m.townhall_level" />
                  <span class="font-bold">{{ m.townhall_level }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-right text-green-600 dark:text-green-400 font-medium">{{ m.donations }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <MemberStatsModal 
      :is-open="isModalOpen" 
      :player-tag="selectedPlayerTag" 
      @close="isModalOpen = false" 
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { apiFetch } from '../../../lib/api'
import { ASSETS } from '../../../lib/assets'
import MemberStatsModal from '../../../components/MemberStatsModal.vue'

const loading = ref(true)
const members = ref([])
const isModalOpen = ref(false)
const selectedPlayerTag = ref('')

// Hitung Statistik Clan
const totalDonations = computed(() => {
  return members.value.reduce((sum, m) => sum + (m.donations || 0), 0)
})

const highestTH = computed(() => {
  if (members.value.length === 0) return 1
  return Math.max(...members.value.map(m => m.townhall_level || 1))
})

const lowestTH = computed(() => {
  if (members.value.length === 0) return 1
  // Filter dulu yang TH-nya > 0 biar gak error kalau ada data kosong
  const validTHs = members.value.filter(m => (m.townhall_level || 0) > 0).map(m => m.townhall_level)
  if (validTHs.length === 0) return 1
  return Math.min(...validTHs)
})

function openMemberStats(tag) {
  selectedPlayerTag.value = tag
  isModalOpen.value = true
}

onMounted(async () => {
  try {
    const data = await apiFetch('/clan/members')
    members.value = data
  } catch (err) {
    console.error('Failed to load members:', err)
  } finally {
    loading.value = false
  }
})
</script>
