import Work from './models/Work.js';
import connectDB from './config/db.js';
import './config/env.js';

const seedWorkData = async () => {
  try {
    await connectDB();
    
    // Clear existing work data
    await Work.deleteMany({});
    console.log('Cleared existing work data');

    // Seed data structured around Xelox Solutions 3 Core Pillars + Innovation Credentials
    const workItems = [
      // 1. Web Development Case Study
      {
        title: 'Modern E-Commerce Web Flagship',
        subtitle: 'Website Design & Development',
        description: 'Engineered a bespoke headless e-commerce web platform built with Next.js, TypeScript, and Tailwind CSS. The platform features sub-second page transitions, dynamic state management, custom checkout integration, and full WCAG AA accessibility compliance.\n\nKey architectural pillars:\n- Headless CMS architecture for real-time inventory and editorial control\n- Optimized Core Web Vitals achieving 99+ Lighthouse performance\n- Responsive design tested across 15+ device viewports\n- Automated CI/CD deployment pipelines on Vercel',
        shortDescription: 'Custom headless commerce platform built with Next.js & TypeScript, engineered for sub-second performance.',
        category: 'web-development',
        image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1779460343/ChatGPT_Image_May_22_2026_07_43_23_PM_gvldqm.png',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Headless CMS', 'Vercel'],
        achievements: [
          'Sub-second page load speeds across all global edge nodes',
          '99+ Google Lighthouse performance score',
          'Responsive cross-device testing across 15+ screen sizes',
          'Secure payment gateway integration'
        ],
        links: [
          { title: 'Technical Architecture', url: 'https://github.com/xelox-solutions/web-architecture' }
        ],
        order: 1,
        isActive: true
      },

      // 2. Mobile App Case Study
      {
        title: 'Multi-Platform Mobile Companion',
        subtitle: 'Mobile App Design & Development',
        description: 'Architected an intuitive, high-performance cross-platform mobile application for iOS and Android using React Native and TypeScript. Built with an offline-first data model, biometrics, and instant cloud synchronization.\n\nKey features include:\n- Native touch micro-interactions and gesture-based navigation\n- Offline SQLite persistence with automatic conflict-free cloud sync\n- Push notification pipelines via Firebase Cloud Messaging (FCM)\n- Apple FaceID / Android Biometrics integration',
        shortDescription: 'Fluid React Native mobile application for iOS & Android featuring biometric security and offline-first sync.',
        category: 'mobile-apps',
        image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1779559150/nexgen-studio/vksseodnsre0tcepekgh.png',
        tags: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'SQLite', 'iOS & Android'],
        achievements: [
          'Cross-platform deployment to Apple App Store & Google Play',
          'Biometric security with keychain token encryption',
          'Offline-first synchronization architecture',
          'Low-latency push notification pipeline'
        ],
        links: [
          { title: 'App Architecture', url: 'https://github.com/xelox-solutions/mobile-architecture' }
        ],
        order: 2,
        isActive: true
      },

      // 3. Digital Marketing & Growth Case Study
      {
        title: 'Full-Funnel Performance Growth System',
        subtitle: 'Digital Marketing & Growth',
        description: 'Designed and deployed an integrated growth engine combining technical SEO authority, multi-channel paid acquisition (Meta & Google Ads), and conversion-tested landing pages.\n\nKey execution components:\n- Full technical SEO audit and high-intent keyword clustering\n- Multi-variant ad creative production and algorithmic audience testing\n- High-converting funnel landing pages built for fast conversion\n- Unified GA4 & Looker Studio attribution reporting dashboards',
        shortDescription: 'Integrated growth marketing system combining technical search dominance with high-ROI paid acquisition.',
        category: 'digital-marketing',
        image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1779559829/nexgen-studio/wzygtdqcuaakv3nsytsb.png',
        tags: ['Technical SEO', 'Performance Paid Ads', 'CRO', 'GA4 Analytics', 'Funnel Design'],
        achievements: [
          'End-to-end attribution tracking architecture setup',
          'Multi-variant landing page A/B testing framework',
          'Bi-weekly transparent client performance reporting',
          'Automated lead qualification and nurture sequences'
        ],
        links: [
          { title: 'Growth Framework', url: 'https://github.com/xelox-solutions/growth-framework' }
        ],
        order: 3,
        isActive: true
      },

      // 4. Innovation Award: SIH 2023
      {
        title: 'Smart India Hackathon 2023',
        subtitle: 'National Winner — Healthcare Innovation',
        description: 'Developed an AI-powered healthcare diagnostics prototype that uses computer vision to analyze medical scans and assist clinicians with preliminary triage. Secured first place in the healthcare category of Smart India Hackathon 2023, competing against over 500 engineering teams nationwide.\n\nSystem capabilities demonstrated:\n- Medical image analysis prototype using convolutional computer vision\n- Secure patient record interface with role-based access\n- Edge-compatible diagnostic triage pipeline\n- Mobile clinician companion prototype',
        shortDescription: 'National 1st Place Winner at Smart India Hackathon 2023 in Healthcare Innovation Category.',
        category: 'innovation',
        image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1773202634/group-photo.png',
        tags: ['Smart India Hackathon', 'National Winner', 'Healthcare AI', 'Computer Vision', 'Python', 'React'],
        achievements: [
          '1st Place in Healthcare Innovation Category',
          'Selected among Top 10 from 500+ nationwide teams',
          'Mentored by senior healthcare technology leaders',
          'Demonstrated live at national grand finale'
        ],
        links: [
          { title: 'Competition Archive', url: 'https://sih.gov.in' }
        ],
        order: 4,
        isActive: true
      },

      // 5. Innovation Award: Cybercubs Championship
      {
        title: 'Cybercubs National Championship',
        subtitle: '1st Place — Ethical Hacking & Cybersecurity',
        description: 'Achieved first place in the Cybercubs National Championship 2023, a premier cybersecurity competition evaluating ethical hacking, application security auditing, and penetration testing.\n\nKey challenge areas conquered:\n- Web application vulnerability discovery and patch demonstration\n- Network penetration testing and perimeter defenses\n- Cryptographic challenge resolution\n- Digital forensics and incident response reporting',
        shortDescription: '1st Place Winner in Cybercubs National Championship for ethical hacking and web application security.',
        category: 'innovation',
        image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1773596421/f48bf7a6-fd0e-4e29-89fb-5d425336f46b_ukczim.png',
        tags: ['Cybersecurity', 'Ethical Hacking', 'Penetration Testing', 'Application Security', 'Digital Forensics'],
        achievements: [
          'National Champions in ethical hacking challenge',
          'Zero-day vulnerability discovery simulation winner',
          'Comprehensive audit reporting commendation',
          'Certified technical recognition'
        ],
        links: [
          { title: 'Competition Archive', url: 'https://cybercubs.org' }
        ],
        order: 5,
        isActive: true
      },

      // 6. Innovation Credential: Amity Innovation Cell
      {
        title: 'Amity Innovation Cell Collaboration',
        subtitle: 'Incubated Project — EdTech Platform',
        description: 'Collaborated with Amity Innovation Cell to engineer an interactive digital education platform with modular content delivery and student progress telemetry.\n\nPlatform components built:\n- Modular video delivery with responsive playback controls\n- Real-time formative quizzes and comprehension checks\n- Student analytics telemetry and educator dashboard',
        shortDescription: 'Interactive digital learning platform developed in collaboration with Amity Innovation Cell.',
        category: 'innovation',
        image: 'https://res.cloudinary.com/dr4w6ordx/image/upload/v1779559829/nexgen-studio/wzygtdqcuaakv3nsytsb.png',
        tags: ['EdTech', 'Amity Innovation Cell', 'React', 'Node.js', 'MongoDB'],
        achievements: [
          'Selected for Amity Innovation Cell incubation',
          'Interactive student learning pipeline completed',
          'Demonstrated at university innovation showcase'
        ],
        links: [
          { title: 'Innovation Cell Showcase', url: 'https://amity.edu/innovation' }
        ],
        order: 6,
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