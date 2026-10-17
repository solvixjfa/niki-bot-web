<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-900">Daftar Member</h2>
      <span class="text-xs font-bold bg-purple-100 text-brand px-2 py-1 rounded">{{ members.length }} Orang</span>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 text-sm">Memuat data member dari database...</div>
    
    <div v-else-if="members.length === 0" class="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
      <p class="text-sm text-gray-600 font-medium">Belum ada data member.</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-sm text-left">
        <thead class="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-4 py-3">Nama</th>
            <th class="px-4 py-3">Role</th>
            <th class="px-4 py-3 text-center">TH</th>
            <th class="px-4 py-3 text-right">Donasi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in members" :key="m.tag" class="border-b border-gray-100 hover:bg-gray-50">
            <td class="px-4 py-3 font-medium text-gray-900">{{ m.name }}</td>
            <td class="px-4 py-3 text-gray-500">{{ m.role }}</td>
            <td class="px-4 py-3 text-center font-bold">{{ m.townhall_level }}</td>
            <td class="px-4 py-3 text-right text-green-600 font-medium">{{ m.donations }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiFetch } from '../../../lib/api'

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
