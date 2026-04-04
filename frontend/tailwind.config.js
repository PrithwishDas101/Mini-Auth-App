/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        'serif-display': ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'rgb(55, 65, 81)',
            a: {
              color: 'rgb(37, 99, 235)',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            strong: {
              fontWeight: '700',
              color: 'rgb(17, 24, 39)',
            },
            h1: {
              fontSize: '2.25rem',
              lineHeight: '2.5rem',
              fontFamily: 'Playfair Display, Georgia, serif',
              fontWeight: '700',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h2: {
              fontSize: '1.875rem',
              lineHeight: '2.25rem',
              fontFamily: 'Playfair Display, Georgia, serif',
              fontWeight: '700',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            code: {
              color: 'rgb(101, 116, 139)',
              backgroundColor: 'rgb(248, 250, 252)',
              borderRadius: '0.375rem',
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              fontSize: '0.875em',
            },
            pre: {
              backgroundColor: 'rgb(15, 23, 42)',
              borderRadius: '0.5rem',
              padding: '1rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'rgb(226, 232, 240)',
            },
          },
        },
      },
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      spacing: {
        'reading': '65ch',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
