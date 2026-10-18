<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="visible" :class="['fixed top-5 right-5 z-[200] px-4 py-3 rounded-xl shadow-lg text-white font-medium flex items-center gap-3 border', 
        type === 'success' ? 'bg-green-600 border-green-500' : 'bg-red-600 border-red-500']">
        
        <svg v-if="type === 'success'" class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <svg v-else class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>

        <span class="text-sm">{{ message }}</span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
const message = ref('');
const type = ref('success');
let timeout = null;

const show = (msg, msgType = 'success') => {
  message.value = msg;
  type.value = msgType;
  visible.value = true;
  
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    visible.value = false;
  }, 3000);
};

defineExpose({ show });
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(20px); }
</style>
