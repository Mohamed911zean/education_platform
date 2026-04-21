import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  goldBorder?: boolean;
  accentHeader?: boolean;
  action?: ReactNode;
  id?: string;
}

export function SectionCard({
  title,
  icon,
  children,
  goldBorder = false,
  accentHeader = false,
  action,
  id,
}: SectionCardProps) {
  return (
    <div
      id={id}
      className="rounded-2xl border bg-[var(--bg-surface)] overflow-hidden"
      style={{
        borderColor: goldBorder
          ? "rgba(245,200,66,0.2)"
          : accentHeader
          ? "rgba(255,51,102,0.15)"
          : "var(--border-default)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div className="flex items-center gap-2.5">
          {icon && (
            <span
              className="text-base"
              style={{ color: accentHeader ? "var(--accent)" : goldBorder ? "var(--accent-gold)" : "var(--text-muted)" }}
            >
              {icon}
            </span>
          )}
          <h2
            className="text-base font-bold"
            style={{
              fontFamily: "var(--font-cairo)",
              color: accentHeader ? "var(--accent)" : "var(--text-primary)",
            }}
          >
            {title}
          </h2>
        </div>
        {action && <div>{action}</div>}
      </div>

      {/* Body */}
      <div className="p-5">{children}</div>
    </div>
  );
}
