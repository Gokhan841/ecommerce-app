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
    screens: {
      'sm': '640px',
      'md': '768px',
      'custom-900': '900px',  // özel kırılım navbar için ekledim, çünkü 900den küçük ekranlarda yazı yazıldığında gözükmüyordu.
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
