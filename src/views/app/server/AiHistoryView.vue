<template>
  <div class="space-y-6">
    <Toast ref="toast" />
    
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
              <th class="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="h in history" :key="h.id" class="border-b border-gray-100 dark:border-navy-800 hover:bg-gray-50 dark:hover:bg-navy-800/50">
              <td class="px-4 py-3">
                <span class="text-[10px] font-bold uppercase bg-purple-100 text-purple-700 px-2 py-1 rounded">{{ h.type.replace('_', ' ') }}</span>
              </td>
              <td class="px-4 py-3 text-gray-600 dark:text-gray-300">{{ new Date(h.date).toLocaleString('id-ID') }}</td>
              <td class="px-4 py-3 text-gray-600 dark:text-gray-300 truncate max-w-xs cursor-pointer hover:text-brand" @click="goToDetail(h.id)">
                {{ h.snippet }}
              </td>
              <td class="px-4 py-3 text-center flex justify-center gap-2">
                <button @click="goToDetail(h.id)" class="px-3 py-1 bg-gray-100 dark:bg-navy-800 hover:bg-gray-200 dark:hover:bg-navy-700 text-gray-700 dark:text-gray-300 text-xs font-bold rounded transition-colors">Lihat</button>
                <button @click="deleteHistory(h.id)" class="px-3 py-1 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 text-xs font-bold rounded transition-colors">Hapus</button>
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
import { useRouter, useRoute } from 'vue-router'
import { apiFetch } from '../../../lib/api'
import Toast from '../../../components/ui/Toast.vue'

const router = useRouter()
const route = useRoute()
const toast = ref(null)
const loading = ref(true)
const history = ref([])

const goToDetail = (id) => {
  router.push(`/app/server/${route.params.guildId}/ai-report/${id}`)
}

async function deleteHistory(id) {
  if(!confirm('Hapus laporan ini dari arsip?')) return;
  try {
    const res = await apiFetch(`/ai/history/${id}`, { method: 'DELETE' })
    if (res.error) throw new Error(res.error)
    history.value = history.value.filter(h => h.id !== id)
    toast.value.show('Laporan berhasil dihapus', 'success')
  } catch (err) {
    toast.value.show('Gagal menghapus: ' + err.message, 'error')
  }
}

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
