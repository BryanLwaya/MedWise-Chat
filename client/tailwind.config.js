/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary" : "#0F1E46",
        "secondary" : "#009EB8",
        "highlight" : "#334165",
        "chat_color" : "#CFDDFF",
      }
    },
  },
  plugins: [],
}