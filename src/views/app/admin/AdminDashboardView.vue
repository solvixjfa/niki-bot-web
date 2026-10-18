<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Super Admin Panel</h2>
        <p class="text-sm text-gray-500 mt-1">Kelola semua server yang terhubung.</p>
      </div>
      <input v-model="searchQuery" type="text" placeholder="Cari Guild ID atau Clan Tag..." class="px-4 py-2 border rounded-lg dark:bg-navy-900 dark:border-navy-700 outline-none focus:border-brand text-sm w-64">
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 py-12 text-center">Memuat data server...</div>
    <div v-else-if="error" class="bg-red-50 text-red-500 p-4 rounded-xl text-sm">{{ error }}</div>

    <div v-else class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700">
            <tr>
              <th class="px-4 py-3">Clan Info</th>
              <th class="px-4 py-3">Guild ID</th>
              <th class="px-4 py-3">Tier</th>
              <th class="px-4 py-3">Expired</th>
              <th class="px-4 py-3 text-center">AI Credits</th>
              <th class="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in filteredServers" :key="s.guild_id" class="border-b border-gray-100 dark:border-navy-800 hover:bg-gray-50 dark:hover:bg-navy-800/50">
              <td class="px-4 py-3 flex items-center gap-3">
                <img v-if="s.clan_badge_url" :src="s.clan_badge_url" class="w-8 h-8 object-contain">
                <span class="font-bold text-gray-900 dark:text-white">{{ s.clan_tag }}</span>
              </td>
              <td class="px-4 py-3 text-gray-500 font-mono text-xs">{{ s.guild_id }}</td>
              <td class="px-4 py-3">
                <span :class="s.tier === 'pro' ? 'bg-purple-100 text-purple-700' : s.tier === 'standard' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'" class="px-2 py-1 rounded text-[10px] font-bold uppercase">{{ s.tier }}</span>
              </td>
              <td class="px-4 py-3 text-xs text-gray-500">{{ s.expired_at ? new Date(s.expired_at).toLocaleDateString('id-ID') : '-' }}</td>
              <td class="px-4 py-3 text-center font-bold text-brand dark:text-purple-400">{{ s.ai_credits }}</td>
              <td class="px-4 py-3 text-center">
                <button @click="openEditModal(s)" class="px-3 py-1 bg-brand hover:bg-brand-dark text-white text-xs font-bold rounded">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL EDIT -->
    <Teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div class="bg-white dark:bg-navy-900 rounded-xl p-6 w-full max-w-md shadow-2xl">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Edit Server: {{ editingServer?.clan_tag }}</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-gray-500 mb-1">Tier</label>
              <select v-model="editForm.tier" class="w-full p-2 border rounded-lg dark:bg-navy-800 dark:border-navy-700 outline-none text-sm">
                <option value="free">Free</option>
                <option value="standard">Standard</option>
                <option value="pro">Pro</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-500 mb-1">Tambah Durasi (Hari)</label>
              <input v-model="editForm.days_added" type="number" class="w-full p-2 border rounded-lg dark:bg-navy-800 dark:border-navy-700 outline-none text-sm">
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-500 mb-1">Set AI Credits</label>
              <input v-model="editForm.ai_credits" type="number" class="w-full p-2 border rounded-lg dark:bg-navy-800 dark:border-navy-700 outline-none text-sm">
            </div>
          </div>

          <div class="flex justify-end gap-2 mt-6">
            <button @click="isModalOpen = false" class="px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-navy-800 rounded-lg">Batal</button>
            <button @click="saveChanges" :disabled="saving" class="px-4 py-2 text-sm font-bold bg-brand text-white rounded-lg disabled:opacity-50">Simpan</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { apiFetch } from '../../../../lib/api' // Sesuaikan path import lu

const loading = ref(true)
const error = ref('')
const servers = ref([])
const searchQuery = ref('')

const isModalOpen = ref(false)
const editingServer = ref(null)
const saving = ref(false)
const editForm = ref({ tier: 'free', ai_credits: 0, days_added: 30 })

const filteredServers = computed(() => {
  if (!searchQuery.value) return servers.value
  const q = searchQuery.value.toLowerCase()
  return servers.value.filter(s => s.guild_id.includes(q) || (s.clan_tag && s.clan_tag.toLowerCase().includes(q)))
})

function openEditModal(server) {
  editingServer.value = server
  editForm.value = { 
    tier: server.tier, 
    ai_credits: server.ai_credits, 
    days_added: 30 
  }
  isModalOpen.value = true
}

async function saveChanges() {
  saving.value = true
  try {
    await apiFetch(`/admin/servers/${editingServer.value.guild_id}`, {
      method: 'PUT',
      body: JSON.stringify(editForm.value)
    })
    isModalOpen.value = false
    // Refresh data
    const res = await apiFetch('/admin/servers')
    servers.value = res
  } catch (err) {
    alert('Gagal: ' + err.message)
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  try {
    const res = await apiFetch('/admin/servers')
    servers.value = res
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
