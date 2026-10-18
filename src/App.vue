<template>
  <div class="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 font-sans">
    <!-- Render Halaman -->
    <RouterView />

    <!-- GLOBAL TOAST -->
    <Teleport to="body">
      <Transition name="toast">
        <div v-if="toastState.visible" :class="['fixed top-5 right-5 z-[9999] px-4 py-3 rounded-xl shadow-lg text-white font-medium flex items-center gap-3 border', 
          toastState.type === 'success' ? 'bg-green-600 border-green-500' : 'bg-red-600 border-red-500']">
          <svg v-if="toastState.type === 'success'" class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <svg v-else class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span class="text-sm">{{ toastState.message }}</span>
        </div>
      </Transition>
    </Teleport>

    <!-- GLOBAL CONFIRM MODAL -->
    <Teleport to="body">
      <div v-if="confirmState.visible" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div class="bg-white dark:bg-navy-900 rounded-xl p-6 w-full max-w-sm shadow-2xl transform transition-all">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Konfirmasi</h3>
          <p class="text-sm text-gray-500 mb-6">{{ confirmState.message }}</p>
          <div class="flex justify-end gap-2">
            <button @click="handleConfirm(false)" class="px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-navy-800 rounded-lg">Batal</button>
            <button @click="handleConfirm(true)" class="px-4 py-2 text-sm font-bold bg-brand text-white rounded-lg">Ya, Lanjutkan</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { toastState } from './lib/toast'
import { confirmState } from './lib/confirm'

function handleConfirm(val) {
  if (confirmState.resolve) confirmState.resolve(val);
  confirmState.visible = false;
}
</script>

<style>
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(20px); }
</style>
