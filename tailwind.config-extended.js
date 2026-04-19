/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "font-main",
    "font-font1",
    "font-font2",
    "font-font3",
    "font-font4",
    "font-font5",
    "letter-font-1",
    "letter-font-2",
    "letter-font-3",
    "letter-font-4",
    "letter-font-5",
    "letter-font-main",
  ],
  theme: {
    extend: {
      /* ─── COLORS ──────────────────────────────────────────────────────────── */
      colors: {
        /* BACKGROUNDS */
        bg: {
          primary: "#0a0a0a",
          secondary: "#0f0f0f",
          tertiary: "#121212",
          elevated: "#1a1a1a",
          subtle: "#141414",
        },
        /* TEXT */
        text: {
          primary: "#ffffff",
          secondary: "#a1a1aa",
          tertiary: "#71717a",
          muted: "#52525b",
          faded: "#3f3f46",
        },
        /* BORDERS */
        border: {
          primary: "rgba(255, 255, 255, 0.18)",
          secondary: "rgba(255, 255, 255, 0.12)",
          tertiary: "rgba(255, 255, 255, 0.08)",
          major: "rgba(255, 255, 255, 0.50)",
          mid: "rgba(255, 255, 255, 0.28)",
          minor: "rgba(255, 255, 255, 0.16)",
        },
        /* SEMANTIC */
        accent: "#a1a1aa",
        error: "#ef4444",
        success: "#10b981",
        warning: "#f59e0b",
        info: "#06b6d4",
      },

      /* ─── TYPOGRAPHY ─────────────────────────────────────────────────────── */
      fontSize: {
        "display-xl": ["clamp(3.6rem, 10vw, 5.5rem)", { lineHeight: "1.2" }],
        "display-lg": ["clamp(2.4rem, 8vw, 4rem)", { lineHeight: "1.2" }],
        "display-md": ["clamp(1.8rem, 6vw, 3rem)", { lineHeight: "1.375" }],
        "h1": ["clamp(1.8rem, 6vw, 3rem)", { lineHeight: "1.375" }],
        "h2": ["clamp(1.6rem, 5.5vw, 2.8rem)", { lineHeight: "1.375" }],
        "h3": ["1.6rem", { lineHeight: "1.375" }],
        "h4": ["1.3rem", { lineHeight: "1.5" }],
        "h5": ["1.1rem", { lineHeight: "1.5" }],
        "body-lg": ["16px", { lineHeight: "1.5" }],
        "body-md": ["14px", { lineHeight: "1.5" }],
        "body-sm": ["13px", { lineHeight: "1.5" }],
        "body-xs": ["12px", { lineHeight: "1.5" }],
        "mono-lg": ["14px", { lineHeight: "1.6" }],
        "mono": ["12px", { lineHeight: "1.6" }],
        "mono-sm": ["11px", { lineHeight: "1.6" }],
      },

      lineHeight: {
        tight: "1.2",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.75",
      },

      letterSpacing: {
        tight: "-0.02em",
        uppercase: "0.22em",
        mono: "0.1em",
      },

      fontWeight: {
        normal: "400",
        semibold: "600",
        bold: "700",
      },

      /* ─── FONTS ──────────────────────────────────────────────────────────── */
      fontFamily: {
        main: ["MainFont", "sans-serif"],
        font1: ["Font1", "sans-serif"],
        font2: ["Font2", "sans-serif"],
        font3: ["Font3", "sans-serif"],
        font4: ["Font4", "sans-serif"],
        font5: ["Font5", "sans-serif"],
        mono: ["Courier New", "monospace"],
      },

      /* ─── SHADOWS ─────────────────────────────────────────────────────────── */
      boxShadow: {
        none: "none",
        sm: "0 4px 12px rgba(0, 0, 0, 0.4)",
        md: "0 8px 24px rgba(0, 0, 0, 0.6)",
        lg: "0 12px 32px rgba(0, 0, 0, 0.8)",
        xl: "0 16px 48px rgba(0, 0, 0, 0.9)",
        focus: "2px solid #ffffff",
        "glow-subtle": "0 0 8px rgba(255, 255, 255, 0.08)",
        "glow-accent": "0 0 12px rgba(161, 161, 170, 0.15)",
        "glow-active": "0 0 16px rgba(255, 255, 255, 0.20)",
      },

      /* ─── TRANSITIONS & ANIMATION ─────────────────────────────────────── */
      transitionDuration: {
        instant: "0ms",
        fast: "150ms",
        base: "300ms",
        medium: "450ms",
        slow: "600ms",
        slower: "900ms",
        cinematic: "1400ms",
      },

      transitionTimingFunction: {
        default: "cubic-bezier(0.22, 1, 0.36, 1)",
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        in: "cubic-bezier(0.13, 0, 0.87, 1)",
        out: "cubic-bezier(0.87, 0, 0.13, 1)",
        inout: "cubic-bezier(0.42, 0, 0.58, 1)",
        snappy: "cubic-bezier(0.65, 0, 0.35, 1)",
        dramatic: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },

      /* ─── SPACING (8px grid) ─────────────────────────────────────────── */
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        20: "80px",
        24: "96px",
      },

      gap: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
      },

      /* ─── BORDER RADIUS (Sharp corners for precision) ──────────────── */
      borderRadius: {
        none: "0px",
        sm: "2px",
        md: "4px",
        lg: "8px",
      },

      /* ─── Z-INDEX ─────────────────────────────────────────────────────── */
      zIndex: {
        base: "0",
        dropdown: "10",
        sticky: "20",
        fixed: "30",
        "modal-backdrop": "40",
        modal: "50",
        popover: "60",
        tooltip: "70",
        notification: "80",
        overlay: "9999",
      },

      /* ─── BACKDROP FILTER ──────────────────────────────────────────── */
      backdropBlur: {
        xs: "4px",
        sm: "8px",
        md: "12px",
      },

      /* ─── OPACITY ──────────────────────────────────────────────────────── */
      opacity: {
        0: "0",
        5: "0.05",
        10: "0.1",
        20: "0.2",
        30: "0.3",
        40: "0.4",
        50: "0.5",
        60: "0.6",
        70: "0.7",
        80: "0.8",
        90: "0.9",
        100: "1",
      },

      /* ─── ANIMATION (custom entrance/reveal) ────────────────────────── */
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(26px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "rotate": {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
      },

      animation: {
        "slide-up": "slide-up 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        "fade-in": "fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        "scale-in": "scale-in 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        "blink": "blink 0.53s infinite",
        "rotate": "rotate 8s linear infinite",
      },
    },
  },

  plugins: [],
};
