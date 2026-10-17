<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 mb-4">
      <img :src="ASSETS.war" class="w-8 h-8 object-contain" alt="War" />
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">War Status</h2>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 dark:text-gray-400 text-sm">Memuat data war...</div>
    
    <div v-else-if="!war || war.state === 'notInWar'" class="bg-gray-50 dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-8 text-center">
      <p class="text-sm text-gray-600 dark:text-gray-300 font-medium">Clan ini sedang tidak dalam perang.</p>
    </div>

    <div v-else class="space-y-6">
      
      <!-- Card Live Countdown & Status -->
      <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="text-center md:text-left">
          <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Status Perang</p>
          <span class="px-3 py-1 bg-brand text-white rounded-lg text-sm font-black uppercase tracking-wider">{{ war.state }}</span>
        </div>
        
        <div class="text-center">
          <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Sisa Waktu</p>
          <div class="text-2xl font-black text-red-500 font-mono">
            {{ timeLeft }}
          </div>
        </div>

        <div class="text-center md:text-right">
          <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Waktu Selesai</p>
          <p class="text-sm font-bold text-gray-900 dark:text-white">
            {{ formatDate(war.end_time) }}
          </p>
        </div>
      </div>

      <!-- Card Skor Perang -->
      <div class="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
        <div class="flex justify-between items-center relative z-10">
          <div class="text-center flex-1">
            <div class="text-lg font-bold">Clan Kita</div>
            <div class="flex items-center justify-center gap-1.5 my-2">
              <img :src="ASSETS.star" class="w-6 h-6 object-contain" alt="Star" />
              <span class="text-3xl font-black">{{ war.clan_stars }}</span>
            </div>
            <div class="text-sm text-gray-300 font-medium">{{ war.clan_destruction }}%</div>
          </div>
          
          <div class="text-3xl font-black italic px-4 opacity-30">VS</div>
          
          <div class="text-center flex-1">
            <div class="text-lg font-bold">{{ war.opponent_name }}</div>
            <div class="flex items-center justify-center gap-1.5 my-2">
              <img :src="ASSETS.star" class="w-6 h-6 object-contain" alt="Star" />
              <span class="text-3xl font-black">{{ war.opp_stars }}</span>
            </div>
            <div class="text-sm text-gray-300 font-medium">{{ war.opp_destruction }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { apiFetch } from '../../../lib/api'
import { ASSETS } from '../../../lib/assets'

const loading = ref(true)
const war = ref(null)
const now = ref(Date.now())
let timer = null

// Logic untuk menghitung sisa waktu
const timeLeft = computed(() => {
  if (!war.value || !war.value.end_time) return '--:--:--'
  
  // Paksa string dianggap UTC kalau gak ada penanda timezone
  let endStr = war.value.end_time
  if (!endStr.endsWith('Z') && !endStr.includes('+')) {
    endStr += 'Z'
  }
  
  const end = new Date(endStr).getTime()
  const diff = end - now.value
  
  if (diff <= 0) return 'WAR BERAKHIR'
  
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

function formatDate(isoString) {
  if (!isoString) return '-'
  // Paksa string dianggap UTC kalau gak ada penanda timezone
  let iso = isoString
  if (!iso.endsWith('Z') && !iso.includes('+')) {
    iso += 'Z'
  }
  const d = new Date(iso)
  return d.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
}

onMounted(async () => {
  try {
    const data = await apiFetch('/clan/war')
    war.value = data
    
    // Jalankan timer tiap 1 detik kalau war lagi jalan
    if (data && data.state !== 'notInWar') {
      timer = setInterval(() => {
        now.value = Date.now()
      }, 1000)
    }
  } catch (err) {
    console.error('Failed to load war:', err)
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
