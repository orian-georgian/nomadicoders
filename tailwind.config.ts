import type {Config} from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        surface: "#111827",
        border: "rgba(148, 163, 184, 0.18)",
        text: "#E5EEF8",
        muted: "#94A3B8",
        brand: {
          blue: "#38BDF8",
          purple: "#8a00e5"
        }
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #38BDF8 0%, #8a00e5 100%)"
      },
      maxWidth: {
        container: "87.5rem"
      },
      fontSize: {
        xs: ["0.75rem", {lineHeight: "0.95rem"}],
        sm: ["0.875rem", {lineHeight: "1.15rem"}],
        base: ["1rem", {lineHeight: "1.4rem"}],
        lg: ["1.125rem", {lineHeight: "1.6rem"}],
        xl: ["1.25rem", {lineHeight: "1.65rem"}],
        "2xl": ["1.5rem", {lineHeight: "1.85rem"}],
        "3xl": ["1.875rem", {lineHeight: "2.1rem"}],
        "4xl": ["2.25rem", {lineHeight: "2.35rem"}],
        "5xl": ["3rem", {lineHeight: "3.05rem"}],
        "6xl": ["3.75rem", {lineHeight: "3.7rem"}]
      },
      lineHeight: {
        5: "1.15rem",
        6: "1.35rem",
        7: "1.6rem",
        8: "1.8rem",
        normal: "1.4",
        relaxed: "1.55"
      }
    }
  },
  plugins: []
};

export default config;
