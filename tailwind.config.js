/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        andean: {
          terracotta: '#9B2C2C', // Cusco Red
          slate: '#3D405B',
          gold: '#B7791F', // Cusco Gold
          cream: '#F4F1DE',
          green: '#81B29A',
        },
        cusco: {
          red: '#9B2C2C',
          gold: '#B7791F',
          dark: '#0c0a09',
          paper: '#fafaf9'
        }
      },
      fontFamily: {
        sans: ['Proza Libre', 'Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      }
    },
  },
  plugins: [],
}
