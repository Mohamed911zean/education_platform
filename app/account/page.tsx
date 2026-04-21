"use client";

import { useState } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { DashboardNavbar } from "@/app/components/DashboardNavbar";
import { SectionCard } from "@/app/components/shared/SectionCard";
import { InfoRow } from "@/app/components/shared/InfoRow";
import { ToggleRow } from "@/app/components/shared/ToggleRow";
import { StatsDonut } from "@/app/components/shared/StatsDonut";
import {
  Dialog, DialogPanel, DialogTitle, Transition, TransitionChild,
} from "@headlessui/react";
import {
  Camera, Crown, Shield, Bell, AlertTriangle, Pencil, Check, X,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

/* ── Mock score data ────────────────────────────────────────── */
const SCORE_DATA = [
  { day: "سبت",  score: 0 },
  { day: "أحد",  score: 0 },
  { day: "إثنين", score: 0 },
  { day: "ثلاثاء", score: 0 },
  { day: "أربعاء", score: 0 },
  { day: "خميس", score: 0 },
  { day: "جمعة", score: 1 },
];

const GRADES_OPTIONS = ["الصف الأول الثانوي", "الصف الثاني الثانوي", "الصف الثالث الثانوي"];

/* ── Delete dialog ──────────────────────────────────────────── */
function DeleteAccountDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [confirmText, setConfirmText] = useState("");
  const REQUIRED = "احذف حسابي";

  return (
    <Transition show={open}>
      <Dialog onClose={onClose} className="relative z-50">
        <TransitionChild
          enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
            leave="ease-in duration-150" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
          >
            <DialogPanel
              className="w-full max-w-md rounded-2xl p-6 shadow-2xl"
              style={{ background: "var(--bg-surface)", border: "1px solid rgba(232,48,74,0.2)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[rgba(232,48,74,0.1)] flex items-center justify-center">
                  <AlertTriangle size={20} color="var(--accent)" />
                </div>
                <DialogTitle className="text-base font-bold" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-primary)" }}>
                  حذف الحساب نهائياً
                </DialogTitle>
              </div>

              <p className="text-sm mb-4 leading-relaxed" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-secondary)" }}>
                هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع بياناتك وتقدمك في الكورسات بشكل نهائي.
              </p>

              <label
                className="block text-xs font-bold mb-2"
                style={{ fontFamily: "var(--font-cairo)", color: "var(--text-muted)" }}
              >
                اكتب <span style={{ color: "var(--accent)" }}>{REQUIRED}</span> للتأكيد
              </label>
              <input
                id="delete-confirm-input"
                type="text"
                className="form-input mb-4"
                placeholder={REQUIRED}
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="btn btn-secondary flex-1"
                  style={{ fontFamily: "var(--font-cairo)" }}
                >
                  إلغاء
                </button>
                <button
                  id="delete-confirm-btn"
                  disabled={confirmText !== REQUIRED}
                  className="btn btn-danger flex-1"
                  style={{ opacity: confirmText === REQUIRED ? 1 : 0.4, fontFamily: "var(--font-cairo)" }}
                >
                  احذف حسابي
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
export default function AccountPage() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 56 : 230;

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("أحمد محمد");
  const [email, setEmail] = useState("ahmed@example.com");
  const [phone, setPhone] = useState("01012345678");
  const [school, setSchool] = useState("مدرسة الرواد الثانوية");
  const [grade, setGrade] = useState("الصف الثالث الثانوي");
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div
        className="dashboard-layout transition-all duration-200"
        style={{ paddingRight: sidebarWidth }}
      >
        <DashboardNavbar breadcrumb={[{ label: "الرئيسية", href: "/dashboard" }, { label: "حسابي" }]} />

        <main className="p-6 space-y-6 max-w-4xl">

          {/* ── Profile hero ──────────────────────────────── */}
          <div
            id="profile-hero"
            className="card flex flex-col sm:flex-row items-start sm:items-center gap-5 animate-fade-up"
          >
            {/* Avatar */}
            <div className="relative group flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-3xl font-bold avatar-ring-red">
                أح
              </div>
              <button
                id="avatar-camera-btn"
                className="
                  absolute inset-0 rounded-full
                  bg-black/50 opacity-0 group-hover:opacity-100
                  flex items-center justify-center transition-opacity
                "
              >
                <Camera size={22} color="white" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-primary)" }}>
                  {name}
                </h1>
                <span className="badge badge-grade">الصف الثالث</span>
                <span className="badge badge-subject">أحياء</span>
              </div>
              <p className="text-sm mb-3" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-muted)" }}>
                عضو منذ مارس 2024
              </p>
              <div className="flex flex-wrap gap-5 text-sm" style={{ fontFamily: "var(--font-cairo)" }}>
                {[
                  { label: "النقاط", value: "240", color: "var(--accent-gold)" },
                  { label: "الدروس", value: "24", color: "var(--accent-teal)" },
                  { label: "الاستمرارية", value: "7 أيام", color: "var(--accent)" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-1.5">
                    <span className="font-bold text-base" style={{ fontFamily: "var(--font-syne)", color: s.color }}>{s.value}</span>
                    <span style={{ color: "var(--text-muted)" }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Personal info ─────────────────────────────── */}
          <SectionCard
            id="section-personal"
            title="المعلومات الشخصية"
            icon={<Pencil size={16} />}
            action={
              editing ? (
                <div className="flex gap-2">
                  <button id="save-profile-btn" onClick={() => setEditing(false)} className="btn btn-primary btn-sm">
                    <Check size={14} /> حفظ
                  </button>
                  <button id="cancel-edit-btn" onClick={() => setEditing(false)} className="btn btn-secondary btn-sm">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button id="edit-profile-btn" onClick={() => setEditing(true)} className="btn btn-secondary btn-sm">
                  <Pencil size={13} /> تعديل
                </button>
              )
            }
          >
            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="form-label">الاسم الكامل</label>
                  <input id="edit-name" type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label className="form-label">البريد الإلكتروني</label>
                  <input id="edit-email" type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" />
                </div>
                <div>
                  <label className="form-label">رقم الهاتف</label>
                  <input id="edit-phone" type="tel" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} dir="ltr" />
                </div>
              </div>
            ) : (
              <>
                <InfoRow label="الاسم الكامل" value={name} />
                <InfoRow label="البريد الإلكتروني" value={email} />
                <InfoRow label="رقم الهاتف" value={phone} />
              </>
            )}
          </SectionCard>

          {/* ── Academic info ─────────────────────────────── */}
          <SectionCard id="section-academic" title="المعلومات الدراسية">
            <div className="mb-4">
              <label className="form-label">الصف الدراسي</label>
              <div className="flex flex-wrap gap-2">
                {GRADES_OPTIONS.map((g) => (
                  <button
                    key={g}
                    id={`grade-pill-${g}`}
                    onClick={() => setGrade(g)}
                    className="pill-tab"
                    style={grade === g ? { background: "var(--accent)", borderColor: "var(--accent)", color: "white" } : {}}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="form-label">المدرسة</label>
              <input
                id="edit-school"
                type="text"
                className="form-input"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>
          </SectionCard>

          {/* ── Learning stats ────────────────────────────── */}
          <SectionCard id="section-stats" title="إحصائيات التعلم">
            {/* Donuts */}
            <div className="flex flex-col sm:flex-row justify-around items-center gap-8 mb-6">
              <StatsDonut
                label="الفيديوهات اللي شوفتها"
                sub="من إجمالي الكورس"
                watched={5}
                total={43}
                color="#e8304a"
              />
              <StatsDonut
                label="الإختبارات اللي خلصتها"
                sub="من إجمالي الاختبارات"
                watched={1}
                total={12}
                color="#e8304a"
              />
            </div>

            {/* Avg score chart */}
            <div
              className="rounded-xl p-4 border"
              style={{ background: "var(--bg-elevated)", borderColor: "var(--border-subtle)" }}
            >
              <div className="flex items-end gap-3 mb-3">
                <span
                  className="text-4xl font-bold leading-none"
                  style={{ fontFamily: "var(--font-syne)", color: "var(--accent)" }}
                >
                  1%
                </span>
                <span className="text-sm pb-1" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-muted)" }}>
                  متوسط النتائج (آخر 7 أيام)
                </span>
              </div>
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={SCORE_DATA}>
                  <CartesianGrid vertical={false} stroke="var(--border-subtle)" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontFamily: "Cairo", fontSize: 11, fill: "var(--text-muted)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide domain={[0, 10]} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-default)",
                      borderRadius: 8,
                      fontFamily: "Cairo",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="var(--accent)"
                    strokeWidth={2}
                    dot={{ fill: "var(--accent)", r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          {/* ── Security ──────────────────────────────────── */}
          <SectionCard id="section-security" title="الأمان" icon={<Shield size={16} />}>
            <InfoRow
              label="كلمة المرور"
              value="••••••••"
              badge={
                <button id="change-password-btn" className="btn btn-secondary btn-sm">
                  تغيير
                </button>
              }
            />
            <ToggleRow
              id="toggle-2fa"
              label="التحقق بخطوتين (2FA)"
              sub="أمان إضافي لحسابك عبر الهاتف"
              defaultOn={false}
            />
          </SectionCard>

          {/* ── Notifications ─────────────────────────────── */}
          <SectionCard id="section-notifications" title="إعدادات الإشعارات" icon={<Bell size={16} />}>
            <ToggleRow id="notif-new-lesson" label="دروس جديدة" sub="عند إضافة درس جديد في كورساتك" defaultOn={true} />
            <ToggleRow id="notif-live" label="جلسات مباشرة" sub="تذكير قبل الجلسة بساعة" defaultOn={true} />
            <ToggleRow id="notif-exam" label="اختبارات وتقييمات" sub="عند توفر اختبار جديد" defaultOn={true} />
            <ToggleRow id="notif-achievement" label="الإنجازات" sub="عند الحصول على وسام جديد" defaultOn={false} />
            <ToggleRow id="notif-newsletter" label="النشرة الأسبوعية" sub="ملخص تقدمك كل أسبوع" defaultOn={false} />
            <ToggleRow id="notif-promo" label="العروض والخصومات" sub="إشعارات الأسعار والعروض الخاصة" defaultOn={false} />
          </SectionCard>

          {/* ── Subscription ──────────────────────────────── */}
          <SectionCard id="section-subscription" title="اشتراكي" icon={<Crown size={16} />} goldBorder>
            <div
              className="rounded-xl p-4 mb-4"
              style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(232,48,74,0.05))", border: "1px solid rgba(245,158,11,0.15)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-bold" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-primary)" }}>باقة طالب محترف</div>
                  <div className="text-xs" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-muted)" }}>تنتهي في 15 مايو 2025</div>
                </div>
                <span className="badge badge-premium">نشط</span>
              </div>
              <div className="text-xs mb-2" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-muted)" }}>
                22 يوم متبقي
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: "73%", background: "linear-gradient(90deg, var(--accent-gold), var(--accent))" }} />
              </div>
            </div>
            <div className="space-y-2">
              {["وصول لجميع الكورسات", "جلسات مباشرة غير محدودة", "تحميل المحتوى", "دعم أولوية 24/7"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-secondary)" }}>
                  <Check size={14} color="var(--accent-teal)" />
                  {f}
                </div>
              ))}
            </div>
            <button id="renew-subscription-btn" className="btn btn-gold w-full mt-4">
              <Crown size={15} />
              تجديد الاشتراك
            </button>
          </SectionCard>

          {/* ── Danger zone ───────────────────────────────── */}
          <SectionCard
            id="section-danger"
            title="منطقة الخطر"
            icon={<AlertTriangle size={16} />}
            accentHeader
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border" style={{ borderColor: "rgba(232,48,74,0.12)", background: "rgba(232,48,74,0.04)" }}>
                <div>
                  <div className="text-sm font-bold" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-primary)" }}>تعطيل الحساب مؤقتاً</div>
                  <div className="text-xs mt-0.5" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-muted)" }}>يمكنك إعادة التفعيل في أي وقت</div>
                </div>
                <button id="disable-account-btn" className="btn btn-danger btn-sm">تعطيل</button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border" style={{ borderColor: "rgba(232,48,74,0.2)", background: "rgba(232,48,74,0.06)" }}>
                <div>
                  <div className="text-sm font-bold" style={{ fontFamily: "var(--font-cairo)", color: "var(--accent)" }}>حذف الحساب نهائياً</div>
                  <div className="text-xs mt-0.5" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-muted)" }}>لا يمكن التراجع عن هذا الإجراء</div>
                </div>
                <button
                  id="delete-account-btn"
                  onClick={() => setDeleteOpen(true)}
                  className="btn btn-danger btn-sm"
                >
                  حذف
                </button>
              </div>
            </div>
          </SectionCard>

        </main>
      </div>

      {/* Delete dialog */}
      <DeleteAccountDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} />
    </div>
  );
}
