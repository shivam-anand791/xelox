# Phase 1 — Codebase Audit & Baseline Report

**Project:** Xelox Solutions (Revamp from XYRO Solutions)  
**Date of Audit:** 2026-10-14  
**Workspace Root:** `X:\downloadss\app\app`  
**Execution Status:** Phase 1 complete. **Zero source files modified.**  
**Design Authority Reference:** [design.md](file:///X:/downloadss/app/app/design.md)  

---

## 1. Tech Stack, Package Versions & Architecture

The workspace is a **full-stack monorepo** containing two independently configured applications:

### 1.1 Frontend (`/frontend`)
*Reference:* [frontend/package.json](file:///X:/downloadss/app/app/frontend/package.json)
- **Core Framework:** React 19.2.0 (`react`, `react-dom`)
- **Language & Compiler:** TypeScript 5.9.3, TSConfig (`tsconfig.app.json`, `tsconfig.node.json`)
- **Build Tool & Dev Server:** Vite 7.2.4 (Vite plugin `@vitejs/plugin-react` 5.1.1, runs at `http://localhost:5173/`)
- **Styling & Design System:**
  - Tailwind CSS 3.4.19 (`tailwindcss`, `postcss`, `autoprefixer`)
  - Tailwind Plugins: `tailwindcss-animate` (1.0.7), `tw-animate-css` (1.4.0)
  - CSS Utilities: `tailwind-merge` (3.4.0), `clsx` (2.1.1), `class-variance-authority` (0.7.1)
- **UI Component Primitives:**
  - Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-accordion`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-tabs`, `@radix-ui/react-select`, `@radix-ui/react-tooltip`, etc.)
  - Icons: `lucide-react` (0.562.0)
  - Theme Engine: `next-themes` (0.4.6)
  - Motion / Animation: `framer-motion` (12.34.0)
  - Toast Notifications: `sonner` (2.0.7)
  - Forms & Validation: `react-hook-form` (7.70.0), `@hookform/resolvers` (5.2.2), `zod` (4.3.5)
- **Data & Networking:** `axios` (1.13.5), `date-fns` (4.1.0), `recharts` (2.15.4)

### 1.2 Backend (`/backend`)
*Reference:* [backend/package.json](file:///X:/downloadss/app/app/backend/package.json)
- **Environment & Module Type:** Node.js (ES Modules: `"type": "module"`)
- **Web Server:** Express 4.21.0 (runs at `http://localhost:5000/`)
- **Database & ODM:** MongoDB Atlas with Mongoose 8.6.0
- **Authentication & Security:**
  - `bcryptjs` (2.4.3), `jsonwebtoken` (9.0.2)
  - `helmet` (7.1.0), `cors` (2.8.5), `express-rate-limit` (7.4.0)
- **Email Delivery:** `nodemailer` (8.0.1) & Brevo API integration
- **File Uploads & Media Storage:**
  - `multer` (2.0.2), `cloudinary` (1.41.3), `multer-storage-cloudinary` (4.0.0)
- **Dev Utilities:** `nodemon` (3.1.4), `morgan` (1.10.1), `dotenv` (16.4.5)

---

## 2. Directory Tree & Code Organization

```
X:\downloadss\app\app\
├── design.md                              <-- Authoritative visual design specification
├── Xelox_Solutions_Implementation_Plan.md <-- 9-Phase execution roadmap
├── README.md
├── docs\
│   └── 01-audit-report.md                 <-- This audit report
├── frontend\
│   ├── index.html                         <-- Title: "XyroSolutions"
│   ├── package.json                       <-- "name": "my-app"
│   ├── tailwind.config.js                 <-- Theme extensions & HSL tokens
│   ├── public\
│   │   ├── logo.svg & logo-dark.svg       <-- Brand SVGs with "XyroSolutions" text
│   │   ├── logo.png                       <-- Raster brand logo mark
│   │   └── *.jpg                          <-- Workspace & portfolio photographic assets
│   └── src\
│       ├── main.tsx                       <-- Vite client entry point
│       ├── App.tsx                        <-- SPA page state router & mobile layout
│       ├── index.css                      <-- Core CSS variables, typography, keyframes, textures
│       ├── lib\api.ts                     <-- Axios/Fetch client, auth headers, token management
│       ├── context\ContentContext.tsx      <-- Default content fallback & API sync logic
│       ├── hooks\
│       │   ├── useContent.ts              <-- Content consumer hook
│       │   └── useScrollReveal.ts         <-- Viewport intersection observer hook
│       ├── components\
│       │   ├── Navigation.tsx             <-- Sticky top header, logo, theme toggle, admin lock
│       │   ├── AskAiAssistant.tsx         <-- AI assistant drawer
│       │   └── ui\                        <-- Radix/shadcn UI primitive components
│       └── sections\
│           ├── HeroSection.tsx            <-- Hero headline, cyan-bordered images, CTAs
│           ├── AboutSection.tsx           <-- Agency philosophy & team trust section
│           ├── PortfolioSection.tsx       <-- Selected work preview grid
│           ├── WorkPage.tsx               <-- Detailed work categories & portfolio
│           ├── WorkCategoryPage.tsx       <-- Dynamic work category listing
│           ├── WorkSection.tsx            <-- Work carousel & case study cards
│           ├── ServicesPage.tsx           <-- Services route container
│           ├── ServicesSection.tsx        <-- Category grid & inquiry links
│           ├── ServiceInquiryPage.tsx     <-- Comprehensive multi-step inquiry form
│           ├── ProcessSection.tsx         <-- 3-step process cards (Discover, Design, Deliver)
│           ├── ResultsSection.tsx         <-- Quantitative metrics & testimonial quote
│           ├── BlogSection.tsx            <-- Tech articles & insights
│           ├── ContactSection.tsx         <-- Contact form & global footer
│           ├── AdminLogin.tsx             <-- Admin authentication dialog
│           ├── AdminDashboard.tsx         <-- 90KB Full CMS dashboard
│           ├── XyroAiPage.tsx             <-- Full-screen AI chat widget
│           ├── Privacy.tsx                <-- Privacy policy
│           └── Terms.tsx                  <-- Terms of service
└── backend\
    ├── server.js                          <-- Express app initialization, CORS, routes
    ├── package.json                       <-- "name": "nexgen-studio-backend"
    ├── seedWork.js & resetContent.js      <-- Database seed & reset scripts
    ├── config\
    │   ├── db.js                          <-- MongoDB Atlas connection
    │   └── env.js                         <-- Environment loader
    ├── models\
    │   ├── User.js, Content.js, Work.js, Service.js, ServiceInquiry.js, BlogPost.js, Contact.js
    ├── routes\
    │   ├── auth.js, content.js, contact.js, blog.js, upload.js, work.js, service.js, serviceInquiry.js
    ├── controllers\
    │   └── ... (route logic & email triggers)
    └── utils\
        ├── email.js                       <-- Nodemailer & Brevo transport
        └── seeder.js                      <-- Initial database seeder
```

---

## 3. Inventory of Pages, Sections & Components

| URL State / Route | Rendered By Component | Key Features & Purpose |
| :--- | :--- | :--- |
| `home` (Default) | [frontend/src/App.tsx](file:///X:/downloadss/app/app/frontend/src/App.tsx) (`MainWebsite`) | Composes Navigation, Hero, About, Portfolio, Process, Results, Blog, Contact/Footer, and Floating AI button. |
| `services` | [frontend/src/sections/ServicesPage.tsx](file:///X:/downloadss/app/app/frontend/src/sections/ServicesPage.tsx) | Header banner + [ServicesSection.tsx](file:///X:/downloadss/app/app/frontend/src/sections/ServicesSection.tsx) displaying service cards. |
| `service-inquiry` | [frontend/src/sections/ServiceInquiryPage.tsx](file:///X:/downloadss/app/app/frontend/src/sections/ServiceInquiryPage.tsx) | Multi-step interactive project inquiry form submitting to `/api/service-inquiries`. |
| `work` | [frontend/src/sections/WorkPage.tsx](file:///X:/downloadss/app/app/frontend/src/sections/WorkPage.tsx) | Category selector (SIH Alumni, Amity Innovation, Hackathons, Cybercubs, Web Dev). |
| `work-category` | [frontend/src/sections/WorkCategoryPage.tsx](file:///X:/downloadss/app/app/frontend/src/sections/WorkCategoryPage.tsx) | Detailed project cards for the selected work category. |
| `xyro-ai` | [frontend/src/sections/XyroAiPage.tsx](file:///X:/downloadss/app/app/frontend/src/sections/XyroAiPage.tsx) | Interactive AI chat page with security guardrails and contact routing. |
| `admin-login` | [frontend/src/sections/AdminLogin.tsx](file:///X:/downloadss/app/app/frontend/src/sections/AdminLogin.tsx) | Email/Password login modal authenticating against `/api/auth/login`. |
| `admin-dashboard` | [frontend/src/sections/AdminDashboard.tsx](file:///X:/downloadss/app/app/frontend/src/sections/AdminDashboard.tsx) | Complete CMS to manage content, projects, services, inquiries, and blog posts. |
| `privacy` | [frontend/src/sections/Privacy.tsx](file:///X:/downloadss/app/app/frontend/src/sections/Privacy.tsx) | Agency Privacy Policy. |
| `terms` | [frontend/src/sections/Terms.tsx](file:///X:/downloadss/app/app/frontend/src/sections/Terms.tsx) | Agency Terms & Conditions. |

---

## 4. Design System Tokens (Cross-Referenced with `design.md`)

*Reference:* [frontend/src/index.css](file:///X:/downloadss/app/app/frontend/src/index.css), [frontend/tailwind.config.js](file:///X:/downloadss/app/app/frontend/tailwind.config.js), [design.md](file:///X:/downloadss/app/app/design.md)

### 4.1 Color Tokens
- **Primary Accent 1 (Electric Lime):** `#B8FF3D`
  - Used in `.btn-primary` (`linear-gradient(135deg, #B8FF3D 0%, #9FE62D 100%)`), hover glows (`box-shadow: 0 15px 40px rgba(184, 255, 61, 0.4)`), text selection (`::selection`), active links, and floating circle ornaments.
- **Brand Accent 2 (Electric Cyan / Turquoise):** `#19D5D0` (Wordmark) / `#22D3EE` (Borders & Highlights)
  - Used in "Xyro" / "Xelox" wordmark (`#19D5D0`), photo frame borders (`border-4 border-cyan-400`), headline accent words, and mono micro-labels.
- **Dark Mode Surfaces (Primary Theme):**
  - Background: `#0B0F14` / `#050608` (HSL: `222 35% 6%`)
  - Cards: `#111827` (Gray-900) & `#0F172A` (Slate-900)
  - Text: Heading `#F8FAFC`, Body `#CBD5E1`
  - Borders: `#334155` (Slate-700) & `#2A3140`
  - Input field background: `#121722`
- **Light Mode Surfaces (Secondary Theme):**
  - Background: `#F6F6F2` (Warm Off-White, HSL: `60 14% 95%`)
  - Cards: `#FFFFFF`
  - Text: Heading `#111111`, Body `#6D6D6D`
  - Borders: `#E2E8F0` / `#CBD5E1`

### 4.2 Typography Stack
- **Headings (`font-display`):** `Space Grotesk` (weights: 400, 500, 600, 700), tight tracking, tight leading.
- **Body & UI:** `Inter` (weights: 400, 500, 600).
- **Eyebrows & Metadata (`font-mono`):** `IBM Plex Mono` (weights: 400, 500), uppercase with `tracking-[0.14em]`.

### 4.3 Textures & Overlays
- `.grain-overlay`: Fixed SVG noise (`feTurbulence`), opacity 0.04 (light) / 0.08 (dark).
- `.x-pattern`: 40x40px repeating SVG diagonal crosses (`opacity: 0.08`).
- `.dot-grid`: Radial gradient 1px dots spaced 20px apart (`opacity: 0.1` light, `0.06` dark).

---

## 5. Functional Features Audit

### 5.1 Contact & Inquiry Processing
- **Endpoint:** `POST /api/contact` (handled by [backend/routes/contact.js](file:///X:/downloadss/app/app/backend/routes/contact.js)).
- **Service Inquiries:** `POST /api/service-inquiries` (handled by [backend/routes/serviceInquiry.js](file:///X:/downloadss/app/app/backend/routes/serviceInquiry.js)).
- **Email Delivery:** Handled via Nodemailer and Brevo in [backend/utils/email.js](file:///X:/downloadss/app/app/backend/utils/email.js), routing inquiries to `ADMIN_EMAIL` (`xyrosolutions1@gmail.com`).
- **Database Persistence:** Inquiries are stored in MongoDB via `Contact` and `ServiceInquiry` models.

### 5.2 Floating AI Chat Widget ("XYRO AI")
- **Implementation:** [frontend/src/sections/XyroAiPage.tsx](file:///X:/downloadss/app/app/frontend/src/sections/XyroAiPage.tsx).
- **Operation:** High-speed client-side intelligent routing assistant. It does not call an ungrounded third-party LLM API directly; instead, it uses structured keyword matching and semantic routing with strict guardrails:
  - Blocks queries requesting passwords, admin tokens, SSH credentials, database keys.
  - Answers verified agency details (services, methodology, location, working hours).
  - Routes leads directly to WhatsApp (`+91 91231 08081`) and public email.

### 5.3 Lock Icon & Administration CMS
- **Icon in Header:** `<Lock size={18} />` in [frontend/src/components/Navigation.tsx](file:///X:/downloadss/app/app/frontend/src/components/Navigation.tsx#L118).
- **Authentication:** Connects to [frontend/src/sections/AdminLogin.tsx](file:///X:/downloadss/app/app/frontend/src/sections/AdminLogin.tsx), issuing a JWT from `POST /api/auth/login`.
- **Token Key:** Stored in `localStorage` under key `'xyro-token'`.
- **Capabilities in [AdminDashboard.tsx](file:///X:/downloadss/app/app/frontend/src/sections/AdminDashboard.tsx):**
  - Content Editor (Hero headline, About copy, Testimonial, Contact details).
  - Projects / Work Manager (Add/edit/delete portfolio items with Cloudinary image uploads).
  - Service Inquiries Manager (Review incoming lead submissions).
  - Blog Post Manager (Draft and publish articles).

### 5.4 Theme Switching
- Managed using `next-themes` (`useTheme` hook) in [Navigation.tsx](file:///X:/downloadss/app/app/frontend/src/components/Navigation.tsx).
- Applies class `.dark` to `document.documentElement`.
- Fully integrated with Tailwind CSS variables and custom gradients.

---

## 6. Comprehensive Inventory of "XYRO" Occurrences

Systematic grep audit across the codebase located **68 active occurrences** grouped into 6 functional categories:

### Category A: UI & User-Facing Text (Target for Phase 2 Rename)
1. [frontend/index.html:L9](file:///X:/downloadss/app/app/frontend/index.html#L9) — `<title>XyroSolutions</title>`
2. [frontend/src/components/Navigation.tsx:L79](file:///X:/downloadss/app/app/frontend/src/components/Navigation.tsx#L79) — `title="Xyro Solutions"`
3. [frontend/src/components/Navigation.tsx:L84](file:///X:/downloadss/app/app/frontend/src/components/Navigation.tsx#L84) — `alt="Xyro Solutions"`
4. [frontend/src/components/Navigation.tsx:L90](file:///X:/downloadss/app/app/frontend/src/components/Navigation.tsx#L90) — `<span ... text-[#19D5D0]">Xyro</span>`
5. [frontend/src/App.tsx:L64](file:///X:/downloadss/app/app/frontend/src/App.tsx#L64) — `aria-label="Open Xyro AI"`
6. [frontend/src/App.tsx:L68](file:///X:/downloadss/app/app/frontend/src/App.tsx#L68) — `<span>XYRO AI</span>`
7. [frontend/src/context/ContentContext.tsx:L10](file:///X:/downloadss/app/app/frontend/src/context/ContentContext.tsx#L10) — `microLabel: "XYROSOLUTIONS — 2026"`
8. [frontend/src/context/ContentContext.tsx:L57](file:///X:/downloadss/app/app/frontend/src/context/ContentContext.tsx#L57) — `quote: "XyroSolutions turned our rough idea into a brand..."`
9. [frontend/src/sections/ContactSection.tsx:L140](file:///X:/downloadss/app/app/frontend/src/sections/ContactSection.tsx#L140) — `© XyroSolutions — 2026`
10. [frontend/src/sections/WorkPage.tsx:L82](file:///X:/downloadss/app/app/frontend/src/sections/WorkPage.tsx#L82) — `XyroSolutions - Work`
11. [frontend/src/sections/WorkCategoryPage.tsx:L131](file:///X:/downloadss/app/app/frontend/src/sections/WorkCategoryPage.tsx#L131) — `XyroSolutions - {categoryData?.title || 'Work'}`
12. [frontend/src/sections/ServicesPage.tsx:L28](file:///X:/downloadss/app/app/frontend/src/sections/ServicesPage.tsx#L28) — `XyroSolutions - Services`
13. [frontend/src/sections/Terms.tsx:L25,31,34](file:///X:/downloadss/app/app/frontend/src/sections/Terms.tsx#L25) — Mentions of "XyroSolutions" terms and ownership.
14. [frontend/src/sections/AdminDashboard.tsx:L402,429](file:///X:/downloadss/app/app/frontend/src/sections/AdminDashboard.tsx#L402) — Header `<h1>XyroSolutions</h1>`.

### Category B: AI Assistant & Persona Prompts
1. [frontend/src/sections/XyroAiPage.tsx:L38](file:///X:/downloadss/app/app/frontend/src/sections/XyroAiPage.tsx#L38) — `"answer public questions about XyroSolutions"`
2. [frontend/src/sections/XyroAiPage.tsx:L42](file:///X:/downloadss/app/app/frontend/src/sections/XyroAiPage.tsx#L42) — `"help with XyroSolutions website questions too"`
3. [frontend/src/sections/XyroAiPage.tsx:L74](file:///X:/downloadss/app/app/frontend/src/sections/XyroAiPage.tsx#L74) — `"XyroSolutions is a creative agency..."`
4. [frontend/src/sections/XyroAiPage.tsx:L85](file:///X:/downloadss/app/app/frontend/src/sections/XyroAiPage.tsx#L85) — `"questions about XyroSolutions..."`
5. [frontend/src/sections/XyroAiPage.tsx:L160,182,255](file:///X:/downloadss/app/app/frontend/src/sections/XyroAiPage.tsx#L160) — Titles `"Xyro AI"`, `"Ask Xyro AI"`
6. [frontend/src/components/AskAiAssistant.tsx:L37,65](file:///X:/downloadss/app/app/frontend/src/components/AskAiAssistant.tsx#L37) — Drawer descriptions referencing XyroSolutions.

### Category C: Code Identifiers, Storage Keys & Internal Routes
1. [frontend/src/lib/api.ts:L32,67,74,85,201](file:///X:/downloadss/app/app/frontend/src/lib/api.ts#L32) — `localStorage.getItem('xyro-token')` (Auth token key)
2. [frontend/src/sections/AdminDashboard.tsx:L99,120,135,162,178,192,207,223,238,263,286,313](file:///X:/downloadss/app/app/frontend/src/sections/AdminDashboard.tsx#L99) — Usage of `'xyro-token'` and `'xyro-work-update'` event trigger.
3. [frontend/src/context/ContentContext.tsx:L259,273](file:///X:/downloadss/app/app/frontend/src/context/ContentContext.tsx#L259) — `localStorage.getItem('xyro-content')` cache key.
4. [frontend/src/App.tsx:L23,137](file:///X:/downloadss/app/app/frontend/src/App.tsx#L23) — Page identifier `'xyro-ai'`.
5. [frontend/src/sections/XyroAiPage.tsx](file:///X:/downloadss/app/app/frontend/src/sections/XyroAiPage.tsx) — Component filename `XyroAiPage.tsx`.

### Category D: Backend Models, Seeders & Email Transports
1. [backend/models/Content.js:L9,64,81](file:///X:/downloadss/app/app/backend/models/Content.js#L9) — Default microLabel `XYROSOLUTIONS — 2026`, testimonial quote, email default.
2. [backend/models/BlogPost.js:L30](file:///X:/downloadss/app/app/backend/models/BlogPost.js#L30) — Default author `'XyroSolutions'`.
3. [backend/server.js:L152](file:///X:/downloadss/app/app/backend/server.js#L152) — Root API response `message: 'XyroSolutions API'`.
4. [backend/utils/email.js:L77,83](file:///X:/downloadss/app/app/backend/utils/email.js#L77) — Contact form notification footer and fallback address.
5. [backend/controllers/serviceInquiryController.js:L21,43,45,56](file:///X:/downloadss/app/app/backend/controllers/serviceInquiryController.js#L21) — Customer receipt subject line and team sign-off.
6. [backend/resetContent.js:L19,49](file:///X:/downloadss/app/app/backend/resetContent.js#L19) & [backend/utils/seeder.js:L18,60](file:///X:/downloadss/app/app/backend/utils/seeder.js#L18) — Database seed defaults.

### Category E: Asset Files & Public SVGs
1. [frontend/public/logo-dark.svg:L21](file:///X:/downloadss/app/app/frontend/public/logo-dark.svg#L21) — Text element `<tspan fill="#19D5D0">Xyro</tspan>`.

### Category F: Whitelisted Technical Exceptions (Intentional Non-Breaking)
*These must be maintained until corresponding external infrastructure is migrated:*
1. **Cloudinary Remote Image Directories:** Assets with URLs like `.../res.cloudinary.com/dr4w6ordx/image/upload/...`
2. **Git Remote Repository URL:** `https://github.com/Aditya1224code/XyroSolutions.git`
3. **Production API Fallback:** `https://xyrosolutions.onrender.com/api` (in [api.ts](file:///X:/downloadss/app/app/frontend/src/lib/api.ts#L2) and section files until Render domain is migrated).
4. **CORS Whitelist in Backend:** `https://xyrosolutions.tech` in [backend/server.js:L52-53](file:///X:/downloadss/app/app/backend/server.js#L52).
5. **Existing Social Links:** `https://instagram.com/xyrosolutions1` in [ContactSection.tsx](file:///X:/downloadss/app/app/frontend/src/sections/ContactSection.tsx#L143) until new handles are provided.

---

## 7. Baseline Health, Build & Lint Analysis

### 7.1 Production Build (`npm run build` in `/frontend`)
- **Status:** **PASSED (Exit code: 0)**
- **Duration:** 12.57 seconds
- **Modules Transformed:** 2,238 modules
- **Artifacts Generated:**
  - `dist/index.html` (0.58 kB, gzip: 0.34 kB)
  - `dist/assets/index-CmOrx0M4.css` (136.91 kB, gzip: 22.66 kB)
  - `dist/assets/index-Dwh_Ldvu.js` (701.55 kB, gzip: 195.31 kB)
- **Observations:** Bundle size warning on `index-*.js` (>500 kB). In Phase 8, dynamic `React.lazy()` chunking should be introduced for `AdminDashboard` and `ServiceInquiryPage` to reduce initial bundle weight.

### 7.2 Linter Execution (`npm run lint` in `/frontend`)
- **Status:** **FAILED (Exit code: 1, 41 problems: 38 errors, 3 warnings)**
- **Root Cause Analysis of Pre-existing Lint Errors:**
  - `AdminDashboard.tsx`: 30 instances of `@typescript-eslint/no-explicit-any` and unused error variables.
  - `Navigation.tsx` (L19, L27) & `XyroAiPage.tsx` (L102): `react-hooks/set-state-in-effect` (calling `setMounted(true)` synchronously inside `useEffect`).
  - `WorkCategoryPage.tsx` & `WorkSection.tsx`: `react-hooks/exhaustive-deps` warning on missing `fetchWork` dependency.
  *Note:* None of these errors prevent successful compilation or dev server operation, but they should be systematically cleaned up in Phase 8.

### 7.3 Performance, Accessibility & Responsive Observations
- **Accessibility:**
  - Screen-reader labels (`aria-label`) are already present on theme toggles and AI buttons.
  - Good color contrast in Dark Mode (`#F8FAFC` on `#0B0F14` easily passes WCAG AAA).
  - Light Mode `text-gray-custom` (`#6D6D6D`) passes WCAG AA (4.6:1 contrast ratio) on `#F6F6F2`.
- **Responsiveness:**
  - Specialized touch device optimizations (`html.touch-device` disabling grain overlay) are already wired.
  - Navigation cleanly collapses into a mobile slide drawer.

---

## 8. Summary & Approval Gate

Phase 1 audit is complete:
- Zero source code modifications made.
- Complete inventory of the 68 `xyro` occurrences categorized.
- Design tokens validated against [design.md](file:///X:/downloadss/app/app/design.md).
- Baseline health, build outputs, and pre-existing lint status confirmed.

**STOP AND WAIT FOR USER APPROVAL before beginning Phase 2 (Rebrand to Xelox Solutions).**
