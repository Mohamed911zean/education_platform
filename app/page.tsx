"use client";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { BookOpen, Clock, Users, Play, Star, Award, CheckCircle, ArrowLeft, ChevronLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./page-styles.css";

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const TEACHER = {
  name: "مستر أحمد النجار",
  title: "مدرس الأحياء",
  subject: "الأحياء — جميع المراحل",
  bio: "مدرس أحياء بخبرة أكتر من 15 سنة. بدرّس بأسلوب مبسط وممتع بيخلي الطالب يفهم ويستمتع في نفس الوقت. هدفي إن كل طالب يحقق أعلى درجاته.",
  shortBio: "مدرس أحياء منذ أكتر من 15 سنة — بأسلوب مبسط وممتع",
  stats: [
    { value: 5000, suffix: "+", label: "طالب مستفيد" },
    { value: 500, suffix: "+", label: "ساعة محتوى" },
    { value: 98, suffix: "%", label: "رضا الطلاب" },
    { value: 1.5, suffix: "M+", label: "مشاهدة يوتيوب" },
  ],
};

const COURSES = [
  // ===== الصف الأول =====
  {
    id: 1,
    grade: "الصف الأول",
    gradeNum: "١",
    title: "الأحياء — الصف الأول الثانوي (الكورس الكامل)",
    lessons: 48,
    price: "300",
    originalPrice: "450",
    description: "شرح المنهج بالكامل من البداية للنهاية + تدريبات على كل درس + ملخصات منظمة لكل وحدة",
    isNew: false,
    isFree: false,
    enrolled: 820,
    color: "#3b82f6",
  },
  {
    id: 2,
    grade: "الصف الأول",
    gradeNum: "١",
    title: "الأحياء — الصف الأول الثانوي (الشهر الأول)",
    lessons: 16,
    price: "120",
    originalPrice: "180",
    description: "شرح منهج الشهر الأول بالتفصيل + تدريبات تضمن فهمك لكل جزئية",
    isNew: false,
    isFree: false,
    enrolled: 410,
    color: "#2563eb",
  },
  {
    id: 3,
    grade: "الصف الأول",
    gradeNum: "١",
    title: "الأحياء — الصف الأول الثانوي (الشهر الثاني)",
    lessons: 16,
    price: "120",
    originalPrice: "180",
    description: "استكمال المنهج مع شرح مبسط + أسئلة تطبيقية على كل درس",
    isNew: false,
    isFree: false,
    enrolled: 360,
    color: "#1d4ed8",
  },
  {
    id: 4,
    grade: "الصف الأول",
    gradeNum: "١",
    title: "الأحياء — الصف الأول الثانوي (الشهر الثالث)",
    lessons: 16,
    price: "120",
    originalPrice: "180",
    description: "مراجعة وشرح باقي المنهج + تدريبات شاملة لتثبيت المعلومات",
    isNew: false,
    isFree: false,
    enrolled: 300,
    color: "#1e40af",
  },

  // ===== الصف الثاني =====
  {
    id: 5,
    grade: "الصف الثاني",
    gradeNum: "٢",
    title: "الأحياء — الصف الثاني الثانوي (الكورس الكامل)",
    lessons: 52,
    price: "320",
    originalPrice: "480",
    description: "شرح المنهج كامل + التركيز على الأجزاء الصعبة + تدريبات مكثفة",
    isNew: false,
    isFree: false,
    enrolled: 1100,
    color: "#f59e0b",
  },
  {
    id: 6,
    grade: "الصف الثاني",
    gradeNum: "٢",
    title: "الأحياء — الصف الثاني الثانوي (الشهر الأول)",
    lessons: 17,
    price: "130",
    originalPrice: "190",
    description: "شرح أول جزء من المنهج + تدريبات تأسيس قوية",
    isNew: false,
    isFree: false,
    enrolled: 520,
    color: "#fbbf24",
  },
  {
    id: 7,
    grade: "الصف الثاني",
    gradeNum: "٢",
    title: "الأحياء — الصف الثاني الثانوي (الشهر الثاني)",
    lessons: 17,
    price: "130",
    originalPrice: "190",
    description: "استكمال الشرح مع التركيز على النقاط المهمة + أسئلة متنوعة",
    isNew: false,
    isFree: false,
    enrolled: 480,
    color: "#f59e0b",
  },
  {
    id: 8,
    grade: "الصف الثاني",
    gradeNum: "٢",
    title: "الأحياء — الصف الثاني الثانوي (الشهر الثالث)",
    lessons: 18,
    price: "130",
    originalPrice: "190",
    description: "إنهاء المنهج + مراجعة شاملة + تدريبات نهائية",
    isNew: false,
    isFree: false,
    enrolled: 450,
    color: "#d97706",
  },

  // ===== الصف الثالث =====
  {
    id: 9,
    grade: "الصف الثالث",
    gradeNum: "٣",
    title: "الأحياء — الصف الثالث الثانوي (الكورس الكامل)",
    lessons: 60,
    price: "400",
    originalPrice: "600",
    description: "شرح شامل للمنهج + مراجعات نهائية + حل امتحانات سنوات سابقة",
    isNew: true,
    isFree: false,
    enrolled: 2300,
    color: "#ef4444",
  },
  {
    id: 10,
    grade: "الصف الثالث",
    gradeNum: "٣",
    title: "الأحياء — الصف الثالث الثانوي (الشهر الأول)",
    lessons: 20,
    price: "150",
    originalPrice: "220",
    description: "بداية قوية للمنهج + شرح تفصيلي + تدريبات تأسيس",
    isNew: false,
    isFree: false,
    enrolled: 900,
    color: "#f87171",
  },
  {
    id: 11,
    grade: "الصف الثالث",
    gradeNum: "٣",
    title: "الأحياء — الصف الثالث الثانوي (الشهر الثاني)",
    lessons: 20,
    price: "150",
    originalPrice: "220",
    description: "استكمال المنهج + التركيز على الأفكار المتكررة في الامتحانات",
    isNew: false,
    isFree: false,
    enrolled: 850,
    color: "#ef4444",
  },
  {
    id: 12,
    grade: "الصف الثالث",
    gradeNum: "٣",
    title: "الأحياء — الصف الثالث الثانوي (الشهر الثالث)",
    lessons: 20,
    price: "150",
    originalPrice: "220",
    description: "مراجعة نهائية + حل نماذج امتحانات + تثبيت المعلومات",
    isNew: false,
    isFree: false,
    enrolled: 800,
    color: "#dc2626",
  },

  // ===== كورس مجاني واحد فقط =====
  {
    id: 13,
    grade: "مجاني",
    gradeNum: "🎁",
    title: "أساسيات الأحياء — كورس مجاني",
    lessons: 10,
    price: "0",
    originalPrice: "",
    description: "مدخل مبسط لعلم الأحياء يساعدك تبدأ من الصفر وتفهم الأساسيات بسهولة",
    isNew: false,
    isFree: true,
    enrolled: 5000,
    color: "#10b981",
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
  { name: "سارة محمود", grade: "الصف الثالث", quote: "بفضل مستر أحمد عديت الأحياء بـ 95 درجة في الثانوية العامة. الشرح واضح جداً والتدريبات بتثبت المعلومة.", rating: 5, init: "س" },
  { name: "كريم إبراهيم", grade: "الصف الثاني", quote: "كنت بكره مادة الأحياء قبل كدة بس بعد ما اشتركت في الكورس بقيت بحبها. أسلوب المستر فريد جداً.", rating: 5, init: "ك" },
  { name: "نور عاطف", grade: "الصف الأول", quote: "الشرح سهل وبسيط ومش مطوّل. المستر بيعرف يوصّل المعلومة بسرعة. هنصح كل صحابي يشتركوا.", rating: 5, init: "ن" },
  { name: "أحمد سامي", grade: "الصف الثالث", quote: "اشتركت في الكورس قبل الامتحانات بشهرين وحسيت بفرق كبير. الملخصات والاختبارات مفيدة جداً.", rating: 5, init: "أ" },
];

/* ─────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((ease * target).toFixed(target < 10 ? 1 : 0)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────────────────────
   STAT COUNTER
───────────────────────────────────────────────────────── */
function StatCounter({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCountUp(value, 1600, start);
  return (
    <div className="stat-counter">
      <div className="stat-counter-value">
        {count}{suffix}
      </div>
      <div className="stat-counter-label">{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   COURSE CARD
───────────────────────────────────────────────────────── */
function CourseCard({ course, index }: { course: typeof COURSES[0]; index: number }) {
  return (
    <div
      className="course-card"
      style={{
        "--course-color": course.color,
        "--course-color-hover": course.color + "55",
        "--course-color-shadow": course.color + "18",
        animationDelay: `${index * 80}ms`,
      } as React.CSSProperties}
    >
      {/* Top band */}
      <div className="course-card-top" />

      {/* Thumbnail area */}
      <div className="course-card-thumb">
        {/* Big grade number */}
        <div className="course-card-grade-num">{course.gradeNum}</div>

        {/* Badges */}
        <div className="course-card-badges">
          <span className="course-card-badge-grade">{course.grade}</span>
          {course.isNew && (
            <span className="course-card-badge-new">جديد ✦</span>
          )}
        </div>
        {course.isFree && (
          <div className="course-card-badge-free">مجاني تماماً 🎁</div>
        )}
      </div>

      {/* Content */}
      <div className="course-card-content">
        <div className="course-card-title">{course.title}</div>
        <div className="course-card-desc">{course.description}</div>

        {/* Meta */}
        <div className="course-card-meta">
          <div className="course-card-meta-item">
            <Clock size={12} color="var(--text-muted)" />
            <span>{course.lessons} درس</span>
          </div>
          <div className="course-card-meta-item">
            <Users size={12} color="var(--text-muted)" />
            <span>{course.enrolled.toLocaleString()} طالب</span>
          </div>
          <div className="course-card-stars">
            {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#f59e0b" color="#f59e0b" />)}
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* Price row */}
        <div className="course-card-price-row">
          <div className="course-card-price-wrap">
            {course.isFree ? (
              <span className="course-card-free">مجاني</span>
            ) : (
              <>
                {course.originalPrice && (
                  <span className="course-card-original">{course.originalPrice} جنيه</span>
                )}
                <span className="course-card-price">{course.price}</span>
                <span className="course-card-currency">جنيه</span>
              </>
            )}
          </div>
          <Link
            href="/register"
            className="course-card-action"
          >
            {course.isFree ? "اشترك مجاناً" : "اشترك الآن"}
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   FEATURE CARD
───────────────────────────────────────────────────────── */
function FeatureCard({ item, index }: { item: typeof WHY_US[0]; index: number }) {
  return (
    <div className="feature-card">
      <div className="feature-card-icon">{item.icon}</div>
      <div>
        <div className="feature-card-title">{item.title}</div>
        <div className="feature-card-desc">{item.body}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   TESTIMONIAL CARD
───────────────────────────────────────────────────────── */
function TestimonialCard({ t, index }: { t: typeof TESTIMONIALS[0]; index: number }) {
  const colors = ["#e8304a", "#3b82f6", "#10b981", "#f59e0b"];
  const color = colors[index % colors.length];
  return (
    <div className="testimonial-card">
      {/* Stars */}
      <div className="testimonial-stars">
        {[...Array(t.rating)].map((_, j) => <Star key={j} size={13} fill="#f59e0b" color="#f59e0b" />)}
      </div>

      {/* Quote */}
      <p className="testimonial-quote" style={{ borderRightColor: color }}>
        {t.quote}
      </p>

      {/* Author */}
      <div className="testimonial-author">
        <div className="testimonial-avatar" style={{
          background: `${color}18`,
          border: `1px solid ${color}35`,
          color
        }}>{t.init}</div>
        <div>
          <div className="testimonial-name">{t.name}</div>
          <div className="testimonial-grade">{t.grade}</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────────────────── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setProgress(scrolled * 100);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 9999, background: "var(--border-subtle)" }}>
      <div style={{
        height: "100%",
        width: `${progress}%`,
        background: "linear-gradient(90deg, #e8304a, #ff6b35)",
        transition: "width 80ms linear",
        borderRadius: "0 2px 2px 0",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   GRADE CARD
───────────────────────────────────────────────────────── */
function GradeCard({ grade, label, courses, color, bg, index }: any) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href="/courses" style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? bg : "var(--bg-surface)",
          border: `1px solid ${hovered ? color + "55" : "var(--border-default)"}`,
          borderRadius: 20,
          padding: "32px 24px",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 240ms ease",
          transform: hovered ? "translateY(-4px)" : "none",
          boxShadow: hovered ? `0 10px 30px ${color}18` : "none",
          animationDelay: `${index * 100}ms`,
        }}
      >
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 72,
          fontWeight: 900,
          color,
          lineHeight: 1,
          marginBottom: 12,
          transition: "transform 240ms",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          display: "inline-block",
        }}>{grade}</div>
        <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 19, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>{label}</div>
        <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>{courses} كورس متاح</div>
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "9px 20px",
          background: color,
          color: "#fff",
          borderRadius: 10,
          fontFamily: "Cairo, sans-serif",
          fontSize: 13,
          fontWeight: 700,
          transition: "transform 200ms",
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}>
          استعرض الكورسات →
        </span>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────── */
export default function LandingPage() {
  const statsSection = useInView(0.3);
  const [activeFilter, setActiveFilter] = useState("الكل");
  const filters = ["الكل", "الصف الأول", "الصف الثاني", "الصف الثالث", "مجاني"];
  const filteredCourses = activeFilter === "الكل" ? COURSES : COURSES.filter(c => c.grade === activeFilter);

  return (
    <div className="page-bg" dir="rtl" style={{ overflowX: "hidden" }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ScrollProgress />
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        paddingTop: 80,
        paddingBottom: 100,
        borderBottom: "1px solid var(--border-subtle)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle dot grid bg */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, var(--border-subtle) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          opacity: 0.6,
          pointerEvents: "none",
        }} />
        {/* Accent glow top-left */}
        <div style={{
          position: "absolute",
          top: -80,
          left: -80,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,48,74,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: 60,
            alignItems: "center",
          }} className="hero-grid">

            {/* LEFT: Text */}
            <div className="hero-left">
              {/* Pill */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(232,48,74,0.08)",
                border: "1px solid rgba(232,48,74,0.2)",
                borderRadius: 100,
                padding: "6px 14px",
                marginBottom: 24,
              }}>
                <span style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#e8304a",
                  display: "inline-block",
                  animation: "pulse 2s infinite",
                }} />
                <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#e8304a", fontWeight: 600 }}>
                  منصة {TEACHER.name} الرسمية
                </span>
              </div>

              <h1 style={{
                fontFamily: "Cairo, sans-serif",
                fontSize: "clamp(38px, 5.5vw, 64px)",
                fontWeight: 900,
                lineHeight: 1.2,
                color: "var(--text-primary)",
                marginBottom: 16,
                letterSpacing: "-1.5px",
              }}>
                تعلم الأحياء<br />
                <span style={{
                  background: "linear-gradient(135deg, #e8304a 0%, #ff6b35 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>بأسلوب مختلف</span>
              </h1>

              <p style={{
                fontFamily: "Cairo, sans-serif",
                fontSize: 16,
                color: "var(--text-secondary)",
                lineHeight: 1.9,
                maxWidth: 500,
                marginBottom: 36,
              }}>{TEACHER.bio}</p>

              {/* CTA buttons */}
              <div className="hero-buttons" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
                <Link href="/register" style={{
                  background: "#e8304a",
                  color: "#fff",
                  fontFamily: "Cairo, sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  padding: "13px 28px",
                  borderRadius: 12,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "transform 200ms, box-shadow 200ms",
                  boxShadow: "0 4px 16px rgba(232,48,74,0.3)",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(232,48,74,0.35)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(232,48,74,0.3)"; }}
                  id="hero-cta"
                >
                  اشترك دلوقتي ! 
                </Link>
                <Link href="#courses" style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-primary)",
                  fontFamily: "Cairo, sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  padding: "13px 28px",
                  borderRadius: 12,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "background 200ms, border-color 200ms",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-surface)"; }}
                  id="hero-courses"
                >
                  <BookOpen size={16} />
                  استعرض الكورسات
                </Link>
              </div>

              {/* Quick stats */}
              <div ref={statsSection.ref} className="stats-wrap" style={{
                borderTop: "1px solid var(--border-subtle)",
                paddingTop: 28,
                width: "100%",
              }}>
                {TEACHER.stats.map((s, i) => (
                  <div key={i} className="stat-item">
                    <StatCounter value={s.value} suffix={s.suffix} label={s.label} start={statsSection.inView} />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Teacher card */}
            <div className="hero-visual" style={{ display: "flex", justifyContent: "center" }}>
              <div style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-default)",
                borderRadius: 24,
                padding: 32,
                textAlign: "center",
                width: "100%",
                maxWidth: 340,
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Top strip */}
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: 4,
                  background: "linear-gradient(90deg, #e8304a, #ff6b35)",
                }} />

                {/* Avatar */}
                <div style={{
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(232,48,74,0.12), rgba(255,107,53,0.08))",
                  border: "3px solid rgba(232,48,74,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "16px auto 18px",
                  fontSize: 52,
                }}>👨‍🏫</div>

                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
                  {TEACHER.name}
                </div>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#e8304a", marginBottom: 18, fontWeight: 600 }}>
                  {TEACHER.subject}
                </div>

                <div style={{ height: 1, background: "var(--border-subtle)", margin: "0 0 16px" }} />

                <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 18 }}>
                  {TEACHER.shortBio}
                </p>

                <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
                  {["الصف الأول", "الصف الثاني", "الصف الثالث"].map(g => (
                    <span key={g} style={{
                      background: "rgba(232,48,74,0.07)",
                      border: "1px solid rgba(232,48,74,0.18)",
                      color: "#e8304a",
                      fontFamily: "Cairo, sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: 100,
                    }}>{g}</span>
                  ))}
                </div>

                {/* Rating */}
                <div style={{ marginTop: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />)}
                  </div>
                  <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>4.9 / 5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF TICKER ── */}
      <section className="ticker-scroll" style={{
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: "18px 24px",
        overflowX: "auto",
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          gap: 0,
          alignItems: "center",
        }}>
          {[
            { icon: "👨‍🎓", val: "+5,000", label: "طالب" },
            { icon: "📹", val: "1.5M+", label: "مشاهدة" },
            { icon: "⭐", val: "4.9/5", label: "التقييم" },
            { icon: "📚", val: "+500", label: "ساعة محتوى" },
            { icon: "🏆", val: "3", label: "سنوات دراسية" },
          ].map((s, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 28px",
              flexShrink: 0,
              borderLeft: i > 0 ? "1px solid var(--border-subtle)" : "none",
            }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GRADES ── */}
      <section id="grades" style={{ padding: "80px 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#e8304a", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 10, textTransform: "uppercase" }}>السنوات الدراسية</p>
            <h2 style={{ fontFamily: "Cairo, sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: "var(--text-primary)", margin: "0 0 10px", letterSpacing: "-0.5px" }}>
              اختار صفك وابدأ رحلتك
            </h2>
            <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 15, color: "var(--text-secondary)" }}>محتوى متخصص لكل مرحلة دراسية</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="grade-grid">
            {[
              { grade: "١", label: "الصف الأول الثانوي", courses: 4, color: "#3b82f6", bg: "rgba(59,130,246,0.06)" },
              { grade: "٢", label: "الصف الثاني الثانوي", courses: 4, color: "#f59e0b", bg: "rgba(245,158,11,0.06)" },
              { grade: "٣", label: "الصف الثالث الثانوي", courses: 5, color: "#e8304a", bg: "rgba(232,48,74,0.06)" },
            ].map((item, i) => (
              <GradeCard key={item.grade} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section id="courses" style={{ padding: "80px 24px", background: "var(--bg-surface)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#e8304a", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 10 }}>الكورسات المتاحة</p>
            <h2 style={{ fontFamily: "Cairo, sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: "var(--text-primary)", margin: "0 0 10px", letterSpacing: "-0.5px" }}>
              محتوى شامل لكل صف
            </h2>
          </div>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  fontFamily: "Cairo, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "8px 20px",
                  borderRadius: 100,
                  border: activeFilter === f ? "1px solid rgba(232,48,74,0.4)" : "1px solid var(--border-default)",
                  background: activeFilter === f ? "rgba(232,48,74,0.1)" : "var(--bg-elevated)",
                  color: activeFilter === f ? "#e8304a" : "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all 200ms",
                }}
              >{f}</button>
            ))}
          </div>

         <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  spaceBetween={20}
  slidesPerView={1}
  navigation
  pagination={{ clickable: true }}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  loop={true}
  breakpoints={{
    480: { slidesPerView: 1.1 },
    640: { slidesPerView: 1.3 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 4 },
  }}
  style={{ paddingBottom: "50px" }}
>
  {filteredCourses.map((course, i) => (
    <SwiperSlide key={course.id} style={{ display: "flex" }}>
      <div style={{ width: "100%" }}>
        <CourseCard course={course} index={i} />
      </div>
    </SwiperSlide>
  ))}
</Swiper>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="features" style={{ padding: "80px 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#e8304a", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 10 }}>المميزات</p>
            <h2 style={{ fontFamily: "Cairo, sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: "var(--text-primary)", margin: "0 0 10px", letterSpacing: "-0.5px" }}>
              ليه تشترك معانا؟
            </h2>
            <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 15, color: "var(--text-secondary)" }}>بنقدم تجربة تعليمية متكاملة</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="features-grid">
            {WHY_US.map((item, i) => <FeatureCard key={i} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── ABOUT TEACHER ── */}
      <section id="about" style={{ padding: "80px 24px", background: "var(--bg-surface)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 64, alignItems: "center" }}>
            {/* Avatar column */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 180,
                height: 180,
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(232,48,74,0.1), rgba(255,107,53,0.06))",
                border: "3px solid rgba(232,48,74,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px",
                fontSize: 72,
                position: "relative",
              }}>
                👨‍🏫
                <div style={{
                  position: "absolute",
                  bottom: 8, left: 8,
                  width: 22, height: 22,
                  borderRadius: "50%",
                  background: "#10b981",
                  border: "2px solid var(--bg-surface)",
                }} />
              </div>
              <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>{TEACHER.name}</div>
              <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#e8304a", fontWeight: 600 }}>{TEACHER.title}</div>
            </div>

            {/* Text column */}
            <div className="about-text">
              <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#e8304a", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 10 }}>عن المدرس</p>
              <h2 style={{ fontFamily: "Cairo, sans-serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 900, color: "var(--text-primary)", margin: "0 0 16px", letterSpacing: "-0.5px" }}>
                مين هو {TEACHER.name}؟
              </h2>
              <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 15, color: "var(--text-secondary)", lineHeight: 2, marginBottom: 24 }}>
                {TEACHER.bio} درّس في كتير من المراكز والمدارس الكبرى، وله قناة يوتيوب بأكتر من مليون ونص مشاهدة. بيؤمن إن كل طالب قادر يتفوق لو اتعلم بالأسلوب الصح.
              </p>

              {/* Credential chips */}
              <div className="about-chips" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
                {[
                  { icon: "🏆", text: "خبرة 15+ سنة" },
                  { icon: "🎓", text: "بكالوريوس علوم — القاهرة" },
                  { icon: "📺", text: "1.5M+ مشاهدة يوتيوب" },
                  { icon: "👥", text: "+5,000 طالب" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 10,
                    padding: "8px 14px",
                  }}>
                    <span style={{ fontSize: 14 }}>{item.icon}</span>
                    <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 12, color: "var(--text-secondary)", fontWeight: 600 }}>{item.text}</span>
                  </div>
                ))}
              </div>

              <Link href="/register" style={{
                background: "#e8304a",
                color: "#fff",
                fontFamily: "Cairo, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                padding: "12px 26px",
                borderRadius: 12,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 4px 14px rgba(232,48,74,0.28)",
                transition: "transform 200ms, box-shadow 200ms",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; }}
                id="about-cta"
              >
                اشترك معانا الآن ←
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" style={{ padding: "80px 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#e8304a", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 10 }}>آراء الطلاب</p>
            <h2 style={{ fontFamily: "Cairo, sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: "var(--text-primary)", margin: "0 0 10px", letterSpacing: "-0.5px" }}>
              طلابنا بيقولوا إيه؟
            </h2>
            <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 15, color: "var(--text-secondary)" }}>آراء حقيقية من طلاب استفادوا</p>
          </div>
          <Swiper
  modules={[Pagination, Autoplay]}
  spaceBetween={16}
  slidesPerView={1}
  centeredSlides={true}
  autoplay={{ delay: 3500, disableOnInteraction: false }}
  loop={true}
  pagination={{ clickable: true }}
  breakpoints={{
    640: { slidesPerView: 1.2, centeredSlides: false },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
  style={{ paddingBottom: "50px" }}
>
  {TESTIMONIALS.map((t, i) => (
    <SwiperSlide key={i} style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 340 }}>
        <TestimonialCard t={t} index={i} />
      </div>
    </SwiperSlide>
  ))}
