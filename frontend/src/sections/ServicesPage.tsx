import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import ServicesSection from './ServicesSection';

interface ServicesPageProps {
  onBackToHome: () => void;
  onStartInquiry?: (category: string) => void;
}

export default function ServicesPage({ onBackToHome, onStartInquiry }: ServicesPageProps) {
  return (
    <div className="min-h-screen bg-[#F6F6F2] dark:bg-[#050608] x-pattern relative text-dark dark:text-white transition-colors duration-300">
      {/* Subtle Grain Overlay */}
      <div className="grain-overlay pointer-events-none" />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F6F6F2]/90 dark:bg-[#050608]/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-dark/80 hover:text-dark dark:text-slate-300 dark:hover:text-lime transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 select-none hover:opacity-85 transition-opacity"
            title="Xelox Solutions"
          >
            <span className="font-display font-extrabold text-xl text-[#19D5D0]">Xelox</span>
            <span className="font-display font-extrabold text-xl text-dark dark:text-white">Solutions</span>
          </button>

          <button
            onClick={() => onStartInquiry ? onStartInquiry('web-development') : null}
            className="btn-primary hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2"
          >
            <span>Start a project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Page Hero Header */}
      <header className="pt-32 pb-12 px-6 lg:px-12 border-b border-black/5 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime/10 border border-lime/30 text-dark dark:text-lime font-mono text-xs uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-lime" />
            <span>Digital Agency Capabilities — 2026</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-dark dark:text-white mb-6 max-w-4xl leading-[1.08]">
            THREE PILLARS OF <span className="text-cyan-600 dark:text-cyan-400">DIGITAL CRAFT</span> &amp; GROWTH.
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-slate-300 max-w-3xl leading-relaxed">
            We partner with ambitious founders, brands, and modern businesses. Whether you need an acquisition engine, an enterprise-grade web application, or a native mobile product, our team delivers with senior-level craft and verified speed.
          </p>
        </div>
      </header>

      {/* Services Component (Cards + Deep Dive) */}
      <main className="relative z-10">
        <ServicesSection onStartInquiry={onStartInquiry} showDeepDive={true} />
      </main>

      {/* Bottom Navigation Strip */}
      <footer className="border-t border-black/10 dark:border-white/10 py-10 px-6 lg:px-12 bg-white/40 dark:bg-black/40 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-600 dark:text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Xelox Solutions. All rights reserved.
          </div>
          <button
            onClick={onBackToHome}
            className="hover:text-dark dark:hover:text-white underline underline-offset-4 transition-colors"
          >
            Return to Homepage
          </button>
        </div>
      </footer>
    </div>
  );
}