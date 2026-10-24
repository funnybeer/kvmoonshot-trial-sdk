import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          400: '#22d3ee',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#7c3aed',
        },
        surface: {
          DEFAULT: '#050814',
          card: '#0c1222',
          elevated: '#141c30',
          border: '#1e2a45',
        },
      },
      boxShadow: {
        swap: '0 8px 40px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255,255,255,0.04)',
        glow: '0 0 80px rgba(59, 130, 246, 0.15)',
        cockpit: '0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,0,0.35)',
        'cockpit-hover': '0 1px 0 rgba(255,255,255,0.06) inset, 0 12px 40px rgba(0,0,0,0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
