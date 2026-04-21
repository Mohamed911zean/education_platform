"use client";

import { Switch } from "@headlessui/react";
import { useState } from "react";

interface ToggleRowProps {
  label: string;
  sub?: string;
  defaultOn?: boolean;
  id: string;
}

export function ToggleRow({ label, sub, defaultOn = false, id }: ToggleRowProps) {
  const [enabled, setEnabled] = useState(defaultOn);

  return (
    <div
      className="flex items-center justify-between py-3 border-b last:border-b-0"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="flex-1 min-w-0 pr-4">
        <div
          className="text-sm font-bold"
          style={{ fontFamily: "var(--font-cairo)", color: "var(--text-primary)" }}
        >
          {label}
        </div>
        {sub && (
          <div
            className="text-xs mt-0.5"
            style={{ fontFamily: "var(--font-cairo)", color: "var(--text-muted)" }}
          >
            {sub}
          </div>
        )}
      </div>

      <Switch
        id={id}
        checked={enabled}
        onChange={setEnabled}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full
          border-2 transition-colors duration-200 ease-in-out focus:outline-none
          focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2
          ${enabled
            ? "bg-[var(--accent-teal)] border-[var(--accent-teal)]"
            : "bg-[var(--bg-elevated)] border-[var(--border-default)]"
          }
        `}
      >
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow
            ring-0 transition-transform duration-200 ease-in-out mt-0.5
            ${enabled ? "translate-x-[-20px]" : "translate-x-[-2px]"}
          `}
        />
      </Switch>
    </div>
  );
}
