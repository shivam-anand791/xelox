import { 
  ArrowLeft, 
  Trophy, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Cpu,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface TeamPageProps {
  onBackToHome: () => void;
  onStartProject?: () => void;
}

export default function TeamPage({ onBackToHome, onStartProject }: TeamPageProps) {
  // Championship Credentials & National Awards (NO personal photos)
  const achievements = [
    {
      id: 'sih-2023',
      title: 'Smart India Hackathon 2023',
      subtitle: 'National 1st Place Champions — Healthcare Innovation',
      tag: 'National Championship',
      badgeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
      icon: Trophy,
      summary: 'Secured 1st Place in the healthcare innovation category at Smart India Hackathon 2023, competing against over 500 engineering teams nationwide.',
      description: 'Architected and demonstrated an AI-driven healthcare diagnostics prototype that uses computer vision to analyze medical scan telemetry and assist clinicians with preliminary triage under emergency conditions.\n\nDemonstrated live before national jury panels at the grand finale, proving our ability to architect high-rigor, mission-critical systems under intense competitive pressure.',
      highlights: [
        'Selected among Top 10 finalists out of 500+ nationwide engineering teams',
        'Demonstrated convolutional medical scan triage pipeline',
        'Role-based clinician data security with strict patient privacy',
        'Official Government of India recognized championship recognition'
      ],
      techStack: ['Python', 'Computer Vision', 'PyTorch', 'React', 'FastAPI'],
      externalLink: 'https://sih.gov.in',
      accentGlow: 'from-amber-500/20 via-yellow-500/10 to-transparent'
    },
    {
      id: 'cybercubs-championship',
      title: 'Cybercubs National Championship',
      subtitle: '1st Place Winner — Ethical Hacking & Cybersecurity',
      tag: 'Cybersecurity Champion',
      badgeColor: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
      icon: ShieldCheck,
      summary: 'Achieved 1st place in the Cybercubs National Championship, evaluated on penetration testing, web application security auditing, and perimeter defense.',
      description: 'Conquered multiple real-world cyber simulation tracks including live application vulnerability discovery, secure patch demonstrations, cryptographic challenge resolutions, and digital forensics incident reporting.\n\nThis security-first mindset directly translates into how Xelox builds every web platform, mobile API, and client data vault.',
      highlights: [
        '1st Place Champions in multi-track ethical hacking simulation',
        'Zero-day vulnerability discovery and patch demonstration',
        'Cryptographic protocol verification and perimeter hardening',
        'Certified technical security commendation'
      ],
      techStack: ['AppSec', 'Penetration Testing', 'OWASP Top 10', 'Cryptography', 'Digital Forensics'],
      externalLink: 'https://cybercubs.org',
      accentGlow: 'from-cyan-500/20 via-blue-500/10 to-transparent'
    },
    {
      id: 'psb-hackathon',
      title: 'PSB Hackathon Winner & GFF 2026 Mumbai',
      subtitle: '1st Place Winner — FinTech Security Innovation',
      tag: 'FinTech Innovation',
      badgeColor: 'border-[#B8FF3D]/40 bg-[#B8FF3D]/10 text-[#B8FF3D]',
      icon: Cpu,
      summary: 'Engineered a physical hardware payment token with cryptographic authorization protocol that won 1st Place in the PSB Hackathon and was showcased at Global Fintech Fest 2026 in Mumbai.',
      description: 'Designed a hardware-backed payment confirmation device that drastically reduces digital payment fraud. Users set a dynamic threshold (e.g. ₹50,000); transactions exceeding this amount require physical button press confirmation on the tamper-resistant hardware token.\n\nShowcased on the national stage at GFF 2026 in Mumbai to fintech leaders and banking executives.',
      highlights: [
        '1st Place Winner at National PSB Hackathon',
        'Showcased at Global Fintech Fest (GFF) 2026 in Mumbai',
        'Engineered tamper-resistant hardware token with cryptographic handshake',
        'Configurable transaction threshold security with physical button confirmation'
      ],
      techStack: ['Hardware Token', 'IoT Security', 'Cryptography', 'React Native', 'Fraud Prevention'],
      externalLink: undefined,
      accentGlow: 'from-[#B8FF3D]/20 via-emerald-500/10 to-transparent'
    },
    {
      id: 'amity-innovation',
      title: 'Amity Innovation Cell Incubation',
      subtitle: 'Technology Developers — Educational Technology Platform',
      tag: 'Incubated Engineering',
      badgeColor: 'border-purple-500/40 bg-purple-500/10 text-purple-400',
      icon: Award,
      summary: 'Selected for formal incubation under Amity Innovation Cell to engineer interactive learning architectures and real-time student telemetry systems.',
      description: 'Collaborated directly with academic incubation teams to build an interactive digital education platform with modular content delivery, low-latency video streaming, formative comprehension checkpoints, and telemetry analytics for educators.',
      highlights: [
        'Selected for Amity Innovation Cell technology incubation',
        'Engineered modular content streaming with low-latency playback',
        'Automated student comprehension telemetry dashboards',
        'Demonstrated at university technological innovation showcase'
      ],
      techStack: ['Next.js', 'Node.js', 'MongoDB', 'WebSockets', 'Telemetry Analytics'],
      externalLink: 'https://amity.edu/innovation',
      accentGlow: 'from-purple-500/20 via-fuchsia-500/10 to-transparent'
    }
  ];

  // Core Engineering Disciplines & Leadership Roles (NO personal photos)
  const disciplines = [
    {
      monogram: 'SA',
      role: 'Systems Architecture & Full-Stack Rigor',
      focus: 'Distributed Web Platforms & Sub-Second Edge Infrastructure',
      description: 'Architecting scalable web applications using Next.js, TypeScript, and edge runtimes with strict 99+ Core Web Vitals guarantees and zero latency overhead.',
      badge: 'Architecture Lead',
      skills: ['Next.js / TypeScript', 'PostgreSQL / MongoDB', 'Cloudflare Edge', 'Clean Modular Code', 'REST & GraphQL APIs']
    },
    {
      id: 'sec',
      monogram: 'SEC',
      role: 'Security & Infrastructure Engineering',
      focus: 'Ethical Hacking, Cryptography & Application Hardening',
      description: 'Directing zero-trust access protocols, hardware authorization handshakes, vulnerability auditing, and automated containerized CI/CD deployments.',
      badge: 'Security Lead',
      skills: ['OWASP Hardening', 'Penetration Testing', 'JWT & Cryptography', 'Hardware Tokens', 'CI/CD Pipelines']
    },
    {
      id: 'growth',
      monogram: 'GA',
      role: 'Performance Growth & Search Signals',
      focus: 'Technical SEO, Semantic Entity Architecture & Global Indexing',
      description: 'Engineering international search authority, algorithmic crawl structures across 50+ markets, and multi-variant conversion rate optimization (CRO) engines.',
      badge: 'Growth Specialist',
      skills: ['Technical SEO Audits', 'Entity Clustering', 'GA4 Analytics', 'Conversion Funnels', 'Programmatic Media']
    },
    {
      id: 'mobile',
      monogram: 'ME',
      role: 'Mobile Ecosystems & Offline Sync',
      focus: 'Cross-Platform iOS & Android Native Architecture',
      description: 'Building fluid React Native mobile companions featuring offline-first SQLite persistence, biometric keychain security, and low-latency push notification pipelines.',
      badge: 'Mobile Specialist',
      skills: ['React Native / Expo', 'Offline-First SQLite', 'Biometric Security', 'Firebase Messaging', 'Native Gestures']
    }
  ];

  return (
    <div className="min-h-screen bg-[#050608] text-white selection:bg-[#B8FF3D] selection:text-black relative overflow-hidden">
      
      {/* Background Ambience Elements */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#19D5D0]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#B8FF3D]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[550px] h-[550px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-28 sm:pt-32 pb-16 lg:pb-24 relative z-10 space-y-24">
        
        {/* Hero Section */}
        <div className="max-w-3xl space-y-6">
          {/* Contextual Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono">
            <a
              href="/"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onBackToHome();
                }
              }}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </a>
            <span className="text-slate-600">/</span>
            <span className="text-white font-semibold">Team &amp; Honors</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19D5D0]/10 border border-[#19D5D0]/20 font-mono text-xs uppercase tracking-widest text-[#19D5D0]">
            <Sparkles className="w-3.5 h-3.5 text-[#B8FF3D]" />
            <span>VERIFIED PEDIGREE &amp; COLLECTIVE CRAFT</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05]">
            THE TEAM BEHIND THE SYSTEMS.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            We are an engineering-led collective of senior builders, systems architects, and growth specialists. We hold national hackathon championships, cybersecurity titles, and deep production track records—partnering directly with founders to eliminate agency bureaucracy and ship with speed and craft.
          </p>

          <div className="inline-block px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-xs uppercase tracking-wider text-[#B8FF3D] font-semibold">
            No Account Managers in the Middle · Senior Builders Only
          </div>
        </div>

        {/* Studio Benchmarks Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-[#0B0F17] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500" />
            <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">National Champion</p>
            <p className="font-display font-bold text-3xl sm:text-4xl text-white">SIH 2023</p>
            <p className="font-mono text-[11px] text-amber-400 mt-2">1st Place / 500+ Teams</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0F17] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
            <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Cybersecurity</p>
            <p className="font-display font-bold text-3xl sm:text-4xl text-white">1st Place</p>
            <p className="font-mono text-[11px] text-cyan-400 mt-2">Cybercubs Championship</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0F17] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8FF3D] to-emerald-500" />
            <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">FinTech Token</p>
            <p className="font-display font-bold text-3xl sm:text-4xl text-white">GFF 2026</p>
            <p className="font-mono text-[11px] text-[#B8FF3D] mt-2">PSB Hackathon Winner</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0F17] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-500" />
            <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Architecture</p>
            <p className="font-display font-bold text-3xl sm:text-4xl text-white">100%</p>
            <p className="font-mono text-[11px] text-purple-400 mt-2">Senior Hands-On Builders</p>
          </div>
        </div>

        {/* Section 1: National Achievements & Championships Showcase */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#19D5D0] font-semibold block mb-2">
                VERIFIED CREDENTIALS
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
                National Championships &amp; Honors
              </h2>
            </div>
            <p className="font-mono text-xs text-slate-400 max-w-md">
              Rigorous competitive engineering benchmarks independently verified by national judging panels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {achievements.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-[#0B0F17]/90 backdrop-blur-xl p-8 relative overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                >
                  {/* Accent glow corner */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.accentGlow}`} />

                  <div>
                    {/* Top Tag & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-wider font-bold border ${item.badgeColor}`}>
                        {item.tag}
                      </span>
                      <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <Icon size={20} className="text-[#B8FF3D]" />
                      </div>
                    </div>

                    <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                      {item.subtitle}
                    </p>

                    <h3 className="font-display font-bold text-2xl text-white mb-4 group-hover:text-[#19D5D0] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Highlights bullet points */}
                    <div className="space-y-2.5 mb-8 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 size={15} className="text-[#B8FF3D] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack and links */}
                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {item.techStack.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-[11px] text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {item.externalLink && (
                      <a
                        href={item.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-[#19D5D0] hover:text-[#B8FF3D] transition-colors font-semibold"
                      >
                        <span>Official Portal</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Core Engineering Disciplines (NO personal pictures) */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B8FF3D] font-semibold block mb-2">
                COLLECTIVE CAPABILITIES
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
                Engineering Disciplines &amp; Focus
              </h2>
            </div>
            <p className="font-mono text-xs text-slate-400 max-w-md">
              Specialized senior engineers leading direct implementation on every Xelox partnership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {disciplines.map((item, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-3xl border border-white/10 bg-[#0B0F17]/90 backdrop-blur-xl relative overflow-hidden group hover:border-[#19D5D0]/40 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    {/* Abstract Monogram Avatar (NO personal photo) */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 flex items-center justify-center font-mono font-extrabold text-sm text-[#B8FF3D] shadow-inner group-hover:border-[#B8FF3D]/50 transition-colors">
                      {item.monogram}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-white group-hover:text-[#19D5D0] transition-colors">
                        {item.role}
                      </h3>
                      <p className="font-mono text-xs text-slate-400 mt-0.5">
                        {item.focus}
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] uppercase tracking-wider text-slate-300">
                    {item.badge}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-white/10">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
                    Core Technical Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Transparency Manifesto */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0B0F17] via-[#0D121F] to-[#050608] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#19D5D0]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#19D5D0] font-semibold block">
              STUDIO PHILOSOPHY
            </span>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Why We Keep the Crew Lean &amp; Senior.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              <p>
                Traditional digital agencies charge massive overhead for account executives, junior apprentices, and bureaucratic layers that dilute the vision between founder and codebase.
              </p>
              <p>
                At Xelox Solutions, the people presenting the architecture are the exact builders writing the code. We ship faster, catch technical bottlenecks earlier, and deliver verified production outcomes across web, mobile, and growth channels.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="/service-inquiry"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    if (onStartProject) onStartProject();
                    else onBackToHome();
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B8FF3D] text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#a6ec32] transition-colors shadow-[0_0_24px_rgba(184,255,61,0.3)]"
              >
                <span>Initiate Project Brief</span>
                <ArrowRight size={14} />
              </a>

              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                <MessageCircle size={15} className="text-[#B8FF3D]" />
                <span>Direct WhatsApp Fast-Lane</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050608] py-10 px-6 lg:px-12 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Xelox Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="/"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onBackToHome();
                }
              }}
              className="hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="/service-inquiry"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  if (onStartProject) onStartProject();
                  else onBackToHome();
                }
              }}
              className="hover:text-white transition-colors"
            >
              Start a Project
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
