/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E50914",
        darkBg: "#0f0f0f",
        cardBg: "#1a1a1a",
      },
    },
  },
  plugins: [],
}