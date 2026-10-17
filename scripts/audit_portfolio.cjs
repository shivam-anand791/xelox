const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function auditPortfolio() {
  const screenshotDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to http://localhost:5173/#portfolio...');
    await page.goto('http://localhost:5173/#portfolio', { waitUntil: 'networkidle0' });

    const portfolioSection = await page.$('#portfolio');
    if (!portfolioSection) {
      throw new Error('#portfolio section not found!');
    }

    await portfolioSection.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));

    // Inspect elements, opacities, transforms
    const auditData = await page.evaluate(() => {
      const sec = document.querySelector('#portfolio');
      if (!sec) return null;

      const cards = Array.from(sec.querySelectorAll('.rounded-xl, article'));
      return {
        sectionHeight: sec.offsetHeight,
        sectionClasses: sec.className,
        cards: cards.map((c, i) => {
          const style = window.getComputedStyle(c);
          const rect = c.getBoundingClientRect();
          const img = c.querySelector('img');
          const title = c.querySelector('h3, h4')?.textContent?.trim();
          const p = c.querySelector('p')?.textContent?.trim();
          return {
            index: i,
            title,
            previewText: p,
            opacity: style.opacity,
            transform: style.transform,
            display: style.display,
            visibility: style.visibility,
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left,
            imgSrc: img?.getAttribute('src'),
            imgFilter: img ? window.getComputedStyle(img).filter : null,
            imgNaturalWidth: img ? img.naturalWidth : 0
          };
        })
      };
    });

    console.log('Portfolio Audit Data:', JSON.stringify(auditData, null, 2));

    await portfolioSection.screenshot({
      path: path.join(screenshotDir, 'portfolio-audit-desktop.png')
    });
    console.log('Saved screenshots/portfolio-audit-desktop.png');

    // Also check dark mode
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await new Promise(r => setTimeout(r, 400));
    await portfolioSection.screenshot({
      path: path.join(screenshotDir, 'portfolio-audit-dark.png')
    });
    console.log('Saved screenshots/portfolio-audit-dark.png');
    await page.evaluate(() => document.documentElement.classList.remove('dark'));

    // Mobile check
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:5173/#portfolio', { waitUntil: 'networkidle0' });
    const mobSec = await page.$('#portfolio');
    await mobSec.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));

    const mobAuditData = await page.evaluate(() => {
      const sec = document.querySelector('#portfolio');
      if (!sec) return null;
      const cards = Array.from(sec.querySelectorAll('.rounded-xl'));
      return cards.map((c, i) => {
        const style = window.getComputedStyle(c);
        const img = c.querySelector('img');
        const title = c.querySelector('h3')?.textContent?.trim();
        return {
          index: i,
          title,
          opacity: style.opacity,
          transform: style.transform,
          imgSrc: img?.getAttribute('src'),
          imgFilter: img ? window.getComputedStyle(img).filter : null
        };
      });
    });

    console.log('Mobile Audit Data:', JSON.stringify(mobAuditData, null, 2));

    await mobSec.screenshot({
      path: path.join(screenshotDir, 'portfolio-audit-mobile.png')
    });
    console.log('Saved screenshots/portfolio-audit-mobile.png');

  } finally {
    await browser.close();
  }
}

auditPortfolio().catch(err => {
  console.error(err);
  process.exit(1);
});
