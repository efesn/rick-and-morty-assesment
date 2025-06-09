/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'portal-green': '#97ce4c',
        'portal-blue': '#00b0c8',
        'rick-blue': '#69c8ec',
        'morty-yellow': '#ffd919',
        'space-black': '#1a1a1a',
        'dimension-gray': '#242424',
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'schwifty': ['Get Schwifty', 'cursive'],
      },
      backgroundImage: {
        'portal-pattern': "url('/src/assets/portal-bg.svg')",
        'space-pattern': "url('/src/assets/space-bg.svg')",
      },
      animation: {
        'portal-spin': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 