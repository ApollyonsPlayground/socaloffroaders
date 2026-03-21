/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Added for potential root-level components
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Specific to src/app
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Specific to src/components
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}', // Specific to src/ui
  ],
  theme: {
    extend: {
      colors:{
        // Define custom colors if needed
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark"], // You can customize themes here
    base: true,
    styled: true,
    utils: true,
  },
}