"use client";

import { useState, useMemo } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { DashboardNavbar } from "@/app/components/DashboardNavbar";
import { CourseCard } from "@/app/components/shared/CourseCard";
import { Search, LayoutGrid, List } from "lucide-react";
import { AVAILABLE, GRADES, SUBJECTS } from "../data";

export default function SuggestedCoursesPage() {
  const [collapsed, setCollapsed] = useState(false);

  const [gradeFilter, setGradeFilter] = useState("الكل");
  const [subjectFilter, setSubjectFilter] = useState("الكل");
  const [search, setSearch] = useState("");
  const [gridView, setGridView] = useState(true);

  const filteredCourses = useMemo(() => {
    return AVAILABLE.filter((c) => {
      const matchGrade = gradeFilter === "الكل" || c.grade === gradeFilter;
      const matchSubject = subjectFilter === "الكل" || c.subject === subjectFilter;
      const matchSearch = search.trim() === "" || c.title.includes(search) || c.subtitle?.includes(search);
      return matchGrade && matchSubject && matchSearch;
    });
  }, [gradeFilter, subjectFilter, search]);

  return (
    <div className="flex min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]" dir="rtl">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <DashboardNavbar breadcrumb={[{ label: "الرئيسية", href: "/dashboard" }, { label: "الكورسات", href: "/courses" }, { label: "كورسات مقترحة لك" }]} />

        <main className="flex-1 p-4 pb-24 md:p-6 lg:p-8 overflow-y-auto space-y-8 max-w-7xl mx-auto w-full">
          
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold font-cairo">كورسات مقترحة لك</h1>
              <p className="text-sm text-[var(--text-muted)] font-cairo mt-1">المنهج الذي يناسب مستواك ومرحلتك الدراسية</p>
            </div>
          </div>

          {/* ── Sticky filter bar ─────────────────────────── */}
          <div
            id="courses-filter-bar"
            className="
              sticky top-0 z-10 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-3
              bg-[var(--bg-base)] border-b border-[var(--border-subtle)]
              flex flex-col md:flex-row md:items-center gap-4
            "
          >
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {GRADES.map((g) => (
                  <button
                    key={g}
                    className={`pill-tab ${gradeFilter === g ? "active" : ""}`}
                    onClick={() => setGradeFilter(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <div className="w-px h-6 bg-[var(--border-default)] hidden xl:block" />

              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map((s) => (
                  <button
                    key={s}
                    className={`pill-tab ${subjectFilter === s ? "active" : ""}`}
                    onClick={() => setSubjectFilter(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 mr-auto w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="search"
                  placeholder="ابحث في المقترحات..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                    h-10 pr-10 pl-4 text-sm w-full md:w-[200px]
                    bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl
                    outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
                    focus:border-[var(--accent)] transition-colors font-cairo shadow-sm
                  "
                />
              </div>
              <button
                onClick={() => setGridView(!gridView)}
                className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors shadow-sm"
              >
                {gridView ? <List size={18} /> : <LayoutGrid size={18} />}
              </button>
            </div>
          </div>

          {/* ── Courses Grid ──────────────────────────── */}
          <section>
            {filteredCourses.length === 0 ? (
              <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-default)] text-center py-20 shadow-sm animate-fade-up">
                <CourseCard.IconPlaceholder />
                <div className="text-lg font-bold font-cairo text-[var(--text-primary)] mt-4">لا توجد كورسات مقترحة حالياً</div>
                <div className="text-sm text-[var(--text-muted)] font-cairo mt-1">ابحث باسم الدرس أو المادة</div>
              </div>
            ) : (
              <div className={`grid gap-4 animate-fade-up ${gridView ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {filteredCourses.map((c) => (
                  <CourseCard key={c.id} {...(c as Parameters<typeof CourseCard>[0])} />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
// Hack to get a nice icon without importing new things if not strictly needed
CourseCard.IconPlaceholder = function IconPlaceholder() {
  return (
    <div className="mx-auto w-16 h-16 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center">
       <span className="text-2xl">🔍</span>
    </div>
  )
}
