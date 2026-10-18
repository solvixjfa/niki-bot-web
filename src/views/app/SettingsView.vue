<template>
  <div class="space-y-6 max-w-3xl mx-auto">
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
      <p class="text-sm text-gray-500 mt-1">Kelola akun dan preferensi aplikasi kamu.</p>
    </div>

    <div class="flex border-b border-gray-200 dark:border-navy-800">
      <button @click="activeTab = 'account'" :class="activeTab === 'account' ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500'" class="px-4 py-2 text-sm font-bold border-b-2 transition-colors">Account</button>
      <button @click="activeTab = 'preferences'" :class="activeTab === 'preferences' ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500'" class="px-4 py-2 text-sm font-bold border-b-2 transition-colors">Server Preferences</button>
      <button @click="activeTab = 'billing'" :class="activeTab === 'billing' ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500'" class="px-4 py-2 text-sm font-bold border-b-2 transition-colors">Billing</button>
    </div>

    <!-- TAB ACCOUNT -->
    <div v-if="activeTab === 'account'" class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-navy-800">
        <img v-if="user.avatar" :src="getAvatarUrl(user.id, user.avatar)" class="w-20 h-20 rounded-full shadow-md object-cover bg-purple-500">
        <div v-else class="w-20 h-20 rounded-full bg-brand flex items-center justify-center text-white text-2xl font-black">{{ user.username?.charAt(0).toUpperCase() || 'U' }}</div>
        <div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ user.username || 'User' }}</h3>
          <p class="text-sm text-gray-500">Discord ID: {{ user.id || '-' }}</p>
        </div>
      </div>
      <button @click="signOut" class="w-full py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold rounded-lg">Sign Out dari Niki</button>
    </div>

    <!-- TAB PREFERENCES -->
    <div v-if="activeTab === 'preferences'" class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-6 shadow-sm">
      <div v-if="loadingSettings" class="animate-pulse text-gray-500 text-center">Memuat...</div>
      <div v-else>
        <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-navy-800">
          <div class="flex items-center gap-3">
            <img v-if="serverSettings.clan_badge_url" :src="serverSettings.clan_badge_url" class="w-12 h-12 object-contain">
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
            <input v-model="serverSettings.alert_channel_id" type="text" class="w-full bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-800 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand">
          </div>
          <button @click="saveSettings" :disabled="saving" class="w-full py-2.5 bg-brand hover:bg-brand-dark text-white text-sm font-bold rounded-lg flex justify-center items-center gap-2 disabled:opacity-50">
            <span v-if="saving" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Simpan Pengaturan
          </button>
        </div>
      </div>
    </div>

    <!-- TAB BILLING -->
    <div v-if="activeTab === 'billing'" class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-6 shadow-sm">
      <div class="text-center py-6">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Upgrade Your Plan</h3>
        <p class="text-sm text-gray-500 mb-6">Dapatkan akses ke semua fitur AI dan naikkan kapasitas klan kamu.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto mb-6">
          <div @click="requestedTier = 'standard'" :class="requestedTier === 'standard' ? 'border-brand bg-brand-light dark:bg-purple-900/20' : 'border-gray-200 dark:border-navy-800'" class="border-2 rounded-xl p-4 cursor-pointer text-left transition-colors">
            <p class="text-sm font-bold text-gray-900 dark:text-white">Standard</p>
            <p class="text-xs text-gray-500 mt-1">Fitur dasar & history.</p>
          </div>
          <div @click="requestedTier = 'pro'" :class="requestedTier === 'pro' ? 'border-brand bg-brand-light dark:bg-purple-900/20' : 'border-gray-200 dark:border-navy-800'" class="border-2 rounded-xl p-4 cursor-pointer text-left transition-colors">
            <p class="text-sm font-bold text-gray-900 dark:text-white">Pro</p>
            <p class="text-xs text-gray-500 mt-1">Semua fitur AI & Analytics.</p>
          </div>
        </div>

        <button @click="requestUpgrade" :disabled="requesting" class="w-full max-w-xs mx-auto py-2.5 bg-brand hover:bg-brand-dark text-white text-sm font-bold rounded-lg flex justify-center items-center gap-2 disabled:opacity-50">
          <span v-if="requesting" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {{ requesting ? 'Mengirim...' : 'Ajukan Upgrade' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiFetch } from '../../lib/api'
import { showToast } from '../../lib/toast'

const router = useRouter()
const activeTab = ref('account')
const user = ref({})
const loadingSettings = ref(false)
const serverSettings = ref({})
const saving = ref(false)
const requesting = ref(false)
const requestedTier = ref('standard')

const getAvatarUrl = (id, hash) => hash ? `https://cdn.discordapp.com/avatars/${id}/${hash}.png?size=128` : null
const signOut = () => { localStorage.clear(); router.push('/') }

async function loadSettings() {
  loadingSettings.value = true
  try {
    serverSettings.value = await apiFetch('/clan/settings')
  } catch (err) { showToast('Gagal load settings', 'error') } 
  finally { loadingSettings.value = false }
}

async function saveSettings() {
  saving.value = true
  try {
    await apiFetch('/clan/settings', { method: 'PUT', body: JSON.stringify({ alert_channel_id: serverSettings.value.alert_channel_id }) })
    showToast('Pengaturan berhasil disimpan!', 'success')
  } catch (err) { showToast('Gagal menyimpan: ' + err.message, 'error') } 
  finally { saving.value = false }
}

async function requestUpgrade() {
  requesting.value = true
  try {
    const res = await apiFetch(`/clan/settings/request-upgrade?tier=${requestedTier.value}`, { method: 'POST' })
    showToast(res.message || 'Request berhasil dikirim!', 'success')
  } catch (err) { showToast('Gagal kirim request: ' + err.message, 'error') } 
  finally { requesting.value = false }
}

onMounted(() => {
  try {
    const u = localStorage.getItem('niki_user'); if (u) user.value = JSON.parse(u)
  } catch(e) {}
  loadSettings()
})
</script>
