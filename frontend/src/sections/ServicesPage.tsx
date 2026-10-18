import { ArrowLeft, Sparkles } from 'lucide-react';
import ServicesSection from './ServicesSection';
import PricingSection from './PricingSection';

interface ServicesPageProps {
  onBackToHome: () => void;
  onStartInquiry?: (category: string, packageName?: string) => void;
}

export default function ServicesPage({ onBackToHome, onStartInquiry }: ServicesPageProps) {
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
              className="inline-flex items-center gap-1.5 text-gray-custom hover:text-dark dark:hover:text-lime transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </a>
            <span className="text-gray-400 dark:text-slate-600">/</span>
            <span className="text-dark dark:text-white font-semibold">Services</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-lime/10 border border-emerald-500/30 dark:border-lime/30 text-emerald-800 dark:text-lime font-mono text-xs uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-lime" />
            <span>Digital Agency Capabilities — 2026</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-dark dark:text-white mb-6 max-w-4xl leading-[1.08]">
            THREE PILLARS OF <span className="text-cyan-600 dark:text-cyan-400">DIGITAL CRAFT</span> &amp; GROWTH.
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-slate-300 max-w-3xl leading-relaxed">
            We provide focused, transparent services across digital marketing, custom website engineering, and cross-platform mobile apps. Every engagement is custom-scoped to your actual stage with clear deliverables and honest measurement.
          </p>
        </div>
      </header>

      {/* Services Component (Cards + Deep Dive) */}
      <main className="relative z-10">
        <ServicesSection onStartInquiry={onStartInquiry} showDeepDive={true} />
        <PricingSection onSelectPackage={(pkg, cat) => onStartInquiry ? onStartInquiry(cat || 'web-development', pkg) : null} />
      </main>

      {/* Bottom Navigation Strip */}
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