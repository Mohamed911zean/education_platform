"use client";

import { useState, useMemo } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { DashboardNavbar } from "@/app/components/DashboardNavbar";
import { CourseCard } from "@/app/components/shared/CourseCard";
import { Search, LayoutGrid, List } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────── */
interface Course {
  id: string;
  title: string;
  subtitle: string;
  variant: "enrolled" | "catalog";
  grade?: string;
  subject?: string;
  price?: number;
  originalPrice?: number;
  isLive?: boolean;
  isNew?: boolean;
  duration?: string;
  rating: number;
  reviews?: number;
  progress?: number;
  lessonsTotal?: number;
  lessonsDone?: number;
  nextLesson?: string;
  instructorName: string;
  gradientFrom?: string;
  gradientTo?: string;
}

/* ── Mock data ─────────────────────────────────────────────── */
const ENROLLED: Course[] = [
  {
    id: "genetics-course", variant: "enrolled",
    title: "الأحياء — الوراثة والتطور", subtitle: "الصف الثالث الثانوي",
    grade: "الصف الثالث", subject: "أحياء",
    progress: 68, lessonsTotal: 60, lessonsDone: 24, nextLesson: "درس 25",
    rating: 4.9, instructorName: "مستر أحمد النجار",
    gradientFrom: "#e8304a", gradientTo: "#ff6b35",
  },
  {
    id: "genetic-prep", variant: "enrolled",
    title: "كورس الإعداد الجيني", subtitle: "الصف الثالث الثانوي",
    grade: "الصف الثالث", subject: "أحياء",
    progress: 42, lessonsTotal: 12, lessonsDone: 5, nextLesson: "درس 6",
    rating: 4.7, instructorName: "مستر أحمد النجار",
    gradientFrom: "#3b82f6", gradientTo: "#8b5cf6",
  },
  {
    id: "cell-unit", variant: "enrolled",
    title: "وحدة الخلية الحية", subtitle: "الصف الأول الثانوي",
    grade: "الصف الأول", subject: "أحياء",
    progress: 91, lessonsTotal: 22, lessonsDone: 20, nextLesson: "درس 21",
    rating: 4.8, instructorName: "مستر أحمد النجار",
    gradientFrom: "#10b981", gradientTo: "#34d399",
  },
];

const AVAILABLE: Course[] = [
  {
    id: "physics-elec", variant: "catalog",
    title: "فيزياء الكهرباء", subtitle: "الصف الثالث",
    grade: "الصف الثالث", subject: "فيزياء",
    price: 279, originalPrice: 380, isLive: true,
    rating: 4.8, reviews: 340, duration: "32 ساعة",
    instructorName: "مستر كريم عادل",
    gradientFrom: "#3b82f6", gradientTo: "#6366f1",
  },
  {
    id: "bio-cell", variant: "catalog",
    title: "أحياء الخلية", subtitle: "الصف الأول",
    grade: "الصف الأول", subject: "أحياء",
    price: 199, originalPrice: 280, isNew: true,
    rating: 4.6, reviews: 210, duration: "18 ساعة",
    instructorName: "مستر أحمد النجار",
    gradientFrom: "#10b981", gradientTo: "#34d399",
  },
  {
    id: "chem-organic", variant: "catalog",
    title: "كيمياء عضوية", subtitle: "الصف الثالث",
    grade: "الصف الثالث", subject: "كيمياء",
    rating: 4.9, reviews: 512, duration: "40 ساعة",
    instructorName: "مستر محمد عزيز",
    gradientFrom: "#f59e0b", gradientTo: "#fb923c",
  },
  {
    id: "math-trig", variant: "catalog",
    title: "رياضيات — مثلثات", subtitle: "الصف الثاني",
    grade: "الصف الثاني", subject: "رياضيات",
    price: 249, originalPrice: 350,
    rating: 4.4, reviews: 175, duration: "24 ساعة",
    instructorName: "مستر وليد فتحي",
    gradientFrom: "#8b5cf6", gradientTo: "#7c3aed",
  },
  {
    id: "physics-mech", variant: "catalog",
    title: "فيزياء ميكانيكا", subtitle: "الصف الثاني",
    grade: "الصف الثاني", subject: "فيزياء",
    price: 229, originalPrice: 320,
    rating: 4.7, reviews: 290, duration: "28 ساعة",
    instructorName: "مستر كريم عادل",
    gradientFrom: "#06b6d4", gradientTo: "#0ea5e9",
  },
  {
    id: "geology", variant: "catalog",
    title: "جيولوجيا — الصخور والتضاريس", subtitle: "الصف الثالث",
    grade: "الصف الثالث", subject: "جيولوجيا",
    rating: 4.3, reviews: 88, duration: "16 ساعة",
    instructorName: "مستر سامر يوسف",
    gradientFrom: "#92400e", gradientTo: "#b45309",
  },
];

