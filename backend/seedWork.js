import Work from './models/Work.js';
import connectDB from './config/db.js';
import './config/env.js';

const seedWorkData = async () => {
  try {
    await connectDB();
    
    // Clear existing work data
    await Work.deleteMany({});
    console.log('Cleared existing work data');

    // Seed data structured strictly around verified production client platforms
    const workItems = [
      // 0. Client Platform: LaptopMitra
      {
        title: 'LaptopMitra — Hardware Platform & Marketplace',
        subtitle: 'Website Design & Development',
        description: 'Engineered a full-scale B2B/B2C marketplace and catalogue portal for certified pre-owned and refurbished laptops. Built with Next.js, modern typography, dynamic product purpose categorization (Coding, Business, Student, Gaming), and an instant corporate quotation pipeline.\n\nKey execution components:\n- Comprehensive 32-point inspection badge showcase establishing buyer trust\n- Bulk order corporate procurement flow with custom quote dispatch\n- Pan-India logistics coverage integration and warranty verification\n- High-conversion mobile-first responsive architecture',
        shortDescription: 'India\'s verified refurbished laptop marketplace and corporate procurement platform with 32-point inspection guarantee.',
        category: 'web-development',
        image: '/portfolio/laptopmitra-homepage.webp',
        tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Hardware Marketplace', 'B2B Procurement'],
        achievements: [
          '32-point hardware inspection certified badging system',
          'Bulk corporate quote request flow with real-time dispatch',
          'Pan-India delivery integration across all major metropolitan hubs',
          'Sub-second page speeds with 99+ Core Web Vitals optimization'
        ],
        links: [
          { title: 'Visit Live Website', url: 'https://laptop-mitra.vercel.app/' }
        ],
        order: 0,
        isActive: true
      },

      // 1. Client Platform: Adorca 360
      {
        title: 'Adorca 360 — Performance Growth Studio',
        subtitle: 'Digital Marketing & Growth',
        description: 'Architected and developed the global platform for Adorca 360, a performance marketing studio. Integrates an algorithmic search signal crawl architecture, semantic entity clustering for multi-region organic dominance, and an interactive real-time client Growth Diagnostic engine across 50+ international markets.\n\nCore capabilities delivered:\n- Interactive Signal Architecture telemetry visualizing search, intent, acquisition, and compounding revenue\n- Multi-region international market indexation covering 50+ global search ecosystems\n- 100% transparent client attribution with zero proprietary data lock-in\n- High-velocity dark-mode aesthetic with custom SVG interactive diagrams',
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
        links: [
          { title: 'Visit Live Website', url: 'https://adorca.vercel.app/' }
        ],
        order: 1,
        isActive: true
      },

      // 2. Client Platform: Tourist Palace
      {
        title: 'Tourist Palace — Hotel & Room Booking Portal',
        subtitle: 'Website Design & Development',
        description: 'Designed and deployed a modern hotel reservation and direct room booking platform for Tourist Palace Hotel in Mahipalpur near Delhi Airport & Aerocity. Eliminates third-party OTA middleman commissions through direct WhatsApp room inquiries and verified room showcase galleries.\n\nKey features engineered:\n- High-fidelity visual showcase of Deluxe Double AC rooms, amenities, and transit distance badges (5 min from T1/T2/T3, Aerocity Metro)\n- Zero-friction one-tap WhatsApp concierge booking channel\n- Multilingual transit traveler guides with interactive directions and airport transfer assistance\n- Responsive mobile booking layout optimized for travelers on the go',
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
        links: [
          { title: 'Visit Live Website', url: 'https://touristpalace.vercel.app/' }
        ],
        order: 2,
        isActive: true
      },

      // 3. Client Platform: eSailor
      {
        title: 'eSailor — Global B2B Jute Trade & Export Portal',
        subtitle: 'Website Design & Development',
        description: 'Engineered an international trade and B2B export flagship for eSailor, an established manufacturer and global exporter of sustainable jute bags, tote bags, shopping bags, and industrial burlap sacks.\n\nKey deliverables:\n- International buyer trust system highlighting RCMC, IEC, GST, and Udyam trade accreditations\n- Direct B2B wholesale quotation flow tailored for container-load and custom branding requests\n- High-resolution product catalogue PDF downloads with instant spec sheets\n- Export credibility metrics highlighting 50+ countries served and 2M+ bags/month manufacturing capacity',
        shortDescription: 'International B2B manufacturing and export platform for sustainable jute products with verified trade accreditations.',
        category: 'web-development',
        image: '/portfolio/esailor-homepage.webp',
        tags: ['B2B Export', 'Global Trade', 'Next.js', 'Catalogue Engine', 'Industrial Packaging', 'Sustainability'],
        achievements: [
          'Verified international trade accreditations (RCMC, IEC, GST, Udyam)',
          'Global B2B wholesale quotation inquiry dispatch pipeline',
          'One-click high-resolution product catalogue PDF downloads',
          'Serving international wholesale buyers across 50+ countries'
        ],
        links: [
          { title: 'Visit Live Website', url: 'https://esailor-ectg.vercel.app/' }
        ],
        order: 3,
        isActive: true
      },

      // 4. Client Platform: Properties Professor
      {
        title: 'Properties Professor — Premium Real Estate Portal',
        subtitle: 'Website Design & Development',
        description: 'Engineered a modern Indian property discovery engine featuring verified luxury residential and commercial listings across Mumbai, Bangalore, and Gurgaon. Equipped with multi-city search filters, transparent INR pricing valuations, and direct broker contact channels.\n\nArchitectural highlights:\n- Interactive location search with voice input, city switching, and buy/rent/commercial toggles\n- Verified property badges with transparent INR crore valuations (e.g. Bandra West, Whitefield, DLF Cyber City)\n- Direct high-intent consultation lead generation pipeline with instant broker callouts\n- Mobile-responsive layout for property seekers on smartphone devices',
        shortDescription: 'Verified real estate discovery and luxury property marketplace with multi-city search and transparent pricing.',
        category: 'web-development',
        image: '/portfolio/properties-professor-homepage.webp',
        tags: ['Real Estate', 'Next.js', 'Verified Listings', 'Property Valuation', 'Interactive Maps', 'FinTech/PropTech'],
        achievements: [
          'Multi-city search filters across Mumbai, Bangalore, and Gurgaon',
          'Verified property badges with transparent INR crore valuations',
          'Residential and commercial multi-category filtering',
          'Direct high-intent consultation lead generation pipeline'
        ],
        links: [
          { title: 'Visit Live Website', url: 'https://propertiesprofessor.com/' }
        ],
        order: 4,
        isActive: true
      }
    ];

    const result = await Work.insertMany(workItems);
    console.log(`✅ Successfully seeded ${result.length} work items`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding work data:', error);
    process.exit(1);
  }
};

seedWorkData();