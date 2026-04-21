"use client";

import { useState, use } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { DashboardNavbar } from "@/app/components/DashboardNavbar";
import { Play, CheckCircle2, Lock, FileText, Download, Award, Clock } from "lucide-react";

const CURRICULUM = [
  {
    sectionId: "sec-1",
    title: "مقدمة عن الوراثة والتطور",
    lessons: [
      { id: "les-1", title: "تاريخ علم الوراثة المندلية", duration: "18:45", completed: true, isFree: true },
      { id: "les-2", title: "المفاهيم الأساسية للكروموسومات", duration: "24:10", completed: true, isFree: true },
    ]
  },
  {
    sectionId: "sec-2",
    title: "تطبيقات الوراثة في حياتنا",
    lessons: [
      { id: "les-3", title: "الوراثة اللا-مندلية والتفاعلات الجينية", duration: "32:15", completed: false, isFree: false },
      { id: "les-4", title: "الطفرات الجينية المستحدثة", duration: "28:50", completed: false, isFree: false },
      { id: "les-5", title: "امتحان نهاية الفصل الأول", duration: "45:00", completed: false, isFree: false, type: "exam" },
    ]
  },
  {
    sectionId: "sec-3",
    title: "الهندسة الوراثية المتقدمة",
    lessons: [
      { id: "les-6", title: "تكنولوجيا الحمض النووي المعاد اتحاده", duration: "41:20", completed: false, isFree: false },
      { id: "les-7", title: "التطبيقات الطبية والزراعية المعاصرة", duration: "38:15", completed: false, isFree: false },
    ]
  }
];

