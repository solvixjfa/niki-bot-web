<template>
  <div class="space-y-6">
    <Toast ref="toast" />
    
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-brand-light dark:bg-purple-900/30 text-brand dark:text-purple-400 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">AI Reports Archive</h2>
      </div>
    </div>

    <!-- TABS -->
    <div class="flex border-b border-gray-200 dark:border-navy-800">
      <button @click="activeTab = 'history'" :class="activeTab === 'history' ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'" class="px-4 py-2 text-sm font-bold border-b-2 transition-colors">AI History</button>
      <button @click="loadCwlReport(); activeTab = 'cwl'" :class="activeTab === 'cwl' ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'" class="px-4 py-2 text-sm font-bold border-b-2 transition-colors">CWL Report</button>
    </div>

    <!-- KONTEN TAB HISTORY -->
    <div v-if="activeTab === 'history'" class="space-y-4">
      <PremiumGate v-if="isLocked" />
      <div v-else-if="loadingHistory" class="animate-pulse text-gray-500 py-12 text-center">Memuat arsip laporan...</div>
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

    <!-- KONTEN TAB CWL REPORT -->
    <div v-if="activeTab === 'cwl'" class="space-y-6">
      <div v-if="loadingCwl" class="animate-pulse text-gray-500 py-12 text-center">Menghitung data CWL...</div>
      <div v-else-if="cwlError" class="bg-gray-50 dark:bg-navy-900 border border-gray-200 dark:border-navy-800 p-12 text-center rounded-xl text-gray-500">{{ cwlError }}</div>
      
      <div v-else class="space-y-6">
        <!-- Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
            <p class="text-[10px] font-bold text-gray-500 uppercase mb-1">Total Bintang Klan</p>
            <p class="text-3xl font-black text-yellow-500">{{ cwlData.total_klan_bintang }} ★</p>
          </div>
          <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
            <p class="text-[10px] font-bold text-gray-500 uppercase mb-1">Efisiensi Attack</p>
            <p class="text-3xl font-black text-brand dark:text-purple-400">{{ cwlData.efficiency }}%</p>
          </div>
          <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
            <p class="text-[10px] font-bold text-gray-500 uppercase mb-1">Total War CWL</p>
            <p class="text-3xl font-black text-gray-900 dark:text-white">{{ cwlData.total_wars }}</p>
          </div>
        </div>

        <!-- MVP & Slackers -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
            <h3 class="font-bold text-sm text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Top 3 MVP</h3>
            <div class="space-y-3">
              <div v-for="(m, i) in cwlData.mvp" :key="m.name" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-950 rounded-lg border border-gray-100 dark:border-navy-800">
                <div class="flex items-center gap-3">
                  <span class="text-lg font-black text-brand dark:text-purple-400">#{{ i+1 }}</span>
                  <div>
                    <p class="text-sm font-bold text-gray-900 dark:text-white">{{ m.name }}</p>
                    <p class="text-[10px] font-mono text-gray-500">TH{{ m.th }} • {{ m.attacks_used }} Attacks</p>
                  </div>
                </div>
                <span class="text-sm font-black text-yellow-500">{{ m.stars }} ★</span>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
            <h3 class="font-bold text-sm text-red-500 mb-4 uppercase tracking-wider">Member Tanpa Attack</h3>
            <div v-if="cwlData.slackers.length === 0" class="text-sm text-gray-500">Semua member menggunakan attack-nya. Mantap!</div>
            <div v-else class="space-y-2 max-h-60 overflow-y-auto pr-2">
              <div v-for="s in cwlData.slackers" :key="s.name" class="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
                <p class="text-sm font-bold text-gray-700 dark:text-gray-300">{{ s.name }}</p>
                <p class="text-[10px] font-mono text-red-500">TH{{ s.th }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { apiFetch } from '../../../lib/api'
import PremiumGate from '../../../components/PremiumGate.vue'
import Toast from '../../../components/ui/Toast.vue'

const router = useRouter()
const route = useRoute()
const toast = ref(null)

const activeTab = ref('history')

// State History
const loadingHistory = ref(true)
const isLocked = ref(false)
const history = ref([])

// State CWL
const loadingCwl = ref(false)
const cwlError = ref('')
const cwlData = ref({})

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

async function loadCwlReport() {
  if (cwlData.value.total_wars) return; // Cegah double fetch
  loadingCwl.value = true
  cwlError.value = ''
  try {
    const res = await apiFetch('/ai/cwl-report')
    if (res.error) throw new Error(res.error)
    cwlData.value = res
  } catch (err) {
    cwlError.value = err.message
  } finally {
    loadingCwl.value = false
  }
}

onMounted(async () => {
  try {
    const res = await apiFetch('/ai/history')
    history.value = res || []
  } catch (err) {
    if (err.message.includes('403') || err.message.includes('PRO')) {
      isLocked.value = true
    } else {
      console.error(err)
    }
  } finally {
    loadingHistory.value = false
  }
})
</script>
