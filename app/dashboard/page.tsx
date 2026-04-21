"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/app/components/Sidebar";
import { DashboardNavbar } from "@/app/components/DashboardNavbar";
import { CourseCard } from "@/app/components/shared/CourseCard";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Flame, Star, Clock, CheckCircle, ArrowLeft, Video, Calendar, BookOpen } from "lucide-react";

/* ── Mock data ────────────────────────────────────────────── */
const STATS = [
  { icon: <Flame size={20} />, label: "أيام متواصلة", value: "7", unit: "يوم", color: "#e8304a" },
  { icon: <Star size={20} />, label: "نقاط", value: "240", unit: "نقطة", color: "#f59e0b" },
  { icon: <Clock size={20} />, label: "ساعات دراسة", value: "8.5", unit: "ساعة/أسبوع", color: "#3b82f6" },
  { icon: <CheckCircle size={20} />, label: "دروس مكتملة", value: "24", unit: "درس", color: "#10b981" },
];

const WEEKLY_ACTIVITY = [
  { day: "أحد", mins: 90 },
  { day: "إثنين", mins: 0 },
  { day: "ثلاثاء", mins: 150 },
  { day: "أربعاء", mins: 60 },
  { day: "خميس", mins: 120 },
  { day: "جمعة", mins: 180 },
  { day: "سبت", mins: 45 },
];

const SCHEDULE = [
  { day: "السبت", time: "8م", title: "مراجعة الجهاز العصبي", type: "live" as const },
  { day: "الإثنين", time: "5م", title: "التكاثر اللاجنسي", type: "lesson" as const },
  { day: "الثلاثاء", time: "9م", title: "اختبار وحدة الخلية", type: "exam" as const },
];

const typeStyles = {
  live:   { bg: "rgba(232,48,74,0.1)",   color: "#e8304a",   label: "مباشر",   icon: <Video size={14} /> },
  lesson: { bg: "rgba(59,130,246,0.1)",  color: "#3b82f6",  label: "درس",     icon: <BookOpen size={14} /> },
  exam:   { bg: "rgba(245,158,11,0.1)",  color: "#f59e0b",  label: "اختبار",  icon: <Calendar size={14} /> },
};

