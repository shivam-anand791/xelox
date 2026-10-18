import React, { createContext, useState, useEffect, useCallback } from 'react';
import { contentApi, authApi } from '../lib/api';

// Default content for the website (fallback)
const defaultContent = {
  hero: {
    headline: "DIGITAL PRODUCTS & GROWTH ENGINES BUILT TO SCALE AMBITIOUS BRANDS",
    subheadline: "We engineer custom web platforms, native mobile applications, and data-driven growth systems for ambitious brands and growing businesses—eliminating fragmented agency silos to ship faster and scale predictably.",
    cta: "Discuss Your Project",
    secondaryCta: "Explore Our Work",
    microLabel: "XELOXSOLUTIONS — 2026"
  },
  about: {
    eyebrow: "WHO WE ARE — THE XELOX STUDIO",
    headline: "A focused crew of senior builders & growth specialists.",
    body: "We are an engineering-led digital agency. We partner directly with founders and ambitious brands to architect custom web platforms, mobile applications, and measurable customer acquisition systems—eliminating agency bureaucracy to ship faster and sharper.",
    statement: "NO ACCOUNT MANAGERS IN THE MIDDLE. SENIOR BUILDERS ONLY.",
    cta: "Meet the studio"
  },
  services: {
    headline: "CORE CAPABILITIES",
    body: "Three specialized pillars engineered to design, engineer, and scale custom digital products and growth engines.",
    cta: "Explore all services",
    items: [
      { 
        title: "Digital Marketing & Growth", 
        description: "Targeted organic search visibility, managed Google & Meta paid advertising, conversion landing pages, and transparent analytics reporting." 
      },
      { 
        title: "Website Design & Development", 
        description: "Ultra-fast, accessible, and responsive custom web applications, SaaS platforms, and modern corporate websites." 
      },
      { 
        title: "Mobile App Design & Development", 
        description: "High-performance iOS and Android applications crafted with seamless UX, robust APIs, and scalable architectures." 
      }
    ]
  },
  portfolio: {
    headline: "SELECTED WORK",
    body: "Engineered digital flagships, high-conversion growth engines, and verified production platforms.",
    cta: "View all projects",
    projects: [
      { title: "LaptopMitra", subtitle: "E-Commerce & Hardware Marketplace", image: "/portfolio/laptopmitra-homepage.webp" },
      { title: "Adorca 360", subtitle: "Digital Marketing & Technical SEO", image: "/portfolio/adorca-homepage.webp" },
      { title: "Tourist Palace", subtitle: "Hospitality Web & Direct Booking", image: "/portfolio/touristpalace-homepage.webp" },
      { title: "eSailor", subtitle: "Global B2B Trade & Export Portal", image: "/portfolio/esailor-homepage.webp" },
      { title: "Properties Professor", subtitle: "Real Estate Discovery Engine", image: "/portfolio/properties-professor-homepage.webp" }
    ]
  },
  process: {
    headline: "HOW WE WORK",
    body: "A simple process that keeps you in control—and keeps the work on time.",
    steps: [
      { number: "01", title: "Discover", description: "Goals, audience, constraints." },
      { number: "02", title: "Design", description: "Systems, prototypes, polish." },
      { number: "03", title: "Deliver", description: "Handoff, support, iteration." }
    ]
  },
  results: {
    headline: "Results that speak plainly.",
    body: "We measure success by launches shipped, clarity gained, and teams confident enough to grow.",
    metrics: [
      { value: "12+", label: "Launches shipped" },
      { value: "3 weeks", label: "Average time to first design" },
      { value: "100%", label: "Remote-friendly process" }
    ],
    testimonial: {
      quote: "Xelox Solutions turned our rough idea into a brand we're proud to show investors—in under a month.",
      author: "Founded By SCOR7"
    }
  },
  blog: {
    headline: "Insights & Engineering Notes",
    body: "Practical perspectives on search visibility, conversion architecture, and high-performance shipping.",
    cta: "Read more",
    posts: [
      { title: "Structuring Web Platforms for Search Visibility and Fast Indexing", excerpt: "A technical guide to semantic markup, dynamic sitemaps, and entity clustering.", date: "Feb 10, 2026", readTime: "5 min read", image: "/articles/product-naming-guide.webp" },
      { title: "The 3-week landing page playbook", excerpt: "High-conversion layout systems and sub-second performance without bloated dependencies.", date: "Feb 5, 2026", readTime: "7 min read", image: "/articles/landing-page-playbook.webp" },
      { title: "Design systems for tiny teams", excerpt: "Build reusable component consistency across web and mobile without architecture overhead.", date: "Jan 28, 2026", readTime: "4 min read", image: "/articles/design-systems-guide.webp" }
    ]
  },
  contact: {
    headline: "Ready when you are.",
    body: "Tell us what you're building. We'll reply within 2 business days.",
    cta: "Get in touch",
    email: "xyrosolutions1@gmail.com",
    location: "working remotely from everywhere",
    form: {
      emailPlaceholder: "you@company.com",
      messagePlaceholder: "What are you launching?",
      buttonText: "Send message"
    }
  },
  team: {
    members: [
      { name: "Alex Chen", role: "Creative Director", image: "/hero_portrait_left.jpg" },
      { name: "Sam Rivera", role: "Lead Designer", image: "https://res.cloudinary.com/dr4w6ordx/image/upload/v1779460343/ChatGPT_Image_May_22_2026_07_43_23_PM_gvldqm.png" },
      { name: "Jordan Park", role: "Developer", image: "/services_workspace_right.jpg" }
    ]
  }
};

