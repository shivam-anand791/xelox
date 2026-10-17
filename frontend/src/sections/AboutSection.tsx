import { useScrollReveal } from '../hooks/useScrollReveal';
import { 
  Code2, 
  Zap, 
  TrendingUp, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const studioImage = '/studio_engineering_lab.jpg';

interface AboutSectionProps {
  onNavigate?: (page: string) => void;
}

export default function AboutSection({ onNavigate }: AboutSectionProps) {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const differentiators = [
    {
      icon: Code2,
      title: 'Senior Engineering Rigor',
      description: 'Clean TypeScript architectures, sub-second Core Web Vitals, and strict accessibility. No sloppy templates or junior handoffs.'
    },
    {
      icon: Zap,
      title: 'Predictable Sprint Velocity',
      description: 'Bi-weekly milestones, weekly staging demos, and live git visibility. You always know what is being built and when it deploys.'
    },
    {
      icon: TrendingUp,
      title: 'Full-Funnel Ownership',
      description: 'Bridging engineering directly to revenue and customer conversion. Code engineered to drive real, verifiable business growth.'
    },
    {
      icon: ShieldCheck,
      title: 'Zero Lock-In & Total Ownership',
      description: 'You retain 100% ownership of all source code repositories, domains, design tokens, and cloud configurations from day one.'
    }
  ];

  const verifiedCredentials = [
    'Smart India Hackathon 2023 National Champions (Healthcare Innovation)',
    'Cybercubs National Cybersecurity Champions (Application Security)',
    'PSB Hackathon Winner & GFF 2026 Mumbai FinTech Showcase',
    'Amity Innovation Cell Incubated Technology Developers'
  ];

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="bg-[#F6F6F2] dark:bg-[#050608] x-pattern relative overflow-hidden py-20 lg:py-28 text-dark dark:text-white transition-colors duration-300 border-t border-black/5 dark:border-white/5"
    >
      {/* Anchor targets for both #about and #why-xelox */}
      <div id="why-xelox" className="sr-only" aria-hidden="true" />

      {/* Decorative Geometry */}
      <div 
        className={`decor-circle bg-lime w-40 h-40 lg:w-64 lg:h-64 absolute -left-16 top-24 z-0 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-0 blur-sm'
        }`}
        style={{ transitionDelay: '300ms' }}
      />
      <div 
        className={`decor-ring border-dark dark:border-white/20 w-24 h-24 lg:w-36 lg:h-36 absolute right-8 bottom-12 z-0 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'
        }`}
        style={{ transitionDelay: '500ms' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span>WHY XELOX — EVIDENCE-BASED DIFFERENTIATORS</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-dark dark:text-white mb-6 leading-[1.1]">
            SENIOR CRAFT. VERIFIED RIGOR. ZERO AGENCY BLOAT.
          </h2>

          <p className="text-base sm:text-lg text-gray-700 dark:text-slate-300 leading-relaxed mb-6">
            Traditional digital agencies hide behind account managers, junior handoffs, and bloated timelines. We built Xelox Solutions to operate as an elite engineering team directly embedded into your strategic goals.
          </p>

          <div className="inline-block px-4 py-2 rounded-xl bg-lime/15 border border-lime/30 text-dark dark:text-lime font-mono text-xs uppercase tracking-wider font-semibold">
            Direct Founder &amp; Senior Builder Partnership on Every Client Project
          </div>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          
          {/* Left Column: Studio Photo Showcase & Verified Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border-2 border-cyan-400/50 dark:border-cyan-400/40 bg-white/70 dark:bg-[#111827] shadow-xl overflow-hidden relative group">
              <div className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] w-full overflow-hidden bg-black/20 relative">
                <img
                  src={studioImage}
                  alt="Xelox Engineering & Design Craft Lab"
                  className="w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Caption Bar */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-lime" />
                    <span className="font-display font-bold text-sm text-white">
                      Xelox Engineering &amp; Craft Lab
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-white/80">
                    TypeScript • Edge Runtimes • Verified National Hackathon Champions
                  </p>
                </div>
              </div>
            </div>

            {/* Studio Info Card with link to Team page */}
            <div className="p-6 rounded-2xl border border-black/10 dark:border-slate-800 bg-white/80 dark:bg-[#111827] space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                <Award className="w-5 h-5 text-emerald-600 dark:text-lime" />
                <h4 className="font-display font-bold text-sm uppercase tracking-wider">
                  Verified Engineering Accreditations
                </h4>
              </div>

              <div className="space-y-2">
                {verifiedCredentials.map((cred, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-dark/85 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-lime shrink-0 mt-0.5" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>

              {onNavigate && (
                <button
                  onClick={() => onNavigate('team')}
                  className="w-full mt-2 py-2.5 px-3 rounded-xl bg-lime/15 hover:bg-lime/25 border border-lime/30 text-dark dark:text-lime font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>Explore Full Team &amp; National Honors</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: 4 Differentiator Cards Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {differentiators.map(diff => {
                const Icon = diff.icon;

                return (
                  <div
                    key={diff.title}
                    className="p-6 rounded-2xl border border-black/10 dark:border-slate-800 bg-white/85 dark:bg-[#111827] hover:border-cyan-400/50 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-lime/15 border border-lime/30 text-dark dark:text-lime flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5" />
                      </div>

                      <h4 className="font-display font-bold text-base text-dark dark:text-white mb-2">
                        {diff.title}
                      </h4>

                      <p className="text-xs md:text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
                        {diff.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Transparent Pricing Teaser Banner */}
            <div className="p-6 rounded-2xl border border-cyan-400/30 bg-cyan-500/5 dark:bg-cyan-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold block mb-1">
                  Predictable Scoping
                </span>
                <p className="text-xs md:text-sm text-dark/90 dark:text-slate-200">
                  Fixed-scope packages starting from ₹5,000 for local businesses to ₹35,000+ for custom web and mobile platforms.
                </p>
              </div>
              <button
                onClick={() => onNavigate ? onNavigate('pricing') : null}
                className="btn-outline shrink-0 text-xs font-mono font-bold uppercase tracking-wider px-4 py-2.5 inline-flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5"
              >
                <span>View Pricing Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
