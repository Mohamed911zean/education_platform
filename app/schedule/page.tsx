"use client";

import { useState } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { DashboardNavbar } from "@/app/components/DashboardNavbar";
import { Calendar, Video, Clock, CheckCircle2, Plus, Play, MoreHorizontal } from "lucide-react";
import Link from "next/link";

// Types
type TaskType = "live" | "study" | "exam" | "revision";

interface ScheduleTask {
  id: string;
  title: string;
  time: string;
  duration: string;
  type: TaskType;
  completed: boolean;
  unit?: string;
  isImportant?: boolean;
}

// Mock Data
const DAYS = [
  { id: "sat", label: "السبت", date: "٦ أبريل" },
  { id: "sun", label: "الأحد", date: "٧ أبريل" },
  { id: "mon", label: "الإثنين", date: "٨ أبريل" },
  { id: "tue", label: "الثلاثاء", date: "٩ أبريل" },
  { id: "wed", label: "الأربعاء", date: "١٠ أبريل" },
  { id: "thu", label: "الخميس", date: "١١ أبريل" },
  { id: "fri", label: "الجمعة", date: "١٢ أبريل" },
];

const SCHEDULE_DATA: Record<string, ScheduleTask[]> = {
  sat: [
    { id: "1", title: "مراجعة الدعامة في النبات", time: "10:00 ص", duration: "ساعة ونصف", type: "study", completed: true, unit: "الدعامة والحركة" },
    { id: "2", title: "حصة المراجعة المباشرة", time: "8:00 م", duration: "ساعتان", type: "live", completed: false, unit: "البيولوجيا الجزيئية", isImportant: true },
  ],
  sun: [
    { id: "3", title: "مذاكرة التكاثر اللاجنسي", time: "4:00 م", duration: "ساعتان", type: "study", completed: false, unit: "التكاثر" },
    { id: "4", title: "حل أسئلة بنك المعرفة", time: "7:00 م", duration: "ساعة", type: "revision", completed: false, unit: "التكاثر" },
  ],
  mon: [
    { id: "5", title: "امتحان شامل", time: "5:00 م", duration: "ساعة", type: "exam", completed: false, unit: "المناعة", isImportant: true },
  ],
  tue: [],
  wed: [
    { id: "6", title: "مراجعة DNA", time: "3:00 م", duration: "3 ساعات", type: "study", completed: false, unit: "البيولوجيا الجزيئية" },
  ],
  thu: [
    { id: "7", title: "حصة الأحياء الأسبوعية", time: "7:00 م", duration: "ساعتان", type: "live", completed: false, unit: "الوراثة", isImportant: true },
  ],
  fri: [
    { id: "8", title: "مراجعة أخطاء الأسبوع", time: "2:00 م", duration: "ساعة", type: "revision", completed: false, unit: "عام" },
  ],
};

const TYPE_STYLES = {
  live: { color: "var(--accent)", bg: "rgba(232,48,74,0.1)", icon: <Video size={18} />, label: "حصة مباشرة" },
  study: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)", icon: <BookOpenIcon />, label: "مذاكرة دروس" },
  exam: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: <Calendar size={18} />, label: "اختبار" },
  revision: { color: "#10b981", bg: "rgba(16,185,129,0.1)", icon: <CheckCircle2 size={18} />, label: "تدريب" },
};

function BookOpenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}

