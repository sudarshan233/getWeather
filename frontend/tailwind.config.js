/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "accent": "#009DFF",
        "dark": {
          "primary": "#1B1B1B",
          "secondary": "#303030",
          "tertiary": "#404040",
        }
      },
      stroke: {
        "accent": "#009DFF",
        "inactive": "#F2F2F2"
      },
      textColor: {
        "primary": "#F2F2F2",
        "placeholder": "#A3A3A3",
      },
      borderColor: {
        "primary": "#303030",
        "accent": "#009DFF",
      }
    },
  },
  plugins: [],
}