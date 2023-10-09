/** @type {import('tailwindcss').Config} */

const ICON_SIZE = 60;

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
      yellow: '#FFDF5E',
      red: '#f76C83',
      green: '#94C962',
    },
    extend: {
      spacing: {
        'header-height': '50px',
        'menu-height': '60px',
        'icon-size': `${ICON_SIZE}px`,
        'wrap-space': '15px',
      },
      width: {
        'popup': 'calc(100% - 30px)',
        'card-content': `calc(100% - ${ICON_SIZE}px)`,
      },
      maxWidth: {
        'container': '480px',
        'popup': '450px',
      },
      maxHeight: {
        'popup': 'calc(100% - 30px)',
      },
      boxShadow: {
        'input': '0px 0px 0px 0.2rem rgba(255,223,94,.55)',
      },
      zIndex: {
        'search-section': '3000',
        'rescord-section': '4000',
        'popup': '5500',
      },
    },
  },
};
