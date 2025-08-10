module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
      },
      colors: {
        brand: "#8ecae6",
      },
      boxShadow: {
        card: "0 4px 14px rgba(0, 0, 0, 0.1)",
      },
      spacing: {
        128: "32rem",
      },
    },
  },
  plugins: [],
};
