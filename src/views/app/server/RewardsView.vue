<template>
  <div>
    <PremiumGate v-if="tier === 'free'" />
    <div v-else class="space-y-6">
      
      <div class="flex items-center gap-3 mb-4">
        <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Reward Management</h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Form Kasih Reward -->
        <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm h-fit">
          <h3 class="font-bold text-sm text-gray-900 dark:text-white mb-4">Beri Apresiasi</h3>
          
          <div class="space-y-4">
            <div>
              <label class="label mb-1 block">Pilih Member</label>
              <CustomSelect v-model="form.player_tag" :options="memberOptions" placeholder="Pilih Member..." />
            </div>
            
            <div>
              <label class="label mb-1 block">Catatan / Hadiah</label>
              <textarea v-model="form.reward_note" rows="3" class="textarea" placeholder="Contoh: MVP War, Top Donasi, dll..."></textarea>
            </div>

            <button @click="submitReward" :disabled="!form.player_tag || !form.reward_note || loadingSubmit" class="w-full py-2.5 bg-brand hover:bg-brand-dark text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
              <span v-if="loadingSubmit" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              {{ loadingSubmit ? 'Menyimpan...' : 'Simpan Reward' }}
            </button>
          </div>
        </div>

        <!-- Tabel History -->
        <div class="lg:col-span-2 bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl shadow-sm overflow-hidden">
          <div class="p-5 border-b border-gray-200 dark:border-navy-800 flex justify-between items-center bg-gray-50 dark:bg-navy-950">
            <h3 class="font-bold text-sm text-gray-900 dark:text-white">Riwayat Apresiasi</h3>
          </div>
          
          <div v-if="loading" class="p-8 text-center text-gray-500 animate-pulse">Memuat data...</div>
          
          <div v-else-if="rewards.length === 0" class="p-8 text-center text-gray-500">
            Belum ada riwayat pembagian reward.
          </div>
          
          <table v-else class="w-full text-sm text-left">
            <thead class="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700">
              <tr>
                <th class="px-4 py-3">Nama Member</th>
                <th class="px-4 py-3">Tipe</th>
                <th class="px-4 py-3">Catatan</th>
                <th class="px-4 py-3 text-right">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in rewards" :key="r.id" class="border-b border-gray-100 dark:border-navy-800 hover:bg-gray-50 dark:hover:bg-navy-800/50">
                <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">{{ r.name }}</td>
                <td class="px-4 py-3">
                  <span class="text-[10px] font-bold uppercase bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-2 py-0.5 rounded">{{ r.scope || 'clan' }}</span>
                </td>
                <td class="px-4 py-3 text-gray-600 dark:text-gray-300">{{ r.note }}</td>
                <td class="px-4 py-3 text-right text-xs text-gray-500">{{ formatDate(r.date) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { apiFetch } from '../../../lib/api'
import PremiumGate from '../../../components/PremiumGate.vue'
import CustomSelect from '../../../components/ui/CustomSelect.vue'

const injectedTier = inject('serverTier', ref('free'))
const tier = computed(() => injectedTier.value)

const loading = ref(true)
const loadingSubmit = ref(false)
const members = ref([])
const rewards = ref([])

const form = ref({
  player_tag: '',
  reward_note: ''
})

const memberOptions = computed(() => {
  return members.value.map(m => ({
    value: m.tag,
    label: `${m.name} (TH${m.townhall_level})`
  }))
})

function formatDate(isoStr) {
  if (!isoStr) return '-'
  return new Date(isoStr).toLocaleDateString('id-ID', { dateStyle: 'medium' })
}

async function fetchData() {
  try {
    const [mem, rew] = await Promise.all([
      apiFetch('/clan/members'),
      apiFetch('/clan/rewards')
    ])
    members.value = mem || []
    rewards.value = rew || []
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

async function submitReward() {
  loadingSubmit.value = true
  try {
    const res = await apiFetch('/clan/rewards', {
      method: 'POST',
      body: JSON.stringify(form.value)
    })
    if (res.error) throw new Error(res.error)
    
    // Reset form & refresh
    form.value = { player_tag: '', reward_note: '' }
    await fetchData()
    alert('Reward berhasil disimpan!')
  } catch (err) {
    alert('Gagal menyimpan: ' + err.message)
  } finally {
    loadingSubmit.value = false
  }
}

onMounted(() => {
  if (tier.value !== 'free') fetchData()
})
</script>
