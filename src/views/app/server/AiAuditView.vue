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

    <div v-if="loading" class="animate-pulse text-gray-500 py-12 text-center">Menganalisis data klan...</div>

    <div v-else-if="error" class="bg-red-50 text-red-500 p-4 rounded-xl text-sm">{{ error }}</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Laporan Utama -->
      <div class="md:col-span-2 space-y-4">
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
      </div>

      <!-- Widget Statistik -->
      <div class="space-y-4">
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <h3 class="font-bold text-xs text-gray-500 uppercase mb-3">Top Donatur</h3>
          <div class="space-y-2">
            <div v-for="d in raw_data.top_donors" :key="d.name" class="flex justify-between text-sm">
              <span class="text-gray-700 dark:text-gray-300">{{ d.name }}</span>
              <span class="font-bold text-green-500">{{ d.score }}</span>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <h3 class="font-bold text-xs text-gray-500 uppercase mb-3">Komposisi TH</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="th in raw_data.th_summary" :key="th.th" class="text-xs bg-gray-100 dark:bg-navy-800 px-2 py-1 rounded">
              TH{{ th.th }}: {{ th.count }}
            </span>
          </div>
        </div>
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
const narrative = ref('')
const raw_data = ref({})
const credits = ref(0)

async function loadAudit() {
  try {
    const res = await apiFetch('/ai/audit')
    if (res.error) throw new Error(res.error)
    narrative.value = res.narrative
    raw_data.value = res.raw_data
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
    const res = await apiFetch('/ai/audit/enhance', { method: 'POST' })
    narrative.value = res.narrative
    credits.value = res.credits
  } catch (err) {
    alert('Gagal enhance: ' + err.message)
  } finally {
    isEnhancing.value = false
  }
}

onMounted(loadAudit)
</script>
