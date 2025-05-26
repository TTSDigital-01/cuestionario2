// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#1E3A8A',
        'primary-light': '#0087D1',
        gold: '#FFD700',
        'text-dark-gray': '#4A4A4A',
        'text-light-gray': '#666666',
        background: '#D8D8D8'
      }
    },
  },
  plugins: []
}