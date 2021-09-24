const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
    },
    extend: {
      transitionProperty: {
        width: 'width',
      },
      width: {
        '20px': '20px',
        '150px': '150px',
      },
      maxWidth: {
        '265px': '265px',
        '150px': '150px',
      },
      screens: {
        'print': {'raw': 'print'},
      },
    },
    fontFamily: {
      noto: ['"Noto Sans"', 'Helvetica'],
      notoJP: ['"Noto Sans JP"', 'Helvetica'],
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
};
