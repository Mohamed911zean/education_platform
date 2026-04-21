"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/app/components/Sidebar";
import { DashboardNavbar } from "@/app/components/DashboardNavbar";
import { CourseCard } from "@/app/components/shared/CourseCard";
import { Flame, Star, Clock, CheckCircle, ArrowLeft, Video, Calendar, BookOpen, ChevronLeft } from "lucide-react";

/* ── Mock data ────────────────────────────────────────────── */
const STATS = [
  { icon: <Flame size={24} />, label: "أيام دراسة متواصلة", value: "7", color: "#e8304a" },
  { icon: <CheckCircle size={24} />, label: "دروس مكتملة", value: "24", color: "#10b981" },
  { icon: <Clock size={24} />, label: "ساعات دراسة", value: "8.5", color: "#3b82f6" },
  { icon: <Star size={24} />, label: "النقاط", value: "240", color: "#f59e0b" },
];

const SCHEDULE = [
  { day: "اليوم", time: "8:00 م", title: "مراجعة الجهاز العصبي", type: "live" as const },
  { day: "غداً", time: "5:00 م", title: "اختبار وحدة الخلية", type: "exam" as const },
];

const typeStyles = {
  live:   { bg: "rgba(232,48,74,0.1)",   color: "#e8304a",   label: "مباشر",   icon: <Video size={16} /> },
  lesson: { bg: "rgba(59,130,246,0.1)",  color: "#3b82f6",  label: "درس",     icon: <BookOpen size={16} /> },
  exam:   { bg: "rgba(245,158,11,0.1)",  color: "#f59e0b",  label: "اختبار",  icon: <Calendar size={16} /> },
};

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]" dir="rtl">
      {/* ── Sidebar (Sticky & in normal document flow) ── */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <DashboardNavbar breadcrumb={[{ label: "الرئيسية" }]} />

        <main className="flex-1 p-4 pb-24 md:p-6 lg:p-8 overflow-y-auto w-full">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* ── 1. Clear Focus / Welcome Banner ── */}
            <section 
              className="relative overflow-hidden rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
              style={{ background: "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%)", border: "1px solid var(--border-default)" }}
            >
              <div className="flex-1 text-center sm:text-right">
                <p className="text-[var(--text-muted)] text-sm sm:text-base font-medium mb-1 font-cairo">مرحباً بعودتك يا أحمد 👋</p>
                <h1 className="text-2xl sm:text-3xl font-bold mb-3 font-cairo text-[var(--text-primary)]">أنت تقدم أداءً رائعاً هذا الأسبوع!</h1>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base font-cairo mb-6 max-w-lg">
                  لقد أنجزت 3 دروس من كورس الأحياء. دعنا نكمل من حيث توقفت للوصول إلى هدفك.
                </p>
                
                <Link 
                  href="/courses/biology" 
                  className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-sm active:scale-95 font-cairo w-full sm:w-auto"
                >
                  استكمال: الوراثة والتطور
                  <ArrowLeft size={16} />
                </Link>
              </div>

              {/* Simple visual progress indicator instead of complex charts */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-[var(--bg-base)] bg-white dark:bg-[var(--bg-surface)] shadow-sm relative">
                 <div className="absolute inset-0 rounded-full border-[6px] border-[var(--border-subtle)]"></div>
                 <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                   <circle cx="50%" cy="50%" r="46%" fill="none" stroke="var(--accent)" strokeWidth="6" strokeDasharray="100 100" strokeLinecap="round" />
                 </svg>
                 <span className="text-3xl font-bold font-syne text-[var(--text-primary)]">68%</span>
                 <span className="text-xs text-[var(--text-muted)] font-cairo mt-1">كورس الأحياء</span>
              </div>
            </section>

            {/* ── 2. Top Priorities (Schedule & Stats) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Stats - responsive grid */}
              <section className="lg:col-span-2 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-4">
                {STATS.map((s, i) => (
                  <div key={i} className="flex flex-col p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm transition-all hover:shadow-md">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${s.color}15`, color: s.color }}>
                      {s.icon}
                    </div>
                    <div className="text-2xl font-bold font-syne text-[var(--text-primary)] leading-none mb-1">{s.value}</div>
                    <div className="text-sm font-medium font-cairo text-[var(--text-muted)]">{s.label}</div>
                  </div>
                ))}
              </section>

              {/* Schedule / Next Up */}
              <section className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-5 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold font-cairo text-[var(--text-primary)]">المهام القادمة</h2>
                  <Link href="/schedule" className="text-sm font-bold text-[var(--accent)] font-cairo hover:underline">عرض الجدول</Link>
                </div>
                
                <div className="flex-1 space-y-3">
                  {SCHEDULE.map((item, i) => {
                    const s = typeStyles[item.type];
                    return (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] transition-colors hover:border-[var(--border-default)] cursor-pointer">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: s.bg, color: s.color }}>
                          {s.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold font-cairo text-[var(--text-primary)] mb-1 truncate">{item.title}</h3>
                          <div className="text-xs font-cairo text-[var(--text-muted)] flex items-center gap-1.5">
                            <span className="font-bold flex items-center gap-1" style={{ color: s.color }}>
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }}></span>
                              {s.label}
                            </span>
                            <span>•</span>
                            <span>{item.day}، {item.time}</span>
                          </div>
                        </div>
                        <ChevronLeft size={16} className="text-[var(--text-muted)] self-center" />
                      </div>
                    );
                  })}
                </div>
              </section>

            </div>

            {/* ── 3. Quick Access to Ongoing Courses ── */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold font-cairo text-[var(--text-primary)]">كورساتي الحالية</h2>
                <Link href="/courses" className="text-sm font-bold text-[var(--accent)] font-cairo flex items-center gap-1 hover:gap-2 transition-all">
                  عرض جميع الكورسات <ArrowLeft size={14} />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CourseCard
                  variant="enrolled"
                  id="genetics-course"
                  title="الأحياء — الوراثة والتطور"
                  progress={68}
                  lessonsTotal={60}
                  lessonsDone={24}
                  nextLesson="الدرس 25: الطفرات الجينية"
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
                  nextLesson="الدرس 6: تطبيقات الجينوم"
                  rating={4.7}
                  instructorName="مستر أحمد النجار"
                  gradientFrom="#3b82f6"
                  gradientTo="#8b5cf6"
                />
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
