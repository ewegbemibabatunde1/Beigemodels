# Beige Model Management — Editorial Design System
**Brand Concept:** The Art of Representation  
**Creative Direction:** Immersive Editorial Luxury  
**Version:** 1.0.0 (Phase 1 Baseline)

---

## 1. Brand Identity & Creative Philosophy

Beige Model Management represents individuality, professional talent development, and contemporary African-rooted elegance on the international stage.

The design language balances:
- High-fashion editorial poise.
- Asymmetrical architectural layouts.
- Rich tactile contrasts: deep obsidian shadows, warm ivory paper surfaces, and vivid raspberry rose punctuation.
- Typographic drama with disciplined negative space.

---

## 2. Design Tokens (CSS Custom Properties)

```css
:root {
  /* Surface & Base Colors */
  --color-black: #101010;             /* Midnight black: primary dark surface */
  --color-black-elevation-1: #171717; /* Elevated dark card surface */
  --color-black-elevation-2: #212121; /* High-contrast border / hover surface */
  
  --color-ivory: #F7F4F1;             /* Main light surface / paper ground */
  --color-paper: #EEE9E4;             /* Supporting warm neutral container */
  --color-stone: #B7A99B;             /* Secondary neutral / subtle borders */
  --color-muted: #8F8985;             /* Inactive / editorial subtext */
  --color-white: #FFFFFF;             /* High-contrast typography & badges */

  /* Brand Accent Hierarchy */
  --color-raspberry: #C03050;         /* Primary brand accent & active actions */
  --color-fuchsia: #E02070;           /* Vivid interactive hover & focus glow */
  --color-raspberry-subtle: rgba(192, 48, 80, 0.12); /* Tinted card badge */
  
  /* Borders & Rules */
  --border-light: rgba(255, 255, 255, 0.14);
  --border-dark: rgba(16, 16, 16, 0.14);
  --border-accent: rgba(192, 48, 80, 0.4);

  /* Typography Stacks */
  --font-serif: "Italiana", "Cormorant Garamond", "Didot", "Bodoni MT", serif;
  --font-sans: "DM Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  /* Typography Scales */
  --text-hero: clamp(52px, 8.5vw, 124px);
  --text-h1: clamp(38px, 5.5vw, 76px);
  --text-h2: clamp(28px, 4vw, 52px);
  --text-h3: clamp(20px, 2.5vw, 32px);
  --text-body: 14px;
  --text-body-sm: 12px;
  --text-eyebrow: 10px;
  --text-button: 10px;

  /* Spacing Scale */
  --space-2xs: 4px;
  --space-xs: 8px;
  --space-sm: 14px;
  --space-md: 22px;
  --space-lg: 36px;
  --space-xl: 56px;
  --space-2xl: 88px;
  --space-3xl: 120px;
  --page-pad: clamp(20px, 5vw, 84px);

  /* Transitions & Timing */
  --ease-editorial: cubic-bezier(0.19, 1, 0.22, 1);
  --duration-quick: 200ms;
  --duration-medium: 400ms;
  --duration-slow: 750ms;
}
```

---

## 3. Typography Rules & Hierarchy

| Role | Font Family | Size / Line-height | Letter-spacing | Transform | Case / Style |
|---|---|---|---|---|---|
| **Editorial Hero** | `--font-serif` | `clamp(52px, 8.5vw, 124px)` / 0.84 | `-0.04em` | None | Regular |
| **Section Headings** | `--font-serif` | `clamp(36px, 5vw, 68px)` / 0.92 | `-0.02em` | Uppercase | Regular |
| **Subheadings** | `--font-serif` | `24px - 32px` / 1.1 | Normal | None | Regular / Italic accent |
| **Eyebrows / Badges** | `--font-sans` | `10px` / 1.0 | `+0.2em` | Uppercase | Bold (700) |
| **Body Text** | `--font-sans` | `13px - 14px` / 1.85 | `+0.01em` | None | Normal (400) |
| **Nav & Buttons** | `--font-sans` | `10px` / 1.0 | `+0.16em` | Uppercase | SemiBold (600/700) |

---

## 4. Layout, Grids & Breakpoints

### 4.1 Breakpoints
- **Mobile Compact:** `< 480px` (Single column, stacked action buttons, full-screen overlay menu)
- **Tablet / Mobile Wide:** `< 768px` (2-column grids, collapsed horizontal navigation)
- **Desktop Standard:** `768px - 1100px` (Asymmetrical 3-to-4 column editorial grids)
- **Desktop Wide / Cinema:** `> 1100px` (Full editorial panoramic layout, wide negative margins)

### 4.2 Asymmetry & Composition Principles
1. **Never use generic equal-width 3-card templates:** Always balance photo dominance with typographic whitespace (e.g. 1.1fr intro column paired with 4 image columns).
2. **Layering & Depth:** Subtle horizontal rules, overlapping typographic labels, and negative space.
3. **Contrast Shifts:** Alternating background moods between obsidian darkness (`#101010`) and warm tactile ivory paper (`#EEE9E4`).

---

## 5. UI Components Specification

