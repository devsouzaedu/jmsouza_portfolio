import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fadeIn': 'fadeIn 1.5s ease-out forwards',
        'slideUp': 'slideUp 1s ease-out forwards',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '0.3' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            h1: {
              fontWeight: '800',
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },
            h2: {
              fontWeight: '700',
              marginTop: '1.25em',
              marginBottom: '0.5em',
            },
            h3: {
              fontWeight: '600',
              marginTop: '1em',
              marginBottom: '0.5em',
            },
            pre: {
              borderRadius: '0.375rem',
              padding: '1rem',
            },
            code: {
              backgroundColor: '#f3f4f6',
              borderRadius: '0.25rem',
              padding: '0.125rem 0.25rem',
              color: '#ef4444',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            blockquote: {
              borderLeftWidth: '0.25rem',
              borderLeftColor: '#d1d5db',
              fontStyle: 'italic',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
