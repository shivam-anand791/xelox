const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\ramku\\.gemini\\antigravity-ide\\brain\\5f1bb91b-e5ed-4c0d-85b6-005a5c9c167e';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const routes = [
    { url: 'http://localhost:5173/', name: 'Home' },
    { url: 'http://localhost:5173/services', name: 'Services' },
    { url: 'http://localhost:5173/work', name: 'Work' },
    { url: 'http://localhost:5173/pricing', name: 'Pricing' },
    { url: 'http://localhost:5173/team', name: 'Team' },
    { url: 'http://localhost:5173/service-inquiry', name: 'Inquiry' },
    { url: 'http://localhost:5173/work/category/ecommerce', name: 'Ecommerce' }
  ];

  console.log('--- METADATA ROUTING VERIFICATION ---');
  for (const r of routes) {
    await page.goto(r.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(res => setTimeout(res, 500));
    const title = await page.title();
    const desc = await page.$eval('meta[name="description"]', el => el.content).catch(() => 'NONE');
    console.log(`[${r.name}] Title: "${title}"`);
    console.log(`  -> Description: "${desc}"`);
  }

  // Check Logo Alt Attributes
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(res => setTimeout(res, 1000));
  const desktopLogoAlt = await page.$eval('nav img', el => el.getAttribute('alt')).catch(() => 'NOT FOUND');
  console.log(`Desktop Navbar Logo Alt: "${desktopLogoAlt}"`);

  // Screenshot Insights Section
  const insightsEl = await page.$('#insights');
  if (insightsEl) {
    await page.evaluate(() => document.getElementById('insights')?.scrollIntoView());
    await new Promise(res => setTimeout(res, 2000));
    await insightsEl.screenshot({ path: path.join(ARTIFACT_DIR, 'insights_section.png') });
    console.log('Captured insights_section.png');
  }

  // Screenshot Contact Section
  const contactEl = await page.$('#contact');
  if (contactEl) {
    await contactEl.screenshot({ path: path.join(ARTIFACT_DIR, 'contact_section.png') });
    console.log('Captured contact_section.png');
  }

  await browser.close();
  console.log('--- PHASE 5 BROWSER VERIFICATION COMPLETE ---');
}

run();
