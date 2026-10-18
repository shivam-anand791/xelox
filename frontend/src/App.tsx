import { useState, useEffect } from 'react';
import SiteLayout from './components/SiteLayout';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import PortfolioSection from './sections/PortfolioSection';
import WorkPage from './sections/WorkPage';
import WorkCategoryPage from './sections/WorkCategoryPage';
import ServicesPage from './sections/ServicesPage';
import ServicesSection from './sections/ServicesSection';
import ServiceInquiryPage from './sections/ServiceInquiryPage';
import PrivacyPage from './sections/Privacy';
import TermsPage from './sections/Terms';
import ProcessSection from './sections/ProcessSection';
import BlogSection from './sections/BlogSection';
import ContactSection from './sections/ContactSection';
import AdminLogin from './sections/AdminLogin';
import AdminDashboard from './sections/AdminDashboard';
import XeloxAiPage from './sections/XeloxAiPage';
import TeamPage from './sections/TeamPage';
import PricingPage from './sections/PricingPage';
import { ContentProvider } from './context/ContentContext';
import { useContent } from './hooks/useContent';
import { authApi } from './lib/api';

import { parseRoute, buildUrl, scrollToHash, type RouteState, type Page } from './lib/router';
import { usePageMetadata } from './lib/seo';
import NotFoundPage from './sections/NotFoundPage';

function AppContent() {
  const [route, setRoute] = useState<RouteState>(() => parseRoute());
  const { isAdmin, setIsAdmin } = useContent();

  // Dynamically update document title, meta descriptions, and OG tags based on active route
  usePageMetadata(route);

  // Listen for browser back / forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseRoute();
      setRoute(parsed);
      if (parsed.hash) {
        setTimeout(() => scrollToHash(parsed.hash), 80);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle deep-link section hash on initial load (e.g. /#pricing, /#about, /#contact, /#insights)
  useEffect(() => {
    if (route.hash) {
      setTimeout(() => scrollToHash(route.hash), 120);
    }
  }, []);

  const navigateTo = (
    page: Page | string, 
    category?: string, 
    packageName?: string, 
    hash?: string,
    replace: boolean = false
  ) => {
    const targetUrl = buildUrl(page as Page, category, packageName, hash);
    if (replace) {
      window.history.replaceState({ page, category, packageName, hash }, '', targetUrl);
    } else {
      window.history.pushState({ page, category, packageName, hash }, '', targetUrl);
    }
    const newRoute = parseRoute(window.location.pathname, window.location.search, window.location.hash);
    setRoute(newRoute);

    if (newRoute.hash) {
      setTimeout(() => scrollToHash(newRoute.hash), 80);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handlePageChange = (page: string, category?: string, packageName?: string, hash?: string) => {
    navigateTo(page as Page, category, packageName, hash);
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    navigateTo('admin-dashboard');
  };

  const handleLogout = () => {
    authApi.logout();
    setIsAdmin(false);
    navigateTo('home');
  };

  // Dedicated Admin layout views
  if (route.page === 'admin-login') {
    return <AdminLogin onLogin={handleAdminLogin} onBack={() => navigateTo('home')} />;
  }

  if (route.page === 'admin-dashboard') {
    return isAdmin ? (
      <AdminDashboard onLogout={handleLogout} onViewSite={() => navigateTo('home')} />
    ) : (
      <AdminLogin onLogin={handleAdminLogin} onBack={() => navigateTo('home')} />
    );
  }

  // Render content corresponding to active page inside unified SiteLayout
  const renderPage = () => {
    switch (route.page) {
      case 'work':
        return (
          <WorkPage 
            onBackToHome={() => navigateTo('home')} 
            onSelectCategory={(cat) => navigateTo('work-category', cat)} 
            onNavigateToTeam={() => navigateTo('team')}
            initialCategory={route.category}
          />
        );
      case 'team':
        return (
          <TeamPage 
            onBackToHome={() => navigateTo('home')} 
            onStartProject={() => navigateTo('service-inquiry')} 
          />
        );
      case 'privacy':
        return <PrivacyPage onBack={() => navigateTo('home')} />;
      case 'terms':
        return <TermsPage onBack={() => navigateTo('home')} />;
      case 'xelox-ai':
      case 'xyro-ai':
        return <XeloxAiPage onBack={() => navigateTo('home')} />;
      case 'work-category':
        return (
          <WorkCategoryPage 
            category={route.category || 'sih-alumni'} 
            onBackToWork={() => navigateTo('work')} 
            onGoHome={() => navigateTo('home')} 
          />
        );
      case 'services':
        return (
          <ServicesPage 
            onBackToHome={() => navigateTo('home')} 
            onStartInquiry={(category: string, packageName?: string) => navigateTo('service-inquiry', category, packageName)} 
          />
        );
      case 'service-inquiry':
        return (
          <ServiceInquiryPage 
            category={route.category || 'web-development'} 
            initialPackage={route.packageName || ''}
            onBackToServices={() => navigateTo('services')} 
            onGoHome={() => navigateTo('home')} 
          />
        );
      case 'pricing':
        return (
          <PricingPage 
            onBackToHome={() => navigateTo('home')} 
            onSelectPackage={(pkg, cat) => navigateTo('service-inquiry', cat, pkg)} 
          />
        );
      case 'not-found':
        return <NotFoundPage currentPath={route.rawPath} onNavigate={(p) => navigateTo(p)} />;
      case 'home':
      default:
        return (
          <main>
            <HeroSection onNavigate={handlePageChange} />
            <ServicesSection 
              onStartInquiry={(category: string) => handlePageChange('service-inquiry', category)}
              onNavigate={handlePageChange}
              showDeepDive={false}
            />
            <PortfolioSection onNavigate={handlePageChange} />
            <AboutSection onNavigate={handlePageChange} />
            <ProcessSection />
            <BlogSection />
            <ContactSection onNavigate={handlePageChange} />
          </main>
        );
    }
  };

  return (
    <SiteLayout
      currentPage={route.page}
      currentHash={route.hash}
      onPageChange={handlePageChange}
      onAdminClick={() => navigateTo('admin-login')}
      onAiClick={() => navigateTo('xelox-ai')}
      hideAiButton={route.page === 'xelox-ai' || route.page === 'xyro-ai'}
    >
      {renderPage()}
    </SiteLayout>
  );
}

function App() {
  useEffect(() => {
    const updateDeviceClass = () => {
      const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      document.documentElement.classList.toggle('touch-device', isTouchDevice);
    };

    updateDeviceClass();

    const mediaQuery = window.matchMedia('(hover: none) and (pointer: coarse)');
    mediaQuery.addEventListener('change', updateDeviceClass);

    return () => {
      mediaQuery.removeEventListener('change', updateDeviceClass);
      document.documentElement.classList.remove('touch-device');
    };
  }, []);

  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}

export default App;
