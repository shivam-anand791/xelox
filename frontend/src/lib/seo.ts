import { useEffect } from 'react';
import type { RouteState } from './router';


const categoryTitles: Record<string, string> = {
  'web-development': 'Web Development & Platforms',
  'ecommerce': 'E-Commerce & Digital Marketplaces',
  'digital-marketing': 'Digital Marketing & Growth',
  'mobile-apps': 'Mobile App Architecture & Prototypes',
  'innovation': 'National Honors & Credentials',
  'sih-alumni': 'Smart India Hackathon Credentials',
  'cybercubs': 'Cybercubs Championship',
  'amity-innovation': 'Amity Innovation Cell',
  'hackathons': 'Hackathon Honors'
};

export function updatePageMetadata(route: RouteState) {
  let title = 'Xelox Solutions — Digital Marketing, Web & Mobile App Agency';
  let description = 'Xelox Solutions is a premier digital agency specializing in Digital Marketing & Growth, Website Design & Development, and Mobile App Development.';

  switch (route.page) {
    case 'services':
      title = 'Services & Capabilities — Xelox Solutions';
      description = 'Explore Xelox Solutions core capabilities across digital marketing, technical SEO, high-performance web development, and cross-platform mobile apps.';
      break;

    case 'work':
      title = 'Production Portfolio & Case Studies — Xelox Solutions';
      description = 'Review verified commercial client platforms, e-commerce marketplaces, performance marketing systems, and engineering prototypes by Xelox Solutions.';
      break;

    case 'work-category': {
      const catKey = route.category || 'web-development';
      const catLabel = categoryTitles[catKey] || 'Selected Case Studies';
      title = `${catLabel} — Portfolio — Xelox Solutions`;
      description = `Deep dive into verified project case studies and technical architectures in ${catLabel} engineered by Xelox Solutions.`;
      break;
    }

    case 'pricing':
      title = 'Transparent Pricing & Retainers — Xelox Solutions';
      description = 'Transparent investment tiers and scope deliverables for Starter Presence, Business Growth, and ongoing Digital Growth Partner retainers.';
      break;

    case 'team':
      title = 'Engineering Leadership & National Honors — Xelox Solutions';
      description = 'Meet the senior engineers and founders behind Xelox Solutions, backed by Smart India Hackathon 2023 and national cybersecurity championships.';
      break;

    case 'service-inquiry':
      title = 'Initiate Project Brief — Xelox Solutions';
      description = 'Submit your project scope, timeline, and objectives for direct review by senior Xelox engineers within 24–48 hours.';
      break;

    case 'privacy':
      title = 'Privacy Policy — Xelox Solutions';
      description = 'Xelox Solutions privacy policy, data protection standards, and client confidentiality commitments.';
      break;

    case 'terms':
      title = 'Terms of Service — Xelox Solutions';
      description = 'Standard terms of service, 100% intellectual property ownership transfer, and client engagement agreements for Xelox Solutions.';
      break;

    case 'admin-login':
      title = 'Admin Portal — Xelox Solutions';
      description = 'Secure administrative portal for Xelox Solutions.';
      break;

    case 'admin-dashboard':
      title = 'Admin Dashboard — Xelox Solutions';
      description = 'Inquiry management and content control panel for Xelox Solutions.';
      break;

    case 'not-found':
      title = '404 Page Not Found — Xelox Solutions';
      description = 'The requested page could not be located. Return to Xelox Solutions homepage.';
      break;

    case 'home':
    default:
      title = 'Xelox Solutions — Digital Marketing, Web & Mobile App Agency';
      description = 'Xelox Solutions is a premier digital agency specializing in Digital Marketing & Growth, Website Design & Development, and Mobile App Development.';
      break;
  }

  // Update DOM Title
  if (typeof document !== 'undefined') {
    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OpenGraph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', description);
  }
}

export function usePageMetadata(route: RouteState) {
  useEffect(() => {
    updatePageMetadata(route);
  }, [route]);
}
