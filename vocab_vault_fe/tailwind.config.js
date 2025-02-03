/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            primary: '#1E88E5', // Blue
            secondary: '#FFC107', // Amber
            background: '#f5f5f5', // Light Gray
            bgPrimaryHover: '#e6f4ff', // background primary when hover
            textPrimary: '#212121', // Dark Gray
            textSecondary: '#757575', // Gray
            accent: '#FF5722', // Deep Orange
         },
      },
   },
   plugins: [],
};
