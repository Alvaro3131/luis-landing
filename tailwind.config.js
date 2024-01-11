/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      height: {
        '80-vh': '80vh',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}