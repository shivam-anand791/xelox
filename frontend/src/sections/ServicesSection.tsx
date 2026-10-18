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
  ChevronRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

export type PillarId = 'digital-marketing' | 'web-development' | 'mobile-apps';

interface ServicesSectionProps {
  onStartInquiry?: (category: string) => void;
  onNavigate?: (page: string) => void;
  showDeepDive?: boolean;
}

interface ServiceArea {
  title: string;
  description: string;
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
  ctaLabel: string;
  scope: string;
  scopeAreas: ServiceArea[];
  accountabilityTitle: string;
  accountabilityNote: string;
  idealFor: string;
  deliverables: string[];
  process: { step: string; title: string; desc: string }[];
  techStack: string[];
}

const servicePillars: ServicePillar[] = [
  {
    id: 'digital-marketing',
    number: '01',
    badge: 'SEARCH, ADS & CONVERSION',
    title: 'Digital Marketing & Growth',
    tagline: 'Targeted organic search visibility, structured paid advertising, and conversion landing pages designed to generate qualified business inquiries.',
    icon: TrendingUp,
    accentColor: '#B8FF3D',
    bullets: [
      'Search Visibility & Local SEO: Technical audits, keyword strategy & Google Search Console indexing',
      'Targeted Paid Ads: Google Search & Meta campaign management with strict daily budget caps',
      'Conversion Landing Pages: Fast, structured campaign pages engineered to turn visits into leads',
      'Analytics & Reporting: GA4 event tracking, conversion attribution & transparent monthly reporting'
    ],
    ctaLabel: 'Discuss Marketing Goals',
    scope: 'We plan and execute targeted digital marketing workflows to help businesses attract the right audience and convert traffic into verified customer inquiries. We do not sell one-size-fits-all bundles; services are selected based on your business stage, target audience, and realistic budget.',
    scopeAreas: [
      {
        title: 'Organic Search Visibility (SEO)',
        description: 'Technical site audits, metadata optimization, content structure, and Google Business Profile management to establish sustainable search discovery over time.'
      },
      {
        title: 'Paid Advertising (Google & Meta)',
        description: 'Targeted Google Search and Meta ad campaigns focused on commercial intent, operated with strict daily spend limits and negative keyword filtering.'
      },
      {
        title: 'Landing Pages & Conversion (CRO)',
        description: 'Dedicated, mobile-friendly landing pages built specifically for campaign traffic, featuring clear value propositions and direct WhatsApp / inquiry form routing.'
      },
      {
        title: 'Analytics, Attribution & Measurement',
        description: 'End-to-end Google Analytics 4 (GA4) configuration and conversion tracking so you have 100% clarity on which channels produce real inquiries.'
      }
    ],
    accountabilityTitle: 'Measurement & Accountability Standard',
    accountabilityNote: 'We do not promise artificial ROAS multipliers or instant search rankings. All campaigns operate on client-owned ad accounts with transparent monthly reporting detailing actual spend, clicks, cost-per-click, and verified form submissions.',
    idealFor: 'Local businesses, B2B service providers, and growing brands seeking transparent campaign execution, search discovery, and measurable inquiry growth.',
    deliverables: [
      'Technical SEO audit & Google Search Console indexing setup',
      'Google Search & Meta ad campaign structure with negative keywords',
      'Conversion-optimized responsive landing page with inquiry tracking',
      'Google Analytics 4 (GA4) custom event tracking configuration',
      'Google Business Profile optimization for local geographical discovery',
      'Transparent monthly performance review detailing ad spend and lead flow'
    ],
    process: [
      {
        step: '01',
        title: 'Audit & Search Strategy',
        desc: 'We evaluate existing search presence, review competitor positioning, and identify high-intent search terms.'
      },
      {
        step: '02',
        title: 'Campaign & Landing Page Build',
        desc: 'We write clear ad copy, build focused campaign landing pages, and configure conversion tracking pixels.'
      },
      {
        step: '03',
        title: 'Tracking & Reporting Review',
        desc: 'Regular reviews of actual ad spend, cost-per-inquiry, and search impressions to refine targeting.'
      }
    ],
    techStack: ['Google Ads', 'Meta Ads Manager', 'Google Search Console', 'Google Analytics 4', 'Semrush', 'PostHog']
  },
  {
    id: 'web-development',
    number: '02',
    badge: 'SITES, WEB APPS & PLATFORMS',
    title: 'Website Design & Development',
    tagline: 'Responsive business websites, custom web applications, and e-commerce platforms engineered with modern frontend craft, clean architecture, and fast load times.',
    icon: Code2,
    accentColor: '#22D3EE',
    bullets: [
      'Responsive Business Websites: Fast-loading, accessible digital brand flagships',
      'Custom Web Applications: Interactive user portals, dashboards & transactional SaaS',
      'E-Commerce & Catalogue Sites: Product listings, quote flows & secure payment gateways',
      'Sub-Second Performance: 99+ Core Web Vitals target, clean TypeScript & ongoing support'
    ],
    ctaLabel: 'Discuss Web Project',
    scope: 'We design and engineer bespoke web solutions from initial wireframes to production deployment. We clearly differentiate between marketing websites—built for brand authority and lead capture—and custom web applications—built with authenticated user roles, database models, and transactional workflows.',
    scopeAreas: [
      {
        title: 'Marketing & Corporate Websites',
        description: 'High-craft digital flagships and landing pages designed in Figma and coded with Next.js/Tailwind CSS. Built for speed, mobile responsiveness, and clear service presentation.'
      },
      {
        title: 'Custom Web Applications & SaaS',
        description: 'Full-stack software platforms with user authentication, database management (PostgreSQL/MongoDB), secure APIs, administrative dashboards, and custom business logic.'
      },
      {
        title: 'E-Commerce & Catalogue Engines',
        description: 'Product showcase catalogues, B2B wholesale quotation dispatch systems, and online checkout with payment gateway integrations (Razorpay, Stripe).'
      },
      {
        title: 'Maintenance & Technical Support',
        description: 'Ongoing Core Web Vitals monitoring, framework updates, security patching, and technical content updates to keep your web property healthy.'
      }
    ],
    accountabilityTitle: 'Engineering & Performance Standards',
    accountabilityNote: 'All code is written in strict TypeScript with modular component architecture, tested across 15+ screen viewports, and architected to meet 99+ Google Lighthouse performance targets.',
    idealFor: 'Founders launching new products, growing businesses upgrading legacy websites, and teams requiring reliable, maintainable web software.',
    deliverables: [
      'Bespoke Figma UI/UX wireframes with atomic component design',
      'Production React / Next.js / TypeScript codebase with zero unnecessary bloat',
      'Sub-second page loading with 99+ Core Web Vitals target',
      'REST API architecture, database schema & secure user authentication',
      'Payment gateway integrations (Stripe, Razorpay, or custom checkout)',
      'Cross-browser and responsive device testing (Mobile, Tablet, Desktop)'
    ],
    process: [
      {
        step: '01',
        title: 'Architecture & UX Wireframes',
        desc: 'We map out the information architecture, user journeys, and component styling in Figma before coding.'
      },
      {
        step: '02',
        title: 'Full-Stack Engineering',
        desc: 'We build responsive frontends paired with resilient APIs, secure database models, and integrated form pipelines.'
      },
      {
        step: '03',
        title: 'Performance QA & Launch',
        desc: 'Cross-browser testing, accessibility compliance, Core Web Vitals verification, and zero-downtime deployment.'
      }
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB / PostgreSQL', 'Vercel']
  },
  {
    id: 'mobile-apps',
    number: '03',
    badge: 'IOS & ANDROID ECOSYSTEMS',
    title: 'Mobile App Development',
    tagline: 'Cross-platform mobile applications for iOS and Android engineered with responsive touch UI, offline-first data sync, and secure API integrations.',
    icon: Smartphone,
    accentColor: '#B8FF3D',
    bullets: [
      'Unified Cross-Platform Build: Single codebase for iOS & Android via React Native & Expo',
      'Touch UI/UX Design: Intuitive finger-friendly layouts, ergonomic flows & micro-interactions',
      'Offline-First Sync: Local SQLite / device storage with resilient network reconnects',
      'API Integrations & Push: Secure token authentication and real-time notification pipelines'
    ],
    ctaLabel: 'Discuss Mobile App',
    scope: 'We build focused cross-platform mobile applications using React Native and Expo, enabling you to reach both iOS and Android users from a single, maintainable codebase without doubling development costs. We manage the full lifecycle from mobile screen flows to App Store and Google Play Console release preparation.',
    scopeAreas: [
      {
        title: 'Unified Cross-Platform Apps',
        description: 'Built with React Native and Expo to deliver consistent, near-native performance on both iOS and Android from a single source of truth.'
      },
      {
        title: 'Progressive Web Apps (PWAs)',
        description: 'Fast, installable web experiences that run across mobile browsers with offline caching, ideal for lightweight customer portals.'
      },
      {
        title: 'Backend & API Integration',
        description: 'Secure token authentication, push notification delivery (FCM), and RESTful API integration connecting your mobile app to your web backend.'
      },
      {
        title: 'App Store Submission Guidance',
        description: 'Assistance with store asset creation, privacy policy compliance, developer account setup, and submission to Google Play and Apple App Store.'
      }
    ],
    accountabilityTitle: 'Platform Capabilities & Transparency',
    accountabilityNote: 'We specialize in cross-platform React Native and Expo applications, thoroughly tested on physical iOS and Android hardware. We do not claim low-level native game engine or proprietary IoT driver development.',
    idealFor: 'Businesses seeking a direct mobile touchpoint with customers, consumer mobile startups validating an MVP, and teams needing field utilities.',
    deliverables: [
      'Interactive mobile screen prototypes and touch navigation flows',
      'Unified React Native / Expo codebase supporting iOS and Android',
      'Secure token authentication and encrypted device keychain storage',
      'Push notification infrastructure and third-party API connections',
      'Offline caching and resilient error handling for intermittent connectivity',
      'App Store and Google Play Console release preparation and assets'
    ],
    process: [
      {
        step: '01',
        title: 'Touch UX & Screen Flows',
        desc: 'We design thumb-zone ergonomic screen flows, navigation stacks, and touch interface components.'
      },
      {
        step: '02',
        title: 'Cross-Platform Development',
        desc: 'We build modular React Native components, test on physical devices, and connect backend APIs.'
      },
      {
        step: '03',
        title: 'Release Testing & Store Guidance',
        desc: 'Internal beta distribution, store compliance review, store asset creation, and production release.'
      }
    ],
    techStack: ['React Native', 'Expo', 'TypeScript', 'Tailwind / NativeWind', 'SQLite', 'Firebase', 'REST APIs']
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

  const handleInquiryAnchor = (e: React.MouseEvent<HTMLAnchorElement>, pillarId: PillarId) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    handleInquiryClick(pillarId);
  };

  const handleCardDeepDiveAnchor = (e: React.MouseEvent<HTMLAnchorElement>, pillarId: PillarId) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    handleCardDeepDive(pillarId);
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-12 bg-[#F6F6F2] dark:bg-[#050608] relative">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-dark dark:text-white mb-4 leading-[1.1]">
            ENGINEERED FOR CLARITY, SPEED &amp; CRAFT.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-slate-300 leading-relaxed">
            We focus exclusively on three core digital services. Every engagement is custom-architected 
            with clear deliverables, transparent methodologies, and honest measurement.
          </p>
        </div>

        {/* 3 Core Pillar Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 sm:mb-20">
          {servicePillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = activePillarId === pillar.id;

            return (
              <div
                key={pillar.id}
                className={`rounded-2xl border transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between relative group ${
                  isSelected
                    ? 'border-cyan-400 bg-white dark:bg-[#111827] shadow-[0_20px_50px_rgba(34,211,238,0.15)] -translate-y-1 sm:-translate-y-2'
                    : 'border-black/10 dark:border-slate-800 bg-white/70 dark:bg-[#111827]/70 hover:-translate-y-1 sm:hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)]'
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
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">
                      {pillar.number} / {pillar.badge}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-lime/15 dark:bg-lime/10 border border-lime/30 flex items-center justify-center text-dark dark:text-lime">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-dark dark:text-white mb-2.5">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed mb-6">
                    {pillar.tagline}
                  </p>

                  {/* Capability Bullets */}
                  <div className="space-y-2.5 pt-4 border-t border-black/5 dark:border-white/10 mb-6 sm:mb-8">
                    {pillar.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs font-medium text-dark/90 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-lime shrink-0 mt-0.5" />
                        <span className="leading-snug">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTAs */}
                <div className="pt-4 border-t border-black/5 dark:border-white/10 flex flex-col gap-2.5">
                  <a
                    href={`/service-inquiry?category=${pillar.id}`}
                    onClick={(e) => handleInquiryAnchor(e, pillar.id)}
                    className="btn-primary group relative w-full h-11 flex items-center justify-center px-4 rounded-xl text-xs tracking-wider uppercase font-semibold border-2 border-transparent transition-all duration-300 shadow-sm"
                  >
                    <span className="truncate text-center">{pillar.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href={showDeepDive ? "#service-deep-dive" : "/services"}
                    onClick={(e) => handleCardDeepDiveAnchor(e, pillar.id)}
                    className="btn-outline group relative w-full h-11 flex items-center justify-center px-4 rounded-xl text-xs tracking-wider uppercase font-semibold border transition-all duration-300"
                  >
                    <span className="truncate text-center">
                      {showDeepDive ? (isSelected ? 'Viewing Full Scope' : 'View Scope & Deliverables') : 'View Scope & Deliverables'}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                  </a>
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
              <a
                href="/services"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    onNavigate?.('services');
                  }
                }}
                className="btn-primary text-xs font-bold uppercase tracking-wider px-5 py-2.5 inline-flex items-center gap-2 shadow-sm"
              >
                <span>Full Services Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="/pricing"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    onNavigate?.('pricing');
                  }
                }}
                className="btn-outline text-xs font-mono font-bold uppercase tracking-wider px-4 py-2.5 inline-flex items-center gap-1.5"
              >
                <span>Pricing Guide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Deep Dive Section */}
        {showDeepDive && (
          <div id="service-deep-dive" className="pt-8 border-t border-black/10 dark:border-white/10">
            {/* Pillar Selector Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 sm:mb-10">
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
                    className={`px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 ${
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
            <div className="rounded-3xl border border-black/10 dark:border-slate-800 bg-white/90 dark:bg-[#111827] p-6 sm:p-8 lg:p-12 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                
                {/* Left Column (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-400/30 text-cyan-700 dark:text-cyan-400 font-mono text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-lime" />
                    <span>Pillar {activePillar.number} Detailed Overview</span>
                  </div>

                  <h4 className="font-display font-bold text-2xl sm:text-3xl text-dark dark:text-white">
                    {activePillar.title}
                  </h4>

                  <p className="text-sm md:text-base text-gray-700 dark:text-slate-300 leading-relaxed">
                    {activePillar.scope}
                  </p>

                  {/* Target Profile Card */}
                  <div className="p-4 rounded-xl bg-black/[0.03] dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-1.5">
                    <span className="font-mono text-xs uppercase tracking-wider text-dark/70 dark:text-slate-400 font-semibold block">
                      Target Profile / Ideal For:
                    </span>
                    <p className="text-xs sm:text-sm text-dark dark:text-slate-200 leading-relaxed">
                      {activePillar.idealFor}
                    </p>
                  </div>

                  {/* Accountability Standard Card */}
                  <div className="p-4 rounded-xl bg-emerald-500/5 dark:bg-[#B8FF3D]/5 border border-emerald-500/20 dark:border-[#B8FF3D]/20 space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-[#B8FF3D] font-mono text-xs uppercase tracking-wider font-semibold">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>{activePillar.accountabilityTitle}</span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-slate-300 leading-relaxed">
                      {activePillar.accountabilityNote}
                    </p>
                  </div>

                  {/* Tooling / Tech Stack */}
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold block mb-2.5">
                      Core Technologies &amp; Tooling
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activePillar.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-dark/80 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={`/service-inquiry?category=${activePillar.id}`}
                      onClick={(e) => handleInquiryAnchor(e, activePillar.id)}
                      className="btn-primary w-full justify-center py-3.5 text-xs font-bold uppercase tracking-wider inline-flex items-center shadow-md"
                    >
                      <span>Discuss Your {activePillar.title.split('&')[0].trim()} Project</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>

                {/* Right Column (7 cols) */}
                <div className="lg:col-span-7 space-y-8 lg:pl-8 lg:border-l lg:border-black/10 lg:dark:border-white/10">
                  
                  {/* Distinct Scope Areas (2x2 Grid) */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Compass className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                      <h5 className="font-display font-bold text-base sm:text-lg text-dark dark:text-white uppercase tracking-tight">
                        Scope Breakdown &amp; Modular Areas
                      </h5>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activePillar.scopeAreas.map((area, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-black/20"
                        >
                          <h6 className="font-display font-bold text-xs sm:text-sm text-dark dark:text-white mb-1">
                            {area.title}
                          </h6>
                          <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">
                            {area.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables Checklist */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Layers className="w-4 h-4 text-emerald-600 dark:text-lime" />
                      <h5 className="font-display font-bold text-base sm:text-lg text-dark dark:text-white uppercase tracking-tight">
                        Concrete Deliverables
                      </h5>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activePillar.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20 flex items-start gap-2.5"
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
                      <h5 className="font-display font-bold text-base sm:text-lg text-dark dark:text-white uppercase tracking-tight">
                        3-Step Execution Framework
                      </h5>
                    </div>
                    <div className="space-y-2.5">
                      {activePillar.process.map((step) => (
                        <div
                          key={step.step}
                          className="p-3.5 rounded-xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20 flex items-start gap-3.5"
                        >
                          <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5">
                            {step.step}
                          </span>
                          <div>
                            <h6 className="font-display font-bold text-xs sm:text-sm text-dark dark:text-white mb-0.5">
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
        <div className="mt-14 sm:mt-16 rounded-2xl border border-lime/30 bg-gradient-to-r from-lime/10 via-cyan-500/10 to-transparent p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 font-semibold block mb-2">
              Cross-Disciplinary Engagements
            </span>
            <h4 className="font-display font-bold text-xl sm:text-2xl text-dark dark:text-white mb-2">
              Need an integrated stack combining Sites, Apps &amp; Growth?
            </h4>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
              Most ambitious partners combine multiple services—for example, launching a custom web platform paired with targeted local search visibility or an accompanying mobile app. We structure engagements with unified communication and clear milestones.
            </p>
          </div>
          <a
            href="/service-inquiry"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                handleInquiryClick('web-development');
              }
            }}
            className="btn-primary shrink-0 px-7 py-3 text-xs uppercase tracking-wider font-bold inline-flex items-center shadow-md"
          >
            <span>Request Project Consultation</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>

      </div>
    </section>
  );
}
