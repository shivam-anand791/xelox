const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verifyWorkSection() {
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

    console.log('1. Direct URL navigation to http://localhost:5173/#portfolio...');
    await page.goto('http://localhost:5173/#portfolio', { waitUntil: 'networkidle0' });

    const portfolioSection = await page.$('#portfolio');
    if (!portfolioSection) {
      throw new Error('#portfolio section not found!');
    }

    await portfolioSection.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));

    // Inspect desktop cards
    const desktopAudit = await page.evaluate(() => {
      const sec = document.querySelector('#portfolio');
      if (!sec) return null;

      const cards = Array.from(sec.querySelectorAll('.card-hover'));
      const decorRing = sec.querySelector('.decor-ring');

      return {
        decorRingZIndex: decorRing ? window.getComputedStyle(decorRing).zIndex : null,
        cards: cards.map((c, i) => {
          const style = window.getComputedStyle(c);
          const rect = c.getBoundingClientRect();
          const img = c.querySelector('img');
          const title = c.querySelector('h3')?.textContent?.trim();
          const subtitle = c.querySelector('span.font-mono')?.textContent?.trim();
          const p = c.querySelector('p')?.textContent?.trim();
          const btn = c.querySelector('span.uppercase');

          return {
            index: i,
            title,
            subtitle,
            previewText: p,
            opacity: style.opacity,
            transform: style.transform,
            display: style.display,
            visibility: style.visibility,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            top: Math.round(rect.top),
            left: Math.round(rect.left),
            imgSrc: img?.getAttribute('src'),
            imgFilter: img ? window.getComputedStyle(img).filter : null,
            imgNaturalWidth: img ? img.naturalWidth : 0,
            imgNaturalHeight: img ? img.naturalHeight : 0,
            hasBtn: !!btn,
            btnText: btn?.textContent?.trim()
          };
        })
      };
    });

    console.log('Desktop Portfolio Audit:', JSON.stringify(desktopAudit, null, 2));

    // Assertions for desktop
    if (!desktopAudit || desktopAudit.cards.length < 3) {
      throw new Error(`Expected at least 3 desktop cards, found ${desktopAudit?.cards?.length}`);
    }

    for (const card of desktopAudit.cards) {
      if (card.opacity !== '1') {
        throw new Error(`Card ${card.index} (${card.title}) is hidden with opacity: ${card.opacity}`);
      }
      if (card.imgFilter && card.imgFilter.includes('grayscale(1)')) {
        throw new Error(`Card ${card.index} image has grayscale filter applied!`);
      }
      if (card.imgNaturalWidth === 0) {
        throw new Error(`Card ${card.index} image failed to load: ${card.imgSrc}`);
      }
      if (!card.title || !card.subtitle || !card.previewText) {
        throw new Error(`Card ${card.index} has missing textual content!`);
      }
    }

    if (desktopAudit.decorRingZIndex !== '0' && desktopAudit.decorRingZIndex !== 'auto') {
      console.warn(`Decor ring z-index is: ${desktopAudit.decorRingZIndex}`);
    }

    await portfolioSection.screenshot({
      path: path.join(screenshotDir, 'portfolio-improved-desktop.png')
    });
    console.log('Saved screenshots/portfolio-improved-desktop.png');

    // Test hover on first desktop card
    const firstCard = await page.$('#portfolio .hidden.md\\:block .card-hover');
    if (firstCard) {
      await firstCard.hover();
      await new Promise(r => setTimeout(r, 400));
      await portfolioSection.screenshot({
        path: path.join(screenshotDir, 'portfolio-improved-hover.png')
      });
      console.log('Saved screenshots/portfolio-improved-hover.png');
    }

    // Test dark mode
    console.log('2. Testing Dark Mode...');
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await new Promise(r => setTimeout(r, 400));
    await portfolioSection.screenshot({
      path: path.join(screenshotDir, 'portfolio-improved-dark.png')
    });
    console.log('Saved screenshots/portfolio-improved-dark.png');
    await page.evaluate(() => document.documentElement.classList.remove('dark'));

    // Test fast scroll velocity & anchor navigation to #work
    console.log('3. Fast scroll and direct anchor jump to #work...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
    // Scroll rapidly to bottom then up
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r => setTimeout(r, 200));
    await page.evaluate(() => {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
    await new Promise(r => setTimeout(r, 800));

    const checkVisibilityAfterFastScroll = await page.evaluate(() => {
      const sec = document.querySelector('#portfolio');
      const cards = sec.querySelectorAll('.card-hover');
      return Array.from(cards).map(c => window.getComputedStyle(c).opacity);
    });
    console.log('Opacities after fast scroll:', checkVisibilityAfterFastScroll);
    for (const op of checkVisibilityAfterFastScroll) {
      if (op !== '1') {
        throw new Error(`A card remained hidden after fast scroll with opacity: ${op}`);
      }
    }

    // 4. Mobile testing
    console.log('4. Testing Mobile Viewport (375x812)...');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:5173/#portfolio', { waitUntil: 'networkidle0' });
    const mobSec = await page.$('#portfolio');
    await mobSec.scrollIntoView();
    await new Promise(r => setTimeout(r, 400));

    // Scroll through mobile cards to ensure all lazy images are loaded and decoded
    await page.evaluate(async () => {
      const cards = document.querySelectorAll('#portfolio .md\\:hidden .rounded-2xl');
      for (const card of cards) {
        card.scrollIntoView({ behavior: 'smooth' });
        await new Promise(r => setTimeout(r, 200));
      }
      const first = document.querySelector('#portfolio');
      if (first) first.scrollIntoView();
      await new Promise(r => setTimeout(r, 300));
    });

    const mobileAudit = await page.evaluate(() => {
      const sec = document.querySelector('#portfolio');
      const mobileContainer = sec.querySelector('.md\\:hidden');
      const cards = Array.from(mobileContainer.querySelectorAll('.rounded-2xl'));

      return cards.map((c, i) => {
        const style = window.getComputedStyle(c);
        const img = c.querySelector('img');
        const title = c.querySelector('h3')?.textContent?.trim();
        const subtitle = c.querySelector('span.font-mono')?.textContent?.trim();
        const p = c.querySelector('p')?.textContent?.trim();

        return {
          index: i,
          title,
          subtitle,
          previewText: p,
          opacity: style.opacity,
          imgSrc: img?.getAttribute('src'),
          imgFilter: img ? window.getComputedStyle(img).filter : null,
          imgNaturalWidth: img ? img.naturalWidth : 0
        };
      });
    });

    console.log('Mobile Portfolio Audit:', JSON.stringify(mobileAudit, null, 2));

    if (!mobileAudit || mobileAudit.length < 3) {
      throw new Error(`Expected at least 3 mobile cards, found ${mobileAudit?.length}`);
    }

    for (const card of mobileAudit) {
      if (card.opacity !== '1') {
        throw new Error(`Mobile card ${card.index} (${card.title}) is hidden with opacity: ${card.opacity}`);
      }
      if (card.imgFilter && card.imgFilter.includes('grayscale(1)')) {
        throw new Error(`Mobile card ${card.index} has grayscale filter applied!`);
      }
      if (card.imgNaturalWidth === 0) {
        throw new Error(`Mobile card ${card.index} image failed to load: ${card.imgSrc}`);
      }
    }

    await mobSec.screenshot({
      path: path.join(screenshotDir, 'portfolio-improved-mobile.png')
    });
    console.log('Saved screenshots/portfolio-improved-mobile.png');

    console.log('✅ All Work / Portfolio Section audit tests passed with 100% success!');
  } finally {
    await browser.close();
  }
}

verifyWorkSection().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
