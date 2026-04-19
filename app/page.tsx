"use client";
import Link from "next/link";
import Navbar from "./components/Navbar";
import {
  BookOpen, CheckCircle, Play, Users, Star,
  ChevronLeft, ChevronRight, MessageCircle, Award,
  Clock, GraduationCap, Zap, ArrowLeft
} from "lucide-react";

/* ──────────────────────────────────────────────────────────
   TEACHER DATA — change this to match the real teacher
────────────────────────────────────────────────────────── */
const TEACHER = {
  name: "مستر أحمد النجار",
  title: "مدرس الأحياء",
  subject: "الأحياء — جميع المراحل",
  bio: "مدرس أحياء بخبرة أكتر من 15 سنة. بدرّس بأسلوب مبسط وممتع بيخلي الطالب يفهم ويستمتع في نفس الوقت. هدفي إن كل طالب يحقق أعلى درجاته.",
  shortBio: "مدرس أحياء منذ أكتر من 15 سنة — بأسلوب مبسط وممتع",
  stats: [
    { value: "+5,000", label: "طالب مستفيد" },
    { value: "+500", label: "ساعة محتوى" },
    { value: "98%", label: "رضا الطلاب" },
    { value: "1.5M+", label: "مشاهدة يوتيوب" },
  ],
};

const COURSES = [
  {
    id: 1, grade: "الصف الأول", title: "الأحياء — الصف الأول الثانوي الكامل",
    lessons: 48, price: "280", originalPrice: "400",
    description: "المنهج كاملاً بشرح تفصيلي + تدريبات + ملخصات",
    isNew: false, isFree: false, enrolled: 820,
  },
  {
    id: 2, grade: "الصف الثاني", title: "الأحياء — الصف الثاني الثانوي الكامل",
    lessons: 52, price: "280", originalPrice: "400",
    description: "المنهج كاملاً مع التركيز على أصعب الوحدات",
    isNew: false, isFree: false, enrolled: 1100,
  },
  {
    id: 3, grade: "الصف الثالث", title: "الأحياء — الصف الثالث الثانوي الكامل",
    lessons: 60, price: "350", originalPrice: "500",
    description: "شرح كامل + مراجعات نهائية + نماذج امتحانات",
    isNew: true, isFree: false, enrolled: 2300,
  },
  {
    id: 4, grade: "الكل", title: "كورس الإعداد الجيني والتكاثر — مجاني",
    lessons: 12, price: "0", originalPrice: "",
    description: "كورس مجاني كهدية من مستر أحمد لكل الطلاب",
    isNew: false, isFree: true, enrolled: 4800,
  },
];

const WHY_US = [
  { icon: "🎯", title: "شرح مبسط ومركز", body: "مش هتحتاج تراجع من أي مصدر تاني. الشرح بيمشي مع المنهج خطوة بخطوة." },
  { icon: "📝", title: "تمارين على كل درس", body: "بعد كل درس هتلاقي تدريبات وأسئلة تأكد إنك فاهم المعلومة." },
  { icon: "📋", title: "ملخصات PDF", body: "ملخص لكل وحدة تقدر تطبعه وتذاكر منه في أي وقت." },
  { icon: "🔴", title: "حصص مباشرة", body: "حصص لايف أسبوعية للمراجعة والرد على أسئلتك مباشرة." },
  { icon: "⭐", title: "اختبارات تقييم", body: "اختبارات دورية بعد كل وحدة تقيس مستواك وتساعدك تتحسن." },
  { icon: "📱", title: "متاح على الموبايل", body: "قدر تذاكر في أي مكان وأي وقت من الموبايل أو التابلت." },
];

