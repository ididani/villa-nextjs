module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // ← Make sure this matches your file structure
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"], // Your custom font
      },
      colors: {
        brand: "#1e40af", // Add your own branding
        // Add other brand colors here
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
