# Xelox Solutions — Design System & UI/UX Specification

> **Purpose:** Authoritative reference for preserving the exact visual identity, colors, typography, textures, and UI/UX patterns of the website while transitioning from XYRO Solutions to **Xelox Solutions**.

---

## 1. Visual Philosophy & Aesthetic Anchor

The Xelox Solutions aesthetic is **high-craft digital minimalism with technical cyber-accents**. It pairs clean editorial typography and tactile background textures with high-energy neon highlights (Electric Lime and Vivid Cyan/Turquoise).

- **Primary Mode:** Sleek Dark Mode (Obsidian / Deep Charcoal surfaces).
- **Secondary Mode:** Editorial Warm Off-White / Light Mode.
- **Accent Dynamic:** High-contrast Lime Green (`#B8FF3D`) for primary calls-to-action and interaction highlights, paired with Electric Cyan (`#19D5D0` / `cyan-400`) for branding, tech tags, and framing geometry.
- **Tactile Depth:** Subtle SVG fractal grain overlays, geometric cross-patterns (`.x-pattern`), dot grids, and soft ambient radial glows that prevent the interface from feeling flat.
- **Imagery Language:** High-contrast monochrome / desaturated photography (`.img-mono`) framed by bold cyan borders and geometric cutaways.

---

## 2. Color Palette & Design Tokens

### 2.1 Accent Colors (Brand Identity)

| Token Name | Hex Code | Tailwind / CSS Equivalent | Usage & Context |
| :--- | :--- | :--- | :--- |
| **Electric Lime (Primary Accent)** | `#B8FF3D` | `.bg-lime`, `.text-lime`, `--accent: 82 100% 62%` | Primary CTA buttons, active selection highlight, glowing decor circles, text highlight badges, link hover underlines. |
| **Lime Gradient (Button Base)** | `linear-gradient(135deg, #B8FF3D 0%, #9FE62D 100%)` | `.btn-primary` base | Standard state for primary CTA buttons. |
| **Lime Gradient (Button Hover)**| `linear-gradient(135deg, #C5FF4A 0%, #B0F73A 100%)` | `.btn-primary:hover` | Elevated hover state with glow shadow. |
| **Lime Glow Shadow** | `rgba(184, 255, 61, 0.4)` / `0.3` | `box-shadow: 0 15px 40px ...` | Hover shadow on lime CTA buttons and cards. |
| **Electric Cyan (Brand Accent)** | `#19D5D0` | `text-[#19D5D0]` | Brand wordmark ("**Xelox** Solutions"), key hero accent terms. |
| **Vivid Cyan (Border / Tag Accent)** | `#22D3EE` | `text-cyan-400`, `border-cyan-400` | Hero image frame borders (`border-4 border-cyan-400`), highlighted words in headlines, mono micro-labels. |
| **Turquoise Shape Gradient** | `linear-gradient(to top left, #06B6D4, #2DD4BF)` | `bg-gradient-to-tl from-cyan-500 to-teal-400` | Geometric background accent shapes behind hero images. |
| **Cyan Ambient Glow** | `from-cyan-200 to-cyan-100` (`opacity-40 blur-3xl`) | `.blur-3xl` radial wash | Soft atmospheric backlight behind photography. |

### 2.2 Dark Mode Tokens (Primary Theme)

| Token / Layer | Hex / HSL | Tailwind / Variable | Usage |
| :--- | :--- | :--- | :--- |
| **Page Canvas Background** | `#0B0F14` / `#050608` | `dark:bg-[#050608]`, `var(--background: 222 35% 6%)` | Global body & section background. |
| **Card / Surface Default** | `#111827` (Gray-900) | `dark:bg-[#111827]`, `var(--card: 222 30% 9%)` | Testimonial cards, feature containers, modal surfaces. |
| **Elevated Surface / Popover** | `#0F172A` (Slate-900) | `dark:bg-[#0F172A]` | Dropdowns, secondary cards, category boxes. |
| **Secondary Elevated Tile** | `#1E293B` (Slate-800) | `dark:bg-[#1E293B]` | Icon pill containers, subtle inset panels. |
| **Primary Text (Heading)** | `#F8FAFC` (Slate-50) | `text-dark dark:text-white`, `dark:text-[#F8FAFC]` | Main headings, stat numbers, modal titles. |
| **Secondary Text (Body)** | `#CBD5E1` (Slate-300) | `text-gray-custom dark:text-slate-300` | Paragraph copy, descriptions, captions. |
| **Muted Text / Metadata** | `#8C96A8` / `#64748B` | `dark:text-slate-400`, `placeholder:text-[#8C96A8]` | Input placeholders, micro-labels, timestamps. |
| **Borders (Subtle)** | `#334155` (Slate-700) | `dark:border-gray-200 (maps to #334155)` | Card dividers, navbar borders, section separators. |
| **Borders (Interactive / Inputs)**| `#2A3140` / `#475569` | `dark:border-[#2A3140]` | Form input borders, inactive tab buttons. |
| **Input Background** | `#121722` | `dark:bg-[#121722]` | Contact & inquiry form fields. |

