/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
        sourcesans: ["Source Sans Pro", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
        merriweather: ["Merriweather", "serif"],
        playfair: ["Playfair Display", "serif"],
        quicksand: ["Quicksand", "sans-serif"],
        josefin: ["Josefin Sans", "sans-serif"],
        cabin: ["Cabin", "sans-serif"],
        dmsans: ["DM Sans", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        worksans: ["Work Sans", "sans-serif"],
        fira: ["Fira Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

