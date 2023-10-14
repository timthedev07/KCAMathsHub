import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/reusable-vars/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["bg-emerald-600", "bg-cyan-600", "bg-orange-600", "bg-red-600"], // these are for dev buttons, may be unnecessary in prod
  theme: {
    extend: {
      gridTemplateRows: {
        desktop: "70px auto",
        tablet: "",
      },
      colors: {
        "primary-bg": "#151517",
        "primary-accent-bg": "#1b2033",
        "secondary-accent-bg": "#e67d3e",
        "tertiary-accent-bg": "#2284c9",
        "text-color": "#e9e3e7",
        "aux-text-color": "#e9e3e7a0",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
export default config;
