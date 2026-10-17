import { useState } from 'react';
import { 
  TrendingUp, 
  Code2, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Rocket, 
  ChevronRight
} from 'lucide-react';

export type PillarId = 'digital-marketing' | 'web-development' | 'mobile-apps';

interface ServicesSectionProps {
  onStartInquiry?: (category: string) => void;
  onNavigate?: (page: string) => void;
  showDeepDive?: boolean;
}

interface ServicePillar {
  id: PillarId;
  number: string;
  badge: string;
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  bullets: string[];
  scope: string;
  idealFor: string;
  deliverables: string[];
  process: { step: string; title: string; desc: string }[];
  techStack: string[];
}

const servicePillars: ServicePillar[] = [
  {
    id: 'digital-marketing',
    number: '01',
    badge: 'ACQUISITION & PERFORMANCE',
    title: 'Digital Marketing & Growth',
    tagline: 'Data-driven marketing systems and high-ROI acquisition channels engineered to drive predictable customer volume and revenue.',
    icon: TrendingUp,
    accentColor: '#B8FF3D',
    bullets: [
      'Technical SEO & Organic Search Authority',
      'High-ROI Paid Acquisition (Meta, Google, LinkedIn)',
      'Conversion Rate Optimization (CRO) & Funnels',
      'Multi-Channel Content & Brand Distribution'
    ],
    scope: 'Full-funnel growth architecture combining search dominance, precision paid media, and conversion-tested landing pages.',
    idealFor: 'Growth-stage startups, established businesses, and SaaS founders looking for measurable ROI and predictable customer acquisition.',
    deliverables: [
      'Comprehensive Technical & Competitor SEO Audit',
      'Multi-Channel Paid Advertising Campaigns & Ad Creatives',
      'High-Converting Landing Page Design & A/B Testing',
      'Attribution Tracking & Custom GA4 Analytics Dashboards',
      'Automated Email Marketing & Lead Nurture Funnels',
      'Bi-Weekly Sprint Reviews with Transparent Performance Metrics'
    ],
    process: [
      {
        step: '01',
        title: 'Audit & Signal Mapping',
        desc: 'We analyze your market landscape, historical traffic, customer journeys, and conversion funnels to identify high-leverage growth opportunities.'
      },
      {
        step: '02',
        title: 'Campaign Architecture & Creative',
        desc: 'We design high-converting visual ad creatives, write persuasive copy, build conversion landing pages, and configure tracking pixels.'
      },
      {
        step: '03',
        title: 'Scale & Multivariate Optimization',
        desc: 'Continuous multivariate testing, algorithmic budget scaling, and keyword expansion to ensure CAC decreases as volume compounds.'
      }
    ],
    techStack: ['Google Ads', 'Meta Ads Manager', 'LinkedIn Ads', 'Google Analytics 4', 'Semrush', 'PostHog', 'Klaviyo']
  },
  {
    id: 'web-development',
    number: '02',
    badge: 'FULL-STACK WEB PLATFORMS',
    title: 'Website Design & Development',
    tagline: 'Bespoke digital flagships, web applications, and headless platforms engineered with uncompromising speed, craft, and conversion.',
    icon: Code2,
    accentColor: '#22D3EE',
    bullets: [
      'Custom Web Applications & SaaS (React, Next.js, Node)',
      'High-Craft Corporate & Brand Flagships',
      'Headless E-Commerce & Transaction Systems',
      '99+ Core Web Vitals, Accessibility & Technical SEO'
    ],
    scope: 'Engineering bespoke, scalable web applications and digital flagships from initial architectural blueprint to production deployment.',
    idealFor: 'Founders launching digital platforms, growing teams redesigning legacy web properties, and companies requiring enterprise-grade web reliability.',
    deliverables: [
      'Bespoke Figma UI/UX Design System with Atomic Components',
      'Production-Ready React / Next.js / TypeScript Codebase',
      'Headless CMS Integration (Sanity, Strapi, or Custom MERN)',
      'Secure REST & GraphQL API Architecture',
      'Cross-Device Responsive Testing across 15+ Screen Viewports',
      '99+ Google Lighthouse Scores & WCAG AA Accessibility'
    ],
    process: [
      {
        step: '01',
        title: 'Architecture & Wireframing',
        desc: 'We define the information architecture, outline interactive user journeys, and establish core typography and color tokens before code.'
      },
      {
        step: '02',
        title: 'Full-Stack Development',
        desc: 'We build modern, responsive frontends paired with robust backend APIs, database models, and secure authentication flows.'
      },
      {
        step: '03',
        title: 'Performance QA & Deployment',
        desc: 'Rigorous cross-browser stress testing, SEO indexing, automated CI/CD pipeline setup, and seamless production deployment.'
      }
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Vercel']
  },
  {
    id: 'mobile-apps',
    number: '03',
    badge: 'IOS & ANDROID ECOSYSTEMS',
    title: 'Mobile App Design & Development',
    tagline: 'Intuitive, fluid iOS and Android mobile applications crafted with native-level performance and resilient backend integrations.',
    icon: Smartphone,
    accentColor: '#B8FF3D',
    bullets: [
      'Native & Cross-Platform Apps (React Native / Flutter)',
      'Touch UI/UX Design & Micro-Interaction Systems',
      'Offline-First Architecture & Push Pipelines',
      'App Store Optimization (ASO) & Store Submission'
    ],
    scope: 'End-to-end mobile application engineering, translating complex workflows into fluid, delightful touch interactions for both iOS and Android.',
    idealFor: 'Businesses expanding their customer experience to mobile, consumer mobile startups, and enterprises needing secure field apps.',
    deliverables: [
      'Mobile UX Wireframes & Interactive Touch Prototypes',
      'Unified React Native / Flutter Cross-Platform Codebase',
      'Biometric Authentication & Secure Device Keychain Storage',
      'Push Notification Infrastructure (FCM / APNs)',
      'Payment Gateway Integration (Stripe, Apple Pay, Google Pay)',
      'End-to-End App Store & Google Play Store Submission'
    ],
    process: [
      {
        step: '01',
        title: 'Touch UX & User Flows',
        desc: 'We design intuitive screen flows, finger-friendly layouts, and smooth micro-interactions optimized for real-world handheld usage.'
      },
      {
        step: '02',
        title: 'Cross-Platform Build',
        desc: 'We develop clean, modular mobile components with offline caching, hardware integrations, and real-time WebSocket sync.'
      },
      {
        step: '03',
        title: 'App Store Launch & Telemetry',
        desc: 'Internal beta testing with TestFlight, store compliance audit, store asset creation, and release monitoring.'
      }
    ],
    techStack: ['React Native', 'Expo', 'Flutter', 'TypeScript', 'Firebase', 'SQLite', 'Apple StoreKit', 'Google Play Billing']
  }
];

export default function ServicesSection({ onStartInquiry, onNavigate, showDeepDive = true }: ServicesSectionProps) {
  const [activePillarId, setActivePillarId] = useState<PillarId>('digital-marketing');

  const activePillar = servicePillars.find(p => p.id === activePillarId) || servicePillars[0];

  const handleCardDeepDive = (pillarId: PillarId) => {
    setActivePillarId(pillarId);
    if (showDeepDive) {
      const element = document.getElementById('service-deep-dive');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (onNavigate) {
      onNavigate('services');
    }
  };

  const handleInquiryClick = (pillarId: PillarId) => {
    if (onStartInquiry) {
      onStartInquiry(pillarId);
    }
  };

  return (
    <section id="services" className="py-20 px-6 lg:px-12 bg-[#F6F6F2] dark:bg-[#050608] relative">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-dark dark:text-white mb-5 leading-[1.1]">
            ENGINEERED FOR SCALE, SPEED &amp; CRAFT.
          </h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-slate-300 leading-relaxed">
            We focus exclusively on three complementary pillars. Every engagement is custom-architected 
            by senior engineers and growth specialists to deliver verifiable business results.
          </p>
        </div>

        {/* 3 Core Pillar Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {servicePillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = activePillarId === pillar.id;

            return (
              <div
                key={pillar.id}
                className={`rounded-2xl border transition-all duration-300 p-8 flex flex-col justify-between relative group ${
                  isSelected
                    ? 'border-cyan-400 bg-white dark:bg-[#111827] shadow-[0_20px_50px_rgba(34,211,238,0.15)] -translate-y-2'
                    : 'border-black/10 dark:border-slate-800 bg-white/70 dark:bg-[#111827]/70 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)]'
                }`}
              >
                {/* Top Accent Indicator */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-opacity duration-300"
                  style={{
                    background: isSelected 
                      ? 'linear-gradient(90deg, #B8FF3D 0%, #19D5D0 100%)' 
                      : 'transparent'
                  }}
                />

                {/* Card Top */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">
                      {pillar.number} / {pillar.badge}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-lime/15 dark:bg-lime/10 border border-lime/30 flex items-center justify-center text-dark dark:text-lime">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-dark dark:text-white mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed mb-6">
                    {pillar.tagline}
                  </p>

                  {/* Capability Bullets */}
                  <div className="space-y-2.5 pt-4 border-t border-black/5 dark:border-white/10 mb-8">
                    {pillar.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs font-medium text-dark/90 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-lime shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTAs */}
                <div className="pt-4 border-t border-black/5 dark:border-white/10 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => handleInquiryClick(pillar.id)}
                    className="btn-primary group relative w-full h-11 flex items-center justify-center px-10 rounded-xl text-xs tracking-wider uppercase font-semibold border-2 border-transparent transition-all duration-300"
                  >
                    <span 
                      aria-hidden="true"
                      className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-current transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      <ArrowRight className="w-4 h-4 shrink-0 block" strokeWidth={2} />
                    </span>
                    <span className="truncate text-center">Start Project Inquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCardDeepDive(pillar.id)}
                    className="btn-outline group relative w-full h-11 flex items-center justify-center px-10 rounded-xl text-xs tracking-wider uppercase font-semibold border-2 transition-all duration-300"
                  >
                    <span 
                      aria-hidden="true"
                      className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-current transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      <ArrowRight className="w-4 h-4 shrink-0 block" strokeWidth={2} />
                    </span>
                    <span className="truncate text-center">
                      {showDeepDive ? (isSelected ? 'Viewing Full Scope' : 'Explore Full Scope') : 'Explore Full Scope'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Homepage Preview Banner linking to dedicated Services & Pricing pages */}
        {!showDeepDive && (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-lime/15 border border-lime/30 flex items-center justify-center text-dark dark:text-lime shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-dark dark:text-white">
                  Need in-depth specifications, technical architectures, or pricing?
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed mt-0.5">
                  Explore full deliverables for all three pillars, along with predictable packages starting from ₹5,000.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate ? onNavigate('services') : null}
                className="btn-primary text-xs font-bold uppercase tracking-wider px-5 py-2.5 inline-flex items-center gap-2 shadow-sm"
              >
                <span>Full Services Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate ? onNavigate('pricing') : null}
                className="btn-outline text-xs font-mono font-bold uppercase tracking-wider px-4 py-2.5 inline-flex items-center gap-1.5"
              >
                <span>Pricing Guide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Deep Dive Section */}
        {showDeepDive && (
          <div id="service-deep-dive" className="pt-8 border-t border-black/10 dark:border-white/10">
            {/* Pillar Selector Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-cyan-600 dark:text-cyan-400 mb-1">
                  DETAILED SPECIFICATION
                </p>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-dark dark:text-white">
                  Scope &amp; Delivery Framework
                </h3>
              </div>

              {/* Tab Pills */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                {servicePillars.map((pillar) => (
                  <button
                    key={pillar.id}
                    onClick={() => setActivePillarId(pillar.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 ${
                      activePillarId === pillar.id
                        ? 'bg-dark text-white dark:bg-lime dark:text-dark font-bold shadow-md'
                        : 'text-gray-700 dark:text-slate-300 hover:text-dark dark:hover:text-white'
                    }`}
                  >
                    {pillar.title.split('&')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Depth Panel */}
            <div className="rounded-3xl border border-black/10 dark:border-slate-800 bg-white/90 dark:bg-[#111827] p-8 lg:p-12 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Left Column (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-400/30 text-cyan-700 dark:text-cyan-400 font-mono text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-lime" />
                    <span>Pillar {activePillar.number} Specifications</span>
                  </div>

                  <h4 className="font-display font-bold text-3xl text-dark dark:text-white">
                    {activePillar.title}
                  </h4>

                  <p className="text-sm md:text-base text-gray-700 dark:text-slate-300 leading-relaxed">
                    {activePillar.scope}
                  </p>

                  <div className="p-4 rounded-xl bg-black/[0.03] dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-dark/70 dark:text-slate-400 font-semibold block">
                      Target Profile / Ideal For:
                    </span>
                    <p className="text-xs md:text-sm text-dark dark:text-slate-200 leading-relaxed">
                      {activePillar.idealFor}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold block mb-3">
                      Core Technologies &amp; Tooling
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activePillar.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-md text-xs font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-dark/80 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => handleInquiryClick(activePillar.id)}
                      className="btn-primary w-full justify-center py-3.5 text-xs font-bold uppercase tracking-wider"
                    >
                      <span>Discuss Your {activePillar.title.split('&')[0]} Project</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>

                {/* Right Column (7 cols) */}
                <div className="lg:col-span-7 space-y-8 lg:pl-6 lg:border-l lg:border-black/10 lg:dark:border-white/10">
                  {/* Deliverables Checklist */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Layers className="w-4 h-4 text-emerald-600 dark:text-lime" />
                      <h5 className="font-display font-bold text-lg text-dark dark:text-white uppercase tracking-tight">
                        Standard Deliverables Scope
                      </h5>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activePillar.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20 flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-lime shrink-0 mt-0.5" />
                          <span className="text-xs text-dark/90 dark:text-slate-300 leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3-Step Execution Framework */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Rocket className="w-4 h-4 text-cyan-400" />
                      <h5 className="font-display font-bold text-lg text-dark dark:text-white uppercase tracking-tight">
                        3-Step Execution Framework
                      </h5>
                    </div>
                    <div className="space-y-3">
                      {activePillar.process.map((step) => (
                        <div
                          key={step.step}
                          className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20 flex items-start gap-4"
                        >
                          <span className="font-mono text-sm font-bold text-cyan-600 dark:text-cyan-400 shrink-0">
                            {step.step}
                          </span>
                          <div>
                            <h6 className="font-display font-bold text-sm text-dark dark:text-white mb-1">
                              {step.title}
                            </h6>
                            <p className="text-xs text-gray-700 dark:text-slate-300 leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Tailored Stack Scoping Callout */}
        <div className="mt-16 rounded-2xl border border-lime/30 bg-gradient-to-r from-lime/10 via-cyan-500/10 to-transparent p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 font-semibold block mb-2">
              Cross-Disciplinary Engagements
            </span>
            <h4 className="font-display font-bold text-2xl text-dark dark:text-white mb-2">
              Need a full-lifecycle stack combining Sites, Apps &amp; Growth?
            </h4>
            <p className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
              Most ambitious partners combine multiple pillars—for example, building a high-conversion web platform paired with ongoing growth campaigns. We structure integrated sprint retainers with unified accountability.
            </p>
          </div>
          <button
            onClick={() => handleInquiryClick('web-development')}
            className="btn-primary shrink-0 px-8 py-3.5 text-xs uppercase tracking-wider font-bold"
          >
            <span>Request Full Scope Consultation</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

      </div>
    </section>
  );
}
