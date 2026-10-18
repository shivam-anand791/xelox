import { useEffect, useState, useCallback } from 'react';
import { Menu, Moon, SunMedium, X, Lock, TrendingUp, Code2, Smartphone, ChevronDown, ArrowRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { XeloxLogo } from './XeloxLogo';

export interface NavLinkItem {
  label: string;
  page?: string;
  href?: string;
}

const servicePillarsList = [
  {
    title: 'Digital Marketing & Growth',
    desc: 'Technical SEO, Paid Acquisition & Growth Funnels',
    category: 'digital-marketing',
    icon: TrendingUp,
  },
  {
    title: 'Website Design & Development',
    desc: 'Custom Web Platforms, SaaS & Headless Flagships',
    category: 'web-development',
    icon: Code2,
  },
  {
    title: 'Mobile App Development',
    desc: 'Native & Cross-Platform iOS / Android Apps',
    category: 'mobile-apps',
    icon: Smartphone,
  },
];

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
  const [activeSection, setActiveSection] = useState<string>('');
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  // Main Desktop Navigation Links
  const navLinks: NavLinkItem[] = [
    { label: 'Home', page: 'home', href: '/' },
    { label: 'Services', page: 'services', href: '/services' },
    { label: 'Work', page: 'work', href: '/work' },
    { label: 'About', href: '/#about' },
    { label: 'Pricing', page: 'pricing', href: '/pricing' },
    { label: 'Insights', href: '/#insights' },
    { label: 'Contact', href: '/#contact' },
  ];

  // Mobile drawer links with full access
  const mobileNavLinks: NavLinkItem[] = [
    { label: 'Home', page: 'home', href: '/' },
    { label: 'Services', page: 'services', href: '/services' },
    { label: 'Work', page: 'work', href: '/work' },
    { label: 'Team & Honors', page: 'team', href: '/team' },
    { label: 'About Studio', href: '/#about' },
    { label: 'Pricing Packages', page: 'pricing', href: '/pricing' },
    { label: 'Insights & Articles', href: '/#insights' },
    { label: 'Contact Us', href: '/#contact' },
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
      const sectionId = link.href.replace(/^(\/)?#/, '');
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
      const cleanHash = link.href.includes('#') ? `#${link.href.split('#')[1]}` : link.href;
      if (currentPage !== 'home') {
        onPageChange('home', undefined, undefined, cleanHash);
      } else {
        window.history.pushState(null, '', `/${cleanHash}`);
        const element = document.querySelector(cleanHash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLinkItem) => {
    // Let browser handle new tab or special modifier clicks
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    handleNavigation(link);
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

  const handleLogoAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    handleLogoClick();
  };

  const handleStartProject = () => {
    setMobileMenuOpen(false);
    if (currentPage === 'service-inquiry') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onPageChange('service-inquiry');
    }
  };

  const handleStartProjectAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    handleStartProject();
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
          {/* Brand Logo Anchor */}
          <a
            href="/"
            onClick={handleLogoAnchorClick}
            className="flex shrink-0 items-center hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D] rounded-lg py-1"
            title="Xelox Solutions — Return to Home"
            aria-label="Xelox Solutions homepage"
          >
            <XeloxLogo
              theme="auto"
              className="h-8 sm:h-9 md:h-10 w-auto"
            />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-3.5 lg:gap-5 xl:gap-6">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              const targetHref = link.href || (link.page === 'home' ? '/' : `/${link.page || ''}`);

              if (link.label === 'Services') {
                return (
                  <div key={link.label} className="relative group/services py-1">
                    <a
                      href={targetHref}
                      onClick={(e) => handleAnchorClick(e, link)}
                      aria-current={active ? 'page' : undefined}
                      className={`nav-link text-xs lg:text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D] rounded inline-flex items-center gap-1 ${
                        active
                          ? 'active font-bold text-dark dark:text-[#B8FF3D]'
                          : 'text-dark/75 hover:text-dark dark:text-slate-300 dark:hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown size={13} className="opacity-60 group-hover/services:rotate-180 transition-transform duration-200" />
                    </a>

                    {/* Services Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover/services:opacity-100 group-hover/services:pointer-events-auto transition-all duration-200 z-50">
                      <div className="w-72 lg:w-80 rounded-2xl bg-[#F6F6F2]/95 dark:bg-[#07090E]/95 border border-black/10 dark:border-white/10 p-2 shadow-2xl backdrop-blur-xl">
                        <div className="space-y-1">
                          {servicePillarsList.map((pillar) => (
                            <a
                              key={pillar.category}
                              href="/services"
                              onClick={(e) => {
                                if (!e.metaKey && !e.ctrlKey) {
                                  e.preventDefault();
                                  onPageChange('services');
                                }
                              }}
                              className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group/item"
                            >
                              <div className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-dark dark:text-white group-hover/item:text-[#19D5D0] dark:group-hover/item:text-[#B8FF3D] transition-colors mt-0.5">
                                <pillar.icon size={15} />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-semibold text-dark dark:text-white group-hover/item:text-[#19D5D0] dark:group-hover/item:text-[#B8FF3D] transition-colors font-display">
                                  {pillar.title}
                                </p>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-mono leading-tight mt-0.5">
                                  {pillar.desc}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                        <div className="border-t border-black/5 dark:border-white/10 mt-1.5 pt-1.5 px-2 flex items-center justify-between text-[11px] font-mono text-dark/70 dark:text-slate-400">
                          <a
                            href="/services"
                            onClick={(e) => {
                              if (!e.metaKey && !e.ctrlKey) {
                                e.preventDefault();
                                onPageChange('services');
                              }
                            }}
                            className="hover:text-dark dark:hover:text-[#B8FF3D] transition-colors flex items-center justify-between w-full"
                          >
                            <span>Explore all capabilities</span>
                            <ArrowRight size={12} className="text-[#19D5D0]" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={link.label}
                  href={targetHref}
                  onClick={(e) => handleAnchorClick(e, link)}
                  aria-current={active ? 'page' : undefined}
                  className={`nav-link text-xs lg:text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D] rounded ${
                    active
                      ? 'active font-bold text-dark dark:text-[#B8FF3D]'
                      : 'text-dark/75 hover:text-dark dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Primary CTA Anchor */}
            <a
              href="/service-inquiry"
              onClick={handleStartProjectAnchorClick}
              className={`btn-primary text-xs lg:text-sm font-bold uppercase tracking-wider px-3.5 lg:px-4 py-2 rounded-xl transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D] inline-flex items-center justify-center ${
                currentPage === 'service-inquiry' ? 'ring-2 ring-emerald-500/50 dark:ring-lime/50 shadow-lime/30' : ''
              }`}
            >
              Discuss Your Project
            </a>

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
          <a 
            href="/"
            onClick={handleLogoAnchorClick}
            className="flex items-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D] rounded py-1"
            aria-label="Xelox Solutions homepage"
          >
            <XeloxLogo
              theme="auto"
              className="h-8 sm:h-9 w-auto"
            />
          </a>
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
            const targetHref = link.href || (link.page === 'home' ? '/' : `/${link.page || ''}`);

            if (link.label === 'Services') {
              return (
                <div key={link.label} className="w-full">
                  <a
                    href={targetHref}
                    onClick={(e) => handleAnchorClick(e, link)}
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
                  </a>
                  {/* Mobile Service Discovery Sub-links */}
                  <div className="pl-3.5 pt-2 pb-1 flex flex-col gap-2 border-l-2 border-black/10 dark:border-white/10 ml-1.5 mt-1">
                    {servicePillarsList.map((pillar) => (
                      <a
                        key={pillar.category}
                        href="/services"
                        onClick={(e) => {
                          if (!e.metaKey && !e.ctrlKey) {
                            e.preventDefault();
                            setMobileMenuOpen(false);
                            onPageChange('services');
                          }
                        }}
                        className="flex items-center gap-2 text-xs font-mono text-dark/70 dark:text-slate-400 hover:text-dark dark:hover:text-[#B8FF3D] transition-colors py-1"
                      >
                        <pillar.icon size={13} className="text-[#19D5D0] dark:text-[#B8FF3D]" />
                        <span>{pillar.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <a
                key={link.label}
                href={targetHref}
                onClick={(e) => handleAnchorClick(e, link)}
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
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Footer Actions */}
        <div className="flex flex-col gap-3 pt-6 border-t border-black/10 dark:border-white/10">
          <a
            href="/service-inquiry"
            onClick={handleStartProjectAnchorClick}
            className="btn-primary w-full py-3.5 text-center text-sm font-bold uppercase tracking-wider justify-center shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D] inline-flex items-center"
          >
            Discuss Your Project
          </a>

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
