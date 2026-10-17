import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Store, 
  Building2, 
  Rocket, 
  ShieldCheck
} from 'lucide-react';

export interface PricingPackage {
  id: string;
  name: string;
  badge?: string;
  eyebrow: string;
  price: string;
  billingLabel: string;
  billingFrequency?: string;
  shortDescription: string;
  idealFor: string;
  ctaText: string;
  isPopular?: boolean;
  category: string;
  features: string[];
}

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'starter-presence',
    name: 'Starter Presence',
    eyebrow: 'FOUNDATIONAL PRESENCE',
    price: '₹5,000–₹12,000',
    billingLabel: 'One-time setup',
    shortDescription: 'Everything a small business needs to establish a professional online presence.',
    idealFor: 'Small shops, local service providers, and new businesses.',
    ctaText: 'Get Started',
    category: 'web-development',
    features: [
      'Simple, mobile-friendly business website',
      'Domain and hosting setup assistance',
      'WhatsApp contact button and enquiry form',
      'Basic on-page SEO',
      'Google Business Profile setup or optimisation'
    ]
  },
  {
    id: 'business-growth',
    name: 'Business Growth',
    eyebrow: 'EXPANSION & SCALE',
    badge: 'Most Popular',
    isPopular: true,
    price: '₹15,000–₹35,000',
    billingLabel: 'One-time setup · Optional monthly services',
    shortDescription: 'A stronger digital presence designed to help established businesses attract and manage more enquiries.',
    idealFor: 'Established businesses that want more enquiries.',
    ctaText: 'Grow My Business',
    category: 'web-development',
    features: [
      'Custom multi-page website',
      'Professional branding elements',
      'Local SEO foundations',
      'Analytics and Google Search Console setup',
      'Lead capture and enquiry tracking',
      'Social media profile setup'
    ]
  },
  {
    id: 'digital-growth-partner',
    name: 'Digital Growth Partner',
    eyebrow: 'RECURRING ACCELERATION',
    price: '₹8,000–₹25,000',
    billingLabel: 'Per month · Recurring service contract',
    billingFrequency: '/month',
    shortDescription: 'Ongoing digital marketing, website optimisation, and performance improvements to support long-term business growth.',
    idealFor: 'Businesses that want ongoing digital support.',
    ctaText: 'Become a Growth Partner',
    category: 'digital-marketing',
    features: [
      'Website maintenance',
      'SEO and content updates',
      'Social media content management',
      'Monthly performance reports',
      'Lead generation improvements',
      'Basic automation and conversion optimisation'
    ]
  }
];

interface PricingSectionProps {
  onSelectPackage?: (packageName: string, category?: string) => void;
  className?: string;
  showHeader?: boolean;
}

