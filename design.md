# EduRise — Complete Design System & Page Specifications
> Production-ready design documentation for an Arabic RTL online education platform (Egyptian secondary school market). Every page described here is fully implementable from this document alone.

---

## Design Philosophy

**Concept: "Dark Academy"**
The visual language is built around the feeling of studying late at night — immersive, cinematic, focused. Think premium esports UI meets luxury editorial magazine. Every screen must feel crafted for serious students who mean business.

**Tone:** Confident · Electric · Premium · Arabic-first (RTL throughout)
**Aesthetic direction:** Dark-dominant with punchy neon-coral accent pops. Not gloomy — *cinematic*.
**The signature detail:** A subtle animated radial grid that pulses softly on every page, making the platform feel alive and breathing.

---

## Design Technologies
-Tailwindcss , any library needed to make best design system

## Design Tokens

### Color Palette

```css
/* Base Backgrounds */
--bg-base:         #07090f   /* deepest page background */
--bg-surface:      #0e1219   /* cards, panels, inputs */
--bg-elevated:     #141b26   /* hover states, dropdowns */
--bg-overlay:      #1a2234   /* modals, tooltips */

/* Brand Accents */
--accent:          #ff3366   /* primary — coral red, CTAs, highlights */
--accent-warm:     #ff6b35   /* secondary — warm orange, hover states */
--accent-teal:     #00d4aa   /* success, progress, online status */
--accent-gold:     #f5c842   /* achievements, badges, premium tier */
--accent-blue:     #4d9fff   /* info, links, tags */

/* Typography */
--text-primary:    #f0f4ff   /* headings, important labels */
--text-secondary:  #8892a8   /* body, descriptions */
--text-muted:      #3d4a5c   /* placeholders, disabled states */

/* Borders */
--border-subtle:   rgba(255,255,255,0.05)
--border-default:  rgba(255,255,255,0.09)
--border-strong:   rgba(255,255,255,0.18)
--border-accent:   rgba(255,51,102,0.35)

/* Ambient Glows */
--glow-red:        rgba(255,51,102,0.22)
--glow-teal:       rgba(0,212,170,0.18)
--glow-gold:       rgba(245,200,66,0.20)
--glow-blue:       rgba(77,159,255,0.18)
```

---

### Typography

**Display / Numbers:** `Syne` — weight 800, used exclusively for large stats and hero numerals. Feels futuristic and bold.
**Arabic UI:** `Cairo` — weights 300, 400, 700, 900. All Arabic content.
**Monospace:** `JetBrains Mono` — timestamps, IDs, lesson counters.

| Role | Font | Size | Weight | Color |
|---|---|---|---|---|
| Hero headline | Cairo | 56–80px | 900 | --text-primary |
| Section heading | Cairo | 32–44px | 800 | --text-primary |
| Card title | Cairo | 18–22px | 700 | --text-primary |
| Body text | Cairo | 14–16px | 400 | --text-secondary |
| Caption / label | Cairo | 11–13px | 600 | --text-muted |
| Stat number | Syne | 40–64px | 800 | --text-primary |
| Timestamp / code | JetBrains Mono | 12px | 400 | --text-muted |

**Line height:** 1.8 for Arabic body text (Arabic letters need more breathing room).
**Letter spacing:** -1px to -2px on large headings for tighter, more editorial feel.

---

### Spacing Scale

```
4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128px
```

---

### Border Radius

```css
--radius-xs:   4px    /* tiny chips */
--radius-sm:   8px    /* badges, tags, inputs */
--radius-md:   14px   /* buttons, small cards */
--radius-lg:   20px   /* standard cards */
--radius-xl:   30px   /* modals, large featured cards */
--radius-full: 9999px /* pills, avatar circles */
```

---

### Shadows & Glows

```css
/* Standard card */
box-shadow: 0 0 0 1px var(--border-default), 0 20px 60px rgba(0,0,0,0.45);

/* Featured / active card */
box-shadow: 0 0 0 1px var(--border-accent), 0 20px 60px var(--glow-red);

/* Floating element */
box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px var(--border-subtle);

/* Input focus ring */
box-shadow: 0 0 0 3px rgba(255,51,102,0.25);

/* Button glow on hover */
box-shadow: 0 8px 32px var(--glow-red), 0 0 0 1px var(--border-accent);
```

---

### Global Page Background

Every single page uses this layered background — it is the platform's signature visual:

```css
background:
  radial-gradient(ellipse 70% 50% at 15% 25%, rgba(255,51,102,0.07) 0%, transparent 65%),
  radial-gradient(ellipse 55% 40% at 85% 75%, rgba(0,212,170,0.05) 0%, transparent 65%),
  repeating-linear-gradient(
    rgba(255,255,255,0.013) 0px, rgba(255,255,255,0.013) 1px,
    transparent 1px, transparent 64px
  ),
  repeating-linear-gradient(
    90deg,
    rgba(255,255,255,0.013) 0px, rgba(255,255,255,0.013) 1px,
    transparent 1px, transparent 64px
  ),
  #07090f;
```

The radial glows pulse subtly via a CSS keyframe animation (scale 1 → 1.1, opacity 0.7 → 1, 8s ease-in-out infinite alternate).

---

## Shared Components

### Button System

```
PRIMARY
  Background:    linear-gradient(135deg, #ff3366 0%, #ff6b35 100%)
  Text:          white, 700 weight, 14px
  Padding:       12px 28px
  Border-radius: --radius-full
  Hover:         translateY(-2px), box-shadow: 0 12px 40px var(--glow-red)
  Active:        translateY(0), scale(0.98)

SECONDARY
  Background:    transparent
  Border:        1px solid var(--border-strong)
  Text:          --text-primary, 600 weight
  Hover:         background rgba(255,255,255,0.05), border --border-strong

GHOST
  Background:    transparent
  Border:        none
  Text:          --text-secondary
  Hover:         text --text-primary, background rgba(255,255,255,0.04)

TEAL (progress/success actions)
  Background:    rgba(0,212,170,0.12)
  Border:        1px solid rgba(0,212,170,0.3)
  Text:          #00d4aa, 700 weight
  Hover:         background rgba(0,212,170,0.2)

GOLD (premium actions)
  Background:    rgba(245,200,66,0.12)
  Border:        1px solid rgba(245,200,66,0.3)
  Text:          #f5c842, 700 weight
```

