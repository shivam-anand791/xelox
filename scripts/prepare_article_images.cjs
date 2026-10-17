const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTICLES_DIR = path.join(__dirname, '..', 'frontend', 'public', 'articles');

if (!fs.existsSync(ARTICLES_DIR)) {
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
}

const ARTICLES = [
  {
    id: 'product-naming',
    url: 'http://localhost:5173/hero_workspace_right.jpg',
    dest: path.join(ARTICLES_DIR, 'product-naming-guide.webp'),
    fit: 'cover',
    position: 'center'
  },
  {
    id: 'landing-page',
    url: 'http://localhost:5173/portfolio/adorca-homepage.webp',
    dest: path.join(ARTICLES_DIR, 'landing-page-playbook.webp'),
    fit: 'cover',
    position: 'top'
  },
  {
    id: 'design-systems',
    url: 'http://localhost:5173/hero_web_platform.jpg',
    dest: path.join(ARTICLES_DIR, 'design-systems-guide.webp'),
    fit: 'cover',
    position: 'center'
  }
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 500, deviceScaleFactor: 1 });

  for (const item of ARTICLES) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body, html { width: 800px; height: 500px; overflow: hidden; background: #0B0F14; }
            img {
              width: 100%;
              height: 100%;
              object-fit: ${item.fit};
              object-position: ${item.position};
              display: block;
            }
          </style>
        </head>
        <body>
          <img src="${item.url}" />
        </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({
      path: item.dest,
      type: 'webp',
      quality: 90
    });

    const stat = fs.statSync(item.dest);
    console.log(`Generated: ${item.dest} (${stat.size} bytes)`);
  }

  await browser.close();
  console.log('All article cover images successfully generated!');
})();