### 2.3 Light Mode Tokens (Secondary Theme)

| Token / Layer | Hex / HSL | Tailwind / Variable | Usage |
| :--- | :--- | :--- | :--- |
| **Page Canvas Background** | `#F6F6F2` | `.bg-off-white`, `var(--background: 60 14% 95%)` | Warm off-white global canvas. |
| **Card / Surface** | `#FFFFFF` | `bg-white`, `var(--card: 60 14% 95%)` | Card surfaces, modals, popovers. |
| **Primary Text (Heading)** | `#111111` | `.text-dark`, `var(--foreground: 0 0% 7%)` | Primary display headings, brand suffix. |
| **Secondary Text (Body)** | `#6D6D6D` | `.text-gray-custom`, `var(--secondary: 0 0% 43%)` | Explanatory copy, process descriptions. |
| **Borders (Subtle)** | `#E2E8F0` / `#CBD5E1` | `border-gray-200`, `border-gray-300` | Card borders, table dividers, input borders. |
| **Input Background** | `#FFFFFF` | `bg-white` | Form fields. |

---

## 3. Typography Hierarchy

Fonts are loaded from Google Fonts:
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
```

### 3.1 Font Families

1. **Display Headings (`font-display`):** `Space Grotesk`, sans-serif (Weights: 600, 700)
   - Features: Geometric, wide aperture, high-impact uppercase or sentence-case headlines.
   - Applications: Hero H1, Section H2 titles, huge metric numbers, quote text, brand wordmark.
2. **Body & Interface:** `Inter`, sans-serif (Weights: 400, 500, 600)
   - Features: Clean, highly legible UI typography.
   - Applications: Paragraphs, navigation links, card body text, buttons, form inputs.
3. **Monospace Eyebrows (`font-mono`):** `IBM Plex Mono`, monospace (Weights: 400, 500)
   - Features: Technical, code-like aesthetic.
   - Applications: Eyebrow tags (e.g. `WHO WE ARE`, `XELOXSOLUTIONS — 2026`), step counters (`01`, `02`), tech stack labels.

### 3.2 Typography Scale & Tracking Rules

| Role | Font Family | Size (Mobile $\rightarrow$ Desktop) | Tracking / Leading | Text Color |
| :--- | :--- | :--- | :--- | :--- |
| **Hero H1** | `Space Grotesk` | `36px (text-4xl)` $\rightarrow$ `60px (text-6xl)` | `tracking-tight`, `leading-[1.05]` to `leading-[1.1]` | `#111111` / `#FFFFFF` + cyan highlight word |
| **Section H2** | `Space Grotesk` | `30px (text-3xl)` $\rightarrow$ `56px (text-6xl)` | `tracking-tight`, `leading-[0.95]` uppercase | `#111111` / `#F8FAFC` |
| **Big Numbers / Stats** | `Space Grotesk` | `48px (text-5xl)` $\rightarrow$ `72px (text-7xl)` | `font-bold`, `leading-none` | `#111111` / `#F8FAFC` |
| **Eyebrows / Badges** | `IBM Plex Mono` | `11px` $\rightarrow$ `14px` (`text-xs` / `text-sm`) | `tracking-[0.14em]` to `tracking-[0.15em]`, uppercase | `text-cyan-600 dark:text-cyan-400` |
| **Body Large (Intro)**| `Inter` | `16px (text-base)` $\rightarrow$ `18px (text-lg)` | `leading-relaxed` | `text-gray-700 dark:text-gray-300` |
| **Body Default** | `Inter` | `14px (text-sm)` $\rightarrow$ `15px` | `leading-normal` | `#6D6D6D` / `#CBD5E1` |
| **Nav Links / Buttons**| `Inter` | `14px (text-sm)` $\rightarrow$ `15px` | `font-medium` or `font-semibold` | `#111111` / `#F5F7FB` |

