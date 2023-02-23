/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      '3xl': '1900px',
      // => @media (min-width: 1536px) { ... }
      '4xl': '2700px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      padding: {
        '30px': '30px',
      },
      colors: {
        'kakao': '#FFDE00'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ]
}