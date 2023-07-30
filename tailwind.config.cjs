const { fontFamily } = require('tailwindcss/defaultTheme');
const themes = require('daisyui/src/theming/themes');
const { themeColors } = require('./data/constants');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0a',
        theme: 'rgb(34, 211, 238)'
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        heading: ['var(--font-heading)', ...fontFamily.sans],
        monsterrat: ['Montserrat', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif']
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'in-out-back': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
      },
      borderRadius: {
        circle: '50%',
        inherit: 'inherit'
      },
      boxShadow: {
        '3xl': '0 30px 60px -10px rgba(0, 0, 0, 0.5)',
        '4xl': '0 15px 30px -5px rgba(0, 0, 0, 0.5)'
      },
      gridTemplateColumns: {
        fill: 'repeat(auto-fill, minmax(var(--col-min-width), 1fr))'
      }
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          ...themes['[data-theme=light]'],
          'primary': themeColors.primary,
          'primary-content': themeColors.text.light,
          'secondary': themeColors.secondary.light,
          'secondary-content': themeColors.text.light,
          'accent': themeColors.accent,
          'neutral': themeColors.neutral.light,
          'neutral-content': themeColors.text.light,
          'base-100': themeColors.background.light,
          'base-200': '#eee',
          'base-300': '#efefef',
          'base-content': themeColors.text.light,
          'error': themeColors.error
        },
        dark: {
          ...themes['[data-theme=dark]'],
          'primary': themeColors.primary,
          'primary-content': themeColors.text.dark,
          'secondary': themeColors.secondary.dark,
          'secondary-content': themeColors.text.dark,
          'accent': themeColors.accent,
          'neutral': themeColors.neutral.dark,
          'neutral-content': themeColors.text.dark,
          'base-100': themeColors.background.dark,
          'base-200': '#090909',
          'base-300': '#000',
          'base-content': themeColors.text.dark,
          'error': themeColors.error
        }
      }
    ],
    darkTheme: 'dark',
    base: false,
    styled: true,
    utils: true,
    rtl: false,
    prefix: '',
    logs: false
  },
  plugins: [require('tailwindcss-animate'), require('daisyui')]
};
