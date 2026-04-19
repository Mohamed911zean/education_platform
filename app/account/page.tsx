"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { Camera, Crown, Shield, Bell, CreditCard, AlertTriangle, X, Check, Edit3, ChevronDown } from "lucide-react";

function Toggle({ defaultOn = false, id }: { defaultOn?: boolean; id: string }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <label className="toggle" htmlFor={id}>
      <input id={id} type="checkbox" checked={on} onChange={() => setOn(!on)} />
      <span className="toggle-slider" />
    </label>
  );
}

function SectionCard({ title, icon, children, goldBorder = false, accentHeader = false, action }: {
  title: string; icon?: React.ReactNode; children: React.ReactNode;
  goldBorder?: boolean; accentHeader?: boolean; action?: React.ReactNode;
}) {
  return (
    <div className="card" style={{
      padding: "24px", marginBottom: 20, cursor: "default",
      borderColor: goldBorder ? "rgba(245,200,66,0.2)" : undefined,
      border: accentHeader ? "1px solid rgba(255,51,102,0.15)" : undefined,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{
          fontFamily: "var(--font-cairo)", fontSize: 18, fontWeight: 700,
          color: accentHeader ? "var(--accent)" : "var(--text-primary)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          {icon}{title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value, badge }: { label: string; value: string; badge?: React.ReactNode }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "12px 0", borderBottom: "1px solid var(--border-subtle)",
    }}>
      <span style={{ fontFamily: "var(--font-cairo)", fontSize: 14, color: "var(--text-secondary)" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: "var(--font-cairo)", fontSize: 14, color: "var(--text-primary)", fontWeight: 600 }}>{value}</span>
        {badge}
      </div>
    </div>
  );
}

function ToggleRow({ label, sub, defaultOn, id }: { label: string; sub: string; defaultOn?: boolean; id: string }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "14px 0", borderBottom: "1px solid var(--border-subtle)",
    }}>
      <div>
        <div style={{ fontFamily: "var(--font-cairo)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{label}</div>
        <div style={{ fontFamily: "var(--font-cairo)", fontSize: 12, color: "var(--text-muted)" }}>{sub}</div>
      </div>
      <Toggle defaultOn={defaultOn} id={id} />
    </div>
  );
}

