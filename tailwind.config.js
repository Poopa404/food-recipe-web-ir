/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pr-white': '#F9F9F9',
        'pr-dark-blue': '#5AA9E6',
        'pr-light-blue': '#7FC8F8',
        'pr-light-orange': '#FFA630',
        'pr-dark-orange': '#FF6700',
        'pr-light-pink': '#FF6392',
        'pr-dark-pink': '#EF476F'
      }
    },
  },
  plugins: [],
}

