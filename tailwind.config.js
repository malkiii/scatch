/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0a',
        theme: 'rgb(34, 211, 238)'
      },
      fontFamily: {
        monsterrat: ['Montserrat', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif']
      },
      borderRadius: {
        circle: '50%'
      },
      animation: {
        'scroll-left': 'scroll-left 30s linear infinite',
        'scroll-right': 'scroll-right 30s linear infinite'
      },
      keyframes: {
        'scroll-left': {
          '0%': { translate: '0 0' },
          '100%': { translate: '-50% 0' }
        },
        'scroll-right': {
          '0%': { translate: '-50% 0' },
          '100%': { translate: '0 0' }
        }
      }
    }
  },
  plugins: []
};
