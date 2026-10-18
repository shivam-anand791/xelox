import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Mail,
  Send,
  Instagram,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { contactApi } from '../lib/api';
import { XeloxLogo } from '../components/XeloxLogo';
import { siteConfig } from '../config/siteConfig';

export default function ContactSection({ onNavigate }: { onNavigate?: (page: string, category?: string) => void }) {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Website Design & Development',
    budget: '₹15,000–₹35,000',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await contactApi.submit(formData);
      if (response.success) {
        toast.success(response.message || 'Inquiry submitted! A senior engineer will review your brief within 24 hours.');
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          service: 'Website Design & Development',
          budget: '₹15,000–₹35,000',
          message: ''
        });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try WhatsApp or email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavClick = (page: string, category?: string) => {
    if (onNavigate) {
      onNavigate(page, category);
      window.scrollTo(0, 0);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: string, category?: string) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    handleNavClick(page, category);
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-[#050608] text-white pt-24 pb-12 relative overflow-hidden border-t border-white/5"
    >
      {/* Background Ambience Elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#19D5D0]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[450px] h-[450px] bg-[#B8FF3D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Positioning & Direct Founder Channels (5 Cols) */}
          <div className="lg:col-span-5">
            {/* Eyebrow Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#19D5D0]/10 border border-[#19D5D0]/20 text-[#19D5D0] font-mono text-xs uppercase tracking-widest mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#19D5D0] animate-pulse" />
              INITIATE AN ENGAGEMENT
            </div>

            <h2
              className={`font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-white mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: '100ms' }}
            >
              LET'S BUILD SOMETHING EXTRAORDINARY.
            </h2>

            <p
              className={`text-base sm:text-lg text-slate-300 mb-10 leading-relaxed transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: '150ms' }}
            >
              Direct partnership with senior builders. Whether you need a high-converting web flagship, a scalable mobile app, or a full-funnel growth engine—we eliminate agency bloat and ship with velocity.
            </p>

            {/* Direct Connect Channels */}
            <div
              className={`space-y-4 mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: '250ms' }}
            >
              {/* WhatsApp Fast Lane */}
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#25D366]/40 transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#25D366] block">
                      FOUNDER FAST-LANE
                    </span>
                    <span className="font-display font-semibold text-white text-sm sm:text-base group-hover:text-[#25D366] transition-colors">
                      {siteConfig.contact.whatsappNumber}
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-white/40 group-hover:text-white transition-colors" />
              </a>

              {/* Email Direct */}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#19D5D0]/40 transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#19D5D0]/10 border border-[#19D5D0]/20 flex items-center justify-center text-[#19D5D0]">
                    <Mail size={22} />
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#19D5D0] block">
                      PROJECT INQUIRIES & RFPS
                    </span>
                    <span className="font-display font-semibold text-white text-sm sm:text-base group-hover:text-[#19D5D0] transition-colors">
                      {siteConfig.contact.email}
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-white/40 group-hover:text-white transition-colors" />
              </a>

              {/* Timezone / Availability */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3.5 text-slate-400">
                <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-slate-300">
                  <Clock size={20} />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block">
                    TIMEZONE & RESPONSE SLA
                  </span>
                  <span className="font-display text-sm text-slate-300">
                    Remote Studio • IST (UTC+5:30) • Rapid response under 24h
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Engineering Assurance */}
            <div className="p-4 rounded-2xl bg-[#19D5D0]/5 border border-[#19D5D0]/15 flex items-center gap-3 text-xs font-mono text-[#19D5D0]">
              <ShieldCheck size={18} className="shrink-0" />
              <span>Direct Engineer Review • NDA Compliant • No Marketing Spam</span>
            </div>
          </div>

          {/* Right Column: High-Craft Inquiry Form (7 Cols) */}
          <div
            className={`lg:col-span-7 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="bg-[#0B0F17]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-7 sm:p-10 shadow-[0_24px_64px_rgba(0,0,0,0.6)] relative overflow-hidden">

              {/* Form Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    Project Brief
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Fill out the scope below to receive a direct engineering evaluation.
                  </p>
                </div>
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
                  <Sparkles size={13} className="text-[#B8FF3D]" />
                  <span>Senior builders only</span>
                </div>
              </div>

              {isSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-[#B8FF3D]/10 border border-[#B8FF3D]/30 text-white flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#B8FF3D] shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold text-[#B8FF3D]">Inquiry Successfully Dispatched</p>
                    <p className="text-slate-300 mt-0.5">We've logged your project requirements. A senior builder will review the brief and contact you within 24–48 hours.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Your Name / Company <span className="text-[#B8FF3D]">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Saurabh Kumar (Founder)"
                      required
                      className="w-full bg-[#121722] border border-slate-700/60 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#B8FF3D] focus:ring-2 focus:ring-[#B8FF3D]/25 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Work Email <span className="text-[#B8FF3D]">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      required
                      className="w-full bg-[#121722] border border-slate-700/60 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#B8FF3D] focus:ring-2 focus:ring-[#B8FF3D]/25 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Row 2: Service Needed & Budget Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Service Pillar <span className="text-[#B8FF3D]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="contact-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-[#121722] border border-slate-700/60 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B8FF3D] focus:ring-2 focus:ring-[#B8FF3D]/25 transition-all text-sm appearance-none cursor-pointer pr-10"
                      >
                        <option value="Website Design & Development" className="bg-[#121722] text-white">
                          Website Design & Development
                        </option>
                        <option value="Mobile App Design & Development" className="bg-[#121722] text-white">
                          Mobile App Design & Development
                        </option>
                        <option value="Digital Marketing & Growth" className="bg-[#121722] text-white">
                          Digital Marketing & Growth
                        </option>
                        <option value="Package: Starter Presence (₹5,000–₹12,000)" className="bg-[#121722] text-white">
                          Package: Starter Presence (₹5,000–₹12,000)
                        </option>
                        <option value="Package: Business Growth (₹15,000–₹35,000)" className="bg-[#121722] text-white">
                          Package: Business Growth (₹15,000–₹35,000)
                        </option>
                        <option value="Package: Digital Growth Partner (₹8,000–₹25,000/mo)" className="bg-[#121722] text-white">
                          Package: Digital Growth Partner (₹8,000–₹25,000/mo)
                        </option>
                        <option value="Full-Funnel Solution (Web + Mobile + Growth)" className="bg-[#121722] text-white">
                          Full-Funnel (Web + Mobile + Growth)
                        </option>
                        <option value="Technical Advisory / Custom AI" className="bg-[#121722] text-white">
                          Technical Advisory / Custom AI
                        </option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-budget" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Estimated Budget <span className="text-[#B8FF3D]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="contact-budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#121722] border border-slate-700/60 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B8FF3D] focus:ring-2 focus:ring-[#B8FF3D]/25 transition-all text-sm appearance-none cursor-pointer pr-10"
                      >
                        <option value="₹5,000–₹12,000" className="bg-[#121722] text-white">₹5,000–₹12,000 (Starter Presence)</option>
                        <option value="₹15,000–₹35,000" className="bg-[#121722] text-white">₹15,000–₹35,000 (Business Growth)</option>
                        <option value="₹8,000–₹25,000/month" className="bg-[#121722] text-white">₹8,000–₹25,000 / month (Digital Growth Partner)</option>
                        <option value="₹35,000–₹75,000" className="bg-[#121722] text-white">₹35,000–₹75,000 (Custom Web & App Platform)</option>
                        <option value="₹75,000–₹1,50,000" className="bg-[#121722] text-white">₹75,000–₹1,50,000 (Full-Stack / AI Solution)</option>
                        <option value="₹1,50,000+" className="bg-[#121722] text-white">₹1,50,000+ (Enterprise / Scale)</option>
                        <option value="Flexible / Let's Discuss" className="bg-[#121722] text-white">Flexible / Let's Discuss</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Row 3: Project Brief Textarea */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Project Brief & Objectives <span className="text-[#B8FF3D]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about what you're launching, key deliverables, target deadline, or current technical bottlenecks..."
                    rows={4}
                    required
                    className="w-full bg-[#121722] border border-slate-700/60 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#B8FF3D] focus:ring-2 focus:ring-[#B8FF3D]/25 transition-all text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#B8FF3D] hover:bg-[#a3e635] text-[#050608] font-display font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(184,255,61,0.25)] hover:shadow-[0_14px_40px_rgba(184,255,61,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Transmit Project Brief</span>
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-500 font-mono">
                  ⚡ Strictly confidential. We never share emails or project scopes.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* =========================================================================
            COMPREHENSIVE HIGH-CRAFT FOOTER
        ========================================================================= */}
        <footer
          className={`mt-24 pt-16 border-t border-white/10 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          style={{ transitionDelay: '400ms' }}
        >
          {/* Main 4-Column Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/5">

            {/* Col 1: Brand & Studio Status (5 Cols) */}
            <div className="lg:col-span-5 pr-0 lg:pr-8">
              <div className="flex items-center gap-3 mb-4">
                <a
                  href="/"
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="flex shrink-0 items-center hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF3D] rounded-lg"
                  aria-label="Xelox Solutions homepage"
                >
                  <XeloxLogo theme="dark" className="h-9 sm:h-10 w-auto" />
                </a>
                <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  DIGITAL AGENCY
                </span>
              </div>

              <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-sm">
                Craft digital agency engineering high-performance web platforms, mobile applications, and growth systems for ambitious businesses worldwide.
              </p>

              {/* Realtime Availability Badge */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#B8FF3D] animate-ping" />
                <span>Available for Select Q2/Q3 Projects</span>
              </div>
            </div>

            {/* Col 2: Core Capabilities (3 Cols) */}
            <div className="lg:col-span-3">
              <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300 mb-5 font-semibold">
                Capabilities
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <a
                    href="/services"
                    onClick={(e) => handleLinkClick(e, 'services')}
                    className="hover:text-[#B8FF3D] transition-colors text-left block"
                  >
                    Digital Marketing &amp; Growth
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    onClick={(e) => handleLinkClick(e, 'services')}
                    className="hover:text-[#19D5D0] transition-colors text-left block"
                  >
                    Website Design &amp; Development
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    onClick={(e) => handleLinkClick(e, 'services')}
                    className="hover:text-[#B8FF3D] transition-colors text-left block"
                  >
                    Mobile App Development
                  </a>
                </li>
                <li>
                  <a
                    href="/work"
                    onClick={(e) => handleLinkClick(e, 'work')}
                    className="hover:text-white transition-colors text-left block"
                  >
                    Innovation &amp; Prototyping
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Studio & Navigation (2 Cols) */}
            <div className="lg:col-span-2">
              <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300 mb-5 font-semibold">
                Studio
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <a
                    href="#about"
                    onClick={(e) => handleAnchorClick(e, '#about')}
                    className="hover:text-white transition-colors"
                  >
                    About Studio
                  </a>
                </li>
                <li>
                  <a
                    href="/work"
                    onClick={(e) => handleLinkClick(e, 'work')}
                    className="hover:text-white transition-colors text-left block"
                  >
                    Selected Work
                  </a>
                </li>
                <li>
                  <a
                    href="/pricing"
                    onClick={(e) => handleLinkClick(e, 'pricing')}
                    className="hover:text-white transition-colors text-left block"
                  >
                    Pricing Packages
                  </a>
                </li>
                <li>
                  <a
                    href="/team"
                    onClick={(e) => handleLinkClick(e, 'team')}
                    className="hover:text-white transition-colors text-left block"
                  >
                    Team &amp; Honors
                  </a>
                </li>
                <li>
                  <a
                    href="#process"
                    onClick={(e) => handleAnchorClick(e, '#process')}
                    className="hover:text-white transition-colors"
                  >
                    How We Work
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => handleAnchorClick(e, '#contact')}
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Connect & Direct Channels (2 Cols) */}
            <div className="lg:col-span-2">
              <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300 mb-5 font-semibold">
                Connect
              </h4>
              <div className="space-y-3 text-sm text-slate-400">
                <a
                  href={siteConfig.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 hover:text-[#19D5D0] transition-colors"
                >
                  <span>Email Direct</span>
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href={siteConfig.contact.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-pink-400 transition-colors"
                >
                  <Instagram size={14} />
                  <span>Instagram</span>
                </a>
                <div className="flex items-center gap-2 text-slate-600 font-mono text-xs cursor-default">
                  <span>LinkedIn [SOON]</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Legal */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <p>
              © 2026 {siteConfig.name}. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="/privacy"
                onClick={(e) => handleLinkClick(e, 'privacy')}
                className="hover:text-slate-300 transition-colors"
              >
                Privacy Policy
              </a>
              <span>•</span>
              <a
                href="/terms"
                onClick={(e) => handleLinkClick(e, 'terms')}
                className="hover:text-slate-300 transition-colors"
              >
                Terms of Service
              </a>
              <span>•</span>
              <a
                href="/admin-login"
                onClick={(e) => handleLinkClick(e, 'admin-login')}
                className="hover:text-[#19D5D0] transition-colors"
              >
                Studio Portal
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
