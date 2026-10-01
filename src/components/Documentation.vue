<template>
  <section id="dokumentasi" class="max-w-5xl mx-auto px-6 py-16">
    <div class="text-center mb-12">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">List Command & Dokumentasi</h2>
      <p class="mt-2 text-gray-600">Gampang kok pakainya, ini daftar command yang bisa kamu ketik di Discord.</p>
    </div>

    <!-- Gambar 2 Dipindah Kesini -->
    <div class="max-w-4xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-lg border border-purple-100 bg-white p-2">
      <img src="/coc-2.png" alt="Dokumentasi Niki CoC Bot" loading="lazy" decoding="async" class="w-full h-auto rounded-xl object-cover max-h-[400px]" />
    </div>

    <!-- Dokumentasi Teks Modul -->
    <div class="space-y-6 max-w-4xl mx-auto">
      <div class="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
        <h3 class="text-xl font-bold text-brand mb-3">1. Setup Awal (Wajib Buat Admin)</h3>
        <p class="text-sm text-gray-600 mb-4">Langkah pertama biar botnya ngenalin clan kamu. Cukup setup sekali aja!</p>
        <div class="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-xs sm:text-sm space-y-2">
          <div><span class="text-purple-400">/setup clan</span> [tag_clan] - Nyambungin bot ke clan utama kamu.</div>
          <div><span class="text-purple-400">/setup channel war</span> - Nentuin di channel mana bot ngirim update war.</div>
          <div><span class="text-purple-400">/setup channel donation</span> - Nentuin channel buat laporan donasi member.</div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
        <h3 class="text-xl font-bold text-brand mb-3">2. Info War & CWL</h3>
        <p class="text-sm text-gray-600 mb-4">Udah nggak jaman bikin rekap manual di Excel. Tinggal panggil botnya.</p>
        <div class="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-xs sm:text-sm space-y-2">
          <div><span class="text-purple-400">/war status</span> - Liat live skor war, sisa jam, dan siapa yang belom nyerang.</div>
          <div><span class="text-purple-400">/cwl summary</span> - Rangkuman peringkat CWL dan total bintang clan.</div>
          <div><span class="text-purple-400">/war missed</span> - Cek daftar anggota yang nyia-nyiain attack di war.</div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
        <h3 class="text-xl font-bold text-brand mb-3">3. Cek Keaktifan Member</h3>
        <p class="text-sm text-gray-600 mb-4">Bantu leader buat mantau siapa yang rajin dan siapa yang udah jarang main.</p>
        <div class="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-xs sm:text-sm space-y-2">
          <div><span class="text-purple-400">/members list</span> - Nampilin daftar member lengkap sama level TH-nya.</div>
          <div><span class="text-purple-400">/donations top</span> - Liat siapa aja yang paling sering bagi-bagi troops bulan ini.</div>
          <div><span class="text-purple-400">/inactive check</span> - Ngeluarin list member yang udah berhari-hari offline.</div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
        <h3 class="text-xl font-bold text-brand mb-3">4. Nanya ke AI Bot</h3>
        <p class="text-sm text-gray-600 mb-4">Fitur asisten pinter buat nemuin masalah clan atau cari strategi baru.</p>
        <div class="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-xs sm:text-sm space-y-2">
          <div><span class="text-purple-400">/ai audit</span> - Minta AI ngecek seberapa sehat clan kamu saat ini.</div>
          <div><span class="text-purple-400">/ai strategy</span> - Minta saran formasi / base yang cocok buat war.</div>
        </div>
      </div>
    </div>
  </section>
</template>
