<template>
  <div>
    <PremiumGate v-if="tier === 'free'" />
    <div v-else class="space-y-6">
      <Toast ref="toast" />

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
        <div class="lg:col-span-2 bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div class="p-5 border-b border-gray-200 dark:border-navy-800 flex justify-between items-center bg-gray-50 dark:bg-navy-950 shrink-0">
            <h3 class="font-bold text-sm text-gray-900 dark:text-white">Riwayat Apresiasi</h3>
          </div>

          <div v-if="loading" class="p-8 text-center text-gray-500 animate-pulse">Memuat data...</div>
          <div v-else-if="rewards.length === 0" class="p-8 text-center text-gray-500">Belum ada riwayat pembagian reward.</div>

          <!-- Bungkus tabel pakai overflow-x-auto -->
          <div v-else class="overflow-x-auto w-full">
            <table class="w-full text-sm text-left whitespace-nowrap">
              <thead class="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700">
                <tr>
                  <th class="px-4 py-3">Nama Member</th>
                  <th class="px-4 py-3">Tipe</th>
                  <th class="px-4 py-3">Catatan</th>
                  <th class="px-4 py-3 text-right">Tanggal</th>
                  <th class="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in rewards" :key="r.id" class="border-b border-gray-100 dark:border-navy-800 hover:bg-gray-50 dark:hover:bg-navy-800/50">
                  <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">{{ r.name }}</td>
                  <td class="px-4 py-3">
                    <span class="text-[10px] font-bold uppercase bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-2 py-0.5 rounded">{{ r.scope || 'clan' }}</span>
                  </td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-normal max-w-[200px] truncate" :title="r.note">{{ r.note }}</td>
                  <td class="px-4 py-3 text-right text-xs text-gray-500">{{ formatDate(r.date) }}</td>
                  <td class="px-4 py-3">
                    <div class="flex items-center justify-center gap-2">
                      <button @click="openEditModal(r)" class="p-1.5 text-blue-500 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/30 rounded transition-colors" title="Edit">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </button>
                      <button @click="deleteReward(r.id)" class="p-1.5 text-red-500 hover:text-red-700 bg-red-50 dark:bg-red-900/30 rounded transition-colors" title="Hapus">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Edit -->
    <EditRewardModal 
      :is-open="isEditModalOpen" 
      :reward="selectedReward" 
      :loading="loadingEdit"
      @close="isEditModalOpen = false"
      @save="submitEdit"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { apiFetch, clearApiCache } from '../../../lib/api' // Import clearApiCache
import PremiumGate from '../../../components/PremiumGate.vue'
import CustomSelect from '../../../components/ui/CustomSelect.vue'
import Toast from '../../../components/ui/Toast.vue'
import EditRewardModal from '../../../components/ui/EditRewardModal.vue'

const injectedTier = inject('serverTier', ref('free'))
const tier = computed(() => injectedTier.value)

const toast = ref(null)
const loading = ref(true)
const loadingSubmit = ref(false)
const members = ref([])
const rewards = ref([])

// State untuk Modal Edit
const isEditModalOpen = ref(false)
const selectedReward = ref(null)
const loadingEdit = ref(false)

const form = ref({ player_tag: '', reward_note: '' })

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

async function fetchData(isRefresh = false) {
  if (isRefresh) clearApiCache() // Bersihin cache kalau abis edit/hapus
  try {
    const [mem, rew] = await Promise.all([
      apiFetch('/clan/members'),
      apiFetch('/clan/rewards')
    ])
    members.value = mem || []
    rewards.value = rew || []
  } catch (err) {
    console.error(err)
    toast.value?.show('Gagal memuat data: ' + err.message, 'error')
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
    
    form.value = { player_tag: '', reward_note: '' }
    await fetchData(true) // true = refresh cache
    toast.value.show('Reward berhasil disimpan!', 'success')
  } catch (err) {
    toast.value.show('Gagal menyimpan: ' + err.message, 'error')
  } finally {
    loadingSubmit.value = false
  }
}

function openEditModal(reward) {
  selectedReward.value = reward
  isEditModalOpen.value = true
}

async function submitEdit(payload) {
  loadingEdit.value = true
  try {
    const res = await apiFetch(`/clan/rewards/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify({ reward_note: payload.note })
    })
    if (res.error) throw new Error(res.error)
    
    isEditModalOpen.value = false
    await fetchData(true) // true = refresh cache
    toast.value.show('Reward berhasil diupdate!', 'success')
  } catch (err) {
    toast.value.show('Gagal mengupdate: ' + err.message, 'error')
  } finally {
    loadingEdit.value = false
  }
}

async function deleteReward(id) {
  if (!confirm('Apakah Anda yakin ingin menghapus riwayat ini?')) return
  try {
    const res = await apiFetch(`/clan/rewards/${id}`, { method: 'DELETE' })
    if (res.error) throw new Error(res.error)
    
    await fetchData(true) // true = refresh cache
    toast.value.show('Riwayat berhasil dihapus!', 'success')
  } catch (err) {
    toast.value.show('Gagal menghapus: ' + err.message, 'error')
  }
}

onMounted(() => {
  if (tier.value !== 'free') fetchData()
})
</script>
