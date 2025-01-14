/** @type {import('tailwindcss').Config} */
import daisyUI from "daisyui";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'nunito': ["Nunito", "serif", "arial"],
      'heebo': ["Heebo", "serif", "arial"],
    }
  },
  plugins: [
    daisyUI
  ],
}

