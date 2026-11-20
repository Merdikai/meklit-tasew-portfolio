/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        court: {
          darkest: '#070C15',
          dark: '#0D1526',
          card: '#131F37',
          cardHover: '#182744',
          border: '#243456',
          muted: '#8A99B5',
          gold: '#C8A45D',
          goldLight: '#E5C483',
          goldDark: '#997633',
          navy: '#1A335E',
          royal: '#254E99',
          cream: '#F8F6F0',
          paper: '#F1ECE1',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'subtle-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c8a45d' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M30 30L0 0h60L30 30zM0 60l30-30 30 30H0z'/%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
