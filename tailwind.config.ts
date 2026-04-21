/**
 * tailwind.config.ts
 *
 * NOTE: This project uses Tailwind CSS v4 which moves theme configuration
 * entirely into CSS via the `@theme {}` block in globals.css.
 * This file is kept as a reference / IDE helper only — Tailwind v4 does NOT
 * read this file at build time.
 *
 * Effective configuration lives in:  app/globals.css  ──> @theme { … }
 *
 * Key settings applied there:
 *   darkMode    : class  (--default-dark-mode: class)
 *   fontFamily  : cairo, syne
 *   animation   : fadeUp (0.4s ease both)
 *   keyframes   : fadeUp (opacity 0 + translateY(12px) → 1 + 0)
 */

import type { Config } from "tailwindcss";

const config: Config = {
  // Tailwind v4 ignores this file; settings are in globals.css @theme {}
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        syne:  ["Syne",  "sans-serif"],
      },
      animation: {
        fadeUp: "fadeUp 0.4s ease both",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
