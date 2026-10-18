import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';

interface SiteLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  currentHash?: string;
  onPageChange: (page: string, category?: string, packageName?: string, hash?: string) => void;
  onAdminClick: () => void;
  onAiClick: () => void;
  hideAiButton?: boolean;
}

export default function SiteLayout({
  children,
  currentPage,
  currentHash,
  onPageChange,
  onAdminClick,
  onAiClick,
  hideAiButton = false
}: SiteLayoutProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F6F6F2] dark:bg-[#050608] text-dark dark:text-white transition-colors duration-300">
      {/* Subtle Grain Overlay */}
      <div className="grain-overlay pointer-events-none" />

      {/* Global Unified Navigation */}
      <Navigation
        scrolled={scrolled}
        onAdminClick={onAdminClick}
        onPageChange={onPageChange}
        currentPage={currentPage}
        currentHash={currentHash}
      />

      {/* Main Page Content */}
      {children}

      {/* Floating AI Assistant Trigger */}
      {!hideAiButton && (
        <a
          href="/xelox-ai"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            onAiClick();
          }}
          className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-fuchsia-500 via-amber-400 to-cyan-400 px-3 py-2 text-xs font-semibold text-white shadow-[0_14px_36px_rgba(236,72,153,0.24)] backdrop-blur-md transition-transform hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(34,211,238,0.24)] dark:border-white/10 dark:text-white sm:px-4 sm:py-2.5 sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D]"
          aria-label="Open Xelox AI Assistant"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/25 text-white shadow-sm backdrop-blur-sm sm:h-8 sm:w-8">
            <BotIcon />
          </span>
          <span className="hidden sm:inline">Xelox AI</span>
        </a>
      )}
    </div>
  );
}

function BotIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2v2M7 4h10a4 4 0 0 1 4 4v6a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6V8a4 4 0 0 1 4-4Zm-1 7h.01M16 11h.01M9 16c.8.7 1.7 1 3 1s2.2-.3 3-1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
