<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-brand-light dark:bg-purple-900/30 text-brand dark:text-purple-400 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">CWL Roster Maker</h2>
      </div>
      
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold text-gray-500">Ukuran Tim:</span>
        <select v-model="teamSize" class="text-sm font-bold bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-lg px-3 py-1.5 outline-none focus:border-brand">
          <option :value="15">15 vs 15</option>
          <option :value="30">30 vs 30</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 py-12 text-center">Menghitung roster terbaik...</div>
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm border border-red-200 dark:border-red-900/50">{{ error }}</div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- KOLOM KIRI: Starting Lineup -->
      <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm flex flex-col h-[calc(100vh-200px)]">
        <div class="flex justify-between items-center mb-4 shrink-0">
          <h3 class="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">Starting Lineup ({{ startingLineup.length }}/{{ teamSize }})</h3>
          <button @click="copyRoster" class="px-3 py-1.5 bg-brand hover:bg-brand-dark text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            Copy Teks
          </button>
        </div>
        
        <div class="overflow-y-auto pr-2 space-y-2 flex-1">
          <div v-for="(m, idx) in startingLineup" :key="m.tag" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-950 rounded-lg border border-gray-100 dark:border-navy-800">
            <div class="flex items-center gap-3">
              <span class="text-xs font-black text-gray-400 w-5">{{ idx + 1 }}</span>
              <div>
                <p class="text-sm font-bold text-gray-900 dark:text-white">{{ m.name }}</p>
                <p class="text-[10px] font-mono text-gray-500">TH{{ m.th }} • {{ m.war_stars }}★ • {{ m.donations }} Donasi</p>
              </div>
            </div>
            <span class="text-[9px] font-bold uppercase bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{{ m.role }}</span>
          </div>
        </div>
      </div>

      <!-- KOLOM KANAN: Exclude & Bench -->
      <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm flex flex-col h-[calc(100vh-200px)]">
        <div class="mb-4 shrink-0">
          <h3 class="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider mb-1">Daftar Member (Centang untuk Exclude)</h3>
          <p class="text-[11px] text-gray-500">Member yang dicentang tidak akan masuk hitungan roster.</p>
        </div>
        
        <div class="overflow-y-auto pr-2 space-y-2 flex-1">
          <label v-for="m in allMembers" :key="m.tag" class="flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors" :class="excludedTags.includes(m.tag) ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30 opacity-60' : 'bg-white dark:bg-navy-950 border-gray-100 dark:border-navy-800 hover:bg-gray-50 dark:hover:bg-navy-900'">
            <div class="flex items-center gap-3">
              <input type="checkbox" :value="m.tag" v-model="excludedTags" class="w-4 h-4 text-brand bg-gray-100 border-gray-300 rounded focus:ring-brand dark:focus:ring-brand dark:ring-offset-navy-900 focus:ring-2 dark:bg-navy-800 dark:border-navy-700">
              <div>
                <p class="text-sm font-bold" :class="excludedTags.includes(m.tag) ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'">{{ m.name }}</p>
                <p class="text-[10px] font-mono text-gray-500">TH{{ m.th }} • {{ m.war_stars }}★</p>
              </div>
            </div>
            <span v-if="excludedTags.includes(m.tag)" class="text-[10px] font-bold text-red-500 uppercase">Excluded</span>
            <span v-else-if="bench.some(b => b.tag === m.tag)" class="text-[10px] font-bold text-orange-500 uppercase">Cadangan</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { apiFetch } from '../../../lib/api'

const loading = ref(true)
const error = ref('')
const allMembers = ref([])
const teamSize = ref(15)
const excludedTags = ref([]) // Array buat nyimpen tag yang di-exclude

// 1. Hitung member yang eligible (gak di-exclude)
const eligibleMembers = computed(() => {
  return allMembers.value.filter(m => !excludedTags.value.includes(m.tag))
})

// 2. Ambil Starting Lineup (Sesuai ukuran tim)
const startingLineup = computed(() => {
  return eligibleMembers.value.slice(0, teamSize.value)
})

// 3. Ambil Cadangan (Sisa dari lineup)
const bench = computed(() => {
  return eligibleMembers.value.slice(teamSize.value)
})

async function loadRoster() {
  try {
    const res = await apiFetch('/ai/cwl-roster')
    if (res.error) throw new Error(res.error)
    allMembers.value = res || []
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

function copyRoster() {
  if (startingLineup.value.length === 0) return
  
  let text = `DAFTAR CWL ${teamSize.value} vs ${teamSize.value}\n\n`
  startingLineup.value.forEach((m, i) => {
    text += `${i + 1}. ${m.name} (TH${m.th})\n`
  })
  
  try {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
    } else {
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
    }
    alert('Roster berhasil di-copy!')
  } catch (err) {
    alert('Gagal copy, silakan blok manual.')
  }
}

onMounted(loadRoster)
</script>
