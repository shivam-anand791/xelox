const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\ramku\\.gemini\\antigravity-ide\\brain\\5f1bb91b-e5ed-4c0d-85b6-005a5c9c167e';

async function run() {
  console.log('Launching Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--ignore-certificate-errors'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  try {
    // 1. Process Section on Homepage
    console.log('Navigating to http://localhost:5173/#process ...');
    await page.goto('http://localhost:5173/#process', { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 2000));
    
    const processEl = await page.$('#process');
    if (processEl) {
      await processEl.screenshot({
        path: path.join(ARTIFACT_DIR, 'process_section.png')
      });
      console.log('Captured process_section.png');
    }

    // 2. Portfolio Section on Homepage
    console.log('Navigating to http://localhost:5173/#portfolio ...');
    await page.goto('http://localhost:5173/#portfolio', { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 2000));
    
    const portfolioEl = await page.$('#portfolio');
    if (portfolioEl) {
      await portfolioEl.screenshot({
        path: path.join(ARTIFACT_DIR, 'portfolio_section.png')
      });
      console.log('Captured portfolio_section.png');
    }

    // 3. Work Page (/work)
    console.log('Navigating to http://localhost:5173/work ...');
    await page.goto('http://localhost:5173/work', { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'work_page_all.png'),
      fullPage: false
    });
    console.log('Captured work_page_all.png');

    // 4. Ecommerce Category (/work/category/ecommerce)
    console.log('Navigating to http://localhost:5173/work/category/ecommerce ...');
    await page.goto('http://localhost:5173/work/category/ecommerce', { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'work_category_ecommerce.png'),
      fullPage: false
    });
    console.log('Captured work_category_ecommerce.png');

    // 5. Mobile Apps Category (/work/category/mobile-apps)
    console.log('Navigating to http://localhost:5173/work/category/mobile-apps ...');
    await page.goto('http://localhost:5173/work/category/mobile-apps', { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'work_category_mobile.png'),
      fullPage: false
    });
    console.log('Captured work_category_mobile.png');

  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    await browser.close();
    console.log('Finished capturing verification screenshots.');
  }
}

run();
