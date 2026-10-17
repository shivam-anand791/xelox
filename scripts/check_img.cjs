const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: 'new' });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/');
  await new Promise(r => setTimeout(r, 1000));
  const imgInfo = await page.evaluate(() => {
    const img = document.querySelector('img[src="/studio_engineering_lab.jpg"]');
    if (!img) return 'IMG NOT FOUND';
    return {
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      currentSrc: img.currentSrc
    };
  });
  console.log('Image Info:', JSON.stringify(imgInfo));
  await browser.close();
})();
