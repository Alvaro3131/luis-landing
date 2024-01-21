/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    borderRadius: {
      'full': '100px',
      'lg':'12px',
    },
    colors: {
      'blue-page': '#00338E',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    extend: {
      height: {
        '80-vh': '80vh',
        '120':'32rem',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
