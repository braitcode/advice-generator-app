/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'glow': '0 0 15px 5px rgba(34, 211, 238, 0.6)', // Customize the glow effect
      },
      backgroundColor: {
        glow: '#52ffa8',
      },
    },
  },
  plugins: [],
}