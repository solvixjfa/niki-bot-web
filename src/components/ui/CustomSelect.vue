<template>
  <div class="relative w-full" ref="dropdownRef">
    <!-- Tombol Trigger -->
    <button 
      type="button"
      @click="isOpen = !isOpen"
      class="w-full flex items-center justify-between bg-white dark:bg-navy-800 border border-gray-300 dark:border-navy-700 text-gray-900 dark:text-white text-sm font-medium rounded-lg px-4 py-2.5 outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
    >
      <span class="truncate">{{ selectedLabel || placeholder }}</span>
      <svg class="w-4 h-4 text-gray-500 transition-transform duration-200" :class="isOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    <!-- Menu Dropdown -->
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div 
        v-if="isOpen" 
        class="absolute z-50 w-full mt-1 bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg shadow-xl max-h-60 overflow-y-auto"
      >
        <ul class="py-1">
          <li 
            v-for="opt in options" 
            :key="opt.value"
            @click="selectOption(opt)"
            class="px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors"
            :class="modelValue === opt.value ? 'text-brand dark:text-purple-400 font-bold bg-brand-light/30 dark:bg-navy-900' : 'text-gray-700 dark:text-gray-300'"
          >
            <span class="truncate">{{ opt.label }}</span>
            <svg v-if="modelValue === opt.value" class="w-4 h-4 shrink-0 text-brand dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: String,
  options: { type: Array, required: true }, // Format: [{ value: '...', label: '...' }]
  placeholder: { type: String, default: 'Pilih...' }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const dropdownRef = ref(null)

// Cari label dari value yang dipilih
const selectedLabel = computed(() => {
  const selected = props.options.find(o => o.value === props.modelValue)
  return selected ? selected.label : ''
})

function selectOption(opt) {
  emit('update:modelValue', opt.value)
  isOpen.value = false
}

// Tutup dropdown kalau klik di luar area
function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>
