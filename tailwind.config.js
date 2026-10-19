/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0058be",
          container: "#2170e4",
          fixed: "#d8e2ff",
          dark: "#003e8a",
          light: "#eef3ff"
        },
        secondary: {
          DEFAULT: "#855300",
          container: "#fea619",
          fixed: "#ffddb8",
          dark: "#684000",
          light: "#fff6eb"
        },
        tertiary: {
          DEFAULT: "#006947",
          container: "#00855b",
          fixed: "#6ffbbe",
          dim: "#4edea3",
          dark: "#004d33",
          light: "#e8faf2"
        },
        surface: {
          DEFAULT: "#ffffff",
          low: "#eff4ff",
          container: "#e6eeff",
          variant: "#e1e2ec"
        },
        brandBg: "#f8f9ff",
        onSurface: {
          DEFAULT: "#0d1c2e",
          variant: "#424754",
          subtle: "#727785"
        }
      },
      fontFamily: {
        headline: ['Quicksand', 'sans-serif'],
        body: ['"Nunito Sans"', 'sans-serif']
      },
      boxShadow: {
        'neo-sm': '0 2px 0 0 rgba(0,0,0,0.08)',
        'neo-btn': '0 4px 0 0 rgba(0,0,0,0.12)',
        'neo-primary': '0 4px 0 0 #003e8a',
        'neo-primary-active': '0 1px 0 0 #003e8a',
        'neo-secondary': '0 4px 0 0 #684000',
        'neo-secondary-active': '0 1px 0 0 #684000',
        'neo-tertiary': '0 4px 0 0 #004d33',
        'neo-card': '0 6px 0 0 #d9e3f7, 0 10px 25px -5px rgba(0, 88, 190, 0.05)',
        'neo-card-hover': '0 8px 0 0 #cbd8f5, 0 15px 30px -5px rgba(0, 88, 190, 0.08)'
      }
    },
  },
  plugins: [],
}
