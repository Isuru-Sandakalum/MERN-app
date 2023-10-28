import { Input } from 'postcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:'#FF6969',
        sec:'#78D6C6'
        
      }

    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    // ...
  ],
}

