"use client";

import Link from "next/link";
import { Bell, Search, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ThemeToggle } from "@/app/components/ThemeToggle";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DashboardNavbarProps {
  breadcrumb?: BreadcrumbItem[];
}

export function DashboardNavbar({ breadcrumb }: DashboardNavbarProps) {
  return (
    <header
      id="dashboard-navbar"
      className="
        sticky top-0 z-20
        flex items-center gap-4 px-6 h-16
        bg-[var(--bg-surface)] border-b border-[var(--border-default)]
      "
    >
      {/* Breadcrumb — RTL start (right) */}
      <nav className="flex items-center gap-2 flex-1 min-w-0" aria-label="breadcrumb">
        {breadcrumb && breadcrumb.length > 0 ? (
          breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-[var(--text-muted)] text-xs">/</span>}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-sm font-bold text-[var(--text-primary)]">{crumb.label}</span>
              )}
            </span>
          ))
        ) : (
          <span className="text-sm font-bold text-[var(--text-primary)]">لوحة التحكم</span>
        )}
      </nav>

      {/* Search */}
      <div className="relative hidden sm:block">
        <Search
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
        />
        <input
          id="dashboard-search"
          type="search"
          placeholder="ابحث..."
          className="
            w-[200px] h-9 pr-9 pl-4 text-sm
            bg-[var(--bg-elevated)] border border-[var(--border-default)]
            rounded-full outline-none transition-all duration-150
            text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
            focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(232,48,74,0.12)]
            font-cairo
          "
        />
      </div>

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Notification bell */}
      <button
        id="navbar-bell"
        aria-label="الإشعارات"
        className="relative p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors duration-150"
      >
        <Bell size={18} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--accent)] ring-2 ring-[var(--bg-surface)]" />
      </button>

      {/* Avatar dropdown */}
      <Menu as="div" className="relative">
        <MenuButton
          id="navbar-avatar-btn"
          className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[var(--bg-elevated)] transition-colors duration-150"
        >
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-xs font-bold">
            أح
          </div>
          <ChevronDown size={14} className="text-[var(--text-muted)] hidden sm:block" />
        </MenuButton>

        <MenuItems
          className="
            absolute left-0 mt-2 w-52 origin-top-left
            bg-[var(--bg-surface)] border border-[var(--border-default)]
            rounded-xl shadow-[var(--shadow-md)] py-1 z-50
            focus:outline-none animate-fade-up
          "
        >
          <div className="px-4 py-3 border-b border-[var(--border-subtle)]">
            <div className="text-sm font-bold text-[var(--text-primary)]">أحمد محمد</div>
            <div className="text-xs text-[var(--text-muted)]">الصف الثالث</div>
          </div>

          <MenuItem>
            <Link
              href="/account"
              id="dropdown-account"
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-colors"
            >
              <User size={15} />
              حسابي
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/account"
              id="dropdown-settings"
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Settings size={15} />
              الإعدادات
            </Link>
          </MenuItem>

          <div className="my-1 h-px bg-[var(--border-subtle)]" />

          <MenuItem>
            <button
              id="dropdown-logout"
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--accent)] hover:bg-[rgba(232,48,74,0.06)] transition-colors"
            >
              <LogOut size={15} />
              تسجيل الخروج
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </header>
  );
}