All buttons: `transition: all 200ms cubic-bezier(0.34,1.56,0.64,1)` for a slight spring feel on hover lift.

---

### Card System

```
BASE CARD
  background:    var(--bg-surface)
  border:        1px solid var(--border-default)
  border-radius: var(--radius-lg)
  padding:       24px

ELEVATED CARD (featured, active)
  All of base card +
  border-left:   3px solid var(--accent)      [RTL: border-right]
  box-shadow:    0 0 40px var(--glow-red)

GLASS CARD (overlays, floating elements)
  background:    rgba(14,18,25,0.75)
  backdrop-filter: blur(20px) saturate(180%)
  border:        1px solid rgba(255,255,255,0.08)
  border-radius: var(--radius-lg)

ACHIEVEMENT CARD
  background:    linear-gradient(135deg, rgba(245,200,66,0.08), rgba(255,107,53,0.05))
  border:        1px solid rgba(245,200,66,0.2)
  box-shadow:    0 0 32px var(--glow-gold)
```

---

### Badge / Tag System

```
GRADE BADGE     bg: rgba(245,200,66,0.12)   text: #f5c842   border: rgba(245,200,66,0.25)
SUBJECT BADGE   bg: rgba(77,159,255,0.12)   text: #4d9fff   border: rgba(77,159,255,0.25)
LIVE BADGE      bg: rgba(255,51,102,0.12)   text: #ff3366   + pulsing 6px red dot left
DONE BADGE      bg: rgba(0,212,170,0.12)    text: #00d4aa   + checkmark icon
LOCKED BADGE    bg: rgba(61,74,92,0.3)      text: #3d4a5c   + lock icon
PREMIUM BADGE   bg: rgba(245,200,66,0.15)   text: #f5c842   + crown icon  border: gold
NEW BADGE       bg: rgba(77,159,255,0.12)   text: #4d9fff   + spark icon
```

All badges: `border-radius: --radius-sm`, `font-size: 11px`, `font-weight: 700`, `padding: 4px 10px`, `border: 1px solid`.

---

### Progress Bar Component

```
Track:   height 6px, background rgba(255,255,255,0.06), border-radius 99px
Fill:    gradient left→right (#00d4aa → #00f5c4), box-shadow 0 0 12px var(--glow-teal)
         transition: width 1.2s cubic-bezier(0.34,1.56,0.64,1)

Large variant (course cards): height 8px
Micro variant (stat rows):    height 3px, no glow
```

---

### Form Inputs

```
Input field:
  background:    var(--bg-surface)
  border:        1px solid var(--border-default)
  border-radius: var(--radius-sm)
  padding:       12px 16px
  font:          Cairo 14px, --text-primary
  placeholder:   --text-muted
  focus:         border-color var(--accent), box-shadow 0 0 0 3px rgba(255,51,102,0.15)
  transition:    border-color 150ms, box-shadow 150ms

Icon-prefixed input:
  padding-right: 44px [RTL]
  icon positioned: right 14px center, 16px, --text-muted color

Error state:
  border-color: #ff3366
  helper text:  12px --accent, margin-top 6px

Success state:
  border-color: #00d4aa
  helper text:  12px --accent-teal
```

---

### Avatar Component

```
Sizes:     24px · 32px · 40px · 48px · 64px · 96px
Shape:     circle (border-radius: 50%)
Ring:      2px solid [grade color], 2px offset (outline)
Fallback:  colored circle with initials, Syne 700, grade-matched color
Online dot: 10px teal circle, white 2px border, bottom-right of avatar
```

Grade color mapping for avatar rings:
- الصف الأول: `--accent-blue`
- الصف الثاني: `--accent-warm`
- الصف الثالث: `--accent` (red — pressure is on, finals year)

---

### Notification Toast

```
Position:  top-right, 24px inset [RTL: top-left]
Width:     340px max
Style:     Glass card + left colored border (3px)
Animation: slideIn from top (300ms spring), fadeOut after 4s

Variants:
  Success: teal border, teal icon
  Error:   red border, red icon
  Info:    blue border, blue icon
  Achievement: gold border, trophy icon, slight golden shimmer on bg
```

---

## Page 1 — Landing Page (Public, No Auth)

**Purpose:** Convert new visitors into registered students. No sidebar.

---

### 1.1 Navbar

**Height:** 68px. **Position:** Fixed top, full width.
**Background:** `rgba(7,9,15,0)` → `rgba(7,9,15,0.92) blur(20px)` on scroll past 80px.
**Border-bottom:** appears on scroll: `1px solid var(--border-subtle)`.

```
RTL layout:
RIGHT:  [Logo mark] [EduRise wordmark]
CENTER: [Courses] [About] [Pricing] [Community]
LEFT:   [Login — ghost button] [Start Free → primary button]
```

Logo mark: 38px square, `border-radius: 10px`, gradient background (`--accent` → `--accent-warm`), white lightning bolt SVG icon inside.

Nav links: Cairo 14px, 600 weight, `--text-secondary`, hover → `--text-primary`, `200ms`.

---

### 1.2 Hero Section

**Height:** 100vh. **Layout:** Two-column CSS grid, `1fr 1fr`, `align-items: center`.
**Padding:** `0 8%`.

**Right Column (text):**

