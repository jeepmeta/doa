/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        doa: { black: '#0a0a0a', dark: '#121212', red: '#ff2a2a', darkred: '#8b0000', white: '#f0f0f0', green: '#00ff41', orange: '#ff8c00' }
      },
      fontFamily: { mono: ['Space Mono', 'monospace'] }
    }
  },
  plugins: []
}