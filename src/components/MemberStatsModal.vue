<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="$emit('close')"></div>
      
      <div class="relative bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all">
        
        <!-- Header -->
        <div class="relative p-6 border-b border-gray-100 dark:border-navy-800 bg-gradient-to-br from-navy-900 to-navy-800">
          <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-navy-800 rounded-xl border border-navy-700 flex items-center justify-center overflow-hidden shrink-0">
               <img :src="ASSETS.getTh(member?.townhall_level || 1)" class="w-12 h-12 object-contain drop-shadow-md" />
            </div>
            <div>
              <h2 class="text-xl font-black text-white">{{ member?.name }}</h2>
              <p class="text-xs font-bold text-purple-400 uppercase tracking-wider mt-1">{{ member?.role }}</p>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div v-if="loading" class="p-8 text-center text-gray-500">Memuat data...</div>
        <div v-else-if="error" class="p-8 text-center text-red-500">{{ error }}</div>
        
        <div v-else class="p-6 space-y-6">
          <!-- Stats Grid -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 dark:bg-navy-800 p-4 rounded-xl border border-gray-100 dark:border-navy-700">
              <p class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Donasi Diberikan</p>
              <p class="text-2xl font-black text-green-600 dark:text-green-400">{{ member?.donations.toLocaleString() }}</p>
            </div>
            <div class="bg-gray-50 dark:bg-navy-800 p-4 rounded-xl border border-gray-100 dark:border-navy-700">
              <p class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Donasi Diterima</p>
              <p class="text-2xl font-black text-blue-600 dark:text-blue-400">{{ member?.donations_received.toLocaleString() }}</p>
            </div>
          </div>

          <!-- War Stats -->
          <div>
            <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-3">Performa War Terakhir</h3>
            <div class="bg-gray-50 dark:bg-navy-800 p-4 rounded-xl border border-gray-100 dark:border-navy-700 space-y-3">
              <div class="flex justify-between items-center border-b border-gray-200 dark:border-navy-700 pb-2">
                <span class="text-xs text-gray-500">Serangan Terpakai</span>
                <span class="text-sm font-bold text-gray-900 dark:text-white">{{ member?.war_stats.attacks_used }} / {{ member?.war_stats.attacks_allowed }}</span>
              </div>
              <div class="flex justify-between items-center border-b border-gray-200 dark:border-navy-700 pb-2">
                <span class="text-xs text-gray-500">Total Bintang</span>
                <span class="text-sm font-bold text-yellow-500">{{ member?.war_stats.stars }} ★</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">Rata-rata Kehancuran</span>
                <span class="text-sm font-bold text-red-400">{{ member?.war_stats.destruction }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ASSETS } from '../lib/assets'
import { apiFetch } from '../lib/api'

const props = defineProps({
  isOpen: Boolean,
  playerTag: String
})
defineEmits(['close'])

const loading = ref(false)
const error = ref('')
const member = ref(null)

watch(() => props.playerTag, async (newTag) => {
  if (!newTag || !props.isOpen) return
  
  loading.value = true
  error.value = ''
  member.value = null
  
  try {
    // Encode tag buat URL
    const encodedTag = encodeURIComponent(newTag)
    member.value = await apiFetch(`/clan/member/${encodedTag}`)
    if (member.value.error) throw new Error(member.value.error)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}, { immediate: true })
</script>
