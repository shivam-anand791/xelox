const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function test() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:5173/work', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  // Find and click 'View Specification'
  const clicked = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => (b.textContent || '').includes('View Specification'));
    if (btn) {
      btn.scrollIntoView();
      btn.click();
      return true;
    }
    return false;
  });
  console.log('Clicked spec button:', clicked);

  await new Promise(r => setTimeout(r, 1000));

  const modalText = await page.evaluate(() => {
    const modal = document.querySelector('div.fixed.inset-0');
    if (!modal) return 'NO MODAL FOUND';
    return modal.innerText.substring(0, 300);
  });
  console.log('Modal text:\n', modalText);

  await browser.close();
}

test();
