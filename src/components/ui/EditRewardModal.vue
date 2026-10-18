<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="$emit('close')"></div>

      <div class="relative bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all">
        
        <!-- Header -->
        <div class="relative p-5 border-b border-gray-100 dark:border-navy-800 bg-gradient-to-br from-navy-900 to-navy-800">
          <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <h2 class="text-lg font-bold text-white">Edit Reward</h2>
          <p class="text-xs text-purple-400 mt-1">{{ reward?.name }}</p>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-4">
          <div>
            <label class="label mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Catatan / Hadiah</label>
            <textarea v-model="editNote" rows="3" class="textarea w-full bg-gray-50 dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg p-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand" placeholder="Masukkan catatan..."></textarea>
          </div>
          
          <div class="flex justify-end gap-3 pt-2">
            <button @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-navy-800 rounded-lg transition-colors">
              Batal
            </button>
            <button @click="save" :disabled="loading || !editNote.trim()" class="px-4 py-2 text-sm font-bold text-white bg-brand hover:bg-brand-dark rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2">
              <span v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  reward: Object,
  loading: Boolean
})
const emit = defineEmits(['close', 'save'])

const editNote = ref('')

watch(() => props.reward, (newVal) => {
  if (newVal) editNote.value = newVal.note
}, { immediate: true })

const save = () => {
  if (!editNote.value.trim()) return
  emit('save', { id: props.reward.id, note: editNote.value })
}
</script>
