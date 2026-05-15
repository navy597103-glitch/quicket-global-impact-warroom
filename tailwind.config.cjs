/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 18px 50px rgba(15, 23, 42, 0.12)',
        glow: '0 0 36px rgba(34, 211, 238, 0.18)'
      }
    }
  },
  plugins: []
}
