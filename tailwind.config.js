/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        foreground: 'var(--fg-color)',
        background: 'var(--bg-color)',
        error: 'var(--error-color)',
        success: 'var(--success-color)',
        warning: 'var(--warning-color)',
        muted: 'var(--muted-color)',
        selection: 'var(--selection-color)',
        cursor: 'var(--cursor-color)',
        border: 'var(--border-color)',
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
