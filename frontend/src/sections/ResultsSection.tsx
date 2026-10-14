import { useScrollReveal } from '../hooks/useScrollReveal';
import { useContent } from '../hooks/useContent';
import { Gauge, ShieldCheck, Layers, Terminal, Sparkles } from 'lucide-react';

export default function ResultsSection() {
  const { content } = useContent();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.15 });

  // Verified Engineering Benchmarks
  const benchmarks = [
    {
      value: '99+',
      unit: '/100',
      label: 'Core Web Vitals Target',
      description: 'Sub-second LCP, zero layout shift (CLS < 0.05), and instant TTFB across mobile & desktop browsers.',
      tag: 'Performance Benchmark',
      icon: Gauge,
      accent: 'border-l-[#B8FF3D] text-[#B8FF3D]'
    },
    {
      value: '100%',
      unit: 'TypeScript',
      label: 'Strict Type-Safety & Rigor',
      description: 'End-to-end typed contracts, clean modular architecture, and automated CI/CD validation before shipping.',
      tag: 'Engineering Standard',
      icon: Terminal,
      accent: 'border-l-[#19D5D0] text-[#19D5D0]'
    },
    {
      value: '3',
      unit: 'Pillars',
      label: 'Specialized Capabilities',
      description: 'Digital Marketing & Growth, Website Design & Development, and Mobile App Development—zero middleman markup.',
      tag: 'Full-Stack Delivery',
      icon: Layers,
      accent: 'border-l-[#B8FF3D] text-[#B8FF3D]'
    }
  ];

  // Rule 0 Anti-Hallucination: Check if the testimonial is a verified custom quote or placeholder
  const rawAuthor = content.results?.testimonial?.author || '';
  const isDefaultOrPlaceholder = 
    !rawAuthor || 
    rawAuthor.toLowerCase().includes('lumen coffee') || 
    rawAuthor.toLowerCase().includes('ava r') ||
    rawAuthor.toLowerCase().includes('placeholder');

  return (
    <section 
      id="results"
      ref={sectionRef}
      className="bg-off-white dark:bg-[#050608] py-20 md:py-32 relative overflow-hidden border-y border-slate-200/60 dark:border-white/5"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#19D5D0]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#B8FF3D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="px-6 lg:px-12 relative z-10 max-w-7xl mx-auto">
        {/* Eyebrow and Header */}
        <div className="max-w-3xl mb-16">
          <div 
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19D5D0]/10 border border-[#19D5D0]/20 text-[#19D5D0] font-mono text-xs uppercase tracking-widest mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#19D5D0] animate-pulse" />
            DELIVERY STANDARDS & VERIFIED BENCHMARKS
          </div>

          <h2 
            className={`font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-dark dark:text-[#F8FAFC] mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            ENGINEERED FOR MEASURABLE IMPACT.
          </h2>
          <p 
            className={`text-base md:text-lg text-gray-custom dark:text-slate-300 transition-all duration-700 leading-relaxed max-w-2xl ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            We hold our work to rigorous production standards—zero vanity metrics, 100% transparent delivery, and verifiable outcomes across web, mobile, and growth channels.
          </p>
        </div>

        {/* Benchmark Cards Grid */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {benchmarks.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className={`bg-white dark:bg-[#0B0F17] rounded-2xl p-7 lg:p-8 border border-slate-200 dark:border-white/10 relative overflow-hidden transition-all duration-300 hover:border-slate-400 dark:hover:border-white/20 hover:-translate-y-1 shadow-sm dark:shadow-[0_12px_36px_rgba(0,0,0,0.35)]`}
              >
                {/* Accent border top bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${index === 1 ? 'from-[#19D5D0] to-cyan-500' : 'from-[#B8FF3D] to-lime-500'}`} />
                
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {item.tag}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-700 dark:text-slate-300">
                    <Icon size={18} />
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-display font-bold text-5xl lg:text-6xl text-dark dark:text-[#F8FAFC] tracking-tight">
                    {item.value}
                  </span>
                  <span className="font-mono text-sm text-slate-500 dark:text-[#19D5D0] font-semibold">
                    {item.unit}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-dark dark:text-white mb-2">
                  {item.label}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quality Guarantee / Transparency Manifesto */}
        <div 
          className={`bg-gradient-to-br from-white via-white to-slate-50 dark:from-[#0D121F] dark:via-[#0B0F17] dark:to-[#080B10] rounded-3xl p-8 sm:p-10 lg:p-12 relative border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '350ms' }}
        >
          {/* Subtle cyan glow accent */}
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#19D5D0] via-[#B8FF3D] to-transparent rounded-l-3xl" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#19D5D0]/10 border border-[#19D5D0]/20 flex items-center justify-center text-[#19D5D0]">
                <ShieldCheck size={22} />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#19D5D0] block">
                  TRANSPARENCY COMMITMENT
                </span>
                <span className="font-display font-bold text-base text-dark dark:text-white">
                  Direct Engineering Ownership
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-slate-400">
              <Sparkles size={13} className="text-[#B8FF3D]" />
              <span>Zero-Fiction Delivery Policy</span>
            </div>
          </div>

          <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl text-dark dark:text-[#F8FAFC] leading-snug tracking-tight mb-8">
            {isDefaultOrPlaceholder ? (
              <>
                "We don't inflate case numbers or fabricate testimonials. Every engagement is built directly by senior engineers and growth specialists with weekly transparent demos, git commits, and measurable conversion goals."
              </>
            ) : (
              `"${content.results?.testimonial?.quote}"`
            )}
          </blockquote>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-white/10 text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
            <div>
              <span className="text-dark dark:text-slate-200 font-bold">
                {isDefaultOrPlaceholder ? 'XELOX STUDIO MANIFESTO' : content.results?.testimonial?.author}
              </span>
              <span className="mx-2">•</span>
              <span>Verified Quality Assurance</span>
            </div>
            <div className="flex items-center gap-2 text-[#19D5D0]">
              <span className="w-2 h-2 rounded-full bg-[#19D5D0]" />
              <span>Full-Stack Accountability</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
