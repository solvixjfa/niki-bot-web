<template>
  <div>
    <PremiumGate v-if="tier === 'free'" />
    <div v-else class="space-y-6">
      
      <div v-if="loading" class="animate-pulse text-gray-500 py-8 text-center">Memuat data rekap...</div>
      <div v-else-if="error" class="text-red-500 text-sm py-8 text-center">{{ error }}</div>
      
      <div v-else>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 class="font-bold text-gray-900 dark:text-white">Rekap War vs {{ warData.opponent }}</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Status: {{ warData.state }}</p>
          </div>
          <button @click="downloadCSV" class="px-4 py-2 bg-brand hover:bg-brand-dark text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Download CSV
          </button>
        </div>

        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl overflow-hidden shadow-sm">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-navy-950 border-b border-gray-200 dark:border-navy-800">
              <tr>
                <th class="px-4 py-3">#</th>
                <th class="px-4 py-3">Nama Member</th>
                <th class="px-4 py-3 text-center">TH</th>
                <th class="px-4 py-3 text-center">Atk</th>
                <th class="px-4 py-3 text-center">Stars</th>
                <th class="px-4 py-3 text-right">Dest</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, i) in warData.data" :key="i" class="border-b border-gray-100 dark:border-navy-800 hover:bg-gray-50 dark:hover:bg-navy-800/50">
                <td class="px-4 py-3 text-gray-400 font-bold">{{ r.map_pos }}</td>
                <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">{{ r.name }}</td>
                <td class="px-4 py-3 text-center">
                  <div class="flex items-center justify-center gap-1">
                    <img :src="ASSETS.getTh(r.th)" class="w-5 h-5 object-contain" />
                    <span class="font-bold text-gray-700 dark:text-gray-300">{{ r.th }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-center text-xs text-gray-500">{{ r.attacks_used }}/{{ r.attacks_allowed }}</td>
                <td class="px-4 py-3 text-center">
                  <span class="text-yellow-500 font-bold">{{ r.total_stars }} ★</span>
                </td>
                <td class="px-4 py-3 text-right font-bold text-red-400">{{ r.total_destruction }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { apiFetch } from '../../../lib/api'
import { ASSETS } from '../../../lib/assets'
import PremiumGate from '../../../components/PremiumGate.vue'

const tier = inject('serverTier', ref('free'))
const loading = ref(true)
const error = ref('')
const warData = ref({ opponent: '', state: '', data: [] })

onMounted(async () => {
  if (tier.value === 'free') { loading.value = false; return }
  try {
    const res = await apiFetch('/clan/recap-war')
    if (res.error) error.value = res.error
    else warData.value = res
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

function downloadCSV() {
  if (!warData.value.data.length) return
  
  // Bikin header
  let csv = "Posisi,Nama,TH,Attack,Stars,Destruction%\n"
  
  // Isi data
  warData.value.data.forEach(r => {
    csv += `${r.map_pos},"${r.name}",${r.th},${r.attacks_used}/${r.attacks_allowed},${r.total_stars},${r.total_destruction}\n`
  })

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `Rekap_War_${warData.value.opponent}_${new Date().toISOString().split('T')[0]}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>
