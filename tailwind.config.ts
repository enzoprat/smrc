import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0b",
          900: "#0a0a0b",
          800: "#141416",
          700: "#1d1d20",
          600: "#27272b",
          500: "#3a3a40",
        },
        gold: {
          DEFAULT: "#f5c518",
          50: "#fefbe8",
          100: "#fdf3c4",
          200: "#fce58a",
          300: "#fad34d",
          400: "#f5c518",
          500: "#e5b00a",
          600: "#c68a05",
          700: "#9e6308",
          800: "#834f0e",
          900: "#704112",
        },
        bone: {
          DEFAULT: "#f7f5f0",
          100: "#faf9f5",
          200: "#f1eee6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Oswald", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        card: "0 10px 40px -12px rgba(0,0,0,0.45)",
        gold: "0 10px 30px -8px rgba(245,197,24,0.45)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scroll-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "scroll-x": "scroll-x 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
