import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#fdf8f0",
          100: "#f9eddb",
          200: "#f2d9b5",
          300: "#e9be86",
          400: "#df9e55",
          500: "#d78635",
          600: "#c96f2a",
          700: "#a75624",
          800: "#864524",
          900: "#6d3a20",
        },
        terracotta: {
          50: "#fdf3f0",
          100: "#fce4dc",
          200: "#facbbe",
          300: "#f5a68f",
          400: "#ee7757",
          500: "#e45533",
          600: "#d13c1e",
          700: "#af2f19",
          800: "#902919",
          900: "#78261a",
        },
        desert: {
          50: "#f7f6f2",
          100: "#ecebe0",
          200: "#dbd7c4",
          300: "#c5bea0",
          400: "#b0a47e",
          500: "#a19167",
          600: "#947f59",
          700: "#7c694b",
          800: "#665641",
          900: "#544737",
        },
      },
    },
  },
  plugins: [],
};

export default config;
