<script setup>
import { ref } from 'vue'
</script>

<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans antialiased">
    <!-- Navigasi Utama -->
    <header class="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
      <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="font-bold text-xl text-brand tracking-tight">Niki CoC Bot</div>
        <nav class="hidden sm:flex gap-6">
          <a href="#fitur" class="text-sm font-medium text-gray-600 hover:text-brand transition-colors">Fitur Utama</a>
          <a href="#dokumentasi" class="text-sm font-medium text-gray-600 hover:text-brand transition-colors">Dokumentasi</a>
          <a href="#panduan" class="text-sm font-medium text-gray-600 hover:text-brand transition-colors">Cara Pakai</a>
          <a href="#kontak" class="text-sm font-medium text-gray-600 hover:text-brand transition-colors">Kontak</a>
        </nav>
        <a href="https://discord.com/oauth2/authorize?client_id=1553040946688696482&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors">
          Invite Bot
        </a>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="max-w-5xl mx-auto px-6 py-16 text-center">
      <div class="inline-block px-3 py-1 mb-6 rounded-full bg-brand-light text-brand text-xs font-semibold tracking-wide uppercase">
        Manajemen Clan Otomatis
      </div>
      <h1 class="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
        Kelola Clan Clash of Clans <br class="hidden sm:block" />
        <span class="text-brand">Lebih Praktis dari Discord</span>
      </h1>
      <p class="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
        Solusi lengkap untuk Leader & Co-Leader. Pantau war, donasi, rekap CWL, hingga analisis AI tanpa rekap manual.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="https://discord.com/oauth2/authorize?client_id=1553040946688696482&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" rel="noopener noreferrer" class="px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-brand hover:bg-brand-dark transition-colors shadow-sm">
          Tambahkan ke Discord
        </a>
        <a href="https://wa.me/6285736048626" target="_blank" rel="noopener noreferrer" class="px-6 py-3 border border-gray-200 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
          Hubungi Admin WA
        </a>
      </div>
    </section>

    <!-- Preview Gambar (Dikondisikan Loading Cepat & Ukuran Ringan) -->
    <section class="max-w-3xl mx-auto px-6 mb-20">
      <div class="space-y-8">
        <div class="rounded-xl overflow-hidden shadow-md border border-gray-200 bg-gray-50">
          <img 
            src="/coc.png" 
            alt="Preview Otomatisasi Clan" 
            loading="lazy"
            decoding="async"
            class="w-full h-auto object-cover max-h-[400px]" 
          />
        </div>
      </div>
    </section>

    <!-- Fitur Terperinci -->
    <section id="fitur" class="bg-gray-50 py-16 border-t border-gray-100">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">Semua yang Kamu Butuhkan Dalam Satu Bot</h2>
          <p class="mt-2 text-gray-600">Fitur lengkap dari otomatisasi statistik hingga analisis AI.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Modul 1 -->
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div class="text-brand font-bold text-lg mb-2">01. Clan & War Management</div>
            <ul class="space-y-2 text-sm text-gray-600">
              <li>- Status war real-time langsung di channel Discord</li>
              <li>- Klasemen race war & CWL otomatis</li>
              <li>- Laporan statistik donasi member secara berkala</li>
              <li>- Deteksi otomatis member pasif / tidak menyerang</li>
            </ul>
          </div>

          <!-- Modul 2 -->
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div class="text-brand font-bold text-lg mb-2">02. Clan Capital & Raid</div>
            <ul class="space-y-2 text-sm text-gray-600">
              <li>- Ringkasan hasil raid weekend tiap minggunya</li>
              <li>- Klasemen top donatur Capital Gold</li>
              <li>- Laporan status serangan raid tiap anggota</li>
            </ul>
          </div>

          <!-- Modul 3 -->
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div class="text-brand font-bold text-lg mb-2">03. Automation & Reminders</div>
            <ul class="space-y-2 text-sm text-gray-600">
              <li>- Notifikasi otomatis saat ada member keluar/masuk</li>
              <li>- Pengingat (reminder) sisa waktu war sebelum berakhir</li>
              <li>- Sistem reward & rekapan performa mingguan</li>
            </ul>
          </div>

          <!-- Modul 4 -->
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div class="text-brand font-bold text-lg mb-2">04. AI Integration</div>
            <ul class="space-y-2 text-sm text-gray-600">
              <li>- Tanya jawab interaktif seputar data clan dengan AI</li>
              <li>- Audit kesehatan dan keaktifan clan</li>
              <li>- Analisis strategi war dan saran peningkatan</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Gambar Panduan & Dokumentasi -->
    <section id="dokumentasi" class="max-w-3xl mx-auto px-6 py-16">
      <div class="text-center mb-10">
        <h2 class="text-2xl font-bold text-gray-900">Dokumentasi Tampilan Bot</h2>
        <p class="mt-2 text-gray-600 text-sm">Contoh pesan dan laporan terstruktur yang dikirimkan oleh Niki Bot.</p>
      </div>
      <div class="rounded-xl overflow-hidden shadow-md border border-gray-200 bg-gray-50">
        <img 
          src="/coc-2.png" 
          alt="Dokumentasi Niki CoC Bot" 
          loading="lazy"
          decoding="async"
          class="w-full h-auto object-cover max-h-[450px]" 
        />
      </div>
    </section>

    <!-- Cara Pakai -->
    <section id="panduan" class="bg-brand-light py-16">
      <div class="max-w-5xl mx-auto px-6 text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Cara Pakai Dalam 3 Langkah</h2>
        <div class="grid sm:grid-cols-3 gap-6 text-left">
          <div class="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
            <div class="font-bold text-brand mb-1">Langkah 1</div>
            <div class="font-semibold text-gray-800 mb-2">Invite Bot</div>
            <p class="text-xs text-gray-600">Klik tombol undang dan pilih server Discord yang kamu kelola.</p>
          </div>
          <div class="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
            <div class="font-bold text-brand mb-1">Langkah 2</div>
            <div class="font-semibold text-gray-800 mb-2">Hubungkan Clan</div>
            <p class="text-xs text-gray-600">Masukkan Tag Clan kamu menggunakan command bot di Discord.</p>
          </div>
          <div class="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
            <div class="font-bold text-brand mb-1">Langkah 3</div>
            <div class="font-semibold text-gray-800 mb-2">Selesai</div>
            <p class="text-xs text-gray-600">Bot langsung aktif mengabarkan statistik & laporan war otomatis.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer / Kontak -->
    <footer id="kontak" class="bg-white py-12 border-t border-gray-100">
      <div class="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="text-center md:text-left">
          <div class="font-bold text-lg text-brand">Niki CoC Bot</div>
          <p class="text-xs text-gray-500 mt-1">Bot Komunitas Independen untuk Clash of Clans.</p>
        </div>
        <div class="flex gap-4 text-xs font-medium">
          <a href="https://wa.me/6285736048626" class="text-gray-600 hover:text-brand">WhatsApp Admin</a>
          <a href="https://ixiera.id" class="text-gray-600 hover:text-brand">ixiera.id</a>
        </div>
      </div>
      <div class="max-w-5xl mx-auto px-6 mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
        &copy; 2026 Niki CoC Bot. Hak Cipta Dilindungi.
      </div>
    </footer>
  </div>
</template>
