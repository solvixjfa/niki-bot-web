export const ASSETS = {
  // Pake CDN ClashKingAssets (valid, aktif, di-host Cloudflare)
  getTh: (level) => `https://assets.clashk.ing/buildings/home-village/town_hall/level_${level}.webp`,
  
  // Badge clan (kalau nanti butuh, ini path umumnya, tapi kita fokus TH dulu)
  getClanBadge: (badgeId) => `https://api-assets.clashofclans.com/badges/512/${badgeId}.png`,
}
