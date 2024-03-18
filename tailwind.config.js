/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        boxShadow: {
            nav: '0px 6px 15px 0px #404F680D'
        },
    },
  },
  plugins: [],
}

