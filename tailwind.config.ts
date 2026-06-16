import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D8E5A",
        secondary: "#9DC08B",
        light: "#EDF1D6",
        dark: "#40513B",
        darker: "#282828",
        button: "#34A873",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
