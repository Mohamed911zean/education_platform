export interface Course {
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

export const ENROLLED: Course[] = [
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

export const AVAILABLE: Course[] = [
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

export const GRADES = ["الكل", "الصف الأول", "الصف الثاني", "الصف الثالث"];
export const SUBJECTS = ["الكل", "أحياء", "فيزياء", "كيمياء", "رياضيات", "جيولوجيا", "أخرى"];
