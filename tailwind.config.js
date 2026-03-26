import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    path.join(__dirname, "index.html"),
    path.join(__dirname, "src/**/*.{js,jsx}"),
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1120",
          deep: "#0D1B2A",
          ink: "#070B14",
          feat: "#0B1423",
          card: "#101E30",
        },
        gold: {
          DEFAULT: "#DC3545",
          light: "#EF4444",
          muted: "#B91C1C",
          warm: "#C9A84C",
        },
        juri: {
          teal: "#6B7280",
          canvas: "#F3F4F6",
          paper: "#F8FAFC",
          ink: "#111827",
          muted: "#6B7280",
          subtle: "#9CA3AF",
          line: "#E5E7EB",
          featMuted: "#7A8FA8",
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "Georgia", "serif"],
        dmSans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      keyframes: {
        "mesh-shift": {
          "0%, 100%": {
            backgroundPosition: "0% 50%, 100% 50%, 50% 100%",
          },
          "50%": {
            backgroundPosition: "100% 50%, 0% 50%, 50% 0%",
          },
        },
        "orb-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-grain": {
          "0%, 100%": { opacity: "0.035" },
          "50%": { opacity: "0.055" },
        },
      },
      animation: {
        "mesh-shift": "mesh-shift 18s ease-in-out infinite",
        "orb-pulse": "orb-pulse 8s ease-in-out infinite",
        "float-y": "float-y 4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "fade-grain": "fade-grain 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
