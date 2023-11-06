/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      animation: {
        'spinner': 'spin .4s linear infinite',
      }
    }
  },
  plugins: []
}
