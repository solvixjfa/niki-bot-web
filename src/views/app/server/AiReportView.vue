<template>
  <div class="space-y-6 max-w-4xl mx-auto">
    <!-- Tombol Back -->
    <button @click="$router.back()" class="flex items-center gap-2 text-sm text-gray-500 hover:text-brand dark:hover:text-purple-400 transition-colors">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      Kembali
    </button>

    <div v-if="loading" class="animate-pulse text-gray-500 py-12 text-center">Memuat laporan...</div>
    <div v-else-if="error" class="bg-red-50 text-red-500 p-4 rounded-xl text-sm">{{ error }}</div>

    <div v-else class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-6 shadow-sm">
      <div class="flex justify-between items-start mb-6 pb-4 border-b border-gray-100 dark:border-navy-800">
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white capitalize">{{ report.type.replace('_', ' ') }}</h2>
          <p class="text-xs text-gray-500 mt-1">{{ new Date(report.date).toLocaleString('id-ID') }}</p>
        </div>
        <span class="text-[10px] font-bold uppercase bg-purple-100 text-purple-700 px-2 py-1 rounded">AI Report</span>
      </div>

      <div class="prose dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans whitespace-pre-wrap">{{ report.narrative }}</div>

      <!-- Raw Data -->
      <div v-if="report.raw_data" class="mt-6 pt-4 border-t border-gray-100 dark:border-navy-800">
        <h4 class="text-xs font-bold text-gray-500 uppercase mb-2">Raw Data Snapshot</h4>
        <pre class="text-xs bg-gray-50 dark:bg-navy-800 p-3 rounded-lg overflow-x-auto text-gray-600 dark:text-gray-400">{{ JSON.stringify(report.raw_data, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { apiFetch } from '../../../lib/api'

const route = useRoute()
const loading = ref(true)
const error = ref('')
const report = ref({})

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
