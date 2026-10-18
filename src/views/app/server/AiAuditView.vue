<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">AI Clan Audit</h2>
      </div>
      <div class="text-xs font-bold bg-brand-light text-brand dark:bg-purple-900/50 dark:text-purple-300 px-3 py-1.5 rounded-lg flex items-center gap-1">
        Credits: {{ credits }}
      </div>
    </div>

    <PremiumGate v-if="isLocked" />
    <div v-else-if="loading" class="animate-pulse text-gray-500 py-12 text-center">Menganalisis data klan...</div>
    <div v-else-if="error" class="bg-red-50 text-red-500 p-4 rounded-xl text-sm">{{ error }}</div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- KOLOM KIRI: Laporan & Charts -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-6 shadow-sm">
          <div class="flex justify-between items-center mb-4 pb-4 border-b border-gray-100 dark:border-navy-800">
            <h3 class="font-bold text-gray-900 dark:text-white">Laporan Eksekutif</h3>
            <button @click="enhanceAi" :disabled="isEnhancing || credits <= 0" class="px-4 py-2 bg-gradient-to-r from-purple-600 to-brand text-white text-xs font-bold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2">
              <span v-if="isEnhancing" class="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
              {{ isEnhancing ? 'Menghasilkan...' : 'Enhance with AI' }}
            </button>
          </div>
          <pre class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{{ narrative }}</pre>
        </div>

        <div v-if="raw_data.total_members > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm">
            <h4 class="text-xs font-bold text-gray-500 uppercase mb-2">Top 5 Donatur</h4>
            <div class="h-48"><Bar :data="chartDonors" :options="chartOptions" /></div>
          </div>
          <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm">
            <h4 class="text-xs font-bold text-gray-500 uppercase mb-2">Aktif vs Pasif</h4>
            <div class="h-48 flex justify-center"><Doughnut :data="chartActive" :options="chartOptions" /></div>
          </div>
        </div>
      </div>

      <!-- KOLOM KANAN: History -->
      <div class="space-y-4">
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <h3 class="font-bold text-xs text-gray-500 uppercase mb-3">Riwayat AI Report</h3>
          <div v-if="history.length === 0" class="text-sm text-gray-400">Belum ada history.</div>
          <div v-else class="space-y-3">
            <RouterLink v-for="h in history" :key="h.id" :to="`/app/server/${$route.params.guildId}/ai-report/${h.id}`" class="block p-3 bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-700 transition-colors cursor-pointer">
              <div class="flex justify-between items-center mb-1">
                <span class="text-[10px] font-bold text-purple-600 uppercase">{{ h.type }}</span>
                <span class="text-[10px] text-gray-400">{{ new Date(h.date).toLocaleDateString('id-ID') }}</span>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">{{ h.snippet }}</p>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { apiFetch } from '../../../lib/api'
import PremiumGate from '../../../components/PremiumGate.vue'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Bar, Doughnut } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const loading = ref(true)
const isEnhancing = ref(false)
const error = ref('')
const isLocked = ref(false)
const narrative = ref('')
const raw_data = ref({})
const credits = ref(0)
const history = ref([])

const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }

const chartDonors = computed(() => {
  const donors = raw_data.value.top_donors || []
  return {
    labels: donors.map(d => d.name),
    datasets: [{ label: 'Donasi', data: donors.map(d => d.score), backgroundColor: '#8b5cf6', borderRadius: 4 }]
  }
})

const chartActive = computed(() => {
  const active = raw_data.value.active_members || 0
  const passive = raw_data.value.zero_donors_count || 0
  return {
    labels: ['Aktif', 'Pasif'],
    datasets: [{ data: [active, passive], backgroundColor: ['#10b981', '#ef4444'], borderWidth: 0 }]
  }
})

async function loadAudit() {
  try {
    const [resAudit, resHistory] = await Promise.all([ apiFetch('/ai/audit'), apiFetch('/ai/history') ])
    if (resAudit.error) throw new Error(resAudit.error)
    narrative.value = resAudit.narrative
    raw_data.value = resAudit.raw_data
    credits.value = resAudit.credits
    history.value = resHistory || []
  } catch (err) {
    if (err.message.includes('403') || err.message.includes('PRO')) {
      isLocked.value = true
    } else {
      error.value = err.message
    }
  } finally {
    loading.value = false
  }
}

async function enhanceAi() {
  isEnhancing.value = true
  try {
    const res = await apiFetch('/ai/audit/enhance', { method: 'POST' })
    narrative.value = res.narrative
    credits.value = res.credits
    const resHistory = await apiFetch('/ai/history')
    history.value = resHistory || []
  } catch (err) {
    alert('Gagal enhance: ' + err.message)
  } finally {
    isEnhancing.value = false
  }
}

onMounted(loadAudit)
</script>