export default function AccountPage() {
  const [editing, setEditing] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const GRADES = ["الصف الأول", "الصف الثاني", "الصف الثالث"];
  const SUBJECTS = ["الأحياء", "الكيمياء", "الفيزياء", "الرياضيات", "اللغة العربية"];
  const [selectedGrade, setSelectedGrade] = useState("الصف الثالث");
  const [selectedSubjects, setSelectedSubjects] = useState(["الأحياء", "الكيمياء"]);

  const toggleSubject = (s: string) => setSelectedSubjects(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const gradeColors = ["var(--accent-blue)", "var(--accent-warm)", "var(--accent)"];

  return (
    <div className="page-bg" style={{ minHeight: "100vh", direction: "rtl" }}>
      <Sidebar />
      <div style={{ marginRight: 240, minHeight: "100vh" }} className="dashboard-layout">
        <DashboardNavbar breadcrumb={[{ label: "الرئيسية", href: "/dashboard" }, { label: "حسابي" }]} />

        <main style={{ maxWidth: 860, padding: "32px 32px 80px", width: "100%" }}>
          {/* Page header */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontFamily: "var(--font-cairo)", fontSize: 32, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-1px", marginBottom: 4 }}>حسابي</h1>
            <p style={{ fontFamily: "var(--font-cairo)", fontSize: 13, color: "var(--text-muted)" }}>الرئيسية / حسابي</p>
          </div>

          {/* ── Profile Hero Card ──────────────────────────── */}
          <div className="card-elevated animate-fade-up stagger-1" style={{ marginBottom: 20, padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ position: "relative" }}>
                <div className="avatar-placeholder avatar-ring-red" style={{
                  width: 96, height: 96, background: "rgba(255,51,102,0.1)",
                  color: "var(--accent)", fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 28,
                }}>أح</div>
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: "rgba(0,0,0,0)", display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", cursor: "pointer",
                  transition: "background 200ms",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.5)"; (e.currentTarget as HTMLElement).querySelector(".cam-icon")?.setAttribute("style", "opacity:1; display:flex"); }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0)"; (e.currentTarget as HTMLElement).querySelector(".cam-icon")?.setAttribute("style", "opacity:0; display:none"); }}
                >
                  <div className="cam-icon" style={{ opacity: 0, display: "none", flexDirection: "column", alignItems: "center", color: "white" }}>
                    <Camera size={20} />
                    <span style={{ fontFamily: "var(--font-cairo)", fontSize: 10, marginTop: 2 }}>تغيير</span>
                  </div>
                </div>
              </div>
              <div>
                <h2 style={{ fontFamily: "var(--font-cairo)", fontSize: 22, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>أحمد محمد علي</h2>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                  <span className="badge badge-grade">الصف الثالث</span>
                  <span className="badge badge-subject">أحياء</span>
                  <span className="badge badge-subject">كيمياء</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 13 }}>📅</span>
                  <span style={{ fontFamily: "var(--font-cairo)", fontSize: 13, color: "var(--text-muted)" }}>عضو منذ مارس 2024</span>
                </div>
                <button className="btn btn-ghost btn-sm" style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
                  <Edit3 size={13} /> تعديل الملف الشخصي
                </button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 28 }}>
              {[
                { value: "24", label: "درس مكتمل" },
                { value: "240", label: "نقطة" },
                { value: "7🔥", label: "سلسلة" },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-syne)", fontSize: 28, fontWeight: 800, color: "var(--text-primary)" }}>{s.value}</div>
                  <div style={{ fontFamily: "var(--font-cairo)", fontSize: 12, color: "var(--text-muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Section 1: Personal Info ───────────────────── */}
          <SectionCard
            title="المعلومات الشخصية"
            action={
              <button id="edit-profile-btn" className="btn btn-ghost btn-sm" onClick={() => setEditing(!editing)} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Edit3 size={13} /> {editing ? "إلغاء" : "تعديل ✏️"}
              </button>
            }
          >
            {editing ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "الاسم الكامل", id: "edit-name", type: "text", value: "أحمد محمد علي" },
                  { label: "البريد الإلكتروني", id: "edit-email", type: "email", value: "ahmed@example.com" },
                  { label: "رقم الموبايل", id: "edit-phone", type: "tel", value: "+20 1234567890" },
                ].map(f => (
                  <div key={f.id}>
                    <label className="form-label" htmlFor={f.id}>{f.label}</label>
                    <input id={f.id} type={f.type} className="form-input" defaultValue={f.value} />
                  </div>
                ))}
                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <button id="save-profile-btn" className="btn btn-primary" onClick={() => setEditing(false)}>حفظ التعديلات</button>
                  <button className="btn btn-ghost" onClick={() => setEditing(false)}>إلغاء</button>
                </div>
              </div>
            ) : (
              <div>
                <InfoRow label="الاسم الكامل" value="أحمد محمد علي" />
                <InfoRow label="البريد الإلكتروني" value="ahmed@example.com" badge={<span className="badge badge-done"><Check size={10} /> متحقق منه</span>} />
                <InfoRow label="رقم الموبايل" value="+20 1234567890" badge={<><span className="badge badge-grade">! غير متحقق</span><a href="#" style={{ color: "var(--accent)", fontSize: 12, fontFamily: "var(--font-cairo)" }}>تحقق الآن</a></>} />
                <InfoRow label="تاريخ الميلاد" value="15 يناير 2007" />
                <InfoRow label="المحافظة" value="القاهرة" />
              </div>
            )}
          </SectionCard>

          {/* ── Section 2: Academic Info ──────────────────── */}
          <SectionCard title="المعلومات الدراسية">
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">الصف الدراسي</label>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {GRADES.map((g, i) => (
                  <button key={g} onClick={() => setSelectedGrade(g)} style={{
                    flex: "1 0 auto", minWidth: 90, padding: "10px 8px", borderRadius: "var(--radius-md)",
                    background: selectedGrade === g ? `rgba(${i === 0 ? "77,159,255" : i === 1 ? "255,107,53" : "255,51,102"},0.1)` : "var(--bg-elevated)",
                    border: `1px solid ${selectedGrade === g ? gradeColors[i] : "var(--border-default)"}`,
                    color: selectedGrade === g ? gradeColors[i] : "var(--text-secondary)",
                    fontFamily: "var(--font-cairo)", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 200ms",
                  }}>{g}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">المواد الدراسية</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {SUBJECTS.map(s => {
                  const sel = selectedSubjects.includes(s);
                  return (
                    <button key={s} onClick={() => toggleSubject(s)} style={{
                      padding: "6px 14px", borderRadius: "var(--radius-sm)",
                      background: sel ? "rgba(255,51,102,0.1)" : "var(--bg-elevated)",
                      border: `1px solid ${sel ? "var(--border-accent)" : "var(--border-default)"}`,
                      color: sel ? "var(--accent)" : "var(--text-muted)",
                      fontFamily: "var(--font-cairo)", fontSize: 13, fontWeight: 600, cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 5, transition: "all 150ms",
                    }}>
                      {sel && <Check size={11} />}{s}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="form-label" htmlFor="school-name">اسم المدرسة</label>
              <input id="school-name" type="text" className="form-input" defaultValue="مدرسة القاهرة الثانوية" />
            </div>
          </SectionCard>

          {/* ── Section 3: Security ───────────────────────── */}
          <SectionCard title="الأمان وكلمة السر" icon={<Shield size={18} />}>
            <InfoRow label="كلمة السر" value="●●●●●●●●" badge={
              <button id="change-password-btn" className="btn btn-ghost btn-sm" style={{ color: "var(--accent)" }}>تغيير كلمة السر ←</button>
            } />
            <div style={{ padding: "14px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "var(--font-cairo)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>المصادقة الثنائية</div>
                <div style={{ fontFamily: "var(--font-cairo)", fontSize: 12, color: "var(--text-muted)" }}>إضافة طبقة حماية إضافية لحسابك</div>
              </div>
              <Toggle id="2fa-toggle" defaultOn={false} />
            </div>
          </SectionCard>

          {/* ── Section 4: Notifications ──────────────────── */}
          <SectionCard title="إعدادات الإشعارات" icon={<Bell size={18} />}>
            <ToggleRow id="notif-lessons" label="إشعارات الدروس الجديدة" sub="استقبل إشعاراً فور نشر درس جديد" defaultOn={true} />
            <ToggleRow id="notif-reminders" label="تذكير مذاكرة يومي" sub="تذكير يومي بوقتك المخصص للمذاكرة" defaultOn={true} />
            <ToggleRow id="notif-forum" label="إشعارات المنتدى" sub="ردود على أسئلتك في المنتدى" defaultOn={false} />
            <ToggleRow id="notif-offers" label="عروض وخصومات" sub="أحدث العروض والكورسات المجانية" defaultOn={true} />
            <ToggleRow id="notif-achievements" label="إشعارات الإنجازات" sub="احتفل بكل إنجاز جديد" defaultOn={true} />
            <ToggleRow id="notif-marketing" label="البريد الإلكتروني التسويقي" sub="نشرات وتحديثات المنصة" defaultOn={false} />
          </SectionCard>

          {/* ── Section 5: Subscription ───────────────────── */}
          <SectionCard title="اشتراكي" goldBorder action={<button className="btn btn-gold btn-sm"><Crown size={13} /> ترقية ↑</button>}>
            <div style={{
              background: "rgba(245,200,66,0.06)", border: "1px solid rgba(245,200,66,0.15)",
              borderRadius: "var(--radius-md)", padding: 20, marginBottom: 20,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <Crown size={24} color="var(--accent-gold)" />
                <div>
                  <div style={{ fontFamily: "var(--font-cairo)", fontSize: 18, fontWeight: 700, color: "var(--accent-gold)" }}>الخطة المميزة</div>
                  <div style={{ fontFamily: "var(--font-cairo)", fontSize: 13, color: "var(--text-muted)" }}>تنتهي في 15 مارس 2025</div>
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: "var(--font-cairo)", fontSize: 12, color: "var(--text-muted)" }}>الأيام المتبقية</span>
                  <span style={{ fontFamily: "var(--font-cairo)", fontSize: 12, color: "var(--accent-teal)", fontWeight: 700 }}>45 / 90 يوم</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: "50%" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["جميع الكورسات", "دروس مباشرة", "شهادات إتمام", "أولوية الدعم"].map(f => (
                  <span key={f} className="badge badge-grade" style={{ fontSize: 11 }}>{f}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button id="renew-subscription-btn" className="btn btn-gold" style={{ flex: 1 }}>تجديد الاشتراك</button>
              <button className="btn btn-ghost" style={{ flex: 1 }}>تغيير الخطة</button>
            </div>
          </SectionCard>

          {/* ── Section 6: Danger Zone ────────────────────── */}
          <SectionCard title="منطقة الخطر" accentHeader icon={<AlertTriangle size={18} />}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid rgba(255,51,102,0.1)" }}>
              <div>
                <div style={{ fontFamily: "var(--font-cairo)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>تسجيل الخروج من كل الأجهزة</div>
                <div style={{ fontFamily: "var(--font-cairo)", fontSize: 12, color: "var(--text-muted)" }}>اطرد كل الجلسات النشطة بخلاف دي.</div>
              </div>
              <button id="logout-all-btn" className="btn btn-danger btn-sm">تسجيل الخروج من كل مكان</button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0" }}>
              <div>
                <div style={{ fontFamily: "var(--font-cairo)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>حذف الحساب نهائياً</div>
                <div style={{ fontFamily: "var(--font-cairo)", fontSize: 12, color: "var(--text-muted)" }}>لا يمكن التراجع عن هذا الإجراء.</div>
              </div>
              <button id="delete-account-btn" className="btn btn-danger btn-sm" onClick={() => setDeleteModalOpen(true)}>حذف الحساب</button>
            </div>
          </SectionCard>
        </main>
      </div>

      {/* ── Delete confirmation modal ────────────────────── */}
      {deleteModalOpen && (
        <div className="overlay-bg" onClick={() => setDeleteModalOpen(false)}>
          <div className="card-glass" style={{
            maxWidth: 440, width: "90%", padding: 32, margin: 24,
            animation: "fadeUp 250ms ease", textAlign: "center",
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "rgba(255,51,102,0.1)", border: "1px solid rgba(255,51,102,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px", fontSize: 28,
            }}>⚠️</div>
            <h3 style={{ fontFamily: "var(--font-cairo)", fontSize: 22, fontWeight: 800, color: "var(--text-primary)", marginBottom: 10 }}>هل أنت متأكد؟</h3>
            <p style={{ fontFamily: "var(--font-cairo)", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>
              سيتم حذف حسابك وكل بياناتك نهائياً ولا يمكن استرجاعها.
            </p>
            <div style={{ marginBottom: 20 }}>
              <label className="form-label" htmlFor="delete-confirm-input">اكتب "احذف حسابي" للتأكيد</label>
              <input
                id="delete-confirm-input"
                type="text"
                className="form-input"
                placeholder='احذف حسابي'
                value={deleteInput}
                onChange={e => setDeleteInput(e.target.value)}
                style={{ textAlign: "center" }}
              />
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                id="confirm-delete-btn"
                className="btn btn-danger"
                style={{ flex: 1, opacity: deleteInput === "احذف حسابي" ? 1 : 0.4 }}
                disabled={deleteInput !== "احذف حسابي"}
              >نعم، احذف حسابي</button>
              <button id="cancel-delete-btn" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setDeleteModalOpen(false)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .dashboard-layout { margin-right: 0 !important; padding-bottom: 64px; }
        }
      `}</style>
    </div>
  );
}
