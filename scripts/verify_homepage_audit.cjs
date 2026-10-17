const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  console.log('=== Starting Homepage UX & Content Audit Verification ===');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  // 1. Audit Desktop Homepage Structure
  console.log('1. Checking Desktop layout (1440x900)...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Inspect section ordering
  const sections = await page.evaluate(() => {
    const main = document.querySelector('main');
    if (!main) return [];
    return Array.from(main.children).map(child => ({
      tagName: child.tagName,
      id: child.id || child.getAttribute('id') || child.className.slice(0, 30)
    }));
  });
  console.log('Detected Homepage Sections in order:', sections);

  // Check key elements
  const headline = await page.$eval('h1', el => el.innerText.trim()).catch(() => 'NOT FOUND');
  console.log('Hero Headline:', headline);

  // Verify engineering pill text in Hero
  const heroPillText = await page.evaluate(() => {
    const hero = document.querySelector('section');
    return hero ? hero.innerText : '';
  });
  const hasSubSecond = heroPillText.includes('Sub-Second') || heroPillText.includes('99+ Vitals');
  const has142Percent = heroPillText.includes('+142%');
  console.log('Hero has Sub-Second engineering pill:', hasSubSecond);
  console.log('Hero has unsupported +142% claim:', has142Percent);

  const autoScroll = async (p) => {
    await p.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 80);
      });
    });
    await new Promise(r => setTimeout(r, 800));
  };

  // Capture Desktop Screenshot
  await autoScroll(page);
  await page.screenshot({
    path: path.join(screenshotsDir, 'homepage-desktop.png'),
    fullPage: true
  });
  console.log('Saved screenshots/homepage-desktop.png');

  // 2. Audit Tablet View (768x1024)
  console.log('2. Checking Tablet layout (768x1024)...');
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await autoScroll(page);
  await page.screenshot({
    path: path.join(screenshotsDir, 'homepage-tablet.png'),
    fullPage: true
  });
  console.log('Saved screenshots/homepage-tablet.png');

  // 3. Audit Mobile View (390x844)
  console.log('3. Checking Mobile layout (390x844)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await autoScroll(page);
  await page.screenshot({
    path: path.join(screenshotsDir, 'homepage-mobile.png'),
    fullPage: true
  });
  console.log('Saved screenshots/homepage-mobile.png');

  // 4. Verify Dedicated /pricing Page
  console.log('4. Checking dedicated /pricing route...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/pricing', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const pricingTitle = await page.$eval('h1', el => el.innerText.trim()).catch(() => 'NOT FOUND');
  console.log('/pricing Page Title:', pricingTitle);

  const packageCount = await page.$$eval('#pricing .grid > div', els => els.length).catch(() => 0);
  console.log('/pricing Packages count:', packageCount);

  await page.screenshot({
    path: path.join(screenshotsDir, 'pricing-page-desktop.png'),
    fullPage: true
  });
  console.log('Saved screenshots/pricing-page-desktop.png');

  // 5. Test Navigation click from Home to Pricing
  console.log('5. Testing navigation flow from Home to Pricing...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 400));

  // Click on Pricing in nav
  const pricingNav = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('nav a, nav button'));
    const link = links.find(l => l.innerText.trim().toLowerCase() === 'pricing');
    if (link) {
      link.click();
      return true;
    }
    return false;
  });
  console.log('Clicked Pricing in nav:', pricingNav);
  await new Promise(r => setTimeout(r, 500));
  const currentUrl = page.url();
  console.log('Current URL after clicking Pricing:', currentUrl);

  // 6. Test Services Page
  console.log('6. Testing /services route...');
  await page.goto('http://localhost:5173/services', { waitUntil: 'networkidle2' });
  const servicesTitle = await page.$eval('h1', el => el.innerText.trim()).catch(() => 'NOT FOUND');
  console.log('/services Page Title:', servicesTitle);

  // 7. Test Work Page
  console.log('7. Testing /work route...');
  await page.goto('http://localhost:5173/work', { waitUntil: 'networkidle2' });
  const workTitle = await page.$eval('h1', el => el.innerText.trim()).catch(() => 'NOT FOUND');
  console.log('/work Page Title:', workTitle);

  // 8. Test Team Page
  console.log('8. Testing /team route...');
  await page.goto('http://localhost:5173/team', { waitUntil: 'networkidle2' });
  const teamTitle = await page.$eval('h1', el => el.innerText.trim()).catch(() => 'NOT FOUND');
  console.log('/team Page Title:', teamTitle);

  console.log('Console errors recorded:', errors.length);
  if (errors.length > 0) {
    console.log('Errors:', errors);
  }

  await browser.close();
  console.log('=== All Homepage Audits and Verifications Completed ===');
}

main().catch(err => {
  console.error('Test script failed:', err);
  process.exit(1);
});
