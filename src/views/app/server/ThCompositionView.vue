<template>
  <div>
    <PremiumGate v-if="tier === 'free'" />
    <div v-else class="space-y-6">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">TH Composition</h2>
      </div>

      <div v-if="loading" class="animate-pulse text-gray-500">Memuat data...</div>
      <div v-else-if="error" class="text-red-500 text-sm">{{ error }}</div>
      <div v-else class="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-xl p-6 shadow-sm">
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-6">Komposisi TH di War terakhir vs <strong class="text-gray-900 dark:text-white">{{ compData.opponent }}</strong></p>
        
        <div class="space-y-3">
          <div v-for="item in compData.data" :key="item.th" class="flex items-center gap-4">
            <div class="w-12 flex items-center justify-end gap-1.5 shrink-0">
              <img :src="ASSETS.getTh(item.th)" class="w-6 h-6 object-contain" />
              <span class="font-bold text-gray-900 dark:text-white text-sm">TH{{ item.th }}</span>
            </div>
            <div class="flex-1 h-4 bg-gray-100 dark:bg-navy-800 rounded-full overflow-hidden">
              <div class="h-full bg-brand rounded-full" :style="{ width: (item.count / maxCount * 100) + '%' }"></div>
            </div>
            <div class="w-8 text-right font-black text-gray-700 dark:text-gray-300">{{ item.count }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { apiFetch } from '../../../lib/api'
import { ASSETS } from '../../../lib/assets'
import PremiumGate from '../../../components/PremiumGate.vue'

const injectedTier = inject('serverTier', ref('free'))
const tier = computed(() => injectedTier.value)

const loading = ref(true)
const error = ref('')
const compData = ref({ opponent: '', data: [] })

const maxCount = computed(() => {
  if (compData.value.data.length === 0) return 1
  return Math.max(...compData.value.data.map(d => d.count))
})

onMounted(async () => {
  if (tier.value === 'free') { loading.value = false; return }
  try {
    const res = await apiFetch('/clan/th-composition')
    if (res.error) error.value = res.error
    else compData.value = res
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
