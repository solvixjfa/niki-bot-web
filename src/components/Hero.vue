<template>
  <section class="relative pt-24 pb-20 overflow-hidden bg-white">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-200/50 blur-[100px] rounded-full pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-6 relative z-10 text-center">
      
      
      <h1 class="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1] text-gray-900">
        Bukan Sekadar Bot.<br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand to-purple-600">Ini Dashboard AI Klan Lu.</span>
      </h1>
      
      <p class="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
        Kelola war, audit member, dan bikin strategi CWL dalam satu layar. Dilengkapi AI Engine untuk analisis mendalam yang nggak bisa dilakukan bot biasa.
      </p>
      
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button @click="$emit('login')" class="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-bold text-white bg-brand hover:bg-brand-dark transition-all shadow-lg shadow-brand/30 flex items-center justify-center gap-2">
          Coba Gratis Sekarang
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
        </button>
        <a href="#fitur" class="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-bold text-gray-700 bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-100">
          Lihat Fitur
        </a>
      </div>

      <!-- SCREENSHOT DUMMY DASHBOARD -->
      <div class="mt-16 relative mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
        <img src="https://placehold.co/1200x675/f9fafb/9ca3af?text=Dashboard+Preview+(Ganti+Gambar+Ini)" alt="Dashboard Preview" class="w-full h-auto object-cover" />
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['login'])
</script>
