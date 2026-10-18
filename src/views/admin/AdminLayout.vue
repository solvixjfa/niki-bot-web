<template>
  <div class="min-h-screen bg-gray-50 dark:bg-black font-sans text-gray-900 dark:text-gray-100 flex flex-col">
    <!-- Header Mobile -->
    <header class="md:hidden flex items-center justify-between p-4 bg-white dark:bg-navy-900 border-b border-gray-200 dark:border-navy-800 sticky top-0 z-40">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-white font-black">A</div>
        <span class="font-bold text-lg">Admin Panel</span>
      </div>
      <button @click="isSidebarOpen = !isSidebarOpen" class="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-navy-800 rounded-lg">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
      </button>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <aside :class="[isSidebarOpen ? 'translate-x-0' : '-translate-x-full', 'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-navy-950 border-r border-gray-200 dark:border-navy-800 transform transition-transform duration-300 md:relative md:translate-x-0 flex flex-col']">
        <div class="p-6 hidden md:flex items-center gap-3">
          <div class="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-white font-black">A</div>
          <div>
            <h1 class="text-sm font-black text-gray-900 dark:text-white">NIKI ADMIN</h1>
            <p class="text-[9px] text-gray-500 uppercase tracking-wider">Super Admin</p>
          </div>
        </div>
        
        <nav class="flex-1 p-4 space-y-1 overflow-y-auto mt-4 md:mt-0">
          <RouterLink to="/admin" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-navy-900 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400" @click="isSidebarOpen = false">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Overview
          </RouterLink>
          <RouterLink to="/admin/servers" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-navy-900 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400" @click="isSidebarOpen = false">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
            Manage Servers
          </RouterLink>
          <RouterLink to="/admin/requests" class="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-navy-900 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400" @click="isSidebarOpen = false">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              Upgrade Requests
            </div>
          </RouterLink>
          <RouterLink to="/admin/broadcast" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-navy-900 transition-colors" active-class="bg-brand-light text-brand dark:bg-navy-800 dark:text-purple-400" @click="isSidebarOpen = false">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
            Broadcast Promo
          </RouterLink>
        </nav>
        
        <div class="p-4 border-t border-gray-200 dark:border-navy-800">
          <RouterLink to="/app" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-gray-500 hover:text-brand transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Balik ke Web User
          </RouterLink>
        </div>
      </aside>

      <!-- Overlay Mobile -->
      <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="fixed inset-0 bg-black/50 z-40 md:hidden"></div>

      <!-- Konten -->
      <main class="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-64px)] md:h-screen">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isSidebarOpen = ref(false)
</script>
