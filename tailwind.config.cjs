/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      fontFamily : {
        Roboto: ["Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
  darkMode: "class",
}