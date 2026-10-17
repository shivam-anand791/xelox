const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:4173';

async function runPreviewTest() {
  console.log('Testing production build preview at', BASE_URL);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Refresh /work in production build
  await page.goto(`${BASE_URL}/work`, { waitUntil: 'networkidle2' });
  console.log('Opened /work on production build. Current URL:', page.url());
  await page.reload({ waitUntil: 'networkidle2' });
  console.log('Refreshed /work on production build. Current URL:', page.url());
  const workText = await page.evaluate(() => document.body.innerText);
  if (!workText.includes('ENGINEERED FOR SCALE') && !workText.includes('Production Client Showcase')) {
    throw new Error('WorkPage failed to load on production build refresh');
  }

  // 2. Refresh /services in production build
  await page.goto(`${BASE_URL}/services`, { waitUntil: 'networkidle2' });
  await page.reload({ waitUntil: 'networkidle2' });
  console.log('Refreshed /services on production build. Current URL:', page.url());
  const servicesText = await page.evaluate(() => document.body.innerText);
  if (!servicesText.includes('THREE PILLARS') && !servicesText.includes('Digital Agency Capabilities')) {
    throw new Error('ServicesPage failed to load on production build refresh');
  }

  // 3. Refresh /team in production build
  await page.goto(`${BASE_URL}/team`, { waitUntil: 'networkidle2' });
  await page.reload({ waitUntil: 'networkidle2' });
  console.log('Refreshed /team on production build. Current URL:', page.url());
  const teamText = await page.evaluate(() => document.body.innerText);
  if (!teamText.includes('THE TEAM BEHIND THE SYSTEMS') && !teamText.includes('National Championships')) {
    throw new Error('TeamPage failed to load on production build refresh');
  }

  // 4. Refresh /service-inquiry with query params
  await page.goto(`${BASE_URL}/service-inquiry?category=web-development&package=Starter%20Presence`, { waitUntil: 'networkidle2' });
  await page.reload({ waitUntil: 'networkidle2' });
  console.log('Refreshed /service-inquiry on production build. Current URL:', page.url());
  if (!page.url().includes('package=Starter%20Presence')) {
    throw new Error('Query parameters lost on production build refresh');
  }

  // 5. 404 on nonexistent route
  await page.goto(`${BASE_URL}/some-unknown-path`, { waitUntil: 'networkidle2' });
  await page.reload({ waitUntil: 'networkidle2' });
  console.log('Refreshed nonexistent route on production build. Current URL:', page.url());
  const notFoundText = await page.evaluate(() => document.body.innerText);
  if (!notFoundText.includes('404') || !notFoundText.includes('PAGE NOT FOUND')) {
    throw new Error('404 Not Found page failed to render on production build');
  }

  console.log('✅ ALL PRODUCTION PREVIEW TESTS PASSED SUCCESSFULLY!');
  await browser.close();
}

runPreviewTest().catch(err => {
  console.error('❌ Production Preview Test Failed:', err);
  process.exit(1);
});
