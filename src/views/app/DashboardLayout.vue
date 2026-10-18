<template>
  <div class="min-h-screen bg-gray-50 dark:bg-navy-950 text-gray-900 dark:text-gray-100 flex flex-col md:flex-row transition-colors duration-300">
    
    <!-- Top Bar Mobile -->
    <div class="md:hidden flex items-center justify-between p-4 bg-white dark:bg-navy-900 border-b border-gray-200 dark:border-navy-800 sticky top-0 z-30">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-brand rounded flex items-center justify-center text-white font-bold">N</div>
        <span class="font-bold text-brand dark:text-purple-400">Niki Web</span>
      </div>
      <div class="flex items-center gap-3">
        <button @click="toggleTheme" class="p-2 bg-gray-100 dark:bg-navy-800 rounded-lg text-gray-600 dark:text-gray-300">
          <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        </button>
        <button @click="isSidebarOpen = true" class="p-2 text-gray-600 dark:text-gray-300">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
    </div>

    <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="md:hidden fixed inset-0 bg-black/50 z-40"></div>

    <!-- SIDEBAR UTAMA -->
    <aside class="fixed md:sticky md:top-0 inset-y-0 left-0 z-50 w-64 h-[100dvh] bg-white dark:bg-navy-900 border-r border-gray-200 dark:border-navy-800 p-4 flex flex-col transform transition-transform duration-300 md:transform-none overflow-y-auto hide-scrollbar" :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'">
      
      <!-- Logo Desktop -->
      <div class="hidden md:flex items-center justify-between mb-4 shrink-0">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-brand rounded flex items-center justify-center text-white font-bold">N</div>
          <span class="font-bold text-brand dark:text-purple-400">Niki Web</span>
        </div>
        <button @click="toggleTheme" class="p-2 bg-gray-100 dark:bg-navy-800 rounded-lg text-gray-600 dark:text-gray-300">
          <svg v-if="isDark" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        </button>
      </div>
      
      <button @click="isSidebarOpen = false" class="md:hidden absolute top-4 right-4 p-2 text-gray-500 dark:text-gray-400">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <!-- Server Dropdown -->
      <div v-if="servers.length > 0" class="mt-8 md:mt-2 mb-4 shrink-0 px-2">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Pilih Server</p>
        <div class="relative">
          <select v-model="currentGuildId" @change="handleServerChange" class="w-full appearance-none bg-gray-50 dark:bg-navy-800 border border-gray-200 dark:border-navy-700 text-gray-900 dark:text-white text-sm font-bold rounded-lg px-3 py-2 pr-8 outline-none focus:border-brand cursor-pointer">
            <option v-for="s in servers" :key="s.guild_id" :value="s.guild_id">{{ s.clan_tag }}</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      <!-- MENU FULL -->
      <div class="flex-1 flex flex-col mt-2 space-y-1">
        <template v-if="currentGuildId">
          
          <!-- OVERVIEW -->
          <RouterLink :to="`/app/server/${currentGuildId}`" @click="isSidebarOpen = false" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400" exact>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Dashboard
          </RouterLink>

          <!-- CLAN GROUP -->
          <div>
            <button @click="toggleGroup('clan')" class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                Clan
              </div>
              <svg class="w-4 h-4 transition-transform" :class="openGroups.clan ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div v-show="openGroups.clan" class="pl-4 pr-1 py-1 space-y-1">
              <RouterLink :to="`/app/server/${currentGuildId}/members/list`" @click="isSidebarOpen = false" class="block px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-purple-400">List Member</RouterLink>
              <RouterLink :to="`/app/server/${currentGuildId}/members/donations`" @click="isSidebarOpen = false" class="block px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-purple-400">Donations</RouterLink>
              <RouterLink :to="`/app/server/${currentGuildId}/members/leaderboard`" @click="isSidebarOpen = false" class="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-purple-400">Leaderboard <span class="text-[8px] bg-purple-100 text-purple-700 px-1 rounded">STD</span></RouterLink>
              <RouterLink :to="`/app/server/${currentGuildId}/members/compare`" @click="isSidebarOpen = false" class="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-purple-400">Compare <span class="text-[8px] bg-purple-100 text-purple-700 px-1 rounded">STD</span></RouterLink>
              <RouterLink :to="`/app/server/${currentGuildId}/members/rewards`" @click="isSidebarOpen = false" class="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-purple-400">Rewards <span class="text-[8px] bg-purple-100 text-purple-700 px-1 rounded">STD</span></RouterLink>
            </div>
          </div>

          <!-- WAR GROUP -->
          <div>
            <button @click="toggleGroup('war')" class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                War
              </div>
              <svg class="w-4 h-4 transition-transform" :class="openGroups.war ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div v-show="openGroups.war" class="pl-4 pr-1 py-1 space-y-1">
              <RouterLink :to="`/app/server/${currentGuildId}/war/status`" @click="isSidebarOpen = false" class="block px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-purple-400">Status War</RouterLink>
              <RouterLink :to="`/app/server/${currentGuildId}/war/cwl`" @click="isSidebarOpen = false" class="block px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-purple-400">CWL</RouterLink>
              <RouterLink :to="`/app/server/${currentGuildId}/war/race`" @click="isSidebarOpen = false" class="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-purple-400">Race War <span class="text-[8px] bg-purple-100 text-purple-700 px-1 rounded">STD</span></RouterLink>
              <RouterLink :to="`/app/server/${currentGuildId}/war/racecwl`" @click="isSidebarOpen = false" class="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-purple-400">Race CWL <span class="text-[8px] bg-purple-100 text-purple-700 px-1 rounded">STD</span></RouterLink>
              <RouterLink :to="`/app/server/${currentGuildId}/war/thcomp`" @click="isSidebarOpen = false" class="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-purple-400">TH Comp <span class="text-[8px] bg-purple-100 text-purple-700 px-1 rounded">STD</span></RouterLink>
            </div>
          </div>

          <!-- RECAP GROUP -->
          <div>
            <button @click="toggleGroup('recap')" class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Recap
              </div>
              <svg class="w-4 h-4 transition-transform" :class="openGroups.recap ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div v-show="openGroups.recap" class="pl-4 pr-1 py-1 space-y-1">
              <RouterLink :to="`/app/server/${currentGuildId}/war/recap`" @click="isSidebarOpen = false" class="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-purple-400">War Classic <span class="text-[8px] bg-purple-100 text-purple-700 px-1 rounded">STD</span></RouterLink>
              <RouterLink :to="`/app/server/${currentGuildId}/war/recap-cwl`" @click="isSidebarOpen = false" class="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-purple-400">CWL <span class="text-[8px] bg-purple-100 text-purple-700 px-1 rounded">STD</span></RouterLink>
            </div>
          </div>

          <!-- RAID WEEKEND GROUP -->
          <div>
            <button @click="toggleGroup('raid')" class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                Raid Weekend
              </div>
              <svg class="w-4 h-4 transition-transform" :class="openGroups.raid ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div v-show="openGroups.raid" class="pl-4 pr-1 py-1 space-y-1">
              <RouterLink :to="`/app/server/${currentGuildId}/capital`" @click="isSidebarOpen = false" class="block px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-purple-400">Capital Info</RouterLink>
            </div>
          </div>

          <!-- AI PRO FEATURES -->
          <div v-if="currentGuildId" class="mt-4 border-t border-gray-100 dark:border-navy-800 pt-4">
            <p class="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">AI Pro Features</p>
            <RouterLink :to="`/app/server/${currentGuildId}/ai-audit`" @click="isSidebarOpen = false" class="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-navy-800 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                AI Audit
              </div>
              <span class="text-[9px] bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-1.5 py-0.5 rounded">PRO</span>
            </RouterLink>
          </div>
        </template>
        <template v-else>
          <div class="px-3 py-4 text-xs text-center text-gray-500">Pilih server terlebih dahulu.</div>
        </template>
      </div>
      
      <!-- Footer Sidebar -->
      <div class="pt-4 mt-auto border-t border-gray-100 dark:border-navy-800 shrink-0">
        <RouterLink to="/app/settings" @click="isSidebarOpen = false" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-navy-800 transition-colors mb-1" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          Settings
        </RouterLink>
        
        <p v-if="user" class="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate px-3 mt-2">@{{ user.username }}</p>
        <button @click="handleLogout" class="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 text-left px-3 py-2 font-medium w-full flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Sign out
        </button>
      </div>
    </aside>

    <main class="flex-1 p-4 md:p-8 w-full overflow-x-hidden">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, provide, computed, watch } from 'vue'
