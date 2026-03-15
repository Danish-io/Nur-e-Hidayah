import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/ui/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    900: '#0c4a6e',
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                quran: {
                    gold: '#d4af37',
                    dark: '#1a1a1a',
                    paper: '#fdfbf7'
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                arabic: ['var(--font-amiri)', 'serif'],
                mushaf: ['var(--font-naskh)', 'var(--font-amiri)', 'serif'],
            },
            animation: {
                'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'float-medium': 'float 5s ease-in-out infinite',
                'float-fast': 'float 3s ease-in-out infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
                'scale-in': 'scaleIn 0.5s ease-out forwards',
                'spin-slow': 'spin 12s linear infinite',
                'shimmer': 'shimmer 2.5s linear infinite',
                'breathe': 'breathe 8s ease-in-out infinite',
                'particle-slow': 'particle-rise 10s ease-in-out infinite',
                'twinkle-slow': 'twinkle 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                breathe: {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.02)' },
                },
                'particle-rise': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '50%': { opacity: '0.5' },
                    '100%': { opacity: '0', transform: 'translateY(-40px)' },
                },
                twinkle: {
                    '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.5)' },
                }
            }
        },
    },
    plugins: [],
};
export default config;

