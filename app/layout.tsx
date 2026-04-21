import type { Metadata } from "next";
import { Cairo, Syne } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "منصة المستر — مستر أحمد النجار | الأحياء",
  description: "منصة التعليم الرسمية لمستر أحمد النجار — مادة الأحياء لطلاب الثانوية العامة في مصر.",
  keywords: "أحياء, ثانوية عامة, مصر, كورسات, مستر أحمد النجار, منصة المستر",
  openGraph: {
    title: "منصة المستر — مستر أحمد النجار",
    description: "شرح الأحياء بطريقة مبتكرة لطلاب الثانوية العامة.",
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
      suppressHydrationWarning
      className={`${cairo.variable} ${syne.variable}`}
    >
      <body
        className="min-h-screen font-cairo"
        style={{ fontFamily: "var(--font-cairo, 'Cairo'), sans-serif" }}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
