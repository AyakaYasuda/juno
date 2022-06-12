module.exports = {
  content: ['./src/**/*.{tsx, ts, js}'],
  theme: {
    extend: {
      colors: {
        White: {
          light: '#F1FFF0',
          lighter: '#FBFBFB',
          default: '#F5F5F5',
          dark: '#FDFBFB',
          darker: '#DEECDD',
        },
        Pink: {
          lighter: '#F2DAB9',
          default: '#DF9A83',
          dark: '#62382A',
        },
        Green: {
          default: '#99C698',
          dark: '#406939',
        },
        Yellow: {
          dark: '#C19B51',
        },
      },
      fontFamily: {
        allura: ['Allura', 'cursive'],
        lato: ['Lato', 'sans-serif'],
      },
      spacing: {
        medium: '37%',
        extraLarge: '87%',
      },
      backgroundImage: {
        'guest-top': "url('./views/images/guest-top.png')",
      },
    },
  },
  plugins: [],
};
