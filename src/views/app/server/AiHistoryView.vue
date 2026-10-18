<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
      </div>
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">AI Reports Archive</h2>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 py-12 text-center">Memuat arsip laporan...</div>
    
    <div v-else-if="history.length === 0" class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-12 text-center shadow-sm">
      <p class="text-gray-500">Belum ada arsip laporan AI. Silakan buat laporan baru di menu AI Audit.</p>
    </div>

    <div v-else class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700">
            <tr>
              <th class="px-4 py-3">Tipe Laporan</th>
              <th class="px-4 py-3">Tanggal Dibuat</th>
              <th class="px-4 py-3">Ringkasan</th>
              <th class="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="h in history" :key="h.id" class="border-b border-gray-100 dark:border-navy-800 hover:bg-gray-50 dark:hover:bg-navy-800/50">
              <td class="px-4 py-3">
                <span class="text-[10px] font-bold uppercase bg-purple-100 text-purple-700 px-2 py-1 rounded">{{ h.type.replace('_', ' ') }}</span>
              </td>
              <td class="px-4 py-3 text-gray-600 dark:text-gray-300">{{ new Date(h.date).toLocaleString('id-ID') }}</td>
              <td class="px-4 py-3 text-gray-600 dark:text-gray-300 truncate max-w-xs">{{ h.snippet }}</td>
              <td class="px-4 py-3 text-right">
                <RouterLink :to="`/app/server/${$route.params.guildId}/ai-report/${h.id}`" class="text-xs font-bold text-brand hover:underline">Lihat Detail</RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiFetch } from '../../../lib/api'

const loading = ref(true)
const history = ref([])

onMounted(async () => {
  try {
    const res = await apiFetch('/ai/history')
    history.value = res || []
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>