// TypeScript interfaces for type safety
interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface ServiceItem {
  title: string;
  description: string;
}

interface Project {
  title: string;
  subtitle: string;
  image: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface Metric {
  value: string;
  label: string;
}

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

interface ContentSection {
  [key: string]: unknown;
}

interface ContentData {
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
    microLabel: string;
  };
  about: {
    eyebrow: string;
    headline: string;
    body: string;
    statement: string;
    cta: string;
  };
  services: {
    headline: string;
    body: string;
    cta: string;
    items: ServiceItem[];
  };
  portfolio: {
    headline: string;
    body: string;
    cta: string;
    projects: Project[];
  };
  process: {
    headline: string;
    body: string;
    steps: ProcessStep[];
  };
  results: {
    headline: string;
    body: string;
    metrics: Metric[];
    testimonial: {
      quote: string;
      author: string;
    };
  };
  blog: {
    headline: string;
    body: string;
    cta: string;
    posts: BlogPost[];
  };
  contact: {
    headline: string;
    body: string;
    cta: string;
    email: string;
    location: string;
    form: {
      emailPlaceholder: string;
      messagePlaceholder: string;
      buttonText: string;
    };
  };
  team: {
    members: TeamMember[];
  };
}

interface ContentContextType {
  content: ContentData;
  updateContent: (section: string, data: ContentSection) => void;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  loading: boolean;
  error: string | null;
  refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Export context for useContent hook
export { ContentContext };

// Deep merge helper function
const deepMerge = (target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> => {
  const result = { ...target };
  
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      // Deep merge objects
      result[key] = deepMerge(
        (target[key] as Record<string, unknown>) || {},
        source[key] as Record<string, unknown>
      );
    } else if (source[key] !== undefined) {
      // Use source value (including arrays)
      result[key] = source[key];
    }
  }
  
  return result;
};

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [isAdmin, setIsAdmin] = useState(() => authApi.isAuthenticated());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch content from API
  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await contentApi.getContent();
      if (response.success && response.data) {
        // Deep merge with defaults to ensure all fields exist
        const apiData = response.data as Record<string, unknown>;
        setContent(prev => {
          const merged = deepMerge(prev as unknown as Record<string, unknown>, apiData);
          // Ensure blog.posts exists (API doesn't store posts in content)
          if (!(merged.blog as Record<string, unknown>)?.posts) {
            (merged.blog as Record<string, unknown>).posts = (defaultContent.blog as Record<string, unknown>).posts;
          }
          return merged as unknown as ContentData;
        });
      }
    } catch (err) {
      console.error('Failed to fetch content:', err);
      setError(err instanceof Error ? err.message : 'Failed to load content');
      // Use cached content from localStorage as fallback
      const cached = localStorage.getItem('xelox-content') || localStorage.getItem('xyro-content');
      if (cached) {
        setContent(JSON.parse(cached));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    // During local development, clear cached content so code changes appear immediately
    if (import.meta.env && import.meta.env.DEV) {
      try {
        localStorage.removeItem('xelox-content');
        localStorage.removeItem('xyro-content');
      } catch {
        // ignore
      }
    }

    fetchContent();
  }, [fetchContent]);

  // Cache content locally
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('xelox-content', JSON.stringify(content));
    }
  }, [content, loading]);

  const updateContent = async (section: string, data: ContentSection) => {
    // Optimistically update UI
    setContent((prev: ContentData) => ({
      ...prev,
      [section]: { ...prev[section as keyof ContentData], ...data }
    }));

    // If admin, persist to backend
    if (isAdmin) {
      try {
        await contentApi.updateSection(section, data as Record<string, unknown>);
      } catch (err) {
        console.error('Failed to save content:', err);
        // Could revert here if needed
      }
    }
  };

  const refreshContent = async () => {
    await fetchContent();
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      isAdmin, 
      setIsAdmin, 
      loading, 
      error,
      refreshContent 
    }}>
      {children}
    </ContentContext.Provider>
  );
}
