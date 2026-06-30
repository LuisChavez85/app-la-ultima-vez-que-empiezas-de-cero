import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta maestra
        obsidian: '#0F0F12',
        graphite: '#1A1A20',
        smoke: '#2A2A32',
        ivory: '#F7F5F0',
        mist: '#E8E5DE',
        gold: {
          DEFAULT: '#C8A44E',
          light: '#E8D5A0',
          dim: '#8B7335',
        },
        // Módulos
        emerald: '#00D4AA',
        purple: '#8B5CF6',
        amber: '#F59E0B',
        rose: '#EC4899',
        cyan: '#06B6D4',
        danger: '#EF4444',
        // Bonos
        'emerald-dark': '#10B981',
      },
      fontFamily: {
        display: ['Instrument Serif', 'Georgia', 'serif'],
        body: ['Instrument Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '14px',
        '3xl': '16px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'breathe-in': 'breatheIn 4s ease-in-out',
        'breathe-hold': 'breatheHold 4s ease-in-out',
        'breathe-out': 'breatheOut 6s ease-in-out',
        'burn': 'burn 3s ease-out forwards',
        'confetti': 'confetti 0.5s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        breatheIn: {
          '0%': { transform: 'scale(0.6)', opacity: '0.3' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        breatheHold: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
        },
        breatheOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.6)', opacity: '0.3' },
        },
        burn: {
          '0%': { opacity: '1', filter: 'blur(0px)' },
          '50%': { opacity: '0.5', filter: 'blur(2px)', color: '#F59E0B' },
          '100%': { opacity: '0', filter: 'blur(8px)', color: '#EF4444' },
        },
        confetti: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

export default config;
