import { useScrollReveal } from '../hooks/useScrollReveal';
import { 
  Search, 
  Code2, 
  Rocket, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

interface ProcessStep {
  number: string;
  stage: string;
  title: string;
  timeframe: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  deliverables: string[];
}

const steps: ProcessStep[] = [
  {
    number: '01',
    stage: 'SCOPING & BLUEPRINT',
    title: 'Architecture & UX Wireframing',
    timeframe: 'Days 1–5',
    icon: Search,
    description: 'We audit your objectives, map user journeys, design atomic wireframes in Figma, and establish strict technical architecture and database models before writing a line of code.',
    deliverables: [
      'Interactive Figma UI/UX prototype',
      'Technical architecture blueprint',
      'Sprint milestones & delivery contract'
    ]
  },
  {
    number: '02',
    stage: 'HIGH-VELOCITY BUILD',
    title: 'Full-Stack Sprint Engineering',
    timeframe: 'Weeks 1–3',
    icon: Code2,
    description: 'Senior engineers build your production application with clean TypeScript, responsive styling, secure backend APIs, and weekly staging deployments you can test in real time.',
    deliverables: [
      'Clean TypeScript / React / Node codebase',
      'Weekly staging review demos',
      'Continuous security & QA testing'
    ]
  },
  {
    number: '03',
    stage: 'LAUNCH & TELEMETRY',
    title: 'Production Deployment & Scale',
    timeframe: 'Week 4+',
    icon: Rocket,
    description: 'Rigorous cross-device stress testing, 99+ Core Web Vitals optimization, search indexing, store submission, and complete handover of all repositories and asset ownership.',
    deliverables: [
      'Production deployment on edge infrastructure',
      '99+ Core Web Vitals & technical SEO',
      '100% repository & asset handover'
    ]
  }
];

export default function ProcessSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section 
      id="process"
      ref={sectionRef}
      className="bg-[#F6F6F2] dark:bg-[#050608] x-pattern py-20 lg:py-28 relative overflow-hidden text-dark dark:text-white transition-colors duration-300 border-t border-black/5 dark:border-white/5"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-lime/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#19D5D0]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 mb-3">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span>HOW WE OPERATE — 3-STAGE EXECUTION</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-dark dark:text-white mb-4 leading-[1.1]">
              FROM CONCEPT TO PRODUCTION IN WEEKS, NOT MONTHS.
            </h2>

            <p className="text-base sm:text-lg text-gray-700 dark:text-slate-300 leading-relaxed max-w-2xl">
              A transparent, sprint-based delivery model engineered to eliminate agency bloat. You always know what is being built, who is building it, and when it ships.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/80 dark:bg-[#111827] border border-black/10 dark:border-white/10 text-xs font-mono text-gray-700 dark:text-slate-300 shrink-0 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-lime" />
            <span>Weekly Staging Demos &amp; Git Commits</span>
          </div>
        </div>

        {/* 3 Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className={`flex flex-col justify-between rounded-2xl p-7 lg:p-8 bg-white/85 dark:bg-[#0B0F17] border border-black/10 dark:border-white/10 hover:border-cyan-400/50 dark:hover:border-lime/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 relative group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + idx * 120}ms` }}
              >
                {/* Top Step Pill & Timeframe */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs uppercase tracking-widest text-dark dark:text-lime font-bold px-2.5 py-1 rounded-lg bg-lime/15 border border-lime/30">
                        STAGE {step.number}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold">
                        {step.stage}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-gray-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{step.timeframe}</span>
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-400/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-dark dark:text-white leading-tight">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div className="pt-5 border-t border-black/5 dark:border-white/10 space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500 dark:text-slate-400 font-bold block mb-1">
                    Key Deliverables
                  </span>
                  {step.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-dark/85 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-lime shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-[#111827]/70 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-display font-bold text-base text-dark dark:text-white">
              Have an upcoming product release or technical deadline?
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 mt-0.5">
              We conduct initial technical reviews and provide clear architecture roadmaps within 48 hours.
            </p>
          </div>
          <a
            href="#contact"
            className="btn-primary shrink-0 text-xs font-bold uppercase tracking-wider px-5 py-2.5 inline-flex items-center gap-2 shadow-sm"
          >
            <span>Initiate Project Brief</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