export default function SingleCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("curriculum");
  const [activeLesson, setActiveLesson] = useState(CURRICULUM[0].lessons[0].id);

  // Unwrap params using `use()` since in Next.js 15 App router `params` is a Promise.
  const resolvedParams = use(params);

  // Find the active lesson object to display its title
  const currentLessonData = CURRICULUM.flatMap(s => s.lessons).find(l => l.id === activeLesson);

  return (
    <div className="flex min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]" dir="rtl">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <DashboardNavbar breadcrumb={[{ label: "الكورسات", href: "/courses" }, { label: "كورس الأحياء" }]} />

        <main className="flex-1 p-4 pb-24 md:p-6 lg:p-8 overflow-y-auto w-full">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
            
            {/* ── Left Column (Video + Details) ── */}
            <div className="flex-1 space-y-6">
              
              {/* Video Player Skeleton */}
              <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-md group">
                 {/* Placeholder UI */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-overlay)] group-hover:bg-[var(--bg-elevated)] transition-colors duration-300">
                    <button className="w-16 h-16 rounded-full bg-[var(--accent)] text-white flex items-center justify-center mb-4 shadow-lg transform transition-transform group-hover:scale-110">
                       <Play size={28} className="ml-1" />
                    </button>
                    <p className="font-cairo font-bold text-white tracking-wide text-lg">
                      {currentLessonData?.title || "تحميل الدرس..."}
                    </p>
                    <p className="font-syne text-[var(--text-muted)] text-sm">محتوى مسجل</p>
                 </div>
                 
                 {/* Mock Player Controls Bar */}
                 <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[var(--bg-surface)] opacity-50">
                   <div className="h-full bg-[var(--accent)] w-1/3 pulse-dot"></div>
                 </div>
              </div>

              {/* Course Title & Mobile Actions */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold font-cairo">الوراثة والبيولوجيا الجزيئية</h1>
                </div>
                <p className="text-[var(--text-muted)] font-cairo text-sm leading-relaxed mb-6">
                  مستر أحمد النجار يشرح مادة الأحياء للصف الثالث الثانوي. كورس متكامل يشمل حل أسئلة بنك المعرفة.
                </p>
                
                {/* Mobile Tabs */}
                <div className="lg:hidden flex border-b border-[var(--border-subtle)] overflow-x-auto no-scrollbar mb-6">
                  <button onClick={() => setActiveTab("curriculum")} className={`px-4 py-3 font-cairo font-bold text-sm whitespace-nowrap border-b-2 ${activeTab === "curriculum" ? "border-[var(--accent)] text-[var(--accent)]" : "border-transparent text-[var(--text-muted)]"}`}>المنهج الدراسي</button>
                  <button onClick={() => setActiveTab("overview")} className={`px-4 py-3 font-cairo font-bold text-sm whitespace-nowrap border-b-2 ${activeTab === "overview" ? "border-[var(--accent)] text-[var(--accent)]" : "border-transparent text-[var(--text-muted)]"}`}>نظرة عامة</button>
                  <button onClick={() => setActiveTab("resources")} className={`px-4 py-3 font-cairo font-bold text-sm whitespace-nowrap border-b-2 ${activeTab === "resources" ? "border-[var(--accent)] text-[var(--accent)]" : "border-transparent text-[var(--text-muted)]"}`}>المرفقات</button>
                </div>
              </div>

              {/* Tab Content Display (for Desktop this is always Overview/Resources under the video. For Mobile it switches) */}
              <div className={`space-y-8 ${activeTab === "curriculum" ? "hidden lg:block" : "block"}`}>
                 <section className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-default)] shadow-sm">
                   <h2 className="text-lg font-bold font-cairo mb-4 border-b border-[var(--border-subtle)] pb-2 flex items-center gap-2">
                     <Award size={18} className="text-[var(--accent)]" /> 
                     ماذا ستتعلم؟
                   </h2>
                   <ul className="grid sm:grid-cols-2 gap-3">
                     {[
                       "فهم قوانين الوراثة وحل المسائل المعقدة",
                       "التعرف على تركيب الـ DNA و RNA",
                       "فهم الطفرات وأسبابها وطرق علاجها",
                       "تحليل أسئلة النظام الجديد وتقييمها",
                     ].map((item, i) => (
                       <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)] font-cairo">
                         <CheckCircle2 size={16} className="text-[#10b981] mt-0.5 flex-shrink-0" />
                         <span>{item}</span>
                       </li>
                     ))}
                   </ul>
                 </section>

                 <section className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-default)] shadow-sm">
                   <h2 className="text-lg font-bold font-cairo mb-4 border-b border-[var(--border-subtle)] pb-2 flex items-center gap-2">
                     <Download size={18} className="text-[var(--accent-blue)]" /> 
                     المرفقات
                   </h2>
                   <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[rgba(59,130,246,0.1)] text-[#3b82f6] flex items-center justify-center">
                            <FileText size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold font-cairo">مذكرة الوراثة (الباب الأول)</p>
                            <p className="text-xs text-[var(--text-muted)] font-syne mt-0.5">PDF · 4.2 MB</p>
                          </div>
                        </div>
                        <Download size={16} className="text-[var(--text-muted)]" />
                      </div>
                   </div>
                 </section>
              </div>

            </div>

            {/* ── Right Column (Curriculum / Playlist) ── */}
            <div className={`w-full lg:w-96 flex-shrink-0 ${activeTab !== "curriculum" ? "hidden lg:block" : "block"}`}>
              <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl shadow-sm overflow-hidden sticky top-24">
                
                <div className="p-5 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                  <h2 className="text-lg font-bold font-cairo">محتوى الكورس</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs font-syne text-[var(--text-muted)]">7 دروس</span>
                    <span className="text-xs font-syne text-[var(--text-muted)] flex items-center gap-1">
                      <Clock size={12} /> 12 ساعة
                    </span>
                  </div>
                </div>

                <div className="max-h-[600px] overflow-y-auto">
                  {CURRICULUM.map((section, idx) => (
                    <div key={section.sectionId} className="border-b border-[var(--border-subtle)] last:border-0">
                      
                      {/* Section Header */}
                      <div className="p-4 bg-[var(--bg-surface)] font-bold text-sm font-cairo text-[var(--text-primary)]">
                        الوحدة {idx + 1}: {section.title}
                      </div>

                      {/* Lessons List */}
                      <div className="bg-[var(--bg-elevated)]">
                        {section.lessons.map((lesson) => {
                          const isActive = activeLesson === lesson.id;
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => {
                                if (lesson.isFree || lesson.completed || resolvedParams.id) {
                                  setActiveLesson(lesson.id);
                                }
                              }}
                              className={`w-full text-right flex items-start gap-3 p-4 transition-colors border-l-4 ${isActive ? "bg-[rgba(232,48,74,0.06)] border-[var(--accent)]" : "border-transparent hover:bg-[var(--bg-surface)]"}`}
                            >
                              <div className="mt-0.5 flex-shrink-0 text-[var(--text-muted)]">
                                {lesson.type === 'exam' ? (
                                   <FileText size={16} className={isActive ? "text-[var(--accent)]" : ""} />
                                ) : lesson.completed || lesson.isFree ? (
                                  isActive ? <Play size={16} className="text-[var(--accent)] fill-current" /> : <Play size={16} />
                                ) : (
                                  <Lock size={16} />
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-cairo ${isActive ? "font-bold text-[var(--accent)]" : "font-semibold text-[var(--text-secondary)]"} truncate`}>
                                  {lesson.title}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  {lesson.completed && <CheckCircle2 size={12} className="text-[#10b981]" />}
                                  <span className="text-xs font-syne text-[var(--text-muted)]">{lesson.duration}</span>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
