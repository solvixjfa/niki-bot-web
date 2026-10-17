<template>
  <div>
    <PremiumGate v-if="tier === 'free'" />
    <div v-else class="space-y-6">
      
      <div class="flex items-center gap-3 mb-4">
        <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Compare Members</h2>
      </div>

      <div v-if="loadingMembers" class="animate-pulse text-gray-500">Memuat daftar member...</div>
      
      <div v-else class="space-y-6">
        <!-- Pilih Member -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm">
            <label class="label text-brand font-bold">Member 1</label>
            <select v-model="tag1" class="input w-full font-bold">
              <option value="" disabled>Pilih Member...</option>
              <option v-for="m in members" :key="m.tag" :value="m.tag">{{ m.name }} (TH{{ m.townhall_level }})</option>
            </select>
          </div>
          
          <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-4 shadow-sm">
            <label class="label text-red-500 font-bold">Member 2</label>
            <select v-model="tag2" class="input w-full font-bold">
              <option value="" disabled>Pilih Member...</option>
              <option v-for="m in members" :key="m.tag" :value="m.tag">{{ m.name }} (TH{{ m.townhall_level }})</option>
            </select>
          </div>
        </div>

        <button 
          @click="fetchCompare" 
          :disabled="!tag1 || !tag2 || tag1 === tag2 || loading"
          class="w-full py-3 bg-brand hover:bg-brand-dark text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
        >
          <span v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {{ loading ? 'Membandingkan...' : 'Bandingkan Sekarang' }}
        </button>

        <!-- Hasil Compare -->
        <div v-if="result" class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl overflow-hidden shadow-sm">
          
          <!-- Header VS -->
          <div class="grid grid-cols-2 divide-x divide-gray-200 dark:divide-navy-800">
            <div class="p-6 text-center bg-gray-50 dark:bg-navy-800/50">
              <img :src="ASSETS.getTh(result.player1.townhall_level)" class="w-12 h-12 mx-auto mb-2" />
              <h3 class="font-black text-lg text-gray-900 dark:text-white">{{ result.player1.name }}</h3>
            </div>
            <div class="p-6 text-center bg-gray-50 dark:bg-navy-800/50">
              <img :src="ASSETS.getTh(result.player2.townhall_level)" class="w-12 h-12 mx-auto mb-2" />
              <h3 class="font-black text-lg text-gray-900 dark:text-white">{{ result.player2.name }}</h3>
            </div>
          </div>

          <!-- Rows -->
          <div class="divide-y divide-gray-100 dark:divide-navy-800">
            
            <!-- TH -->
            <div class="grid grid-cols-2 text-center text-sm">
              <div class="p-3 font-bold" :class="result.player1.townhall_level >= result.player2.townhall_level ? 'text-green-500' : ''">
                TH {{ result.player1.townhall_level }}
              </div>
              <div class="p-3 font-bold" :class="result.player2.townhall_level >= result.player1.townhall_level ? 'text-green-500' : ''">
                TH {{ result.player2.townhall_level }}
              </div>
              <div class="col-span-2 text-[10px] font-bold text-gray-400 uppercase bg-gray-50 dark:bg-navy-950 py-1">Townhall Level</div>
            </div>

            <!-- Donasi -->
            <div class="grid grid-cols-2 text-center text-sm">
              <div class="p-3 font-bold" :class="result.player1.donations >= result.player2.donations ? 'text-green-500' : 'text-gray-500'">
                {{ result.player1.donations.toLocaleString() }}
              </div>
              <div class="p-3 font-bold" :class="result.player2.donations >= result.player1.donations ? 'text-green-500' : 'text-gray-500'">
                {{ result.player2.donations.toLocaleString() }}
              </div>
              <div class="col-span-2 text-[10px] font-bold text-gray-400 uppercase bg-gray-50 dark:bg-navy-950 py-1">Donasi Diberikan</div>
            </div>

            <!-- War Stars -->
            <div class="grid grid-cols-2 text-center text-sm">
              <div class="p-3 font-bold" :class="result.player1.war_stats.stars >= result.player2.war_stats.stars ? 'text-yellow-500' : 'text-gray-500'">
                {{ result.player1.war_stats.stars }} ★
              </div>
              <div class="p-3 font-bold" :class="result.player2.war_stats.stars >= result.player1.war_stats.stars ? 'text-yellow-500' : 'text-gray-500'">
                {{ result.player2.war_stats.stars }} ★
              </div>
              <div class="col-span-2 text-[10px] font-bold text-gray-400 uppercase bg-gray-50 dark:bg-navy-950 py-1">Bintang War Terakhir</div>
            </div>

            <!-- Destruction -->
            <div class="grid grid-cols-2 text-center text-sm">
              <div class="p-3 font-bold" :class="result.player1.war_stats.destruction >= result.player2.war_stats.destruction ? 'text-red-400' : 'text-gray-500'">
                {{ result.player1.war_stats.destruction }}%
              </div>
              <div class="p-3 font-bold" :class="result.player2.war_stats.destruction >= result.player1.war_stats.destruction ? 'text-red-400' : 'text-gray-500'">
                {{ result.player2.war_stats.destruction }}%
              </div>
              <div class="col-span-2 text-[10px] font-bold text-gray-400 uppercase bg-gray-50 dark:bg-navy-950 py-1">Rata-rata Kehancuran</div>
            </div>

          </div>
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
const loadingMembers = ref(true)
const loading = ref(false)
const members = ref([])
const tag1 = ref('')
const tag2 = ref('')
const result = ref(null)

async function fetchMembers() {
  try {
    members.value = await apiFetch('/clan/members')
  } catch (err) { console.error(err) } 
  finally { loadingMembers.value = false }
}

async function fetchCompare() {
  loading.value = true
  result.value = null
  try {
    const res = await apiFetch(`/clan/compare?tag1=${encodeURIComponent(tag1.value)}&tag2=${encodeURIComponent(tag2.value)}`)
    if (res.player1 && res.player2) {
      result.value = res
    }
  } catch (err) {
    console.error(err)
    alert('Gagal membandingkan member.')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (tier.value !== 'free') {
    fetchMembers()
  }
})
</script>
