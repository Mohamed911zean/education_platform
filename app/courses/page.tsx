"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { BookOpen, Grid3X3, List, Search, SlidersHorizontal, ChevronDown, Zap, Star, Users, Lock, Eye } from "lucide-react";

const SUBJECTS_FILTER = ["الكل", "الأحياء", "الكيمياء", "الفيزياء", "الرياضيات", "الجيولوجيا", "اللغة العربية"];
const GRADES_FILTER = ["الكل", "الأول", "الثاني", "الثالث"];

const ENROLLED = [
  { subject: "أحياء", grade: "الصف الثالث", title: "الأحياء — الوراثة والتطور", instructor: "د. أحمد سالم", progress: 68, total: 24, rating: 4.3, color: "rgba(0,212,170,0.08)" },
  { subject: "كيمياء", grade: "الصف الثاني", title: "كيمياء — الجدول الدوري", instructor: "أ. منى إبراهيم", progress: 42, total: 18, rating: 4.7, color: "rgba(77,159,255,0.08)" },
  { subject: "رياضيات", grade: "الصف الأول", title: "رياضيات — الجبر والمعادلات", instructor: "أ. يوسف نبيل", progress: 25, total: 20, rating: 4.5, color: "rgba(255,107,53,0.08)" },
];

const AVAILABLE = [
  { subject: "فيزياء", grade: "الصف الثالث", title: "فيزياء — الكهرباء والمغناطيسية", instructor: "د. سارة ماهر", price: "279", originalPrice: "380", duration: "24 درس · 6 ساعات", rating: 4.8, reviews: 340, isLive: true, isFree: false },
  { subject: "أحياء", grade: "الصف الأول", title: "أحياء — الخلية والوراثة المندلية", instructor: "د. كريم رشاد", price: "199", originalPrice: "280", duration: "18 درس · 4 ساعات", rating: 4.6, reviews: 210, isNew: true, isFree: false },
  { subject: "كيمياء", grade: "الصف الثالث", title: "كيمياء — الكيمياء العضوية الكاملة", instructor: "أ. نادية سمير", isFree: true, duration: "12 درس · 3 ساعات", rating: 4.9, reviews: 512 },
  { subject: "رياضيات", grade: "الصف الثاني", title: "رياضيات — حساب المثلثات والزوايا", instructor: "أ. هشام طه", price: "249", originalPrice: "350", duration: "20 درس · 5 ساعات", rating: 4.4, reviews: 175, isFree: false },
  { subject: "فيزياء", grade: "الصف الثاني", title: "فيزياء — الميكانيكا وقوانين نيوتن", instructor: "د. لميس عمر", price: "229", originalPrice: "320", duration: "16 درس · 4 ساعات", rating: 4.7, reviews: 290, isFree: false },
  { subject: "جيولوجيا", grade: "الصف الأول", title: "الجيولوجيا والجغرافيا الطبيعية", instructor: "أ. فريد عزمي", isFree: true, duration: "10 درس · 2 ساعات", rating: 4.3, reviews: 88 },
];

function EnrolledCard({ course }: { course: typeof ENROLLED[0] }) {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{
        height: 140, background: `linear-gradient(135deg, var(--bg-elevated), ${course.color})`,
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
        borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
      }}>
        <BookOpen size={40} color="var(--text-muted)" />
        <span className="badge badge-subject" style={{ position: "absolute", top: 10, left: 10 }}>{course.subject}</span>
        <span style={{
          position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.6)",
          color: "var(--text-primary)", fontFamily: "var(--font-cairo)", fontSize: 11, fontWeight: 700,
          padding: "3px 10px", borderRadius: "var(--radius-full)", backdropFilter: "blur(8px)",
        }}>{course.progress}%</span>
      </div>
      <div style={{ padding: 16 }}>
        <span className="badge badge-grade" style={{ marginBottom: 8 }}>{course.grade}</span>
        <div style={{ fontFamily: "var(--font-cairo)", fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6, lineHeight: 1.4 }}>{course.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div className="avatar-placeholder" style={{ width: 26, height: 26, background: "rgba(77,159,255,0.1)", color: "var(--accent-blue)", fontSize: 10, fontWeight: 700 }}>م</div>
          <span style={{ fontFamily: "var(--font-cairo)", fontSize: 12, color: "var(--text-muted)" }}>{course.instructor}</span>
        </div>
        <div className="progress-track" style={{ marginBottom: 8 }}>
          <div className="progress-fill" style={{ width: `${course.progress}%` }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <div className="stars" style={{ fontSize: 12 }}>{"★".repeat(Math.floor(course.rating))}{"☆".repeat(5 - Math.floor(course.rating))}<span style={{ color: "var(--text-muted)", fontFamily: "var(--font-cairo)", fontSize: 11 }}> {course.rating}</span></div>
          <span style={{ fontFamily: "var(--font-cairo)", fontSize: 12, color: "var(--text-muted)" }}>{Math.round(course.progress / 100 * course.total)} / {course.total} درس</span>
        </div>
        <button className="btn btn-teal btn-full">استكمل التعلم ←</button>
      </div>
    </div>
  );
}

