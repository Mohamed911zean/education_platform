"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Menu, X, ChevronDown } from "lucide-react";

const TEACHER_NAME = "مستر أحمد النجار";

const NAV_LINKS = [
  { label: "الكورسات", href: "#courses" },
  { label: "السنوات الدراسية", href: "#grades" },
  { label: "عن المدرس", href: "#about" },
  { label: "آراء الطلاب", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header style={{
  position: "fixed",
  top: 12,
  right: 0,
  left: 0,
  zIndex: 100,
  display: "flex",
  justifyContent: "center",
  pointerEvents: "none",
}}>
        <div style={{
  width: "calc(100% - 32px)",
  maxWidth: 1100,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  height: 60,

  background: scrolled
    ? "rgba(12,14,20,0.85)"
    : "rgba(12,14,20,0.6)",

  backdropFilter: "blur(14px)",
  border: "1px solid var(--border-subtle)",
  borderRadius: 16,

  boxShadow: scrolled
    ? "0 8px 30px rgba(0,0,0,0.25)"
    : "none",

  transition: "all 0.25s ease",
  pointerEvents: "auto",
}}>
          {/* Logo */}
          <Link href="/" id="navbar-logo" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <BookOpen size={18} color="white" />
            </div>
            <span style={{
              fontFamily: "Cairo, sans-serif",
              fontSize: 16, fontWeight: 800, color: "var(--text-primary)",
            }}>{TEACHER_NAME}</span>
          </Link>

          {/* Desktop nav links */}
          <nav style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                id={`nav-${link.label}`}
                style={{
                  fontFamily: "Cairo, sans-serif",
                  fontSize: 14, fontWeight: 600, color: "var(--text-secondary)",
                  textDecoration: "none", padding: "8px 14px",
                  borderRadius: "var(--radius-md)",
                  transition: "color 150ms, background 150ms",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >{link.label}</a>
            ))}
          </nav>

          {/* Auth buttons */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }} className="desktop-nav">
            <Link href="/login" id="nav-login" className="btn btn-ghost btn-sm">تسجيل الدخول</Link>
            <Link href="/register" id="nav-register" className="btn btn-primary btn-sm"> حساب جديد</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none", background: "none", border: "none",
              color: "var(--text-primary)", cursor: "pointer",
            }}
            className="mobile-hamburger"
            aria-label="القائمة"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, right: 0, left: 0, bottom: 0,
          background: "var(--bg-base)", zIndex: 99,
          padding: 24, display: "flex", flexDirection: "column", gap: 8,
        }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "Cairo, sans-serif", fontSize: 18, fontWeight: 700,
                color: "var(--text-primary)", textDecoration: "none",
                padding: "14px 16px", borderRadius: "var(--radius-md)",
                background: "var(--bg-surface)", border: "1px solid var(--border-default)",
                display: "block",
              }}
            >{link.label}</a>
          ))}
          <div style={{ height: 1, background: "var(--border-subtle)", margin: "8px 0" }} />
          <Link href="/login" className="btn btn-secondary btn-full" onClick={() => setMenuOpen(false)}>تسجيل الدخول</Link>
          <Link href="/register" className="btn btn-primary btn-full" onClick={() => setMenuOpen(false)}>ابدأ مجاناً ←</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
