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
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  try {
    console.log('Navigating to http://localhost:5173/#portfolio in dark mode...');
    await page.goto('http://localhost:5173/#portfolio', { waitUntil: 'networkidle2', timeout: 15000 });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('xelox_theme', 'dark');
      document.getElementById('portfolio')?.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 2500));

    // Process section dark
    const processEl = await page.$('#process');
    if (processEl) {
      await processEl.screenshot({ path: path.join(ARTIFACT_DIR, 'process_section_dark.png') });
      console.log('Captured process_section_dark.png');
    }

    // Portfolio section dark
    const portfolioEl = await page.$('#portfolio');
    if (portfolioEl) {
      await portfolioEl.screenshot({ path: path.join(ARTIFACT_DIR, 'portfolio_section_dark.png') });
      console.log('Captured portfolio_section_dark.png');
    }

    // Mobile layout on viewport 390x844 (iPhone 14)
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await page.goto('http://localhost:5173/#process', { waitUntil: 'networkidle2', timeout: 15000 });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'process_section_mobile_dark.png') });
    console.log('Captured process_section_mobile_dark.png');

  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    await browser.close();
    console.log('Done capturing dark & mobile screenshots.');
  }
}

run();
