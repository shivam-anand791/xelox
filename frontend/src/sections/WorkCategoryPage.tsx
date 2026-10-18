import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Award, 
  Code2, 
  Smartphone, 
  TrendingUp, 
  Trophy, 
  CheckCircle2, 
  ArrowRight, 
  X,
  Layers,
  ShoppingBag
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://xyrosolutions.onrender.com/api';

interface WorkItem {
  _id?: string;
  title: string;
  subtitle?: string;
  description: string;
  shortDescription?: string;
  category: string;
  image?: string;
  tags?: string[];
  achievements?: string[];
  links?: Array<{
    title: string;
    url: string;
  }>;
  isActive?: boolean;
  order?: number;
}

interface WorkCategoryMeta {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const categoryMetadata: Record<string, WorkCategoryMeta> = {
  'web-development': {
    id: 'web-development',
    title: 'Website Design & Development',
    eyebrow: '01 / WEB ARCHITECTURE & SAAS',
    description: 'Custom web applications, digital brand flagships, and full-stack software platforms engineered with Next.js, TypeScript, and 99+ Core Web Vitals.',
    icon: Code2,
    accentColor: '#22D3EE'
  },
  'ecommerce': {
    id: 'ecommerce',
    title: 'E-Commerce & Digital Marketplaces',
    eyebrow: '02 / TRANSACTIONAL CATALOGUES',
    description: 'High-trust digital storefronts, B2B procurement pipelines, product filtering engines, and payment gateway architectures.',
    icon: ShoppingBag,
    accentColor: '#F59E0B'
  },
  'digital-marketing': {
    id: 'digital-marketing',
    title: 'Digital Marketing & Growth',
    eyebrow: '03 / PERFORMANCE ACQUISITION',
    description: 'Targeted organic search visibility, managed Google & Meta paid advertising, conversion landing pages, and transparent analytics attribution.',
    icon: TrendingUp,
    accentColor: '#B8FF3D'
  },
  'mobile-apps': {
    id: 'mobile-apps',
    title: 'Mobile App Architecture & Prototypes',
    eyebrow: '04 / CROSS-PLATFORM ENGINEERING',
    description: 'Cross-platform mobile applications engineered with React Native and Expo, featuring touch UI ergonomics, biometric security, and offline SQLite synchronization.',
    icon: Smartphone,
    accentColor: '#B8FF3D'
  },
  'innovation': {
    id: 'innovation',
    title: 'Awards & Innovation Credentials',
    eyebrow: 'VERIFIED CREDENTIALS & HACKATHONS',
    description: 'National hackathon championships, cybersecurity awards, and academic incubation projects demonstrating our deep engineering roots.',
    icon: Trophy,
    accentColor: '#F59E0B'
  },
  'sih-alumni': {
    id: 'sih-alumni',
    title: 'Smart India Hackathon Credentials',
    eyebrow: 'NATIONAL HACKATHON CHAMPIONSHIP',
    description: '1st Place Winner in Healthcare Innovation at Smart India Hackathon 2023, competing against 500+ nationwide engineering teams.',
    icon: Award,
    accentColor: '#F59E0B'
  },
  'amity-innovation': {
    id: 'amity-innovation',
    title: 'Amity Innovation Cell Projects',
    eyebrow: 'INCUBATED PLATFORMS',
    description: 'Collaborative educational technology platforms and prototypes developed under Amity Innovation Cell incubation.',
    icon: Award,
    accentColor: '#F59E0B'
  },
  'cybercubs': {
    id: 'cybercubs',
    title: 'Cybercubs Championship',
    eyebrow: 'ETHICAL HACKING & SECURITY',
    description: 'National championship achievements in ethical hacking, penetration testing, and web application security auditing.',
    icon: Trophy,
    accentColor: '#F59E0B'
  },
  'hackathons': {
    id: 'hackathons',
    title: 'Hackathon Projects & Awards',
    eyebrow: 'GLOBAL & NATIONAL COMPETITIONS',
    description: 'Award-winning rapid prototypes and technical solutions engineered under intense 36-to-48-hour competitive hackathon environments.',
    icon: Trophy,
    accentColor: '#F59E0B'
  }
};

const defaultCategoryMeta: WorkCategoryMeta = {
  id: 'other',
  title: 'Selected Engineering Projects',
  eyebrow: 'XELOX CASE STUDIES',
  description: 'Production systems, web platforms, and verified technical implementations built by Xelox Solutions.',
  icon: Layers,
  accentColor: '#22D3EE'
};

// Fallback initial items
const fallbackItemsByCategory: Record<string, WorkItem[]> = {
  'ecommerce': [
    {
      _id: 'client-laptopmitra',
      title: 'LaptopMitra — Hardware Platform & Marketplace',
      subtitle: 'E-Commerce Architecture & Procurement Engine',
      description: `Project Context:
LaptopMitra is an Indian electronics marketplace specializing in certified pre-owned and enterprise refurbished laptops for software developers, students, and businesses.

Service Delivered:
Full-stack Website Engineering, E-Commerce Catalogue Architecture, and B2B Procurement Quotation Pipeline.

Challenge Addressed:
High consumer skepticism regarding refurbished hardware reliability and the lack of an automated procurement quoting flow for bulk enterprise laptop buyers.

Solution Implemented:
Engineered a fast, responsive storefront featuring a prominent 32-point hardware inspection trust system, dynamic purpose-based categorization (Coding, Business, Student, Gaming), and an instant corporate quotation pipeline with real-time dispatch.

Technology Stack:
Next.js, React, TypeScript, Tailwind CSS, Vercel Edge Hosting.

Verifiable Outcome:
Verified 32-point inspection trust system, functional multi-device procurement quoting flow, sub-second page loads, and active live production deployment.`,
      shortDescription: 'Certified pre-owned and refurbished laptop marketplace engineered with a 32-point inspection trust system and corporate quotation engine.',
      category: 'ecommerce',
      image: '/portfolio/laptopmitra-homepage.webp',
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Hardware Marketplace', 'B2B Procurement'],
      achievements: [
        '32-point hardware inspection certified badging system',
        'Bulk corporate quote request flow with real-time dispatch',
        'Pan-India delivery integration across all major metropolitan hubs',
        'Sub-second page speeds with 99+ Core Web Vitals target'
      ],
      links: [{ title: 'Visit Live Website', url: 'https://laptop-mitra.vercel.app/' }]
    }
  ],
  'web-development': [
    {
      _id: 'client-touristpalace',
      title: 'Tourist Palace — Airport Hotel & Direct Booking Portal',
      subtitle: 'Hospitality Web Platform & Direct Booking Engine',
      description: `Project Context:
Tourist Palace Hotel is an established accommodation provider located in Mahipalpur, New Delhi, situated 5 minutes from Delhi IGI Airport (T1/T2/T3) and the Aerocity commercial hub.

Service Delivered:
Hospitality Website Development, Local SEO Optimization, and Direct Reservation Channel Design.

Challenge Addressed:
Excessive Online Travel Agency (OTA) commissions (15%–25%) and poor mobile discoverability for airport transit travelers requiring rapid room confirmation.

Solution Implemented:
Engineered a lightweight, mobile-first booking portal with instant one-tap WhatsApp concierge reservations, verified Double AC room galleries, transparent pricing, and interactive transit distance guides.

Technology Stack:
Next.js, React, Tailwind CSS, WhatsApp Click-to-Chat API, Schema.org Hotel structured data.

Verifiable Outcome:
Direct zero-commission WhatsApp reservation pipeline, fast mobile load times for travelers on cellular networks, and structured local search visibility for airport transit queries.`,
      shortDescription: 'Hospitality showcase and direct room reservation portal near Delhi IGI Airport and Aerocity.',
      category: 'web-development',
      image: '/portfolio/touristpalace-homepage.webp',
      tags: ['Hospitality UI', 'Next.js', 'WhatsApp Booking', 'Tailwind CSS', 'Local SEO', 'Aerocity'],
      achievements: [
        'Direct zero-commission WhatsApp reservation pipeline',
        'Optimized local SEO visibility for Delhi Airport & Aerocity transit travelers',
        'High-resolution double AC room gallery and amenities guide',
        '24/7 reception and airport transfer inquiry flow'
      ],
      links: [{ title: 'Visit Live Website', url: 'https://touristpalace.vercel.app/' }]
    },
    {
      _id: 'client-esailor',
      title: 'eSailor — International B2B Jute Trade & Export Portal',
      subtitle: 'Global Trade & B2B Catalogue Engine',
      description: `Project Context:
eSailor is an Indian manufacturer and global exporter of sustainable jute bags, cotton canvas totes, and industrial burlap packaging for international commercial buyers.

Service Delivered:
B2B Export Website Development, Wholesale Catalogue Architecture, and Trade Accreditation Showcase.

Challenge Addressed:
Establishing authentic international buyer trust for overseas container-load importers across Europe, North America, and the Middle East, while facilitating wholesale custom-branding quote requests.

Solution Implemented:
Built a verified trade platform highlighting authentic government and export accreditations (RCMC, IEC, GST, Udyam), one-click downloadable PDF product specification sheets, and a structured wholesale quotation intake flow for container orders.

Technology Stack:
Next.js, React, Tailwind CSS, Responsive B2B Architecture, PDF spec integration.

Verifiable Outcome:
Verified export accreditation showcase (RCMC, IEC, GST, Udyam), direct container-load quotation intake pipeline, instant technical spec sheet distribution.`,
      shortDescription: 'International B2B manufacturing and export platform for sustainable jute products with verified trade accreditations.',
      category: 'web-development',
      image: '/portfolio/esailor-homepage.webp',
      tags: ['B2B Export', 'Global Trade', 'Next.js', 'Catalogue Engine', 'Industrial Packaging'],
      achievements: [
        'Verified international trade accreditations (RCMC, IEC, GST, Udyam)',
        'Global B2B wholesale quotation inquiry dispatch pipeline',
        'One-click high-resolution product catalogue PDF downloads',
        'Serving international wholesale buyers across 50+ countries'
      ],
      links: [{ title: 'Visit Live Website', url: 'https://esailor-ectg.vercel.app/' }]
    },
    {
      _id: 'client-properties-professor',
      title: 'Properties Professor — Premium Real Estate Portal',
      subtitle: 'Website Design & Development',
      description: `Project Context:
Properties Professor is an Indian real estate discovery portal showcasing verified luxury residential and commercial listings across Mumbai, Bangalore, and Gurgaon.

Service Delivered:
Full-Stack Web Development, Multi-City Filter Architecture, and Lead Intake Pipeline.

Challenge Addressed:
Information asymmetry and unverified pricing in the Indian property market, leading to high friction between property seekers and authorized real estate advisors.

Solution Implemented:
Developed a responsive discovery portal featuring multi-city filtering (Mumbai, Bangalore, Gurgaon), verified listing badging, clear INR crore valuations, and a direct inquiry routing system connecting prospective buyers to authorized advisors.

Technology Stack:
Next.js, React, Tailwind CSS, Dynamic Search Filter Components.

Verifiable Outcome:
Multi-city property search capability (Mumbai, Bangalore, Gurgaon), verified listing badge structure, direct consultation inquiry generation.`,
      shortDescription: 'Verified real estate discovery and luxury property marketplace with multi-city search and transparent pricing.',
      category: 'web-development',
      image: '/portfolio/properties-professor-homepage.webp',
      tags: ['Real Estate', 'Next.js', 'Verified Listings', 'Property Valuation', 'Interactive Maps'],
      achievements: [
        'Multi-city search filters across Mumbai, Bangalore, and Gurgaon',
        'Verified property badges with transparent INR crore valuations',
        'Residential and commercial multi-category filtering',
        'Direct high-intent consultation lead generation pipeline'
      ],
      links: [{ title: 'Visit Live Website', url: 'https://propertiesprofessor.com/' }]
    },
    {
      _id: 'client-laptopmitra',
      title: 'LaptopMitra — Hardware Platform & Marketplace',
      subtitle: 'E-Commerce Architecture & Procurement Engine',
      description: `Project Context:
LaptopMitra is an Indian electronics marketplace specializing in certified pre-owned and enterprise refurbished laptops for software developers, students, and businesses.

Service Delivered:
Full-stack Website Engineering, E-Commerce Catalogue Architecture, and B2B Procurement Quotation Pipeline.

Challenge Addressed:
High consumer skepticism regarding refurbished hardware reliability and the lack of an automated procurement quoting flow for bulk enterprise laptop buyers.

Solution Implemented:
Engineered a fast, responsive storefront featuring a prominent 32-point hardware inspection trust system, dynamic purpose-based categorization (Coding, Business, Student, Gaming), and an instant corporate quotation pipeline with real-time dispatch.

Technology Stack:
Next.js, React, TypeScript, Tailwind CSS, Vercel Edge Hosting.

Verifiable Outcome:
Verified 32-point inspection trust system, functional multi-device procurement quoting flow, sub-second page loads, and active live production deployment.`,
      shortDescription: 'Certified pre-owned and refurbished laptop marketplace engineered with a 32-point inspection trust system and corporate quotation engine.',
      category: 'ecommerce',
      image: '/portfolio/laptopmitra-homepage.webp',
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Hardware Marketplace', 'B2B Procurement'],
      achievements: [
        '32-point hardware inspection certified badging system',
        'Bulk corporate quote request flow with real-time dispatch',
        'Pan-India delivery integration across all major metropolitan hubs',
        'Sub-second page speeds with 99+ Core Web Vitals target'
      ],
      links: [{ title: 'Visit Live Website', url: 'https://laptop-mitra.vercel.app/' }]
    }
  ],
  'mobile-apps': [
    {
      _id: 'proto-mobile-architecture',
      title: 'Cross-Platform Mobile Application Architecture',
      subtitle: 'Engineering Prototype & Architectural Reference',
      description: `Project Context:
An internal engineering prototype and architectural foundation built by the Xelox team to demonstrate and benchmark cross-platform mobile capabilities.

Service Delivered:
Cross-Platform Mobile Engineering (React Native & Expo), Touch UI Design, Local Caching Architecture.

Challenge Addressed:
Startups and expanding businesses often face prohibitive costs when building and maintaining separate native iOS and Android codebases, resulting in fragmented release cycles and uneven user experiences.

Solution Implemented:
Engineered a unified React Native and Expo codebase utilizing atomic touch UI components, SQLite local caching for offline capability, biometric authentication integration, and automated build configuration for iOS and Android deployment.

Technology Stack:
React Native, Expo, TypeScript, Tailwind / NativeWind, SQLite, Firebase, REST APIs.

Verifiable Outcome:
Functional cross-platform prototype codebase tested across physical iOS and Android hardware; benchmarks touch responsive latency under 16ms (60fps).

Status Note:
Explicitly designated as an internal engineering prototype and reference architecture rather than a commercial client release.`,
      shortDescription: 'Internal React Native & Expo cross-platform architecture prototype demonstrating touch UI ergonomics, offline SQLite sync, and biometric authentication.',
      category: 'mobile-apps',
      image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1779559150/nexgen-studio/vksseodnsre0tcepekgh.png',
      tags: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'Biometrics', 'Mobile Prototype'],
      achievements: [
        'Unified single codebase for iOS and Android via React Native & Expo',
        'Local SQLite offline-first synchronization architecture',
        'Biometric security with keychain token encryption',
        'Physical device testing across iOS and Android hardware'
      ],
      links: []
    }
  ],
  'digital-marketing': [
    {
      _id: 'client-adorca',
      title: 'Adorca 360 — Performance Growth Marketing Studio',
      subtitle: 'Digital Marketing & Technical Search Platform',
      description: `Project Context:
Adorca 360 is a performance marketing studio focused on algorithmic search visibility, content architecture, and international customer acquisition across 50+ global markets.

Service Delivered:
Digital Marketing Strategy Presentation, Technical SEO Architecture, and Web Platform Engineering.

Challenge Addressed:
Marketing decision-makers face opaque agency attribution, lack of transparency in paid spend, and fragmented regional data across global search engines.

Solution Implemented:
Engineered an interactive Signal Architecture visualizer mapping the user journey from search intent to acquisition; established a semantic entity clustering system for multi-region indexing; integrated a real-time Growth Diagnostic tool with 100% first-party transparent attribution.

Technology Stack:
Next.js, TypeScript, Tailwind CSS, SVG Telemetry, Google Analytics 4 & Search Console signal modeling.

Verifiable Outcome:
Functional interactive growth diagnostic workflow, indexation architecture for 50+ international search ecosystems, client-owned data reporting with zero lock-in.`,
      shortDescription: 'Performance growth marketing studio and technical search optimization platform operating across 50+ international markets.',
      category: 'digital-marketing',
      image: '/portfolio/adorca-homepage.webp',
      tags: ['Technical SEO', 'Signal Architecture', 'Global Indexing', 'CRO', 'Programmatic Media', 'Next.js'],
      achievements: [
        'Active multi-region search signal crawling across 50+ global markets',
        'Semantic entity clustering architecture for organic search dominance',
        'Built-in real-time interactive Growth Diagnostic tool',
        'Client first-party data ownership and 100% transparent attribution'
      ],
      links: [{ title: 'Visit Live Website', url: 'https://adorca.vercel.app/' }]
    }
  ],
  'innovation': [
    {
      _id: 'innov-sih-2023',
      title: 'Smart India Hackathon 2023 — National 1st Place Winner',
      subtitle: 'Ministry of Ayush / Healthcare Innovation',
      description: `Project Context:
Smart India Hackathon (SIH) is the world's largest open innovation competition organized by the Ministry of Education and AICTE, Government of India.

Engineering Delivered:
Computer Vision Triage System & Healthcare Diagnostics Prototype.

Challenge Addressed:
Triage delays in healthcare facilities requiring automated medical scan pre-screening to assist clinicians with preliminary assessment.

Solution Implemented:
Engineered an AI-assisted diagnostic prototype utilizing computer vision to evaluate medical scans, identify anomalies, and generate structured preliminary reports for medical review.

Verifiable Outcome:
Secured 1st Place National Championship in Healthcare Innovation, competing against 500+ nationwide university and engineering teams at the National Grand Finale.`,
      shortDescription: 'National 1st Place Winner in Healthcare Innovation at Smart India Hackathon 2023, competing against 500+ engineering teams nationwide.',
      category: 'innovation',
      image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1773202634/group-photo.png',
      tags: ['Smart India Hackathon', 'National Winner', 'AI Healthcare', 'Python', 'React'],
      achievements: [
        '1st Place in Healthcare Innovation Category',
        'Selected among Top 10 from 500+ nationwide teams',
        'Mentored by senior healthcare technology leaders',
        'Demonstrated live at national grand finale'
      ],
      links: [{ title: 'Competition Archive', url: 'https://sih.gov.in' }]
    },
    {
      _id: 'innov-cybercubs',
      title: 'Cybercubs National Championship — 1st Place',
      subtitle: 'Application Security & Penetration Testing',
      description: `Project Context:
Cybercubs National Championship is a premier cybersecurity competition evaluating ethical hacking, application security auditing, and penetration testing.

Engineering Delivered:
Application Security Auditing & Zero-Day Simulation.

Challenge Addressed:
Identifying and mitigating web application vulnerabilities, authentication bypasses, and unauthorized data exposure under timed competitive conditions.

Solution Implemented:
Conducted rigorous penetration testing across multi-tier test platforms, identifying zero-day vulnerability attack vectors and compiling remediation audit reports.

Verifiable Outcome:
Awarded 1st Place National Champions in the competitive ethical hacking challenge.`,
      shortDescription: '1st Place Winner in Cybercubs National Championship for ethical hacking and web application security auditing.',
      category: 'innovation',
      image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1773596421/f48bf7a6-fd0e-4e29-89fb-5d425336f46b_ukczim.png',
      tags: ['Cybersecurity', 'Ethical Hacking', 'Penetration Testing', 'App Security'],
      achievements: [
        'National Champions in ethical hacking challenge',
        'Zero-day vulnerability discovery simulation winner',
        'Comprehensive audit reporting commendation'
      ],
      links: [{ title: 'Competition Archive', url: 'https://cybercubs.org' }]
    },
    {
      _id: 'innov-psb-gff',
      title: 'PSB Hackathon Winner & Global Fintech Fest 2026',
      subtitle: 'Hardware Token & Companion FinTech Protocol',
      description: `Project Context:
PSB Hackathon evaluates breakthrough engineering prototypes tackling critical banking and financial technology security challenges.

Engineering Delivered:
Hardware Authentication Token & Companion Transaction Verification App.

Challenge Addressed:
High rates of digital transaction fraud and unauthorized high-value payment transfers.

Solution Implemented:
Engineered a physical hardware payment token with cryptographic handshake paired with a mobile companion app. Users configure dynamic payment thresholds; transactions exceeding the threshold require physical confirmation on the tamper-resistant hardware token.

Verifiable Outcome:
Awarded 1st Place in the PSB Hackathon and officially selected for showcase at the Global Fintech Fest (GFF) 2026 in Mumbai.`,
      shortDescription: '1st Place at PSB Hackathon & showcased at Global Fintech Fest 2026 in Mumbai for hardware-based transaction security.',
      category: 'innovation',
      image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1779460343/ChatGPT_Image_May_22_2026_07_43_23_PM_gvldqm.png',
      tags: ['PSB Hackathon', 'GFF 2026 Mumbai', 'Hardware Security', 'FinTech', 'IoT Prototype'],
      achievements: [
        '1st Place Winner at PSB Hackathon',
        'Showcased at Global Fintech Fest (GFF) 2026 in Mumbai',
        'Engineered physical hardware payment token with cryptographic handshake',
        'Configurable transaction threshold security with physical button confirmation'
      ],
      links: []
    }
  ]
};

