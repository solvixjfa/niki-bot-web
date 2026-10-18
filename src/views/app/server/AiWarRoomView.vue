<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-brand-light dark:bg-purple-900/30 text-brand dark:text-purple-400 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">AI War Room</h2>
      </div>
      <div class="text-xs font-mono font-bold text-brand dark:text-purple-400 bg-brand-light dark:bg-purple-900/20 px-3 py-1.5 rounded-lg border border-brand/20 dark:border-purple-800/50">CREDITS: {{ credits }}</div>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 py-12 text-center">Menarik data War...</div>
    <div v-else-if="error" class="bg-gray-50 dark:bg-navy-900 border border-gray-200 dark:border-navy-800 p-12 text-center rounded-xl text-gray-500">{{ error }}</div>

    <div v-else class="space-y-6">
      <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div class="text-center flex-1">
            <p class="text-xs font-bold text-gray-500 uppercase mb-2">Klan Kita</p>
            <p class="text-4xl font-black text-gray-900 dark:text-white">{{ data.clan_stars }} <span class="text-lg text-brand">★</span></p>
            <p class="text-xs font-mono text-gray-500 mt-1">{{ data.clan_destruction }}%</p>
            <p class="text-[11px] font-bold text-brand dark:text-purple-400 mt-2 uppercase">{{ data.total_attacks_left }} Sisa Attack</p>
          </div>
          <div class="px-4 text-gray-300 dark:text-gray-600 font-mono font-black text-xl">VS</div>
          <div class="text-center flex-1">
            <p class="text-xs font-bold text-gray-500 uppercase mb-2">{{ data.opponent_name }}</p>
            <p class="text-4xl font-black text-gray-900 dark:text-white">{{ data.opp_stars }} <span class="text-lg text-gray-400">★</span></p>
            <p class="text-xs font-mono text-gray-500 mt-1">{{ data.opp_destruction }}%</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-sm text-gray-900 dark:text-white uppercase">Top 10 Rekomendasi</h3>
            <select v-model="filterTh" @change="loadWarRoom" class="text-xs bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-800 rounded px-2 py-1 outline-none">
              <option :value="null">Semua TH</option>
              <option v-for="i in [16,15,14,13,12,11,10]" :key="i" :value="i">TH {{ i }}</option>
            </select>
          </div>
          <div v-if="data.matchups.length === 0" class="text-sm text-gray-500">Tidak ada target yang cocok.</div>
          <div v-else class="space-y-2">
            <div v-for="(m, idx) in data.matchups" :key="idx" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-950 rounded-lg border border-gray-100 dark:border-navy-800">
              <div class="flex-1"><p class="text-sm font-semibold text-gray-900 dark:text-white">{{ m.attacker.name }}</p><p class="text-[10px] font-mono text-gray-500">TH{{ m.attacker.th }} • Sisa {{ m.attacker.attacks_left }} Atk</p></div>
              <div class="px-3 text-brand"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></div>
              <div class="flex-1 text-right"><p class="text-sm font-semibold text-gray-900 dark:text-white">Base #{{ m.target.map_position }}</p><p class="text-[10px] font-mono text-gray-500">TH{{ m.target.th }} • {{ m.target.stars }} Star</p></div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm flex flex-col">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-sm text-gray-900 dark:text-white uppercase">Taktik AI</h3>
            <div class="flex gap-2">
              <button @click="copyNarrative" :disabled="!narrative" class="px-3 py-2 bg-gray-100 dark:bg-navy-800 hover:bg-gray-200 dark:hover:bg-navy-700 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-lg transition-colors disabled:opacity-50" title="Copy Taktik">Copy</button>
              <button @click="enhanceAi" :disabled="isEnhancing || credits <= 0" class="px-4 py-2 bg-brand hover:bg-brand-dark text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2">
                <span v-if="isEnhancing" class="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Enhance
              </button>
            </div>
          </div>
          <div class="flex-1 bg-gray-50 dark:bg-navy-950 rounded-lg p-4 text-sm font-sans text-gray-700 dark:text-gray-300 whitespace-pre-wrap overflow-y-auto max-h-[400px] border border-gray-100 dark:border-navy-800">{{ narrative || 'Klik Enhance untuk taktik.' }}</div>
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
const data = ref({ matchups: [] })
const narrative = ref('')
const credits = ref(0)
const filterTh = ref(null)

async function loadWarRoom() {
  loading.value = true
  error.value = ''
  try {
    let url = '/ai/war-room'
    if (filterTh.value) url += `?filter_th=${filterTh.value}`
    const res = await apiFetch(url)
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
    const res = await apiFetch('/ai/war-room/enhance', { method: 'POST' })
    narrative.value = res.narrative
    credits.value = res.credits
  } catch (err) { alert('Gagal: ' + err.message) } finally { isEnhancing.value = false }
}

function copyNarrative() {
  if (!narrative.value) return
  navigator.clipboard.writeText(narrative.value)
  alert('Taktik berhasil di-copy!')
}

onMounted(loadWarRoom)
</script>
