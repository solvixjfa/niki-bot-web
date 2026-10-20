<template>
  <section id="harga" class="py-24 bg-gray-50/50 border-t border-gray-100">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Harga Ramah, Hasil Maksimal.</h2>
        <p class="text-gray-600 text-lg">Mulai gratis dulu. Upgrade kapan aja kalau butuh fitur AI.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
        <!-- FREE -->
        <div class="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col hover:shadow-lg transition-shadow">
          <h3 class="text-lg font-bold text-gray-700 mb-2">Free</h3>
          <p class="text-xs text-gray-500 mb-6">Buat yang baru mulai ngeklan</p>
          <div class="flex items-baseline gap-1 mb-8">
            <span class="text-4xl font-black text-gray-900">Rp 0</span>
            <span class="text-sm text-gray-500">/bulan</span>
          </div>
          <ul class="space-y-3 text-sm text-gray-600 mb-8 flex-1">
            <li class="flex items-start gap-2"><svg class="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Web Dashboard</li>
            <li class="flex items-start gap-2"><svg class="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> List Member & Donasi</li>
            <li class="flex items-start gap-2"><svg class="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Status War & CWL</li>
            <li class="flex items-start gap-2"><svg class="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Bot Discord Basic</li>
          </ul>
          <button @click="$emit('login')" class="w-full py-3 rounded-xl border border-gray-200 text-gray-900 font-bold text-sm hover:bg-gray-50 transition-colors">Mulai Gratis</button>
        </div>

        <!-- STANDARD -->
        <div class="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col hover:shadow-lg transition-shadow">
          <h3 class="text-lg font-bold text-blue-600 mb-2">Standard</h3>
          <p class="text-xs text-gray-500 mb-6">Buat clan yang serius</p>
          <div class="flex items-baseline gap-1 mb-8">
            <span class="text-4xl font-black text-gray-900">Rp 10k</span>
            <span class="text-sm text-gray-500">/bulan</span>
          </div>
          <ul class="space-y-3 text-sm text-gray-600 mb-8 flex-1">
            <li class="flex items-start gap-2"><svg class="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <strong>Semua fitur Free</strong></li>
            <li class="flex items-start gap-2"><svg class="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Leaderboard & Compare</li>
            <li class="flex items-start gap-2"><svg class="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Manajemen Reward (MVP)</li>
            <li class="flex items-start gap-2"><svg class="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Race War & Race CWL</li>
            <li class="flex items-start gap-2"><svg class="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> TH Composition</li>
            <li class="flex items-start gap-2"><svg class="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Recap War & Recap CWL</li>
          </ul>
          <button @click="$emit('login')" class="w-full py-3 rounded-xl border border-gray-200 text-gray-900 font-bold text-sm hover:bg-gray-50 transition-colors">Pilih Standard</button>
        </div>

        <!-- PRO (Highlight) -->
        <div class="bg-white border-2 border-brand rounded-3xl p-8 flex flex-col relative shadow-2xl shadow-brand/20 transform md:scale-105 z-10">
          <div class="absolute top-0 right-8 -translate-y-1/2 bg-brand text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">Paling Worth It</div>
          <h3 class="text-lg font-bold text-brand mb-2">Pro</h3>
          <p class="text-xs text-gray-500 mb-6">Buat clan yang mau juara</p>
          <div class="flex items-baseline gap-1 mb-8">
            <span class="text-4xl font-black text-gray-900">Rp 30k</span>
            <span class="text-sm text-gray-500">/bulan</span>
          </div>
          <ul class="space-y-3 text-sm text-gray-700 mb-8 flex-1">
            <li class="flex items-start gap-2"><svg class="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <strong class="text-gray-900">Semua fitur Standard</strong></li>
            <li class="flex items-start gap-2"><svg class="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <strong class="text-gray-900">AI Audit (Kesehatan Klan)</strong></li>
            <li class="flex items-start gap-2"><svg class="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <strong class="text-gray-900">AI War Room & Taktik</strong></li>
            <li class="flex items-start gap-2"><svg class="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <strong class="text-gray-900">AI Reports (Export PDF)</strong></li>
            <li class="flex items-start gap-2"><svg class="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> CWL Roster Maker</li>
            <li class="flex items-start gap-2"><svg class="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> 30 AI Credits / Bulan</li>
          </ul>
          <button @click="$emit('login')" class="w-full py-3 rounded-xl bg-brand text-white font-bold text-sm shadow-lg shadow-brand/30 hover:bg-brand-dark transition-colors">Upgrade ke Pro</button>
        </div>
      </div>
    </div>
  </section>
</template>
