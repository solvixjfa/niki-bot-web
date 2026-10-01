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
          light: '#f3e8ff',
          DEFAULT: '#7c3aed',
          dark: '#6d28d9',
        }
      }
    },
  },
  plugins: [],
}
