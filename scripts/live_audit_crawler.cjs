const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const LIVE_URL = 'https://xelox-pi.vercel.app/';

const outDir = path.join(__dirname, '..', 'screenshots', 'live_audit');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function runAudit() {
  console.log('=== Starting Comprehensive Live Audit on:', LIVE_URL, '===');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const auditData = {
    url: LIVE_URL,
    timestamp: new Date().toISOString(),
    viewports: {},
    consoleMessages: [],
    networkErrors: [],
    sections: [],
    seo: {},
    navigation: {},
    userJourneys: {},
    technicalMetrics: {}
  };

  const page = await browser.newPage();

  // Listen for console logs & errors
  page.on('console', msg => {
    auditData.consoleMessages.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location()
    });
  });

  // Listen for failed network requests
  page.on('requestfailed', req => {
    auditData.networkErrors.push({
      url: req.url(),
      method: req.method(),
      errorText: req.failure() ? req.failure().errorText : 'Unknown failure',
      resourceType: req.resourceType()
    });
  });

  page.on('response', resp => {
    if (resp.status() >= 400) {
      auditData.networkErrors.push({
        url: resp.url(),
        status: resp.status(),
        statusText: resp.statusText(),
        resourceType: resp.request().resourceType()
      });
    }
  });

  // Helper to scroll page smoothly to trigger scroll reveal and lazy assets
  const autoScroll = async (p) => {
    await p.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 350;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 60);
      });
    });
    await new Promise(r => setTimeout(r, 600));
  };

  // --- Viewport 1: Desktop 1440 x 900 ---
  console.log('1. Auditing Desktop 1440x900...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  const t0 = Date.now();
  const resp = await page.goto(LIVE_URL, { waitUntil: 'networkidle0', timeout: 45000 });
  const loadTime = Date.now() - t0;
  auditData.technicalMetrics.initialLoadTimeMs = loadTime;
  auditData.technicalMetrics.httpStatus = resp.status();

  await autoScroll(page);

  await page.screenshot({
    path: path.join(outDir, '01_desktop_full_1440.png'),
    fullPage: true
  });
  console.log('Saved 01_desktop_full_1440.png');

  // Inspect SEO metadata
  auditData.seo = await page.evaluate(() => {
    const getMeta = (name) => {
      const el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      return el ? el.getAttribute('content') : null;
    };
    const headings = {
      h1: Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim()),
      h2: Array.from(document.querySelectorAll('h2')).map(h => h.innerText.trim()),
      h3: Array.from(document.querySelectorAll('h3')).map(h => h.innerText.trim())
    };
    const imagesWithoutAlt = Array.from(document.querySelectorAll('img')).filter(img => !img.alt || img.alt.trim() === '').map(img => img.src);
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null;

    return {
      title: document.title,
      description: getMeta('description'),
      ogTitle: getMeta('og:title'),
      ogDescription: getMeta('og:description'),
      ogImage: getMeta('og:image'),
      canonical,
      headings,
      totalImages: document.querySelectorAll('img').length,
      imagesWithoutAltCount: imagesWithoutAlt.length,
      imagesWithoutAltSample: imagesWithoutAlt.slice(0, 5)
    };
  });

  // Inspect sections inventory
  auditData.sections = await page.evaluate(() => {
    const main = document.querySelector('main');
    if (!main) return [];
    return Array.from(main.children).map((section, idx) => {
      const h = section.querySelector('h1, h2, h3');
      const buttons = Array.from(section.querySelectorAll('button, a.btn-primary, a.btn-outline')).map(b => b.innerText.trim());
      const rect = section.getBoundingClientRect();
      return {
        index: idx + 1,
        id: section.id || section.getAttribute('id') || '(no id)',
        tagName: section.tagName,
        className: section.className.slice(0, 80),
        heading: h ? h.innerText.trim() : null,
        buttons,
        renderedHeightPx: Math.round(rect.height),
        renderedWidthPx: Math.round(rect.width)
      };
    });
  });

  // Check Navigation Links on Desktop
  auditData.navigation = await page.evaluate(() => {
    const nav = document.querySelector('nav');
    if (!nav) return { links: [] };
    const links = Array.from(nav.querySelectorAll('a, button')).map(el => ({
      text: el.innerText.trim(),
      href: el.getAttribute('href') || null,
      tagName: el.tagName
    }));
    return { links };
  });

  // --- Viewport 2: Laptop 1366 x 768 ---
  console.log('2. Auditing Laptop 1366x768...');
  await page.setViewport({ width: 1366, height: 768, deviceScaleFactor: 1 });
  await page.goto(LIVE_URL, { waitUntil: 'networkidle2' });
  await autoScroll(page);
  await page.screenshot({
    path: path.join(outDir, '02_laptop_full_1366.png'),
    fullPage: true
  });
  console.log('Saved 02_laptop_full_1366.png');

  // --- Viewport 3: Tablet 768 x 1024 ---
  console.log('3. Auditing Tablet 768x1024...');
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
  await page.goto(LIVE_URL, { waitUntil: 'networkidle2' });
  await autoScroll(page);
  await page.screenshot({
    path: path.join(outDir, '03_tablet_full_768.png'),
    fullPage: true
  });
  console.log('Saved 03_tablet_full_768.png');

  // --- Viewport 4: Mobile 390 x 844 (iPhone 12/13/14) ---
  console.log('4. Auditing Mobile 390x844...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(LIVE_URL, { waitUntil: 'networkidle2' });
  await autoScroll(page);
  await page.screenshot({
    path: path.join(outDir, '04_mobile_full_390.png'),
    fullPage: true
  });
  console.log('Saved 04_mobile_full_390.png');

  // Check mobile menu interaction
  console.log('4b. Testing Mobile Navigation Menu...');
  const mobileMenuBtn = await page.$('button[aria-label="Open menu"], nav button svg.lucide-menu, nav button:has(svg.lucide-menu)');
  if (mobileMenuBtn) {
    await mobileMenuBtn.click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({
      path: path.join(outDir, '04b_mobile_menu_open.png')
    });
    console.log('Saved 04b_mobile_menu_open.png');
  }

  // Check horizontal overflow on mobile
  auditData.viewports.mobileOverflow = await page.evaluate(() => {
    const docWidth = document.documentElement.offsetWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    return {
      docWidth,
      scrollWidth,
      hasHorizontalOverflow: scrollWidth > docWidth + 1
    };
  });

  // --- Viewport 5: Narrow Mobile 360 x 800 ---
  console.log('5. Auditing Narrow Mobile 360x800...');
  await page.setViewport({ width: 360, height: 800, deviceScaleFactor: 2 });
  await page.goto(LIVE_URL, { waitUntil: 'networkidle2' });
  await autoScroll(page);
  await page.screenshot({
    path: path.join(outDir, '05_narrow_mobile_360.png'),
    fullPage: true
  });
  console.log('Saved 05_narrow_mobile_360.png');

  auditData.viewports.narrowMobileOverflow = await page.evaluate(() => {
    const docWidth = document.documentElement.offsetWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    return {
      docWidth,
      scrollWidth,
      hasHorizontalOverflow: scrollWidth > docWidth + 1
    };
  });

  // --- User Journey Testing ---
  console.log('6. Testing User Journeys on Desktop...');
  await page.setViewport({ width: 1440, height: 900 });

  // Journey A: Digital marketing client
  console.log('Journey A: Digital Marketing...');
  await page.goto(LIVE_URL, { waitUntil: 'networkidle2' });
  const marketingPillar = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('START PROJECT INQUIRY'));
    return btn ? { text: btn.innerText } : null;
  });
  auditData.userJourneys.journeyA = { marketingPillarFound: Boolean(marketingPillar) };

  // Check /services route
  console.log('Checking /services route...');
  const servResp = await page.goto('https://xelox-pi.vercel.app/services', { waitUntil: 'networkidle2' });
  const servH1 = await page.$eval('h1', el => el.innerText.trim()).catch(() => 'NOT FOUND');
  auditData.userJourneys.servicesRoute = {
    url: page.url(),
    status: servResp.status(),
    h1: servH1
  };
  await page.screenshot({ path: path.join(outDir, '06_services_page.png') });

  // Check /work route
  console.log('Checking /work route...');
  const workResp = await page.goto('https://xelox-pi.vercel.app/work', { waitUntil: 'networkidle2' });
  const workH1 = await page.$eval('h1', el => el.innerText.trim()).catch(() => 'NOT FOUND');
  auditData.userJourneys.workRoute = {
    url: page.url(),
    status: workResp.status(),
    h1: workH1
  };
  await page.screenshot({ path: path.join(outDir, '07_work_page.png') });

  // Check /pricing route
  console.log('Checking /pricing route...');
  const pricingResp = await page.goto('https://xelox-pi.vercel.app/pricing', { waitUntil: 'networkidle2' });
  const pricingH1 = await page.$eval('h1', el => el.innerText.trim()).catch(() => 'NOT FOUND');
  auditData.userJourneys.pricingRoute = {
    url: page.url(),
    status: pricingResp.status(),
    h1: pricingH1
  };
  await page.screenshot({ path: path.join(outDir, '08_pricing_page.png') });

  // Check /team route
  console.log('Checking /team route...');
  const teamResp = await page.goto('https://xelox-pi.vercel.app/team', { waitUntil: 'networkidle2' });
  const teamH1 = await page.$eval('h1', el => el.innerText.trim()).catch(() => 'NOT FOUND');
  auditData.userJourneys.teamRoute = {
    url: page.url(),
    status: teamResp.status(),
    h1: teamH1
  };
  await page.screenshot({ path: path.join(outDir, '09_team_page.png') });

  // Check /service-inquiry route
  console.log('Checking /service-inquiry route...');
  const inquiryResp = await page.goto('https://xelox-pi.vercel.app/service-inquiry', { waitUntil: 'networkidle2' });
  const inquiryH1 = await page.$eval('h1, h2', el => el.innerText.trim()).catch(() => 'NOT FOUND');
  auditData.userJourneys.serviceInquiryRoute = {
    url: page.url(),
    status: inquiryResp.status(),
    heading: inquiryH1
  };
  await page.screenshot({ path: path.join(outDir, '10_service_inquiry_page.png') });

  // Check /contact anchor / route
  console.log('Checking /contact anchor / route...');
  const contactResp = await page.goto('https://xelox-pi.vercel.app/contact', { waitUntil: 'networkidle2' });
  auditData.userJourneys.contactRoute = {
    url: page.url(),
    status: contactResp.status()
  };

  await browser.close();

  // Save audit data JSON
  fs.writeFileSync(
    path.join(__dirname, '..', 'screenshots', 'live_audit_data.json'),
    JSON.stringify(auditData, null, 2),
    'utf-8'
  );
  console.log('=== Live Audit Inspection Completed Successfully ===');
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
