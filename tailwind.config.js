module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        IBM: ["IBMPlexMono Regular, sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