export default function SchedulePage() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeDay, setActiveDay] = useState("sat");

  const todayTasks = SCHEDULE_DATA[activeDay] || [];

  return (
    <div className="flex min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]" dir="rtl">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <DashboardNavbar breadcrumb={[{ label: "الرئيسية", href: "/dashboard" }, { label: "جدول المذاكرة" }]} />

        <main className="flex-1 p-4 pb-24 md:p-6 lg:p-8 overflow-y-auto space-y-8 max-w-5xl mx-auto w-full">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-cairo">جدول المذاكرة الأسبوعي</h1>
              <p className="text-sm text-[var(--text-muted)] font-cairo mt-1">نظم وقتك وتابع مواعيد الحصص المباشرة والاختبارات</p>
            </div>
            <button className="btn btn-primary btn-sm flex-shrink-0 self-start sm:self-auto shadow-sm">
              <Plus size={16} />
              إضافة مهمة مذاكرة
            </button>
          </div>

          {/* ── Weekly Horizontal Navigation ── */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-2 shadow-sm overflow-x-auto no-scrollbar">
            <div className="flex justify-between min-w-[600px]">
              {DAYS.map((day) => {
                const isActive = activeDay === day.id;
                const hasImportant = SCHEDULE_DATA[day.id]?.some(t => t.isImportant);
                
                return (
                  <button
                    key={day.id}
                    onClick={() => setActiveDay(day.id)}
                    className={`
                      flex-1 flex flex-col items-center justify-center p-3 rounded-xl transition-all relative
                      ${isActive 
                        ? "bg-[var(--accent)] text-white shadow-md scale-[1.02]" 
                        : "hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }
                    `}
                  >
                    <span className={`text-xs font-bold mb-1 font-cairo opacity-90`}>{day.label}</span>
                    <span className={`text-sm font-syne font-bold`}>{day.date}</span>
                    
                    {!isActive && hasImportant && (
                      <span className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Daily Schedule View ── */}
          <div className="animate-fade-up">
            <div className="flex items-center justify-between mb-5 px-1">
              <h2 className="text-lg font-bold font-cairo text-[var(--text-primary)] flex items-center gap-2">
                مهام 
                <span className="text-[var(--accent)]">
                  {DAYS.find(d => d.id === activeDay)?.label}
                </span>
                <span className="text-sm font-normal text-[var(--text-muted)] font-syne mr-1">
                  ({todayTasks.length})
                </span>
              </h2>
            </div>

            {todayTasks.length === 0 ? (
              <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
                 <div className="w-16 h-16 bg-[var(--bg-elevated)] rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} className="text-[var(--border-strong)]" />
                 </div>
                 <h3 className="text-lg font-bold font-cairo text-[var(--text-primary)] mb-1">يوم استراحة!</h3>
                 <p className="text-sm text-[var(--text-muted)] font-cairo max-w-sm">لا توجد مهام أو حصص مسجلة في هذا اليوم. يمكنك إضافة مهام للمراجعة أو أخذ قسط من الراحة.</p>
              </div>
            ) : (
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[var(--border-default)] before:via-[var(--border-default)] before:to-transparent">
                {todayTasks.map((task, index) => {
                  const style = TYPE_STYLES[task.type];
                  return (
                    <div key={task.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group select-none">
                      
                      {/* Timeline Dot */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[var(--bg-base)] bg-[var(--bg-surface)] shadow-sm absolute left-0 md:left-1/2 -ml-5 md:-ml-5 transition-transform group-hover:scale-110 z-10">
                        {task.completed ? (
                          <div className="w-full h-full rounded-full flex items-center justify-center bg-[#10b981] text-white">
                            <CheckCircle2 size={16} />
                          </div>
                        ) : (
                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: style.color }} />
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="w-full pl-8 md:pl-0 md:w-5/12 mx-2">
                        <div className={`
                          bg-[var(--bg-surface)] p-5 rounded-2xl border transition-all shadow-sm
                          ${task.completed ? "border-[var(--border-default)] opacity-70" : "border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:shadow-md"}
                          ${task.isImportant && !task.completed ? "ring-1 ring-[var(--accent)] ring-opacity-50" : ""}
                        `}>
                          <div className="flex justify-between items-start mb-3">
                            <span className="flex items-center gap-1.5 text-xs font-bold font-cairo px-2.5 py-1 rounded-lg" style={{ backgroundColor: style.bg, color: style.color }}>
                               {style.icon}
                               {style.label}
                            </span>
                            <div className="p-1 rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] cursor-pointer transition-colors">
                              <MoreHorizontal size={16} />
                            </div>
                          </div>

                          <h3 className={`text-base font-bold font-cairo mb-1.5 ${task.completed ? "line-through text-[var(--text-secondary)]" : "text-[var(--text-primary)]"}`}>
                            {task.title}
                          </h3>
                          
                          {task.unit && (
                            <p className="text-xs text-[var(--text-muted)] font-cairo mb-4 border-r-2 border-[var(--border-strong)] pr-2">
                              {task.unit}
                            </p>
                          )}

                          <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 mt-auto">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-syne font-medium">
                                <Clock size={14} />
                                {task.time}
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-syne font-medium">
                                <Play size={14} />
                                {task.duration}
                              </div>
                            </div>
                            
                            {!task.completed && task.type !== 'live' && (
                              <button className="w-6 h-6 rounded-full border-2 border-[var(--border-strong)] hover:border-[#10b981] flex items-center justify-center transition-colors">
                                <div className="w-0 h-0 border-transparent text-transparent group-hover:text-[#10b981]" />
                              </button>
                            )}
                            {!task.completed && task.type === 'live' && (
                              <Link href={`/courses/live/${task.id}`} className="text-xs font-bold font-cairo text-white bg-[var(--accent)] px-3 py-1.5 rounded-lg hover:bg-[var(--accent-hover)] transition-colors">
                                انضمام للغرفة
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
        </main>
      </div>
    </div>
  );
}