```
[Eyebrow pill]
  → rounded pill, border 1px var(--border-accent), bg rgba(255,51,102,0.08)
  → contents: [pulsing 6px red dot] "منصة رقم 1 للتعليم الثانوي في مصر"
  → font: Cairo 13px 700, color --accent
  → margin-bottom: 24px

[Main headline — 3 lines]
  → "اكتشف طريقة جديدة"
  → "تجعل التفوق"
  → "حتمياً." ← this word has gradient text fill (accent → accent-warm)
  → font: Cairo 72px 900, line-height 1.15, letter-spacing -2px
  → margin-bottom: 20px

[Subheadline]
  → 2-line description: platform benefits, Cairo 16px 400, --text-secondary, line-height 1.9
  → max-width: 480px
  → margin-bottom: 36px

[Button row]
  → [ابدأ رحلتك الآن  →]  PRIMARY button
  → [▶  شاهد كيف يعمل]  SECONDARY button (play icon, opens video modal)
  → gap: 14px

[Divider] 1px var(--border-subtle), margin: 40px 0

[Stats trio — inline row]
  → [500k+]  [طالب مسجّل]
  → [1,200+] [درس متاح]
  → [98%]    [معدل رضا الطلاب]
  → Numbers: Syne 40px 800 --text-primary
  → Labels:  Cairo 13px 400 --text-secondary
  → Dividers: 1px vertical var(--border-subtle) between each
```

**Left Column (visual):**

A floating dashboard preview card tilted 8° clockwise:
```
Glass card (380px wide, 480px tall)
  ├── top bar: avatar + "أهلاً، أحمد 👋" + notification bell
  ├── progress ring (72% complete, teal stroke, centered, 96px)
  ├── "3 دروس متبقية اليوم" below ring, Cairo 13px muted
  ├── 3 mini course chips stacked:
  │     [🧬] الأحياء  ████████░░ 80%   [استكمل]
  │     [⚗️] الكيمياء  █████░░░░░ 50%  [استكمل]
  │     [📐] الرياضيات ██░░░░░░░░ 20%  [ابدأ]
  └── tiny sparkline activity chart at bottom (7 days, teal bars)

Glowing right edge light: vertical 3px line, gradient top→bottom transparent→accent→transparent
Card drop shadow: 0 40px 100px rgba(255,51,102,0.15)
Card tilt: transform rotate(8deg) + hover → rotate(4deg) 500ms ease
```

Three floating micro-badges orbiting the card:
```
Badge A (top-right of card, floats):
  "🏆 إنجاز جديد!"  → gold badge

Badge B (bottom-left, floats with delay):
  "✅ درس اليوم مكتمل" → teal badge

Badge C (top-left, floats with delay):
  [red pulse dot] "مباشر الآن" → accent badge
```

Float animation: `translateY(0) → translateY(-10px)`, `4s ease-in-out infinite`, each badge has different `animation-delay` (0s, 1.5s, 3s).

---

### 1.3 Social Proof Strip

Full-width section, no card borders, just numbers in a row on the shared bg.

```
Layout: 4-column equal grid, centered content, padding 60px 8%
Dividers: 1px solid var(--border-subtle) between columns

Column 1: [125k+]   [متابع فيسبوك]   + Facebook icon
Column 2: [505k+]   [مشترك يوتيوب]  + YouTube icon
Column 3: [500k+]   [طالب مسجّل]    + graduation cap icon
Column 4: [4.9 ★]   [تقييم المنصة]  + star icon in gold

Numbers: Syne 52px 800
Labels:  Cairo 14px 400 --text-secondary
Icons:   24px, colored (platform brand colors)
```

Below the numbers: a horizontal marquee of 20 student avatar circles overlapping slightly (`margin-right: -8px`), followed by text `"+500,000 طالب ينضمون إلينا كل شهر"`. Marquee scrolls RTL, infinite loop.

---

### 1.4 "Why EduRise?" Features Section

**Section header:**
```
[centered]
"ليه EduRise؟"  — Cairo 40px 800
Subtitle — Cairo 16px 400 muted, max-width 500px centered
```

**Layout:** 3-column grid, then 3-column grid (6 features total). `gap: 20px`.

Each feature card (Base Card):
```
├── Icon container: 48px square, border-radius 12px, gradient bg (feature-specific), icon 24px white SVG
├── Title: Cairo 18px 700 --text-primary, margin-top 16px
├── Body: Cairo 14px 400 --text-secondary, line-height 1.8, margin-top 8px
└── hover: card lifts (translateY -4px), border becomes --border-strong
```

Feature list:
1. **شرح مبسط ومركز** — icon: book-open, bg: rgba(accent, 0.15)
2. **خطط مذاكرة ذكية** — icon: calendar-check, bg: rgba(teal, 0.15)
3. **تدريبات عملية** — icon: pencil-ruler, bg: rgba(blue, 0.15)
4. **متابعة دورية وتقييم** — icon: chart-line, bg: rgba(accent-warm, 0.15)
5. **فيديوهات مراجعة ليلة الامتحان** — icon: video, bg: rgba(gold, 0.15)
6. **تفاعل مباشر مع المدرس** — icon: message-circle, bg: rgba(accent, 0.15)

---

### 1.5 Grade Selection Section

**Header:**
```
"اختار صفك الدراسي"  — Cairo 40px 800 centered
Subtitle muted — centered
```

**Layout:** 3 cards in a row. Each card is large (equal width, ~340px tall).

Each grade card:
```
Elevated Card style
  ├── Background image: dark abstract texture specific to that grade (subtle, low opacity)
  ├── Grade number: Syne 96px 800, gradient text, positioned bottom-left
  ├── Grade label: Cairo 22px 700 white, e.g. "الصف الأول الثانوي"
  ├── Subjects list: 3 subject chips in a row (Biology, Chemistry, Math)
  ├── Course count badge: "24 كورس متاح"
  └── CTA button: "استكشف الكورسات →" teal button, full width

Grade color theming:
  الصف الأول: accent-blue ring + blue gradient number
  الصف الثاني: accent-warm ring + orange gradient number
  الصف الثالث: accent ring + red gradient number (finals pressure)

Hover: card scales 1.02, ring glows stronger, button reveals
```

