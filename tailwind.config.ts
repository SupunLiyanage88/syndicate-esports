import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#121212",
        "surface-high": "#1A1A1A",
        "surface-elevated:": "#222222",
        border: "#2A2A2A",
        "border-active": "#E63946",
        primary: "#E63946",
        "primary-light": "#FF6B6B",
        "primary-dark": "#C62828",
        gold: "#FFD700",
        "gold-light": "#FFE44D",
        silver: "#C0C0C0",
        white: "#FFFFFF",
        muted: "#666666",
        danger: "#EF4444",
        success: "#10B981",
        warning: "#F59E0B",
      },
      fontFamily: {
        rajdhani: ["Rajdhani", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        ethnocentric: ["Ethnocentric", "sans-serif"],
        russo: ["Russo One", "sans-serif"],
        chakra: ["Chakra Petch", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        cards: "8px",
        buttons: "4px",
        inputs: "4px",
      },
      boxShadow: {
        "red-glow": "0 0 20px rgba(230, 57, 70, 0.4)",
        "red-glow-lg": "0 0 40px rgba(230, 57, 70, 0.5)",
        "gold-glow": "0 0 20px rgba(255, 215, 0, 0.3)",
        "gold-glow-lg": "0 0 40px rgba(255, 215, 0, 0.4)",
        "neon-red": "0 0 5px #E63946, 0 0 10px #E63946, 0 0 20px #E63946",
        "neon-gold": "0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 20px #FFD700",
      },
      animation: {
        "glitch": "glitch 0.3s ease-in-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
        "flicker": "flicker 0.15s ease-in-out",
        "slide-in": "slide-in 0.5s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
      },
      keyframes: {
        "glitch": {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "scanline": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "flicker": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "slide-in": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
