import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useContent } from '../hooks/useContent';
import { ArrowRight, Clock, X } from 'lucide-react';
import { blogApi } from '../lib/api';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  readTime: string;
  createdAt: string;
}

const defaultArticleImages = [
  '/articles/product-naming-guide.webp',
  '/articles/landing-page-playbook.webp',
  '/articles/design-systems-guide.webp',
];

const getArticleImage = (post: { title?: string; image?: string }, index: number): string => {
  if (post.image && !post.image.includes('hero_portrait_left') && !post.image.includes('services_workspace') && !post.image.includes('res.cloudinary.com')) {
    return post.image;
  }
  return defaultArticleImages[index % defaultArticleImages.length];
};

const getArticleAltText = (title: string): string => {
  const lower = title.toLowerCase();
  if (lower.includes('name') || lower.includes('naming')) {
    return 'Product naming sketchbook and typographic brand identity worksheets on an editorial studio desk';
  }
  if (lower.includes('landing page') || lower.includes('playbook')) {
    return 'High-conversion landing page design layout showcasing hero hierarchy and conversion architecture';
  }
  if (lower.includes('design system')) {
    return 'Modular design system component library interface displaying reusable UI tokens and dashboard elements';
  }
  return `${title} - editorial article cover`;
};

interface ArticleCoverProps {
  src?: string;
  title: string;
  index: number;
  aspectClass?: string;
}

