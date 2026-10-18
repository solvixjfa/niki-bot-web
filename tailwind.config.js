/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#7C3AED', dark: '#6D28D9', light: '#F3E8FF' },
        navy: {
          950: '#000000', // Background Utama (Hitam Pekat)
          900: '#0A0A0A', // Card Background (Hitam Sedikit Terang)
          800: '#262626', // Border / Garis Tipis (Abu Gelap)
          700: '#404040'  // Hover State
        }
      }
    },
  },
  plugins: [],
}
