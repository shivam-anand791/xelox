import { useScrollReveal } from '../hooks/useScrollReveal';
import { useContent } from '../hooks/useContent';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const projectDescriptions: Record<string, string> = {
  'LaptopMitra': 'Certified pre-owned and enterprise refurbished laptop marketplace engineered with 32-point inspection flows and instant quoting.',
  'Adorca 360': 'Data-driven performance acquisition, technical SEO entity clustering & global search signals across 50+ international markets.',
  'Tourist Palace': 'Clean hotel reservation portal near Delhi Airport & Aerocity featuring instant WhatsApp booking and transit traveler guides.',
  'eSailor': 'International B2B manufacturing and export platform for sustainable jute products with verified trade accreditations.',
  'Properties Professor': 'Verified real estate discovery and luxury property marketplace with multi-city search and transparent pricing.',
};

const projectAlts: Record<string, string> = {
  'LaptopMitra': 'LaptopMitra certified refurbished laptop marketplace homepage with 32-point inspection guarantees',
  'Adorca 360': 'Adorca 360 performance marketing studio platform showcasing multi-region signal architecture',
  'Tourist Palace': 'Tourist Palace hotel and direct WhatsApp room reservation portal homepage',
  'eSailor': 'eSailor global B2B jute manufacturing and trade export platform',
  'Properties Professor': 'Properties Professor verified luxury real estate discovery engine homepage',
};

