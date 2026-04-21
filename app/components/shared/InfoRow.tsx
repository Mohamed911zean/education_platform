import { ReactNode } from "react";

interface InfoRowProps {
  label: string;
  value: ReactNode;
  badge?: ReactNode;
}

export function InfoRow({ label, value, badge }: InfoRowProps) {
  return (
    <div
      className="flex items-center justify-between py-3 border-b last:border-b-0"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <span
        className="text-sm"
        style={{ fontFamily: "var(--font-cairo)", color: "var(--text-muted)" }}
      >
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span
          className="text-sm font-bold"
          style={{ fontFamily: "var(--font-cairo)", color: "var(--text-primary)" }}
        >
          {value}
        </span>
        {badge}
      </div>
    </div>
  );
}
