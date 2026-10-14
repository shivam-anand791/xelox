/**
 * Central Brand and Site Configuration for Xelox Solutions
 * Source of truth for brand name, contact info, social links, and metadata.
 */

export const siteConfig = {
  name: 'Xelox Solutions',
  shortName: 'Xelox',
  tagline: 'Craft Digital Agency & Solutions',
  description: 'Digital Marketing & Growth, Website Design & Development, and Mobile App Design & Development.',
  url: 'https://xeloxsolutions.tech', // [PLACEHOLDER: new domain]
  microLabel: 'XELOXSOLUTIONS — 2026',
  
  contact: {
    // Current fallback email until new domain email is supplied
    email: 'xyrosolutions1@gmail.com', // [PLACEHOLDER: new email]
    whatsappNumber: '+91 91231 08081',
    whatsappLink: 'https://wa.me/919123108081',
    location: 'Remote / Global',
    socials: {
      instagram: 'https://instagram.com/xyrosolutions1', // [PLACEHOLDER: new instagram handle]
      linkedin: '[PLACEHOLDER: new linkedin]',
      twitter: '[PLACEHOLDER: new twitter]',
    }
  },

  meta: {
    title: 'Xelox Solutions — Digital Marketing, Web & Mobile App Agency',
    description: 'Xelox Solutions is a premier digital agency specializing in Digital Marketing & Growth, Website Design & Development, and Mobile App Development.',
  }
} as const;

export type SiteConfig = typeof siteConfig;
