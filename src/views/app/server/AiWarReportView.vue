<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-brand-light dark:bg-purple-900/30 text-brand dark:text-purple-400 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Post-War Report</h2>
      </div>
      <div class="text-xs font-mono font-bold text-brand dark:text-purple-400 bg-brand-light dark:bg-purple-900/20 px-3 py-1.5 rounded-lg border border-brand/20 dark:border-purple-800/50">CREDITS: {{ credits }}</div>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 py-12 text-center">Menganalisis data Post-War...</div>
    <div v-else-if="error" class="bg-gray-50 dark:bg-navy-900 border border-gray-200 dark:border-navy-800 p-12 text-center rounded-xl text-gray-500">{{ error }}</div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Statistik Rule-Based -->
      <div class="space-y-4">
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-6 shadow-sm text-center">
          <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Hasil Akhir</p>
          <p class="text-3xl font-black text-gray-900 dark:text-white mb-1">{{ data.war_result }}</p>
          <p class="text-sm text-gray-500">vs {{ data.opponent_name }}</p>
          <p class="text-xl font-bold text-brand dark:text-purple-400 mt-3">{{ data.clan_stars }} ★ - {{ data.opp_stars }} ★</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm text-center flex flex-col justify-center">
            <p class="text-[10px] font-bold text-gray-500 uppercase mb-1">Efisiensi Attack</p>
            <p class="text-2xl font-black text-gray-900 dark:text-white">{{ data.attack_efficiency }}%</p>
          </div>
          <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm text-center flex flex-col justify-center">
            <p class="text-[10px] font-bold text-gray-500 uppercase mb-1">MVP War</p>
            <p class="text-sm font-black text-brand dark:text-purple-400">{{ data.mvp?.name || '-' }}</p>
            <p class="text-[10px] text-gray-500">{{ data.mvp?.stars || 0 }} Bintang</p>
          </div>
        </div>

        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <h4 class="text-xs font-bold text-red-500 uppercase tracking-wider mb-3">Member Tanpa Attack (0x)</h4>
          <div v-if="data.slackers.length === 0" class="text-sm text-gray-500">Semua member menggunakan attack-nya. Mantap!</div>
          <ul v-else class="space-y-2">
            <li v-for="s in data.slackers" :key="s.name" class="flex justify-between text-sm bg-red-50 dark:bg-red-900/10 p-2 rounded border border-red-100 dark:border-red-900/30">
              <span class="text-gray-700 dark:text-gray-300">{{ s.name }}</span>
              <span class="text-[10px] font-mono text-red-500">TH{{ s.th }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- AI Feedback -->
      <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm flex flex-col">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-bold text-sm text-gray-900 dark:text-white uppercase">Evaluasi AI</h3>
          <button @click="enhanceAi" :disabled="isEnhancing || credits <= 0" class="px-4 py-2 bg-brand hover:bg-brand-dark text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2">
            <span v-if="isEnhancing" class="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Enhance
          </button>
        </div>
        <div class="flex-1 bg-gray-50 dark:bg-navy-950 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap border border-gray-100 dark:border-navy-800">{{ narrative || 'Klik Enhance untuk mendapatkan evaluasi pasca-war.' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiFetch } from '../../../lib/api'

const loading = ref(true)
const isEnhancing = ref(false)
const error = ref('')
const data = ref({})
const narrative = ref('')
const credits = ref(0)

async function loadReport() {
  try {
    const res = await apiFetch('/ai/war-report')
    if (res.error) throw new Error(res.error)
    data.value = res
    credits.value = res.credits
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

async function enhanceAi() {
  isEnhancing.value = true
  try {
    const res = await apiFetch('/ai/war-report/enhance', { method: 'POST' })
    narrative.value = res.narrative
    credits.value = res.credits
  } catch (err) { alert('Gagal: ' + err.message) } finally { isEnhancing.value = false }
}

onMounted(loadReport)
</script>
