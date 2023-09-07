/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
    },
    gridTemplateColumns:{
      'dextop-up':'25rem auto',
      'auto-fill': 'repeat(auto-fill, minmax(200px, 1fr))'
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
