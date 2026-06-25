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
        background: "#0A0A0F",
        surface: "#12121A",
        "surface-high": "#1A1A28",
        border: "#2A2A3E",
        "border-glow": "#C9A227",
        gold: "#C9A227",
        "gold-light": "#F5D76E",
        silver: "#9EA3B0",
        white: "#F0F0F5",
        muted: "#6B7280",
        danger: "#EF4444",
        success: "#10B981",
      },
      fontFamily: {
        rajdhani: ["Rajdhani", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        cards: "12px",
        buttons: "8px",
        inputs: "6px",
      },
      boxShadow: {
        "gold-glow": "0 0 20px rgba(201, 162, 39, 0.3)",
        "gold-glow-lg": "0 0 40px rgba(201, 162, 39, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
