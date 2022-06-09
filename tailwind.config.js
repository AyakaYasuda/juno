module.exports = {
  content: ['./src/**/*.{tsx, ts, js}'],
  theme: {
    extend: {
      colors: {
        White: {
          default: '#F5F5F5',
          dark: '#FDFBFB',
        },
        Pink: {
          lighter: '#F2DAB9',
          default: '#DF9A83',
          dark: '#62382A',
        },
        Green: {
          default: '#99C698',
        },
      },
      fontFamily: {
        allura: ['Allura', 'cursive'],
        lato: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
