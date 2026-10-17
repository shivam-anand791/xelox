export type Page = 
  | 'home' 
  | 'work' 
  | 'team' 
  | 'work-category' 
  | 'services' 
  | 'pricing'
  | 'service-inquiry' 
  | 'admin-login' 
  | 'admin-dashboard' 
  | 'privacy' 
  | 'terms' 
  | 'xelox-ai' 
  | 'xyro-ai'
  | 'not-found';

export interface RouteState {
  page: Page;
  category?: string;
  packageName?: string;
  rawPath: string;
  search: string;
  hash: string;
}

/**
 * Parses the current browser URL (or provided path/search/hash) into a structured RouteState.
 */
export function parseRoute(
  pathname: string = typeof window !== 'undefined' ? window.location.pathname : '/',
  search: string = typeof window !== 'undefined' ? window.location.search : '',
  hash: string = typeof window !== 'undefined' ? window.location.hash : ''
): RouteState {
  // Normalize pathname: remove trailing slash, lowercase for matching
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const lowerPath = cleanPath.toLowerCase();
  const searchParams = new URLSearchParams(search);

  // 1. Root / Homepage
  if (lowerPath === '/' || lowerPath === '/home') {
    return {
      page: 'home',
      rawPath: cleanPath,
      search,
      hash
    };
  }

  // 2. Work Portfolio
  if (lowerPath === '/work') {
    const categoryParam = searchParams.get('category') || undefined;
    return {
      page: 'work',
      category: categoryParam,
      rawPath: cleanPath,
      search,
      hash
    };
  }

  // 3. Work Category (nested route: /work/category/:cat or /work-category)
  const workCategoryMatch = lowerPath.match(/^\/work\/category\/([^/]+)$/);
  if (workCategoryMatch) {
    const category = decodeURIComponent(workCategoryMatch[1]);
    return {
      page: 'work-category',
      category: category || 'sih-alumni',
      rawPath: cleanPath,
      search,
      hash
    };
  }

  if (lowerPath === '/work-category') {
    const category = searchParams.get('category') || 'sih-alumni';
    return {
      page: 'work-category',
      category,
      rawPath: cleanPath,
      search,
      hash
    };
  }

  // 4. Services Page
  if (lowerPath === '/services') {
    return {
      page: 'services',
      rawPath: cleanPath,
      search,
      hash
    };
  }

  // 5. Team & Achievements Page
  if (lowerPath === '/team') {
    return {
      page: 'team',
      rawPath: cleanPath,
      search,
      hash
    };
  }

  // 4b. Dedicated Pricing Page
  if (lowerPath === '/pricing') {
    return {
      page: 'pricing',
      rawPath: cleanPath,
      search,
      hash
    };
  }

  if (lowerPath === '/about' || lowerPath === '/studio') {
    return {
      page: 'home',
      rawPath: cleanPath,
      search,
      hash: '#about'
    };
  }

  if (lowerPath === '/contact') {
    return {
      page: 'home',
      rawPath: cleanPath,
      search,
      hash: '#contact'
    };
  }

  if (lowerPath === '/insights' || lowerPath === '/articles' || lowerPath === '/blog') {
    return {
      page: 'home',
      rawPath: cleanPath,
      search,
      hash: '#insights'
    };
  }

  // 7. Service Inquiry Flow (supports ?category=...&package=...)
  if (lowerPath === '/service-inquiry') {
    const category = searchParams.get('category') || undefined;
    const packageName = searchParams.get('package') || undefined;
    return {
      page: 'service-inquiry',
      category,
      packageName,
      rawPath: cleanPath,
      search,
      hash
    };
  }

  // 8. Legal & Policies
  if (lowerPath === '/privacy') {
    return {
      page: 'privacy',
      rawPath: cleanPath,
      search,
      hash
    };
  }

  if (lowerPath === '/terms') {
    return {
      page: 'terms',
      rawPath: cleanPath,
      search,
      hash
    };
  }

  // 9. AI Assistants
  if (lowerPath === '/xelox-ai' || lowerPath === '/xyro-ai') {
    return {
      page: 'xelox-ai',
      rawPath: cleanPath,
      search,
      hash
    };
  }

  // 10. Admin Portal
  if (lowerPath === '/admin' || lowerPath === '/admin-login' || lowerPath === '/admin/login') {
    return {
      page: 'admin-login',
      rawPath: cleanPath,
      search,
      hash
    };
  }

  if (lowerPath === '/admin-dashboard' || lowerPath === '/admin/dashboard') {
    return {
      page: 'admin-dashboard',
      rawPath: cleanPath,
      search,
      hash
    };
  }

  // 11. Genuinely Nonexistent Route -> 404
  return {
    page: 'not-found',
    rawPath: cleanPath,
    search,
    hash
  };
}

/**
 * Builds canonical URL string for a given page, parameters, and optional hash.
 */
export function buildUrl(
  page: Page | string,
  category?: string,
  packageName?: string,
  hash?: string
): string {
  let path = '/';
  const params = new URLSearchParams();

  switch (page) {
    case 'home':
      path = '/';
      break;
    case 'pricing':
      path = '/pricing';
      break;
    case 'about':
    case 'studio':
      path = '/';
      hash = hash || '#about';
      break;
    case 'contact':
      path = '/';
      hash = hash || '#contact';
      break;
    case 'insights':
    case 'articles':
    case 'blog':
      path = '/';
      hash = hash || '#insights';
      break;
    case 'work':
      path = '/work';
      if (category && category !== 'all') {
        params.set('category', category);
      }
      break;
    case 'work-category':
      if (category) {
        path = `/work/category/${encodeURIComponent(category)}`;
      } else {
        path = '/work';
      }
      break;
    case 'services':
      path = '/services';
      break;
    case 'team':
      path = '/team';
      break;
    case 'privacy':
      path = '/privacy';
      break;
    case 'terms':
      path = '/terms';
      break;
    case 'xelox-ai':
    case 'xyro-ai':
      path = '/xelox-ai';
      break;
    case 'admin-login':
      path = '/admin-login';
      break;
    case 'admin-dashboard':
      path = '/admin-dashboard';
      break;
    case 'service-inquiry':
      path = '/service-inquiry';
      if (category) params.set('category', category);
      if (packageName) params.set('package', packageName);
      break;
    default:
      path = typeof page === 'string' && page.startsWith('/') ? page : '/';
      break;
  }

  const queryString = params.toString() ? `?${params.toString()}` : '';
  const hashString = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';

  return `${path}${queryString}${hashString}`;
}

/**
 * Utility to smoothly scroll to an in-page element if a hash exists.
 */
export function scrollToHash(hash: string): boolean {
  if (!hash) return false;
  const targetId = hash.replace(/^#/, '');
  const element = document.getElementById(targetId) || document.querySelector(hash);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    return true;
  }
  return false;
}
