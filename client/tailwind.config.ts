import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
    },
  },
  plugins: [],
};
export default config;
