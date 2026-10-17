<template>
  <div class="relative w-full">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
    <input 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text" 
      :placeholder="placeholder" 
      class="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand outline-none transition-all"
    >
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  placeholder: { type: String, default: 'Cari...' }
})
defineEmits(['update:modelValue'])
</script>
