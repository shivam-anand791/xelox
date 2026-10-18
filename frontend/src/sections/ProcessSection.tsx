import { useScrollReveal } from '../hooks/useScrollReveal';
import { 
  Search, 
  Compass,
  Code2, 
  Rocket, 
  ShieldCheck,
  CheckCircle2, 
  ArrowRight,
  Clock,
  Sparkles,
  Lock
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
    stage: 'SCOPING & DISCOVERY',
    title: 'Requirements & Technical Audit',
    timeframe: 'Days 1–3',
    icon: Search,
    description: 'We audit your commercial objectives, evaluate audience requirements, map technical constraints, and specify exact functional boundaries to ensure a realistic scope, budget, and timeline.',
    deliverables: [
      'Structured project brief synthesis',
      'Technical architecture feasibility review',
      'Fixed-scope milestone roadmap'
    ]
  },
  {
    number: '02',
    stage: 'STRATEGY & ARCHITECTURE',
    title: 'Information Architecture & Figma UX',
    timeframe: 'Days 4–8',
    icon: Compass,
    description: 'We model database schemas, define REST API contracts, and design atomic component wireframes in Figma to validate user journeys and edge states before writing production code.',
    deliverables: [
      'Interactive Figma UI/UX clickable wireframes',
      'Database schema & API contract specifications',
      'Component design tokens & atomic system'
    ]
  },
  {
    number: '03',
    stage: 'SPRINT ENGINEERING',
    title: 'High-Velocity Full-Stack Build',
    timeframe: 'Weeks 2–4',
    icon: Code2,
    description: 'Senior engineers build your production application using clean TypeScript (React/Next.js for web, React Native for mobile, Node for APIs) with weekly testable staging demos.',
    deliverables: [
      'Clean TypeScript codebase without unnecessary bloat',
      'Weekly interactive staging deployment demos',
      'Integrated backend APIs and database models'
    ]
  },
  {
    number: '04',
    stage: 'TESTING & LAUNCH',
    title: 'Multi-Device QA & Production Release',
    timeframe: 'Week 4+',
    icon: Rocket,
    description: 'Cross-browser and multi-device stress testing across 15+ screen viewports, 99+ Core Web Vitals optimization, accessibility audit, and zero-downtime production deployment.',
    deliverables: [
      'Multi-device responsive & accessibility testing',
      '99+ Core Web Vitals performance verification',
      'Production deployment on edge hosting infrastructure'
    ]
  },
  {
    number: '05',
    stage: 'HANDOVER & SUPPORT',
    title: 'Code Handover & Optional Retainers',
    timeframe: 'Post-Launch',
    icon: ShieldCheck,
    description: '100% transfer of all source code repositories, design files, and hosting credentials. Optional ongoing maintenance, GA4 analytics monitoring, or growth retainers structured separately.',
    deliverables: [
      '100% intellectual property & Git repo transfer',
      'Google Search Console indexing & GA4 setup',
      'Optional ongoing maintenance & growth retainers'
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
              <span>HOW WE OPERATE — 5-STAGE DELIVERY PROCESS</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-dark dark:text-white mb-4 leading-[1.1]">
              CLEAR MILESTONES. CONTINUOUS VISIBILITY. ZERO AGENCY BLOAT.
            </h2>

            <p className="text-base sm:text-lg text-gray-700 dark:text-slate-300 leading-relaxed max-w-2xl">
              A structured 5-stage delivery framework from initial scoping to full code handover. You always know what is being built, who is building it, and when it ships.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/80 dark:bg-[#111827] border border-black/10 dark:border-white/10 text-xs font-mono text-gray-700 dark:text-slate-300 shrink-0 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-lime" />
            <span>Weekly Staging Demos &amp; Git Commits</span>
          </div>
        </div>

        {/* 5 Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-14">
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className={`flex flex-col justify-between rounded-2xl p-6 bg-white/85 dark:bg-[#0B0F17] border border-black/10 dark:border-white/10 hover:border-cyan-400/50 dark:hover:border-lime/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 relative group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${150 + idx * 80}ms` }}
              >
                {/* Top Step Pill & Timeframe */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs uppercase tracking-widest text-dark dark:text-lime font-bold px-2 py-0.5 rounded-lg bg-lime/15 border border-lime/30">
                      STAGE {step.number}
                    </span>

                    <div className="inline-flex items-center gap-1 text-[11px] font-mono text-gray-500 dark:text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{step.timeframe}</span>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold block mb-2">
                    {step.stage}
                  </span>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-400/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-dark dark:text-white leading-tight">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-700 dark:text-slate-300 leading-relaxed mb-5">
                    {step.description}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div className="pt-4 border-t border-black/5 dark:border-white/10 space-y-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500 dark:text-slate-400 font-bold block mb-1">
                    Deliverables
                  </span>
                  {step.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-1.5 text-[11px] text-dark/85 dark:text-slate-300 leading-tight">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-lime shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Ownership & Transparency Assurance Banner */}
        <div className="rounded-2xl border border-emerald-500/20 dark:border-lime/20 bg-emerald-500/5 dark:bg-lime/5 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-lime/10 border border-emerald-500/30 dark:border-lime/30 flex items-center justify-center text-emerald-700 dark:text-lime shrink-0 mt-0.5">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-dark dark:text-white">
                100% Code &amp; Asset Ownership Transfer
              </h4>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed mt-1 max-w-2xl">
                We never hold client intellectual property hostage. Upon project completion, you receive complete Git repositories, production build scripts, and hosting credentials. Ongoing maintenance, technical monitoring, or marketing retainers are available as optional structured partnerships.
              </p>
            </div>
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
