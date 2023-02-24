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
        circle: '50%',
        inherit: 'inherit'
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.6)'
      }
    }
  },
  plugins: []
};
