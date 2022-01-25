module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '576px',
        'lg': '992px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