---

## 4. Backgrounds, Textures & Atmospheric Effects

### 4.1 Fixed Grain Noise Overlay (`.grain-overlay`)
Creates an analog, tactile texture over the entire page:
```css
.grain-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.04; /* Light mode */
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,...");
}
.dark .grain-overlay {
  opacity: 0.08; /* Dark mode */
  mix-blend-mode: screen;
}
html.touch-device .grain-overlay { display: none; }
```

### 4.2 Diagonal Cross Pattern (`.x-pattern`)
Applied to Hero and featured sections to give architectural structure:
- SVG repeating `40px x 40px` tile with `0.5px` diagonal lines (`opacity: 0.08`).

### 4.3 Dot Grid Pattern (`.dot-grid`)
- Radial gradient with `1px` dots spaced on a `20px x 20px` grid.
- Light mode: `#000` with `opacity: 0.1`.
- Dark mode: `#F5F7FB` with `opacity: 0.06`.

### 4.4 Ambient Glows & Backlights
- Large blurred radial shapes (`w-96 h-96 rounded-full bg-gradient-to-r from-cyan-200 to-cyan-100 opacity-40 blur-3xl`) positioned behind photography to create a soft halo effect.

---

## 5. Component Patterns & UI Specifications

### 5.1 Navigation Bar
- **Positioning:** Fixed top header (`fixed top-0 left-0 right-0 z-50`).
- **Scroll Behavior:** Transitions from transparent padding (`py-4`) to frosted glass backdrop (`bg-[#F6F6F2]/90 dark:bg-[#0B0F14]/90 backdrop-blur-md py-2 shadow-sm`).
- **Brand Logo Wordmark:**
  - Structure: `[Icon/Logo Asset] + [Brand First Word] + [Brand Suffix]`
  - Brand Accent: `<span class="font-display font-extrabold text-[22px] text-[#19D5D0]">Xelox</span>`
  - Suffix: `<span class="font-display font-extrabold text-[22px] ml-1 text-dark dark:text-white">Solutions</span>`
- **Nav Links:**
  - Font: `Inter`, 14px, font-medium.
  - Hover underline effect: animated pseudo-element `.nav-link::after` that grows from `w-0` to `w-full` in Electric Lime (`#B8FF3D`).
- **Theme Toggle:**
  - Sun/Moon icon toggle button with `rounded-full`, subtle border, backdrop blur, switching smoothly between dark and light themes using `next-themes`.
- **Admin Access:**
  - Subtle Lock icon (`<Lock size={18} />`) in muted slate, leading directly to the administrative dashboard login.

### 5.2 Button System

#### Primary Action Button (`.btn-primary`)
- **Background:** `linear-gradient(135deg, #B8FF3D 0%, #9FE62D 100%)`.
- **Text:** `#111111`, font-semibold.
- **Radius:** `rounded-xl` (10px) or `rounded-full` (capsule for Hero CTAs).
- **Hover State:**
  - Transform: `scale-105`
  - Glow: `box-shadow: 0 15px 40px rgba(184, 255, 61, 0.4), 0 5px 15px rgba(184, 255, 61, 0.3);`
  - Gradient shift: `#C5FF4A` to `#B0F73A`
- **Active State:** `scale-95`.

#### Outline Button (`.btn-outline`)
- **Border:** `2px solid #111111` (light mode) / `#F5F7FB` (dark mode).
- **Text:** `#111111` (light mode) / `#F5F7FB` (dark mode).
- **Radius:** `rounded-xl`.
- **Hover:** Fills solid with `#111111` (text white) in light mode, or `#F8FAFC` (text `#0B0F14`) in dark mode.

### 5.3 Card Specifications
- **Border Radii:** Standard cards use `rounded-2xl` (16px) or `rounded-3xl` (24px) for hero containers.
- **Borders:** Crisp `1px` border with `border-gray-200` (light mode) or `border-white/10` / `border-[#334155]` (dark mode).
- **Hover Lift (`.card-hover`):** `-translate-y-2` transition with deep soft shadow (`box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1)`).
- **Accent Indicator Strip:** 4px vertical bar in Electric Lime (`bg-lime`) on the left border of highlighted cards (e.g. Testimonials).

