<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Admin Overview</h2>
      <p class="text-sm text-gray-500 mt-1">Ringkasan seluruh ekosistem Niki.</p>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 text-center py-12">Memuat data...</div>

    <div v-else class="space-y-6">
      <!-- Card Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <p class="text-xs font-bold text-gray-500 uppercase mb-2">Total Servers</p>
          <p class="text-3xl font-black text-gray-900 dark:text-white">{{ stats.total_servers }}</p>
        </div>
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <p class="text-xs font-bold text-gray-500 uppercase mb-2">Pro Users</p>
          <p class="text-3xl font-black text-brand dark:text-purple-400">{{ stats.pro_servers }}</p>
        </div>
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <p class="text-xs font-bold text-gray-500 uppercase mb-2">Views (30d)</p>
          <p class="text-3xl font-black text-green-500">{{ analytics.total_views || 0 }}</p>
        </div>
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <p class="text-xs font-bold text-gray-500 uppercase mb-2">Unique Users (30d)</p>
          <p class="text-3xl font-black text-blue-500">{{ analytics.unique_users || 0 }}</p>
        </div>
      </div>

      <!-- Grafik -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <h3 class="font-bold text-sm text-gray-900 dark:text-white mb-4">Tren Kunjungan (7 Hari Terakhir)</h3>
          <div class="h-64"><Line v-if="analytics.daily_trend" :data="chartData" :options="chartOptions" /></div>
        </div>

        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <h3 class="font-bold text-sm text-gray-900 dark:text-white mb-4">Top Pages (30d)</h3>
          <div class="space-y-3">
            <div v-for="(p, i) in analytics.top_pages" :key="i" class="flex justify-between text-sm border-b border-gray-100 dark:border-navy-800 pb-2">
              <span class="text-gray-600 dark:text-gray-300 truncate max-w-[150px]">{{ p.path }}</span>
              <span class="font-bold text-brand dark:text-purple-400">{{ p.views }} views</span>
            </div>
            <p v-if="!analytics.top_pages || analytics.top_pages.length === 0" class="text-sm text-gray-500">Belum ada data.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { apiFetch } from '../../lib/api'
import { showToast } from '../../lib/toast'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const loading = ref(true)
const stats = ref({ total_servers: 0, pro_servers: 0, std_servers: 0, pending_reqs: 0 })
const analytics = ref({ total_views: 0, unique_users: 0, daily_trend: { labels: [], data: [] }, top_pages: [] })

const chartOptions = { 
  responsive: true, 
  maintainAspectRatio: false, 
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 10 } } },
    y: { grid: { color: '#374151' }, ticks: { color: '#9ca3af', font: { size: 10 } } }
  }
}

const chartData = computed(() => {
  return {
    labels: analytics.value.daily_trend?.labels || [],
    datasets: [{
      data: analytics.value.daily_trend?.data || [],
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 2,
      pointBackgroundColor: '#8b5cf6'
    }]
  }
})

onMounted(async () => {
  try {
    const [s, a] = await Promise.all([
      apiFetch('/admin/stats'),
      apiFetch('/admin/analytics/overview')
    ])
    stats.value = s
    analytics.value = a
  } catch (err) {
    showToast('Gagal load analytics', 'error')
  } finally {
    loading.value = false
  }
})
</script>
