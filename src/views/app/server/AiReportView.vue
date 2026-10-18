<template>
  <div class="space-y-6 max-w-4xl mx-auto">
    <button @click="$router.back()" class="flex items-center gap-2 text-sm text-gray-500 hover:text-brand dark:hover:text-purple-400 transition-colors">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      Kembali ke Arsip
    </button>

    <div v-if="loading" class="animate-pulse text-gray-500 py-12 text-center">Memuat detail laporan...</div>
    <div v-else-if="error" class="bg-red-50 text-red-500 p-4 rounded-xl text-sm">{{ error }}</div>

    <div v-else class="space-y-6">
      <!-- Laporan Utama -->
      <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-6 shadow-sm">
        <div class="flex justify-between items-start mb-6 pb-4 border-b border-gray-100 dark:border-navy-800">
          <div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white capitalize">{{ report.type.replace('_', ' ') }}</h2>
            <p class="text-xs text-gray-500 mt-1">{{ new Date(report.date).toLocaleString('id-ID') }}</p>
          </div>
          <span class="text-[10px] font-bold uppercase bg-purple-100 text-purple-700 px-2 py-1 rounded">AI Report</span>
        </div>
        <div class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans whitespace-pre-wrap">{{ report.narrative }}</div>
      </div>

      <!-- Metrics & Charts (Diolah dari Raw Data) -->
      <div v-if="report.raw_data && report.raw_data.total_members" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Metric Cards -->
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm flex flex-col justify-center">
          <p class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Member</p>
          <p class="text-3xl font-black text-gray-900 dark:text-white">{{ report.raw_data.total_members }}</p>
        </div>
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm flex flex-col justify-center">
          <p class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Rata-rata Donasi</p>
          <p class="text-3xl font-black text-green-500">{{ report.raw_data.avg_donations }}</p>
        </div>
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm flex flex-col justify-center">
          <p class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Member Pasif</p>
          <p class="text-3xl font-black text-red-500">{{ report.raw_data.zero_donors_count }}</p>
        </div>

        <!-- Chart Visualisasi (Khusus Audit) -->
        <div class="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm">
            <h4 class="text-xs font-bold text-gray-500 uppercase mb-2">Top 5 Donatur</h4>
            <div class="h-48"><Bar v-if="report.raw_data.top_donors" :data="chartDonors" :options="chartOptions" /></div>
          </div>
          <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm">
            <h4 class="text-xs font-bold text-gray-500 uppercase mb-2">Aktif vs Pasif</h4>
            <div class="h-48 flex justify-center"><Doughnut :data="chartActive" :options="chartOptions" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { apiFetch } from '../../../lib/api'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Bar, Doughnut } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const route = useRoute()
const loading = ref(true)
const error = ref('')
const report = ref({})

const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }

const chartDonors = computed(() => {
  let raw = report.value.raw_data
  if (typeof raw === 'string') {
    try { raw = JSON.parse(raw) } catch(e) {}
  }
  const donors = raw?.top_donors || []
  
  if (donors.length === 0) {
    return { labels: ['Data tidak tersedia'], datasets: [{ data: [1], backgroundColor: '#e5e7eb' }] }
  }

  return {
    labels: donors.map(d => d.name),
    datasets: [{ label: 'Donasi', data: donors.map(d => d.score), backgroundColor: '#8b5cf6', borderRadius: 4 }]
  }
})

const chartActive = computed(() => {
  const active = report.value.raw_data?.active_members || 0
  const passive = report.value.raw_data?.zero_donors_count || 0
  return {
    labels: ['Aktif', 'Pasif'],
    datasets: [{ data: [active, passive], backgroundColor: ['#10b981', '#ef4444'], borderWidth: 0 }]
  }
})

onMounted(async () => {
  try {
    const res = await apiFetch(`/ai/history/${route.params.id}`)
    if (res.error) throw new Error(res.error)
    report.value = res
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
