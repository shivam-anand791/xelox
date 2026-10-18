import { ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import PricingSection from './PricingSection';

interface PricingPageProps {
  onBackToHome: () => void;
  onSelectPackage?: (packageName: string, category?: string) => void;
}

export default function PricingPage({ onBackToHome, onSelectPackage }: PricingPageProps) {
  return (
    <div className="min-h-screen bg-[#F6F6F2] dark:bg-[#050608] x-pattern relative text-dark dark:text-white transition-colors duration-300">
      {/* Page Hero Header */}
      <header className="pt-28 sm:pt-32 pb-12 px-6 lg:px-12 border-b border-black/5 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Contextual Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-5 text-xs font-mono">
            <a
              href="/"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onBackToHome();
                }
              }}
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-dark dark:text-slate-400 dark:hover:text-lime transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </a>
            <span className="text-gray-400 dark:text-slate-600">/</span>
            <span className="text-dark dark:text-white font-semibold">Pricing</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-400/30 text-cyan-700 dark:text-cyan-400 font-mono text-xs uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>Predictable Investment &amp; Transparent Scoping</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-dark dark:text-white mb-6 max-w-4xl leading-[1.08]">
            CLEAR PRICING PACKAGES. <span className="text-cyan-600 dark:text-cyan-400">MEASURABLE OUTCOMES</span>.
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-slate-300 max-w-3xl leading-relaxed">
            Transparent service packages designed for every growth stage. From launching a mobile-friendly business website to scaling customer inquiries and retaining dedicated senior engineering partners.
          </p>
        </div>
      </header>

      {/* Pricing Content */}
      <main className="relative z-10">
        <PricingSection 
          onSelectPackage={onSelectPackage} 
          showHeader={false}
          className="border-t-0"
        />

        {/* Enterprise & Custom Engagements Callout */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          <div className="rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/5 via-transparent to-lime/5 p-8 sm:p-12 relative overflow-hidden">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-3 font-semibold">
                <ShieldCheck className="w-4 h-4 text-lime" />
                <span>Custom Engineering &amp; Retainer Sprints</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-dark dark:text-white mb-4">
                Need a bespoke enterprise application or dedicated technical squad?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-slate-300 leading-relaxed mb-6">
                If your requirements exceed our standard packages—such as complex multi-tenant SaaS, proprietary IoT hardware telemetry, custom mobile apps, or dedicated monthly engineering sprints—we provide tailored quotes with weekly milestone delivery.
              </p>
              <a
                href="/service-inquiry?category=web-development&package=Custom+Enterprise"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    if (onSelectPackage) onSelectPackage('Custom Enterprise', 'web-development');
                  }
                }}
                className="btn-primary text-xs font-bold uppercase tracking-wider px-6 py-3 inline-flex items-center justify-center"
              >
                Request Custom Scoping Brief
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="border-t border-black/10 dark:border-white/10 py-10 px-6 lg:px-12 bg-white/40 dark:bg-black/40 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-600 dark:text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Xelox Solutions. All rights reserved.
          </div>
          <a
            href="/"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                onBackToHome();
              }
            }}
            className="hover:text-dark dark:hover:text-white underline underline-offset-4 transition-colors"
          >
            Return to Homepage
          </a>
        </div>
      </footer>
    </div>
  );
}
