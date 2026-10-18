const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to homepage...');
  await page.goto('https://xelox-pi.vercel.app/', { waitUntil: 'networkidle2' });

  // Test 1: Check client-side navigation
  const results = {};

  // Click on 'Services' button
  console.log('Testing client navigation to Services...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('header button, nav button'));
    const b = btns.find(el => el.innerText.trim() === 'Services');
    if (b) b.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  results.servicesUrl = page.url();
  results.servicesH1 = await page.$eval('h1', el => el.innerText).catch(() => 'no h1');
  await page.screenshot({ path: 'screenshots/live_audit/client_nav_services.png', fullPage: true });

  // Test 2: Click on 'Work' button
  console.log('Testing client navigation to Work...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('header button, nav button'));
    const b = btns.find(el => el.innerText.trim() === 'Work');
    if (b) b.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  results.workUrl = page.url();
  results.workH1 = await page.$eval('h1', el => el.innerText).catch(() => 'no h1');
  await page.screenshot({ path: 'screenshots/live_audit/client_nav_work.png', fullPage: true });

  // Test 3: Click on 'Pricing' button
  console.log('Testing client navigation to Pricing...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('header button, nav button'));
    const b = btns.find(el => el.innerText.trim() === 'Pricing');
    if (b) b.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  results.pricingUrl = page.url();
  results.pricingH1 = await page.$eval('h1', el => el.innerText).catch(() => 'no h1');
  await page.screenshot({ path: 'screenshots/live_audit/client_nav_pricing.png', fullPage: true });

  // Test 4: Check Contact Form on Home
  console.log('Checking Contact Form...');
  await page.goto('https://xelox-pi.vercel.app/', { waitUntil: 'networkidle2' });
  const formFields = await page.$$eval('#contact input, #contact textarea, #contact select', els =>
    els.map(el => ({
      name: el.name || el.id,
      placeholder: el.placeholder,
      type: el.type,
      required: el.required
    }))
  );
  results.formFields = formFields;

  // Test 5: Check CTA buttons alignment & destination
  const ctaLinks = await page.$$eval('a, button', els => 
    els.filter(el => {
      const text = el.innerText ? el.innerText.trim() : '';
      return /start|inquiry|consultation|brief|quote|contact/i.test(text);
    }).map(el => ({
      text: el.innerText.trim().replace(/\n/g, ' '),
      tag: el.tagName,
      href: el.getAttribute('href')
    }))
  );
  results.ctaLinks = ctaLinks.slice(0, 15);

  fs.writeFileSync('screenshots/live_interaction_results.json', JSON.stringify(results, null, 2));
  console.log('Interaction test completed successfully.');

  await browser.close();
})();
