"use client";

import { useState } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { DashboardNavbar } from "@/app/components/DashboardNavbar";
import { StatsDonut } from "@/app/components/shared/StatsDonut";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line
} from "recharts";
import { TrendingUp, Target, Award, Clock, BookOpen, CheckCircle } from "lucide-react";

/* ── Mock data ────────────────────────────────────────────── */
const UNIT_PROGRESS = [
  { subject: "الوراثة والبيولوجيا الجزيئية", progress: 85, total: 100, color: "#10b981", examsAvg: "88%" },
  { subject: "التكاثر في الكائنات الحية", progress: 45, total: 100, color: "#3b82f6", examsAvg: "72%" },
  { subject: "الدعامة والحركة", progress: 100, total: 100, color: "#f59e0b", examsAvg: "95%" },
];

const RECENT_SCORES = [
  { test: "اختبار شامل على التكاثر", subject: "أحياء 3ث", score: 18, total: 20, date: "٢ مارس" },
  { test: "تسميع الدعامة في النبات", subject: "أحياء 3ث", score: 14, total: 20, date: "٢٨ فبراير" },
  { test: "اختبار DNA والـ RNA", subject: "أحياء 3ث", score: 19, total: 20, date: "٢٥ فبراير" },
  { test: "امتحان شامل على الباب الأول", subject: "أحياء 3ث", score: 45, total: 50, date: "٢٠ فبراير" },
];

const WEEKLY_HOURS = [
  { day: "السبت", hours: 3 },
  { day: "الأحد", hours: 2 },
  { day: "الإثنين", hours: 4 },
  { day: "الثلاثاء", hours: 1.5 },
  { day: "الأربعاء", hours: 3.5 },
  { day: "الخميس", hours: 2 },
  { day: "الجمعة", hours: 5 },
];

export default function ProgressPage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]" dir="rtl">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <DashboardNavbar breadcrumb={[{ label: "الرئيسية", href: "/dashboard" }, { label: "تقدمي" }]} />

        <main className="flex-1 p-4 pb-24 md:p-6 lg:p-8 overflow-y-auto space-y-8 max-w-6xl mx-auto w-full">
          
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent)] text-white flex items-center justify-center shadow-md shadow-[var(--shadow-glow)]">
              <TrendingUp size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-cairo">تقرير التقدم الشامل</h1>
              <p className="text-sm text-[var(--text-muted)] font-cairo mt-1">تتبع مستواك الدراسي وأدائك في جميع المواد</p>
            </div>
          </div>

          {/* Top Overview Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Target size={22} />, title: "متوسط الدرجات", value: "82%", subtitle: "أعلى بـ 15% من الدفعة", color: "#e8304a" },
              { icon: <CheckCircle size={22} />, title: "الدروس المكتملة", value: "48", subtitle: "درس من أصل 120", color: "#10b981" },
              { icon: <Clock size={22} />, title: "ساعات التعلم", value: "86", subtitle: "ساعة هذا الشهر", color: "#3b82f6" },
              { icon: <Award size={22} />, title: "الترتيب", value: "الـ 12", subtitle: "على مستوى مدرستك", color: "#f59e0b" },
            ].map((stat, i) => (
              <div key={i} className="bg-[var(--bg-surface)] p-5 rounded-2xl border border-[var(--border-default)] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="text-sm font-bold font-cairo text-[var(--text-secondary)]">{stat.title}</div>
                </div>
                <div className="text-3xl font-bold font-syne mb-1" style={{ color: "var(--text-primary)" }}>{stat.value}</div>
                <div className="text-xs text-[var(--text-muted)] font-cairo">{stat.subtitle}</div>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Subject Progress */}
            <section className="lg:col-span-2 space-y-6">
              <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-default)] shadow-sm">
                <h2 className="text-lg font-bold font-cairo mb-6">التقدم في وحدات الأحياء</h2>
                <div className="space-y-6">
                  {UNIT_PROGRESS.map((sub, i) => (
                    <div key={i} className="bg-[var(--bg-base)] p-4 rounded-xl border border-[var(--border-subtle)]">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <BookOpen size={18} style={{ color: sub.color }} />
                          <span className="font-bold font-cairo text-[var(--text-primary)]">{sub.subject}</span>
                        </div>
                        <div className="text-sm font-bold font-syne" style={{ color: sub.color }}>{sub.progress}%</div>
                      </div>
                      
                      <div className="h-2.5 w-full bg-[var(--bg-elevated)] rounded-full overflow-hidden mb-3">
                        <div 
                          className="h-full rounded-full transition-all duration-1000" 
                          style={{ width: `${sub.progress}%`, backgroundColor: sub.color }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-xs text-[var(--text-muted)] font-cairo">
                        <span>متوسط الاختبارات: <strong className="text-[var(--text-primary)]">{sub.examsAvg}</strong></span>
                        <span>باقي {sub.total - sub.progress}% للانتهاء</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Hours Chart */}
              <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-default)] shadow-sm">
                <h2 className="text-lg font-bold font-cairo mb-6">معدل التعلم هذا الأسبوع</h2>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={WEEKLY_HOURS} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted)", fontFamily: "Cairo" }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted)", fontFamily: "Cairo" }} />
                      <Tooltip 
                        cursor={{ fill: "var(--bg-elevated)" }}
                        contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-default)', fontFamily: 'Cairo', backgroundColor: 'var(--bg-surface)' }}
                      />
                      <Bar dataKey="hours" name="ساعات التعلم" fill="var(--accent)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* Right Column: Recent Scores & Overall rate */}
            <section className="space-y-6">
              
              <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-default)] shadow-sm flex flex-col items-center">
                <h2 className="text-lg font-bold font-cairo mb-6 self-start">معدل الإنجاز العام</h2>
                <div className="mb-4">
                  <StatsDonut
                    label="الكورسات المكتملة"
                    sub=""
                    watched={48}
                    total={120}
                    color="var(--accent)"
                  />
                </div>
                <p className="text-center text-sm font-cairo text-[var(--text-secondary)] mt-2">
                  أنت تسير بمعدل ممتاز! استمر لإنهاء المنهج قبل المراجعة النهائية بـ ٣ أسابيع.
                </p>
              </div>

              <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-default)] shadow-sm overflow-hidden">
                <div className="p-5 border-b border-[var(--border-default)] bg-[var(--bg-elevated)] flex justify-between items-center">
                  <h2 className="text-lg font-bold font-cairo">آخر الاختبارات</h2>
                  <span className="text-xs font-bold text-[var(--accent)] font-cairo cursor-pointer hover:underline">عرض السجل كاملاً</span>
                </div>
                <div className="divide-y divide-[var(--border-subtle)]">
                  {RECENT_SCORES.map((score, i) => {
                    const percentage = (score.score / score.total) * 100;
                    let color = "#10b981"; // green
                    if (percentage < 50) color = "#e8304a"; // red
                    else if (percentage < 80) color = "#f59e0b"; // yellow
                    
                    return (
                      <div key={i} className="p-4 hover:bg-[var(--bg-elevated)] transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-bold text-sm font-cairo text-[var(--text-primary)] mb-1">{score.test}</div>
                            <div className="text-xs text-[var(--text-muted)] font-cairo flex items-center gap-2">
                              <span>{score.subject}</span>
                              <span className="w-1 h-1 rounded-full bg-[var(--border-strong)]"></span>
                              <span>{score.date}</span>
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="font-syne font-bold text-lg" style={{ color }}>
                              {score.score}<span className="text-xs text-[var(--text-muted)]">/{score.total}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
