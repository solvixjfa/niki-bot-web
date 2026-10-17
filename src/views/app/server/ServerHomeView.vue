<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Server Overview</h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Ringkasan aktivitas clan kamu.</p>
      </div>
      <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-brand dark:text-purple-400 text-xs font-bold uppercase rounded-full">
        {{ tier }} Tier
      </span>
    </div>

    <div v-if="loading" class="animate-pulse text-gray-500 dark:text-gray-400 text-sm">Memuat data overview...</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Widget 1: Total Member -->
      <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
          </div>
          <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400">Total Member</h3>
          <p class="text-3xl font-black text-gray-900 dark:text-white mt-1">{{ members.length }} <span class="text-sm font-medium text-gray-400">Orang</span></p>
        </div>
        <RouterLink :to="`/app/server/${$route.params.guildId}/members`" class="text-xs font-bold text-brand dark:text-purple-400 hover:underline mt-4 flex items-center gap-1">Lihat Semua &rarr;</RouterLink>
      </div>

      <!-- Widget 2: Status War -->
      <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <span v-if="war" class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300">{{ war.state }}</span>
          </div>
          <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400">Status Terakhir</h3>
          <div v-if="war && war.state !== 'notInWar'" class="mt-1">
            <p class="text-lg font-bold text-gray-900 dark:text-white truncate">vs {{ war.opponent_name }}</p>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs text-gray-500">Kita: {{ war.clan_stars }}★ ({{ war.clan_destruction }}%)</span>
              <span class="text-xs text-gray-500">Lawan: {{ war.opp_stars }}★ ({{ war.opp_destruction }}%)</span>
            </div>
          </div>
          <p v-else class="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">Clan tidak sedang dalam perang.</p>
        </div>
        <RouterLink :to="`/app/server/${$route.params.guildId}/war`" class="text-xs font-bold text-brand dark:text-purple-400 hover:underline mt-4 flex items-center gap-1">Cek War Status &rarr;</RouterLink>
      </div>

      <!-- Widget 3: Capital Raid -->
      <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
          </div>
          <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400">Raid Weekend Terakhir</h3>
          <div v-if="capital && !capital.error" class="mt-1">
            <p class="text-lg font-black text-gray-900 dark:text-white">{{ capital.total_loot?.toLocaleString() }} <span class="text-xs text-gray-400">Gold</span></p>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ capital.total_attacks }} Serangan | {{ capital.completed_raids }} Raid Selesai</p>
          </div>
          <p v-else class="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">Belum ada data raid.</p>
        </div>
        <RouterLink :to="`/app/server/${$route.params.guildId}/capital`" class="text-xs font-bold text-brand dark:text-purple-400 hover:underline mt-4 flex items-center gap-1">Lihat Capital &rarr;</RouterLink>
      </div>

      <!-- Widget 4: Top Donatur -->
      <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
          </div>
          <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Top 3 Donatur</h3>
          <div v-if="donors.length > 0" class="space-y-1.5">
            <div v-for="(d, i) in donors.slice(0, 3)" :key="i" class="flex justify-between items-center text-xs">
              <span class="font-medium text-gray-700 dark:text-gray-300 truncate">{{ i + 1 }}. {{ d.name }}</span>
              <span class="font-bold text-green-600">{{ d.donations }}</span>
            </div>
          </div>
          <p v-else class="text-sm font-medium text-gray-500 dark:text-gray-400">Belum ada data.</p>
        </div>
        <RouterLink :to="`/app/server/${$route.params.guildId}/donations`" class="text-xs font-bold text-brand dark:text-purple-400 hover:underline mt-4 flex items-center gap-1">Semua Donatur &rarr;</RouterLink>
      </div>

      <!-- Widget 5: Member Pasif -->
      <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
          </div>
          <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400">Member Pasif (Donasi 0)</h3>
          <p class="text-3xl font-black text-gray-900 dark:text-white mt-1">{{ inactiveCount }} <span class="text-sm font-medium text-gray-400">Orang</span></p>
        </div>
        <RouterLink :to="`/app/server/${$route.params.guildId}/inactive`" class="text-xs font-bold text-brand dark:text-purple-400 hover:underline mt-4 flex items-center gap-1">Cek Member &rarr;</RouterLink>
      </div>

      <!-- Widget 6: CWL Terakhir -->
      <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
            </div>
          </div>
          <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">CWL Terakhir</h3>
          <div v-if="cwlWars.length > 0" class="text-xs space-y-1">
            <p class="font-bold text-gray-900 dark:text-white">vs {{ cwlWars[0].opponent_name }}</p>
            <p class="text-gray-500">Hasil: {{ cwlWars[0].result || cwlWars[0].state }}</p>
          </div>
          <p v-else class="text-sm font-medium text-gray-500 dark:text-gray-400">Belum ada data.</p>
        </div>
        <RouterLink :to="`/app/server/${$route.params.guildId}/cwl`" class="text-xs font-bold text-brand dark:text-purple-400 hover:underline mt-4 flex items-center gap-1">Riwayat CWL &rarr;</RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { apiFetch } from '../../../lib/api'

const route = useRoute()
const injectedTier = inject('serverTier', ref('free'))
const tier = computed(() => injectedTier.value)
const loading = ref(true)

const members = ref([])
const donors = ref([])
const inactiveCount = ref(0)
const war = ref(null)
const capital = ref(null)
const cwlWars = ref([])

onMounted(async () => {
  try {
    const [mem, don, inact, w, cap, cwl] = await Promise.all([
      apiFetch('/clan/members'),
      apiFetch('/clan/donations'),
      apiFetch('/clan/inactive'),
      apiFetch('/clan/war'),
      apiFetch('/clan/capital'),
      apiFetch('/clan/cwl')
    ])
    
    members.value = mem || []
    donors.value = don || []
    inactiveCount.value = (inact || []).filter(m => m.donations === 0).length
    war.value = w
    capital.value = cap
    cwlWars.value = cwl || []
  } catch (err) {
    console.error('Failed to load overview data:', err)
  } finally {
    loading.value = false
  }
})
</script>
