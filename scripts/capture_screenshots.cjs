const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.join(__dirname, '..', 'frontend', 'public', 'portfolio');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const SITES = [
  {
    id: 'laptopmitra',
    name: 'LaptopMitra',
    url: 'https://laptop-mitra.vercel.app/',
    desktopFilename: 'laptopmitra-homepage.webp',
    mobileFilename: 'laptopmitra-mobile.webp',
    category: 'web-development'
  },
  {
    id: 'touristpalace',
    name: 'Tourist Palace',
    url: 'https://touristpalace.vercel.app/',
    desktopFilename: 'touristpalace-homepage.webp',
    mobileFilename: 'touristpalace-mobile.webp',
    category: 'web-development'
  },
  {
    id: 'adorca',
    name: 'Adorca 360',
    url: 'https://adorca.vercel.app/',
    desktopFilename: 'adorca-homepage.webp',
    mobileFilename: 'adorca-mobile.webp',
    category: 'digital-marketing'
  },
  {
    id: 'esailor',
    name: 'eSailor',
    url: 'https://esailor-ectg.vercel.app/',
    desktopFilename: 'esailor-homepage.webp',
    mobileFilename: 'esailor-mobile.webp',
    category: 'web-development'
  },
  {
    id: 'properties-professor',
    name: 'Properties Professor',
    url: 'https://propertiesprofessor.com/',
    desktopFilename: 'properties-professor-homepage.webp',
    mobileFilename: 'properties-professor-mobile.webp',
    category: 'web-development'
  }
];

async function capture() {
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

  const results = [];

  for (const site of SITES) {
    console.log(`\n========================================`);
    console.log(`Processing: ${site.name} (${site.url})`);
    
    // 1. Desktop Viewport
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
      
      console.log(`Navigating desktop: ${site.url}...`);
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 35000 }).catch(err => {
        console.warn(`networkidle2 timed out for ${site.url}, proceeding with domcontentloaded`);
      });

      // Wait an extra 2.5 seconds for animations/fonts to settle
      await new Promise(r => setTimeout(r, 2500));

      const title = await page.title();
      const metaDesc = await page.$eval('meta[name="description"]', el => el.content).catch(() => '');
      const h1Text = await page.$eval('h1', el => el.innerText.trim()).catch(() => '');
      
      console.log(`Page Title: "${title}"`);
      console.log(`H1 Text: "${h1Text}"`);

      const desktopPath = path.join(OUTPUT_DIR, site.desktopFilename);
      await page.screenshot({
        path: desktopPath,
        type: 'webp',
        quality: 88,
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });
      console.log(`Saved Desktop Screenshot: ${desktopPath}`);

      await page.close();

      // 2. Mobile Viewport (iPhone 14 / modern mobile 390x844)
      const mobilePage = await browser.newPage();
      await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
      await mobilePage.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1');
      
      console.log(`Navigating mobile: ${site.url}...`);
      await mobilePage.goto(site.url, { waitUntil: 'networkidle2', timeout: 35000 }).catch(err => {
        console.warn(`Mobile networkidle2 timed out for ${site.url}, proceeding`);
      });

      await new Promise(r => setTimeout(r, 2500));

      const mobilePath = path.join(OUTPUT_DIR, site.mobileFilename);
      await mobilePage.screenshot({
        path: mobilePath,
        type: 'webp',
        quality: 88,
        clip: { x: 0, y: 0, width: 390, height: 844 }
      });
      console.log(`Saved Mobile Screenshot: ${mobilePath}`);

      await mobilePage.close();

      results.push({
        ...site,
        success: true,
        title,
        h1Text,
        metaDesc,
        desktopPath,
        mobilePath
      });
    } catch (err) {
      console.error(`Failed to capture ${site.name}:`, err.message);
      results.push({
        ...site,
        success: false,
        error: err.message
      });
    }
  }

  await browser.close();
  console.log('\n========================================');
  console.log('Capture summary:');
  console.log(JSON.stringify(results, null, 2));

  fs.writeFileSync(path.join(OUTPUT_DIR, 'capture_results.json'), JSON.stringify(results, null, 2));
}

capture().catch(err => {
  console.error('Fatal capture error:', err);
  process.exit(1);
});
