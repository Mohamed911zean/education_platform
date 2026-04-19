"use client";
import { useState } from "react";
import Link from "next/link";
import { BookOpen, Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) { setError("من فضلك اكتب الإيميل وكلمة السر."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); window.location.href = "/dashboard"; }, 1500);
  }

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex" }}>
      {/* Left panel — teacher brand */}
      <div className="auth-left-panel" style={{
        flex: "0 0 45%", background: "var(--bg-surface)",
        borderLeft: "1px solid var(--border-default)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: 48, textAlign: "center",
      }}>
        <div style={{ width: 100, height: 100, borderRadius: "50%", background: "rgba(232,48,74,0.1)", border: "3px solid var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, marginBottom: 20 }}>
          👨‍🏫
        </div>
        <h2 style={{ fontFamily: "Cairo, sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>مستر أحمد النجار</h2>
        <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: 300, marginBottom: 32 }}>
          مدرس الأحياء — منصة التعلم الرسمية لطلاب الثانوية العامة
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 300 }}>
          {[
            { icon: "👨‍🎓", val: "+5,000", label: "طالب" },
            { icon: "📹", val: "+500", label: "ساعة محتوى" },
            { icon: "⭐", val: "4.9/5", label: "تقييم الطلاب" },
          ].map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              background: "var(--bg-elevated)", border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)", padding: "12px 20px",
            }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <span style={{ fontFamily: "Syne, var(--font-syne), sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text-primary)" }}>{s.val}</span>
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-muted)" }}>{s.label}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, padding: 20, background: "rgba(232,48,74,0.05)", border: "1px solid rgba(232,48,74,0.15)", borderRadius: "var(--radius-lg)", maxWidth: 300 }}>
          <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.9, fontStyle: "italic" }}>
            "EduRise خلّتني أحب المذاكرة من جديد. شكراً على كل درس"
          </p>
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <div className="avatar-placeholder" style={{ width: 28, height: 28, background: "rgba(232,48,74,0.1)", color: "var(--accent)", fontFamily: "Cairo, sans-serif", fontSize: 11, fontWeight: 800 }}>س</div>
            <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "var(--text-secondary)", fontWeight: 700 }}>سارة أحمد</span>
            <span className="badge badge-grade">الصف الثالث</span>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "40px 24px",
      }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          {/* Back link */}
          <Link href="/" id="login-back-home" style={{
            display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32,
            fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-muted)",
            textDecoration: "none",
          }}>
            <ArrowLeft size={14} /> العودة للرئيسية
          </Link>

          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BookOpen size={18} color="white" />
              </div>
            </div>
            <h1 style={{ fontFamily: "Cairo, sans-serif", fontSize: 28, fontWeight: 900, color: "var(--text-primary)", marginBottom: 6 }}>
              👋 مرحباً بيك تاني
            </h1>
            <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 14, color: "var(--text-secondary)" }}>
              سجّل دخولك عشان تكمل رحلتك.
            </p>
          </div>

          {/* Google OAuth */}
          <button id="google-login-btn" style={{
            width: "100%", padding: "12px 16px",
            background: "var(--bg-surface)", border: "1.5px solid var(--border-default)",
            borderRadius: "var(--radius-md)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            fontFamily: "Cairo, sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text-primary)",
            marginBottom: 24, transition: "border-color 150ms",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-default)"; }}
          >
            <span style={{ fontSize: 18 }}>🌐</span> تسجيل الدخول بـ Google
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
            <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "var(--text-muted)" }}>أو</span>
            <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label className="form-label" htmlFor="email">البريد الإلكتروني</label>
              <div style={{ position: "relative" }}>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  style={{ paddingLeft: 40 }}
                />
                <Mail size={14} color="var(--text-muted)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              </div>
            </div>

            <div>
              <label className="form-label" htmlFor="password">كلمة السر</label>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  className="form-input"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  style={{ paddingLeft: 40 }}
                />
                <button type="button" id="toggle-password" onClick={() => setShowPass(!showPass)}
                  style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0 }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <a href="#" id="forgot-password" style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>نسيت كلمة السر؟</a>
            </div>

            {error && (
              <div style={{
                padding: 12, background: "rgba(232,48,74,0.08)", border: "1px solid rgba(232,48,74,0.2)",
                borderRadius: "var(--radius-md)", fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--accent)",
              }}>{error}</div>
            )}

            <button type="submit" id="login-submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: 4 }} disabled={loading}>
              {loading ? "جاري الدخول..." : "تسجيل الدخول →"}
            </button>

            <p style={{ textAlign: "center", fontFamily: "Cairo, sans-serif", fontSize: 14, color: "var(--text-muted)" }}>
              مش عندك حساب؟{" "}
              <Link href="/register" id="go-to-register" style={{ color: "var(--accent)", fontWeight: 700, textDecoration: "none" }}>سجّل هنا</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
