import type { Metadata } from "next";
import { Cairo, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduRise — منصة التعليم الثانوي الأولى في مصر",
  description: "اكتشف طريقة جديدة تجعل التفوق حتمياً. أكثر من 500,000 طالب يتعلمون على EduRise.",
  keywords: "تعليم, ثانوي, مصر, كورسات, مذاكرة, EduRise",
  openGraph: {
    title: "EduRise — منصة التعليم الثانوي الأولى في مصر",
    description: "اكتشف طريقة جديدة تجعل التفوق حتمياً.",
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${syne.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
