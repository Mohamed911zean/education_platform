"use client";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { BookOpen, Flame, Star, Clock, PlayCircle, Calendar, ChevronLeft, ArrowLeft } from "lucide-react";

const ENROLLED_COURSES = [
  { id: 1, title: "الأحياء — الصف الثالث الثانوي الكامل", progress: 68, lessons: 24, total: 60, subject: "أحياء", nextLesson: "الدرس 25: التكاثر الجنسي في الإنسان", lastStudied: "أمس" },
  { id: 2, title: "كورس الإعداد الجيني والتكاثر", progress: 42, lessons: 5, total: 12, subject: "أحياء", nextLesson: "الدرس 6: الطفرات الجينية", lastStudied: "منذ 3 أيام" },
];

const SCHEDULE = [
  { day: "السبت", time: "8:00 م", title: "مراجعة: وحدة الجهاز العصبي", type: "live" },
  { day: "الإثنين", time: "5:00 م", title: "حصة: التكاثر اللاجنسي", type: "lesson" },
  { day: "الثلاثاء", time: "9:00 م", title: "اختبار: وحدة الخلية", type: "exam" },
];

const STATS = [
  { icon: "🔥", value: 7, label: "أيام متواصلة", sub: "سلسلة المذاكرة", color: "var(--accent)" },
  { icon: "⭐", value: 240, label: "نقطة مكتسبة", sub: "↑ 50 هذا الأسبوع", color: "var(--accent-gold)" },
  { icon: "⏱", value: "8.5", label: "ساعة مذاكرة", sub: "هذا الأسبوع", color: "var(--accent-blue)" },
  { icon: "✅", value: 24, label: "درس مكتمل", sub: "↑ 12% هذا الأسبوع", color: "var(--accent-teal)" },
];

