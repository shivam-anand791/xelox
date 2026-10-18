import Work from './models/Work.js';
import connectDB from './config/db.js';
import './config/env.js';

const seedWorkData = async () => {
  try {
    await connectDB();
    
    // Clear existing work data
    await Work.deleteMany({});
    console.log('Cleared existing work data');

    // Seed data structured strictly around verified production client platforms,
    // genuine mobile prototypes, and authentic national engineering honors
    const workItems = [
      // 0. E-Commerce & Marketplace: LaptopMitra
      {
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
          'Sub-second page speeds with 99+ Core Web Vitals target',
          'Pan-India delivery integration across all major metropolitan hubs'
        ],
        links: [
          { title: 'Visit Live Website', url: 'https://laptop-mitra.vercel.app/' }
        ],
        order: 0,
        isActive: true
      },

      // 1. Digital Marketing & Platform: Adorca 360
      {
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
        links: [
          { title: 'Visit Live Website', url: 'https://adorca.vercel.app/' }
        ],
        order: 1,
        isActive: true
      },

      // 2. Hospitality Web Platform: Tourist Palace
      {
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
        links: [
          { title: 'Visit Live Website', url: 'https://touristpalace.vercel.app/' }
        ],
        order: 2,
        isActive: true
      },

      // 3. Global B2B Trade & Export: eSailor
      {
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

      // 4. Real Estate Portal: Properties Professor
      {
        title: 'Properties Professor — Indian Real Estate Discovery Portal',
        subtitle: 'Property Discovery Engine & Consultation Portal',
        description: `Project Context:
Properties Professor is an Indian real estate discovery portal showcasing verified residential apartments, luxury villas, and commercial spaces across Mumbai, Bangalore, and Gurgaon.

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
        tags: ['Real Estate', 'Next.js', 'Verified Listings', 'Property Valuation', 'Interactive Maps', 'PropTech'],
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
      },

      // 5. Mobile App Engineering: Cross-Platform Architecture Prototype
      {
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
        links: [],
        order: 5,
        isActive: true
      },

      // 6. National Honor: Smart India Hackathon 2023 Winner
      {
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
        links: [
          { title: 'Competition Archive', url: 'https://sih.gov.in' }
        ],
        order: 6,
        isActive: true
      },

      // 7. National Honor: Cybercubs Championship
      {
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
        links: [
          { title: 'Competition Archive', url: 'https://cybercubs.org' }
        ],
        order: 7,
        isActive: true
      },

      // 8. National Honor: PSB Hackathon Winner & GFF '26 Mumbai
      {
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
        links: [],
        order: 8,
        isActive: true
      }
    ];

    const result = await Work.insertMany(workItems);
    console.log(`✅ Successfully seeded ${result.length} audited work items`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding work data:', error);
    process.exit(1);
  }
};

seedWorkData();