---

### 1.6 Featured Courses Carousel

**Header:**
```
"الكورسات الأكتر طلباً"  — Cairo 40px 800
[← →] navigation arrows, right-aligned to header row
```

Horizontal scrollable row. Shows 3 cards, partially shows 4th to indicate scroll.

Each course card (280px wide):
```
Base Card
  ├── Thumbnail: 280×160px, border-radius 12px 12px 0 0, object-fit cover
  │     + LIVE badge (top-left) or NEW badge depending on status
  ├── Grade + subject badges: horizontal row, margin-top 14px
  ├── Course title: Cairo 17px 700, 2 lines max, ellipsis
  ├── Instructor row: 28px avatar + name, Cairo 13px muted
  ├── Progress bar (if enrolled): teal fill, labeled "32% مكتمل"
  ├── Divider 1px
  ├── Price row:
  │     [Original: ~~350 جنيه~~] [Sale: 249 جنيه]  — red sale price
  │     or [مجاني] gold badge if free
  └── [الاشتراك في الكورس] primary button full width
      [معاينة مجانية] ghost button full width, margin-top 8px
```

---

### 1.7 Testimonials Section

**Header:** `"طلابنا بيقولوا إيه؟"` — Cairo 40px 800 centered.

**Layout:** Masonry-style 3-column grid (some cards taller than others for visual interest).

Each testimonial card (Glass Card):
```
├── Quote mark: large decorative " character, accent color, opacity 0.2, positioned top-right
├── Quote text: Cairo 15px 400 --text-secondary, line-height 1.9, italic
├── Divider
├── Student row: 40px avatar + [name Cairo 14px 700] + [grade badge]
├── Star rating: 5 gold stars
└── Result badge: e.g. "حصل على A في الأحياء" — teal badge
```

Behind the section: large faint text watermark `"نجاح"` in 400px Syne, opacity 0.015, centered.

---

### 1.8 Final CTA Banner

Full-width section with punchy asymmetric layout.

```
Left side (60% width):
  Eyebrow: [⚡ انضم لأكثر من 500,000 طالب]
  Headline: "ابدأ رحلتك نحو التفوق
             من أول يوم." — Cairo 52px 900
  Sub: muted 16px 1 line
  Buttons: [سجّل مجاناً الآن →] PRIMARY  [تعرف أكتر] GHOST

Right side (40% width):
  Decorative element: floating glass card mockup of achievement screen
  (confetti SVG pattern, trophy icon, "مبروك! الصف الأول" text inside)
```

Background: stronger red radial glow for this section only, plus scattered particle dots (small 2px circles, accent color, low opacity).

---

### 1.9 Footer

```
4-column grid, padding 64px 8% 32px

Column 1 (logo + about):
  Logo (full) + 2-line brand description
  Social icons row: Facebook, Instagram, YouTube, TikTok, Telegram
  (each: 36px circle, bg --bg-elevated, icon white SVG, hover bg --accent)

Column 2 (Platform):
  Heading: "المنصة"
  Links: الرئيسية, الكورسات, السنوات الدراسية, الأسعار, المنتدى

Column 3 (Support):
  Heading: "الدعم"
  Links: اتصل بنا, سياسة الخصوصية, الشروط والأحكام, المساعدة, الإبلاغ عن مشكلة

Column 4 (Newsletter):
  Heading: "اشترك في النشرة البريدية"
  Input: email input field
  Button: [اشترك] PRIMARY button, full width, margin-top 8px
  Sub caption: "بدون سبام. إلغاء الاشتراك وقت ما تحب."

Bottom strip (full width):
  Divider 1px --border-subtle
  Left: "© 2025 EduRise. جميع الحقوق محفوظة."
  Right: "Developed by [name]"
  Both: Cairo 12px --text-muted
```

---

## Page 2 — Login Page

**Layout:** Full viewport, two-column split. No navbar, no footer.

### Left Panel (40% width)

Brand immersion panel — purely visual, no interaction.

```
Background: deep red radial glow at center on base bg + grid texture
Content (centered vertically):
  ├── Logo mark (64px) + wordmark
  ├── Tagline: "مستقبلك بيبدأ هنا." — Cairo 28px 700
  ├── Divider 1px, width 48px, accent color, centered
  ├── Stats column:
  │     [500k+] طالب يثق فينا
  │     [1,200+] درس متاح
  │     [98%] معدل رضا
  │     Each stat: Syne 28px number + Cairo 13px label, --text-secondary
  └── Bottom: rotating testimonial quote (auto-cycles every 5s, fade transition)
        Quote text + student name + grade badge
```

### Right Panel (60% width)

Login form container, centered vertically, max-width 440px, centered horizontally.

```
[Back arrow + "العودة للرئيسية" — ghost link, top-left of panel]

Page title: "مرحباً بيك تاني 👋" — Cairo 32px 800, margin-bottom 8px
Subtitle:   "سجّل دخولك عشان تكمل رحلتك." — 15px muted

[Google OAuth button — full width]
  bg: --bg-elevated, border: --border-strong
  Left: [G logo colored 20px] [تسجيل الدخول بـ Google] — Cairo 14px 600 white
  Hover: border --border-accent
  Height: 48px

[Or divider]
  ── or ──  (1px lines each side, "أو" text centered, --text-muted 12px)

[Form]
  Label: "البريد الإلكتروني" — Cairo 13px 600 --text-secondary, margin-bottom 6px
  Input: email type, placeholder "example@email.com" , full width

  Label: "كلمة السر"
  Input: password type, placeholder "••••••••"
    Right icon: eye toggle (show/hide), 16px, --text-muted
  
  [Forgot password link] — right-aligned, 13px --accent, hover underline

  [تسجيل الدخول] PRIMARY button, full width, height 48px, margin-top 8px
    Loading state: spinner replaces text, disabled, opacity 0.7

[Bottom link]
  "مش عندك حساب؟  [سجّل هنا] " — 14px centered
  "سجّل هنا" in --accent color, hover underline

[Error toast (conditional)]
  Red inline alert below password field: "الإيميل أو كلمة السر غلط."
```

