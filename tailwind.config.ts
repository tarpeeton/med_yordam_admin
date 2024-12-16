import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '320px',
      'md': '360px',
      'bn': '400px',
      'mdx': '460px',
      'mdl': '550px',
      'slg': '750px',
      'lg': '900px',
      'xl': '1000px',
      '2xl': '1100px',
      '3xl': '1440px',
      '4xl': '1600px',
      '6xl': '1920px',
      '5xl': '2000px',
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue100: '#222E51',
        titleDark: '#121212',
        title80: '#414141',
        titleWhite: '#FFFFFF',
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        jost: ['Jost', 'sans-serif'], // Adding Jost to the font family
      },
    },
  },
  plugins: [],
};

export default config;