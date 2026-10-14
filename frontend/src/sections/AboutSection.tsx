import { useScrollReveal } from '../hooks/useScrollReveal';
import { useContent } from '../hooks/useContent';
import { 
  Code2, 
  Zap, 
  TrendingUp, 
  UsersRound, 
  Award, 
  Sparkles, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const studioImage = '/studio_engineering_lab.jpg';

export default function AboutSection() {
  const { content } = useContent();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.15 });

  const studioPrinciples = [
    {
      icon: Code2,
      title: 'Engineering Rigor',
      description: 'Clean TypeScript architectures, accessible semantics, and 99+ Core Web Vitals built to scale.'
    },
    {
      icon: Zap,
      title: 'Predictable Velocity',
      description: 'Sprint-based execution with weekly staging demos. You always know what is being shipped and when.'
    },
    {
      icon: TrendingUp,
      title: 'Full-Funnel Ownership',
      description: 'Connecting technical engineering directly to conversion and revenue. Code that actually grows business.'
    },
    {
      icon: UsersRound,
      title: 'Direct Partnership',
      description: 'No account managers or bureaucracy in the middle. Direct collaboration with the senior team building your product.'
    }
  ];

  const studioCredentials = [
    'Smart India Hackathon 2023 National Champions (Healthcare Innovation)',
    'Cybercubs National Cybersecurity Champions (Application Security)',
    'Amity Innovation Cell Incubated Technology Developers',
    'Full-stack expertise across React, Next.js, React Native & Growth Infrastructure'
  ];

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="bg-[#F6F6F2] dark:bg-[#050608] x-pattern relative overflow-hidden py-20 lg:py-28 text-dark dark:text-white transition-colors duration-300"
    >
      {/* Decorative Geometry from design.md */}
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
            <span>{content.about.eyebrow}</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-dark dark:text-white mb-6 leading-[1.1]">
            {content.about.headline}
          </h2>

          <p className="text-base sm:text-lg text-gray-700 dark:text-slate-300 leading-relaxed mb-6">
            {content.about.body}
          </p>

          <div className="inline-block px-4 py-2 rounded-xl bg-lime/15 border border-lime/30 text-dark dark:text-lime font-mono text-xs uppercase tracking-wider font-semibold">
            {content.about.statement}
          </div>
        </div>

        {/* 2-Column Studio Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Left Column: Team Photo Showcase */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border-2 border-cyan-400/50 dark:border-cyan-400/40 bg-white/70 dark:bg-[#111827] shadow-2xl overflow-hidden relative group">
              <div className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] w-full overflow-hidden bg-black/20 relative">
                <img
                  src={studioImage}
                  alt="Xelox Engineering & Design Craft Lab"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Caption Bar */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-lime" />
                    <span className="font-display font-bold text-sm text-white">
                      Xelox Engineering &amp; Craft Lab
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-white/80">
                    Architecture, Design Systems &amp; High-Velocity Code
                  </p>
                </div>
              </div>
            </div>

            {/* Studio Info Card */}
            <div className="p-6 rounded-2xl border border-black/10 dark:border-slate-800 bg-white/80 dark:bg-[#111827] space-y-4">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                <Award className="w-5 h-5 text-lime" />
                <h4 className="font-display font-bold text-sm uppercase tracking-wider">
                  Verified Studio Credentials
                </h4>
              </div>

              <div className="space-y-2">
                {studioCredentials.map((cred, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-dark/85 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-lime shrink-0 mt-0.5" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] text-gray-500 dark:text-slate-400">
                <span className="font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold">Leadership</span>
                <span>Direct founder &amp; senior engineer partnership on every client project</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Core Principles of Craft */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 font-semibold block mb-2">
                HOW WE OPERATE
              </span>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-dark dark:text-white mb-4">
                Principles of Senior Studio Craft
              </h3>
              <p className="text-sm md:text-base text-gray-700 dark:text-slate-300 leading-relaxed">
                Traditional digital agencies hide behind account managers, junior handoffs, and bloated timelines. We built Xelox Solutions to operate as an elite engineering team directly embedded into your strategic goals.
              </p>
            </div>

            {/* Principles Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {studioPrinciples.map((principle) => {
                const Icon = principle.icon;

                return (
                  <div
                    key={principle.title}
                    className="p-6 rounded-2xl border border-black/10 dark:border-slate-800 bg-white/80 dark:bg-[#111827] hover:border-cyan-400/50 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-[0_16px_36px_rgba(0,0,0,0.25)] flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-lime/15 border border-lime/30 text-dark dark:text-lime flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5" />
                      </div>

                      <h4 className="font-display font-bold text-base text-dark dark:text-white mb-2">
                        {principle.title}
                      </h4>

                      <p className="text-xs md:text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Engagement Commitment Strip */}
            <div className="p-6 rounded-2xl border border-cyan-400/30 bg-cyan-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold block mb-1">
                  Ready to collaborate?
                </span>
                <p className="text-xs md:text-sm text-dark/90 dark:text-slate-200">
                  We take on a limited number of partner engagements each quarter to guarantee senior-level execution.
                </p>
              </div>
              <a
                href="#contact"
                className="btn-primary shrink-0 text-xs font-bold uppercase tracking-wider px-5 py-2.5 inline-flex items-center gap-2"
              >
                <span>Initiate Scoping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
