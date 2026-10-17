const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function auditWorkPage() {
  const screenshotDir = path.join(__dirname, '..', 'screenshots');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to http://localhost:5173/work...');
    await page.goto('http://localhost:5173/work', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));

    await page.screenshot({
      path: path.join(screenshotDir, 'work-page-desktop.png')
    });
    console.log('Saved screenshots/work-page-desktop.png');

    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:5173/work', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));

    await page.screenshot({
      path: path.join(screenshotDir, 'work-page-mobile.png')
    });
    console.log('Saved screenshots/work-page-mobile.png');
  } finally {
    await browser.close();
  }
}

auditWorkPage().catch(err => {
  console.error(err);
  process.exit(1);
});
