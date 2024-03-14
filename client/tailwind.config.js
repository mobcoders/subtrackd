// tailwind.config.js
import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'orbit-1': 'orbit1 2s linear infinite',
        'orbit-2': 'orbit2 2.5s linear infinite',
        'orbit-3': 'orbit3 3s linear infinite',
        // Add more orbit animations as needed
      },
      keyframes: {
        orbit1: {
          '0%': { transform: 'rotate(0deg) translate(50px) rotate(0deg)' },
          '100%': {
            transform: 'rotate(360deg) translate(50px) rotate(-360deg)',
          },
        },
        orbit2: {
          '0%': { transform: 'rotate(0deg) translate(75px) rotate(0deg)' },
          '100%': {
            transform: 'rotate(360deg) translate(75px) rotate(-360deg)',
          },
        },
        orbit3: {
          '0%': { transform: 'rotate(0deg) translate(100px) rotate(0deg)' },
          '100%': {
            transform: 'rotate(360deg) translate(100px) rotate(-360deg)',
          },
        },
      },
    },
    colors: {
      'dark-purple': '#252350',
      'light-purple': '#504B9A',
      pink: '#AA72AE',
      blush: '#F8B68E',
      white: '#ffffff',
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'main-pattern': "url('/subtrackd-background.svg')",
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            secondary: {
              foreground: '#FFFFFF',
              DEFAULT: '#AA72AE',
            },
          },
        },
      },
    }),
  ],
};
