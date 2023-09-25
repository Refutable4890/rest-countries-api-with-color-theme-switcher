import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "Dark-Blue-(Dark-Mode-Elements)": "hsl(209, 23%, 22%)",
        "Very-Dark-Blue-(Dark-Mode-Background)": "hsl(207, 26%, 17%)",
        "Very-Dark-Blue-(Light-Mode-Text)": "hsl(200, 15%, 8%)",
        "Dark-Gray-(Light-Mode-Input)": "hsl(0, 0%, 52%)",
        "very-light-gray": "hsl(0, 0%, 98%)", // Light Mode Background
        "white": "hsl(0, 0%, 100%)" // Dark Mode Text & Light Mode Elements
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
