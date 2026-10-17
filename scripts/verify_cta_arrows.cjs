const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  console.log('=== Verifying CTA Arrow Alignment ===');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // Scroll to services
  await page.evaluate(() => {
    const sec = document.getElementById('services');
    if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));

  // Extract alignment metrics for the first pillar card
  const metrics = await page.evaluate(() => {
    const primaryBtn = document.querySelector('#services .btn-primary');
    const outlineBtn = document.querySelector('#services .btn-outline');

    if (!primaryBtn || !outlineBtn) return { error: 'Buttons not found' };

    const pBtnRect = primaryBtn.getBoundingClientRect();
    const oBtnRect = outlineBtn.getBoundingClientRect();

    const pIcon = primaryBtn.querySelector('svg');
    const oIcon = outlineBtn.querySelector('svg');

    const pIconRect = pIcon ? pIcon.getBoundingClientRect() : null;
    const oIconRect = oIcon ? oIcon.getBoundingClientRect() : null;

    const pLabel = primaryBtn.querySelector('span:not([aria-hidden="true"])');
    const oLabel = outlineBtn.querySelector('span:not([aria-hidden="true"])');

    const pLabelRect = pLabel ? pLabel.getBoundingClientRect() : null;
    const oLabelRect = oLabel ? oLabel.getBoundingClientRect() : null;

    return {
      primary: {
        button: { x: pBtnRect.x, y: pBtnRect.y, w: pBtnRect.width, h: pBtnRect.height },
        icon: pIconRect ? { x: pIconRect.x, y: pIconRect.y, w: pIconRect.width, h: pIconRect.height } : null,
        iconLeftOffset: pIconRect ? pIconRect.x - pBtnRect.x : null,
        iconVerticalCenterDiff: pIconRect ? (pIconRect.y + pIconRect.height / 2) - (pBtnRect.y + pBtnRect.height / 2) : null,
        labelCenterDiff: pLabelRect ? (pLabelRect.x + pLabelRect.width / 2) - (pBtnRect.x + pBtnRect.width / 2) : null
      },
      outline: {
        button: { x: oBtnRect.x, y: oBtnRect.y, w: oBtnRect.width, h: oBtnRect.height },
        icon: oIconRect ? { x: oIconRect.x, y: oIconRect.y, w: oIconRect.width, h: oIconRect.height } : null,
        iconLeftOffset: oIconRect ? oIconRect.x - oBtnRect.x : null,
        iconVerticalCenterDiff: oIconRect ? (oIconRect.y + oIconRect.height / 2) - (oBtnRect.y + oBtnRect.height / 2) : null,
        labelCenterDiff: oLabelRect ? (oLabelRect.x + oLabelRect.width / 2) - (oBtnRect.x + oBtnRect.width / 2) : null
      }
    };
  });

  console.log('Alignment Metrics:', JSON.stringify(metrics, null, 2));

  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // Screenshot the entire card CTAs container
  const ctaContainer = await page.$('#services div.flex.flex-col.gap-3');
  if (ctaContainer) {
    await ctaContainer.screenshot({
      path: path.join(screenshotsDir, 'cta-buttons-fixed.png')
    });
    console.log('Saved screenshots/cta-buttons-fixed.png');

    // Also take a cropped zoom of the left side of the two buttons
    const box = await ctaContainer.boundingBox();
    if (box) {
      await page.screenshot({
        path: path.join(screenshotsDir, 'cta-left-alignment-zoom.png'),
        clip: {
          x: box.x,
          y: box.y,
          width: 130, // crop to left 130px matching user screenshot
          height: box.height
        }
      });
      console.log('Saved screenshots/cta-left-alignment-zoom.png');
    }
  }

  await browser.close();
  console.log('=== Verification Completed ===');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
