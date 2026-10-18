const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\ramku\\.gemini\\antigravity-ide\\brain\\5f1bb91b-e5ed-4c0d-85b6-005a5c9c167e';

const BASE_URL = 'http://localhost:5173';

async function runQA() {
  console.log('====================================================');
  console.log('   XELOX SOLUTIONS: FULL COMPREHENSIVE QA SUITE     ');
  console.log('====================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage'
    ]
  });

  const page = await browser.newPage();

  const failedAssets = [];
  const consoleErrors = [];

  page.on('response', response => {
    const url = response.url();
    const status = response.status();
    // Exclude external third-party tracking or remote API delays from internal asset checks
    if (url.startsWith(BASE_URL) && status >= 400) {
      failedAssets.push({ url, status });
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  const testResults = {
    routes: [],
    history: null,
    viewports: [],
    interactions: [],
    forms: []
  };

  try {
    // ----------------------------------------------------
    // TEST 1: ROUTE DIRECT LOAD & REFRESH VERIFICATION
    // ----------------------------------------------------
    console.log('--- TEST 1: ROUTE DIRECT LOAD & REFRESH ---');
    const routesToTest = [
      { path: '/', expectedTitlePart: 'Xelox Solutions' },
      { path: '/services', expectedTitlePart: 'Services' },
      { path: '/work', expectedTitlePart: 'Portfolio' },
      { path: '/pricing', expectedTitlePart: 'Pricing' },
      { path: '/team', expectedTitlePart: 'Engineering Leadership' },
      { path: '/service-inquiry', expectedTitlePart: 'Initiate Project Brief' },
      { path: '/privacy', expectedTitlePart: 'Privacy Policy' },
      { path: '/terms', expectedTitlePart: 'Terms of Service' },
      { path: '/work/category/ecommerce', expectedTitlePart: 'E-Commerce' },
      { path: '/work/category/mobile-apps', expectedTitlePart: 'Mobile App Architecture' },
      { path: '/non-existent-page-404', expectedTitlePart: '404' }
    ];

    await page.setViewport({ width: 1440, height: 900 });

    for (const r of routesToTest) {
      const url = `${BASE_URL}${r.path}`;
      // Direct load
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await new Promise(res => setTimeout(res, 600));
      const directTitle = await page.title();
      const directDesc = await page.$eval('meta[name="description"]', el => el.content).catch(() => '');

      // Refresh
      await page.reload({ waitUntil: 'domcontentloaded', timeout: 15000 });
      await new Promise(res => setTimeout(res, 600));
      const refreshTitle = await page.title();

      const passed = directTitle.includes(r.expectedTitlePart) && refreshTitle.includes(r.expectedTitlePart);
      console.log(`Route [${r.path}]: ${passed ? 'PASS' : 'FAIL'} | Title: "${directTitle}" | Refreshed: "${refreshTitle}"`);

      testResults.routes.push({
        path: r.path,
        directTitle,
        refreshTitle,
        description: directDesc,
        passed
      });
    }

    // ----------------------------------------------------
    // TEST 2: BROWSER HISTORY (BACK / FORWARD NAVIGATION)
    // ----------------------------------------------------
    console.log('\n--- TEST 2: BROWSER HISTORY NAVIGATION ---');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await new Promise(res => setTimeout(res, 500));
    const titleHome = await page.title();

    // Navigate to /services via client routing click
    await page.evaluate(() => {
      const link = document.querySelector('a[href="/services"]');
      if (link) link.click();
    });
    await new Promise(res => setTimeout(res, 800));
    const titleServices = await page.title();

    // Navigate to /work via client routing click
    await page.evaluate(() => {
      const link = document.querySelector('a[href="/work"]');
      if (link) link.click();
    });
    await new Promise(res => setTimeout(res, 800));
    const titleWork = await page.title();

    // Go Back (should be /services)
    await page.goBack();
    await new Promise(res => setTimeout(res, 800));
    const titleBackServices = await page.title();

    // Go Forward (should be /work)
    await page.goForward();
    await new Promise(res => setTimeout(res, 800));
    const titleForwardWork = await page.title();

    const historyPassed = 
      titleServices.includes('Services') &&
      titleWork.includes('Portfolio') &&
      titleBackServices.includes('Services') &&
      titleForwardWork.includes('Portfolio');

    console.log(`History Navigation: ${historyPassed ? 'PASS' : 'FAIL'}`);
    console.log(`  -> Services: "${titleServices}"`);
    console.log(`  -> Work: "${titleWork}"`);
    console.log(`  -> Back: "${titleBackServices}"`);
    console.log(`  -> Forward: "${titleForwardWork}"`);

    testResults.history = { passed: historyPassed };

    // ----------------------------------------------------
    // TEST 3: RESPONSIVE TESTING ACROSS 5 BREAKPOINTS
    // ----------------------------------------------------
    console.log('\n--- TEST 3: RESPONSIVE TESTING & OVERFLOW CHECKS ---');
    const viewports = [
      { name: 'Mobile S', width: 360, height: 740, isMobile: true },
      { name: 'Mobile M (iPhone 14)', width: 390, height: 844, isMobile: true },
      { name: 'Tablet Portrait', width: 768, height: 1024, isMobile: false },
      { name: 'Laptop / Tablet Landscape', width: 1024, height: 768, isMobile: false },
      { name: 'Desktop HD', width: 1440, height: 900, isMobile: false }
    ];

    for (const vp of viewports) {
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        isMobile: vp.isMobile
      });

      await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
      await new Promise(res => setTimeout(res, 1200));

      // Calculate horizontal overflow
      const overflowData = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const bodyWidth = document.body.scrollWidth;
        const hasOverflow = docWidth > winWidth || bodyWidth > winWidth;
        return { docWidth, winWidth, bodyWidth, hasOverflow };
      });

      const shotName = `qa_viewport_${vp.width}.png`;
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, shotName),
        fullPage: false
      });

      const passed = !overflowData.hasOverflow;
      console.log(`Viewport ${vp.width}px (${vp.name}): ${passed ? 'PASS (No Overflow)' : 'FAIL (Overflow Detected)'} [doc: ${overflowData.docWidth}px, win: ${overflowData.winWidth}px]`);

      testResults.viewports.push({
        width: vp.width,
        name: vp.name,
        overflowData,
        screenshot: shotName,
        passed
      });
    }

    // ----------------------------------------------------
    // TEST 4: INTERACTIVE COMPONENT VERIFICATION
    // ----------------------------------------------------
    console.log('\n--- TEST 4: INTERACTIVE COMPONENTS ---');

    // 4A: Mobile Menu Toggle at 390px
    await page.setViewport({ width: 390, height: 844, isMobile: true });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await new Promise(res => setTimeout(res, 600));

    // Open mobile menu
    const menuBtn = await page.$('button[aria-label="Open navigation menu"]');
    let mobileMenuPassed = false;
    if (menuBtn) {
      await menuBtn.click();
      await new Promise(res => setTimeout(res, 600));
      const isMenuVisible = await page.evaluate(() => {
        const dialog = document.querySelector('div[role="dialog"]');
        return dialog !== null && window.getComputedStyle(dialog).display !== 'none';
      });

      // Close mobile menu
      const closeBtn = await page.$('button[aria-label="Close navigation menu"]');
      if (closeBtn) await closeBtn.click();
      await new Promise(res => setTimeout(res, 400));
      mobileMenuPassed = isMenuVisible;
    }
    console.log(`Mobile Drawer Menu Interaction: ${mobileMenuPassed ? 'PASS' : 'FAIL'}`);
    testResults.interactions.push({ name: 'Mobile Menu Drawer', passed: mobileMenuPassed });

    // 4B: Work Category Filtering & Modal on Desktop
    await page.setViewport({ width: 1440, height: 900, isMobile: false });
    await page.goto(`${BASE_URL}/work`, { waitUntil: 'domcontentloaded' });
    await new Promise(res => setTimeout(res, 1000));

    // Click E-Commerce Tab
    const ecommerceTabPassed = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const ecomBtn = buttons.find(b => b.innerText.includes('E-Commerce'));
      if (ecomBtn) {
        ecomBtn.click();
        return true;
      }
      return false;
    });
    await new Promise(res => setTimeout(res, 800));

    // Verify LaptopMitra visible
    const laptopMitraVisible = await page.evaluate(() => {
      return document.body.innerText.includes('LaptopMitra') && !document.body.innerText.includes('Tourist Palace');
    });
    console.log(`Work Page Category Filter (E-Commerce): ${ecommerceTabPassed && laptopMitraVisible ? 'PASS' : 'FAIL'}`);
    testResults.interactions.push({ name: 'Work Category Filter (E-Commerce)', passed: ecommerceTabPassed && laptopMitraVisible });

    // Open Modal via 'View Specification' button
    const modalOpened = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const specBtn = buttons.find(b => (b.textContent || '').includes('View Specification'));
      if (specBtn) {
        specBtn.scrollIntoView({ behavior: 'instant', block: 'center' });
        specBtn.click();
        return true;
      }
      return false;
    });
    await new Promise(res => setTimeout(res, 800));

    const modalHasAuditSections = await page.evaluate(() => {
      const text = document.body.innerText || document.body.textContent || '';
      return text.includes('Project Context') && text.includes('Verifiable Outcome');
    });

    // Close Modal
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Close modal"]') || document.querySelector('div.fixed button');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(res => setTimeout(res, 400));

    console.log(`Work Modal Audit Content: ${modalOpened && modalHasAuditSections ? 'PASS' : 'FAIL'}`);
    testResults.interactions.push({ name: 'Work Modal Audit Content', passed: modalOpened && modalHasAuditSections });

    // ----------------------------------------------------
    // TEST 5: FORM VALIDATION & SAFE SUBMISSION BEHAVIOR
    // ----------------------------------------------------
    console.log('\n--- TEST 5: CONTACT FORM VALIDATION ---');
    await page.goto(`${BASE_URL}/#contact`, { waitUntil: 'domcontentloaded' });
    await new Promise(res => setTimeout(res, 1200));

    // Verify inputs and HTML5 required attributes
    const formFieldsValid = await page.evaluate(() => {
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const serviceSelect = document.getElementById('contact-service');
      const messageText = document.getElementById('contact-message');

      const nameRequired = nameInput && nameInput.hasAttribute('required');
      const emailRequired = emailInput && emailInput.hasAttribute('required');
      const messageRequired = messageText && messageText.hasAttribute('required');

      return nameRequired && emailRequired && messageRequired;
    });

    console.log(`Contact Form Required Field Validation: ${formFieldsValid ? 'PASS' : 'FAIL'}`);
    testResults.forms.push({ name: 'Contact Form Required Attributes', passed: formFieldsValid });

  } catch (err) {
    console.error('QA Suite error:', err);
  } finally {
    await browser.close();
  }

  // ----------------------------------------------------
  // CONSOLE & ASSET CHECK
  // ----------------------------------------------------
  console.log('\n--- FAILED ASSETS & CONSOLE ERRORS ---');
  console.log(`Failed internal assets (>=400): ${failedAssets.length}`);
  failedAssets.forEach(a => console.log(`  -> ${a.status} ${a.url}`));
  console.log(`Page errors: ${consoleErrors.length}`);
  consoleErrors.forEach(e => console.log(`  -> ${e}`));

  // Write results JSON
  fs.writeFileSync(
    path.join(ARTIFACT_DIR, 'qa_results.json'),
    JSON.stringify({ testResults, failedAssets, consoleErrors }, null, 2)
  );

  console.log('\nQA Suite completed. Results saved to qa_results.json');
}

runQA();
