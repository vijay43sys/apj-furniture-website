/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1C120C',
          espresso: '#2C1810',
          brown: '#3E2723',
          warm: '#4A3525',
          medium: '#5A3D2E',
          caramel: '#8C5A3C',
          gold: '#C5A059',
          light: '#FAF7F2',
          cream: '#F5EFEB',
          sand: '#EFE8DE',
          border: '#E2D7C7',
          muted: '#7A6B60',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(44, 24, 16, 0.06)',
        'card': '0 10px 30px -4px rgba(44, 24, 16, 0.08)',
        'hover': '0 20px 40px -4px rgba(44, 24, 16, 0.12)',
      }
    },
  },
  plugins: [],
}
