<template>
  <div>
    <div class="flex gap-2 border-b border-gray-200 dark:border-zinc-800 mb-4 overflow-x-auto hide-scrollbar">
      <RouterLink :to="`/app/server/${$route.params.guildId}/war/status`" :class="$route.path.includes('/status') ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'" class="px-4 py-2 border-b-2 text-sm font-bold whitespace-nowrap">War Status</RouterLink>
      <RouterLink :to="`/app/server/${$route.params.guildId}/war/cwl`" :class="$route.path.includes('/cwl') ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'" class="px-4 py-2 border-b-2 text-sm font-bold whitespace-nowrap">CWL</RouterLink>
      <RouterLink :to="`/app/server/${$route.params.guildId}/war/race`" :class="$route.path.includes('/race') ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'" class="px-4 py-2 border-b-2 text-sm font-bold whitespace-nowrap flex items-center gap-1">Race War <span class="text-[9px] bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-1 rounded">STD</span></RouterLink>
    </div>
    <RouterView />
  </div>
</template>
