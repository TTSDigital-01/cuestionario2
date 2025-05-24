module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#1E3A8A", // Azul oscuro
        "primary-light": "#0087D1", // Azul cerúleo
        gold: "#FFD700", // Oro
        "background": "#D8D8D8", // Fondo gris claro
        "text-dark-gray": "#1A1A1A",
        "text-light-gray": "#666666"
      }
    },
  },
  plugins: [],
};