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
            primary: {
              foreground: '#FFFFFF',
              DEFAULT: '#AA72AE',
            },
          },
        },
      },
    }),
  ],
};
