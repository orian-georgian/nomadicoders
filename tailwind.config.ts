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
          purple: "#8B5CF6"
        }
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #38BDF8 0%, #8B5CF6 100%)"
      },
      maxWidth: {
        container: "72rem"
      }
    }
  },
  plugins: []
};

export default config;
