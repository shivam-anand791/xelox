import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  // Hero Section
  hero: {
    headline: { type: String, default: "CRAFTING HIGH-PERFORMANCE SITES, APPS & GROWTH SYSTEMS" },
    subheadline: { type: String, default: "We engineer custom web platforms, native mobile applications, and data-driven growth systems for ambitious brands and growing businesses—eliminating fragmented agency silos to ship faster and scale predictably." },
    cta: { type: String, default: "Discuss Your Project" },
    microLabel: { type: String, default: "XELOXSOLUTIONS — 2026" }
  },
  
  // About Section
  about: {
    eyebrow: { type: String, default: "WHO WE ARE — THE XELOX STUDIO" },
    headline: { type: String, default: "A focused crew of senior builders & growth specialists." },
    body: { type: String, default: "We are an engineering-led digital agency. We partner directly with founders and ambitious brands to architect custom web platforms, mobile applications, and measurable customer acquisition systems—eliminating agency bureaucracy to ship faster and sharper." },
    statement: { type: String, default: "NO ACCOUNT MANAGERS IN THE MIDDLE. SENIOR BUILDERS ONLY." },
    cta: { type: String, default: "Meet the studio" }
  },
  
  // Services Section
  services: {
    headline: { type: String, default: "CORE CAPABILITIES" },
    body: { type: String, default: "Three specialized pillars engineered to design, engineer, and scale custom digital products and growth engines." },
    cta: { type: String, default: "Explore all services" },
    items: [{
      title: { type: String },
      description: { type: String }
    }]
  },
  
  // Portfolio Section
  portfolio: {
    headline: { type: String, default: "SELECTED WORK" },
    body: { type: String, default: "Engineered digital flagships, high-conversion growth engines, and verified innovation credentials." },
    cta: { type: String, default: "View all projects" },
    projects: [{
      title: { type: String },
      subtitle: { type: String },
      image: { type: String }
    }]
  },
  
  // Process Section
  process: {
    headline: { type: String, default: "HOW WE WORK" },
    body: { type: String, default: "A simple process that keeps you in control—and keeps the work on time." },
    steps: [{
      number: { type: String },
      title: { type: String },
      description: { type: String }
    }]
  },
  
  // Results Section
  results: {
    headline: { type: String, default: "Results that speak plainly." },
    body: { type: String, default: "We measure success by launches shipped, clarity gained, and teams confident enough to grow." },
    metrics: [{
      value: { type: String },
      label: { type: String }
    }],
    testimonial: {
      quote: { type: String, default: "Xelox Solutions turned our rough idea into a brand we're proud to show investors—in under a month." },
      author: { type: String, default: "Ava R., Founder, Lumen Coffee" }
    }
  },
  
  // Blog Section
  blog: {
    headline: { type: String, default: "Latest notes" },
    body: { type: String, default: "Short reads on branding, product design, and shipping fast." },
    cta: { type: String, default: "View all articles" }
  },
  
  // Contact Section
  contact: {
    headline: { type: String, default: "Ready when you are." },
    body: { type: String, default: "Tell us what you're building. We'll reply within 2 business days." },
    cta: { type: String, default: "Send message" },
    email: { type: String, default: "xyrosolutions1@gmail.com" },
    location: { type: String, default: "Based everywhere / UTC±2" },
    form: {
      emailPlaceholder: { type: String, default: "you@company.com" },
      messagePlaceholder: { type: String, default: "What are you launching?" },
      buttonText: { type: String, default: "Send message" }
    }
  },
  
  // Team
  team: {
    members: [{
      name: { type: String },
      role: { type: String },
      image: { type: String }
    }]
  },

  updatedAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

// Update timestamp on save
contentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Content = mongoose.model('Content', contentSchema);

export default Content;