export default function DashboardPage() {
  const overallProgress = 72;
  const circumference = 2 * Math.PI * 45;

  return (
    <div dir="rtl" style={{ display: "flex", minHeight: "100vh", background: "var(--bg-base)" }}>
      <Sidebar />

      <main className="dashboard-layout" style={{ marginRight: 230, flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <DashboardNavbar breadcrumb={[{ label: "الرئيسية", href: "/dashboard" }, { label: "Dashboard" }]} />

        <div style={{ padding: "28px 28px 80px", display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Welcome banner */}
          <div style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-default)",
            borderRight: "4px solid var(--accent)",
            borderRadius: "var(--radius-lg)",
            padding: "24px 28px",
            display: "flex", alignItems: "center", gap: 24,
            flexWrap: "wrap",
          }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>
                👋 صباح الخير، أحمد
              </div>
              <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 14, color: "var(--text-secondary)" }}>
                عندك 3 دروس لازم تكملوا النهاردة — ابدأ دلوقتي!
              </div>
            </div>
            {/* Circular progress */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
              <svg width={90} height={90} className="progress-ring">
                <circle cx={45} cy={45} r={38} stroke="rgba(255,255,255,0.05)" strokeWidth={7} fill="none" />
                <circle
                  cx={45} cy={45} r={38}
                  stroke="var(--accent-teal)" strokeWidth={7} fill="none"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 38}
                  strokeDashoffset={2 * Math.PI * 38 * (1 - overallProgress / 100)}
                />
                <text x={45} y={50} textAnchor="middle"
                  style={{ fontFamily: "Cairo, sans-serif", fontSize: 16, fontWeight: 800, fill: "var(--text-primary)" }}>
                  {overallProgress}%
                </text>
              </svg>
              <div>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-muted)", marginBottom: 2 }}>إجمالي التقدم</div>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 11, color: "var(--text-secondary)" }}>3 دروس متبقية اليوم</div>
              </div>
            </div>
            <Link href="/courses" className="btn btn-primary" id="dashboard-continue-btn">
              استكمل التعلم ←
            </Link>
          </div>

          {/* Stats row */}
          <div className="dashboard-stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {STATS.map((s, i) => (
              <div key={i} className="card" style={{ padding: "20px", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontFamily: "Syne, var(--font-syne), sans-serif", fontSize: 28, fontWeight: 800, color: s.color, lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>{s.label}</div>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 11, color: "var(--text-muted)", marginTop: 3 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* My Courses */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontFamily: "Cairo, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text-primary)" }}>كورساتي</h2>
              <Link href="/courses" id="view-all-courses" style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--accent)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                عرض الكل <ArrowLeft size={14} />
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {ENROLLED_COURSES.map(course => (
                <div key={course.id} className="card" style={{ padding: "20px" }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: "var(--radius-md)",
                      background: "rgba(232,48,74,0.08)", border: "1px solid rgba(232,48,74,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <BookOpen size={24} color="var(--accent)" strokeWidth={1.5} />
                    </div>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>{course.title}</div>
                      <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-muted)", marginBottom: 12, display: "flex", alignItems: "center", gap: 5 }}>
                        <PlayCircle size={13} /> التالي: {course.nextLesson}
                      </div>
                      <div className="progress-track" style={{ marginBottom: 6 }}>
                        <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 11, color: "var(--text-muted)" }}>{course.lessons} / {course.total} درس</span>
                        <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 11, color: "var(--accent-teal)", fontWeight: 700 }}>{course.progress}%</span>
                      </div>
                    </div>
                    <Link href="/courses" className="btn btn-teal btn-sm" style={{ flexShrink: 0 }} id={`continue-course-${course.id}`}>
                      استكمل ←
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom grid */}
          <div className="dashboard-bottom-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Upcoming schedule */}
            <div className="card">
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
                <Calendar size={16} color="var(--accent)" />
                <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>الجدول القادم</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {SCHEDULE.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{
                      width: 48, borderRadius: "var(--radius-sm)",
                      background: s.type === "live" ? "rgba(232,48,74,0.1)" : s.type === "exam" ? "rgba(245,158,11,0.1)" : "rgba(59,130,246,0.1)",
                      border: `1px solid ${s.type === "live" ? "rgba(232,48,74,0.2)" : s.type === "exam" ? "rgba(245,158,11,0.2)" : "rgba(59,130,246,0.2)"}`,
                      padding: "6px 4px", textAlign: "center", flexShrink: 0,
                    }}>
                      <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 10, fontWeight: 700, color: "var(--text-muted)" }}>{s.day}</div>
                      <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 11, fontWeight: 800, color: "var(--text-primary)" }}>{s.time}</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</div>
                      <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 11, color: s.type === "live" ? "var(--accent)" : s.type === "exam" ? "var(--accent-gold)" : "var(--accent-blue)" }}>
                        {s.type === "live" ? "🔴 لايف" : s.type === "exam" ? "📝 اختبار" : "📖 درس"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly activity */}
            <div className="card">
              <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginBottom: 16 }}>
                نشاط الأسبوع
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 100 }}>
                {[
                  { day: "ح", mins: 90 }, { day: "ن", mins: 0 }, { day: "ث", mins: 150 },
                  { day: "ر", mins: 60 }, { day: "خ", mins: 120 }, { day: "ج", mins: 180 }, { day: "س", mins: 45 },
                ].map((d, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5, height: "100%" }}>
                    <div style={{
                      flex: 1, width: "100%", display: "flex", alignItems: "flex-end",
                    }}>
                      <div style={{
                        width: "100%",
                        height: d.mins > 0 ? `${Math.max(8, (d.mins / 180) * 80)}px` : "8px",
                        background: d.mins > 0 ? "var(--accent)" : "var(--bg-elevated)",
                        borderRadius: "4px 4px 0 0",
                        opacity: d.mins > 0 ? 0.85 : 0.4,
                      }} />
                    </div>
                    <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 10, color: "var(--text-muted)" }}>{d.day}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10, fontFamily: "Cairo, sans-serif", fontSize: 12, color: "var(--text-muted)", textAlign: "center" }}>
                إجمالي هذا الأسبوع: 8.5 ساعة مذاكرة
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
