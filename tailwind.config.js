const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
    },
    extend: {
      transitionProperty: {
        width: 'width',
      },
      minWidth: {
        5: '1.25rem',
        20: '5rem',
        '90px': '90px',
        '150px': '150px',
      },
      width: {
        '20px': '20px',
        '150px': '150px',
      },
      maxWidth: {
        '265px': '265px',
        '150px': '150px',
        xxs: '17rem',
      },
      screens: {
        print: { raw: 'print' },
      },
      spacing: {
        input: '0.590rem',
      },
    },
    fontFamily: {
      noto: ['"Noto Sans"', 'Helvetica'],
      notoJP: ['"Noto Sans JP"', 'Helvetica'],
    },
  },
  plugins: [],
};
