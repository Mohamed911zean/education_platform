"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        suppressHydrationWarning
        className="flex gap-1 p-1 rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)]"
        style={{ width: 72 }}
      />
    );
  }

  return (
    <div
      suppressHydrationWarning
      className="flex gap-1 p-1 rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)]"
    >
      <button
        id="theme-sun-btn"
        aria-label="وضع النهار"
        onClick={() => setTheme("light")}
        className={`rounded-full p-1.5 transition-colors duration-150 ${
          theme === "light"
            ? "bg-[var(--accent)] text-white"
            : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
        }`}
      >
        <Sun size={14} />
      </button>
      <button
        id="theme-moon-btn"
        aria-label="وضع الليل"
        onClick={() => setTheme("dark")}
        className={`rounded-full p-1.5 transition-colors duration-150 ${
          theme === "dark"
            ? "bg-[var(--accent)] text-white"
            : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
        }`}
      >
        <Moon size={14} />
      </button>
    </div>
  );
}
