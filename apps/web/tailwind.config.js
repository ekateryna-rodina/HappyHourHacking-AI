/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f4f0',
          100: '#cce9e1',
          200: '#99d3c3',
          300: '#66bda5',
          400: '#33a787',
          500: '#009169',
          600: '#007b5a',
          700: '#006747',
          800: '#005237',
          900: '#003d28',
        },
        accent: {
          light: '#6fba2c',
          DEFAULT: '#5a9a23',
          dark: '#4a7d1c',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
