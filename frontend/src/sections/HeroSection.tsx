import { useContent } from '../hooks/useContent';
import { ArrowRight, TrendingUp, Code2, Smartphone } from 'lucide-react';
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
  const [textFloating, setTextFloating] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after a tiny delay
    const loadTimer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    // Make text start floating after 2.5 seconds
    const timer2 = setTimeout(() => {
      setTextFloating(true);
    }, 2500);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(timer2);
    };
  }, []);

  const scrollToWork = () => {
    // If parent provided a navigation handler, use it to go to the work page
    if (onNavigate) {
      onNavigate('work');
      return;
    }

    // Fallback: scroll to portfolio section on the current page
    const element = document.querySelector('#portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderHeadline = (headline: string) => {
    // Highlight key agency terms: "GROWTH SYSTEMS", "SITES, APPS", or "BRANDS"
    const pattern = /(growth systems|sites, apps|brands?)/i;
    const match = headline.match(pattern);

    if (!match || match.index === undefined) {
      return headline;
    }

    const start = match.index;
    const end = start + match[0].length;

    return (
      <>
        {headline.slice(0, start)}
        <span className="text-cyan-400">{headline.slice(start, end)}</span>
        {headline.slice(end)}
      </>
    );
  };

  return (
    <section className="bg-off-white dark:bg-[#050608] x-pattern relative overflow-hidden min-h-screen md:min-h-screen">
      {/* Enhanced animated gradient overlay that becomes more prominent when text floats */}
      <div className={`absolute inset-0 transition-all duration-1500 ${textFloating ? 'opacity-20' : 'opacity-10'}`}>
        <div
          className="absolute inset-0 transition-all ease-in-out"
          style={{
            transitionDuration: '10s',
            background: loaded
              ? textFloating
                ? 'radial-gradient(circle at 20% 30%, #B8FF3D33 0%, transparent 60%), radial-gradient(circle at 80% 70%, #B8FF3D22 0%, transparent 60%), radial-gradient(circle at 50% 50%, #00000022 0%, transparent 70%)'
                : 'radial-gradient(circle at 20% 30%, #B8FF3D22 0%, transparent 50%), radial-gradient(circle at 80% 70%, #B8FF3D11 0%, transparent 50%)'
              : 'none'
          }}
        />
      </div>

      {/* Floating particles that appear when text becomes floating */}
      {textFloating && (
        <>
          {/* Only show 2 particles on mobile, all 6 on larger screens */}
          <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-lime rounded-full" style={{ animation: 'floatSide 6s ease-in-out infinite, sparkle 3s ease-in-out infinite' }} />
          <div className="hidden md:block absolute top-[70%] right-[20%] w-1 h-1 bg-white rounded-full" style={{ animation: 'floatSide 4s ease-in-out infinite reverse, sparkle 2s ease-in-out infinite' }} />
          <div className="absolute top-[40%] right-[10%] w-1.5 h-1.5 bg-lime rounded-full" style={{ animation: 'floatSide 7s ease-in-out infinite, sparkle 2.5s ease-in-out infinite 0.5s' }} />
          <div className="hidden md:block absolute top-[60%] left-[25%] w-1 h-1 bg-white rounded-full" style={{ animation: 'floatSide 5s ease-in-out infinite reverse, sparkle 3.5s ease-in-out infinite 1s' }} />
          <div className="hidden md:block absolute top-[30%] left-[70%] w-1 h-1 bg-lime rounded-full" style={{ animation: 'floatSide 5.5s ease-in-out infinite, sparkle 2.8s ease-in-out infinite 1.5s' }} />
          <div className="hidden md:block absolute top-[80%] left-[40%] w-1.5 h-1.5 bg-white rounded-full" style={{ animation: 'floatSide 6.5s ease-in-out infinite reverse, sparkle 3.2s ease-in-out infinite 0.7s' }} />
        </>
      )}
      {/* Decorative Elements - In soft background */}
      <div
        className={`decor-circle w-12 h-12 md:w-20 md:h-20 lg:w-36 lg:h-36 absolute left-[75%] md:left-[48%] top-[8%] md:top-[14%] z-0 pointer-events-none transition-all duration-800 ${
          loaded ? 'opacity-30 scale-100 blur-0' : 'opacity-0 scale-0 blur-sm'
        } ${
          textFloating ? 'bg-gradient-to-br from-lime via-yellow-300 to-lime shadow-lime/50 shadow-2xl' : 'bg-lime/40'
        }`}
        style={{
          transitionDelay: '300ms',
          animation: loaded ? 'float 6s ease-in-out infinite' : 'none'
        }}
      />
      <div
        className={`decor-ring w-10 h-10 md:w-16 md:h-16 lg:w-32 lg:h-32 absolute left-[5%] md:left-[44%] top-[85%] md:top-[72%] z-0 pointer-events-none transition-all duration-800 ${
          loaded ? 'opacity-30 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'
        } ${
          textFloating ? 'border-white/40 shadow-white/30 shadow-lg' : 'border-dark/20 dark:border-white/20'
        }`}
        style={{
          transitionDelay: '400ms',
          animation: loaded ? 'spin-slow 20s linear infinite' : 'none'
        }}
      />

      {/* Hero Content Stage */}
      <div className="relative min-h-[calc(100vh-50px)] flex flex-col justify-between">
        <div className="flex-1 flex items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-16 relative z-10">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
            
            {/* Left Column: Headline, Subheadline, CTAs */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
              {/* Micro-label */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 mb-4 sm:mb-5 transition-all duration-600 ${
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
                className={`font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] leading-[1.08] tracking-tight mb-5 text-dark dark:text-white transition-all duration-800 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: '260ms' }}
              >
                {renderHeadline(
                  content.hero?.headline && !content.hero.headline.toLowerCase().includes('small brands')
                    ? content.hero.headline
                    : 'CRAFTING HIGH-PERFORMANCE SITES, APPS & GROWTH SYSTEMS'
                )}
              </h1>

              {/* Subheadline */}
              <p
                className={`text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8 max-w-xl transition-all duration-800 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: '340ms' }}
              >
                {content.hero?.subheadline && !content.hero.subheadline.toLowerCase().includes('identities, sites')
                  ? content.hero.subheadline
                  : 'We partner with ambitious founders and businesses to design, engineer, and scale custom web platforms, mobile apps, and high-ROI digital marketing campaigns.'}
              </p>

              {/* Dual CTAs */}
              <div
                className={`flex flex-wrap items-center gap-4 transition-all duration-700 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: '420ms' }}
              >
                <button
                  onClick={() => onNavigate ? onNavigate('service-inquiry') : scrollToWork()}
                  className="group btn-primary inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold shadow-lg shadow-lime/20 hover:shadow-lime/35 transition-all text-sm sm:text-base"
                >
                  <span>
                    {content.hero?.cta && content.hero.cta.toLowerCase() !== 'explore work'
                      ? content.hero.cta
                      : 'Start a project'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={scrollToWork}
                  className="btn-outline inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold transition-all hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <span>Explore work</span>
                </button>
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

            {/* Right Column: High-Craft Showcase Composition */}
            <div className="lg:col-span-6 xl:col-span-6 relative w-full pt-4 pb-8 sm:pb-12 flex justify-center lg:justify-end">
              
              {/* Soft Ambient Radial Light */}
              <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-tr from-[#19D5D0]/15 via-transparent to-[#B8FF3D]/15 rounded-full blur-3xl pointer-events-none" />

              {/* Showcase Stage Wrapper */}
              <div className="relative w-full max-w-lg lg:max-w-xl">
                
                {/* Primary Card: Web Platform & Growth Systems */}
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
                      alt="Xelox High-Performance Web Platform & Telemetry"
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

                {/* Performance Stat Metric Pill */}
                <div
                  className={`hidden sm:flex absolute -top-3 -right-3 z-20 items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 border border-[#19D5D0]/30 backdrop-blur-md shadow-xl transition-all duration-800 ${
                    loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                  }`}
                  style={{ transitionDelay: '500ms' }}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-lime" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white">
                    +142% Avg. Conversion
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Slim "What We Deliver" Capabilities Strip */}
      <div className="w-full border-t border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur-md py-3.5 px-6 lg:px-16 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <span className="font-mono uppercase tracking-[0.15em] text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-lime animate-pulse" />
            Core Capabilities
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 font-mono uppercase tracking-wider text-dark/85 dark:text-slate-300">
              <TrendingUp className="w-3.5 h-3.5 text-lime" />
              <span>Digital Marketing &amp; Growth</span>
            </div>
            <span className="hidden sm:inline text-black/20 dark:text-white/20">•</span>
            <div className="flex items-center gap-2 font-mono uppercase tracking-wider text-dark/85 dark:text-slate-300">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Website Design &amp; Development</span>
            </div>
            <span className="hidden sm:inline text-black/20 dark:text-white/20">•</span>
            <div className="flex items-center gap-2 font-mono uppercase tracking-wider text-dark/85 dark:text-slate-300">
              <Smartphone className="w-3.5 h-3.5 text-lime" />
              <span>Mobile App Development</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
