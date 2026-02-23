/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
        secondary: "#7c3aed",
        darkbg: "#0f172a",
      },
      boxShadow: {
        card: "0 10px 25px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
}