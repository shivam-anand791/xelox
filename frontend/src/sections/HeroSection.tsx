import { useContent } from '../hooks/useContent';
import { ArrowRight, TrendingUp, Code2, Smartphone, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const heroImages = {
  primary: '/hero_mobile_mockup.jpg',
  secondary: '/hero_web_platform.jpg',
} as const;

type HeroSectionProps = {
  onNavigate?: (page: string) => void;
};

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const { content } = useContent();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animations cleanly after initial mount
    const loadTimer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => {
      clearTimeout(loadTimer);
    };
  }, []);

  const scrollToContact = () => {
    if (onNavigate) {
      onNavigate('service-inquiry');
      return;
    }
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = () => {
    if (onNavigate) {
      onNavigate('work');
      return;
    }
    const element = document.querySelector('#portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToServices = () => {
    if (onNavigate) {
      onNavigate('services');
      return;
    }
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderHeadline = (headline: string) => {
    // Highlight key agency terms: "GROWTH ENGINES", "GROWTH SYSTEMS", "SITES, APPS", or "BRANDS"
    const pattern = /(growth engines|growth systems|sites, apps|ambitious brands|brands?)/i;
    const match = headline.match(pattern);

    if (!match || match.index === undefined) {
      return headline;
    }

    const start = match.index;
    const end = start + match[0].length;

    return (
      <>
        {headline.slice(0, start)}
        <span className="text-[#19D5D0] dark:text-[#19D5D0]">{headline.slice(start, end)}</span>
        {headline.slice(end)}
      </>
    );
  };

  return (
    <section className="bg-off-white dark:bg-[#050608] x-pattern relative overflow-hidden min-h-screen flex flex-col justify-between">
      {/* Subtle ambient lighting - clean and restrained */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            background: loaded
              ? 'radial-gradient(circle at 25% 25%, #19D5D018 0%, transparent 50%), radial-gradient(circle at 80% 65%, #B8FF3D18 0%, transparent 50%)'
              : 'none'
          }}
        />
      </div>

      {/* Hero Content Stage */}
      <div className="relative flex-1 flex items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-16 relative z-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Column: Headline, Subheadline, CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
            {/* Micro-label */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 mb-4 sm:mb-5 transition-all duration-600 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: '180ms' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#19D5D0] animate-pulse" />
              <span className="font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase text-cyan-600 dark:text-cyan-400 font-semibold">
                {content.hero?.microLabel || 'XELOXSOLUTIONS — 2026'}
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className={`font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] leading-[1.08] tracking-tight mb-5 text-dark dark:text-white transition-all duration-800 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '260ms' }}
            >
              {renderHeadline(
                content.hero?.headline && !content.hero.headline.toLowerCase().includes('small brands')
                  ? content.hero.headline
                  : 'DIGITAL PRODUCTS & GROWTH ENGINES BUILT TO SCALE AMBITIOUS BRANDS'
              )}
            </h1>

            {/* Subheadline communicating What Xelox does, business problems solved, and who it helps */}
            <p
              className={`text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8 max-w-xl transition-all duration-800 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '340ms' }}
            >
              {content.hero?.subheadline && !content.hero.subheadline.toLowerCase().includes('identities, sites')
                ? content.hero.subheadline
                : 'We engineer custom web platforms, native mobile applications, and data-driven growth systems for ambitious brands and growing businesses—eliminating fragmented agency silos to ship faster and scale predictably.'}
            </p>

            {/* Dual CTAs: Primary & Secondary with working destinations */}
            <div
              className={`flex flex-wrap items-center gap-3.5 sm:gap-4 transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '420ms' }}
            >
              <a
                href="/service-inquiry"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    scrollToContact();
                  }
                }}
                className="group btn-primary inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold shadow-lg shadow-lime/20 hover:shadow-lime/35 transition-all text-sm sm:text-base"
              >
                <span>
                  {content.hero?.cta && content.hero.cta.toLowerCase() !== 'explore work' && content.hero.cta.toLowerCase() !== 'start a project'
                    ? content.hero.cta
                    : 'Discuss Your Project'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/work"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    scrollToWork();
                  }
                }}
                className="btn-outline inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold transition-all hover:bg-black/5 dark:hover:bg-white/5"
              >
                <span>Explore Our Work</span>
              </a>
            </div>

            {/* Scroll Indicator */}
            <div
              className={`mt-10 sm:mt-12 flex items-center gap-2.5 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-dark dark:hover:text-white transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '500ms' }}
              onClick={scrollToWork}
            >
              <div className="w-5 h-8 border-2 border-dark/60 dark:border-gray-400 rounded-full flex justify-center pt-1.5">
                <div className="w-1 h-2 bg-dark dark:bg-gray-300 rounded-full animate-bounce" />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider">Scroll down</span>
            </div>
          </div>

          {/* Right Column: High-Craft Showcase Composition covering Web, Mobile & Growth */}
          <div className="lg:col-span-6 xl:col-span-6 relative w-full pt-4 pb-8 sm:pb-12 flex justify-center lg:justify-end">
            
            {/* Soft Ambient Radial Light */}
            <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-tr from-[#19D5D0]/15 via-transparent to-[#B8FF3D]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Showcase Stage Wrapper */}
            <div className="relative w-full max-w-lg lg:max-w-xl">
              
              {/* Primary Card: Web Platform & Enterprise Architecture */}
              <div
                className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-black/10 dark:border-white/15 bg-[#050608] shadow-[0_20px_50px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_50px_rgba(25,213,208,0.12)] transition-all duration-800 group ${
                  loaded ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                {/* Browser Mockup Chrome */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-black/70 border-b border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-gray-300 tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#19D5D0] animate-pulse" />
                    <span>cloud.xelox.solutions</span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-800/40">
                    Live Production
                  </span>
                </div>

                {/* Dashboard Visual */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={heroImages.secondary}
                    alt="Xelox High-Performance Web Platform & Engineering"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Accent Companion Card: Mobile App Suite */}
              <div
                className={`absolute -bottom-6 -left-3 sm:-bottom-8 sm:-left-6 md:-bottom-10 md:-left-8 w-40 sm:w-52 md:w-56 lg:w-52 xl:w-60 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/20 dark:border-white/20 bg-[#050608] shadow-[0_20px_50px_rgba(0,0,0,0.55)] z-20 transition-all duration-800 hover:-translate-y-1 hover:shadow-cyan-500/20 group/mobile ${
                  loaded ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10'
                }`}
                style={{ transitionDelay: '420ms' }}
              >
                <div className="relative aspect-square overflow-hidden bg-black">
                  <img
                    src={heroImages.primary}
                    alt="Xelox Mobile Application Development"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/mobile:scale-105"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Badge */}
                  <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-3 sm:inset-x-3 text-center z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full font-mono text-[9px] sm:text-[10px] tracking-wider uppercase bg-black/90 text-[#B8FF3D] border border-[#B8FF3D]/40 backdrop-blur-md shadow-xl">
                      <Smartphone className="w-3 h-3 text-[#B8FF3D]" />
                      <span>Mobile Apps</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Engineering Standard Benchmark Pill (Top Right) */}
              <div
                className={`hidden sm:flex absolute -top-3 -right-3 z-20 items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 border border-[#19D5D0]/30 backdrop-blur-md shadow-xl transition-all duration-800 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-white">
                  Sub-Second TTFB • 99+ Vitals
                </span>
              </div>

              {/* Growth Systems Benchmark Pill (Bottom Right) */}
              <div
                className={`hidden sm:flex absolute -bottom-3 -right-3 z-20 items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 border border-[#B8FF3D]/30 backdrop-blur-md shadow-xl transition-all duration-800 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '550ms' }}
              >
                <TrendingUp className="w-3.5 h-3.5 text-[#B8FF3D]" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-white">
                  Data-Driven Acquisition • High Intent
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Interactive Service Discovery Strip */}
      <div className="w-full border-t border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-md py-3.5 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="font-mono uppercase tracking-[0.15em] text-cyan-600 dark:text-cyan-400 font-semibold">
              Core Capabilities
            </span>
            <span className="hidden lg:inline text-gray-500 dark:text-gray-400 font-mono text-[11px]">— Select to discover</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6">
            <a
              href="/services"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  navigateToServices();
                }
              }}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-transparent hover:border-[#B8FF3D]/40 hover:bg-[#B8FF3D]/10 transition-all text-dark/85 dark:text-slate-300 hover:text-dark dark:hover:text-[#B8FF3D] font-mono text-[11px] sm:text-xs uppercase tracking-wider"
              title="Discover Digital Marketing & Growth Services"
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#B8FF3D] shrink-0" />
              <span>Digital Marketing &amp; Growth</span>
              <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#B8FF3D]" />
            </a>

            <span className="hidden sm:inline text-black/20 dark:text-white/20">•</span>

            <a
              href="/services"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  navigateToServices();
                }
              }}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-transparent hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all text-dark/85 dark:text-slate-300 hover:text-dark dark:hover:text-cyan-400 font-mono text-[11px] sm:text-xs uppercase tracking-wider"
              title="Discover Website Design & Development Services"
            >
              <Code2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Website Design &amp; Development</span>
              <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-400" />
            </a>

            <span className="hidden sm:inline text-black/20 dark:text-white/20">•</span>

            <a
              href="/services"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  navigateToServices();
                }
              }}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-transparent hover:border-[#B8FF3D]/40 hover:bg-[#B8FF3D]/10 transition-all text-dark/85 dark:text-slate-300 hover:text-dark dark:hover:text-[#B8FF3D] font-mono text-[11px] sm:text-xs uppercase tracking-wider"
              title="Discover Mobile App Development Services"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#B8FF3D] shrink-0" />
              <span>Mobile App Development</span>
              <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#B8FF3D]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