---

## Page 3 — Register Page

Same two-column layout as Login. Left panel identical.

Right panel — multi-step form with step indicator:

### Step Indicator

```
[1] ── [2] ── [3]
 ↑
Active step: filled accent circle (24px), step number white Syne 12px
Future step: outlined circle, muted
Completed step: teal filled circle, checkmark icon
Connector line: 1px dashed, muted; completed segment: teal solid
```

---

### Step 1 — Basic Info

```
Title: "إنشاء حساب جديد" — 32px 800
Subtitle: "خطوة 1 من 3 — معلوماتك الأساسية"

Fields:
  Full name input     → [اسمك الكامل]
  Email input         → [البريد الإلكتروني]
  Phone input         → [رقم الموبايل] with +20 country prefix pill on right

[Google OAuth button — same as login]
[Or divider]

[التالي →] PRIMARY button full width
```

---

### Step 2 — Academic Info

```
Title: "معلوماتك الدراسية" — 28px 800
Subtitle: "خطوة 2 من 3"

[Grade level selector — card-based, NOT dropdown]
  3 clickable cards in a row:
    [الصف الأول] [الصف الثاني] [الصف الثالث]
  Each: 100px wide, centered label, grade color ring
  Selected state: Elevated Card style (accent border + glow)

[Subjects multi-select — chip-based]
  Label: "المواد اللي بتذاكرها"
  Chip grid (wrapping):
    [الأحياء] [الكيمياء] [الفيزياء] [الرياضيات] [اللغة العربية] etc.
  Unselected chip: Base badge style (--bg-elevated, --border-default)
  Selected chip: Elevated badge (accent border, rgba accent bg, accent text, checkmark icon left)
  Multiple selection allowed.

[التالي →] PRIMARY  [← رجوع] GHOST — side by side
```

---

### Step 3 — Security

```
Title: "أمان حسابك" — 28px 800
Subtitle: "خطوة 3 من 3"

Password input with strength meter below:
  ├── Input: password field, eye toggle
  ├── Strength bar: 4 segments, fills left→right:
  │     1 red segment = weak
  │     2 orange = fair
  │     3 yellow = good
  │     4 green = strong
  └── Strength label: "ضعيفة" / "مقبولة" / "كويسة" / "قوية"

Confirm password input

[Terms checkbox]
  Custom checkbox (accent filled on check, animated checkmark SVG)
  "موافق على الشروط والأحكام وسياسة الخصوصية"
  Links inline, accent color

[إنشاء الحساب ✓] PRIMARY button full width, height 48px

[← رجوع] ghost link centered below button
```

**Step 3 Success state (after submit):**
Full-panel overlay animation:
```
Confetti burst (CSS particle animation, accent + gold + teal colored pieces)
Centered content:
  ✓ (large animated checkmark, draws itself via SVG stroke animation, teal color)
  "أهلاً بيك في EduRise! 🎉" — 28px 800
  "حسابك اتعمل بنجاح." — muted 15px
  [ابدأ التعلم الآن →] PRIMARY button
```

---

## Page 4 — Student Dashboard

**Layout:** Fixed right sidebar (240px) + main content area.

---

### Sidebar

```
Width: 240px. Fixed full height. Background: var(--bg-surface).
Border-left: 1px solid var(--border-default). [RTL: border-left is the divider]

Top section (80px):
  Logo mark (32px) + "EduRise" wordmark

Student mini-card (inside sidebar, 16px padding):
  ├── 48px avatar (with grade-color ring)
  ├── Name: Cairo 14px 700 --text-primary
  ├── Grade: Cairo 12px --text-muted (e.g. "الصف الثالث الثانوي")
  └── XP bar: thin 4px teal progress bar, labeled "الليفل 12" left, "75%" right
              Cairo 11px 600 --text-muted

Divider 1px.

Navigation items (padding 8px):
  Each nav item: padding 11px 14px, border-radius 10px, full width, RTL flex row
    → Icon: 18px SVG stroke, --text-muted
    → Label: Cairo 13px 600 --text-secondary
    → Notification count badge (optional): 16px pill, accent bg, white 10px text

  ACTIVE state:
    background: rgba(255,51,102,0.1)
    border-right: 3px solid var(--accent)  [RTL: this is the visible edge]
    icon color: --accent
    label color: --text-primary

  HOVER state:
    background: rgba(255,255,255,0.04)
    label color: --text-primary
    200ms ease

Nav items list:
  🏠  الرئيسية
  📚  كورساتي          [badge: enrolled count]
  🎯  تقدمي
  🏆  الإنجازات        [badge: new achievements count, gold bg]
  💬  المنتدى          [badge: unread count]
  📅  الجدول الأسبوعي

[spacer flex-grow]

Bottom section:
  ⚙️  الإعدادات
  🚪  تسجيل الخروج
```

---

### Top Navbar (Dashboard)

```
Height: 64px. Background: rgba(7,9,15,0.85) blur(18px).
Border-bottom: 1px solid var(--border-subtle).

RIGHT: Breadcrumb — "الرئيسية" (muted) / "Dashboard" (--text-primary)
       Cairo 14px, chevron separator

LEFT (flex row, gap 12px):
  [Search button — icon only, opens search overlay on click]
  [Notification bell icon — 20px]
    Red dot badge with count (8px, --accent bg, white 9px text)
  [Points pill]
    bg: rgba(245,200,66,0.1), border: rgba(245,200,66,0.2)
    [coin icon 14px] [240 نقطة] — Cairo 13px 700 --accent-gold
  [Avatar 36px + chevron-down 12px]
    Dropdown on click (see below)
```

