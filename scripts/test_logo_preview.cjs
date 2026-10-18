const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

function getSvg(theme) {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#0F172A';
  const subColor = isDark ? '#19D5D0' : '#0891B2';
  const dotColor = isDark ? '#B8FF3D' : '#84CC16';
  const pixelCyan = '#19D5D0';
  const pixelLime = '#B8FF3D';
  
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 236 52" width="236" height="52" fill="none">
  <!-- Pixel X Symbol (44x44 centered vertically in 52h) -->
  <g transform="translate(4, 4)">
    <!-- Center Core Matrix -->
    <rect x="17" y="17" width="10" height="10" rx="2.5" fill="${pixelCyan}" />
    
    <!-- Top-Left Arm (Cascading Data Pixels) -->
    <rect x="10" y="10" width="7" height="7" rx="1.8" fill="${pixelCyan}" />
    <rect x="3" y="3" width="6" height="6" rx="1.5" fill="${pixelCyan}" />
    <rect x="0" y="1" width="3.5" height="3.5" rx="1" fill="${pixelLime}" />
    <rect x="1" y="8" width="3" height="3" rx="0.8" fill="${pixelCyan}" opacity="0.9" />
    <rect x="8" y="1" width="3.5" height="3.5" rx="1" fill="${pixelCyan}" opacity="0.95" />

    <!-- Bottom-Left Arm (Cascading Data Pixels) -->
    <rect x="10" y="27" width="7" height="7" rx="1.8" fill="${pixelCyan}" />
    <rect x="3" y="35" width="6" height="6" rx="1.5" fill="${pixelCyan}" />
    <rect x="0" y="39.5" width="3.5" height="3.5" rx="1" fill="${pixelLime}" />
    <rect x="1" y="33" width="3" height="3" rx="0.8" fill="${pixelCyan}" opacity="0.9" />
    <rect x="8" y="39.5" width="3.5" height="3.5" rx="1" fill="${pixelCyan}" opacity="0.95" />

    <!-- Top-Right Arm (Structured Modular Pixels) -->
    <rect x="27" y="10" width="7" height="7" rx="1.8" fill="${pixelCyan}" />
    <rect x="35" y="3" width="6" height="6" rx="1.5" fill="${pixelCyan}" />
    <rect x="40.5" y="1" width="3.5" height="3.5" rx="1" fill="${pixelLime}" />
    <rect x="35" y="11.5" width="4.5" height="4.5" rx="1.2" fill="${pixelCyan}" />
    <rect x="40.5" y="8" width="3" height="3" rx="0.8" fill="${pixelCyan}" opacity="0.9" />

    <!-- Bottom-Right Arm (Structured Modular Pixels) -->
    <rect x="27" y="27" width="7" height="7" rx="1.8" fill="${pixelCyan}" />
    <rect x="35" y="35" width="6" height="6" rx="1.5" fill="${pixelCyan}" />
    <rect x="40.5" y="39.5" width="3.5" height="3.5" rx="1" fill="${pixelLime}" />
    <rect x="35" y="28" width="4.5" height="4.5" rx="1.2" fill="${pixelCyan}" />
    <rect x="40.5" y="33" width="3" height="3" rx="0.8" fill="${pixelCyan}" opacity="0.9" />
  </g>

  <!-- Wordmark Section -->
  <g transform="translate(58, 0)">
    <!-- Brand Primary Name: XELOX -->
    <text x="0" y="28" 
          font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          font-size="24" 
          font-weight="800" 
          letter-spacing="0.04em" 
          fill="${textColor}">
      XELOX
    </text>

    <!-- Brand Subtitle / Full Name: SOLUTIONS -->
    <text x="1" y="43" 
          font-family="'IBM Plex Mono', 'Space Grotesk', monospace" 
          font-size="9" 
          font-weight="600" 
          letter-spacing="0.28em" 
          fill="${subColor}">
      SOLUTIONS
    </text>

    <!-- Subtle performance dot -->
    <circle cx="88" cy="40" r="2" fill="${dotColor}" />
  </g>
</svg>
`;
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 420 });
  
  const darkSvg = getSvg('dark');
  const lightSvg = getSvg('light');
  
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&family=IBM+Plex+Mono:wght@600&display=swap" rel="stylesheet">
    <style>
      body { margin: 0; padding: 30px; display: flex; gap: 30px; font-family: sans-serif; background: #888; }
      .card-dark {
        background: #050608;
        padding: 30px;
        border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.12);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        flex: 1;
      }
      .card-light {
        background: #F6F6F2;
        padding: 30px;
        border-radius: 16px;
        border: 1px solid rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        flex: 1;
      }
      h3 { margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #888; }
      .preview-box {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 12px 16px;
        border-radius: 8px;
        width: 100%;
        box-sizing: border-box;
      }
    </style>
  </head>
  <body>
    <div class="card-dark">
      <h3>Dark Background (#050608)</h3>
      ${darkSvg}
      <div style="height: 1px; width: 100%; background: rgba(255,255,255,0.1);"></div>
      <div class="preview-box" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);">
        <span style="color: #64748B; font-size: 11px; font-family: monospace;">NAVBAR:</span>
        <div style="height: 44px; display: flex; align-items: center;">${darkSvg}</div>
      </div>
    </div>
    <div class="card-light">
      <h3>Light Background (#F6F6F2)</h3>
      ${lightSvg}
      <div style="height: 1px; width: 100%; background: rgba(0,0,0,0.1);"></div>
      <div class="preview-box" style="background: rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.06);">
        <span style="color: #64748B; font-size: 11px; font-family: monospace;">NAVBAR:</span>
        <div style="height: 44px; display: flex; align-items: center;">${lightSvg}</div>
      </div>
    </div>
  </body>
  </html>
  `;
  
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const outPath = 'C:\\Users\\ramku\\.gemini\\antigravity-ide\\brain\\5f1bb91b-e5ed-4c0d-85b6-005a5c9c167e\\logo_test_preview.png';
  await page.screenshot({ path: outPath, fullPage: true });
  console.log('Saved preview to ' + outPath);
  await browser.close();
})();
