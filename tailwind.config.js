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
      screens: {
        'xs': '375px',  // Custom screen size for extra small devices
        'sm': '640px',  // Default small screen
        'md': '768px',  // Default medium screen
        'lg': '1024px', // Default large screen
        'xl': '1280px', // Default extra large screen
        '2xl': '1536px', // Default 2xl screen
      },
    },
  },
  plugins: [],
}