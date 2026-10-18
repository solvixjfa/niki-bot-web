<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Admin Overview</h2>
      <p class="text-sm text-gray-500 mt-1">Ringkasan seluruh ekosistem Niki.</p>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 text-center py-12">Memuat data...</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
        <p class="text-xs font-bold text-gray-500 uppercase mb-2">Total Servers</p>
        <p class="text-3xl font-black text-gray-900 dark:text-white">{{ stats.total_servers }}</p>
      </div>
      <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
        <p class="text-xs font-bold text-gray-500 uppercase mb-2">Pro Users</p>
        <p class="text-3xl font-black text-brand dark:text-purple-400">{{ stats.pro_servers }}</p>
      </div>
      <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
        <p class="text-xs font-bold text-gray-500 uppercase mb-2">Standard Users</p>
        <p class="text-3xl font-black text-blue-500">{{ stats.std_servers }}</p>
      </div>
      <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
        <p class="text-xs font-bold text-gray-500 uppercase mb-2">Pending Requests</p>
        <p class="text-3xl font-black text-red-500">{{ stats.pending_reqs }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiFetch } from '../../lib/api'
import { showToast } from '../../lib/toast'

const loading = ref(true)
const stats = ref({ total_servers: 0, pro_servers: 0, std_servers: 0, pending_reqs: 0 })

onMounted(async () => {
  try {
    stats.value = await apiFetch('/admin/stats')
  } catch (err) {
    showToast('Gagal load stats', 'error')
  } finally {
    loading.value = false
  }
})
</script>
