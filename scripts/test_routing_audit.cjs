const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5173';

async function runTests() {
  console.log('--- STARTING ROUTING AUDIT & REFRESH VERIFICATION ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const results = [];

  async function assertRoute(name, expectedPath, checkFn) {
    try {
      const currentUrl = page.url();
      const urlObj = new URL(currentUrl);
      const pathname = urlObj.pathname;
      const search = urlObj.search;
      const hash = urlObj.hash;

      let passed = true;
      let reason = '';

      if (expectedPath.startsWith('/#')) {
        const expectedHash = expectedPath.replace('/', '');
        if (hash !== expectedHash) {
          passed = false;
          reason = `Expected hash ${expectedHash}, but got ${hash}`;
        }
      } else if (expectedPath.includes('?')) {
        const [expPath, expQuery] = expectedPath.split('?');
        if (pathname !== expPath) {
          passed = false;
          reason = `Expected pathname ${expPath}, but got ${pathname}`;
        }
        if (!search.includes(expQuery)) {
          passed = false;
          reason = `Expected search to contain ${expQuery}, but got ${search}`;
        }
      } else {
        if (pathname !== expectedPath) {
          passed = false;
          reason = `Expected path ${expectedPath}, but got ${pathname}`;
        }
      }

      if (passed && checkFn) {
        const customCheck = await checkFn(page);
        if (!customCheck.ok) {
          passed = false;
          reason = customCheck.message;
        }
      }

      results.push({ name, passed, currentUrl, reason });
      console.log(`${passed ? '✅' : '❌'} ${name} -> ${passed ? 'PASSED' : 'FAILED: ' + reason} (${currentUrl})`);
    } catch (err) {
      results.push({ name, passed: false, currentUrl: page.url(), reason: err.message });
      console.log(`❌ ${name} -> ERROR: ${err.message}`);
    }
  }

  // TEST 1: Direct open homepage & refresh
  console.log('\n[TEST GROUP 1: Homepage]');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
  await assertRoute('Direct open /', '/', async (p) => {
    const text = await p.evaluate(() => document.body.innerText);
    return { ok: text.includes('Xelox'), message: 'Page content did not contain Xelox' };
  });

  await page.reload({ waitUntil: 'networkidle2' });
  await assertRoute('Refresh /', '/', async (p) => {
    const text = await p.evaluate(() => document.body.innerText);
    return { ok: text.includes('Xelox'), message: 'Page content did not contain Xelox after refresh' };
  });

  // TEST 2: Direct open /work & refresh
  console.log('\n[TEST GROUP 2: Work Page]');
  await page.goto(`${BASE_URL}/work`, { waitUntil: 'networkidle2' });
  await assertRoute('Direct open /work', '/work', async (p) => {
    const text = await p.evaluate(() => document.body.innerText);
    return { ok: text.includes('ENGINEERED FOR SCALE') || text.includes('Production Client Showcase'), message: 'Did not render WorkPage' };
  });

  await page.reload({ waitUntil: 'networkidle2' });
  await assertRoute('Refresh /work keeps user on Work page', '/work', async (p) => {
    const text = await p.evaluate(() => document.body.innerText);
    return { ok: text.includes('ENGINEERED FOR SCALE') || text.includes('Production Client Showcase'), message: 'Did not remain on WorkPage after refresh' };
  });

  // TEST 3: Direct open /services & refresh
  console.log('\n[TEST GROUP 3: Services Page]');
  await page.goto(`${BASE_URL}/services`, { waitUntil: 'networkidle2' });
  await assertRoute('Direct open /services', '/services', async (p) => {
    const text = await p.evaluate(() => document.body.innerText);
    return { ok: text.includes('THREE PILLARS') || text.includes('Digital Agency Capabilities'), message: 'Did not render ServicesPage' };
  });

  await page.reload({ waitUntil: 'networkidle2' });
  await assertRoute('Refresh /services keeps user on Services page', '/services', async (p) => {
    const text = await p.evaluate(() => document.body.innerText);
    return { ok: text.includes('THREE PILLARS') || text.includes('Digital Agency Capabilities'), message: 'Did not remain on ServicesPage after refresh' };
  });

  // TEST 4: Direct open /team & refresh
  console.log('\n[TEST GROUP 4: Team Page]');
  await page.goto(`${BASE_URL}/team`, { waitUntil: 'networkidle2' });
  await assertRoute('Direct open /team', '/team', async (p) => {
    const text = await p.evaluate(() => document.body.innerText);
    return { ok: text.includes('THE TEAM BEHIND THE SYSTEMS') || text.includes('National Championships'), message: 'Did not render TeamPage' };
  });

  await page.reload({ waitUntil: 'networkidle2' });
  await assertRoute('Refresh /team keeps user on Team page', '/team', async (p) => {
    const text = await p.evaluate(() => document.body.innerText);
    return { ok: text.includes('THE TEAM BEHIND THE SYSTEMS') || text.includes('National Championships'), message: 'Did not remain on TeamPage after refresh' };
  });

  // TEST 5: Direct open /privacy & /terms & refresh
  console.log('\n[TEST GROUP 5: Legal Pages]');
  await page.goto(`${BASE_URL}/privacy`, { waitUntil: 'networkidle2' });
  await assertRoute('Direct open /privacy', '/privacy');
  await page.reload({ waitUntil: 'networkidle2' });
  await assertRoute('Refresh /privacy keeps user on Privacy page', '/privacy');

  await page.goto(`${BASE_URL}/terms`, { waitUntil: 'networkidle2' });
  await assertRoute('Direct open /terms', '/terms');
  await page.reload({ waitUntil: 'networkidle2' });
  await assertRoute('Refresh /terms keeps user on Terms page', '/terms');

  // TEST 6: Nested route & Query parameters preservation
  console.log('\n[TEST GROUP 6: Query Parameters & Nested Routes]');
  await page.goto(`${BASE_URL}/service-inquiry?category=web-development&package=Starter%20Presence`, { waitUntil: 'networkidle2' });
  await assertRoute('Direct open /service-inquiry with query params', '/service-inquiry?category=web-development&package=Starter%20Presence', async (p) => {
    const text = await p.evaluate(() => document.body.innerText);
    return { ok: text.includes('Service Inquiry') || text.includes('Starter Presence'), message: 'Did not preserve Starter Presence inquiry' };
  });

  await page.reload({ waitUntil: 'networkidle2' });
  await assertRoute('Refresh /service-inquiry preserves query params', '/service-inquiry?category=web-development&package=Starter%20Presence', async (p) => {
    const text = await p.evaluate(() => document.body.innerText);
    return { ok: text.includes('Service Inquiry') || text.includes('Starter Presence'), message: 'Lost query params on refresh' };
  });

  // TEST 7: Work Category nested route
  await page.goto(`${BASE_URL}/work/category/web-development`, { waitUntil: 'networkidle2' });
  await assertRoute('Direct open /work/category/web-development', '/work/category/web-development');
  await page.reload({ waitUntil: 'networkidle2' });
  await assertRoute('Refresh /work/category/web-development keeps exact nested route', '/work/category/web-development');

  // TEST 8: Genuinely nonexistent route (404)
  console.log('\n[TEST GROUP 7: 404 Route Handling]');
  await page.goto(`${BASE_URL}/this-route-definitely-does-not-exist-987`, { waitUntil: 'networkidle2' });
  await assertRoute('Direct open nonexistent route shows 404', '/this-route-definitely-does-not-exist-987', async (p) => {
    const text = await p.evaluate(() => document.body.innerText);
    return { ok: text.includes('404') && text.includes('PAGE NOT FOUND'), message: 'Did not render 404 Not Found page' };
  });

  await page.reload({ waitUntil: 'networkidle2' });
  await assertRoute('Refresh nonexistent route preserves 404 page', '/this-route-definitely-does-not-exist-987', async (p) => {
    const text = await p.evaluate(() => document.body.innerText);
    return { ok: text.includes('404') && text.includes('PAGE NOT FOUND'), message: 'Did not keep 404 Not Found page after refresh' };
  });

  // TEST 9: History navigation (Back and Forward)
  console.log('\n[TEST GROUP 8: History Navigation (Back / Forward)]');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
  
  // 1. On Home, click Work
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('nav button')).find(b => b.textContent && b.textContent.trim() === 'Work');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await assertRoute('Navigate to /work via nav link', '/work');

  // 2. On Work, click "Team & Honors →"
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Team & Honors'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await assertRoute('Navigate to /team via Work page link', '/team');

  // 3. On Team, click "Back to Home"
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Back to Home'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await assertRoute('Navigate to / via Back to Home button', '/');

  // 4. On Home, click Services
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('nav button')).find(b => b.textContent && b.textContent.trim() === 'Services');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await assertRoute('Navigate to /services via nav link', '/services');

  // Now history is: / -> /work -> /team -> / -> /services

  // Step 5: Browser Back should return to / (Homepage)
  await page.goBack({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 400));
  await assertRoute('Browser Back 1 returns to /', '/');

  // Step 6: Browser Back should return to /team
  await page.goBack({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 400));
  await assertRoute('Browser Back 2 returns to /team', '/team', async (p) => {
    const text = await p.evaluate(() => document.body.innerText);
    return { ok: text.includes('THE TEAM BEHIND THE SYSTEMS') || text.includes('National Championships'), message: 'Content was not Team page' };
  });

  // Step 7: Browser Back should return to /work
  await page.goBack({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 400));
  await assertRoute('Browser Back 3 returns to /work', '/work', async (p) => {
    const text = await p.evaluate(() => document.body.innerText);
    return { ok: text.includes('ENGINEERED FOR SCALE') || text.includes('Production Client Showcase'), message: 'Content was not Work page' };
  });

  // Step 8: Browser Forward should return to /team
  await page.goForward({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 400));
  await assertRoute('Browser Forward returns to /team', '/team', async (p) => {
    const text = await p.evaluate(() => document.body.innerText);
    return { ok: text.includes('THE TEAM BEHIND THE SYSTEMS') || text.includes('National Championships'), message: 'Content was not Team page' };
  });

  // Step 9: Refresh on /team after history navigation
  await page.reload({ waitUntil: 'networkidle2' });
  await assertRoute('Refresh on /team after history navigation stays on /team', '/team');

  await browser.close();

  const total = results.length;
  const passedCount = results.filter(r => r.passed).length;
  console.log(`\n========================================`);
  console.log(`AUDIT RESULTS: ${passedCount}/${total} TESTS PASSED`);
  console.log(`========================================`);

  if (passedCount !== total) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