export default function PortfolioSection({ onNavigate }: { onNavigate?: (page: string, category?: string) => void }) {
  const { content } = useContent();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.05 });
  const projects = content.portfolio.projects || [];

  return (
    <section 
      id="portfolio"
      ref={sectionRef}
      className="bg-off-white dark:bg-[#050608] relative overflow-hidden py-16 md:py-24"
    >
      {/* Anchor targets for both #work and #portfolio */}
      <div id="work" className="sr-only" aria-hidden="true" />
      <div id="projects" className="sr-only" aria-hidden="true" />

      {/* Decorative Background Elements (z-0 and pointer-events-none so they never clip or intercept cards) */}
      <div 
        className={`decor-ring border-dark/15 dark:border-white/10 w-28 h-28 absolute left-[42%] top-[6%] z-0 pointer-events-none transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '300ms' }}
      />
      <div 
        className={`absolute right-[4%] top-[42%] z-0 pointer-events-none transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <path d="M16 0V32M0 16H32" stroke="#111111" className="dark:stroke-[#F8FAFC]" strokeWidth="3" opacity="0.3"/>
        </svg>
      </div>
      <div
        className={`absolute hidden md:block rounded-full pointer-events-none z-0 transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ right: '6%', top: '42%', width: '56px', height: '56px', backgroundColor: 'rgba(184,255,61,0.22)', transitionDelay: '450ms' }}
      />

      {/* Mobile Layout */}
      <div className="md:hidden px-6 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-lime font-bold mb-2 block">
            03 / PRODUCTION PORTFOLIO
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl leading-[0.95] tracking-tight text-dark dark:text-[#F8FAFC] uppercase mb-3">
            {content.portfolio.headline}
          </h2>
          <p className="text-sm text-gray-custom dark:text-slate-300 leading-relaxed mb-6">
            {content.portfolio.body}
          </p>
          <button
            onClick={() => onNavigate ? onNavigate('work') : null}
            className="btn-primary inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5 py-2.5 shadow-md"
          >
            <span>Explore All Work</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Mobile Project Cards */}
        <div className="space-y-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`rounded-2xl overflow-hidden bg-white dark:bg-[#111827] border border-black/10 dark:border-white/10 shadow-lg group cursor-pointer transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${150 + i * 80}ms` }}
              onClick={() => onNavigate ? onNavigate('work') : null}
            >
              {/* Image Container with 16:10 ratio & genuine screenshot */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 border-b border-black/5 dark:border-white/10">
                <img
                  src={project.image}
                  alt={projectAlts[project.title] || `${project.title} project showcase`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 block"
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-lime text-dark text-xs font-mono font-medium px-2.5 py-1 rounded-full shadow-sm">
                    {project.subtitle}
                  </span>
                </div>
              </div>

              {/* High-contrast Card Content */}
              <div className="p-5">
                <h3 className="font-display font-bold text-xl text-dark dark:text-white mb-2 group-hover:text-lime transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight size={18} className="text-gray-400 group-hover:text-lime group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-xs sm:text-sm text-gray-custom dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
                  {projectDescriptions[project.title] || 'Engineered with modern architecture and high-conversion design.'}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/10 text-xs font-mono">
                  <span className="text-emerald-700 dark:text-lime font-medium">Verified Live Site</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-dark dark:text-white group-hover:text-lime transition-colors">
                    View Case <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Showcase Layout */}
      <div className={`hidden md:block max-w-7xl mx-auto px-6 lg:px-12 relative z-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        {/* 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Top-left: Card 0 (LaptopMitra) */}
          <div
            className="overflow-hidden rounded-2xl shadow-xl bg-[#0B0F14] border border-black/10 dark:border-white/10 group cursor-pointer hover:border-lime/40 dark:hover:border-lime/40 transition-all duration-300 card-hover flex flex-col justify-between"
            onClick={() => onNavigate ? onNavigate('work-category', 'web-development') : null}
          >
            <div className="w-full h-full md:flex md:items-stretch">
              <div className="order-last md:order-first md:w-2/5 p-6 lg:p-8 flex flex-col justify-between bg-gradient-to-r from-[#07090D] via-[#0B0F14] to-[#0F141C] text-white">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold text-lime">
                    {projects[0]?.subtitle || 'Website Design & Development'}
                  </span>
                  <h3 className="mt-2 text-2xl lg:text-3xl font-extrabold text-white group-hover:text-lime transition-colors leading-tight">
                    {projects[0]?.title || 'LaptopMitra'}
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    {projectDescriptions[projects[0]?.title] || 'Certified pre-owned and enterprise refurbished laptop marketplace.'}
                  </p>
                </div>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 bg-white/10 group-hover:bg-lime text-white group-hover:text-dark px-4 py-2 rounded-lg border border-white/15 group-hover:border-lime shadow-sm text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300">
                    <span>View Project Case</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>

              <div className="order-first md:order-last md:w-3/5 min-h-[260px] md:min-h-full overflow-hidden relative bg-slate-900">
                <img
                  src={projects[0]?.image || '/portfolio/laptopmitra-homepage.webp'}
                  alt={projectAlts[projects[0]?.title] || 'LaptopMitra live project'}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 block"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Top-right: Headline & Actions Block */}
          <div className="flex flex-col justify-center p-6 lg:p-10 rounded-2xl bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/5 backdrop-blur-sm">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-lime font-bold mb-3">
              03 / PRODUCTION PORTFOLIO
            </span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl xl:text-6xl leading-[0.95] tracking-tight text-dark dark:text-[#F8FAFC] uppercase mb-4">
              {content.portfolio.headline}
            </h2>
            <p className="text-base lg:text-lg text-gray-custom dark:text-slate-300 mb-8 max-w-md leading-relaxed">
              {content.portfolio.body}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate ? onNavigate('work') : null}
                className="btn-primary inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-6 py-3 shadow-md"
              >
                <span>Explore All Work</span>
                <ArrowUpRight size={16} />
              </button>
              <button
                onClick={() => onNavigate ? onNavigate('work-category', 'web-development') : null}
                className="text-xs font-mono uppercase tracking-wider text-dark dark:text-slate-300 hover:text-lime transition-colors inline-flex items-center gap-1.5"
              >
                <span>Web Platforms</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Bottom-left: Card 1 (Adorca 360) */}
          <div
            className="overflow-hidden rounded-2xl shadow-xl bg-[#0B0F14] border border-black/10 dark:border-white/10 group cursor-pointer hover:border-lime/40 dark:hover:border-lime/40 transition-all duration-300 card-hover flex flex-col justify-between"
            onClick={() => onNavigate ? onNavigate('work-category', 'digital-marketing') : null}
          >
            <div className="w-full h-full md:flex md:items-stretch">
              <div className="order-last md:order-first md:w-2/5 p-6 lg:p-8 flex flex-col justify-between bg-gradient-to-r from-[#07090D] via-[#0B0F14] to-[#0F141C] text-white">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold text-lime">
                    {projects[1]?.subtitle || 'Digital Marketing & Growth'}
                  </span>
                  <h3 className="mt-2 text-2xl lg:text-3xl font-extrabold text-white group-hover:text-lime transition-colors leading-tight">
                    {projects[1]?.title || 'Adorca 360'}
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    {projectDescriptions[projects[1]?.title] || 'Data-driven performance acquisition & global search signals.'}
                  </p>
                </div>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 bg-white/10 group-hover:bg-lime text-white group-hover:text-dark px-4 py-2 rounded-lg border border-white/15 group-hover:border-lime shadow-sm text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300">
                    <span>View Project Case</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>

              <div className="order-first md:order-last md:w-3/5 min-h-[260px] md:min-h-full overflow-hidden relative bg-slate-900">
                <img
                  src={projects[1]?.image || '/portfolio/adorca-homepage.webp'}
                  alt={projectAlts[projects[1]?.title] || 'Adorca 360 live project'}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 block"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Bottom-right: Card 2 (Tourist Palace) */}
          <div
            className="overflow-hidden rounded-2xl shadow-xl bg-[#0B0F14] border border-black/10 dark:border-white/10 group cursor-pointer hover:border-lime/40 dark:hover:border-lime/40 transition-all duration-300 card-hover flex flex-col justify-between"
            onClick={() => onNavigate ? onNavigate('work-category', 'web-development') : null}
          >
            <div className="w-full h-full md:flex md:items-stretch">
              <div className="order-last md:order-first md:w-2/5 p-6 lg:p-8 flex flex-col justify-between bg-gradient-to-r from-[#07090D] via-[#0B0F14] to-[#0F141C] text-white">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold text-cyan-400">
                    {projects[2]?.subtitle || 'Hospitality & Booking Engine'}
                  </span>
                  <h3 className="mt-2 text-2xl lg:text-3xl font-extrabold text-white group-hover:text-lime transition-colors leading-tight">
                    {projects[2]?.title || 'Tourist Palace'}
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    {projectDescriptions[projects[2]?.title] || 'Clean hotel reservation portal near Delhi Airport & Aerocity.'}
                  </p>
                </div>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 bg-white/10 group-hover:bg-lime text-white group-hover:text-dark px-4 py-2 rounded-lg border border-white/15 group-hover:border-lime shadow-sm text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300">
                    <span>View Project Case</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>

              <div className="order-first md:order-last md:w-3/5 min-h-[260px] md:min-h-full overflow-hidden relative bg-slate-900">
                <img
                  src={projects[2]?.image || '/portfolio/touristpalace-homepage.webp'}
                  alt={projectAlts[projects[2]?.title] || 'Tourist Palace live project'}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 block"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Flagship Projects (eSailor & Properties Professor) Strip */}
        {projects.length > 3 && (
          <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono uppercase text-gray-500 dark:text-slate-400">Also Shipping:</span>
              <div className="flex flex-wrap gap-2">
                {projects.slice(3).map((p) => (
                  <button
                    key={p.title}
                    onClick={() => onNavigate ? onNavigate('work') : null}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-dark dark:text-slate-200 hover:border-lime hover:text-lime transition-all"
                  >
                    <span>{p.title}</span>
                    <ArrowUpRight size={12} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => onNavigate ? onNavigate('work') : null}
              className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-lime hover:underline inline-flex items-center gap-1"
            >
              <span>View All 5 Case Studies</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