</Swiper>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        padding: "80px 24px",
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border-subtle)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Dot grid */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, var(--border-subtle) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          opacity: 0.5,
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ fontSize: 52, marginBottom: 20, display: "block" }}>🚀</div>
          <h2 style={{
            fontFamily: "Cairo, sans-serif",
            fontSize: "clamp(26px, 4vw, 42px)",
            fontWeight: 900,
            color: "var(--text-primary)",
            marginBottom: 12,
            letterSpacing: "-0.5px",
          }}>
            ابدأ رحلتك نحو التفوق النهارده
          </h2>
          <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 15, color: "var(--text-secondary)", marginBottom: 36, lineHeight: 1.9 }}>
            سجّل مجاناً وابدأ بكورس الإعداد الجيني والتكاثر كهدية من مستر أحمد.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register" style={{
              background: "#e8304a",
              color: "#fff",
              fontFamily: "Cairo, sans-serif",
              fontSize: 15,
              fontWeight: 700,
              padding: "14px 32px",
              borderRadius: 12,
              textDecoration: "none",
              boxShadow: "0 4px 18px rgba(232,48,74,0.32)",
              transition: "transform 200ms, box-shadow 200ms",
              display: "inline-block",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 26px rgba(232,48,74,0.38)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 18px rgba(232,48,74,0.32)"; }}
              id="footer-cta-register"
            >
              سجّل مجاناً الآن ←
            </Link>
            <Link href="/login" style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-default)",
              color: "var(--text-primary)",
              fontFamily: "Cairo, sans-serif",
              fontSize: 15,
              fontWeight: 700,
              padding: "14px 32px",
              borderRadius: 12,
              textDecoration: "none",
              display: "inline-block",
              transition: "background 200ms",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-surface)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)"; }}
              id="footer-cta-login"
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-subtle)", padding: "48px 24px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }} className="footer-grid">
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#e8304a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <BookOpen size={18} color="white" />
                </div>
                <div>
                  <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 15, fontWeight: 800, color: "var(--text-primary)" }}>{TEACHER.name}</div>
                  <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 11, color: "var(--text-muted)" }}>منصة التعليم الرسمية</div>
                </div>
              </div>
              <p style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.9, maxWidth: 260 }}>
                منصة تعليمية متخصصة في مادة الأحياء لجميع مراحل الثانوية العامة.
              </p>
            </div>

            {[
              { title: "الكورسات", links: ["الصف الأول الثانوي", "الصف الثاني الثانوي", "الصف الثالث الثانوي", "كورسات مجانية"] },
              { title: "المنصة", links: ["الرئيسية", "تسجيل الدخول", "إنشاء حساب", "اتصل بنا"] },
              { title: "تابعنا", links: ["يوتيوب", "فيسبوك", "تيليجرام", "واتساب"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, fontWeight: 800, color: "var(--text-primary)", marginBottom: 16 }}>{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map(link => (
                    <a key={link} href="#" style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-muted)", textDecoration: "none", transition: "color 160ms" }}
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
            <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>By Reactech Team</span>
          </div>
        </div>
      </footer>

      {/* Styles moved to page-styles.css */}
    </div>
  );
}