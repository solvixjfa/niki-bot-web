<template>
  <div>
    <div class="flex gap-2 border-b border-gray-200 dark:border-zinc-800 mb-4 overflow-x-auto hide-scrollbar">
      <RouterLink :to="`/app/server/${$route.params.guildId}/members/list`" :class="$route.path.includes('/list') ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'" class="px-4 py-2 border-b-2 text-sm font-bold whitespace-nowrap">List Member</RouterLink>
      <RouterLink :to="`/app/server/${$route.params.guildId}/members/donations`" :class="$route.path.includes('/donations') ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'" class="px-4 py-2 border-b-2 text-sm font-bold whitespace-nowrap">Donations</RouterLink>
      <RouterLink :to="`/app/server/${$route.params.guildId}/members/inactive`" :class="$route.path.includes('/inactive') ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'" class="px-4 py-2 border-b-2 text-sm font-bold whitespace-nowrap">Inactive</RouterLink>
      <RouterLink :to="`/app/server/${$route.params.guildId}/members/leaderboard`" :class="$route.path.includes('/leaderboard') ? 'border-brand text-brand dark:text-purple-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'" class="px-4 py-2 border-b-2 text-sm font-bold whitespace-nowrap flex items-center gap-1">Leaderboard <span class="text-[9px] bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-1 rounded">STD</span></RouterLink>
    </div>
    <RouterView />
  </div>
</template>
