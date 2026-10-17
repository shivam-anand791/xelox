import { Compass, Home, Layers, Sparkles, Terminal, Trophy } from 'lucide-react';

interface NotFoundPageProps {
  currentPath?: string;
  onNavigate: (page: string) => void;
}

export default function NotFoundPage({ currentPath = typeof window !== 'undefined' ? window.location.pathname : '', onNavigate }: NotFoundPageProps) {
  const quickLinks = [
    { label: 'Homepage', path: '/', page: 'home', icon: Home, desc: 'Return to agency overview and core pillars' },
    { label: 'Selected Work', path: '/work', page: 'work', icon: Layers, desc: 'Browse verified client production platforms' },
    { label: 'Capabilities & Services', path: '/services', page: 'services', icon: Sparkles, desc: 'Explore Web, Mobile & Performance packages' },
    { label: 'Team & Honors', path: '/team', page: 'team', icon: Trophy, desc: 'View national championships & engineering leads' }
  ];

  return (
    <div className="min-h-screen bg-[#F6F6F2] dark:bg-[#050608] x-pattern relative text-dark dark:text-white transition-colors duration-300 flex flex-col justify-between">
      {/* Main 404 Content */}
      <main className="max-w-4xl mx-auto px-6 lg:px-12 pt-32 sm:pt-40 pb-20 relative z-10 flex-1 flex flex-col items-center justify-center text-center">
        {/* Eyebrow Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 font-mono text-xs uppercase tracking-widest mb-6">
          <Terminal className="w-3.5 h-3.5" />
          <span>HTTP 404 // ROUTE NOT FOUND</span>
        </div>

        {/* Big Glitch / Mono Title */}
        <h1 className="font-display font-extrabold text-6xl sm:text-7xl lg:text-8xl tracking-tight text-dark dark:text-white mb-4">
          4<span className="text-[#19D5D0]">0</span>4
        </h1>

        <h2 className="font-display font-bold text-2xl sm:text-3xl text-dark dark:text-white mb-4">
          PAGE NOT FOUND
        </h2>

        <p className="text-sm sm:text-base text-gray-700 dark:text-slate-300 max-w-lg mb-6 leading-relaxed">
          The requested route <code className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-xs text-red-600 dark:text-red-400 font-bold">{currentPath || 'this route'}</code> does not exist on this server, has been relocated, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => onNavigate('home')}
            className="btn-primary inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-6 py-3"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Go to Homepage</span>
          </button>
          <button
            onClick={() => onNavigate('work')}
            className="btn-outline inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider px-6 py-3"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Browse Work</span>
          </button>
        </div>

        {/* Helpful Destinations Box */}
        <div className="w-full text-left bg-white/70 dark:bg-[#0B0F17]/80 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-sm">
          <span className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-slate-400 block mb-4">
            VERIFIED DIRECT ROUTES
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className="flex items-start gap-3 p-4 rounded-xl border border-black/5 dark:border-white/5 hover:border-[#19D5D0]/40 bg-white/50 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 text-left transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#19D5D0]/10 border border-[#19D5D0]/20 text-[#19D5D0] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-dark dark:text-white group-hover:text-[#19D5D0] transition-colors flex items-center gap-2">
                      <span>{item.label}</span>
                      <span className="font-mono text-[10px] text-gray-400 font-normal">{item.path}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-400 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 dark:border-white/10 py-8 px-6 text-center text-xs font-mono text-gray-500 dark:text-slate-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} Xelox Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
}
