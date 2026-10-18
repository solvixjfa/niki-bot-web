<template>
  <div class="space-y-6 max-w-4xl mx-auto pb-10">
    <!-- Tombol Navigasi & Print (Disembunyiin pas di-print) -->
    <div class="flex justify-between items-center no-print">
      <button @click="$router.back()" class="flex items-center gap-2 text-sm text-gray-500 hover:text-brand dark:hover:text-purple-400 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Kembali
      </button>
      <button @click="printReport" class="px-4 py-2 bg-brand hover:bg-brand-dark text-white text-sm font-bold rounded-lg flex items-center gap-2 shadow-sm transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
        Export PDF
      </button>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 py-12 text-center">Memuat detail laporan...</div>
    <div v-else-if="error" class="bg-red-50 text-red-500 p-4 rounded-xl text-sm">{{ error }}</div>

    <div v-else class="space-y-6 print-container">
      <!-- Header Laporan -->
      <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-6 shadow-sm print-card">
        <div class="flex justify-between items-start mb-6 pb-4 border-b border-gray-100 dark:border-navy-800">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white capitalize">{{ report.type.replace('_', ' ') }} Report</h2>
            <p class="text-xs text-gray-500 mt-1">{{ new Date(report.date).toLocaleString('id-ID') }}</p>
          </div>
          <div class="text-right">
            <p class="text-lg font-black text-brand dark:text-purple-400">Niki Web</p>
            <p class="text-[10px] text-gray-500 uppercase">Executive AI System</p>
          </div>
        </div>
        <div class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans whitespace-pre-wrap">{{ report.narrative }}</div>
      </div>

      <!-- Metrics & Charts (Khusus Audit) -->
      <div v-if="parsedData && parsedData.total_members" class="grid grid-cols-1 md:grid-cols-3 gap-4 print-grid">
        <!-- Cards -->
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm flex flex-col justify-center print-card">
          <p class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Member</p>
          <p class="text-3xl font-black text-gray-900 dark:text-white">{{ parsedData.total_members }}</p>
        </div>
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm flex flex-col justify-center print-card">
          <p class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Rata-rata Donasi</p>
          <p class="text-3xl font-black text-green-500">{{ parsedData.avg_donations }}</p>
        </div>
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm flex flex-col justify-center print-card">
          <p class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Member Pasif</p>
          <p class="text-3xl font-black text-red-500">{{ parsedData.zero_donors_count }}</p>
        </div>

        <!-- Chart Box -->
        <div class="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 print-grid">
          <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm print-card">
            <h4 class="text-xs font-bold text-gray-500 uppercase mb-2">Top 5 Donatur</h4>
            <div class="h-48"><Bar v-if="parsedData.top_donors" :data="chartDonors" :options="chartOptions" /></div>
          </div>
          <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm print-card">
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
const parsedData = ref(null)

const chartOptions = { 
  responsive: true, 
  maintainAspectRatio: false, 
  plugins: { legend: { display: false } },
  animation: false // Matiin animasi biar grafik langsung jadi pas di-print
}

// Parse JSON aman
const parseRawData = (data) => {
  if (!data) return null
  if (typeof data === 'string') {
    try { return JSON.parse(data) } catch(e) { return null }
  }
  return data
}

const chartDonors = computed(() => {
  const donors = parsedData.value?.top_donors || []
  return {
    labels: donors.map(d => d.name),
    datasets: [{ label: 'Donasi', data: donors.map(d => d.score), backgroundColor: '#8b5cf6', borderRadius: 4 }]
  }
})

const chartActive = computed(() => {
  const active = parsedData.value?.active_members || 0
  const passive = parsedData.value?.zero_donors_count || 0
  return {
    labels: ['Aktif', 'Pasif'],
    datasets: [{ data: [active, passive], backgroundColor: ['#10b981', '#ef4444'], borderWidth: 0 }]
  }
})

function printReport() {
  window.print()
}

onMounted(async () => {
  try {
    const res = await apiFetch(`/ai/history/${route.params.id}`)
    if (res.error) throw new Error(res.error)
    report.value = res
    parsedData.value = parseRawData(res.raw_data)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style>
/* CSS KHUSUS BUAT PRINT / EXPORT PDF */
@media print {
  /* Sembunyiin elemen navigasi */
  nav, aside, header, .no-print {
    display: none !important;
  }
  
  /* Reset background jadi putih */
  body, html {
    background: #ffffff !important;
    color: #000000 !important;
    margin: 0;
    padding: 0;
  }

  /* Atur layout halaman */
  .print-container {
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin: 0;
  }

  /* Pastiin card ada border tipis dan gak kepotong */
  .print-card {
    background: #ffffff !important;
    border: 1px solid #e5e7eb !important;
    box-shadow: none !important;
    page-break-inside: avoid;
    break-inside: avoid;
    margin-bottom: 20px;
  }

  /* Teks jadi item gelap */
  .text-gray-900, .dark\:text-white, .text-gray-700, .dark\:text-gray-300 {
    color: #111827 !important;
  }

  /* Grid layout buat print */
  .print-grid {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 15px !important;
  }
  
  .md\:col-span-3 {
    grid-column: span 2 !important;
  }
}
</style>
