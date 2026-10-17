<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Server Overview</h2>
      <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-brand dark:text-purple-400 text-xs font-bold uppercase rounded-full">
        {{ tier }} Tier
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Card Member -->
      <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <h3 class="font-bold text-gray-900 dark:text-white">Total Member</h3>
        </div>
        <p class="text-3xl font-black text-gray-900 dark:text-white">{{ members.length }}</p>
        <RouterLink :to="`/app/server/${$route.params.guildId}/members`" class="text-xs font-bold text-brand dark:text-purple-400 hover:underline mt-2 inline-block">Lihat Semua &rarr;</RouterLink>
      </div>

      <!-- Card War -->
      <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h3 class="font-bold text-gray-900 dark:text-white">Status Terakhir</h3>
        </div>
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Cek halaman War Status untuk melihat detail perang aktif atau terakhir.</p>
        <RouterLink :to="`/app/server/${$route.params.guildId}/war`" class="text-xs font-bold text-brand dark:text-purple-400 hover:underline mt-2 inline-block">Cek War &rarr;</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { RouterLink } from 'vue-router'
import { apiFetch } from '../../../lib/api'

const tier = inject('serverTier', 'free')
const members = ref([])

onMounted(async () => {
  try {
    const data = await apiFetch('/clan/members')
    members.value = data || []
  } catch (err) {
    console.error(err)
  }
})
</script>
