<template>
  <div class="min-h-screen flex bg-gray-50 dark:bg-black">
    <aside class="w-64 bg-gray-900 text-white flex flex-col shrink-0">
      <div class="p-6 border-b border-gray-800">
        <h1 class="text-xl font-black tracking-wider text-brand">NIKI ADMIN</h1>
        <p class="text-[10px] text-gray-400 mt-1 uppercase">Super Admin Panel</p>
      </div>
      <nav class="flex-1 p-4 space-y-2">
        <RouterLink to="/admin" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors" active-class="bg-gray-800 text-brand">
          Servers
        </RouterLink>
        <RouterLink to="/admin/requests" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors" active-class="bg-gray-800 text-brand">
          Upgrade Requests
        </RouterLink>
      </nav>
      <div class="p-4 border-t border-gray-800">
        <RouterLink to="/app" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-gray-400 hover:text-white transition-colors">
          Balik ke Web User
        </RouterLink>
      </div>
    </aside>
    <main class="flex-1 p-8 overflow-y-auto h-screen">
      <RouterView />
    </main>
  </div>
</template>
