/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: '#0ff0fc',
        magenta: '#f92aad',
        yellow: '#faff00',
        green: '#00ff41',
      },
    },
  },
  plugins: [],
}