/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0a',
        theme: 'rgb(34, 211, 238)',
        error: '#ff1a1a'
      },
      fontFamily: {
        monsterrat: ['Montserrat', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif']
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite'
      },
      transitionProperty: {
        'bg-image': 'background-image'
      },
      borderRadius: {
        circle: '50%',
        inherit: 'inherit'
      },
      boxShadow: {
        '3xl': '0 30px 60px -10px rgba(0, 0, 0, 0.5)',
        '4xl': '0 15px 30px -5px rgba(0, 0, 0, 0.5)',
        progressbar: '0 0 10px, 0 0 5px'
      },
      gridTemplateColumns: {
        images: 'repeat(auto-fill, minmax(320px, 1fr))',
        'album-modal': 'repeat(auto-fill, minmax(200px, 1fr))'
      }
    }
  },
  plugins: []
};
