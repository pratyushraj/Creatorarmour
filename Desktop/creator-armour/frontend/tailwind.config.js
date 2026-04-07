/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Premium Indigo/Violet palette (inspired by Linear/Stripe)
                primary: {
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#7c3aed',
                    700: '#6d28d9',
                    800: '#5b21b6',
                    900: '#4c1d95',
                    950: '#2e1065',
                },
                // Premium neutral grays with blue undertone (Slate-inspired)
                gray: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                    950: '#030712',
                },
                // Premium slate palette for text (like Vercel/Linear)
                slate: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                },
            },
            fontFamily: {
                // Inter as primary - premium SaaS standard
                sans: [
                    'Inter',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'Arial',
                    'sans-serif',
                ],
                display: ['Inter', 'sans-serif'],
            },
            fontSize: {
                // Premium type scale - refined for high-end SaaS
                // Generous line heights, subtle letter spacing
                'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],       // 12px
                'sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],      // 14px
                'base': ['1rem', { lineHeight: '1.7', letterSpacing: '0.005em' }],        // 16px
                'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0em' }],          // 18px
                'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.005em' }],      // 20px
                '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],       // 24px
                '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.015em' }],    // 30px
                '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],      // 36px
                '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],        // 48px
            },
            fontWeight: {
                // Refined weight scale - subtle differences
                light: '300',
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'soft-lg': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.04)',
                'soft-xl': '0 8px 30px rgba(0, 0, 0, 0.04)',
                'glow': '0 0 20px rgba(124, 58, 237, 0.15)',
                'glow-lg': '0 0 40px rgba(124, 58, 237, 0.2)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
            // Letter spacing - refined for premium feel
            letterSpacing: {
                'tighter': '-0.05em',
                'tight': '-0.025em',
                'snug': '-0.01em',
                'normal': '0em',
                'wide': '0.015em',
                'wider': '0.03em',
                'widest': '0.05em',
            },
            // Line height - optimized for readability
            lineHeight: {
                'none': '1',
                'tight': '1.2',
                'snug': '1.3',
                'normal': '1.5',
                'relaxed': '1.6',
                'loose': '1.75',
            },
        },
    },
    plugins: [],
}