function CatalogCard({ course }: { course: typeof AVAILABLE[0] }) {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{
        height: 160, background: "linear-gradient(135deg, var(--bg-elevated), rgba(255,51,102,0.05))",
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
        borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
      }}>
        <BookOpen size={48} color="var(--text-muted)" />
        {course.isLive && (
          <div className="badge badge-live" style={{ position: "absolute", top: 10, right: 10 }}>
            <span className="pulse-dot" /> مباشر
          </div>
        )}
        {course.isNew && !course.isLive && (
          <div className="badge badge-new" style={{ position: "absolute", top: 10, right: 10 }}>
            <Zap size={10} /> جديد
          </div>
        )}
        <div style={{
          position: "absolute", top: 10, left: 10, background: "rgba(0,0,0,0.6)",
          color: "var(--text-muted)", fontFamily: "var(--font-cairo)", fontSize: 10, fontWeight: 600,
          padding: "3px 8px", borderRadius: "var(--radius-full)", backdropFilter: "blur(8px)",
        }}>{course.duration}</div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          <span className="badge badge-grade">{course.grade}</span>
          <span className="badge badge-subject">{course.subject}</span>
        </div>
        <div style={{
          fontFamily: "var(--font-cairo)", fontSize: 16, fontWeight: 700,
          color: "var(--text-primary)", marginBottom: 8, lineHeight: 1.4,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{course.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <div className="avatar-placeholder" style={{ width: 26, height: 26, background: "rgba(77,159,255,0.1)", color: "var(--accent-blue)", fontSize: 10, fontWeight: 700 }}>م</div>
          <div>
            <span style={{ fontFamily: "var(--font-cairo)", fontSize: 12, color: "var(--text-muted)" }}>{course.instructor}</span>
            <span style={{ fontFamily: "var(--font-cairo)", fontSize: 11, color: "var(--accent-teal)", marginRight: 6 }}>مدرس معتمد ✓</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <div className="stars" style={{ fontSize: 12 }}>{"★".repeat(Math.round(course.rating))}{"☆".repeat(5 - Math.round(course.rating))}</div>
          <span style={{ fontFamily: "var(--font-cairo)", fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>{course.rating}</span>
          <span style={{ fontFamily: "var(--font-cairo)", fontSize: 11, color: "var(--text-muted)" }}>({course.reviews} تقييم)</span>
        </div>
        <div className="divider" style={{ margin: "10px 0" }} />
        {course.isFree ? (
          <div className="badge badge-grade" style={{ fontSize: 14, padding: "8px 16px", display: "inline-flex", marginBottom: 12 }}>مجاني 🎁</div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontFamily: "var(--font-cairo)", fontSize: 13, color: "var(--text-muted)", textDecoration: "line-through" }}>{course.originalPrice} ج</span>
            <span style={{ fontFamily: "var(--font-cairo)", fontSize: 20, fontWeight: 800, color: "var(--accent-warm)" }}>{course.price} ج</span>
          </div>
        )}
        <button className="btn btn-ghost btn-full" style={{ marginBottom: 8 }}>
          <Eye size={14} /> معاينة مجانية
        </button>
        <button className="btn btn-primary btn-full">اشترك في الكورس</button>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [gradeFilter, setGradeFilter] = useState("الكل");
  const [subjectFilter, setSubjectFilter] = useState("الكل");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  return (
    <div className="page-bg" style={{ minHeight: "100vh", direction: "rtl" }}>
      <Sidebar />
      <div style={{ marginRight: 240, minHeight: "100vh", display: "flex", flexDirection: "column" }} className="dashboard-layout">
        <DashboardNavbar breadcrumb={[{ label: "الرئيسية", href: "/dashboard" }, { label: "كورساتي والكتالوج" }]} />

        <main style={{ flex: 1, padding: 32, paddingBottom: 80 }}>
          {/* Page header */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontFamily: "var(--font-cairo)", fontSize: 32, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4, letterSpacing: "-1px" }}>
              كورساتي والكتالوج
            </h1>
            <p style={{ fontFamily: "var(--font-cairo)", fontSize: 13, color: "var(--text-muted)" }}>
              الرئيسية / كورساتي
            </p>
          </div>

          {/* Sticky filter bar */}
          <div style={{
            position: "sticky", top: 64, zIndex: 19, marginBottom: 28,
            background: "rgba(7,9,15,0.92)", backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--border-subtle)", padding: "12px 0",
          }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                {/* Grade filter */}
                <div style={{ display: "flex", gap: 4 }}>
                  {GRADES_FILTER.map(g => (
                    <button key={g} id={`grade-filter-${g}`} className={`pill-tab ${gradeFilter === g ? "active" : ""}`}
                      onClick={() => setGradeFilter(g)}>{g}</button>
                  ))}
                </div>
                {/* Subject filter */}
                <div className="scroll-x" style={{ gap: 4, flexWrap: "nowrap" }}>
                  {SUBJECTS_FILTER.map(s => (
                    <button key={s} id={`subject-filter-${s}`} className={`pill-tab ${subjectFilter === s ? "active" : ""}`}
                      onClick={() => setSubjectFilter(s)}>{s}</button>
                  ))}
                </div>
              </div>
              {/* Right controls */}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="🔍 بحث في الكورسات"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ width: 220, paddingRight: 16, height: 38 }}
                    id="courses-search"
                  />
                </div>
                <button className="btn btn-secondary btn-sm" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  ترتيب <ChevronDown size={12} />
                </button>
                <div style={{ display: "flex", gap: 2, background: "var(--bg-elevated)", borderRadius: "var(--radius-sm)", padding: 3 }}>
                  <button
                    id="grid-view-btn"
                    onClick={() => setViewMode("grid")}
                    style={{ padding: "6px 10px", borderRadius: "var(--radius-sm)", background: viewMode === "grid" ? "var(--accent)" : "transparent", border: "none", cursor: "pointer", color: viewMode === "grid" ? "white" : "var(--text-muted)", display: "flex", alignItems: "center", transition: "all 150ms" }}
                  ><Grid3X3 size={15} /></button>
                  <button
                    id="list-view-btn"
                    onClick={() => setViewMode("list")}
                    style={{ padding: "6px 10px", borderRadius: "var(--radius-sm)", background: viewMode === "list" ? "var(--accent)" : "transparent", border: "none", cursor: "pointer", color: viewMode === "list" ? "white" : "var(--text-muted)", display: "flex", alignItems: "center", transition: "all 150ms" }}
                  ><List size={15} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Enrolled courses */}
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-cairo)", fontSize: 20, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
              الكورسات المشترك فيها (3)
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {ENROLLED.map((c, i) => <EnrolledCard key={i} course={c} />)}
            </div>
          </section>

          {/* Available courses */}
          <section>
            <h2 style={{ fontFamily: "var(--font-cairo)", fontSize: 20, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
              الكورسات المتاحة
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {AVAILABLE.map((c, i) => <CatalogCard key={i} course={c} />)}
            </div>
          </section>
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dashboard-layout { margin-right: 0 !important; padding-bottom: 64px; }
        }
      `}</style>
    </div>
  );
}
