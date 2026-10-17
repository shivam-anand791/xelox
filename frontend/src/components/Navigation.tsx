import { useEffect, useState, useCallback } from 'react';
import { Menu, Moon, SunMedium, X, Lock } from 'lucide-react';
import { useTheme } from 'next-themes';

export interface NavLinkItem {
  label: string;
  page?: string;
  href?: string;
}

interface NavigationProps {
  scrolled?: boolean;
  onAdminClick: () => void;
  onPageChange: (page: string, category?: string, packageName?: string, hash?: string) => void;
  currentPage: string;
  currentHash?: string;
}

export default function Navigation({ 
  scrolled = false, 
  onAdminClick, 
  onPageChange, 
  currentPage,
  currentHash 
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';
  const logoSrc = '/logo.png';

  useEffect(() => {
    setLogoLoaded(false);
  }, [logoSrc]);

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  // Main Desktop Navigation Links
  const navLinks: NavLinkItem[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Work', page: 'work' },
    { label: 'About', href: '#about' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'Insights', href: '#insights' },
    { label: 'Contact', href: '#contact' },
  ];

  // Mobile drawer links with full access
  const mobileNavLinks: NavLinkItem[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Work', page: 'work' },
    { label: 'Team & Honors', page: 'team' },
    { label: 'About Studio', href: '#about' },
    { label: 'Pricing Packages', page: 'pricing' },
    { label: 'Insights & Articles', href: '#insights' },
    { label: 'Contact Us', href: '#contact' },
  ];

  // Homepage scroll spy to detect active in-page section
  useEffect(() => {
    if (currentPage !== 'home') {
      setActiveSection('');
      return;
    }

    if (currentHash) {
      setActiveSection(currentHash.replace(/^#/, ''));
    } else if (typeof window !== 'undefined' && window.location.hash) {
      setActiveSection(window.location.hash.replace(/^#/, ''));
    } else {
      setActiveSection('hero');
    }

    const sections = ['contact', 'insights', 'pricing', 'about', 'services', 'hero'];

    const handleScrollSpy = () => {
      // If near bottom of the page, highlight Contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120) {
        setActiveSection('contact');
        return;
      }

      // Check section scroll offsets from bottom to top
      const scrollPosition = window.scrollY + 180;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [currentPage, currentHash]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Helper to determine if a nav link is currently active
  const isLinkActive = useCallback((link: NavLinkItem): boolean => {
    if (link.page) {
      if (link.page === 'home') {
        return currentPage === 'home' && (!activeSection || activeSection === 'hero');
      }
      if (link.page === 'work') {
        return currentPage === 'work' || currentPage === 'work-category';
      }
      if (link.page === 'services') {
        return currentPage === 'services';
      }
      if (link.page === 'team') {
        return currentPage === 'team';
      }
      return currentPage === link.page;
    }

    if (link.href) {
      const sectionId = link.href.replace(/^#/, '');
      if (currentPage === 'home') {
        return activeSection === sectionId;
      }
    }

    return false;
  }, [currentPage, activeSection]);

  const handleNavigation = (link: NavLinkItem) => {
    setMobileMenuOpen(false);

    if (link.page) {
      if (link.page === currentPage && !link.href) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (link.page === 'home') {
          window.history.pushState(null, '', '/');
          setActiveSection('hero');
        }
      } else {
        onPageChange(link.page);
      }
    } else if (link.href) {
      if (currentPage !== 'home') {
        onPageChange('home', undefined, undefined, link.href);
      } else {
        window.history.pushState(null, '', `/${link.href}`);
        const element = document.querySelector(link.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    if (currentPage === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
      setActiveSection('hero');
    } else {
      onPageChange('home');
    }
  };

  const handleStartProject = () => {
    setMobileMenuOpen(false);
    if (currentPage === 'service-inquiry') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onPageChange('service-inquiry');
    }
  };

  const isSolidNavbar = scrolled || currentPage !== 'home';

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSolidNavbar
            ? 'bg-[#F6F6F2]/95 dark:bg-[#050608]/95 backdrop-blur-md py-2.5 shadow-md border-b border-black/5 dark:border-white/10'
            : 'bg-transparent py-3 sm:py-4'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={handleLogoClick}
            className="h-10 sm:h-11 flex shrink-0 items-center hover:opacity-85 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D] rounded-lg"
            title="Xelox Solutions — Return to Home"
            aria-label="Xelox Solutions Home"
          >
            <div className="flex items-center gap-2.5">
              <img
                src={logoSrc}
                alt=""
                className="h-[26px] w-auto"
                decoding="async"
                onLoad={() => setLogoLoaded(true)}
                style={{ opacity: mounted && logoLoaded ? 1 : 0, transition: 'opacity 160ms ease' }}
              />
              <span className="inline-flex items-baseline select-none">
                <span className="font-display font-extrabold text-[20px] sm:text-[22px] text-[#19D5D0]">Xelox</span>
                <span className="font-display font-extrabold text-[20px] sm:text-[22px] ml-1 text-dark dark:text-white">Solutions</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-3.5 lg:gap-5 xl:gap-6">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavigation(link)}
                  aria-current={active ? 'page' : undefined}
                  className={`nav-link text-xs lg:text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D] rounded ${
                    active
                      ? 'active font-bold text-dark dark:text-[#B8FF3D]'
                      : 'text-dark/75 hover:text-dark dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Primary CTA Button */}
            <button
              onClick={handleStartProject}
              className={`btn-primary text-xs lg:text-sm font-bold uppercase tracking-wider px-3.5 lg:px-4 py-2 rounded-xl transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D] ${
                currentPage === 'service-inquiry' ? 'ring-2 ring-emerald-500/50 dark:ring-lime/50 shadow-lime/30' : ''
              }`}
            >
              Start a project
            </button>

            {/* Admin Lock Access */}
            <button
              onClick={onAdminClick}
              className="p-2 text-gray-custom hover:text-dark dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D] rounded-lg"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <Lock size={17} />
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-black/10 bg-white/70 text-dark transition-colors hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D]"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              disabled={!mounted}
            >
              {mounted ? (isDark ? <SunMedium size={17} /> : <Moon size={17} />) : <span className="inline-block h-[17px] w-[17px]" />}
            </button>
          </div>

          {/* Mobile Navigation Header Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-black/10 bg-white/70 text-dark transition-colors hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              disabled={!mounted}
            >
              {mounted ? (isDark ? <SunMedium size={16} /> : <Moon size={16} />) : <span className="inline-block h-[16px] w-[16px]" />}
            </button>

            <button
              className="p-2 rounded-xl text-dark dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Accessible Mobile Menu Overlay */}
      <div
        id="mobile-navigation-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={`fixed inset-0 z-50 bg-[#F6F6F2] dark:bg-[#050608] transition-all duration-300 md:hidden flex flex-col justify-between p-6 sm:p-8 overflow-y-auto ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Mobile Menu Header Bar */}
        <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D] rounded"
          >
            <img
              src={logoSrc}
              alt=""
              className="h-[24px] w-auto"
            />
            <span className="font-display font-extrabold text-[18px]">
              <span className="text-[#19D5D0]">Xelox</span>
              <span className="ml-1 text-dark dark:text-white">Solutions</span>
            </span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-xl text-dark dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D]"
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="flex flex-col items-start gap-4 py-6">
          {mobileNavLinks.map((link) => {
            const active = isLinkActive(link);
            return (
              <button
                key={link.label}
                onClick={() => handleNavigation(link)}
                aria-current={active ? 'page' : undefined}
                className={`font-display text-2xl font-bold transition-all flex items-center justify-between w-full py-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D] rounded ${
                  active
                    ? 'text-[#19D5D0] dark:text-[#B8FF3D] translate-x-1'
                    : 'text-dark/80 dark:text-white/80 hover:text-dark dark:hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {active && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#19D5D0] dark:bg-[#B8FF3D] shadow-sm" />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Menu Footer Actions */}
        <div className="flex flex-col gap-3 pt-6 border-t border-black/10 dark:border-white/10">
          <button
            onClick={handleStartProject}
            className="btn-primary w-full py-3.5 text-center text-sm font-bold uppercase tracking-wider justify-center shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D]"
          >
            Start a project
          </button>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onAdminClick();
              }}
              className="flex items-center gap-2 text-xs font-mono text-gray-custom hover:text-dark dark:hover:text-white transition-colors py-2 px-3 rounded-lg border border-black/10 dark:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D]"
            >
              <Lock size={15} />
              <span>Admin Portal</span>
            </button>

            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-xs font-mono text-dark dark:text-white transition-colors py-2 px-3 rounded-lg border border-black/10 dark:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D]"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <SunMedium size={15} /> : <Moon size={15} />}
              <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
