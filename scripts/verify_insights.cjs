const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verifyInsights() {
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

    console.log('Navigating to http://localhost:5173/#insights...');
    await page.goto('http://localhost:5173/#insights', { waitUntil: 'networkidle0' });

    // Scroll to insights section
    const insightsSection = await page.$('#insights');
    if (!insightsSection) {
      throw new Error('#insights section not found!');
    }

    await insightsSection.scrollIntoView();
    await new Promise(r => setTimeout(r, 1200)); // wait for scroll reveal animation

    // Verify article card images
    const articleImages = await page.evaluate(() => {
      const section = document.querySelector('#insights');
      if (!section) return [];
      const articles = Array.from(section.querySelectorAll('article'));
      return articles.map((article, idx) => {
        const titleEl = article.querySelector('h3');
        const img = article.querySelector('img');
        const badgeEl = article.querySelector('span.bg-lime');
        const timeEl = article.querySelector('.text-gray-custom span, .dark\\:text-slate-300 span');
        const readMoreEl = article.querySelector('span.inline-flex.items-center');

        return {
          index: idx,
          title: titleEl ? titleEl.textContent.trim() : null,
          imgSrc: img ? img.getAttribute('src') : null,
          imgAlt: img ? img.getAttribute('alt') : null,
          isLoaded: img ? (img.complete && img.naturalWidth > 0) : false,
          naturalWidth: img ? img.naturalWidth : 0,
          naturalHeight: img ? img.naturalHeight : 0,
          badgeText: badgeEl ? badgeEl.textContent.trim() : null,
          readTime: timeEl ? timeEl.textContent.trim() : null,
          readMoreText: readMoreEl ? readMoreEl.textContent.trim() : null,
        };
      });
    });

    console.log('Article Cards Data:', JSON.stringify(articleImages, null, 2));

    // Assertions
    if (articleImages.length !== 3) {
      throw new Error(`Expected 3 article cards, found ${articleImages.length}`);
    }

    for (const art of articleImages) {
      if (!art.isLoaded || art.naturalWidth === 0) {
        throw new Error(`Article ${art.index} image failed to load: ${art.imgSrc}`);
      }
      if (!art.imgAlt || art.imgAlt.length < 10) {
        throw new Error(`Article ${art.index} alt text is missing or too short: ${art.imgAlt}`);
      }
      if (!art.badgeText || art.badgeText !== 'Article') {
        throw new Error(`Article ${art.index} category badge missing or incorrect: ${art.badgeText}`);
      }
      if (!art.readMoreText || !art.readMoreText.includes('Read more')) {
        throw new Error(`Article ${art.index} Read More link missing: ${art.readMoreText}`);
      }
    }

    // Capture desktop section screenshot directly from DOM element
    await insightsSection.screenshot({
      path: path.join(screenshotDir, 'insights-desktop.png')
    });
    console.log('Saved screenshots/insights-desktop.png');

    // Test hover state on first card
    const firstCard = await page.$('#insights article');
    if (firstCard) {
      await firstCard.hover();
      await new Promise(r => setTimeout(r, 600));
      await insightsSection.screenshot({
        path: path.join(screenshotDir, 'insights-hover.png')
      });
      console.log('Saved screenshots/insights-hover.png');

      // Click card to open modal
      await firstCard.click();
      await new Promise(r => setTimeout(r, 600));

      // Verify modal image
      const modalInfo = await page.evaluate(() => {
        const modal = document.querySelector('#single-article-modal');
        if (!modal) return null;
        const img = modal.querySelector('img');
        const title = modal.querySelector('h1');
        return {
          hasModal: true,
          title: title ? title.textContent.trim() : null,
          imgSrc: img ? img.getAttribute('src') : null,
          imgAlt: img ? img.getAttribute('alt') : null,
          isLoaded: img ? (img.complete && img.naturalWidth > 0) : false
        };
      });

      console.log('Single Article Modal Data:', JSON.stringify(modalInfo, null, 2));

      await page.screenshot({
        path: path.join(screenshotDir, 'insights-single-modal.png')
      });
      console.log('Saved screenshots/insights-single-modal.png');

      // Close modal
      const closeBtn = await page.$('#single-article-modal button[aria-label="Close article modal"]');
      if (closeBtn) {
        await closeBtn.click();
        await new Promise(r => setTimeout(r, 400));
      }
    }

    // Test "View all articles" modal
    const viewAllBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('#insights button'));
      return btns.find(b => b.textContent.includes('View all articles'));
    });

    if (viewAllBtn) {
      await viewAllBtn.click();
      await new Promise(r => setTimeout(r, 600));

      const allArticlesModalInfo = await page.evaluate(() => {
        const modal = document.querySelector('#all-articles-modal');
        if (!modal) return null;
        const articles = Array.from(modal.querySelectorAll('article'));
        return {
          articleCount: articles.length,
          articles: articles.map(a => {
            const img = a.querySelector('img');
            return {
              title: a.querySelector('h3')?.textContent.trim(),
              imgSrc: img?.getAttribute('src'),
              isLoaded: img ? (img.complete && img.naturalWidth > 0) : false
            };
          })
        };
      });

      console.log('All Articles Modal Data:', JSON.stringify(allArticlesModalInfo, null, 2));

      await page.screenshot({
        path: path.join(screenshotDir, 'insights-all-articles-modal.png')
      });
      console.log('Saved screenshots/insights-all-articles-modal.png');

      const closeAllBtn = await page.$('#all-articles-modal button[aria-label="Close all articles modal"]');
      if (closeAllBtn) {
        await closeAllBtn.click();
        await new Promise(r => setTimeout(r, 400));
      }
    }

    // Test Dark Mode
    console.log('Testing Dark Mode...');
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await new Promise(r => setTimeout(r, 500));
    await insightsSection.screenshot({
      path: path.join(screenshotDir, 'insights-dark.png')
    });
    console.log('Saved screenshots/insights-dark.png');
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
    });

    // Mobile testing
    console.log('Testing Mobile Viewport (375x812)...');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:5173/#insights', { waitUntil: 'networkidle0' });
    const mobileInsights = await page.$('#insights');
    await mobileInsights.scrollIntoView();
    await new Promise(r => setTimeout(r, 1000));

    await page.screenshot({
      path: path.join(screenshotDir, 'insights-mobile.png')
    });
    console.log('Saved screenshots/insights-mobile.png');

    console.log('✅ All Insights visual validations passed successfully!');
  } finally {
    await browser.close();
  }
}

verifyInsights().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
