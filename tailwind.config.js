const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(__dirname, "./app/**/*.{js,ts,jsx,tsx,mdx}"),
    path.join(__dirname, "./pages/**/*.{js,ts,jsx,tsx,mdx}"),
    path.join(__dirname, "./components/**/*.{js,ts,jsx,tsx,mdx}"),
  ],
  theme: {
    extend: {
      colors: {
        prime: {
          orange: '#F26522',
          'orange-hover': '#D95211',
          'orange-light': '#FFF5EE',
          'orange-border': '#FED7AA',
          dark: '#0F172A',
          'dark-lighter': '#1E293B',
          gray: '#F8FAFC',
          'gray-border': '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
