<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-8 h-8 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
      </div>
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Member Pasif</h2>
    </div>
    <p class="text-sm text-gray-500 dark:text-gray-400 -mt-2 mb-4">10 member dengan donasi terendah.</p>

    <div v-if="loading" class="animate-pulse text-gray-500 dark:text-gray-400 text-sm">Memuat data...</div>
    
    <div v-else-if="members.length === 0" class="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-8 text-center">
      <p class="text-sm text-gray-600 dark:text-gray-300 font-medium">Belum ada data member.</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-sm text-left">
        <thead class="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
          <tr>
            <th class="px-4 py-3">Nama</th>
            <th class="px-4 py-3">Role</th>
            <th class="px-4 py-3 text-right">Total Donasi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in members" :key="m.tag" class="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50">
            <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">
              <div class="flex items-center gap-1.5">
                <img :src="ASSETS.getTh(m.townhall_level)" class="w-5 h-5 object-contain drop-shadow-sm" :alt="'TH ' + m.townhall_level" />
                {{ m.name }}
              </div>
            </td>
            <td class="px-4 py-3 text-gray-500 dark:text-gray-400">{{ m.role }}</td>
            <td class="px-4 py-3 text-right font-medium" :class="m.donations < 100 ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'">
              {{ m.donations }}
            </td>
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
    const data = await apiFetch('/clan/inactive')
    members.value = data
  } catch (err) {
    console.error('Failed to load inactive:', err)
  } finally {
    loading.value = false
  }
})
</script>
