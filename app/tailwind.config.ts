import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/reusable-vars/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  safelist: ["bg-emerald-600", "bg-cyan-600", "bg-orange-600", "bg-red-600"], // these are for dev buttons, may be unnecessary in prod
  theme: {
    extend: {
      gridTemplateRows: {
        desktop: "70px auto",
        tablet: "",
      },
      colors: {
        "primary-bg": "#09090a",
        "primary-accent-bg": "#1b2033",
        "secondary-accent-bg": "#e67d3e",
        "tertiary-accent-bg": "#2284c9",
        "text-color": "#e9e3e7",
        "aux-text-color": "#e9e3e7a0",
      },
      screens: { xmd: "880px" },
      animation: {
        "loading-grow": "loadingGrow 2s cubic-bezier(1,.11,0,.89) forwards",
        appear: "appear 200ms ease-out forwards",
      },
      keyframes: () => ({
        appear: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        loadingGrow: {
          from: {
            left: "0",
            width: "0",
          },
          to: {
            left: "0",
            width: "100%",
          },
        },
      }),
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