const TESTIMONIALS = [
  { name: "سارة محمود", grade: "الصف الثالث", quote: "بفضل مستر أحمد عديت الأحياء بـ 95 درجة في الثانوية العامة. الشرح واضح جداً والتدريبات بتثبت المعلومة.", rating: 5 },
  { name: "كريم إبراهيم", grade: "الصف الثاني", quote: "كنت بكره مادة الأحياء قبل كدة بس بعد ما اشتركت في الكورس بقيت بحبها. أسلوب المستر فريد جداً.", rating: 5 },
  { name: "نور عاطف", grade: "الصف الأول", quote: "الشرح سهل وبسيط ومش مطوّل. المستر بيعرف يوصّل المعلومة بسرعة. هنصح كل صحابي يشتركوا.", rating: 5 },
  { name: "أحمد سامي", grade: "الصف الثالث", quote: "اشتركت في الكورس قبل الامتحانات بشهرين وحسيت بفرق كبير. الملخصات والاختبارات مفيدة جداً.", rating: 5 },
];

function CourseCard({ course }: { course: typeof COURSES[0] }) {
  const gradeColors: Record<string, string> = {
    "الصف الأول": "rgba(59,130,246,0.12)",
    "الصف الثاني": "rgba(245,158,11,0.12)",
    "الصف الثالث": "rgba(232,48,74,0.12)",
    "الكل": "rgba(16,185,129,0.12)",
  };

  return (
    <div style={{
      background: "var(--bg-surface)", border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)", overflow: "hidden",
      display: "flex", flexDirection: "column",
      transition: "border-color 150ms, box-shadow 150ms",
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-default)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
    >
      {/* Thumbnail */}
      <div style={{
        height: 160, background: `linear-gradient(135deg, var(--bg-elevated), ${gradeColors[course.grade] || gradeColors["الكل"]})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        <BookOpen size={48} color="var(--text-muted)" strokeWidth={1} />
        <div style={{
          position: "absolute", top: 12, right: 12,
          background: course.isFree ? "rgba(16,185,129,0.15)" : "rgba(232,48,74,0.15)",
          border: `1px solid ${course.isFree ? "rgba(16,185,129,0.3)" : "rgba(232,48,74,0.3)"}`,
          color: course.isFree ? "var(--accent-teal)" : "var(--accent)",
          fontFamily: "Cairo, sans-serif", fontSize: 12, fontWeight: 700,
          padding: "4px 10px", borderRadius: "var(--radius-full)",
        }}>
          {course.grade}
        </div>
        {course.isNew && (
          <div style={{
            position: "absolute", top: 12, left: 12,
            background: "var(--accent-gold)", color: "#000",
            fontFamily: "Cairo, sans-serif", fontSize: 11, fontWeight: 800,
            padding: "4px 10px", borderRadius: "var(--radius-full)",
          }}>جديد</div>
        )}
        {course.isFree && (
          <div style={{
            position: "absolute", bottom: 12, left: 12,
            background: "var(--accent-teal)", color: "#000",
            fontFamily: "Cairo, sans-serif", fontSize: 11, fontWeight: 800,
            padding: "4px 10px", borderRadius: "var(--radius-full)",
          }}>مجاني 🎁</div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 17, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.4 }}>
          {course.title}
        </div>
        <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          {course.description}
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Clock size={13} color="var(--text-muted)" />
            <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "var(--text-muted)" }}>{course.lessons} درس</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Users size={13} color="var(--text-muted)" />
            <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "var(--text-muted)" }}>{course.enrolled.toLocaleString()} طالب</span>
          </div>
          <div style={{ display: "flex", gap: 2 }}>
            {[...Array(5)].map((_, i) => <span key={i} style={{ color: "var(--accent-gold)", fontSize: 11 }}>★</span>)}
          </div>
        </div>

        <div style={{ height: 1, background: "var(--border-subtle)", margin: "4px 0" }} />

        {/* Price */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          {course.isFree ? (
            <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--accent-teal)" }}>مجاني تماماً</span>
          ) : (
            <>
              {course.originalPrice && (
                <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-muted)", textDecoration: "line-through" }}>{course.originalPrice} جنيه</span>
              )}
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 22, fontWeight: 800, color: "var(--accent)" }}>{course.price} جنيه</span>
            </>
          )}
        </div>

        <Link href="/register" className="btn btn-primary btn-full" id={`enroll-course-${course.id}`}>
          {course.isFree ? "اشترك مجاناً ←" : "اشترك في الكورس ←"}
        </Link>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="page-bg" dir="rtl">
      <Navbar />

      {/* ── HERO ───────────────────────────────────────────── */}
      <section id="hero" style={{
        paddingTop: 80, paddingBottom: 80,
        borderBottom: "1px solid var(--border-subtle)",
        background: "linear-gradient(180deg, rgba(232,48,74,0.04) 0%, transparent 100%)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 60, alignItems: "center" }}>
            {/* Text */}
            <div>
              <div className="eyebrow-pill" style={{ marginBottom: 20 }}>
                <span className="pulse-dot" />
                منصة {TEACHER.name} الرسمية
              </div>
              <h1 style={{
                fontFamily: "Cairo, sans-serif",
                fontSize: "clamp(36px, 5vw, 58px)",
                fontWeight: 900,
                lineHeight: 1.25,
                color: "var(--text-primary)",
                marginBottom: 16,
                letterSpacing: "-1px",
              }}>
                تعلم الأحياء<br />
                <span className="gradient-text">بأسلوب مختلف</span>
              </h1>
              <p style={{
                fontFamily: "Cairo, sans-serif",
                fontSize: 16, color: "var(--text-secondary)",
                lineHeight: 1.9, maxWidth: 520, marginBottom: 32,
              }}>
                {TEACHER.bio}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
                <Link href="/register" className="btn btn-primary btn-lg" id="hero-cta">
                  ابدأ التعلم مجاناً ←
                </Link>
                <Link href="#courses" className="btn btn-secondary btn-lg" id="hero-courses">
                  <BookOpen size={16} />
                  استعرض الكورسات
                </Link>
              </div>
              {/* Quick stats */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 28 }}>
                {TEACHER.stats.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: i > 0 ? 28 : 0, borderRight: i > 0 ? "1px solid var(--border-subtle)" : "none" }}>
                    <div style={{ fontFamily: "'Syne', var(--font-syne), sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text-primary)" }}>{s.value}</div>
                    <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "var(--text-muted)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Teacher card */}
            <div className="hero-visual" style={{ display: "flex", justifyContent: "center" }}>
              <div style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-xl)",
                padding: 32, textAlign: "center",
                boxShadow: "var(--shadow-lg)",
              }}>
                {/* Avatar circle */}
                <div style={{
                  width: 140, height: 140, borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(232,48,74,0.15), rgba(255,107,53,0.1))",
                  border: "3px solid var(--accent)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: 56,
                }}>👨‍🏫</div>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
                  {TEACHER.name}
                </div>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 14, color: "var(--accent)", marginBottom: 16 }}>
                  {TEACHER.subject}
                </div>
                <div className="divider" />
                <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 20 }}>
                  {TEACHER.shortBio}
                </p>
                <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                  {["الصف الأول", "الصف الثاني", "الصف الثالث"].map(g => (
                    <span key={g} className="badge badge-subject">{g}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ──────────────────────────────── */}
      <section style={{
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: "20px 24px",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", gap: 0,
          overflowX: "auto",
        }} className="scroll-x">
          {[
            { icon: "👨‍🎓", val: "+5,000", label: "طالب" },
            { icon: "📹", val: "1.5M+", label: "مشاهدة" },
            { icon: "⭐", val: "4.9/5", label: "التقييم" },
            { icon: "📚", val: "+500", label: "ساعة محتوى" },
            { icon: "🏆", val: "3", label: "سنوات دراسية" },
          ].map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "0 28px", flexShrink: 0,
              borderRight: i > 0 ? "1px solid var(--border-subtle)" : "none",
            }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <div>
                <div style={{ fontFamily: "Syne, var(--font-syne), sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text-primary)" }}>{s.val}</div>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "var(--text-muted)" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GRADES ────────────────────────────────────────── */}
      <section id="grades" style={{ padding: "72px 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="section-title" style={{ marginBottom: 8 }}>السنوات الدراسية</h2>
            <p className="section-subtitle">اختار صفك وابدأ رحلتك</p>
          </div>
          <div className="grade-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { grade: "١", label: "الصف الأول الثانوي", courses: 1, color: "var(--accent-blue)", bg: "rgba(59,130,246,0.08)" },
              { grade: "٢", label: "الصف الثاني الثانوي", courses: 1, color: "var(--accent-gold)", bg: "rgba(245,158,11,0.08)" },
              { grade: "٣", label: "الصف الثالث الثانوي", courses: 2, color: "var(--accent)", bg: "rgba(232,48,74,0.08)" },
            ].map((item) => (
              <Link key={item.grade} href="/courses" style={{ textDecoration: "none" }}>
                <div style={{
                  background: item.bg, border: `1px solid ${item.color.replace("var(--accent", "rgba(--color").replace(")", "")})`,
                  borderColor: item.color.replace("var(", "").replace(")", "").includes("accent") ? item.color : item.color,
                  borderRadius: "var(--radius-lg)", padding: "32px 28px",
                  textAlign: "center", cursor: "pointer",
                  transition: "box-shadow 150ms",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  <div style={{
                    fontFamily: "Syne, var(--font-syne), sans-serif",
                    fontSize: 64, fontWeight: 800, color: item.color,
                    lineHeight: 1, marginBottom: 12,
                  }}>{item.grade}</div>
                  <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>{item.label}</div>
                  <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-muted)" }}>
                    {item.courses} كورس متاح
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <span style={{
                      display: "inline-block", padding: "8px 20px",
                      background: "var(--accent)", color: "white",
                      borderRadius: "var(--radius-md)",
                      fontFamily: "Cairo, sans-serif", fontSize: 14, fontWeight: 700,
                    }}>استعرض الكورسات →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES ───────────────────────────────────────── */}
      <section id="courses" style={{ padding: "72px 24px", background: "var(--bg-surface)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="section-title" style={{ marginBottom: 8 }}>الكورسات المتاحة</h2>
            <p className="section-subtitle">محتوى شامل لكل صف دراسي</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {COURSES.map(course => <CourseCard key={course.id} course={course} />)}
          </div>
        </div>
      </section>

      {/* ── WHY US ────────────────────────────────────────── */}
      <section id="features" style={{ padding: "72px 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="section-title" style={{ marginBottom: 8 }}>ليه تشترك معانا؟</h2>
            <p className="section-subtitle">بنقدم تجربة تعليمية متكاملة</p>
          </div>
          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {WHY_US.map((item, i) => (
              <div key={i} style={{
                background: "var(--bg-surface)", border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-lg)", padding: 24,
                display: "flex", alignItems: "flex-start", gap: 16,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "var(--radius-md)",
                  background: "rgba(232,48,74,0.08)", border: "1px solid rgba(232,48,74,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, flexShrink: 0,
                }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8 }}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT TEACHER ─────────────────────────────────── */}
      <section id="about" style={{ padding: "72px 24px", background: "var(--bg-surface)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "300px 1fr",
            gap: 60, alignItems: "center",
          }}>
            {/* Avatar side */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 200, height: 200, borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(232,48,74,0.15), rgba(255,107,53,0.1))",
                border: "4px solid var(--accent)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px", fontSize: 80,
              }}>👨‍🏫</div>
              <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>{TEACHER.name}</div>
              <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 14, color: "var(--accent)" }}>{TEACHER.title}</div>
            </div>
            {/* Text side */}
            <div>
              <div className="eyebrow-pill" style={{ marginBottom: 16 }}>عن المدرس</div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>
                مين هو {TEACHER.name}؟
              </h2>
              <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 15, color: "var(--text-secondary)", lineHeight: 2, marginBottom: 24 }}>
                {TEACHER.bio} درّس في كتير من المراكز والمدارس الكبرى، وله قناة يوتيوب بأكتر من مليون ونص مشاهدة. بيؤمن إن كل طالب قادر يتفوق لو اتعلم بالأسلوب الصح.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                {[
                  { icon: "🏆", text: "خبرة 15+ سنة في التدريس" },
                  { icon: "🎓", text: "بكالوريوس علوم — جامعة القاهرة" },
                  { icon: "📺", text: "قناة يوتيوب 1.5M+ مشاهدة" },
                  { icon: "👥", text: "+5,000 طالب مستفيد" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "var(--bg-elevated)", border: "1px solid var(--border-default)",
                    borderRadius: "var(--radius-md)", padding: "8px 14px",
                  }}>
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                    <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-secondary)", fontWeight: 600 }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <Link href="/register" className="btn btn-primary" id="about-cta">
                اشترك معانا الآن ←
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section id="testimonials" style={{ padding: "72px 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="section-title" style={{ marginBottom: 8 }}>طلابنا بيقولوا إيه؟</h2>
            <p className="section-subtitle">آراء حقيقية من طلاب استفادوا</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: "var(--bg-surface)", border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-lg)", padding: 24,
              }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                  {[...Array(t.rating)].map((_, j) => <span key={j} style={{ color: "var(--accent-gold)", fontSize: 14 }}>★</span>)}
                </div>
                <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.9, marginBottom: 16 }}>
                  "{t.quote}"
                </p>
                <div style={{ height: 1, background: "var(--border-subtle)", marginBottom: 12 }} />
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="avatar-placeholder" style={{
                    width: 36, height: 36,
                    background: "rgba(232,48,74,0.1)", border: "1px solid rgba(232,48,74,0.2)",
                    color: "var(--accent)", fontFamily: "Cairo, sans-serif", fontSize: 14, fontWeight: 800,
                  }}>{t.name.charAt(0)}</div>
                  <div>
                    <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{t.name}</div>
                    <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "var(--text-muted)" }}>{t.grade}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section style={{
        padding: "72px 24px",
        background: "linear-gradient(135deg, rgba(232,48,74,0.08) 0%, var(--bg-surface) 100%)",
        borderTop: "1px solid var(--border-default)",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🚀</div>
          <h2 className="section-title" style={{ marginBottom: 12 }}>
            ابدأ رحلتك نحو التفوق النهارده
          </h2>
          <p className="section-subtitle" style={{ marginBottom: 32 }}>
            سجّل مجاناً وابدأ بكورس الإعداد الجيني والتكاثر مجاناً كهدية من مستر أحمد.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register" className="btn btn-primary btn-lg" id="footer-cta-register">
              سجّل مجاناً الآن ←
            </Link>
            <Link href="/login" className="btn btn-secondary btn-lg" id="footer-cta-login">
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer style={{
        background: "var(--bg-surface)", borderTop: "1px solid var(--border-subtle)",
        padding: "48px 24px 24px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <BookOpen size={18} color="white" />
                </div>
                <div>
                  <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>{TEACHER.name}</div>
                  <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "var(--text-muted)" }}>منصة التعليم الرسمية</div>
                </div>
              </div>
              <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.9, maxWidth: 280 }}>
                منصة تعليمية متخصصة في مادة الأحياء لجميع مراحل الثانوية العامة.
              </p>
            </div>
            {[
              { title: "الكورسات", links: ["الصف الأول الثانوي", "الصف الثاني الثانوي", "الصف الثالث الثانوي", "كورسات مجانية"] },
              { title: "المنصة", links: ["الرئيسية", "تسجيل الدخول", "إنشاء حساب", "اتصل بنا"] },
              { title: "تابعنا", links: ["يوتيوب", "فيسبوك", "تيليجرام", "واتساب"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 14, fontWeight: 800, color: "var(--text-primary)", marginBottom: 16 }}>{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map(link => (
                    <a key={link} href="#" style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}
                      onMouseEnter={e => { (e.target as HTMLElement).style.color = "var(--text-primary)"; }}
                      onMouseLeave={e => { (e.target as HTMLElement).style.color = "var(--text-muted)"; }}
                    >{link}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: "var(--border-subtle)", marginBottom: 20 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "var(--text-muted)" }}>© 2026 {TEACHER.name}. جميع الحقوق محفوظة.</span>
            <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 20, color: "var(--text-muted)" }}>By Reactech Team</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
