/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#7C3AED', dark: '#6D28D9', light: '#F3E8FF' },
        navy: {
          950: '#0a0f1c', // Background Utama
          900: '#111827', // Card Background
          800: '#1f2937', // Border / Hover
          700: '#374151'
        }
      }
    },
  },
  plugins: [],
}
