<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Server Overview</h2>
        <p class="text-sm text-gray-500 mt-1">Ringkasan aktivitas clan kamu.</p>
      </div>
      <span class="text-[10px] font-bold uppercase bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800">PRO TIER</span>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 py-12 text-center">Menganalisis data klan...</div>

    <div v-else class="space-y-6">
      <!-- TOP CARDS (Ringkasan Cepat) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <p class="text-xs font-bold text-gray-500 uppercase mb-2">Total Member</p>
          <p class="text-3xl font-black text-gray-900 dark:text-white">{{ stats.total_members || 41 }} <span class="text-sm font-medium text-gray-500">Orang</span></p>
        </div>
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <p class="text-xs font-bold text-gray-500 uppercase mb-2">Member Pasif</p>
          <p class="text-3xl font-black text-red-500">{{ stats.zero_donors || 10 }} <span class="text-sm font-medium text-gray-500">Orang</span></p>
        </div>
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <p class="text-xs font-bold text-gray-500 uppercase mb-2">Win Rate War</p>
          <p class="text-3xl font-black text-green-500">{{ winRate }}%</p>
        </div>
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <p class="text-xs font-bold text-gray-500 uppercase mb-2">Loot Raid Terakhir</p>
          <p class="text-3xl font-black text-yellow-500">{{ capitalStats.total_loot || '40.844' }}</p>
        </div>
      </div>

      <!-- CHARTS SECTION -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Line Chart: Tren Donasi -->
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <h3 class="font-bold text-sm text-gray-900 dark:text-white mb-4">Tren Donasi Klan (7 Hari Terakhir)</h3>
          <div class="h-64">
            <Line v-if="analytics" :data="chartDonationTrend" :options="chartOptions" />
          </div>
        </div>

        <!-- Doughnut Chart: Win Rate -->
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <h3 class="font-bold text-sm text-gray-900 dark:text-white mb-4">Statistik War</h3>
          <div class="h-64 flex justify-center">
            <Doughnut v-if="analytics" :data="chartWar" :options="chartOptions" />
          </div>
        </div>
      </div>

      <!-- BOTTOM SECTION: Top Donors & War Status -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Bar Chart: Top 5 Donatur -->
        <div class="lg:col-span-2 bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <h3 class="font-bold text-sm text-gray-900 dark:text-white mb-4">Top 5 Donatur</h3>
          <div class="h-64">
            <Bar v-if="analytics" :data="chartDonors" :options="barOptions" />
          </div>
        </div>

        <!-- Card: Status War Terakhir -->
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start mb-4">
              <div class="w-8 h-8 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <span v-if="warStatus.state" class="text-[10px] font-bold uppercase bg-gray-100 text-gray-600 px-2 py-1 rounded">{{ warStatus.state }}</span>
            </div>
            <p class="text-xs font-bold text-gray-500 uppercase mb-1">Status Terakhir</p>
            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">vs {{ warStatus.opponent_name || 'Spartiate' }}</h4>
            <p class="text-xs text-gray-500">Kita: <span class="font-bold text-gray-900 dark:text-white">{{ warStatus.clan_stars || 39 }}★</span> | Lawan: <span class="font-bold text-gray-900 dark:text-white">{{ warStatus.opp_stars || 23 }}★</span></p>
          </div>
          <RouterLink :to="`/app/server/${$route.params.guildId}/war/status`" class="text-xs font-bold text-brand hover:underline mt-4 inline-block">Cek War Status &rarr;</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { apiFetch } from '../../../lib/api'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js'
import { Bar, Doughnut, Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler)

const loading = ref(true)
const analytics = ref(null)
const stats = ref({})
const warStatus = ref({})
const capitalStats = ref({})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom', labels: { color: '#9ca3af', font: { size: 11 } } } },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 10 } } },
    y: { grid: { color: '#374151' }, ticks: { color: '#9ca3af', font: { size: 10 } } }
  }
}

const barOptions = {
  ...chartOptions,
  plugins: { legend: { display: false } }
}

const chartDonationTrend = computed(() => {
  const d = analytics.value?.donation_trend || { labels: [], data: [] }
  return {
    labels: d.labels,
    datasets: [{
      label: 'Total Donasi',
      data: d.data,
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 2,
      pointBackgroundColor: '#8b5cf6'
    }]
  }
})

const chartWar = computed(() => {
  const w = analytics.value?.war_stats || { win: 0, lose: 0 }
  return {
    labels: ['Menang', 'Kalah'],
    datasets: [{
      data: [w.win, w.lose],
      backgroundColor: ['#10b981', '#ef4444'],
      borderWidth: 0
    }]
  }
})

const chartDonors = computed(() => {
  const d = analytics.value?.top_donors || { labels: [], data: [] }
  return {
    labels: d.labels,
    datasets: [{
      label: 'Donasi',
      data: d.data,
      backgroundColor: '#8b5cf6',
      borderRadius: 4,
      maxBarThickness: 40
    }]
  }
})

const winRate = computed(() => {
  const w = analytics.value?.war_stats || { win: 0, lose: 0 }
  const total = w.win + w.lose
  if (total === 0) return 0
  return Math.round((w.win / total) * 100)
})

onMounted(async () => {
  try {
    // Nembak 3 endpoint sekaligus
    const [resDash, resWar, resCap] = await Promise.all([
      apiFetch('/clan/dashboard'),
      apiFetch('/clan/war'),
      apiFetch('/clan/capital')
    ])
    
    analytics.value = resDash
    warStatus.value = resWar || {}
    capitalStats.value = resCap || {}
    
    // Simulasi ambil data member buat stats
    const resMembers = await apiFetch('/clan/members')
    stats.value = {
      total_members: resMembers.length,
      zero_donors: resMembers.filter(m => m.donations === 0).length
    }

  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>