Avatar dropdown:
```
Glass card, 220px wide, positioned below avatar, right-aligned
  ├── Student name + email — Cairo 14px 700 / 12px muted
  ├── Divider
  ├── [👤 حسابي]
  ├── [⚙️ الإعدادات]
  ├── [🎁 الخطة المدفوعة]
  ├── Divider
  └── [🚪 تسجيل الخروج] — accent text color
```

---

### Dashboard Main Content

**Padding:** 32px. **Layout:** CSS Grid, responsive.

#### Welcome Banner

Full-width card at top:
```
Elevated Card, no left border accent
Background: subtle red-to-transparent gradient overlay on base bg
padding: 28px 32px

RTL layout:
Right side:
  Greeting: "صباح الخير، أحمد 👋" — Cairo 22px 700
  Sub: "عندك 3 دروس لازم تكملهم النهارده." — 15px muted
  [استكمل التعلم →] PRIMARY button

Left side (decorative):
  Circular progress ring (160px diameter):
    Stroke width: 8px
    Track: rgba(255,255,255,0.06)
    Fill: teal gradient, stroke-dashoffset animated on page load
    Center text: [72%] Syne 32px 800 / ["أنجزت"] Cairo 13px muted
  Label below: "من هدف اليوم"
```

---

#### Stats Row

4 stat cards in a row below welcome banner. `grid-template-columns: repeat(4, 1fr)`, `gap: 16px`.

Each stat card (Base Card):
```
├── Icon: 40px square, border-radius 10px, colored bg, white SVG icon 20px
├── Value: Syne 32px 800 --text-primary
├── Label: Cairo 13px 400 --text-secondary, margin-top 4px
└── Trend (optional): [↑ 12% هذا الأسبوع] — 11px teal text with arrow icon
```

Stats:
1. 🎬 **24** — درس مكتمل — icon bg: rgba(teal,0.15)
2. ⏱️ **8.5 hrs** — وقت المذاكرة — icon bg: rgba(blue,0.15)
3. ⭐ **240** — نقاط مكتسبة — icon bg: rgba(gold,0.15)
4. 🔥 **7 days** — سلسلة المذاكرة — icon bg: rgba(accent-warm,0.15)

---

#### My Courses (Continue Learning)

Section header row:
```
RIGHT: "كورساتي" — Cairo 22px 700
LEFT: "عرض الكل →" — ghost link, Cairo 14px --accent
```

**Layout:** Horizontal scroll row. 3 cards visible, partially shows 4th.

Each enrolled course card (280px wide, Base Card):
```
├── Thumbnail strip: full width, 140px height, object-fit cover, rounded top
│     + subject badge overlaid top-right
│     + completion % overlaid top-left: e.g. "32%" — pill, semi-transparent dark bg
├── [body padding 16px]
├── Course title: Cairo 16px 700, 2 lines max
├── Instructor: 24px avatar + name, 12px muted
├── Last watched: "آخر درس: المايوز — الجزء 2" — 12px muted, clock icon
├── Progress bar: teal, 6px, labeled ends "0" — "24 درس"
└── [استكمل التعلم →] TEAL button full width
```

---

#### Weekly Activity Chart

Base Card, full width.

```
Header row:
  RIGHT: "نشاطك التعليمي" — Cairo 18px 700
  LEFT: [هذا الأسبوع ▾] dropdown toggle — shows week selector

Chart (height: 180px):
  Type: Column/bar chart
  X-axis: 7 days (السبت → الجمعة), Cairo 11px muted
  Y-axis: hours studied, 0–4
  Bars: rounded tops (border-radius 4px 4px 0 0)
    Active days: gradient fill (accent → accent-warm)
    Today's bar: slightly taller + teal border highlight + tooltip
    Empty days: rgba(255,255,255,0.05) dashed border bar
  Tooltip on hover: Glass Card, Cairo 12px, shows exact hours + lessons completed

Below chart:
  3-column stats row:
  [⏱ 18.5 ساعة] مجموع الأسبوع | [🔥 5 أيام] أيام المذاكرة | [📈 +23%] مقارنة بالأسبوع الفائت
```

---

#### Bottom Two-Column Grid

`grid-template-columns: 1fr 1fr`, `gap: 20px`.

**Left card — Upcoming Schedule:**
```
Base Card
Header: "الجدول القادم" — 18px 700
[+ إضافة موعد] ghost link right

List of upcoming items (max 4):
Each item:
  ├── Left color bar: 3px vertical, lesson-type color
  ├── Time: Syne 14px 700 --text-primary (e.g. "10:00 ص")
  ├── Title: Cairo 14px 600
  ├── Badge: subject badge + LIVE badge if live
  └── Divider between items
[عرض الجدول كامل →] ghost link bottom, centered
```

**Right card — Recent Achievements:**
```
Achievement Card (gold-tinted)
Header: "أحدث الإنجازات" — 18px 700

List of achievements (max 3):
Each item:
  ├── 40px circle: gold bg, trophy/star/flame SVG icon
  ├── Achievement name: Cairo 14px 700
  ├── Date earned: 12px muted
  └── XP reward: "+50 نقطة" — gold badge
[عرض كل الإنجازات →] ghost link bottom
```

---

## Page 5 — Courses Page

Full course catalog. Same sidebar + navbar as dashboard.

---

### Page Header

```
"كورساتي & الكتالوج" — Cairo 32px 800, padding-bottom 8px
Breadcrumb: الرئيسية / كورساتي — 13px muted
```

---

### Filter Bar

