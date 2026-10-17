export const ASSETS = {
  // Path lokal ke folder public/assets/coc
  gold: '/assets/coc/gold.png',
  elixir: '/assets/coc/elixir.png',
  darkElixir: '/assets/coc/dark_elixir.png',
  star: '/assets/coc/star.png',
  war: '/assets/coc/war.png',
  
  getTh: (level) => `/assets/coc/th${level}.png`,
  
  // Badge clan tetap pakai Supercell API (ini pasti jalan karena dari server resmi mereka)
  getClanBadge: (badgeId) => `https://api-assets.clashofclans.com/badges/512/${badgeId}.png`,
}
