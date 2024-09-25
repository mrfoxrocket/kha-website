import defaultTheme from "tailwindcss/defaultTheme";
import typographyPlugin from "@tailwindcss/typography";

module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            animation: {
                wiggle: "wiggle 2s ease-in-out infinite",
                slowspin: "spin 5s linear infinite",
            },
            keyframes: {
                wiggle: {
                    "0%, 100%": { transform: "rotate(-2deg)" },
                    "50%": { transform: "rotate(2deg)" },
                },
            },
            colors: {
                primary: "hsl(var(--primary))",
                secondary: "hsl(var(--secondary))",
                accent: "hsl(var(--accent))",
                default: "hsl(var(--aw-color-text-default))",
                background: "hsl(var(--background))",
                accentbackground: "hsl(var(--accent-background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },

                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },

                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    1: "hsl(var(--chart-1))",
                    2: "hsl(var(--chart-2))",
                    3: "hsl(var(--chart-3))",
                    4: "hsl(var(--chart-4))",
                    5: "hsl(var(--chart-5))",
                },
            },
            fontFamily: {
                sans: ["var(--aw-font-sans, ui-sans-serif)", ...defaultTheme.fontFamily.sans],
                serif: ["var(--aw-font-serif, ui-serif)", ...defaultTheme.fontFamily.serif],
                heading: ["var(--aw-font-heading, ui-sans-serif)", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [typographyPlugin],
    darkMode: "class",
};
