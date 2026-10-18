const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\ramku\\.gemini\\antigravity-ide\\brain\\5f1bb91b-e5ed-4c0d-85b6-005a5c9c167e';
const BASE_URL = 'http://localhost:5173';

async function runLogoVerification() {
  console.log('====================================================');
  console.log('   XELOX SOLUTIONS: LOGO INTEGRATION VERIFICATION   ');
  console.log('====================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  // 1. Desktop Light Mode Header
  console.log('Testing Desktop Header (Light Mode)...');
  await page.setViewport({ width: 1440, height: 900, isMobile: false });
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  // Ensure Light Mode
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 400));

  const desktopHeaderLight = path.join(ARTIFACT_DIR, 'logo_desktop_light.png');
  // Capture header area
  const headerElem = await page.$('header');
  if (headerElem) {
    await headerElem.screenshot({ path: desktopHeaderLight });
  } else {
    await page.screenshot({ path: desktopHeaderLight, clip: { x: 0, y: 0, width: 1440, height: 120 } });
  }
  console.log(`Saved: ${desktopHeaderLight}`);

  // 2. Desktop Dark Mode Header
  console.log('Testing Desktop Header (Dark Mode)...');
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 400));

  const desktopHeaderDark = path.join(ARTIFACT_DIR, 'logo_desktop_dark.png');
  if (headerElem) {
    await headerElem.screenshot({ path: desktopHeaderDark });
  } else {
    await page.screenshot({ path: desktopHeaderDark, clip: { x: 0, y: 0, width: 1440, height: 120 } });
  }
  console.log(`Saved: ${desktopHeaderDark}`);

  // 3. Footer in Dark Mode
  console.log('Testing Footer (Dark Mode)...');
  const footerElem = await page.$('footer');
  const footerDark = path.join(ARTIFACT_DIR, 'logo_footer_dark.png');
  if (footerElem) {
    await footerElem.scrollIntoView();
    await new Promise(r => setTimeout(r, 400));
    await footerElem.screenshot({ path: footerDark });
  } else {
    await page.screenshot({ path: footerDark, clip: { x: 0, y: 8000, width: 1440, height: 400 } });
  }
  console.log(`Saved: ${footerDark}`);

  // 4. Mobile Header (390px - iPhone 14) Light Mode
  console.log('Testing Mobile Header (Light Mode)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 600));

  const mobileHeaderLight = path.join(ARTIFACT_DIR, 'logo_mobile_light.png');
  await page.screenshot({ path: mobileHeaderLight, clip: { x: 0, y: 0, width: 390, height: 90 } });
  console.log(`Saved: ${mobileHeaderLight}`);

  // 5. Mobile Header Dark Mode
  console.log('Testing Mobile Header (Dark Mode)...');
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 400));

  const mobileHeaderDark = path.join(ARTIFACT_DIR, 'logo_mobile_dark.png');
  await page.screenshot({ path: mobileHeaderDark, clip: { x: 0, y: 0, width: 390, height: 90 } });
  console.log(`Saved: ${mobileHeaderDark}`);

  // 6. Mobile Open Drawer Menu
  console.log('Testing Mobile Drawer Menu...');
  const menuBtn = await page.$('button[aria-label="Open main menu"]');
  if (menuBtn) {
    await menuBtn.click();
    await new Promise(r => setTimeout(r, 600));
  }
  const mobileDrawer = path.join(ARTIFACT_DIR, 'logo_mobile_drawer.png');
  await page.screenshot({ path: mobileDrawer, clip: { x: 0, y: 0, width: 390, height: 200 } });
  console.log(`Saved: ${mobileDrawer}`);

  // 7. Verify no white rectangle container exists
  const checkWhiteBox = await page.evaluate(() => {
    const whiteBox = document.querySelector('.bg-\\[\\#FFFFFF\\]');
    const svgs = document.querySelectorAll('header svg, footer svg');
    return {
      hasWhiteBox: !!whiteBox,
      svgCount: svgs.length
    };
  });
  console.log(`White box container detected: ${checkWhiteBox.hasWhiteBox ? 'FAIL (Still exists)' : 'PASS (Removed)'}`);
  console.log(`SVG logo elements detected: ${checkWhiteBox.svgCount}`);

  // 8. Test logo click navigates to /
  console.log('Testing Logo Homepage Link Navigation...');
  await page.goto(`${BASE_URL}/services`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));
  
  const logoLink = await page.$('header a[href="/"]');
  if (logoLink) {
    await logoLink.click();
    await new Promise(r => setTimeout(r, 600));
  }
  const currentUrl = page.url();
  const navigatedHome = currentUrl === `${BASE_URL}/` || currentUrl === `${BASE_URL}`;
  console.log(`Logo click navigation to /: ${navigatedHome ? 'PASS' : 'FAIL'} (URL: ${currentUrl})`);

  console.log('\n--- VERIFICATION SUMMARY ---');
  console.log(`Console Errors: ${consoleErrors.length}`);
  console.log('Verification completed successfully!');

  await browser.close();
}

runLogoVerification().catch(console.error);
