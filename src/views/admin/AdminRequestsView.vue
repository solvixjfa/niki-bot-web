<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Upgrade Requests</h2>
      <p class="text-sm text-gray-500 mt-1">Daftar user yang minta upgrade tier.</p>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 text-center py-12">Memuat data...</div>
    <div v-else-if="requests.length === 0" class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 p-12 text-center rounded-xl text-gray-500">
      Belum ada antrean upgrade.
    </div>

    <div v-else class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl shadow-sm overflow-hidden">
      <!-- Tambahin overflow-x-auto biar bisa di-scroll di HP -->
      <div class="overflow-x-auto w-full">
        <table class="w-full text-sm text-left whitespace-nowrap min-w-[600px]">
          <thead class="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700">
            <tr>
              <th class="px-4 py-3">Clan Tag</th>
              <th class="px-4 py-3">Guild ID</th>
              <th class="px-4 py-3">Request Tier</th>
              <th class="px-4 py-3">Tanggal</th>
              <th class="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in requests" :key="r.id" class="border-b border-gray-100 dark:border-navy-800 hover:bg-gray-50 dark:hover:bg-navy-800/50">
              <td class="px-4 py-3 font-bold text-gray-900 dark:text-white">{{ r.clan_tag }}</td>
              <td class="px-4 py-3 font-mono text-xs text-gray-500">{{ r.guild_id }}</td>
              <td class="px-4 py-3">
                <span :class="r.tier === 'pro' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'" class="px-2 py-1 rounded text-[10px] font-bold uppercase">{{ r.tier }}</span>
              </td>
              <td class="px-4 py-3 text-xs text-gray-500">{{ new Date(r.date).toLocaleString('id-ID') }}</td>
              <td class="px-4 py-3 text-center">
                <div class="flex justify-center gap-2">
                  <button @click="approveRequest(r)" class="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded">Approve</button>
                  <button @click="dismissRequest(r.id)" class="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded">Hapus</button>
                </div>
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
import { apiFetch } from '../../lib/api'
import { showToast } from '../../lib/toast'
import { showConfirm } from '../../lib/confirm'

const loading = ref(true)
const requests = ref([])

async function loadRequests() {
  try {
    requests.value = await apiFetch('/admin/upgrade-requests') || []
  } catch (err) { 
    showToast('Gagal load request', 'error') 
  } finally { 
    loading.value = false 
  }
}

async function approveRequest(req) {
  const isConfirmed = await showConfirm(`Aktifkan ${req.tier.toUpperCase()} untuk ${req.clan_tag} selama 30 hari?`)
  if (!isConfirmed) return
  
  try {
    const credits = req.tier === 'pro' ? 50 : 20
    await apiFetch(`/admin/servers/${req.guild_id}`, { 
      method: 'PUT', 
      body: JSON.stringify({ tier: req.tier, ai_credits: credits, days_added: 30 }) 
    })
    await apiFetch(`/admin/upgrade-requests/${req.id}`, { method: 'DELETE' })
    
    requests.value = requests.value.filter(r => r.id !== req.id)
    showToast(`Tier ${req.tier.toUpperCase()} berhasil diaktifkan!`, 'success')
  } catch (err) { 
    showToast('Gagal: ' + err.message, 'error') 
  }
}

async function dismissRequest(id) {
  const isConfirmed = await showConfirm('Hapus request ini dari antrean?')
  if (!isConfirmed) return
  
  try {
    await apiFetch(`/admin/upgrade-requests/${id}`, { method: 'DELETE' })
    requests.value = requests.value.filter(r => r.id !== id)
    showToast('Request dihapus.', 'success')
  } catch (err) { 
    showToast('Gagal: ' + err.message, 'error') 
  }
}

onMounted(loadRequests)
</script>
