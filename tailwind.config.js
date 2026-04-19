/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "font-main",
    "font-font1",
    "font-font2",
    "font-font3",
    "font-font4",
    "font-font5",
    "letter-font-1",
    "letter-font-2",
    "letter-font-3",
    "letter-font-4",
    "letter-font-5",
    "letter-font-main",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a0a0a",
        accent: "#a1a1aa",
      },
      fontFamily: {
        main:  ["MainFont", "sans-serif"],
        font1: ["Font1",    "sans-serif"],
        font2: ["Font2",    "sans-serif"],
        font3: ["Font3",    "sans-serif"],
        font4: ["Font4",    "sans-serif"],
        font5: ["Font5",    "sans-serif"],
      },
    },
  },
};