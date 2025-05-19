/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./public/**/*.html",
    "./**.html",
    "./**.js",
    "./src/**/*.{html,js}",
    "./public/css/**/*.css",
    "./**/*.ejs",
    "./vistas/**/*.ejs"
  ],
  theme: {
    extend: {
      colors: {
        'brand-green-light': '#A2B04C',
        'brand-brown-light': '#C2A255',
        'brand-grey-light': '#EDEDED',
        'animundo-green': '#2e8b57',
        'animundo-yellow': '#ffd700',
        'animundo-orange': '#ff8c00',
        'animundo-blue': '#1e90ff',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
      }
    },
  },
  plugins: [],
}