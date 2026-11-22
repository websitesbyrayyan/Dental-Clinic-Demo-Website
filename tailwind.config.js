/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#183D35",
        sage: "#568477",
        lightsage: "#BFD8CB",
        warmwhite: "#F5F7F2",
        charcoal: "#343F3A",
        bloodstone: "#5D0D18",
      },

      fontFamily: {
        serif: [
          '"Fraunces Variable"',
          "Georgia",
          "serif",
        ],
        sans: [
          '"DM Sans Variable"',
          "system-ui",
          "sans-serif",
        ],
      },

      boxShadow: {
        soft: "0 8px 30px rgba(24, 61, 53, 0.08)",
        card: "0 12px 35px rgba(24, 61, 53, 0.10)",
        elevated: "0 20px 60px rgba(24, 61, 53, 0.14)",
      },

      transitionDuration: {
        400: "400ms",
        600: "600ms",
      },

      letterSpacing: {
        editorial: "-0.035em",
      },

      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};