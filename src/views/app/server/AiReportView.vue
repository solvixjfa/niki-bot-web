<template>
  <div class="space-y-6 max-w-4xl mx-auto">
    <button @click="$router.back()" class="flex items-center gap-2 text-sm text-gray-500 hover:text-brand dark:hover:text-purple-400 transition-colors">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      Kembali ke Arsip
    </button>

    <PremiumGate v-if="isLocked" />
    <div v-else-if="loading" class="animate-pulse text-gray-500 py-12 text-center">Memuat detail laporan...</div>
    <div v-else-if="error" class="bg-red-50 text-red-500 p-4 rounded-xl text-sm">{{ error }}</div>

    <div v-else class="space-y-6">
      <!-- Laporan Utama (Teks AI) -->
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

      <!-- Metrics & Charts (Ditarik Real-time dari /ai/audit) -->
      <div v-if="auditData && auditData.total_members" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Metric Cards -->
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm flex flex-col justify-center">
          <p class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Member</p>
          <p class="text-3xl font-black text-gray-900 dark:text-white">{{ auditData.total_members }}</p>
        </div>
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm flex flex-col justify-center">
          <p class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Rata-rata Donasi</p>
          <p class="text-3xl font-black text-green-500">{{ auditData.avg_donations }}</p>
        </div>
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm flex flex-col justify-center">
          <p class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Member Pasif</p>
          <p class="text-3xl font-black text-red-500">{{ auditData.zero_donors_count }}</p>
        </div>

        <!-- Chart Visualisasi -->
        <div class="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm">
            <h4 class="text-xs font-bold text-gray-500 uppercase mb-2">Top 5 Donatur</h4>
            <div class="h-48"><Bar v-if="auditData.top_donors" :data="chartDonors" :options="chartOptions" /></div>
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
import PremiumGate from '../../../components/PremiumGate.vue'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Bar, Doughnut } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const route = useRoute()
const loading = ref(true)
const error = ref('')
const isLocked = ref(false)
const report = ref({})
const auditData = ref({}) // State baru buat nampung data real-time

const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }

// Chart Donatur (Ambil dari data real-time)
const chartDonors = computed(() => {
  const donors = auditData.value.top_donors || []
  return {
    labels: donors.map(d => d.name),
    datasets: [{ label: 'Donasi', data: donors.map(d => d.score), backgroundColor: '#8b5cf6', borderRadius: 4 }]
  }
})

// Chart Aktif vs Pasif (Ambil dari data real-time)
const chartActive = computed(() => {
  const active = auditData.value.active_members || 0
  const passive = auditData.value.zero_donors_count || 0
  return {
    labels: ['Aktif', 'Pasif'],
    datasets: [{ data: [active, passive], backgroundColor: ['#10b981', '#ef4444'], borderWidth: 0 }]
  }
})

onMounted(async () => {
  try {
    // Tembak 2 endpoint sekaligus: History (buat narasi) & Audit (buat chart)
    const [resHistory, resAudit] = await Promise.all([
      apiFetch(`/ai/history/${route.params.id}`),
      apiFetch('/ai/audit')
    ])
    
    if (resHistory.error) throw new Error(resHistory.error)
    
    report.value = resHistory
    
    // Masukin data chart dari /ai/audit
    if (resAudit && resAudit.raw_data) {
      auditData.value = resAudit.raw_data
    }
  } catch (err) {
    if (err.message.includes('403') || err.message.includes('PRO')) {
      isLocked.value = true
    } else {
      error.value = err.message
    }
  } finally {
    loading.value = false
  }
})
</script>
