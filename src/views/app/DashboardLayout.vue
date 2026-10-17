<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 flex">
    <aside class="w-64 border-r border-gray-200 p-4 flex flex-col bg-white">
      <div class="flex items-center gap-2 mb-6">
        <div class="w-8 h-8 bg-brand rounded flex items-center justify-center text-white font-bold">N</div>
        <span class="font-bold text-brand">Niki Web</span>
      </div>
      <nav class="flex-1 space-y-1">
        <RouterLink to="/app" class="block px-3 py-2 rounded text-sm font-medium hover:bg-purple-50 text-gray-700">Home</RouterLink>
      </nav>
      <div class="mt-auto pt-4 border-t border-gray-100">
        <p v-if="user" class="text-xs text-gray-500 mb-2 truncate px-3">@{{ user.username }}</p>
        <button @click="logout" class="text-xs text-red-500 hover:text-red-700 text-left px-3 py-2 font-medium w-full">Sign out</button>
      </div>
    </aside>
    <main class="flex-1 overflow-y-auto p-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { useAuth } from '../../composables/useAuth'

const { logout, user } = useAuth()
</script>
