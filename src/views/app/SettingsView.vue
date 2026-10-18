<template>
  <div class="space-y-6 max-w-3xl mx-auto">
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
      <p class="text-sm text-gray-500 mt-1">Kelola akun dan preferensi aplikasi kamu.</p>
    </div>

    <!-- Tab Navigation -->
    <div class="flex border-b border-gray-200 dark:border-navy-800">
      <button @click="activeTab = 'account'" :class="activeTab === 'account' ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'" class="px-4 py-2 text-sm font-bold border-b-2 transition-colors">Account</button>
      <button @click="activeTab = 'preferences'" :class="activeTab === 'preferences' ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'" class="px-4 py-2 text-sm font-bold border-b-2 transition-colors">Server Preferences</button>
      <button class="px-4 py-2 text-sm font-bold border-b-2 border-transparent text-gray-400 cursor-not-allowed">Billing (Soon)</button>
    </div>

    <!-- TAB ACCOUNT -->
    <div v-if="activeTab === 'account'" class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-navy-800">
        <!-- AVATAR DISCORD -->
        <img v-if="user.avatar" :src="getAvatarUrl(user.id, user.avatar)" alt="Avatar" class="w-20 h-20 rounded-full shadow-md object-cover bg-purple-500">
        <div v-else class="w-20 h-20 rounded-full bg-brand flex items-center justify-center text-white text-2xl font-black shadow-md">
          {{ user.username?.charAt(0).toUpperCase() || 'U' }}
        </div>
        
        <div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ user.username || 'User' }}</h3>
          <p class="text-sm text-gray-500">Discord ID: {{ user.id || '-' }}</p>
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-navy-950 rounded-lg p-4 mb-6 border border-gray-100 dark:border-navy-800 flex justify-between items-center">
        <div>
          <p class="text-sm font-bold text-gray-900 dark:text-white">Total Server Dikelola</p>
          <p class="text-xs text-gray-500">Jumlah server Discord yang terhubung dengan Niki.</p>
        </div>
        <span class="text-xl font-black text-brand dark:text-purple-400">{{ userServers.length }}</span>
      </div>

      <button @click="signOut" class="w-full py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
        Sign Out dari Niki
      </button>
    </div>

    <!-- TAB PREFERENCES (SERVER SETTINGS) -->
    <div v-if="activeTab === 'preferences'" class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-6 shadow-sm">
      <div v-if="loadingSettings" class="animate-pulse text-gray-500 text-center">Memuat pengaturan server...</div>
      
      <div v-else>
        <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-navy-800">
          <div class="flex items-center gap-3">
            <!-- Tampilin Logo Klan -->
            <img v-if="serverSettings.clan_badge_url" :src="serverSettings.clan_badge_url" alt="Clan Badge" class="w-12 h-12 object-contain">
            <div v-else class="w-12 h-12 bg-gray-200 dark:bg-navy-800 rounded-lg flex items-center justify-center text-gray-400 text-xs">No Img</div>
            
            <div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">Konfigurasi Server</h3>
              <p class="text-xs text-gray-500">Clan Tag: {{ serverSettings.clan_tag || '-' }}</p>
            </div>
          </div>
          <span class="text-[10px] font-bold uppercase bg-purple-100 text-purple-700 px-2 py-1 rounded">{{ serverSettings.tier || 'FREE' }} TIER</span>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Discord Alert Channel ID</label>
            <p class="text-[11px] text-gray-500 mb-2">ID Channel tempat bot akan mengirim notifikasi War/CWL otomatis.</p>
            <input v-model="serverSettings.alert_channel_id" type="text" placeholder="Contoh: 1398959825445978145" class="w-full bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-800 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand text-gray-900 dark:text-white">
          </div>

          <div class="bg-gray-50 dark:bg-navy-950 p-4 rounded-lg border border-gray-100 dark:border-navy-800">
            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Sisa AI Credits</p>
            <p class="text-2xl font-black text-gray-900 dark:text-white">{{ serverSettings.ai_credits || 0 }}</p>
          </div>

          <!-- Tombol Contact Admin -->
          <div class="mt-6 pt-6 border-t border-gray-100 dark:border-navy-800">
            <p class="text-xs text-gray-500 mb-2">Mau upgrade ke Standard/Pro? Hubungi admin dan kirimkan ID di bawah ini.</p>
            <div class="flex flex-col gap-2">
              <select v-model="requestedTier" class="w-full bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-800 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand text-gray-900 dark:text-white">
                <option value="standard">Upgrade ke Standard</option>
                <option value="pro">Upgrade ke Pro</option>
              </select>
              <button @click="requestUpgrade" :disabled="requesting" class="w-full py-2.5 bg-brand hover:bg-brand-dark text-white text-sm font-bold rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-50">
                <span v-if="requesting" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                {{ requesting ? 'Mengirim...' : 'Ajukan Upgrade' }}
              </button>
            </div>
          </div>

          <button @click="saveSettings" :disabled="saving" class="w-full py-2.5 bg-brand hover:bg-brand-dark text-white text-sm font-bold rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-50 mt-4">
            <span v-if="saving" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            {{ saving ? 'Menyimpan...' : 'Simpan Pengaturan' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiFetch } from '../../lib/api'

const router = useRouter()
const activeTab = ref('account')
const user = ref({})
const userServers = ref([])

// State Server Settings
const loadingSettings = ref(false)
const serverSettings = ref({})
const saving = ref(false)
const requesting = ref(false)
const requestedTier = ref('standard')

const getAvatarUrl = (id, hash) => {
  if (!hash) return null
  // Format URL Avatar Discord
  return `https://cdn.discordapp.com/avatars/${id}/${hash}.png?size=128`
}

async function requestUpgrade() {
  requesting.value = true
  try {
    const res = await apiFetch(`/clan/settings/request-upgrade?tier=${requestedTier.value}`, { method: 'POST' })
    alert(res.message || 'Request berhasil dikirim ke Admin!')
  } catch (err) {
    alert('Gagal kirim request: ' + err.message)
  } finally {
    requesting.value = false
  }
}

function copyContactInfo() {
  const text = `Halo Admin, saya mau upgrade.\nClan Tag: ${serverSettings.value.clan_tag || '-'}\nGuild ID: ${localStorage.getItem('niki_active_guild') || '-'}`;
  navigator.clipboard.writeText(text).then(() => {
    alert('Info berhasil di-copy! Silakan paste ke chat Admin.');
  });
}

function signOut() {
  localStorage.clear()
  router.push('/')
}

async function loadSettings() {
  loadingSettings.value = true
  try {
    const res = await apiFetch('/clan/settings')
    if (res.error) throw new Error(res.error)
    serverSettings.value = res
  } catch (err) {
    console.error('Gagal load settings:', err)
  } finally {
    loadingSettings.value = false
  }
}

async function saveSettings() {
  saving.value = true
  try {
    const res = await apiFetch('/clan/settings', {
      method: 'PUT',
      body: JSON.stringify({ alert_channel_id: serverSettings.value.alert_channel_id })
    })
    if (res.error) throw new Error(res.error)
    alert('Pengaturan berhasil disimpan!')
  } catch (err) {
    alert('Gagal menyimpan: ' + err.message)
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  // Tarik data user dari localStorage
  try {
    const u = localStorage.getItem('niki_user')
    if (u) user.value = JSON.parse(u)
    
    const s = localStorage.getItem('niki_servers_cache')
    if (s) userServers.value = JSON.parse(s)
  } catch(e) {}

  // Load settings
  loadSettings()
})
</script>
