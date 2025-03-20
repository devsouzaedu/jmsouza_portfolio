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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#3b82f6',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            hr: {
              borderColor: 'rgb(229 231 235 / 0.5)',
            },
            blockquote: {
              borderLeftColor: 'rgb(229 231 235 / 0.5)',
              fontStyle: 'italic',
            },
            code: {
              backgroundColor: 'rgb(243 244 246)',
              color: 'rgb(31 41 55)',
              borderRadius: '0.25rem',
              padding: '0.125rem 0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              padding: '0',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