### 5.1 Buttons
- **Primary Action (`.btn-primary`):** Solid raspberry background (`#C03050`), white uppercase text, subtle 1px border. On hover: fuchsia glow (`#E02070`), -2px vertical lift.
- **Outline Action (`.btn-outline`):** Transparent background, 1px white border (`rgba(255,255,255,0.5)`). On hover: crisp white background with obsidian black text.
- **Dark Action (`.btn-dark`):** Obsidian black background with white text; on hover shifts to raspberry.
- **Text Link with Arrow (`.text-link`):** Small caps, raspberry rose, paired with animated directional arrow (`→` / `↗`).

### 5.2 Navigation System
- **Desktop Header:** Absolute/fixed top bar with semi-translucent backdrop filter, logo emblem on left, centered clean links with animated bottom fuchsia rules, right-aligned "Book a Model" action pill, and dynamic shortlist counter pill.
- **Mobile Menu:** Accessible hamburger toggle (`aria-expanded`, `aria-label`), sliding full-viewport obsidian overlay, editorial serif links with smooth reveal transitions.

### 5.3 Talent Cards & Discovery
- **Strict Women-Only Talent Roster:** Focus exclusively on represented women talent (editorial, commercial, runway, beauty, new faces).
- **Interactions:** Subtle scale on hover (`scale(1.04)`), desaturated idle state to full rich saturation on hover, 3D pointer tilt effect for desktop mouse devices.
- **Shortlist Action Pill:** Floating quick-add button (`＋` / `✓`) directly accessible without obscuring the model portrait.

### 5.4 WhatsApp Floating Button
- Official WhatsApp Business integration formatted for click-to-chat (`https://wa.me/NUMBER?text=ENCODED_MESSAGE`).
- Configurable via global parameters with pre-filled editorial inquiry messages.

---

## 6. Motion & Accessibility Principles

### 6.1 Motion Design
- **Scroll Reveals:** IntersectionObserver triggers a 28px slide-up with opacity fade (`--ease-editorial`).
- **Pointer 3D Tilt:** Subtly rotates cards up to 4 degrees based on cursor coordinates for fine pointer devices.
- **Cursor Glow:** Soft radial gradient light (`radial-gradient(circle, rgba(192,48,80,0.1), transparent 70%)`) following mouse movement on desktop.
- **Zero Scroll Hijacking:** Native browser scrolling is strictly preserved.

### 6.2 Accessibility Standards (WCAG 2.2 AA)
- High contrast typography (white/ivory on obsidian black exceeds 7:1 ratio; raspberry on dark surfaces meets AA standards).
- Visible `:focus-visible` outlines on all interactive links, buttons, and form inputs.
- Full screen reader labels (`aria-label`, `aria-expanded`, `role="status"`).
- `prefers-reduced-motion: reduce` completely disables transform transitions, tilt calculations, and opacity delays.

---

## 7. Page-Level Wireframe: Homepage Composition

```
┌─────────────────────────────────────────────────────────────┐
│ [LOGO] B BEIGE          HOME  ABOUT  MODELS  SERVICES  [BOOK TALENT] [SHORTLIST 0] │
├─────────────────────────────────────────────────────────────┤
│ HERO SECTION (Obsidian / Authentic Model Hero Image)        │
│                                                             │
│   BEIGE MODEL MANAGEMENT                                    │
│   BEAUTY HAS NO SINGLE DEFINITION.                          │
│   Discovering distinctive faces. Developing exceptional     │
│   talent. Creating meaningful representation.               │
│                                                             │
│   [DISCOVER TALENT →]   [BECOME A MODEL]                    │
│                                           01 / 03 ─── ↓    │
├─────────────────────────────────────────────────────────────┤
│ TALENT STRIP (Warm Ivory Paper Ground)                      │
│ [Intro: The Beige Roster] [Ada] [Aisha] [Anastasia] [Belle] │
├─────────────────────────────────────────────────────────────┤
│ EDITORIAL PHILOSOPHY (Split Canvas: Monochrome / Obsidian)   │
│ [High-Contrast Model Portrait] | [The Art of Representation]│
│                                | [Agency Capabilities List] │
├─────────────────────────────────────────────────────────────┤
│ MANIFESTO SECTION (Panoramic Atmosphere)                    │
│ "Distinctive faces. Unmistakable presence."                 │
├─────────────────────────────────────────────────────────────┤
│ AGENCY CAPABILITIES & SERVICES (Numbered Editorial List)    │
│ 01 Model Management          04 Model Development           │
│ 02 Commercial Casting        05 Campaign Production         │
│ 03 Runway Direction          06 International Placement     │
├─────────────────────────────────────────────────────────────┤
│ CONVERSION CARDS (Dual Immersion)                           │
│ [Book Beige Talent]          | [Talent Scouting Application]│
├─────────────────────────────────────────────────────────────┤
│ CAMPAIGN JOURNAL & EDITORIAL MOMENTS (Real Agency Credits)   │
│ [Maison Avadote] [Lighthill] [Dowsk] [Glam Drop] [Adeoge]   │
├─────────────────────────────────────────────────────────────┤
│ LUXURY FOOTER                                               │
│ Brand summary, site index, verified contact (Lagos), legal. │
└─────────────────────────────────────────────────────────────┘
```
