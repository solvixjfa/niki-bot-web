<template>
  <div>
    <PremiumGate v-if="tier === 'free'" />
    <div v-else class="space-y-6">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-8 h-8 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Race War (Offense & Defense)</h2>
      </div>

      <div v-if="loading" class="animate-pulse text-gray-500">Memuat data...</div>
      <div v-else-if="error" class="text-red-500 text-sm">{{ error }}</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <!-- Offense -->
        <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
          <div class="p-4 border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50">
            <h3 class="font-bold text-gray-900 dark:text-white">Klasemen Offense</h3>
          </div>
          <table class="w-full text-sm text-left">
            <tbody>
              <tr v-for="(o, i) in data.offense" :key="i" class="border-b border-gray-100 dark:border-zinc-800">
                <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">{{ o.name }}</td>
                <td class="px-4 py-3 text-right">
                  <span class="text-xs text-gray-500 block">{{ o.atk_used }}/{{ o.atk_max }} Atk</span>
                  <span class="text-yellow-500 font-bold">{{ o.stars }}★ ({{ o.destruction }}%)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Defense -->
        <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
          <div class="p-4 border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50">
            <h3 class="font-bold text-gray-900 dark:text-white">Klasemen Defense</h3>
          </div>
          <table class="w-full text-sm text-left">
            <tbody>
              <tr v-for="(d, i) in data.defense" :key="i" class="border-b border-gray-100 dark:border-zinc-800">
                <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">{{ d.name }}</td>
                <td class="px-4 py-3 text-right">
                  <span class="text-xs text-gray-500 block">Diserang: {{ d.defended_count }}x</span>
                  <span class="text-red-500 font-bold">{{ d.stars_given }}★ ({{ d.destruction_given }}%)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { apiFetch } from '../../../lib/api'
import PremiumGate from '../../../components/PremiumGate.vue'

const tier = inject('serverTier', ref('free'))
const loading = ref(true)
const error = ref('')
const data = ref({ offense: [], defense: [] })

onMounted(async () => {
  if (tier.value === 'free') { loading.value = false; return }
  try {
    const res = await apiFetch('/clan/racewar')
    if (res.error) error.value = res.error
    else data.value = res
  } catch (err) { error.value = err.message } 
  finally { loading.value = false }
})
</script>
