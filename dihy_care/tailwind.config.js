// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./node_modules/@heroui/theme/dist/components/(dropdown|menu|divider|popover|button|ripple|spinner).js",
  "./app/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",

],

  theme: {
    extend: {
         keyframes: {
           gradient: {
           '0%': { backgroundPosition: '0% 50%' },
           '50%': { backgroundPosition: '100% 50%' },
           '100%': { backgroundPosition: '0% 50%' },
         },
       },
       animation: {
         gradient: 'gradient 8s linear infinite'
       },
     },
   },
  darkMode: "class",
  plugins: [heroui()],
};