import { RouterView, RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import { useTheme } from '../../composables/useTheme'
import { apiFetch } from '../../lib/api'

const { logout, user } = useAuth()
const { isDark, toggleTheme } = useTheme()
const route = useRoute()
const router = useRouter()

const isSidebarOpen = ref(false)
const servers = ref([])
const currentGuildId = ref('')
const serverTier = ref('free')

// State untuk buka-tutup grup menu
const openGroups = ref({
  clan: true,
  war: true,
  recap: true,
  raid: true
})

function toggleGroup(group) {
  openGroups.value[group] = !openGroups.value[group]
}

provide('serverTier', serverTier)

watch([servers, currentGuildId], () => {
  if (!currentGuildId.value) {
    serverTier.value = 'free'
    return
  }
  const s = servers.value.find(x => x.guild_id === currentGuildId.value)
  serverTier.value = s ? (s.tier || 'free') : 'free'
}, { immediate: true, deep: true })

function handleLogout() {
  localStorage.removeItem('niki_servers_cache')
  logout()
}

function handleServerChange() {
  if (currentGuildId.value) {
    router.push(`/app/server/${currentGuildId.value}`)
    localStorage.setItem('niki_active_guild', currentGuildId.value)
  }
}

watch(() => route.params.guildId, (newId) => {
  if (newId) currentGuildId.value = newId
}, { immediate: true })

onMounted(async () => {
  const cachedServers = localStorage.getItem('niki_servers_cache')
  if (cachedServers) {
    try {
      servers.value = JSON.parse(cachedServers)
      if (!route.params.guildId && !currentGuildId.value && servers.value.length > 0) {
        currentGuildId.value = servers.value[0].guild_id
      }
    } catch (e) { console.error('Cache error', e) }
  }

  try {
    const data = await apiFetch('/auth/me')
    servers.value = data?.servers || []
    localStorage.setItem('niki_servers_cache', JSON.stringify(servers.value))
    
    if (route.params.guildId) {
      currentGuildId.value = route.params.guildId
    } else if (!currentGuildId.value && servers.value.length > 0) {
      currentGuildId.value = servers.value[0].guild_id
    }
  } catch (err) {
    console.error(err)
  }
})
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
