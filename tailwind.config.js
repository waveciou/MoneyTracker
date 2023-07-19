/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      black: '#000000',
      'black-base': '#333333',
      'black-dark': '#2E363D',
      'black-darker': '#232323',
      'black-darkest': '#161616',
    },
    extend: {
      spacing: {
        'header-height': '50px',
        'menu-height': '70px',
      },
      maxWidth: {
        'container': '480px',
      },
    },
  },
};
