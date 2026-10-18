const puppeteer = require('puppeteer-core');
const http = require('http');
const https = require('https');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5173';

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', reject);
  });
}

async function runComprehensiveVerification() {
  console.log('================================================================');
  console.log('🚀 RUNNING PHASE 1: ROUTING & NAVIGATION COMPREHENSIVE VERIFICATION');
  console.log('================================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const testResults = [];

  function record(suite, testName, passed, details = '') {
    testResults.push({ suite, testName, passed, details });
    const mark = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`[${suite}] ${mark}: ${testName}${details ? ` -> ${details}` : ''}`);
  }

  try {
    async function goTo(path) {
      await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#root', { timeout: 10000 });
      await new Promise(r => setTimeout(r, 250));
    }

    async function reloadPage() {
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#root', { timeout: 10000 });
      await new Promise(r => setTimeout(r, 250));
    }

    // -------------------------------------------------------------
    // SUITE 1: DIRECT ENTRY & REFRESH ON INTENDED ROUTES
    // -------------------------------------------------------------
    console.log('\n--- SUITE 1: DIRECT ENTRY & REFRESH ON INTENDED ROUTES ---');
    const routesToTest = [
      { path: '/', expectedText: 'ENGINEERED FOR SCALE' },
      { path: '/services', expectedText: 'THREE PILLARS' },
      { path: '/work', expectedText: 'ENGINEERED FOR SCALE' },
      { path: '/pricing', expectedText: 'CLEAR PRICING PACKAGES' },
      { path: '/team', expectedText: 'THE TEAM BEHIND THE SYSTEMS' },
      { path: '/service-inquiry', expectedText: 'BACK TO SERVICES' },
      { path: '/contact', expectedText: 'INITIATE AN ENGAGEMENT' },
      { path: '/privacy', expectedText: 'PRIVACY POLICY' },
      { path: '/terms', expectedText: 'TERMS & CONDITIONS' },
      { path: '/admin', expectedText: 'ADMIN ACCESS' },
      { path: '/xelox-ai', expectedText: 'XELOX AI' },
      { path: '/work/category/web-development', expectedText: 'WEBSITE DESIGN & DEVELOPMENT' }
    ];

    for (const r of routesToTest) {
      // 1. Direct Entry
      await goTo(r.path);
      let currentUrl = new URL(page.url());
      let bodyText = await page.evaluate(() => document.body.innerText.toUpperCase());
      const hasExpected = bodyText.includes(r.expectedText);
      const isNot404 = !bodyText.includes('PAGE NOT FOUND') && !bodyText.includes('404 NOT FOUND');
      record('Direct Entry', `Direct load ${r.path}`, hasExpected && isNot404, `URL: ${currentUrl.pathname}${currentUrl.hash}`);

      // 2. Refresh
      await reloadPage();
      currentUrl = new URL(page.url());
      bodyText = await page.evaluate(() => document.body.innerText.toUpperCase());
      const refreshHasExpected = bodyText.includes(r.expectedText);
      const refreshIsNot404 = !bodyText.includes('PAGE NOT FOUND') && !bodyText.includes('404 NOT FOUND');
      record('Page Refresh', `Refresh on ${r.path}`, refreshHasExpected && refreshIsNot404, `URL: ${currentUrl.pathname}${currentUrl.hash}`);
    }

    // -------------------------------------------------------------
    // SUITE 2: SEMANTIC HTML NAVIGATION AUDIT (<a href="..."> vs <button>)
    // -------------------------------------------------------------
    console.log('\n--- SUITE 2: SEMANTIC NAVIGATION & ACCESSIBILITY AUDIT ---');
    await goTo('/');

    // Check desktop nav links
    const navAudit = await page.evaluate(() => {
      const navLinks = Array.from(document.querySelectorAll('nav a'));
      const buttonsInNav = Array.from(document.querySelectorAll('nav button'));
      return {
        linkCount: navLinks.length,
        links: navLinks.map(a => ({
          text: a.innerText.trim(),
          href: a.getAttribute('href'),
          tagName: a.tagName.toLowerCase()
        })),
        buttons: buttonsInNav.map(b => ({
          text: b.innerText.trim(),
          ariaLabel: b.getAttribute('aria-label') || '',
          className: b.className
        }))
      };
    });

    const expectedNavHrefs = ['/', '/services', '/work', '/pricing', '/#about', '/#insights', '/#contact', '/service-inquiry'];
    const foundNavHrefs = navAudit.links.map(l => l.href);
    const hasSemanticLinks = expectedNavHrefs.every(h => foundNavHrefs.includes(h));
    record('Semantic Links', 'Desktop header navigation items use <a href="...">', hasSemanticLinks, `Found links: ${JSON.stringify(foundNavHrefs)}`);

    // Verify buttons are used only for actions (Theme toggle, Admin, Mobile drawer toggle)
    const validButtons = navAudit.buttons.every(b => 
      b.ariaLabel.includes('mode') || 
      b.ariaLabel.includes('menu') || 
      b.ariaLabel.includes('Admin') ||
      b.text === ''
    );
    record('Button Actions', 'Nav buttons reserved strictly for interactive actions (theme toggle, drawer, admin)', validButtons, `Button count: ${navAudit.buttons.length}`);

    // Check footer links
    const footerLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('footer a'));
      return links.map(l => ({ text: l.innerText.trim(), href: l.getAttribute('href') }));
    });
    const hasFooterHrefs = footerLinks.some(l => l.href === '/services') && 
                          footerLinks.some(l => l.href === '/work') && 
                          footerLinks.some(l => l.href === '/privacy') && 
                          footerLinks.some(l => l.href === '/terms');
    record('Footer Links', 'Footer navigation uses semantic <a href="..."> links', hasFooterHrefs, `Total footer links: ${footerLinks.length}`);

    async function clickLink(selector) {
      await page.waitForSelector(selector, { timeout: 6000 });
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) throw new Error(`Element not found: ${sel}`);
        el.scrollIntoView({ block: 'center', inline: 'center' });
        el.click();
      }, selector);
    }

    // -------------------------------------------------------------
    // SUITE 3: INTERNAL CLIENT-SIDE NAVIGATION BETWEEN ROUTES
    // -------------------------------------------------------------
    console.log('\n--- SUITE 3: INTERNAL NAVIGATION TRANSITIONS ---');
    await goTo('/');

    // Click Services in nav
    await clickLink('nav a[href="/services"]');
    await new Promise(r => setTimeout(r, 400));
    let urlAfterNav = new URL(page.url()).pathname;
    record('Client Nav', 'Nav click: Home -> /services', urlAfterNav === '/services', `Url: ${urlAfterNav}`);

    // Click Pricing in nav
    await clickLink('nav a[href="/pricing"]');
    await new Promise(r => setTimeout(r, 400));
    urlAfterNav = new URL(page.url()).pathname;
    record('Client Nav', 'Nav click: Services -> /pricing', urlAfterNav === '/pricing', `Url: ${urlAfterNav}`);

    // Click Work in nav
    await clickLink('nav a[href="/work"]');
    await new Promise(r => setTimeout(r, 400));
    urlAfterNav = new URL(page.url()).pathname;
    record('Client Nav', 'Nav click: Pricing -> /work', urlAfterNav === '/work', `Url: ${urlAfterNav}`);

    // In Work page, click "View Team & Achievements" link
    await clickLink('a[href="/team"]');
    await new Promise(r => setTimeout(r, 400));
    urlAfterNav = new URL(page.url()).pathname;
    record('Client Nav', 'Page link: Work -> /team', urlAfterNav === '/team', `Url: ${urlAfterNav}`);

    // In Team page, click "Start a Project" CTA
    await clickLink('a[href="/service-inquiry"]');
    await new Promise(r => setTimeout(r, 400));
    urlAfterNav = new URL(page.url()).pathname;
    record('Client Nav', 'CTA click: Team -> /service-inquiry', urlAfterNav === '/service-inquiry', `Url: ${urlAfterNav}`);

    // In Service Inquiry page, click "Back to Services" link
    await clickLink('a[href="/services"]');
    await new Promise(r => setTimeout(r, 400));
    urlAfterNav = new URL(page.url()).pathname;
    record('Client Nav', 'Breadcrumb click: Service Inquiry -> /services', urlAfterNav === '/services', `Url: ${urlAfterNav}`);

    // Click Brand Logo to return to Home
    await clickLink('nav a[href="/"]');
    await new Promise(r => setTimeout(r, 400));
    urlAfterNav = new URL(page.url()).pathname;
    record('Client Nav', 'Logo click: Services -> / (Home)', urlAfterNav === '/', `Url: ${urlAfterNav}`);

    // -------------------------------------------------------------
    // SUITE 4: BROWSER BACK & FORWARD HISTORY TRAVERSAL
    // -------------------------------------------------------------
    console.log('\n--- SUITE 4: BROWSER BACK & FORWARD HISTORY TRAVERSAL ---');
    // History chain built in Suite 3:
    // / -> /services -> /pricing -> /work -> /team -> /service-inquiry -> /services -> /
    // Let's go back 1 step: should be /services
    await page.goBack({ waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 300));
    let backUrl = new URL(page.url()).pathname;
    record('History Back', 'Browser Back step 1 returns to /services', backUrl === '/services', `Url: ${backUrl}`);

    // Go back 2nd step: should be /service-inquiry
    await page.goBack({ waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 300));
    backUrl = new URL(page.url()).pathname;
    record('History Back', 'Browser Back step 2 returns to /service-inquiry', backUrl === '/service-inquiry', `Url: ${backUrl}`);

    // Go back 3rd step: should be /team
    await page.goBack({ waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 300));
    backUrl = new URL(page.url()).pathname;
    record('History Back', 'Browser Back step 3 returns to /team', backUrl === '/team', `Url: ${backUrl}`);

    // Go forward 1 step: should return to /service-inquiry
    await page.goForward({ waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 300));
    let fwdUrl = new URL(page.url()).pathname;
    record('History Forward', 'Browser Forward step 1 returns to /service-inquiry', fwdUrl === '/service-inquiry', `Url: ${fwdUrl}`);

    // Refresh at this point in history to ensure no corruption
    await reloadPage();
    let refreshHistoryUrl = new URL(page.url()).pathname;
    record('History Reload', 'Refresh mid-history remains on /service-inquiry', refreshHistoryUrl === '/service-inquiry', `Url: ${refreshHistoryUrl}`);

    // -------------------------------------------------------------
    // SUITE 5: MOBILE DRAWER & RESPONSIVE VIEWPORT NAVIGATION
    // -------------------------------------------------------------
    console.log('\n--- SUITE 5: MOBILE DRAWER NAVIGATION (VIEWPORT 390x844) ---');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await goTo('/');

    // Open mobile menu using aria-controls
    const menuBtn = await page.$('button[aria-controls="mobile-navigation-menu"]');
    const hasMenuBtn = !!menuBtn;
    record('Mobile Nav', 'Hamburger menu button rendered on mobile viewport', hasMenuBtn);

    if (menuBtn) {
      await menuBtn.click();
      await new Promise(r => setTimeout(r, 500)); // wait for drawer animation

      // Verify drawer links are <a> tags
      const drawerLinks = await page.evaluate(() => {
        const drawer = document.getElementById('mobile-navigation-menu');
        if (!drawer) return [];
        const links = Array.from(drawer.querySelectorAll('a'));
        return links.map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') }));
      });
      const hasDrawerServices = drawerLinks.some(l => l.href === '/services');
      const hasDrawerPricing = drawerLinks.some(l => l.href === '/pricing');
      const hasDrawerWork = drawerLinks.some(l => l.href === '/work');
      record('Mobile Drawer', 'Mobile drawer contains semantic <a href="..."> links', hasDrawerServices && hasDrawerPricing && hasDrawerWork, `Drawer links: ${drawerLinks.length}`);

      // Click Services in drawer
      await page.evaluate(() => {
        const drawer = document.getElementById('mobile-navigation-menu');
        if (!drawer) return;
        const a = Array.from(drawer.querySelectorAll('a')).find(el => el.getAttribute('href') === '/services');
        if (a) a.click();
      });
      await new Promise(r => setTimeout(r, 600));

      const mobileNavUrl = new URL(page.url()).pathname;
      const isDrawerOpen = await page.evaluate(() => {
        const drawer = document.getElementById('mobile-navigation-menu');
        return drawer && drawer.classList.contains('pointer-events-auto');
      });
      record('Mobile Nav', 'Clicking link in mobile drawer navigates to /services and closes drawer', mobileNavUrl === '/services' && !isDrawerOpen, `Url: ${mobileNavUrl}`);
    }

    // Reset viewport back to desktop
    await page.setViewport({ width: 1440, height: 900 });

    // -------------------------------------------------------------
    // SUITE 6: UNKNOWN URLS & 404 HANDLING
    // -------------------------------------------------------------
    console.log('\n--- SUITE 6: UNKNOWN URLS & INTENTIONALLY MISSING PAGES ---');
    const unknownPath = '/this-page-does-not-exist-audit-check';
    await goTo(unknownPath);
    const is404Rendered = await page.evaluate(() => {
      const text = document.body.innerText.toUpperCase();
      return text.includes('404') && text.includes('PAGE NOT FOUND');
    });
    record('404 Handling', `Unknown URL ${unknownPath} renders 404 page`, is404Rendered);

    // Click "Return to Homepage" link on 404 page
    await clickLink('a[href="/"]');
    await new Promise(r => setTimeout(r, 400));
    const backFrom404Url = new URL(page.url()).pathname;
    record('404 Recovery', '404 page "Return to Homepage" link returns to /', backFrom404Url === '/');

    // -------------------------------------------------------------
    // SUITE 7: BACKEND API ENDPOINT VERIFICATION (NO REWRITE INTERCEPTION)
    // -------------------------------------------------------------
    console.log('\n--- SUITE 7: BACKEND API HEALTH & REWRITE SAFETY ---');
    try {
      const apiResp = await makeRequest('https://xyrosolutions.onrender.com/api/services');
      const isJson = apiResp.headers['content-type'] && apiResp.headers['content-type'].includes('application/json');
      const isOk = apiResp.statusCode >= 200 && apiResp.statusCode < 400;
      record('API Endpoints', 'Backend /api/services responds with HTTP 200 and valid JSON', isOk && isJson, `Status: ${apiResp.statusCode}, Type: ${apiResp.headers['content-type']}`);
    } catch (apiErr) {
      record('API Endpoints', 'Backend /api/services reachable', false, apiErr.message);
    }

    // Check that vercel.json preserves /api/(.*) before all SPA rewrites
    const vercelConfig = require('../vercel.json');
    const firstRewrite = vercelConfig.rewrites && vercelConfig.rewrites[0];
    const isApiFirst = firstRewrite && firstRewrite.source === '/api/(.*)' && firstRewrite.destination.includes('xyrosolutions.onrender.com');
    record('API Safety', 'Root vercel.json rewrites /api/(.*) proxy before SPA page rewrites', isApiFirst, `First rewrite: ${JSON.stringify(firstRewrite)}`);

  } finally {
    await browser.close();
  }

  // Summary
  const total = testResults.length;
  const passedCount = testResults.filter(r => r.passed).length;
  const failedCount = total - passedCount;

  console.log('\n================================================================');
  console.log(`🏁 VERIFICATION COMPLETE: ${passedCount}/${total} TESTS PASSED (${failedCount} FAILED)`);
  console.log('================================================================');

  if (failedCount > 0) {
    console.error('\nFAILED TESTS:');
    testResults.filter(r => !r.passed).forEach(f => {
      console.error(`- [${f.suite}] ${f.testName}: ${f.details}`);
    });
    process.exit(1);
  }
}

runComprehensiveVerification().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
