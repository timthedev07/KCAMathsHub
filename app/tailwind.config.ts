import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["bg-emerald-600", "bg-cyan-600", "bg-orange-600", "bg-red-600"], // these are for dev buttons, may be unnecessary in prod
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
  plugins: [require("@headlessui/tailwindcss")],
};
export default config;
