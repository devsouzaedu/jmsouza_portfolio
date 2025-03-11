/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fadeIn': 'fadeIn 1.5s ease-out forwards',
        'slideUp': 'slideUp 1s ease-out forwards',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 0.3 },
        },
      },
    },
  },
  plugins: [],
}
