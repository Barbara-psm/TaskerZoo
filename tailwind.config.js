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
        // Colores de TaskerZoo
        'brand-green-light': '#A2B04C',
        'brand-brown-light': '#C2A255',
        'brand-grey-light': '#EDEDED',
        // Colores de animundo
        'animundo-green': '#2e8b57',
        'animundo-yellow': '#ffd700',
        'animundo-orange': '#ff8c00',
        'animundo-blue': '#1e90ff',
        'animundo-dark-orange': '#E66D09',
        'animundo-blue-med': '#25A8B5',
        'animundo-light-blue': '#39ABB2',
        'animundo-brown': '#4A2713',
        'animundo-beige': '#FCE3BB',
        'animundo-light-orange': '#FFB413'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
      },
      animation: {
        'bounceIn': 'bounceIn 0.5s ease-out',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}