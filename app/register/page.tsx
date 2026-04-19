"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Zap, Check, CheckCircle } from "lucide-react";
import { motion } from 'framer-motion'

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
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center max-w-md w-full"
        >
          {/* Animated Checkmark */}
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 rounded-full bg-rose-500/10 border-2 border-rose-500 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(226,29,72,0.2)]"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" className="text-rose-500">
              <motion.path 
                d="M8 20 L17 29 L32 12" 
                stroke="currentColor" 
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              />
            </svg>
          </motion.div>

          {/* Confetti Elements */}
          <div className="text-3xl mb-6 flex justify-center gap-2">
            {["🎉", "⭐", "🎯", "🔥", "🏆"].map((em, index) => (
              <motion.span 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.1), type: "spring" }}
                className="inline-block cursor-default"
              >
                {em}
              </motion.span>
            ))}
          </div>

          {/* Text Content */}
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            أهلاً بيك يا بطل! 🎉
          </h2>
          
          <p className="text-sm md:text-base text-neutral-400 mb-8 leading-relaxed">
            حسابك اتعمل بنجاح. استعد لرحلة تعليمية استثنائية.
          </p>

          {/* Call to Action */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link 
              href="/dashboard" 
              className="flex items-center justify-center w-full h-14 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white rounded-xl font-bold text-lg transition-all shadow-[0_4px_12px_rgba(226,29,72,0.3)]"
            >
              ابدأ التعلم الآن ←
            </Link>
          </motion.div>
        </motion.div>
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