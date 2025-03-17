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
            color: '#333',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            h1: {
              fontWeight: '800',
              fontSize: '2.25em',
              marginTop: '1.5em',
              marginBottom: '0.8em',
              lineHeight: '1.2',
            },
            h2: {
              fontWeight: '700',
              fontSize: '1.8em',
              marginTop: '1.75em',
              marginBottom: '0.5em',
              lineHeight: '1.3',
            },
            h3: {
              fontWeight: '600',
              fontSize: '1.5em',
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },
            h4: {
              fontWeight: '600',
              marginTop: '1.25em',
              marginBottom: '0.5em',
            },
            p: {
              marginTop: '1em',
              marginBottom: '1em',
              lineHeight: '1.7',
            },
            strong: {
              fontWeight: '700',
              color: '#111',
            },
            pre: {
              backgroundColor: '#f5f5f5',
              borderRadius: '0.375rem',
              padding: '1.25rem',
              overflowX: 'auto',
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
              paddingLeft: '1rem',
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.5em',
              marginTop: '1em',
              marginBottom: '1em',
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: '1.5em',
              marginTop: '1em',
              marginBottom: '1em',
            },
            li: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '1em',
              marginBottom: '1em',
            },
            th: {
              borderBottomWidth: '2px',
              borderColor: '#d1d5db',
              padding: '0.5em',
              textAlign: 'left',
              fontWeight: '600',
            },
            td: {
              borderBottomWidth: '1px',
              borderColor: '#e5e7eb',
              padding: '0.5em',
            },
          },
        },
        dark: {
          css: {
            color: '#e5e7eb',
            a: {
              color: '#60a5fa',
              '&:hover': {
                color: '#93c5fd',
              },
            },
            strong: {
              color: '#f9fafb',
            },
            h1: {
              color: '#f9fafb',
            },
            h2: {
              color: '#f9fafb',
            },
            h3: {
              color: '#f9fafb',
            },
            h4: {
              color: '#f9fafb',
            },
            code: {
              color: '#f472b6',
              backgroundColor: '#374151',
            },
            pre: {
              backgroundColor: '#1f2937',
            },
            blockquote: {
              borderLeftColor: '#4b5563',
            },
            th: {
              borderColor: '#4b5563',
            },
            td: {
              borderColor: '#374151',
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
