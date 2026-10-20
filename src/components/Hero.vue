<template>
  <section class="relative pt-24 pb-20 overflow-hidden bg-white">
    <!-- Background Pattern & Glow -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-300/30 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-6 relative z-10 text-center">
      <h1 class="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1] text-gray-900">
        Bukan Cuma Bot.<br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand to-purple-600 drop-shadow-sm">Ini Dashboard AI Klan Kamu.</span>
      </h1>
      
      <p class="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
        Kelola war, pantau member, dan susun strategi CWL langsung dari satu layar. Dilengkapi AI pintar buat analisis yang lebih dalem.
      </p>
      
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button @click="$emit('login')" class="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-bold text-white bg-brand hover:bg-brand-dark transition-all shadow-xl shadow-brand/30 hover:-translate-y-1 flex items-center justify-center gap-2">
          Coba Gratis Sekarang
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
        </button>
        <a href="#fitur" class="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all">
          Lihat Fitur
        </a>
      </div>

      <!-- SCREENSHOT DUMMY DASHBOARD -->
      <div class="mt-16 relative mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent z-10 pointer-events-none"></div>
        <img src="https://placehold.co/1200x675/f9fafb/9ca3af?text=Dashboard+Preview+(Ganti+Gambar+Ini)" alt="Dashboard Preview" class="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out" />
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['login'])
</script>
