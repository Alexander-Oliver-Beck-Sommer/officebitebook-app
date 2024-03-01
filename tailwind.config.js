/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        header_height: "4rem",
        sidebar_width: "4rem",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      gridTemplateColumns: {
        autoX1: "auto 1fr;",
        "1Xauto": "1fr auto;",
        "10X90": "10% 90%",
        "20X80": "20% 80%",
        "30X70": "30% 70%",
        auto1Xauto: "auto 1fr auto;",
      },
      gridTemplateRows: {
        "1xauto": "1fr auto;",
        autoX1: "auto 1fr;",
        auto1Xauto: "auto 1fr auto;",
      },
    },
    screens: {
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    colors: {
      "dark-100": "#1E1E1E",
      "dark-200": "#202020",
      "dark-300": "#252526",
      "dark-400": "#2d2d30",
      "dark-500": "#3E3E42",
      grey: "#A9A9A9",
      white: "#F8F9FA",
      primary: "#4CAF50",
      red: "#FE6257",
      orange: "#FEB157",
      transparent: "transparent",
    },
  },
  plugins: [require("tailwindcss-animated")],
};
