/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      colors: {
        taupe: {
          50: '#f5f4f2',
          100: '#e9e6e1',
          200: '#d2cdc3',
          300: '#b4ada0',
          400: '#958d7d',
          500: '#807766',
          600: '#696052',
          700: '#564f43',
          800: '#474138',
          900: '#3c3731',
          950: '#26221e',
        },
        champagne: {
          50: '#fcfaf6',
          100: '#f6f2e9',
          200: '#ebe1ce',
          300: '#dfcbac',
          400: '#d0af83',
          500: '#c29761',
          600: '#b28151',
          700: '#946644',
          800: '#7a543b',
          900: '#634532',
        },
      },
    },
  },
  plugins: [],
};
