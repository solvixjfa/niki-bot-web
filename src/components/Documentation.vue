<template>
  <section id="dokumentasi" class="max-w-5xl mx-auto px-6 py-16">
    <div class="text-center mb-12">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">Dokumentasi & Perintah Bot</h2>
      <p class="mt-2 text-gray-600">Panduan penggunaan kalimat perintah dan antarmuka Niki Bot.</p>
    </div>

    <!-- Tampilan Visual (Foto) -->
    <div class="space-y-8 mb-12 max-w-4xl mx-auto">
      <div class="rounded-2xl overflow-hidden shadow-lg border border-purple-100 bg-white p-2">
        <img src="/coc.png" alt="Otomatisasi Clan" loading="lazy" decoding="async" class="w-full h-auto rounded-xl object-cover max-h-[400px]" />
      </div>
      <div class="rounded-2xl overflow-hidden shadow-lg border border-purple-100 bg-white p-2">
        <img src="/coc-2.png" alt="Dokumentasi Niki CoC Bot" loading="lazy" decoding="async" class="w-full h-auto rounded-xl object-cover max-h-[400px]" />
      </div>
    </div>

    <!-- Dokumentasi Teks Modul -->
    <div class="space-y-8">
      <!-- Modul Perintah Dasar -->
      <div class="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
        <h3 class="text-xl font-bold text-brand mb-3">1. Perintah Setup & Konfigurasi</h3>
        <p class="text-sm text-gray-600 mb-4">
          Gunakan perintah berikut di channel Discord Anda untuk menghubungkan bot dengan Tag Clan Clash of Clans secara resmi:
        </p>
        <div class="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-xs sm:text-sm space-y-2 overflow-x-auto">
          <div><span class="text-purple-400">/setup clan</span> [tag_clan] - Menghubungkan channel Discord dengan Clan Clash of Clans kamu.</div>
          <div><span class="text-purple-400">/setup channel war</span> - Mengatur channel khusus untuk notifikasi war otomatis.</div>
          <div><span class="text-purple-400">/setup channel donation</span> - Mengatur channel untuk pemantauan statistik donasi harian.</div>
        </div>
      </div>

      <!-- Modul War & CWL -->
      <div class="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
        <h3 class="text-xl font-bold text-brand mb-3">2. Laporan Clan War & CWL</h3>
        <p class="text-sm text-gray-600 mb-4">
          Dapatkan rangkuman statistik serangan war dan liga perang tanpa perlu merekap data secara manual di spreadsheet:
        </p>
        <div class="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-xs sm:text-sm space-y-2 overflow-x-auto">
          <div><span class="text-purple-400">/war status</span> - Menampilkan papan skor war, sisa waktu, dan sisa serangan real-time.</div>
          <div><span class="text-purple-400">/cwl summary</span> - Menampilkan peringkat grup CWL, total bintang, dan persentase kerusakan.</div>
          <div><span class="text-purple-400">/war missed</span> - Daftar anggota clan yang belum menggunakan kesempatan menyerang.</div>
        </div>
      </div>

      <!-- Modul Anggota & Donasi -->
      <div class="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
        <h3 class="text-xl font-bold text-brand mb-3">3. Pemantauan Anggota & Donasi</h3>
        <p class="text-sm text-gray-600 mb-4">
          Pantau keaktifan anggota clan, rasio donasi, dan riwayat aktivitas member dalam kurun waktu tertentu:
        </p>
        <div class="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-xs sm:text-sm space-y-2 overflow-x-auto">
          <div><span class="text-purple-400">/members list</span> - Menampilkan daftar anggota, level Town Hall, serta role clan.</div>
          <div><span class="text-purple-400">/donations top</span> - Menampilkan klasemen donatur troop dan spell terbanyak bulan ini.</div>
          <div><span class="text-purple-400">/inactive check</span> - Memeriksa anggota pasif berdasarkan aktivitas login dan donasi.</div>
        </div>
      </div>
      
      <!-- Modul Fitur AI -->
      <div class="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
        <h3 class="text-xl font-bold text-brand mb-3">4. Kecerdasan Buatan (AI Assistant)</h3>
        <p class="text-sm text-gray-600 mb-4">
          Manfaatkan fitur kecerdasan buatan Niki Bot untuk mendapatkan saran strategi dan analisa kesehatan clan:
        </p>
        <div class="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-xs sm:text-sm space-y-2 overflow-x-auto">
          <div><span class="text-purple-400">/ai audit</span> - Meminta AI menganalisis kekuatan clan dan memberikan saran perbaikan.</div>
          <div><span class="text-purple-400">/ai strategy</span> - Mendapatkan rekomendasi formasi dan target serangan war.</div>
        </div>
      </div>
    </div>
  </section>
</template>
