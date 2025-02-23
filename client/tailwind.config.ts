import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "menu-blue": "var(--menu-blue)",
        "menu-light-blue": "var(--menu-light-blue)",
        "menu-light-blue-hover": "var(--menu-light-blue-hover)",
        "menu-dark-blue": "var(--menu-dark-blue)",
      },
      fontFamily: {
        exo2: ["Exo 2", "sans-serif"],
        inter: ["Inter", "serif"],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
export default config;
