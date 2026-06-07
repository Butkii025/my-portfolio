import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      wave: {
    '0%, 100%': { transform: 'rotate(0deg)' },
    '25%': { transform: 'rotate(20deg)' },
    '75%': { transform: 'rotate(-10deg)' },
  },
  animation: {
  wave: 'wave 0.8s ease-in-out infinite',
}
    },
  },
  plugins: [],
};
export default config;
