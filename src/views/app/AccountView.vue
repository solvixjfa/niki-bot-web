<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola informasi akun Discord dan sesi login kamu.</p>
    </div>

    <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-zinc-800">
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
        <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
          <div>
            <p class="text-sm font-bold text-gray-900 dark:text-white">Subscription Tier</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">Tier saat ini untuk akun ini.</p>
          </div>
          <span class="px-3 py-1 text-xs font-bold uppercase rounded-md bg-brand-light text-brand dark:bg-purple-900/30 dark:text-purple-400">
            Free Tier
          </span>
        </div>

        <button @click="logout" class="w-full py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
          Sign Out dari Niki
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '../../composables/useAuth'
const { user, logout } = useAuth()
</script>