const GRADES = ["الكل", "الصف الأول", "الصف الثاني", "الصف الثالث"];
const SUBJECTS = ["الكل", "أحياء", "فيزياء", "كيمياء", "رياضيات", "جيولوجيا", "أخرى"];

/* ── Page ──────────────────────────────────────────────────── */
export default function CoursesPage() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 56 : 230;

  const [gradeFilter, setGradeFilter] = useState("الكل");
  const [subjectFilter, setSubjectFilter] = useState("الكل");
  const [search, setSearch] = useState("");
  const [gridView, setGridView] = useState(true);

  const filteredAvailable = useMemo(() => {
    return AVAILABLE.filter((c) => {
      const matchGrade = gradeFilter === "الكل" || c.grade === gradeFilter;
      const matchSubject = subjectFilter === "الكل" || c.subject === subjectFilter;
      const matchSearch = search.trim() === "" || c.title.includes(search) || c.subtitle?.includes(search);
      return matchGrade && matchSubject && matchSearch;
    });
  }, [gradeFilter, subjectFilter, search]);

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div
        className="dashboard-layout transition-all duration-200"
        style={{ paddingRight: sidebarWidth }}
      >
        <DashboardNavbar breadcrumb={[{ label: "الرئيسية", href: "/dashboard" }, { label: "الكورسات" }]} />

        <main className="p-6 space-y-8 max-w-7xl">

          {/* ── Sticky filter bar ─────────────────────────── */}
          <div
            id="courses-filter-bar"
            className="
              sticky top-16 z-10 -mx-6 px-6 py-3
              bg-[var(--bg-base)] border-b border-[var(--border-subtle)]
              flex flex-wrap items-center gap-3
            "
          >
            {/* Grade pills */}
            <div className="flex flex-wrap gap-2">
              {GRADES.map((g) => (
                <button
                  key={g}
                  id={`grade-filter-${g}`}
                  className={`pill-tab ${gradeFilter === g ? "active" : ""}`}
                  onClick={() => setGradeFilter(g)}
                >
                  {g}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-[var(--border-default)] hidden sm:block" />

            {/* Subject pills */}
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  id={`subject-filter-${s}`}
                  className={`pill-tab ${subjectFilter === s ? "active" : ""}`}
                  onClick={() => setSubjectFilter(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Search + grid toggle */}
            <div className="flex items-center gap-2 mr-auto">
              <div className="relative">
                <Search size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  id="courses-search"
                  type="search"
                  placeholder="ابحث في الكورسات..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                    h-9 pr-9 pl-4 text-sm w-[180px]
                    bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-full
                    outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
                    focus:border-[var(--accent)] transition-colors font-cairo
                  "
                />
              </div>
              <button
                id="toggle-grid-view"
                onClick={() => setGridView(!gridView)}
                className="p-2 rounded-xl border border-[var(--border-default)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors"
              >
                {gridView ? <List size={16} /> : <LayoutGrid size={16} />}
              </button>
            </div>
          </div>

          {/* ── Enrolled courses ──────────────────────────── */}
          <section id="enrolled-courses">
            <h2 className="text-lg font-bold mb-4 animate-fade-up" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-primary)" }}>
              الكورسات المشترك فيها
              <span className="mr-2 text-sm font-normal" style={{ color: "var(--text-muted)" }}>({ENROLLED.length})</span>
            </h2>
            <div className={`grid gap-4 animate-fade-up ${gridView ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {ENROLLED.map((c) => (
                <CourseCard key={c.id} variant="enrolled" {...(c as Parameters<typeof CourseCard>[0])} />
              ))}
            </div>
          </section>

          {/* ── Available courses ─────────────────────────── */}
          <section id="available-courses">
            <h2 className="text-lg font-bold mb-4 animate-fade-up stagger-1" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-primary)" }}>
              الكورسات المتاحة
              <span className="mr-2 text-sm font-normal" style={{ color: "var(--text-muted)" }}>({filteredAvailable.length})</span>
            </h2>
            {filteredAvailable.length === 0 ? (
              <div className="card text-center py-16 animate-fade-up" style={{ color: "var(--text-muted)", fontFamily: "var(--font-cairo)" }}>
                لا توجد كورسات تطابق الفلتر المختار
              </div>
            ) : (
              <div className={`grid gap-4 animate-fade-up stagger-2 ${gridView ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {filteredAvailable.map((c) => (
                  <CourseCard key={c.id} variant="catalog" {...(c as Parameters<typeof CourseCard>[0])} />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
