/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,html}"
  ],
  darkMode: 'class', // Enable dark mode with class-based approach
  theme: {
    extend: {
      colors: {
        // Custom color palette with dark mode variants
        primary: {
          DEFAULT: '#3498db',
          dark: '#2980b9'
        },
        secondary: {
          DEFAULT: '#2ecc71',
          dark: '#27ae60'
        },
        background: {
          light: '#f4f4f4',
          dark: '#121212'
        }
      },
      boxShadow: {
        'dark-lg': '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)'
      }
    },
  },
  plugins: [],
}
