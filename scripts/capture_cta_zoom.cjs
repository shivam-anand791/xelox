const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const ctaContainer = await page.$('#services div.flex.flex-col.gap-3');
  if (ctaContainer) {
    // Scroll element into view
    await ctaContainer.scrollIntoView();
    await new Promise(r => setTimeout(r, 400));

    // Get viewport-relative bounding rect
    const rect = await page.evaluate(el => {
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    }, ctaContainer);

    const screenshotsDir = path.join(__dirname, '..', 'screenshots');

    // 1. Zoom crop of the left 120px of the two buttons
    await page.screenshot({
      path: path.join(screenshotsDir, 'cta-left-zoom.png'),
      clip: {
        x: rect.x,
        y: rect.y,
        width: 120,
        height: rect.height
      }
    });
    console.log('Saved cta-left-zoom.png');

    // 2. Both buttons in light mode
    await ctaContainer.screenshot({
      path: path.join(screenshotsDir, 'cta-buttons-light.png')
    });
    console.log('Saved cta-buttons-light.png');

    // 3. Switch to dark mode and capture both buttons
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await new Promise(r => setTimeout(r, 400));

    await ctaContainer.screenshot({
      path: path.join(screenshotsDir, 'cta-buttons-dark.png')
    });
    console.log('Saved cta-buttons-dark.png');
  }

  // 4. Test Mobile viewport (390x844)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const mobileCta = await page.$('#services div.flex.flex-col.gap-3');
  if (mobileCta) {
    await mobileCta.scrollIntoView();
    await new Promise(r => setTimeout(r, 400));
    const screenshotsDir = path.join(__dirname, '..', 'screenshots');
    await mobileCta.screenshot({
      path: path.join(screenshotsDir, 'cta-buttons-mobile.png')
    });
    console.log('Saved cta-buttons-mobile.png');
  }

  await browser.close();
  console.log('Done!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
