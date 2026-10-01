/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#f0f9ff',
          DEFAULT: '#0284c7',
          dark: '#0369a1',
        }
      }
    },
  },
  plugins: [],
}
