<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 mb-6">
      <img :src="ASSETS.war" class="w-10 h-10 object-contain" alt="War" />
      <h2 class="text-xl font-bold text-gray-900">War Status</h2>
    </div>
    
    <div class="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
      <p class="text-sm text-gray-500">Data War akan tampil di sini setelah backend disambungkan.</p>
      <p class="text-xs text-gray-400 mt-2">Contoh Gambar: <img :src="ASSETS.star" class="inline w-4 h-4" /> Bintang</p>
    </div>
  </div>
</template>

<script setup>
import { ASSETS } from '../../../lib/assets'
</script>
