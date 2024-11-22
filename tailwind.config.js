/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,scss,css}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'custom-gray': '#555555',
        'custom-blue': '#082F3F',
        'custom-black': '#181818',
        'custom-pink': '#ffdfdb',
        'black-transparent': '#00000030',
        'button-hover': '#082f3f80',
      },
    },
  },
  plugins: [],
};
