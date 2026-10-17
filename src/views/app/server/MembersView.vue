<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Daftar Member</h2>
      <span class="text-xs font-bold bg-purple-100 dark:bg-zinc-800 text-brand dark:text-purple-400 px-2 py-1 rounded">{{ members.length }} Orang</span>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 text-sm">Memuat data member dari database...</div>
    
    <div v-else-if="members.length === 0" class="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-8 text-center">
      <p class="text-sm text-gray-600 dark:text-gray-300 font-medium">Belum ada data member.</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-sm text-left">
        <thead class="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
          <tr>
            <th class="px-4 py-3">Nama</th>
            <th class="px-4 py-3">Role</th>
            <th class="px-4 py-3 text-center">TH</th>
            <th class="px-4 py-3 text-right">Donasi</th>
          </tr>
        </thead>
        <tbody class="text-gray-900 dark:text-gray-100">
          <tr v-for="m in members" :key="m.tag" class="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50">
            <td class="px-4 py-3 font-medium">{{ m.name }}</td>
            <td class="px-4 py-3 text-gray-500 dark:text-gray-400">{{ m.role }}</td>
            <td class="px-4 py-3 text-center">
              <div class="flex items-center justify-center gap-1">
                <img :src="ASSETS.getTh(m.townhall_level)" class="w-6 h-6 object-contain drop-shadow-sm" :alt="'TH ' + m.townhall_level" />
                <span class="font-bold">{{ m.townhall_level }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-right text-green-600 dark:text-green-400 font-medium">{{ m.donations }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiFetch } from '../../../lib/api'
import { ASSETS } from '../../../lib/assets'

const loading = ref(true)
const members = ref([])

onMounted(async () => {
  try {
    const data = await apiFetch('/clan/members')
    members.value = data
  } catch (err) {
    console.error('Failed to load members:', err)
  } finally {
    loading.value = false
  }
})
</script>
