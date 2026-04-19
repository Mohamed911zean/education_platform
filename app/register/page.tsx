"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Zap, Check, CheckCircle } from "lucide-react";

const SUBJECTS = ["الأحياء", "الكيمياء", "الفيزياء", "الرياضيات", "اللغة العربية", "اللغة الإنجليزية", "الجيولوجيا", "التاريخ"];
const GRADES = ["الصف الأول", "الصف الثاني", "الصف الثالث"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 36 }}>
      {[1, 2, 3].map((step, i) => (
        <div key={step} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "none" }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            background: current > step ? "var(--accent-teal)" : current === step ? "var(--accent)" : "transparent",
            border: current < step ? "1px dashed var(--text-muted)" : "none",
            fontFamily: "var(--font-syne)", fontSize: 12, fontWeight: 700,
            color: current >= step ? "white" : "var(--text-muted)",
            transition: "all 300ms ease",
          }}>
            {current > step ? <Check size={14} /> : step}
          </div>
          {i < 2 && (
            <div style={{
              flex: 1, height: 1,
              background: current > step + 0.5 ? "var(--accent-teal)" : "var(--border-subtle)",
              borderStyle: current <= step ? "dashed" : "solid",
              transition: "background 300ms ease",
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const strength = checks.filter(Boolean).length;
  const labels = ["", "ضعيفة", "مقبولة", "كويسة", "قوية"];
  const colors = ["", "#ff3366", "#ff6b35", "#f5c842", "#00d4aa"];

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 99,
            background: i <= strength ? colors[strength] : "rgba(255,255,255,0.06)",
            transition: "background 300ms",
          }} />
        ))}
      </div>
      {password && (
        <div style={{ fontFamily: "var(--font-cairo)", fontSize: 12, color: colors[strength] }}>
          {labels[strength]}
        </div>
      )}
    </div>
  );
}

