const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = path.resolve('C:\\Users\\ramku\\.gemini\\antigravity-ide\\brain\\a8090d92-9948-4b85-ac36-dbce780a5e14');

async function testPages() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Visit homepage
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // 2. Click "Team" in nav
  const teamBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('nav button'));
    return buttons.find(b => b.textContent && b.textContent.trim() === 'Team');
  });

  if (teamBtn) {
    await teamBtn.click();
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'team_page_preview.png'), fullPage: false });
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'team_page_full.png'), fullPage: true });
    console.log('Saved team_page_preview.png and team_page_full.png');
  }

  // 3. Click Work in top nav / back to home then work
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 500));
  const workBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('nav button'));
    return buttons.find(b => b.textContent && b.textContent.trim() === 'Work');
  });

  if (workBtn) {
    await workBtn.click();
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'work_page_preview.png'), fullPage: false });
    console.log('Saved work_page_preview.png');
  }

  await browser.close();
  console.log('Verification screenshot complete.');
}

testPages().catch(err => {
  console.error('Error during test:', err);
  process.exit(1);
});
