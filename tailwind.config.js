/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
        '3xl': '0 30px 60px -10px rgba(0, 0, 0, 0.5)',
        '4xl': '0 15px 30px -5px rgba(0, 0, 0, 0.5)'
      },
      gridTemplateColumns: {
        images: 'repeat(auto-fill, minmax(380px, 1fr))'
      }
    }
  },
  plugins: []
};
