<script setup>
// Minimalist setup untuk landing page Niki CoC Bot
</script>

<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans antialiased">
    <!-- Navigasi -->
    <header class="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
      <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="font-bold text-xl text-brand">Niki CoC Bot</div>
        <nav class="flex gap-6">
          <a href="#fitur" class="text-sm font-medium text-gray-600 hover:text-brand transition-colors">Fitur</a>
          <a href="#dokumentasi" class="text-sm font-medium text-gray-600 hover:text-brand transition-colors">Dokumentasi</a>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="max-w-5xl mx-auto px-6 py-20 text-center">
      <div class="inline-block px-3 py-1 mb-6 rounded-full bg-brand-light text-brand text-xs font-semibold tracking-wide uppercase">
        Rilis Terbaru
      </div>
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
        Kelola Clan Clash of Clans <br class="hidden sm:block" />
        <span class="text-brand">Lebih Mudah dan Cepat</span>
      </h1>
      <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto mb-10">
        Bot komunitas independen untuk manajemen Clan Clash of Clans. Tinggalkan cara manual, fokus ke strategi dan biarkan Niki CoC Bot mengurus sisanya.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="https://discord.com/oauth2/authorize?client_id=1553040946688696482&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" rel="noopener noreferrer" class="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-brand hover:bg-brand-dark transition-colors duration-200 shadow-sm">
          Undang ke Server
        </a>
        <a href="https://wa.me/6285736048626" target="_blank" rel="noopener noreferrer" class="inline-flex justify-center items-center px-6 py-3 border border-gray-200 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm">
          Bantuan Admin
        </a>
      </div>
    </section>

    <!-- Bagian Dokumentasi & Gambar Promo -->
    <section id="fitur" class="bg-gray-50 py-20 border-t border-gray-100">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900">Fitur & Panduan Penggunaan</h2>
          <p class="mt-3 text-gray-600">Semua informasi dan manajemen clan dalam satu tempat.</p>
        </div>
        
        <div class="space-y-12" id="dokumentasi">
          <!-- Gambar Promo 1 -->
          <div class="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white p-2">
            <img src="/coc.png" alt="Promo Niki CoC Bot" class="w-full h-auto rounded-xl" />
          </div>
          
          <!-- Gambar Promo 2 -->
          <div class="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white p-2">
            <img src="/coc-2.png" alt="Fitur Utama Niki CoC Bot" class="w-full h-auto rounded-xl" />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white py-8 border-t border-gray-100">
      <div class="max-w-5xl mx-auto px-6 text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-500 text-sm">Hak Cipta 2026 Niki CoC Bot.</p>
        <p class="text-gray-400 text-sm">Dirancang oleh <a href="https://ixiera.id" class="text-brand hover:underline">ixiera.id</a></p>
      </div>
    </footer>
  </div>
</template>
