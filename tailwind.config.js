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
      minWidth: {
        '5': '1.25rem',
        '20': '5rem',
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
      spacing: {
        'input': '0.590rem'
      }
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
