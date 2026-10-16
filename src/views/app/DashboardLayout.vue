<template>
  <div class="min-h-screen bg-slate-950 text-white flex">
    <aside class="w-64 border-r border-slate-800 p-4 flex flex-col">
      <div class="flex items-center gap-2 mb-6">
        <div class="w-8 h-8 bg-purple-600 rounded flex items-center justify-center font-bold">N</div>
        <span class="font-bold">Niki</span>
      </div>
      <nav class="flex-1 space-y-1">
        <RouterLink to="/app" class="block px-3 py-2 rounded text-sm hover:bg-slate-800">Home</RouterLink>
      </nav>
      <button @click="logout" class="text-xs text-slate-400 hover:text-white text-left px-3 py-2">Sign out</button>
    </aside>
    <main class="flex-1 overflow-y-auto p-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView, RouterLink, useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  localStorage.removeItem('niki_token')
  localStorage.removeItem('niki_user')
  router.push('/')
}
</script>
