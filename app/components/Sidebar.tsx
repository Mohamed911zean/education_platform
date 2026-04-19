"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, BookOpen, BarChart2, Trophy, MessageSquare,
  Calendar, Settings, LogOut, BookMarked,
} from "lucide-react";

const NAV = [
  { href: "/dashboard", icon: Home, label: "الرئيسية" },
  { href: "/courses", icon: BookOpen, label: "كورساتي", badge: 3 },
  { href: "/progress", icon: BarChart2, label: "تقدمي" },
  { href: "/achievements", icon: Trophy, label: "الإنجازات", badge: 2 },
  { href: "/forum", icon: MessageSquare, label: "المنتدى", badge: 5 },
  { href: "/schedule", icon: Calendar, label: "الجدول" },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sidebar" style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: 230, background: "var(--bg-surface)",
        borderLeft: "1px solid var(--border-default)",
        zIndex: 30, display: "flex", flexDirection: "column",
        overflowY: "auto", overflowX: "hidden",
      }}>
        {/* Logo */}
        <div style={{
          height: 60, display: "flex", alignItems: "center",
          padding: "0 16px", gap: 10,
          borderBottom: "1px solid var(--border-subtle)",
          flexShrink: 0,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: "var(--accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <BookMarked size={16} color="white" />
          </div>
          <span className="sidebar-logo-text" style={{ fontFamily: "Cairo, sans-serif", fontSize: 15, fontWeight: 800, color: "var(--text-primary)" }}>
            منصة المستر
          </span>
        </div>

        {/* Student mini-card */}
        <div className="student-card-details" style={{
          padding: "16px 14px", borderBottom: "1px solid var(--border-subtle)",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="avatar-placeholder avatar-ring-red" style={{
              width: 40, height: 40,
              background: "rgba(232,48,74,0.1)", color: "var(--accent)",
              fontFamily: "Cairo, sans-serif", fontSize: 14, fontWeight: 800,
              flexShrink: 0,
            }}>أح</div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap" }}>أحمد محمد</div>
              <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 11, color: "var(--text-muted)" }}>الصف الثالث</div>
            </div>
          </div>
          {/* XP Progress */}
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 10, color: "var(--text-muted)" }}>تقدم الأسبوع</span>
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 10, color: "var(--accent-teal)", fontWeight: 700 }}>75%</span>
            </div>
            <div className="progress-track" style={{ height: 4 }}>
              <div className="progress-fill" style={{ width: "75%", boxShadow: "none" }} />
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 10px" }}>
          {NAV.map(item => {
            const active = path === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                id={`sidebar-nav-${item.label}`}
                className="nav-item"
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: "var(--radius-md)",
                  marginBottom: 2, textDecoration: "none",
                  background: active ? "rgba(232,48,74,0.1)" : "transparent",
                  color: active ? "var(--accent)" : "var(--text-secondary)",
                  transition: "background 150ms, color 150ms",
                  position: "relative",
                }}
                onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; } }}
                onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; } }}
              >
                <item.icon size={18} strokeWidth={active ? 2.5 : 1.8} />
                <span className="sidebar-label" style={{ fontFamily: "Cairo, sans-serif", fontSize: 14, fontWeight: active ? 700 : 500 }}>
                  {item.label}
                </span>
                {item.badge && (
                  <span style={{
                    marginRight: "auto", minWidth: 18, height: 18,
                    background: "var(--accent)", color: "white",
                    borderRadius: "var(--radius-full)",
                    fontFamily: "Cairo, sans-serif", fontSize: 10, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "0 5px",
                  }}>{item.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: "10px 10px", borderTop: "1px solid var(--border-subtle)", flexShrink: 0 }}>
          <Link href="/account" id="sidebar-settings" style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", borderRadius: "var(--radius-md)",
            textDecoration: "none", color: "var(--text-muted)",
            marginBottom: 2, transition: "background 150ms, color 150ms",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
          >
            <Settings size={17} strokeWidth={1.8} />
            <span className="sidebar-label" style={{ fontFamily: "Cairo, sans-serif", fontSize: 14 }}>الإعدادات</span>
          </Link>
          <button id="sidebar-logout" style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", borderRadius: "var(--radius-md)",
            background: "none", border: "none", cursor: "pointer",
            color: "var(--accent)", width: "100%",
            transition: "background 150ms",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(232,48,74,0.08)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <LogOut size={17} strokeWidth={1.8} />
            <span className="sidebar-label" style={{ fontFamily: "Cairo, sans-serif", fontSize: 14, fontWeight: 700 }}>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="bottom-nav">
        {NAV.slice(0, 5).map(item => {
          const active = path === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`bottom-nav-item${active ? " active" : ""}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
