"use client";

import { BookOpen, Star, Play, Lock } from "lucide-react";
import Link from "next/link";

/* ── Enrolled variant data ── */
interface EnrolledCourse {
  variant: "enrolled";
  id: string;
  title: string;
  subtitle?: string;
  progress: number;      // 0-100
  lessonsTotal: number;
  lessonsDone: number;
  nextLesson: string;
  rating: number;
  instructorName: string;
  gradientFrom?: string;
  gradientTo?: string;
}

/* ── Catalog variant data ── */
interface CatalogCourse {
  variant: "catalog";
  id: string;
  title: string;
  subtitle?: string;
  price?: number;        // undefined = free
  originalPrice?: number;
  isLive?: boolean;
  isNew?: boolean;
  duration?: string;
  rating: number;
  reviews: number;
  instructorName: string;
  gradientFrom?: string;
  gradientTo?: string;
}

type CourseCardProps = EnrolledCourse | CatalogCourse;

export function CourseCard(props: CourseCardProps) {
  const from = props.gradientFrom ?? "#e8304a";
  const to = props.gradientTo ?? "#ff6b35";

  /* ── Thumbnail ── */
  const Thumbnail = () => (
    <div
      className="relative w-full h-36 rounded-xl flex items-center justify-center mb-4 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <BookOpen size={40} color="rgba(255,255,255,0.7)" />
      {props.variant === "catalog" && props.isLive && (
        <span className="absolute top-2 right-2 badge badge-live flex items-center gap-1">
          <span className="pulse-dot" />
          مباشر
        </span>
      )}
      {props.variant === "catalog" && props.isNew && !props.isLive && (
        <span className="absolute top-2 right-2 badge badge-new">جديد</span>
      )}
      {props.variant === "catalog" && (
        <div className="absolute bottom-2 left-2">
          {props.price === undefined ? (
            <span className="badge badge-done">مجاني</span>
          ) : (
            <span className="badge badge-grade font-syne">
              {props.price} ج
              {props.originalPrice && (
                <span className="line-through opacity-60 mr-1 text-[10px]">{props.originalPrice}</span>
              )}
            </span>
          )}
        </div>
      )}
    </div>
  );

  /* ── Stars ── */
  const Stars = ({ rating }: { rating: number }) => (
    <span className="stars">{"★".repeat(Math.round(rating))}</span>
  );

  /* ── Enrolled variant ── */
  if (props.variant === "enrolled") {
    return (
      <div className="card group flex flex-col gap-3 animate-fade-up">
        <Thumbnail />
        <div>
          <h3
            className="text-sm font-bold mb-0.5 line-clamp-2"
            style={{ fontFamily: "var(--font-cairo)", color: "var(--text-primary)" }}
          >
            {props.title}
          </h3>
          {props.subtitle && (
            <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-cairo)" }}>
              {props.subtitle}
            </p>
          )}
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-xs mb-1.5" style={{ fontFamily: "var(--font-cairo)" }}>
            <span style={{ color: "var(--text-muted)" }}>
              {props.lessonsDone}/{props.lessonsTotal} درس
            </span>
            <span className="font-bold" style={{ fontFamily: "var(--font-syne)", color: "var(--accent-teal)" }}>
              {props.progress}%
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${props.progress}%` }} />
          </div>
        </div>

        {/* Rating + instructor */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: from }}
            >
              {props.instructorName[0]}
            </div>
            <span className="text-xs" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-muted)" }}>
              {props.instructorName}
            </span>
          </div>
          <Stars rating={props.rating} />
        </div>

        <Link
          href={`/courses/${props.id}`}
          id={`course-continue-${props.id}`}
          className="btn btn-teal btn-sm w-full mt-auto"
        >
          <Play size={13} />
          استكمل التعلم
        </Link>
      </div>
    );
  }

  /* ── Catalog variant ── */
  return (
    <div className="card group flex flex-col gap-3 animate-fade-up">
      <Thumbnail />
      <div>
        <h3
          className="text-sm font-bold mb-0.5 line-clamp-2"
          style={{ fontFamily: "var(--font-cairo)", color: "var(--text-primary)" }}
        >
          {props.title}
        </h3>
        {props.subtitle && (
          <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-cairo)" }}>
            {props.subtitle}
          </p>
        )}
      </div>

      {/* Rating + reviews */}
      <div className="flex items-center gap-2 text-xs" style={{ fontFamily: "var(--font-cairo)" }}>
        <Stars rating={props.rating} />
        <span className="font-bold" style={{ fontFamily: "var(--font-syne)", color: "var(--accent-gold)" }}>
          {props.rating}
        </span>
        <span style={{ color: "var(--text-muted)" }}>({props.reviews} تقييم)</span>
        {props.duration && (
          <>
            <span style={{ color: "var(--border-strong)" }}>·</span>
            <span style={{ color: "var(--text-muted)" }}>{props.duration}</span>
          </>
        )}
      </div>

      {/* Instructor */}
      <div className="flex items-center gap-1.5">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: from }}
        >
          {props.instructorName[0]}
        </div>
        <span className="text-xs" style={{ fontFamily: "var(--font-cairo)", color: "var(--text-muted)" }}>
          {props.instructorName}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-1">
        <button
          id={`course-preview-${props.id}`}
          className="btn btn-secondary btn-sm flex-1"
        >
          معاينة مجانية
        </button>
        <button
          id={`course-enroll-${props.id}`}
          className="btn btn-primary btn-sm flex-1"
        >
          اشترك
        </button>
      </div>
    </div>
  );
}
