<template>
  <section id="faq" class="py-24 bg-white max-w-3xl mx-auto px-6">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-4 text-gray-900">Sering Ditanyain</h2>
      <p class="text-gray-600">Jawaban singkat buat keraguan lu.</p>
    </div>

    <div class="space-y-4">
      <details class="group bg-white border border-gray-200 rounded-xl cursor-pointer">
        <summary class="flex justify-between items-center p-5 font-bold text-gray-900 outline-none">
          <span>Apakah ini wajib pakai Bot Discord?</span>
          <span class="transition-transform group-open:rotate-180 text-brand">▼</span>
        </summary>
        <div class="px-5 pb-5 text-sm text-gray-600 border-t border-gray-100 pt-4">Nggak wajib. Web Dashboard bisa dipake mandiri. Tapi kalau lu invite Bot ke Discord, lu bakal dapet sinkronisasi data otomatis.</div>
      </details>

      <details class="group bg-white border border-gray-200 rounded-xl cursor-pointer">
        <summary class="flex justify-between items-center p-5 font-bold text-gray-900 outline-none">
          <span>Data klan gw aman?</span>
          <span class="transition-transform group-open:rotate-180 text-brand">▼</span>
        </summary>
        <div class="px-5 pb-5 text-sm text-gray-600 border-t border-gray-100 pt-4">Aman. Semua data diambil dari API Resmi Supercell. Sistem kami di-hosting di Railway & Supabase dengan enkripsi standar industri.</div>
      </details>

      <details class="group bg-white border border-gray-200 rounded-xl cursor-pointer">
        <summary class="flex justify-between items-center p-5 font-bold text-gray-900 outline-none">
          <span>AI Credits itu apa?</span>
          <span class="transition-transform group-open:rotate-180 text-brand">▼</span>
        </summary>
        <div class="px-5 pb-5 text-sm text-gray-600 border-t border-gray-100 pt-4">AI Credits dipake buat ngejalanin fitur AI (Audit, War Room, Report). Tiap klik tombol "Enhance", 1 kredit kepotong. Tier Pro dapet 50 kredit/bulan.</div>
      </details>

      <details class="group bg-white border border-gray-200 rounded-xl cursor-pointer">
        <summary class="flex justify-between items-center p-5 font-bold text-gray-900 outline-none">
          <span>Gimana cara bayarnya?</span>
          <span class="transition-transform group-open:rotate-180 text-brand">▼</span>
        </summary>
        <div class="px-5 pb-5 text-sm text-gray-600 border-t border-gray-100 pt-4">Saat ini pembayaran diproses manual via Admin. Klik "Ajukan Upgrade" di menu Billing, terus konfirmasi ke Admin via Discord/WA.</div>
      </details>
    </div>
  </section>
</template>
