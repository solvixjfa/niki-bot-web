export const ASSETS = {
  // Pake jsDelivr (CDN Github yang stabil)
  getTh: (level) => `https://cdn.jsdelivr.net/gh/Statscell/clash-assets@main/townhalls/th${level}.png`,
  
  // Badge clan dari API Supercell
  getClanBadge: (badgeId) => `https://api-assets.clashofclans.com/badges/512/${badgeId}.png`,
}