function BrandPanelMini() {
  return (
    <div className="auth-left-panel" style={{
      background:
        "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,51,102,0.12) 0%, transparent 70%), var(--bg-surface)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "48px 40px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "repeating-linear-gradient(rgba(255,255,255,0.013) 0px,rgba(255,255,255,0.013) 1px,transparent 1px,transparent 48px)," +
          "repeating-linear-gradient(90deg,rgba(255,255,255,0.013) 0px,rgba(255,255,255,0.013) 1px,transparent 1px,transparent 48px)",
        pointerEvents: "none",
      }} />
      <div style={{ position: "relative", textAlign: "center", maxWidth: 320 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 24 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: "linear-gradient(135deg, #ff3366 0%, #ff6b35 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 20px 60px var(--glow-red)",
          }}>
            <Zap size={32} color="white" fill="white" />
          </div>
        </div>
        <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 32, color: "var(--text-primary)", marginBottom: 12 }}>EduRise</div>
        <div style={{ fontFamily: "var(--font-cairo)", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 24 }}>انضم لنصف مليون طالب</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {["شرح مبسط ومركز", "خطط مذاكرة ذكية", "تدريبات عملية", "متابعة دورية وتقييم"].map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <CheckCircle size={18} color="var(--accent-teal)" />
              <span style={{ fontFamily: "var(--font-cairo)", fontSize: 14, color: "var(--text-secondary)" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const toggleSubject = (s: string) => {
    setSubjects(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const gradeColors = ["var(--accent-blue)", "var(--accent-warm)", "var(--accent)"];

  if (done) {
    return (
      <div className="page-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 480, padding: "0 24px" }}>
          {/* Animated checkmark */}
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,212,170,0.1)", border: "2px solid var(--accent-teal)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="40" height="40" viewBox="0 0 40 40">
              <path d="M8 20 L17 29 L32 12" stroke="var(--accent-teal)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="50" strokeDashoffset="0" style={{ animation: "drawCheck 600ms ease forwards" }} />
            </svg>
          </div>
          {/* Confetti */}
          <div style={{ fontSize: 32, marginBottom: 20 }}>
            {["🎉", "⭐", "🎯", "🔥", "🏆"].map((em, i) => (
              <span key={i} style={{ display: "inline-block", margin: "0 4px", animation: `confettiPop ${0.5 + i * 0.1}s ease forwards ${i * 0.1}s` }}>{em}</span>
            ))}
          </div>
          <h2 style={{ fontFamily: "var(--font-cairo)", fontSize: "clamp(22px,3vw,28px)", fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>
            أهلاً بيك في EduRise! 🎉
          </h2>
          <p style={{ fontFamily: "var(--font-cairo)", fontSize: 15, color: "var(--text-secondary)", marginBottom: 32 }}>
            حسابك اتعمل بنجاح. استعد لرحلة تعليمية استثنائية.
          </p>
          <Link href="/dashboard" className="btn btn-primary btn-lg" id="start-learning-btn">ابدأ التعلم الآن ←</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-bg" style={{ minHeight: "100vh" }}>
      <div className="auth-split" style={{ display: "grid", gridTemplateColumns: "40% 60%", minHeight: "100vh" }}>
        <BrandPanelMini />

        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "48px clamp(24px, 6%, 80px)", background: "var(--bg-base)", overflowY: "auto",
        }}>
          <Link href="/" id="register-back-home" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "var(--font-cairo)", fontSize: 14, color: "var(--text-secondary)",
            textDecoration: "none", marginBottom: 40,
          }}>
            <ArrowRight size={16} /> العودة للرئيسية
          </Link>

          <div style={{ maxWidth: 440, width: "100%" }}>
            <StepIndicator current={step} />

            {/* ── Step 1 ── */}
            {step === 1 && (
              <div>
                <h1 style={{ fontFamily: "var(--font-cairo)", fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
                  إنشاء حساب جديد
                </h1>
                <p style={{ fontFamily: "var(--font-cairo)", fontSize: 14, color: "var(--text-muted)", marginBottom: 28 }}>
                  خطوة 1 من 3 — معلوماتك الأساسية
                </p>

                <button id="google-register-btn" style={{
                  width: "100%", height: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                  background: "var(--bg-elevated)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-md)",
                  fontFamily: "var(--font-cairo)", fontSize: 14, fontWeight: 600, color: "var(--text-primary)",
                  cursor: "pointer", marginBottom: 20,
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%", fontSize: 14, fontWeight: 900, color: "white",
                    background: "linear-gradient(135deg, #4285F4 25%, #EA4335 25%, #EA4335 50%, #FBBC05 50%, #FBBC05 75%, #34A853 75%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>G</div>
                  التسجيل بـ Google
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
                  <span style={{ fontFamily: "var(--font-cairo)", fontSize: 12, color: "var(--text-muted)" }}>أو</span>
                  <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                  <div>
                    <label className="form-label" htmlFor="reg-name">اسمك الكامل</label>
                    <input id="reg-name" type="text" className="form-input" placeholder="أحمد محمد علي" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="reg-email">البريد الإلكتروني</label>
                    <input id="reg-email" type="email" className="form-input" placeholder="example@email.com" value={email} onChange={e => setEmail(e.target.value)} dir="ltr" />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="reg-phone">رقم الموبايل</label>
                    <div style={{ position: "relative" }}>
                      <div style={{
                        position: "absolute", right: 0, top: 0, bottom: 0,
                        display: "flex", alignItems: "center", padding: "0 12px",
                        background: "var(--bg-elevated)", borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                        borderRight: "1px solid var(--border-default)",
                        fontFamily: "var(--font-cairo)", fontSize: 13, color: "var(--text-muted)",
                      }}>+20</div>
                      <input id="reg-phone" type="tel" className="form-input" placeholder="01012345678" value={phone} onChange={e => setPhone(e.target.value)} style={{ paddingRight: 64 }} dir="ltr" />
                    </div>
                  </div>
                </div>

                <button id="step1-next" className="btn btn-primary btn-full" style={{ height: 48 }} onClick={() => setStep(2)}>
                  التالي ←
                </button>
                <div style={{ textAlign: "center", fontFamily: "var(--font-cairo)", fontSize: 14, color: "var(--text-secondary)", marginTop: 20 }}>
                  عندك حساب بالفعل؟{" "}
                  <Link href="/login" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 700 }}>سجّل الدخول</Link>
                </div>
              </div>
            )}

            {/* ── Step 2 ── */}
            {step === 2 && (
              <div>
                <h1 style={{ fontFamily: "var(--font-cairo)", fontSize: "clamp(22px,3vw,28px)", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
                  معلوماتك الدراسية
                </h1>
                <p style={{ fontFamily: "var(--font-cairo)", fontSize: 14, color: "var(--text-muted)", marginBottom: 28 }}>
                  خطوة 2 من 3
                </p>

                <div style={{ marginBottom: 24 }}>
                  <label className="form-label">الصف الدراسي</label>
                  <div style={{ display: "flex", gap: 10 }}>
                    {GRADES.map((g, i) => (
                      <button
                        key={g}
                        id={`grade-${i + 1}`}
                        onClick={() => setGrade(g)}
                        style={{
                          flex: 1, padding: "12px 8px", borderRadius: "var(--radius-md)",
                          background: grade === g ? `rgba(${i === 0 ? "77,159,255" : i === 1 ? "255,107,53" : "255,51,102"},0.1)` : "var(--bg-elevated)",
                          border: grade === g ? `1px solid ${gradeColors[i]}` : "1px solid var(--border-default)",
                          color: grade === g ? gradeColors[i] : "var(--text-secondary)",
                          fontFamily: "var(--font-cairo)", fontSize: 13, fontWeight: 700, cursor: "pointer",
                          boxShadow: grade === g ? `0 0 20px rgba(${i === 0 ? "77,159,255" : i === 1 ? "255,107,53" : "255,51,102"},0.15)` : "none",
                          transition: "all 200ms",
                        }}
                      >{g}</button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label className="form-label">المواد اللي بتذاكرها</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {SUBJECTS.map(s => {
                      const selected = subjects.includes(s);
                      return (
                        <button
                          key={s}
                          id={`subject-${s}`}
                          onClick={() => toggleSubject(s)}
                          style={{
                            padding: "6px 14px", borderRadius: "var(--radius-sm)",
                            background: selected ? "rgba(255,51,102,0.1)" : "var(--bg-elevated)",
                            border: `1px solid ${selected ? "var(--border-accent)" : "var(--border-default)"}`,
                            color: selected ? "var(--accent)" : "var(--text-muted)",
                            fontFamily: "var(--font-cairo)", fontSize: 13, fontWeight: 600, cursor: "pointer",
                            display: "flex", alignItems: "center", gap: 6,
                            transition: "all 150ms",
                          }}
                        >
                          {selected && <Check size={11} />}
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <button id="step2-back" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setStep(1)}>← رجوع</button>
                  <button id="step2-next" className="btn btn-primary" style={{ flex: 2 }} onClick={() => setStep(3)}>التالي ←</button>
                </div>
              </div>
            )}

            {/* ── Step 3 ── */}
            {step === 3 && (
              <div>
                <h1 style={{ fontFamily: "var(--font-cairo)", fontSize: "clamp(22px,3vw,28px)", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
                  أمان حسابك
                </h1>
                <p style={{ fontFamily: "var(--font-cairo)", fontSize: 14, color: "var(--text-muted)", marginBottom: 28 }}>
                  خطوة 3 من 3
                </p>

                <div style={{ marginBottom: 20 }}>
                  <label className="form-label" htmlFor="reg-password">كلمة السر</label>
                  <div style={{ position: "relative" }}>
                    <input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      className="form-input"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      style={{ paddingRight: 44 }}
                      dir="ltr"
                    />
                    <button
                      type="button"
                      id="reg-toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <PasswordStrength password={password} />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label className="form-label" htmlFor="reg-confirm-password">تأكيد كلمة السر</label>
                  <input
                    id="reg-confirm-password"
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    style={{ borderColor: confirmPassword && confirmPassword !== password ? "var(--accent)" : undefined }}
                    dir="ltr"
                  />
                  {confirmPassword && confirmPassword !== password && (
                    <p style={{ fontFamily: "var(--font-cairo)", fontSize: 12, color: "var(--accent)", marginTop: 6 }}>كلمتا السر غير متطابقتين</p>
                  )}
                </div>

                {/* Terms checkbox */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 28 }}>
                  <button
                    id="terms-checkbox"
                    onClick={() => setAgreed(!agreed)}
                    style={{
                      width: 20, height: 20, borderRadius: 4, flexShrink: 0, marginTop: 2,
                      background: agreed ? "var(--accent)" : "transparent",
                      border: `1.5px solid ${agreed ? "var(--accent)" : "var(--border-strong)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", transition: "all 200ms",
                    }}
                    aria-label="موافقة على الشروط"
                  >
                    {agreed && <Check size={12} color="white" strokeWidth={3} />}
                  </button>
                  <span style={{ fontFamily: "var(--font-cairo)", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    موافق على{" "}
                    <a href="#" style={{ color: "var(--accent)", textDecoration: "none" }}>الشروط والأحكام</a>
                    {" "}و{" "}
                    <a href="#" style={{ color: "var(--accent)", textDecoration: "none" }}>سياسة الخصوصية</a>
                  </span>
                </div>

                <button
                  id="reg-submit-btn"
                  className="btn btn-primary btn-full"
                  style={{ height: 48, marginBottom: 16 }}
                  onClick={() => { if (agreed) setDone(true); }}
                  disabled={!agreed || password !== confirmPassword || !password}
                >
                  إنشاء الحساب ✓
                </button>
                <button id="step3-back" className="btn btn-ghost btn-full" onClick={() => setStep(2)}>← رجوع</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
