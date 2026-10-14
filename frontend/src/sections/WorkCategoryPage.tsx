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
  Layers
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
    description: 'Custom web applications, digital brand flagships, and headless platforms engineered with Next.js, TypeScript, and 99+ Core Web Vitals.',
    icon: Code2,
    accentColor: '#22D3EE'
  },
  'mobile-apps': {
    id: 'mobile-apps',
    title: 'Mobile App Development',
    eyebrow: '02 / IOS & ANDROID ECOSYSTEMS',
    description: 'Native and cross-platform mobile applications engineered with fluid micro-interactions, biometric security, and offline synchronization.',
    icon: Smartphone,
    accentColor: '#B8FF3D'
  },
  'digital-marketing': {
    id: 'digital-marketing',
    title: 'Digital Marketing & Growth',
    eyebrow: '03 / PERFORMANCE ACQUISITION',
    description: 'Data-driven marketing frameworks combining technical search authority, multi-channel performance advertising, and conversion rate optimization.',
    icon: TrendingUp,
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
  'web-development': [
    {
      _id: 'web-1',
      title: 'Modern E-Commerce Web Flagship',
      subtitle: 'Website Design & Development',
      description: 'Engineered a bespoke headless e-commerce web platform built with Next.js, TypeScript, and Tailwind CSS. The platform features sub-second page transitions, dynamic state management, custom checkout integration, and full WCAG AA accessibility compliance.',
      shortDescription: 'Custom headless commerce platform built with Next.js & TypeScript, engineered for sub-second performance.',
      category: 'web-development',
      image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1779460343/ChatGPT_Image_May_22_2026_07_43_23_PM_gvldqm.png',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Headless CMS'],
      achievements: [
        'Sub-second page load speeds across all global edge nodes',
        '99+ Google Lighthouse performance score',
        'Responsive cross-device testing across 15+ screen sizes',
        'Secure payment gateway integration'
      ],
      links: [{ title: 'Technical Architecture', url: 'https://github.com/xelox-solutions/web-architecture' }]
    }
  ],
  'mobile-apps': [
    {
      _id: 'mobile-1',
      title: 'Multi-Platform Mobile Companion',
      subtitle: 'Mobile App Design & Development',
      description: 'Architected an intuitive, high-performance cross-platform mobile application for iOS and Android using React Native and TypeScript. Built with an offline-first data model, biometrics, and instant cloud synchronization.',
      shortDescription: 'Fluid React Native mobile application for iOS & Android featuring biometric security and offline-first sync.',
      category: 'mobile-apps',
      image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1779559150/nexgen-studio/vksseodnsre0tcepekgh.png',
      tags: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'SQLite'],
      achievements: [
        'Cross-platform deployment to Apple App Store & Google Play',
        'Biometric security with keychain token encryption',
        'Offline-first synchronization architecture',
        'Low-latency push notification pipeline'
      ],
      links: [{ title: 'App Architecture', url: 'https://github.com/xelox-solutions/mobile-architecture' }]
    }
  ],
  'digital-marketing': [
    {
      _id: 'growth-1',
      title: 'Full-Funnel Performance Growth System',
      subtitle: 'Digital Marketing & Growth',
      description: 'Designed and deployed an integrated growth engine combining technical SEO authority, multi-channel paid acquisition (Meta & Google Ads), and conversion-tested landing pages.',
      shortDescription: 'Integrated growth marketing system combining technical search dominance with high-ROI paid acquisition.',
      category: 'digital-marketing',
      image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1779559829/nexgen-studio/wzygtdqcuaakv3nsytsb.png',
      tags: ['Technical SEO', 'Paid Acquisition', 'CRO', 'GA4 Analytics', 'Email Funnels'],
      achievements: [
        'End-to-end attribution tracking architecture setup',
        'Multi-variant landing page A/B testing framework',
        'Bi-weekly transparent client performance reporting',
        'Automated lead qualification and nurture sequences'
      ],
      links: [{ title: 'Growth Framework', url: 'https://github.com/xelox-solutions/growth-framework' }]
    }
  ],
  'innovation': [
    {
      _id: 'innov-1',
      title: 'Smart India Hackathon 2023',
      subtitle: 'National Winner — Healthcare Innovation',
      description: 'Developed an AI-powered healthcare diagnostics prototype that uses computer vision to analyze medical scans and assist clinicians with preliminary triage. Secured first place in the healthcare category of Smart India Hackathon 2023, competing against over 500 engineering teams nationwide.',
      shortDescription: 'National 1st Place Winner at Smart India Hackathon 2023 in Healthcare Innovation Category.',
      category: 'innovation',
      image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1773202634/group-photo.png',
      tags: ['Smart India Hackathon', 'National Winner', 'Healthcare AI', 'Python', 'React'],
      achievements: [
        '1st Place in Healthcare Innovation Category',
        'Selected among Top 10 from 500+ nationwide teams',
        'Mentored by senior healthcare technology leaders',
        'Demonstrated live at national grand finale'
      ],
      links: [{ title: 'Competition Archive', url: 'https://sih.gov.in' }]
    },
    {
      _id: 'innov-2',
      title: 'Cybercubs National Championship',
      subtitle: '1st Place — Ethical Hacking & Cybersecurity',
      description: 'Achieved first place in the Cybercubs National Championship 2023, a premier cybersecurity competition evaluating ethical hacking, application security auditing, and penetration testing.',
      shortDescription: '1st Place Winner in Cybercubs National Championship for ethical hacking and web application security.',
      category: 'innovation',
      image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1773596421/f48bf7a6-fd0e-4e29-89fb-5d425336f46b_ukczim.png',
      tags: ['Cybersecurity', 'Ethical Hacking', 'Penetration Testing', 'App Security'],
      achievements: [
        'National Champions in ethical hacking challenge',
        'Zero-day vulnerability discovery simulation winner',
        'Comprehensive audit reporting commendation'
      ],
      links: [{ title: 'Competition Archive', url: 'https://cybercubs.org' }]
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
      {/* Subtle Grain Overlay */}
      <div className="grain-overlay pointer-events-none" />

      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F6F6F2]/90 dark:bg-[#050608]/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <button
            onClick={onBackToWork}
            className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-dark/80 hover:text-dark dark:text-slate-300 dark:hover:text-lime transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Case Studies</span>
          </button>
          
          <button
            onClick={onGoHome}
            className="flex items-center gap-2 select-none hover:opacity-85 transition-opacity"
            title="Xelox Solutions"
          >
            <span className="font-display font-extrabold text-xl text-[#19D5D0]">Xelox</span>
            <span className="font-display font-extrabold text-xl text-dark dark:text-white">Solutions</span>
          </button>

          <button
            onClick={onGoHome}
            className="btn-primary hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2"
          >
            <span>Start a project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-32 pb-12 px-6 lg:px-12 border-b border-black/5 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-400/30 text-cyan-700 dark:text-cyan-400 font-mono text-xs uppercase tracking-widest mb-4">
            <CategoryIcon className="w-3.5 h-3.5 text-lime" />
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
            <div className="inline-block w-8 h-8 border-2 border-lime border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-mono text-xs uppercase tracking-wider text-gray-600 dark:text-slate-400">Loading Case Studies...</p>
          </div>
        ) : workItems.length === 0 ? (
          <div className="py-24 text-center rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 p-8">
            <p className="font-mono text-sm text-gray-700 dark:text-slate-300 mb-4">No projects currently found in this category.</p>
            <button
              onClick={onBackToWork}
              className="btn-outline text-xs uppercase font-mono tracking-wider px-4 py-2"
            >
              Browse All Projects
            </button>
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
                    className="w-full h-full object-cover img-mono group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider border backdrop-blur-md shadow-sm bg-lime/10 text-lime border-lime/30">
                      {categoryMeta.title.split('&')[0].trim()}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {item.subtitle && (
                      <p className="font-mono text-xs uppercase tracking-wider text-lime dark:text-lime font-semibold mb-2">
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
                    className="w-full h-full object-cover img-mono"
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
                    <Award className="w-4 h-4 text-lime" />
                    <span className="font-display font-bold text-sm text-dark dark:text-white uppercase tracking-wider">
                      Verified Credentials &amp; Execution Highlights
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedWork.achievements.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-dark/90 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-lime shrink-0 mt-0.5" />
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
