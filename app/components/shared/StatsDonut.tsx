"use client";

import { PieChart, Pie, Cell } from "recharts";

interface StatsDonutProps {
  label: string;
  sub?: string;
  watched: number;
  total: number;
  color?: string;
}

export function StatsDonut({
  label,
  sub,
  watched,
  total,
  color = "#e8304a",
}: StatsDonutProps) {
  const pct = total > 0 ? Math.round((watched / total) * 100) : 0;
  const data = [
    { value: watched },
    { value: Math.max(0, total - watched) },
  ];

  return (
    <div className="flex flex-col items-center text-center gap-2">
      <div className="relative">
        <PieChart width={120} height={120}>
          <Pie
            data={data}
            cx={55}
            cy={55}
            innerRadius={38}
            outerRadius={52}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            strokeWidth={0}
            label={false}
          >
            <Cell fill={color} />
            <Cell fill="var(--bg-elevated)" />
          </Pie>
        </PieChart>
        {/* Percentage label in center */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ fontFamily: "var(--font-syne)", fontSize: 18, fontWeight: 800, color: "var(--text-primary)" }}
        >
          {pct}%
        </div>
      </div>

      <div>
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
        <div
          className="text-xs mt-1"
          style={{ fontFamily: "var(--font-cairo)", color: "var(--text-muted)" }}
        >
          {watched} / {total}
        </div>
      </div>
    </div>
  );
}
