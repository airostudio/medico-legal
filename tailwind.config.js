/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1220',
          light: '#0E1728',
        },
        teal: {
          DEFAULT: '#1E8FA6',
          light: '#2FB7C9',
        },
        gold: {
          DEFAULT: '#C98A2A',
        },
        slate: {
          custom: '#A9B3C6',
        },
      },
    },
  },
  plugins: [],
}
