"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Bell, ChevronDown, Settings, LogOut, User } from "lucide-react";

interface Props {
  breadcrumb?: { label: string; href?: string }[];
}

export default function DashboardNavbar({ breadcrumb }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header style={{
      height: 60, position: "sticky", top: 0, zIndex: 20,
      background: "var(--bg-surface)",
      borderBottom: "1px solid var(--border-default)",
      display: "flex", alignItems: "center",
      padding: "0 24px", gap: 16,
    }}>
      {/* Breadcrumb */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
        {breadcrumb?.map((b, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {i > 0 && <span style={{ color: "var(--text-muted)", fontSize: 12 }}>/</span>}
            {b.href ? (
              <Link href={b.href} style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>{b.label}</Link>
            ) : (
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{b.label}</span>
            )}
          </span>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <Search size={14} color="var(--text-muted)" style={{ position: "absolute", right: 12 }} />
        <input
          type="text"
          id="dashboard-search"
          placeholder="بحث في الدروس..."
          style={{
            background: "var(--bg-elevated)", border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-md)", padding: "7px 36px 7px 14px",
            fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-primary)",
            outline: "none", width: 200,
          }}
          onFocus={e => { (e.target as HTMLElement).style.borderColor = "var(--accent)"; }}
          onBlur={e => { (e.target as HTMLElement).style.borderColor = "var(--border-default)"; }}
        />
      </div>

      {/* Notifications */}
      <button id="notifications-btn" style={{
        position: "relative", padding: 8, background: "transparent",
        border: "none", cursor: "pointer", color: "var(--text-muted)",
        borderRadius: "var(--radius-md)", transition: "background 150ms",
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
      >
        <Bell size={18} />
        <span style={{
          position: "absolute", top: 6, left: 6,
          width: 8, height: 8, borderRadius: "50%",
          background: "var(--accent)", border: "2px solid var(--bg-surface)",
        }} />
      </button>

      {/* Avatar dropdown */}
      <div style={{ position: "relative" }}>
        <button
          id="user-avatar-btn"
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "var(--bg-elevated)", border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-full)", padding: "5px 12px 5px 8px",
            cursor: "pointer", transition: "border-color 150ms",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-default)"; }}
        >
          <div className="avatar-placeholder" style={{
            width: 28, height: 28, background: "rgba(232,48,74,0.12)",
            color: "var(--accent)", fontFamily: "Cairo, sans-serif", fontSize: 12, fontWeight: 800,
          }}>أح</div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>أحمد</span>
            <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 10, color: "var(--text-muted)" }}>الصف الثالث</span>
          </div>
          <ChevronDown size={13} color="var(--text-muted)" />
        </button>

        {showDropdown && (
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", left: 0,
            background: "var(--bg-elevated)", border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-lg)", padding: 8, minWidth: 180,
            boxShadow: "var(--shadow-lg)", animation: "slideDown 150ms ease",
            zIndex: 10,
          }}>
            {[
              { icon: User, label: "حسابي", href: "/account" },
              { icon: Settings, label: "الإعدادات", href: "/account" },
            ].map(item => (
              <Link key={item.label} href={item.href} id={`dropdown-${item.label}`}
                onClick={() => setShowDropdown(false)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: "var(--radius-md)",
                  textDecoration: "none", color: "var(--text-secondary)",
                  fontFamily: "Cairo, sans-serif", fontSize: 13, fontWeight: 600,
                  transition: "background 150ms, color 150ms",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
              >
                <item.icon size={15} /> {item.label}
              </Link>
            ))}
            <div style={{ height: 1, background: "var(--border-subtle)", margin: "4px 0" }} />
            <button id="dropdown-logout" style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 12px", borderRadius: "var(--radius-md)",
              background: "none", border: "none", cursor: "pointer",
              color: "var(--accent)", fontFamily: "Cairo, sans-serif",
              fontSize: 13, fontWeight: 700, width: "100%",
              transition: "background 150ms",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(232,48,74,0.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <LogOut size={15} /> تسجيل الخروج
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
