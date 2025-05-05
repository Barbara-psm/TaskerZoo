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
    extend: {},
  },
  plugins: [],
}

