/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{html,js}",
    "./lib/**/*.{html,js}",
    "./ui-components/**/*.{html,js}",
    "./**/*.html"
  ],
  prefix: 'tw-', // Prefix to avoid conflicts with existing CSS
  theme: {
    extend: {
      colors: {
        // Map your existing brand colors
        primary: {
          DEFAULT: '#FF6B35',
          50: '#FFF4F1',
          100: '#FFE8E0',
          500: '#FF6B35',
          600: '#E55A2E',
          700: '#CC4A26',
        },
        secondary: {
          DEFAULT: '#FF8E53',
          100: '#FFF1EC',
          500: '#FF8E53',
        },
        // UI Kit specific colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
} 