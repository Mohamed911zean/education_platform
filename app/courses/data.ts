export interface Course {
  id: string;
  title: string;
  subtitle: string;
  variant: "enrolled" | "catalog";
  grade?: string;
  unit?: string;
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

export const ENROLLED: Course[] = [
  {
    id: "bio-genetics", variant: "enrolled",
    title: "علم الوراثة والتطور", subtitle: "الصف الثالث الثانوي",
    grade: "الصف الثالث", unit: "الوراثة",
    progress: 68, lessonsTotal: 60, lessonsDone: 24, nextLesson: "الدرس 25",
    rating: 4.9, instructorName: "مستر أحمد النجار",
    gradientFrom: "#e8304a", gradientTo: "#ff6b35",
  },
  {
    id: "bio-dna", variant: "enrolled",
    title: "البيولوجيا الجزيئية (DNA)", subtitle: "الصف الثالث الثانوي",
    grade: "الصف الثالث", unit: "البيولوجيا الجزيئية",
    progress: 42, lessonsTotal: 12, lessonsDone: 5, nextLesson: "الدرس 6",
    rating: 4.8, instructorName: "مستر أحمد النجار",
    gradientFrom: "#3b82f6", gradientTo: "#8b5cf6",
  },
  {
    id: "bio-cell", variant: "enrolled",
    title: "وحدة الخلية الحية", subtitle: "الصف الأول الثانوي",
    grade: "الصف الأول", unit: "البيولوجيا الجزيئية",
    progress: 91, lessonsTotal: 22, lessonsDone: 20, nextLesson: "الدرس 21",
    rating: 4.8, instructorName: "مستر أحمد النجار",
    gradientFrom: "#10b981", gradientTo: "#34d399",
  },
];

export const AVAILABLE: Course[] = [
  {
    id: "bio-reproduction", variant: "catalog",
    title: "التكاثر في الكائنات الحية", subtitle: "الصف الثالث",
    grade: "الصف الثالث", unit: "التكاثر",
    price: 279, originalPrice: 380, isLive: true,
    rating: 4.8, reviews: 340, duration: "32 ساعة",
    instructorName: "مستر أحمد النجار",
    gradientFrom: "#3b82f6", gradientTo: "#6366f1",
  },
  {
    id: "bio-immunity", variant: "catalog",
    title: "المناعة في الكائنات الحية", subtitle: "الصف الثالث",
    grade: "الصف الثالث", unit: "المناعة",
    price: 199, originalPrice: 280, isNew: true,
    rating: 4.9, reviews: 210, duration: "18 ساعة",
    instructorName: "مستر أحمد النجار",
    gradientFrom: "#10b981", gradientTo: "#34d399",
  },
  {
    id: "bio-hormones", variant: "catalog",
    title: "التنسيق الهرموني", subtitle: "الصف الثالث",
    grade: "الصف الثالث", unit: "التنسيق الهرموني",
    rating: 4.9, reviews: 512, duration: "20 ساعة",
    instructorName: "مستر أحمد النجار",
    gradientFrom: "#f59e0b", gradientTo: "#fb923c",
  },
  {
    id: "bio-support", variant: "catalog",
    title: "الدعامة والحركة", subtitle: "الصف الثالث",
    grade: "الصف الثالث", unit: "الدعامة والحركة",
    price: 249, originalPrice: 350,
    rating: 4.7, reviews: 175, duration: "24 ساعة",
    instructorName: "مستر أحمد النجار",
    gradientFrom: "#8b5cf6", gradientTo: "#7c3aed",
  },
  {
    id: "bio-basics", variant: "catalog",
    title: "أساسيات علم الأحياء", subtitle: "الصف الأول",
    grade: "الصف الأول", unit: "البيولوجيا الجزيئية",
    price: 229, originalPrice: 320,
    rating: 4.7, reviews: 290, duration: "28 ساعة",
    instructorName: "مستر أحمد النجار",
    gradientFrom: "#06b6d4", gradientTo: "#0ea5e9",
  },
  {
    id: "bio-review", variant: "catalog",
    title: "المراجعة النهائية الشاملة", subtitle: "الصف الثالث",
    grade: "الصف الثالث", unit: "الكل",
    rating: 4.9, reviews: 885, duration: "40 ساعة",
    instructorName: "مستر أحمد النجار",
    gradientFrom: "#e8304a", gradientTo: "#991b1b",
  },
];

export const GRADES = ["الكل", "الصف الأول", "الصف الثاني", "الصف الثالث"];
export const UNITS = ["الكل", "الدعامة والحركة", "التنسيق الهرموني", "التكاثر", "المناعة", "الوراثة", "البيولوجيا الجزيئية"];