Horizontal filter row, sticky below navbar:
```
Background: rgba(7,9,15,0.9) blur(12px)
Border-bottom: 1px solid var(--border-subtle)
Padding: 12px 0

RIGHT:
  [Grade selector: pill tabs]
    [الكل] [الأول] [الثاني] [الثالث]
    Active tab: solid accent bg, white text, --radius-full
    Inactive: glass, --text-muted

  [Subject filter chips] (scrollable horizontal):
    [الكل] [الأحياء] [الكيمياء] [الفيزياء] [الرياضيات] [الجيولوجيا] ...
    Same pill tab style

LEFT:
  [🔍 بحث] input — 220px wide, icon right
  [Sort ▾] dropdown — "الأحدث" selected
  [Grid/List view toggle] — two icons, active one has accent bg
```

---

### Enrolled Courses Section

Header: `"الكورسات المشترك فيها (3)"` — 20px 700, margin-bottom 16px.

**Grid layout:** `repeat(auto-fill, minmax(280px, 1fr))`, `gap: 20px`.

Enrolled course card — same as dashboard Continue Learning cards but with:
```
Additional footer row:
  Teacher rating: ★★★★☆ 4.3 — gold stars, Cairo 12px
  [الدروس] counter: "12 / 24 درس" — muted 12px
```

---

### Available Courses Section

Header: `"الكورسات المتاحة"` — 20px 700.

Catalog course cards (same width, same grid):
```
├── Thumbnail: full width 160px, object-fit cover, rounded top
│     + NEW or LIVE badge top-left
│     + duration pill top-right: "24 درس · 6 ساعات"
├── [body 16px padding]
├── Grade badge + Subject badge
├── Title: Cairo 17px 700, 2 lines
├── Instructor: 28px avatar + name + "مدرس معتمد ✓" — 12px muted
├── Rating row: ★★★★★ 4.8  (340 تقييم) — gold stars, muted count
├── Divider
├── Price:
│   [Original: ~~350 جنيه~~] → [Sale: 249 جنيه]  accent-warm color for sale
│   OR [مجاني] gold badge full-width
├── [معاينة مجانية] GHOST button full width
└── [اشترك في الكورس] PRIMARY button full width, margin-top 8px
```

Hover: card lifts `translateY(-4px)`, border → `--border-strong`, shadow deepens.

---

### Course Detail Page (on card click → modal or new page)

**Layout:** Two-column. Left: video + tabs. Right: sticky enrollment card.

**Left (65%):**
```
Video player area: 16:9, black bg, custom controls bar
  Controls: ▶️ play/pause | ⏩ speed | 🔊 volume | ⬛ fullscreen | CC toggle
  Progress bar: teal fill, draggable thumb

Tabs below player:
  [نبذة] [الدروس] [الأسئلة والأجوبة] [التقييمات]

Lessons tab content:
  Accordion list by "وحدة" (section):
    Section header: bold title + lesson count + total duration
    Lesson rows (expanded):
      ├── Play icon (if free preview) or lock icon
      ├── Lesson number: Syne 12px muted
      ├── Lesson title: Cairo 14px 600
      ├── Duration: 12px muted
      └── [preview] GHOST mini-button (if free)
      Active/completed lesson: teal dot indicator + checkmark
```

**Right (35%) — Sticky Enrollment Card:**
```
Elevated Card, position sticky top 88px
  ├── Thumbnail (mini, 100% width, 180px)
  ├── Price: [249 جنيه] Syne 28px 800 / [~~350~~] 16px struck-through muted
  ├── Savings badge: "وفرت 101 جنيه!" — teal badge
  ├── [اشترك في الكورس] PRIMARY full width, height 50px
  ├── [إضافة للمفضلة] GHOST full width
  ├── Divider
  ├── Includes list:
  │   ✓ 24 درس فيديو
  │   ✓ مراجعات ليلة الامتحان
  │   ✓ نماذج امتحانات
  │   ✓ شهادة إتمام
  │   (each: teal checkmark icon + Cairo 13px)
  └── "ضمان استرداد 7 أيام" — 12px muted centered
```

---

## Page 6 — Account Info Page

Same sidebar + navbar. Content area max-width 860px, centered.

---

### Page Header

```
"حسابي" — Cairo 32px 800
Breadcrumb: الرئيسية / حسابي
```

---

### Profile Hero Card

Elevated Card (full width, padding 32px):
```
RTL Flex layout:
RIGHT (flex row, gap 20px):
  [Avatar — 96px, grade-color ring 3px, camera icon overlay on hover]
    Hover overlay: dark 50% opacity circle + camera icon + "تغيير الصورة"
  [Info column]
    Name: Cairo 24px 800 --text-primary
    Grade badge + subject chips (horizontal)
    "عضو منذ مارس 2024" — 13px muted, calendar icon
    [تعديل الملف الشخصي] ghost button

LEFT:
  Stats trio:
    [24] درس مكتمل
    [240] نقطة
    [7🔥] سلسلة
    Same Syne number style, vertical stack with labels
```

---

### Settings Sections

Stacked cards, each a collapsible section.

#### Section 1 — Personal Information

```
Base Card
Header row: "المعلومات الشخصية" — Cairo 18px 700 | [تعديل ✏️] ghost button

View mode: label-value rows
  الاسم الكامل:    أحمد محمد علي
  البريد الإلكتروني: ahmed@example.com  [✓ متحقق منه — teal badge]
  رقم الموبايل:    +20 1234567890       [! غير متحقق — gold badge + "تحقق الآن" link]
  تاريخ الميلاد:  15 يناير 2007
  المحافظة:       القاهرة

Edit mode (on "تعديل" click — fields become editable in-place):
  Input fields replace text, same styling as form inputs
  [حفظ التعديلات] PRIMARY + [إلغاء] GHOST — appear at bottom of card
  Save shows success toast
```

---

#### Section 2 — Academic Information

