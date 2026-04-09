/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Linear Design System - Dark Mode Native
                background: {
                    marketing: '#08090a',
                    panel: '#0f1011',
                    surface: '#191a1b',
                    secondary: '#28282c',
                },
                text: {
                    primary: '#f7f8f8',
                    secondary: '#d0d6e0',
                    tertiary: '#8a8f98',
                    quaternary: '#62666d',
                },
                brand: {
                    indigo: '#5e6ad2',
                    accent: '#7170ff',
                    hover: '#828fff',
                    security: '#7a7fad',
                },
                border: {
                    primary: '#23252a',
                    secondary: '#34343a',
                    tertiary: '#3e3e44',
                    subtle: 'rgba(255,255,255,0.05)',
                    standard: 'rgba(255,255,255,0.08)',
                },
                line: {
                    tint: '#141516',
                    tertiary: '#18191a',
                },
                status: {
                    green: '#27a644',
                    emerald: '#10b981',
                },
                overlay: 'rgba(0,0,0,0.85)',
                
                // Legacy primary for backward compatibility
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
            },
            fontFamily: {
                // Linear uses Inter Variable with cv01, ss03
                jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
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
                mono: [
                    'Berkeley Mono',
                    'ui-monospace',
                    'SF Mono',
                    'Menlo',
                    'monospace',
                ],
            },
            fontSize: {
                // Linear Typography Scale
                'display-xl': ['4.5rem', { lineHeight: '1.00', letterSpacing: '-1.584px' }],   // 72px
                'display-lg': ['4rem', { lineHeight: '1.00', letterSpacing: '-1.408px' }],     // 64px
                'display': ['3rem', { lineHeight: '1.00', letterSpacing: '-1.056px' }],        // 48px
                'h1': ['2rem', { lineHeight: '1.13', letterSpacing: '-0.704px' }],             // 32px
                'h2': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.288px' }],           // 24px
                'h3': ['1.25rem', { lineHeight: '1.33', letterSpacing: '-0.24px' }],           // 20px
                'body-lg': ['1.125rem', { lineHeight: '1.60', letterSpacing: '-0.165px' }],    // 18px
                'body-emphasis': ['1.0625rem', { lineHeight: '1.60' }],                        // 17px
                'body': ['1rem', { lineHeight: '1.50' }],                                       // 16px
                'body-md': ['1rem', { lineHeight: '1.50' }],                                    // 16px medium
                'body-sm': ['0.9375rem', { lineHeight: '1.60', letterSpacing: '-0.165px' }],   // 15px
                'caption-lg': ['0.875rem', { lineHeight: '1.50', letterSpacing: '-0.182px' }], // 14px
                'caption': ['0.8125rem', { lineHeight: '1.50', letterSpacing: '-0.13px' }],    // 13px
                'label': ['0.75rem', { lineHeight: '1.40' }],                                   // 12px
                'micro': ['0.6875rem', { lineHeight: '1.40' }],                                 // 11px
                'tiny': ['0.625rem', { lineHeight: '1.50', letterSpacing: '-0.15px' }],        // 10px
            },
            fontWeight: {
                // Linear weights: 300, 400, 510, 590
                light: '300',
                normal: '400',
                medium: '510',  // Linear's signature weight
                semibold: '590',
                bold: '700',
            },
            borderRadius: {
                // Linear border radius scale
                'micro': '2px',
                'standard': '4px',
                'comfortable': '6px',
                'card': '8px',
                'panel': '12px',
                'large': '22px',
                'pill': '9999px',
                'full': '50%',
            },
            boxShadow: {
                // Linear shadow system
                'level-1': 'rgba(0,0,0,0.03) 0px 1.2px 0px',
                'level-2': 'rgba(255,255,255,0.05) 0px 0px 0px 1px',
                'inset': 'rgba(0,0,0,0.2) 0px 0px 12px 0px inset',
                'ring': 'rgba(0,0,0,0.2) 0px 0px 0px 1px',
                'elevated': 'rgba(0,0,0,0.4) 0px 2px 4px',
                'dialog': 'rgba(0,0,0,0) 0px 8px 2px, rgba(0,0,0,0.01) 0px 5px 2px, rgba(0,0,0,0.04) 0px 3px 2px, rgba(0,0,0,0.07) 0px 1px 1px, rgba(0,0,0,0.08) 0px 0px 1px',
                'focus': 'rgba(0,0,0,0.1) 0px 4px 12px',
            },
            spacing: {
                // Linear spacing system (8px base)
                '1': '4px',
                '2': '8px',
                '3': '12px',
                '4': '16px',
                '5': '20px',
                '6': '24px',
                '7': '28px',
                '8': '32px',
                '9': '35px',
                '10': '40px',
                '12': '48px',
                '16': '64px',
                '20': '80px',
                '24': '96px',
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
        },
    },
    plugins: [],
}