function ArticleCover({
  src,
  title,
  index,
  aspectClass = 'aspect-[16/10]',
}: ArticleCoverProps) {
  const [hasError, setHasError] = useState(false);
  const altText = getArticleAltText(title);

  return (
    <div className={`relative ${aspectClass} w-full overflow-hidden bg-slate-100 dark:bg-[#0F172A]`}>
      {src && !hasError ? (
        <>
          <img
            src={src}
            alt={altText}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          {/* Subtle restrained overlay matching Xelox dark tones */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-dark/10 to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
        </>
      ) : (
        /* Graceful designed placeholder fallback if image fails or is unavailable */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#0F172A] dark:to-[#1E293B]">
          <div className="w-12 h-12 rounded-xl bg-lime/10 border border-lime/30 flex items-center justify-center text-lime mb-2 font-mono text-sm font-bold shadow-sm">
            {String(index + 1).padStart(2, '0')}
          </div>
          <span className="text-xs uppercase tracking-wider font-mono text-gray-500 dark:text-slate-400">
            Xelox Editorial
          </span>
        </div>
      )}

      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-lime text-dark text-xs font-mono font-medium px-3 py-1 rounded-full shadow-sm">
          Article
        </span>
      </div>
    </div>
  );
}

export default function BlogSection() {
  const { content } = useContent();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.15 });
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogApi.getPosts();
        if (response.success && response.data) {
          setBlogPosts(response.data as BlogPost[]);
        }
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const allArticles: BlogPost[] = blogPosts.length > 0
    ? blogPosts
    : (content.blog.posts || []).map((post, idx) => ({
        _id: `article-static-${idx}`,
        title: post.title,
        slug: post.title.toLowerCase().replace(/\s+/g, '-'),
        excerpt: post.excerpt,
        content: `<p>${post.excerpt}</p><p>This is a featured editorial article published by the Xelox team on branding, product design, and rapid delivery.</p>`,
        image: getArticleImage(post, idx),
        readTime: post.readTime || '5 min read',
        createdAt: post.date || new Date().toISOString()
      }));

  return (
    <section 
      id="insights"
      ref={sectionRef}
      className="bg-off-white py-20 md:py-32 relative overflow-hidden dark:bg-[#050608]"
    >
      <div id="blog" className="sr-only" aria-hidden="true" />
      <div id="articles" className="sr-only" aria-hidden="true" />
      <div className="px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 
              className={`font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-dark dark:text-[#F8FAFC] mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {content.blog.headline}
            </h2>
            <p 
              className={`text-base md:text-lg text-gray-custom dark:text-slate-300 max-w-md transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {content.blog.body}
            </p>
          </div>
          <button 
            onClick={() => setShowAllArticles(true)}
            className={`inline-flex items-center gap-2 font-medium text-dark dark:text-[#F8FAFC] hover:text-lime transition-all duration-700 group mt-4 md:mt-0 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            View all articles
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(content.blog.posts || []).map((post, index) => {
            const articleCoverSrc = getArticleImage(post, index);
            const readingTime = post.readTime || '5 min read';

            return (
              <article 
                key={index}
                onClick={() => setSelectedPost({
                  _id: `static-${index}`,
                  title: post.title,
                  slug: post.title.toLowerCase().replace(/\s+/g, '-'),
                  excerpt: post.excerpt,
                  content: `<p>${post.excerpt}</p><p>This is a featured editorial article published by the Xelox team on branding, product design, and rapid delivery.</p>`,
                  readTime: readingTime,
                  image: articleCoverSrc,
                  createdAt: post.date || new Date().toISOString()
                })}
                className={`bg-white rounded-xl overflow-hidden card-hover cursor-pointer group transition-all duration-700 dark:bg-[#111827] dark:border dark:border-white/10 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                {/* Article Cover Image with fallback & subtle zoom */}
                <ArticleCover 
                  src={articleCoverSrc}
                  title={post.title}
                  index={index}
                  aspectClass="aspect-[16/10]"
                />
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-custom dark:text-slate-300 text-sm mb-3">
                    <Clock size={14} />
                    <span>{readingTime}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-dark dark:text-[#F8FAFC] mb-2 group-hover:text-lime transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-custom dark:text-slate-300 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-dark dark:text-[#F8FAFC] group-hover:text-lime transition-colors">
                    Read more
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* All Articles Modal */}
      {showAllArticles && (
        <div 
          id="all-articles-modal"
          role="dialog"
          aria-modal="true"
          aria-label="All Articles"
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setShowAllArticles(false)}
        >
          <div 
            className="bg-off-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto dark:bg-[#0B0F14] dark:border dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-off-white p-6 border-b flex justify-between items-center z-10 dark:bg-[#0B0F14] dark:border-white/10">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-dark dark:text-[#F8FAFC]">All Articles</h2>
              <button 
                onClick={() => setShowAllArticles(false)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors text-dark dark:text-[#F8FAFC]"
                aria-label="Close all articles modal"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allArticles.length > 0 ? (
                allArticles.map((post, idx) => (
                  <article 
                    key={post._id}
                    onClick={() => {
                      setSelectedPost(post);
                      setShowAllArticles(false);
                    }}
                    className="bg-white rounded-xl overflow-hidden cursor-pointer group hover:shadow-lg transition-all card-hover dark:bg-[#111827] dark:border dark:border-white/10"
                  >
                    <ArticleCover
                      src={post.image || getArticleImage(post, idx)}
                      title={post.title}
                      index={idx}
                      aspectClass="aspect-[16/10]"
                    />
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-gray-custom dark:text-slate-300 text-xs mb-2">
                        <Clock size={12} />
                        <span>{post.readTime || '5 min read'}</span>
                      </div>
                      <h3 className="font-display font-bold text-dark dark:text-[#F8FAFC] mb-1 group-hover:text-lime transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-custom dark:text-slate-300 text-sm line-clamp-2">{post.excerpt}</p>
                    </div>
                  </article>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-custom dark:text-slate-300">
                  <p>No articles published yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Single Article Modal */}
      {selectedPost && (
        <div 
          id="single-article-modal"
          role="dialog"
          aria-modal="true"
          aria-label={selectedPost.title}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedPost(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto dark:bg-[#111827] dark:border dark:border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center z-10 dark:bg-[#111827] dark:border-white/10">
              <div className="flex items-center gap-2 text-gray-custom dark:text-slate-300 text-sm">
                <Clock size={14} />
                <span>{selectedPost.readTime || '5 min read'}</span>
              </div>
              <button 
                onClick={() => setSelectedPost(null)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors text-dark dark:text-[#F8FAFC]"
                aria-label="Close article modal"
              >
                <X size={24} />
              </button>
            </div>
            {selectedPost.image && (
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-gray-100 dark:border-white/10">
                <img 
                  src={selectedPost.image} 
                  alt={getArticleAltText(selectedPost.title)} 
                  className="w-full h-full object-cover" 
                  loading="lazy" 
                  decoding="async" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            )}
            <div className="p-6 md:p-8">
              <h1 className="font-display font-bold text-2xl md:text-3xl text-dark dark:text-[#F8FAFC] mb-4">
                {selectedPost.title}
              </h1>
              <p className="text-gray-custom dark:text-slate-300 text-lg mb-6 leading-relaxed">
                {selectedPost.excerpt}
              </p>
              <div 
                className="prose prose-lg max-w-none text-dark dark:prose-invert dark:text-slate-200"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