interface WorkCategoryPageProps {
  category: string;
  onBackToWork: () => void;
  onGoHome: () => void;
}

export default function WorkCategoryPage({ category, onBackToWork, onGoHome }: WorkCategoryPageProps) {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [loading, setLoading] = useState(true);

  const categoryMeta = categoryMetadata[category] || defaultCategoryMeta;
  const CategoryIcon = categoryMeta.icon;

  useEffect(() => {
    fetchWork();
  }, [category]);

  const fetchWork = async () => {
    try {
      setLoading(true);
      const url = `${API_URL}/work/category/${category}`;
      const response = await axios.get(url, { timeout: 4000 });
      if (response.data?.data && response.data.data.length > 0) {
        setWorkItems(response.data.data);
      } else {
        setWorkItems(fallbackItemsByCategory[category] || fallbackItemsByCategory['web-development'] || []);
      }
    } catch {
      setWorkItems(fallbackItemsByCategory[category] || fallbackItemsByCategory['web-development'] || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F2] dark:bg-[#050608] x-pattern relative text-dark dark:text-white transition-colors duration-300">
      {/* Hero Header */}
      <header className="pt-28 sm:pt-32 pb-12 px-6 lg:px-12 border-b border-black/5 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Contextual Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-5 text-xs font-mono">
            <a
              href="/work"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onBackToWork();
                }
              }}
              className="inline-flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:text-dark dark:hover:text-lime transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Case Studies</span>
            </a>
            <span className="text-gray-400 dark:text-slate-600">/</span>
            <span className="text-dark/80 dark:text-slate-300 font-semibold">{categoryMeta.title}</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-400/30 text-cyan-700 dark:text-cyan-400 font-mono text-xs uppercase tracking-widest mb-4">
            <CategoryIcon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{categoryMeta.eyebrow}</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-dark dark:text-white mb-6 max-w-4xl leading-[1.08]">
            {categoryMeta.title}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-slate-300 max-w-3xl leading-relaxed">
            {categoryMeta.description}
          </p>
        </div>
      </header>

      {/* Work Grid */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative z-10">
        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-block w-8 h-8 border-2 border-emerald-600 dark:border-lime border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-mono text-xs uppercase tracking-wider text-gray-600 dark:text-slate-400">Loading Case Studies...</p>
          </div>
        ) : workItems.length === 0 ? (
          <div className="py-24 text-center rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 p-8">
            <p className="font-mono text-sm text-gray-700 dark:text-slate-300 mb-4">No projects currently found in this category.</p>
            <a
              href="/work"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onBackToWork();
                }
              }}
              className="btn-outline text-xs uppercase font-mono tracking-wider px-4 py-2 inline-flex items-center justify-center"
            >
              Browse All Projects
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workItems.map((item) => (
              <div
                key={item._id || item.title}
                className="rounded-2xl border border-black/10 dark:border-slate-800 bg-white/80 dark:bg-[#111827] overflow-hidden group hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_24px_50px_rgba(0,0,0,0.35)] transition-all flex flex-col justify-between"
              >
                <div className="aspect-[16/10] overflow-hidden relative border-b border-black/5 dark:border-white/10 bg-black/10 dark:bg-black/40">
                  <img
                    src={item.image || 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1779460343/ChatGPT_Image_May_22_2026_07_43_23_PM_gvldqm.png'}
                    alt={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 block"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider border backdrop-blur-md shadow-sm bg-emerald-50 text-emerald-700 border-emerald-500/30 dark:bg-lime/10 dark:text-lime dark:border-lime/30">
                      {categoryMeta.title.split('&')[0].trim()}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {item.subtitle && (
                      <p className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-[#B8FF3D] font-bold mb-2">
                        {item.subtitle}
                      </p>
                    )}

                    <h3 className="font-display font-bold text-xl text-dark dark:text-white mb-2 leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                      {item.shortDescription || item.description}
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {item.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-dark/75 dark:text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedWork(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 hover:text-dark dark:text-cyan-400 dark:hover:text-lime transition-colors"
                    >
                      <span>View Specification</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {item.links && item.links.length > 0 && (
                      <a
                        href={item.links[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-gray-500 hover:text-dark dark:hover:text-white transition-colors"
                        title={item.links[0].title}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Case Study Modal */}
      {selectedWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#F6F6F2] dark:bg-[#111827] border border-black/10 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="sticky top-0 z-20 bg-[#F6F6F2]/90 dark:bg-[#111827]/90 backdrop-blur-md p-6 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 font-semibold">
                Project Specification &amp; Architecture
              </span>
              <button
                onClick={() => setSelectedWork(null)}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-dark dark:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {selectedWork.image && (
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 relative">
                  <img
                    src={selectedWork.image}
                    alt={selectedWork.title}
                    className="w-full h-full object-cover object-top block"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full font-mono text-xs uppercase font-bold tracking-wider bg-black/80 text-white backdrop-blur-md border border-white/20">
                      {selectedWork.subtitle || selectedWork.category}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-dark dark:text-white mb-3">
                  {selectedWork.title}
                </h3>
                <div className="prose dark:prose-invert max-w-none text-sm md:text-base text-gray-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {selectedWork.description}
                </div>
              </div>

              {selectedWork.achievements && selectedWork.achievements.length > 0 && (
                <div className="p-6 rounded-2xl bg-black/[0.03] dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600 dark:text-lime" />
                    <span className="font-display font-bold text-sm text-dark dark:text-white uppercase tracking-wider">
                      Verified Credentials &amp; Execution Highlights
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedWork.achievements.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-dark/90 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-lime shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedWork.tags && selectedWork.tags.length > 0 && (
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold block mb-2.5">
                    Technology Architecture
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedWork.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-md text-xs font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-dark/80 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  {selectedWork.links && selectedWork.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-4 py-2.5"
                    >
                      <span>{link.title}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedWork(null);
                    onGoHome();
                  }}
                  className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider px-6 py-3"
                >
                  <span>Discuss Similar Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-black/10 dark:border-white/10 py-10 px-6 lg:px-12 bg-white/40 dark:bg-black/40 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-600 dark:text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Xelox Solutions. All rights reserved.
          </div>
          <button
            onClick={onBackToWork}
            className="hover:text-dark dark:hover:text-white underline underline-offset-4 transition-colors"
          >
            Back to All Projects
          </button>
        </div>
      </footer>
    </div>
  );
}