export default function PricingSection({
  onSelectPackage,
  className = '',
  showHeader = true
}: PricingSectionProps) {
  const handleCtaClick = (pkg: PricingPackage) => {
    if (onSelectPackage) {
      onSelectPackage(pkg.name, pkg.category);
    } else {
      const contactEl = document.querySelector('#contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      id="pricing"
      className={`bg-[#F6F6F2] dark:bg-[#050608] text-dark dark:text-white py-24 px-6 lg:px-12 relative overflow-hidden transition-colors border-t border-black/5 dark:border-white/5 ${className}`}
    >
      {/* Background Ambience Elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#19D5D0]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-[#B8FF3D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        {showHeader && (
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-400/30 text-cyan-700 dark:text-cyan-400 font-mono text-xs uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              TRANSPARENT PRICING &amp; SERVICE PACKAGES
            </div>

            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-dark dark:text-white mb-6 max-w-4xl leading-[1.05]">
              PREDICTABLE INVESTMENT. <span className="text-cyan-600 dark:text-cyan-400">CLEAR OUTCOMES</span>.
            </h2>

            <p className="text-base sm:text-lg text-gray-700 dark:text-slate-300 max-w-3xl leading-relaxed">
              Clear, transparent service packages tailored for every stage of growth—from launching your first professional website to scaling customer enquiries and securing full-stack ongoing digital execution.
            </p>
          </div>
        )}

        {/* Pricing Cards Grid: 3 aligned cards on desktop, vertically stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PACKAGES.map((pkg) => {
            const isPopular = Boolean(pkg.isPopular);

            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-3xl p-7 sm:p-9 transition-all duration-300 relative group ${
                  isPopular
                    ? 'bg-white dark:bg-[#111827] border-2 border-cyan-500/60 dark:border-lime/50 shadow-2xl ring-1 ring-cyan-500/20 dark:ring-lime/20 lg:-translate-y-2'
                    : 'bg-white dark:bg-[#111827] border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Popular / Recommended Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 right-6 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider bg-lime text-dark shadow-md border border-lime/40">
                      <Sparkles className="w-3 h-3 text-dark" />
                      {pkg.badge || 'Most Popular'}
                    </span>
                  </div>
                )}

                {/* Top Section: Package Info & Price */}
                <div>
                  {/* Eyebrow Category */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold">
                      {pkg.eyebrow}
                    </span>
                    {pkg.id === 'starter-presence' && <Store className="w-4 h-4 text-gray-400 dark:text-slate-500" />}
                    {pkg.id === 'business-growth' && <Building2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />}
                    {pkg.id === 'digital-growth-partner' && <Rocket className="w-4 h-4 text-emerald-600 dark:text-lime" />}
                  </div>

                  {/* Package Name */}
                  <h3 className="font-display font-bold text-2xl text-dark dark:text-white mb-3">
                    {pkg.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed mb-6 min-h-[40px]">
                    {pkg.shortDescription}
                  </p>

                  {/* Price Block */}
                  <div className="pb-6 border-b border-black/5 dark:border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-dark dark:text-white">
                        {pkg.price}
                      </span>
                      {pkg.billingFrequency && (
                        <span className="font-mono text-sm text-gray-500 dark:text-slate-400 font-semibold">
                          {pkg.billingFrequency}
                        </span>
                      )}
                    </div>
                    {/* Billing Model Label immediately below price */}
                    <div className="mt-2">
                      <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-emerald-700 dark:text-[#B8FF3D] font-bold">
                        {pkg.billingLabel}
                      </span>
                    </div>
                  </div>

                  {/* Ideal For Callout */}
                  <div className="my-6 p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold block mb-1">
                      Ideal For
                    </span>
                    <p className="text-xs text-dark/90 dark:text-slate-300 font-medium leading-relaxed">
                      {pkg.idealFor}
                    </p>
                  </div>

                  {/* Included Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-slate-400 font-bold block">
                      Included Features
                    </span>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-dark/90 dark:text-slate-300 leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-lime shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Section: Action CTA Button */}
                <div className="pt-4 border-t border-black/5 dark:border-white/10">
                  <button
                    onClick={() => handleCtaClick(pkg)}
                    className={`w-full py-3.5 px-5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 flex items-center justify-center gap-2 group ${
                      isPopular
                        ? 'btn-primary shadow-lg hover:shadow-lime/25'
                        : 'border border-dark/80 text-dark hover:bg-dark hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-dark'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-[10px] font-mono text-center text-gray-500 dark:text-slate-400 mt-2.5">
                    {pkg.id === 'digital-growth-partner' ? 'Cancel or adjust anytime · Monthly reviews' : 'Direct senior engineer partnership · No hidden fees'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Assurance Banner */}
        <div className="mt-14 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-400/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-dark dark:text-white">
                Transparent Delivery Guarantee
              </h4>
              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed mt-0.5">
                Every package includes direct founder/senior builder collaboration, complete ownership of all created assets and code repositories, and zero proprietary lock-in.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (onSelectPackage) {
                onSelectPackage('Business Growth', 'web-development');
              } else {
                const contactEl = document.querySelector('#contact');
                if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="shrink-0 text-xs font-mono uppercase tracking-wider font-bold text-cyan-600 hover:text-dark dark:text-cyan-400 dark:hover:text-lime inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Have custom enterprise requirements? Talk to us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
