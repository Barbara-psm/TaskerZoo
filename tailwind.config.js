/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./public/**/*.html",
    "./**.html",
    "./**.js",
    "./src/**/*.{html,js}",
    "./public/css/**/*.css",
    "./**/*.ejs"
  ],
  theme: {
    extend: {
      colors: {
        'brand-green-light': '#A2B04C',
        'brand-brown-light': '#C2A255',
        'brand-grey-light': '#EDEDED',
      }
    },
  },
  plugins: [],
}

