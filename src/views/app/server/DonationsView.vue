<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
      </div>
      <h2 class="text-xl font-bold text-gray-900">Top 5 Donatur</h2>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 text-sm">Memuat data...</div>
    
    <div v-else-if="donors.length === 0" class="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
      <p class="text-sm text-gray-600 font-medium">Belum ada data donasi.</p>
    </div>

    <div v-else class="space-y-3">
      <div v-for="(m, index) in donors" :key="m.tag" class="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg" 
            :class="{
              'bg-yellow-100 text-yellow-600': index === 0,
              'bg-gray-200 text-gray-600': index === 1,
              'bg-orange-100 text-orange-600': index === 2,
              'bg-gray-50 text-gray-400': index > 2
            }"
          >
            {{ index + 1 }}
          </div>
          <div>
            <h3 class="font-bold text-gray-900">{{ m.name }}</h3>
            <p class="text-xs text-gray-500">{{ m.role }}</p>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm font-bold text-green-600">{{ m.donations }} <span class="text-xs font-normal text-gray-500">Donasi</span></div>
          <div class="text-[10px] text-gray-400">Diterima: {{ m.donations_received }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiFetch } from '../../../lib/api'

const loading = ref(true)
const donors = ref([])

onMounted(async () => {
  try {
    const data = await apiFetch('/clan/donations')
    donors.value = data
  } catch (err) {
    console.error('Failed to load donations:', err)
  } finally {
    loading.value = false
  }
})
</script>