### 5.4 Form Elements
- **Input & Textarea:**
  - Light mode: `bg-white border-gray-300 text-dark rounded-lg px-4 py-3`.
  - Dark mode: `bg-[#121722] border-[#2A3140] text-[#F5F7FB] placeholder:text-[#8C96A8] rounded-lg px-4 py-3`.
- **Focus State:**
  - Border: `#B8FF3D` (Electric Lime).
  - Ring: `ring-2 ring-[#B8FF3D]/30`.

### 5.5 Floating AI Assistant Widget
- **Position:** `fixed bottom-4 right-4 z-40`.
- **Style:** Capsule pill with gradient:
  - `bg-gradient-to-r from-fuchsia-500 via-amber-400 to-cyan-400`
  - Subtle border: `border border-white/20`
  - Shadow: `shadow-[0_14px_36px_rgba(236,72,153,0.24)]`
  - Icon: Bot icon with circular frosted pill background.
  - Hover: `-translate-y-0.5 shadow-[0_18px_44px_rgba(34,211,238,0.24)]`.

---

## 6. Imagery, Geometric Framing & Visual Accents

1. **Monochrome Photographic Treatment (`.img-mono`):**
   - Filter: `grayscale(100%) contrast(1.1)`.
   - Hover: `grayscale(80%) contrast(1.2) brightness(1.1)` + scale `1.05` to `1.10`.
2. **Cyan Frame Geometry:**
   - Hero and highlighted case study cards feature a prominent cyan frame (`border-4 border-cyan-400`).
   - Angled clip-paths: e.g. `clipPath: polygon(5% 0, 100% 0, 100% 100%, 0 100%)`.
3. **Geometric Accent Ornaments:**
   - Floating Lime Circle (`.decor-circle`): `bg-lime rounded-full` animated with continuous vertical float (`float 6s ease-in-out infinite`).
   - Rotating Ring (`.decor-ring`): `rounded-full border-4 border-dark dark:border-white/20` animated with continuous slow spin (`spin-slow 20s linear infinite`).

---

## 7. Motion & Interaction Rules

1. **Scroll Reveal (`useScrollReveal`):**
   - Components enter viewport with `opacity: 0; transform: translateY(40px)`.
   - On intersection threshold (0.15–0.20): smooth transition to `opacity: 1; transform: translateY(0)` over `0.6s–0.8s ease-out`.
   - Stagger classes (`stagger-1` = `0.1s`, `stagger-2` = `0.2s`, etc.) ensure elements cascade naturally.
2. **Text Selection Highlight:**
   - Both modes enforce Electric Lime text selection:
     ```css
     ::selection { background: #B8FF3D; color: #111111; }
     .dark ::selection { background: #B8FF3D; color: #050608; }
     ```
3. **Accessibility (Reduced Motion):**
   - When `prefers-reduced-motion: reduce` is enabled, all animations, transitions, and smooth scrolling are set to `0.01ms !important` to eliminate vestibular discomfort.

---

## 8. Rebranding Guardrails (XYRO $\rightarrow$ Xelox Solutions)

| Element | Old Branding | New Xelox Branding | Design Rule |
| :--- | :--- | :--- | :--- |
| **Wordmark** | `Xyro` (`#19D5D0`) + `Solutions` (`#111111` / `#FFF`) | `Xelox` (`#19D5D0`) + `Solutions` (`#111111` / `#FFF`) | Maintain exact font (`Space Grotesk 700`), exact cyan hex `#19D5D0`, and relative sizing. |
| **Micro-labels** | `XYROSOLUTIONS — 2026` | `XELOXSOLUTIONS — 2026` | Keep `IBM Plex Mono`, `text-xs`, uppercase, `text-cyan-600 dark:text-cyan-400`. |
| **Floating AI** | `XYRO AI` | `Xelox AI` | Maintain multi-color gradient button, bot icon, and client-side privacy guardrails. |
| **Admin Access** | `xyro-token`, lock icon | `xelox-token`, lock icon | Preserve admin entrance and dark dashboard theme. |
| **Core 3 Services** | Generic studio services | 1. Digital Marketing & Growth<br>2. Website Design & Development<br>3. Mobile App Design & Development | Render within existing `rounded-2xl` card containers using existing hover lift and accent badge styling. |

---

*This document serves as the permanent design guideline for all subsequent implementation phases.*
