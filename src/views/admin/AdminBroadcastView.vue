<template>
  <div class="space-y-6 max-w-2xl">
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Broadcast Promo</h2>
      <p class="text-sm text-gray-500 mt-1">Kirim pesan ke semua channel Discord yang terdaftar.</p>
    </div>

    <div class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-6 shadow-sm">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Pesan Broadcast</label>
          <textarea v-model="message" rows="5" placeholder="Ketik promo atau pengumuman di sini..." class="w-full bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-brand text-gray-900 dark:text-white"></textarea>
        </div>
        <button @click="sendBroadcast" :disabled="!message.trim() || sending" class="w-full py-2.5 bg-brand hover:bg-brand-dark text-white text-sm font-bold rounded-lg flex justify-center items-center gap-2 disabled:opacity-50">
          <span v-if="sending" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {{ sending ? 'Mengirim ke semua server...' : 'Kirim Broadcast' }}
        </button>
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

async function sendBroadcast() {
  sending.value = true
  try {
    const res = await apiFetch('/admin/broadcast', {
      method: 'POST',
      body: JSON.stringify({ message: message.value })
    })
    showToast(`Berhasil terkirim ke ${res.sent} dari ${res.total} channel.`, 'success')
    message.value = ''
  } catch (err) {
    showToast('Gagal broadcast: ' + err.message, 'error')
  } finally {
    sending.value = false
  }
}
</script>
