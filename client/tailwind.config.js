/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primaryColor": "#5f1eaf",
        "secondaryColor": "#8f63ae",
        "customBlack": "#3333",
        "customWhite": "#c1c1c1",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
