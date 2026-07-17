/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fba556',
          500: '#e68229',
          600: '#d56b15',
          700: '#b2510b',
          800: '#8e3e08',
          DEFAULT: '#e68229',
          dark:  '#b2510b',
          light: '#fba556',
        },
        accent: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fba556',
          DEFAULT: '#e68229',
          light: '#fba556',
          dark:  '#d56b15',
        },
        neutral: {
          50:  '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        88: '22rem',
        112: '28rem',
        128: '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft':    '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
        'card':    '0 4px 25px rgba(0,0,0,0.08)',
        'card-lg': '0 8px 40px rgba(0,0,0,0.12)',
        'glow':    '0 0 30px rgba(230,130,41,0.30)',
        'glow-accent': '0 0 30px rgba(230,130,41,0.40)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient':   'linear-gradient(135deg, rgba(178,81,11,0.92) 0%, rgba(230,130,41,0.75) 60%, rgba(251,165,86,0.15) 100%)',
        'card-gradient':   'linear-gradient(135deg, #e68229 0%, #fba556 100%)',
        'accent-gradient': 'linear-gradient(135deg, #e68229 0%, #fba556 100%)',
        'dark-gradient':   'linear-gradient(180deg, #111827 0%, #e68229 100%)',
      },
      animation: {
        'fade-in':      'fadeIn 0.6s ease-out forwards',
        'fade-up':      'fadeUp 0.6s ease-out forwards',
        'slide-left':   'slideLeft 0.5s ease-out forwards',
        'slide-right':  'slideRight 0.5s ease-out forwards',
        'pulse-slow':   'pulse 3s ease-in-out infinite',
        'bounce-slow':  'bounce 2s infinite',
        'spin-slow':    'spin 8s linear infinite',
        'float':        'float 4s ease-in-out infinite',
        'shimmer':      'shimmer 1.5s infinite',
        'count-up':     'countUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%':   { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      transitionDuration: { 400: '400ms' },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
};