```
Base Card
Header: "المعلومات الدراسية" | [تعديل] ghost

Grade selector: same 3-card style as register step 2
Subject chips: multi-select chips
School name: text input
Study goal: dropdown ("التفوق والدخول للكلية", "مجرد الإتقان", etc.)
```

---

#### Section 3 — Security

```
Base Card
Header: "الأمان وكلمة السر"

Rows:
  كلمة السر:    ●●●●●●●●  [تغيير كلمة السر →] ghost button right-aligned
  المصادقة الثنائية: [تفعيل] toggle switch (off by default)
    Toggle: 44×24px, off: --bg-elevated border, on: teal filled + white knob
    Label: "إضافة طبقة حماية إضافية لحسابك" — 13px muted below

Change password flow (modal):
  Glass Card modal, 440px
  ├── Current password input
  ├── New password + strength meter
  ├── Confirm new password
  └── [تحديث كلمة السر] PRIMARY
```

---

#### Section 4 — Notifications

```
Base Card
Header: "إعدادات الإشعارات"

Toggle list (each row: label right + toggle left):
  إشعارات الدروس الجديدة           [ON — teal]
  تذكير مذاكرة يومي                [ON — teal]
  إشعارات المنتدى                   [OFF — gray]
  عروض وخصومات                    [ON — teal]
  إشعارات الإنجازات                 [ON — teal]
  البريد الإلكتروني التسويقي        [OFF — gray]

Each row:
  Right: label Cairo 14px 700 + sub-label 12px muted below
  Left: toggle switch component
  Divider between rows
```

---

#### Section 5 — Subscription & Billing

```
Base Card with gold accent border (premium section)
Header: "اشتراكي" | [ترقية ↑] GOLD button

Current plan card (inside):
  bg: rgba(245,200,66,0.06), border: rgba(245,200,66,0.15)
  ├── Crown icon 24px gold
  ├── Plan name: "الخطة المميزة" — Cairo 18px 700 --accent-gold
  ├── Valid until: "ينتهي في 15 مارس 2025" — 13px muted
  ├── Progress bar: days remaining (teal fill)
  └── Features included: 3-column chip list

[تجديد الاشتراك] GOLD button + [تغيير الخطة] ghost button — side by side
```

---

#### Section 6 — Danger Zone

```
Base Card, border: 1px solid rgba(255,51,102,0.15)
Header: "منطقة الخطر" — --accent color, Cairo 16px 700

Two rows with DANGER buttons:
  تسجيل الخروج من كل الأجهزة:
    "اطرد كل الجلسات النشطة بخلاف دي."
    [تسجيل الخروج من كل مكان] DANGER button

  حذف الحساب نهائياً:
    "لا يمكن التراجع عن هذا الإجراء."
    [حذف الحساب] DANGER button — opens confirmation modal
```

Confirmation modal for delete:
```
Glass card modal, 440px, centered overlay (dark 70% overlay bg)
  Warning icon: 48px, red circle + exclamation
  Title: "هل أنت متأكد؟" — 22px 800
  Body: "سيتم حذف حسابك وكل بياناتك نهائياً ولا يمكن استرجاعها."
  Type-to-confirm input: placeholder "اكتب 'احذف حسابي' للتأكيد"
  [نعم، احذف حسابي] DANGER button (disabled until text matches)
  [إلغاء] GHOST button
```

---

## Motion & Animation Guidelines

### Page Load
Staggered reveal: elements fade up (`translateY(20px) → 0`, `opacity 0 → 1`) with `animation-delay` increments of 80ms per element. Total cascade: 400ms max.

### Hover Interactions
- Cards: `translateY(-4px)` + shadow deepens — `200ms cubic-bezier(0.34,1.56,0.64,1)` (slight spring)
- Buttons: `translateY(-2px)` + glow — `200ms ease`
- Nav items: background fade — `150ms ease`

### Progress Bars
On mount: animate from `width: 0%` to final value — `1.2s cubic-bezier(0.34,1.56,0.64,1)`.

### Number Counters
Stats that show counts: count-up animation from 0 to final value over `1.5s ease-out` on scroll into view.

### Floating Badges (landing page)
`translateY(0) ↔ translateY(-10px)` — `4s ease-in-out infinite`. Each badge has a different `animation-delay` (0s, 1.5s, 3s).

### Toggle Switches
Knob slides with `200ms cubic-bezier(0.68,-0.55,0.265,1.55)` (overshoot spring).

### Modals
Open: `opacity 0 → 1` + `scale(0.95) → scale(1)` — `250ms ease`.
Close: reverse, `200ms ease`.
Overlay: `opacity 0 → 0.7` — `200ms ease`.

---

## Responsive Behavior Notes

This document describes the desktop layout (1280px+). Below 1024px:
- Sidebar collapses to icon-only (48px wide), expands on hover/tap
- Two-column grids → single column
- Hero section stacks: text top, visual bottom
- Card grids use `auto-fill minmax(260px, 1fr)`
- Login/Register: left panel hides, right panel takes full width

Mobile (< 768px):
- Sidebar becomes bottom tab bar (5 icons)
- All padding halves
- Font sizes scale down ~15%
- Hero headline: 40px max

---

## Implementation Notes

**Framework recommendation:** Next.js 15 App Router with TypeScript. Tailwind CSS v4 for utility classes, CSS custom properties for the token system above.

**Font loading:** Google Fonts with `display=swap`. Preload Cairo 700 and 900 as critical.

**Icons:** Lucide React (stroke icons, 1.5px) — consistent with the stroke-only icon language.

**Charts:** Recharts or Chart.js for the activity chart. Custom SVG for the circular progress ring.

**Animations:** Framer Motion for page transitions and mount animations. CSS keyframes for infinite loops (floating badges, pulse glows).

**RTL note:** Use `dir="rtl"` on `<html>`. For Tailwind, enable the RTL variant. All `border-left` accent lines become `border-right` in RTL context. Flex `row` becomes `row-reverse` behavior automatically with RTL.