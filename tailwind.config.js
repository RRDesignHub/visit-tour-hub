/** @type {import('tailwindcss').Config} */
import daisyUI from "daisyui";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: '#E07A5F', // Primary color
        sand: '#F4F1DE',       // Light background
        chocolate: '#3D405B',  // Dark contrast color
        white: '#FFFFFF',      // Standard white
      },
    },
    fontFamily: {
      'nunito': ["Nunito", "serif"], // For headings
      'heebo': ["Heebo", "serif"],   // For body text
    },
  },
  plugins: [
    daisyUI
  ],
  daisyui: {
    themes: [
      {
        tourhub: {
          primary: '#E07A5F',  // Terracotta
          secondary: '#3D405B', // Chocolate
          accent: '#F4F1DE',   // Sand
          neutral: '#4F4F4F',  // Neutral for text
          'base-100': '#FFFFFF', // White background
        },
      },
    ],
  },
}

