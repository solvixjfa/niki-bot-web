<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Broadcast Promo</h2>
      <p class="text-sm text-gray-500 mt-1">Kirim pesan ke semua server Discord yang terdaftar.</p>
    </div>

    <!-- FORM INPUT -->
    <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-6 shadow-sm">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Pesan Broadcast</label>
          <textarea 
            v-model="message" 
            rows="5" 
            placeholder="Ketik promo atau pengumuman di sini..." 
            :disabled="sending"
            class="w-full bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-brand text-gray-900 dark:text-white disabled:opacity-50"
          ></textarea>
          <p class="text-xs text-gray-500 mt-1">{{ message.length }} karakter</p>
        </div>
        <button 
          @click="sendBroadcast" 
          :disabled="!message.trim() || sending" 
          class="w-full py-2.5 bg-brand hover:bg-brand-dark text-white text-sm font-bold rounded-lg flex justify-center items-center gap-2 disabled:opacity-50"
        >
          <span v-if="sending" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {{ sending ? `Mengirim... (${progress})` : 'Kirim Broadcast' }}
        </button>
        <p v-if="sending" class="text-xs text-gray-500 text-center">
          Sedang mengirim ke semua server. Jangan tutup halaman ini.
        </p>
      </div>
    </div>

    <!-- SUMMARY CARD (muncul setelah selesai) -->
    <div v-if="summary" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-5 shadow-sm">
        <p class="text-xs font-bold text-gray-500 uppercase mb-2">Total Server</p>
        <p class="text-3xl font-black text-gray-900 dark:text-white">{{ summary.total }}</p>
      </div>
      <div class="bg-white dark:bg-navy-900 border border-green-200 dark:border-green-900/50 rounded-xl p-5 shadow-sm">
        <p class="text-xs font-bold text-green-500 uppercase mb-2">Berhasil</p>
        <p class="text-3xl font-black text-green-500">{{ summary.success_count }}</p>
      </div>
      <div class="bg-white dark:bg-navy-900 border border-red-200 dark:border-red-900/50 rounded-xl p-5 shadow-sm">
        <p class="text-xs font-bold text-red-500 uppercase mb-2">Gagal</p>
        <p class="text-3xl font-black text-red-500">{{ summary.failed_count }}</p>
      </div>
    </div>

    <!-- HASIL DETAIL -->
    <div v-if="summary && summary.results" class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl shadow-sm overflow-hidden">
      <div class="p-5 border-b border-gray-200 dark:border-navy-800">
        <h3 class="font-bold text-sm text-gray-900 dark:text-white">Hasil Pengiriman</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700">
            <tr>
              <th class="px-4 py-3">Clan Tag</th>
              <th class="px-4 py-3">Guild ID</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3">Method</th>
              <th class="px-4 py-3">Error</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="r in summary.results" 
              :key="r.guild_id" 
              class="border-b border-gray-100 dark:border-navy-800 hover:bg-gray-50 dark:hover:bg-navy-800/50"
            >
              <td class="px-4 py-3 font-bold text-gray-900 dark:text-white">{{ r.clan_tag || '-' }}</td>
              <td class="px-4 py-3 font-mono text-xs text-gray-500">{{ r.guild_id }}</td>
              <td class="px-4 py-3">
                <span 
                  :class="r.sent ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" 
                  class="px-2 py-1 rounded text-[10px] font-bold uppercase"
                >
                  {{ r.sent ? '✓ Terkirim' : '✗ Gagal' }}
                </span>
              </td>
              <td class="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{{ r.method }}</td>
              <td class="px-4 py-3 text-xs text-red-500 max-w-xs truncate" :title="r.error">{{ r.error || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { apiFetch } from '../../lib/api'
import { showToast } from '../../lib/toast'

const message = ref('')
const sending = ref(false)
const summary = ref(null)
const progress = ref('0/0')

async function sendBroadcast() {
  if (!message.value.trim()) return
  
  sending.value = true
  summary.value = null
  progress.value = 'Memproses...'
  
  try {
    const res = await apiFetch('/admin/broadcast', {
      method: 'POST',
      body: JSON.stringify({ message: message.value })
    })
    
    if (!res.success) throw new Error(res.message || 'Gagal mengirim broadcast')
    
    summary.value = res
    
    if (res.failed_count === 0) {
      showToast(`✅ Berhasil terkirim ke ${res.success_count} server!`, 'success')
    } else if (res.success_count === 0) {
      showToast(`❌ Semua gagal. Cek tabel hasil di bawah.`, 'error')
    } else {
      showToast(`⚠️ ${res.success_count} berhasil, ${res.failed_count} gagal.`, 'error')
    }
    
    // Reset textarea kalau semua sukses
    if (res.failed_count === 0) message.value = ''
    
  } catch (err) {
    showToast('Gagal broadcast: ' + err.message, 'error')
  } finally {
    sending.value = false
    progress.value = '0/0'
  }
}
</script>
