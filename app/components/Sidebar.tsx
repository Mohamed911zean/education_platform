"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookMarked, Home, BookOpen, TrendingUp, Trophy,
  MessageSquare, Calendar, Settings, LogOut,
  ChevronLeft, ChevronRight,
} from "lucide-react";

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", icon: <Home size={18} />, label: "الرئيسية", id: "nav-home" },
  { href: "/courses",   icon: <BookOpen size={18} />, label: "كورساتي", badge: 3, id: "nav-courses" },
  { href: "/progress",  icon: <TrendingUp size={18} />, label: "تقدمي", id: "nav-progress" },
  { href: "/achievements", icon: <Trophy size={18} />, label: "الإنجازات", badge: 2, id: "nav-achievements" },
  { href: "/forum",     icon: <MessageSquare size={18} />, label: "المنتدى", badge: 5, id: "nav-forum" },
  { href: "/schedule",  icon: <Calendar size={18} />, label: "الجدول", id: "nav-schedule" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* ── Desktop Sidebar ─────────────────────────────── */}
      <aside
        id="sidebar"
        className={`
          hidden md:flex flex-col fixed top-0 right-0 h-full z-30
          bg-[var(--bg-surface)] border-l border-[var(--border-default)]
          transition-[width] duration-200 overflow-hidden
          ${collapsed ? "w-14" : "w-[230px]"}
        `}
      >
        {/* Toggle button */}
        <button
          id="sidebar-toggle"
          onClick={onToggle}
          aria-label="تبديل الشريط الجانبي"
          className="
            absolute top-4 -left-3 z-10
            w-6 h-6 rounded-full flex items-center justify-center
            bg-[var(--bg-elevated)] border border-[var(--border-default)]
            text-[var(--text-muted)] hover:text-[var(--text-primary)]
            hover:border-[var(--border-strong)] transition-colors duration-150
          "
        >
          {collapsed ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
        </button>

        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-[var(--border-subtle)] ${collapsed ? "justify-center px-0" : ""}`}>
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
            <BookMarked size={16} color="white" />
          </div>
          {!collapsed && (
            <span className="sidebar-logo-text font-syne font-bold text-sm text-[var(--text-primary)] whitespace-nowrap">
              منصة المستر
            </span>
          )}
        </div>

        {/* Student mini-card */}
        {!collapsed && (
          <div className="mx-3 mt-4 mb-2 p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                أح
              </div>
              <div className="student-card-details min-w-0">
                <div className="text-sm font-bold text-[var(--text-primary)] truncate">أحمد محمد</div>
                <div className="text-xs text-[var(--text-muted)]">الصف الثالث</div>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1">
                <span>XP الأسبوع</span>
                <span className="font-syne font-bold text-[var(--accent)]">240</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: "65%" }} />
              </div>
            </div>
          </div>
        )}

        {/* Avatar only when collapsed */}
        {collapsed && (
          <div className="flex justify-center mt-4 mb-2">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-xs font-bold">
              أح
            </div>
          </div>
        )}

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-2 px-2">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                id={item.id}
                className={`
                  nav-item flex items-center rounded-xl mb-0.5 text-sm font-bold transition-all duration-150
                  ${collapsed ? "justify-center px-0 py-3" : "gap-2.5 px-3 py-2.5"}
                  ${active
                    ? "bg-[var(--accent)] text-white shadow-sm"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                  }
                `}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="sidebar-label flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${active ? "bg-white/20 text-white" : "bg-[var(--accent)] text-white"}`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className={`border-t border-[var(--border-subtle)] py-3 px-2 space-y-1`}>
          <Link
            href="/account"
            id="nav-settings"
            className={`
              nav-item flex items-center rounded-xl text-sm font-bold transition-all duration-150
              text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]
              ${collapsed ? "justify-center px-0 py-3" : "gap-2.5 px-3 py-2.5"}
            `}
          >
            <Settings size={18} className="flex-shrink-0" />
            {!collapsed && <span className="sidebar-label">الإعدادات</span>}
          </Link>
          <button
            id="nav-logout"
            className={`
              w-full flex items-center rounded-xl text-sm font-bold transition-all duration-150
              text-[var(--accent)] hover:bg-[rgba(232,48,74,0.08)]
              ${collapsed ? "justify-center px-0 py-3" : "gap-2.5 px-3 py-2.5"}
            `}
          >
            <LogOut size={18} className="flex-shrink-0" />
            {!collapsed && <span className="sidebar-label">تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* ── Mobile Bottom Tab Bar ────────────────────────── */}
      <nav className="bottom-nav md:hidden">
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`bottom-nav-item ${active ? "active" : ""}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
