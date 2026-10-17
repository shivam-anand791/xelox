const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // 1. Desktop Homepage
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(__dirname, '..', 'test_home_desktop.png') });
  console.log('1. Homepage desktop captured');

  // 2. Desktop Work Page
  await page.goto('http://localhost:5173/work', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(__dirname, '..', 'test_work_desktop.png') });
  console.log('2. Work page desktop captured');

  // 3. Desktop Services Page
  await page.goto('http://localhost:5173/services', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(__dirname, '..', 'test_services_desktop.png') });
  console.log('3. Services page desktop captured');

  // 4. Desktop Team Page
  await page.goto('http://localhost:5173/team', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(__dirname, '..', 'test_team_desktop.png') });
  console.log('4. Team page desktop captured');

  // 5. Desktop Work Category Page
  await page.goto('http://localhost:5173/work/category/web-development', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(__dirname, '..', 'test_work_category_desktop.png') });
  console.log('5. Work Category page captured');

  // 6. Direct entry to /pricing
  await page.goto('http://localhost:5173/pricing', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '..', 'test_pricing_direct.png') });
  console.log('6. Direct /pricing captured');

  // 7. Direct entry to /insights
  await page.goto('http://localhost:5173/insights', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '..', 'test_insights_direct.png') });
  console.log('7. Direct /insights captured');

  // 8. Service Inquiry Page
  await page.goto('http://localhost:5173/service-inquiry', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(__dirname, '..', 'test_inquiry_desktop.png') });
  console.log('8. Service Inquiry captured');

  // 9. Mobile Homepage
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(__dirname, '..', 'test_home_mobile.png') });
  console.log('9. Mobile homepage captured');

  // 10. Mobile Menu Open
  const menuBtn = await page.$('button[aria-controls="mobile-navigation-menu"]');
  if (menuBtn) {
    await menuBtn.click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(__dirname, '..', 'test_mobile_menu_open.png') });
    console.log('10. Mobile menu open captured');
  }

  // 11. Dark mode test
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:5173/work', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  });
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: path.join(__dirname, '..', 'test_work_dark.png') });
  console.log('11. Work dark mode captured');

  // 12. Mobile dark menu
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:5173/work', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  });
  const darkMenuBtn = await page.$('button[aria-controls="mobile-navigation-menu"]');
  if (darkMenuBtn) {
    await darkMenuBtn.click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(__dirname, '..', 'test_mobile_dark_menu.png') });
    console.log('12. Mobile dark menu captured');
  }

  await browser.close();
  console.log('All tests completed successfully!');
})();
