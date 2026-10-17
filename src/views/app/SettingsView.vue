<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola akun dan preferensi aplikasi kamu.</p>
    </div>

    <div class="flex flex-col md:flex-row gap-6">
      <!-- Sub-menu Settings -->
      <div class="w-full md:w-48 shrink-0">
        <nav class="flex flex-row md:flex-col gap-1 overflow-x-auto hide-scrollbar">
          <button class="px-4 py-2.5 text-sm font-bold text-left rounded-lg bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400 whitespace-nowrap">Account</button>
          <button class="px-4 py-2.5 text-sm font-medium text-left rounded-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-navy-800 whitespace-nowrap">Billing (Soon)</button>
          <button class="px-4 py-2.5 text-sm font-medium text-left rounded-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-navy-800 whitespace-nowrap">Preferences</button>
        </nav>
      </div>

      <!-- Konten Account -->
      <div class="flex-1 bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-navy-800">
          <div class="w-16 h-16 bg-brand rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {{ user?.username?.charAt(0).toUpperCase() || 'U' }}
          </div>
          <div>
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ user?.global_name || user?.username }}</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">@{{ user?.username }}</p>
            <p class="text-xs text-gray-400 mt-1">Discord ID: {{ user?.id }}</p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-800 rounded-xl">
            <div>
              <p class="text-sm font-bold text-gray-900 dark:text-white">Total Server Dikelola</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Jumlah server Discord yang terhubung dengan Niki.</p>
            </div>
            <span class="px-3 py-1 text-sm font-black uppercase rounded-md bg-brand-light text-brand dark:bg-purple-900/30 dark:text-purple-400">
              {{ serverCount }}
            </span>
          </div>

          <button @click="logout" class="w-full py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
            Sign Out dari Niki
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../../composables/useAuth'
import { apiFetch } from '../../lib/api'

const { user, logout } = useAuth()
const serverCount = ref(0)

onMounted(async () => {
  try {
    const data = await apiFetch('/auth/me')
    serverCount.value = (data?.servers || []).length
  } catch (e) {
    console.error(e)
  }
})
</script>
