import Content from '../backend/models/Content.js';
import connectDB from '../backend/config/db.js';
import '../backend/config/env.js';

async function updateBlog() {
  try {
    await connectDB();
    await Content.updateMany({}, {
      $set: {
        'blog.headline': 'Insights & Engineering Notes',
        'blog.body': 'Practical perspectives on search visibility, conversion architecture, and high-performance shipping.',
        'blog.posts': [
          { 
            title: 'Structuring Web Platforms for Search Visibility and Fast Indexing', 
            excerpt: 'A technical guide to semantic markup, dynamic sitemaps, and entity clustering.', 
            date: 'Feb 10, 2026', 
            readTime: '5 min read', 
            image: '/articles/product-naming-guide.webp' 
          },
          { 
            title: 'The 3-week landing page playbook', 
            excerpt: 'High-conversion layout systems and sub-second performance without bloated dependencies.', 
            date: 'Feb 5, 2026', 
            readTime: '7 min read', 
            image: '/articles/landing-page-playbook.webp' 
          },
          { 
            title: 'Design systems for tiny teams', 
            excerpt: 'Build reusable component consistency across web and mobile without architecture overhead.', 
            date: 'Jan 28, 2026', 
            readTime: '4 min read', 
            image: '/articles/design-systems-guide.webp' 
          }
        ]
      }
    });
    console.log('Successfully updated content.blog in database');
    process.exit(0);
  } catch (err) {
    console.error('Failed to update content.blog:', err);
    process.exit(1);
  }
}

updateBlog();
