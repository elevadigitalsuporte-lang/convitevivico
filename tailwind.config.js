/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        spideyRed: '#e11d48', // Red-600 ish
        spideyBlue: '#2563eb', // Blue-600 ish
        spideyDark: '#0f172a',
      },
      fontFamily: {
        comic: ['"Comic Sans MS"', 'Chalkboard SE', 'Marker Felt', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
