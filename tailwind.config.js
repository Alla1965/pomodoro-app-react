export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["font-sans", "font-serif", "font-mono"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Kumbh Sans", "sans-serif"],
        serif: ["Roboto Slab", "serif"],
        mono: ["Space Mono", "monospace"],
      },
    },
  },
};