/* ── SVG Progress Ring ─────────────────────────────────────── */
function ProgressRing({ pct }: { pct: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={128} height={128} className="progress-ring">
      <circle cx={64} cy={64} r={r} fill="none" stroke="var(--bg-elevated)" strokeWidth={10} />
      <circle
        cx={64} cy={64} r={r} fill="none"
        stroke="var(--accent)" strokeWidth={10}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Custom Tooltip ─────────────────────────────────────────── */
function ActivityTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="card px-3 py-2 text-xs" style={{ fontFamily: "var(--font-cairo)" }}>
      <div style={{ color: "var(--text-muted)" }}>{label}</div>
      <div style={{ color: "var(--accent)", fontWeight: 700 }}>{payload[0].value} دقيقة</div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 56 : 230;

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div
        className="dashboard-layout transition-all duration-200"
        style={{ paddingRight: sidebarWidth }}
      >
        <DashboardNavbar breadcrumb={[{ label: "الرئيسية" }]} />

        <main className="p-6 space-y-6 max-w-7xl">

          {/* ── Welcome Banner ────────────────────────────── */}
          <section
            id="welcome-banner"
            className="
              relative overflow-hidden rounded-2xl p-6
              flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6
              animate-fade-up
            "
            style={{ background: "linear-gradient(135deg, var(--accent) 0%, #ff6b35 100%)" }}
          >
            {/* BG decoration */}
            <div
              className="absolute -top-10 -left-10 w-48 h-48 rounded-full opacity-10"
              style={{ background: "white" }}
            />
            <div className="relative">
              <p className="text-white/80 text-sm mb-1" style={{ fontFamily: "var(--font-cairo)" }}>
                مرحباً بك عائداً  👋
              </p>
              <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-cairo)" }}>
                أحمد محمد
              </h1>
              <p className="text-white/70 text-sm" style={{ fontFamily: "var(--font-cairo)" }}>
                استمر في التقدم — أنت على بُعد خطوات من هدفك
              </p>
              <Link
                href="/courses"
                id="banner-start-btn"
                className="mt-4 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-cairo)" }}
              >
                ابدأ الدرس التالي <ArrowLeft size={15} />
              </Link>
            </div>

            {/* Progress ring */}
            <div className="relative flex-shrink-0">
              <ProgressRing pct={72} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>72%</span>
                <span className="text-white/70 text-xs" style={{ fontFamily: "var(--font-cairo)" }}>إتمام الكورس</span>
              </div>
            </div>
          </section>

          {/* ── Stats row ─────────────────────────────────── */}
          <section className="dashboard-stats-row grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`card animate-fade-up stagger-${i + 1} flex items-center gap-4`}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${s.color}18`, color: s.color }}
                >
                  {s.icon}
                </div>
                <div>
                  <div
                    className="text-xl font-bold leading-none"
                    style={{ fontFamily: "var(--font-syne)", color: s.color }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-muted)" }}>
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* ── My Courses ────────────────────────────────── */}
          <section id="my-courses" className="animate-fade-up stagger-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-primary)" }}>
                كورساتي
              </h2>
              <Link href="/courses" id="view-all-courses" className="text-sm font-bold" style={{ color: "var(--accent)", fontFamily: "var(--font-cairo)" }}>
                عرض الكل
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CourseCard
                variant="enrolled"
                id="genetics-course"
                title="الأحياء — الوراثة والتطور"
                progress={68}
                lessonsTotal={60}
                lessonsDone={24}
                nextLesson="درس 25"
                rating={4.9}
                instructorName="مستر أحمد النجار"
                gradientFrom="#e8304a"
                gradientTo="#ff6b35"
              />
              <CourseCard
                variant="enrolled"
                id="genetic-prep-course"
                title="كورس الإعداد الجيني"
                progress={42}
                lessonsTotal={12}
                lessonsDone={5}
                nextLesson="درس 6"
                rating={4.7}
                instructorName="مستر أحمد النجار"
                gradientFrom="#3b82f6"
                gradientTo="#8b5cf6"
              />
            </div>
          </section>

          {/* ── Bottom grid: Schedule + Activity ─────────── */}
          <section className="dashboard-bottom-grid grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Schedule */}
            <div className="card animate-fade-up stagger-3">
              <h3 className="text-base font-bold mb-4" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-primary)" }}>
                الجلسات القادمة
              </h3>
              <div className="space-y-3">
                {SCHEDULE.map((item, i) => {
                  const s = typeStyles[item.type];
                  return (
                    <div
                      key={i}
                      id={`schedule-item-${i}`}
                      className="flex items-center gap-3 p-3 rounded-xl border"
                      style={{ borderColor: "var(--border-subtle)", background: "var(--bg-elevated)" }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: s.bg, color: s.color }}
                      >
                        {s.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold truncate" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-primary)" }}>
                          {item.title}
                        </div>
                        <div className="text-xs" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-muted)" }}>
                          {item.day} — {item.time}
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ background: s.bg, color: s.color, fontFamily: "var(--font-cairo)" }}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weekly activity chart */}
            <div className="card animate-fade-up stagger-4">
              <h3 className="text-base font-bold mb-4" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-primary)" }}>
                النشاط الأسبوعي
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={WEEKLY_ACTIVITY} barCategoryGap="30%">
                  <CartesianGrid vertical={false} stroke="var(--border-subtle)" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontFamily: "Cairo", fontSize: 11, fill: "var(--text-muted)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip content={<ActivityTooltip />} cursor={{ fill: "var(--border-subtle)" }} />
                  <Bar dataKey="mins" fill="var(--accent)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
