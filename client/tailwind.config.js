/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "soft-teal": "#99CDD8",        // Soft yeşil-mavi ton
        "pale-rose": "#DAEBE3",        // Soluk gül rengi
        "light-peach": "#FFDAB9",     // Açık şeftali
        "warm-beige": "#F3C3B2",       // Sıcak bej
        "pale-green": "#CFD6C4",      // Soluk yeşil
        "slate-gray": "#657166",       // Grili mavi ton
      }
    },
  },
  plugins: [],
};
