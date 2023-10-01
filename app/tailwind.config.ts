import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#151517",
        "primary-accent-bg": "#469ad7",
        "secondary-accent-bg": "#e67d3e",
        "text-color": "#e9e3e7",
        "aux-text-color": "#e9e3e7a0",
      },
    },
  },
  plugins: [],
};
export default config;
