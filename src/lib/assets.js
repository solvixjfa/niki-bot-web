// CDN Aset Clash of Clans (Hotlink tanpa perlu download)
export const ASSETS = {
  // Badge Clan (menggunakan API Resmi Supercell, butuh ID Badge dari response API clan)
  getClanBadge: (badgeId) => `https://api-assets.clashofclans.com/badges/512/${badgeId}.png`,

  // Ikon Umum (Sumber: Repositori open-source Clash of Stats / RoyaleAPI)
  gold: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/coc/gold.png',
  elixir: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/coc/elixir.png',
  darkElixir: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/coc/dark_elixir.png',
  star: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/coc/star.png',
  war: 'https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/coc/war.png',
  
  // Ikon TH
  getTh: (level) => `https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/coc/townhalls/th${level}.png`
}
