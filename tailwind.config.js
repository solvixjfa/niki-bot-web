/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#7C3AED', dark: '#6D28D9', light: '#F3E8FF' }
      }
    },
  },
  plugins: [],
}
