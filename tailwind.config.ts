import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a', // Deep Corporate Blue
        secondary: '#f59e0b', // Vibrant Amber/Yellow
        accent: '#10b981', // Success Green
        dark: '#111827', // Gray 900
        light: '#f3f4f6', // Gray 100
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
