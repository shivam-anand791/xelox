const puppeteer = require('puppeteer-core');
const fs = require('fs');

function getOption1(isDark) {
  // Symmetrical pixel network with Titlecase 'Xelox'
  const textColor = isDark ? '#FFFFFF' : '#0F172A';
  const subColor = isDark ? '#19D5D0' : '#0891B2';
  const pixelCyan = '#19D5D0';
  const pixelLime = '#B8FF3D';

  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 48" width="210" height="48" fill="none">
    <g transform="translate(2, 4)">
      <!-- Center Core Matrix -->
      <rect x="15" y="15" width="10" height="10" rx="2.5" fill="${pixelCyan}" />
      
      <!-- Top-Left Arm (Data Pixels) -->
      <rect x="9" y="9" width="6.5" height="6.5" rx="1.8" fill="${pixelCyan}" />
      <rect x="3" y="3" width="5.5" height="5.5" rx="1.5" fill="${pixelCyan}" />
      <rect x="0" y="1" width="3" height="3" rx="0.8" fill="${pixelLime}" />
      <rect x="1" y="7.5" width="2.8" height="2.8" rx="0.8" fill="${pixelCyan}" opacity="0.9" />
      <rect x="7.5" y="1" width="3" height="3" rx="0.8" fill="${pixelCyan}" opacity="0.95" />

      <!-- Bottom-Left Arm (Data Pixels) -->
      <rect x="9" y="24.5" width="6.5" height="6.5" rx="1.8" fill="${pixelCyan}" />
      <rect x="3" y="31.5" width="5.5" height="5.5" rx="1.5" fill="${pixelCyan}" />
      <rect x="0" y="36" width="3" height="3" rx="0.8" fill="${pixelLime}" />
      <rect x="1" y="30" width="2.8" height="2.8" rx="0.8" fill="${pixelCyan}" opacity="0.9" />
      <rect x="7.5" y="36" width="3" height="3" rx="0.8" fill="${pixelCyan}" opacity="0.95" />

      <!-- Top-Right Arm (Data Pixels) -->
      <rect x="24.5" y="9" width="6.5" height="6.5" rx="1.8" fill="${pixelCyan}" />
      <rect x="31.5" y="3" width="5.5" height="5.5" rx="1.5" fill="${pixelCyan}" />
      <rect x="37" y="1" width="3" height="3" rx="0.8" fill="${pixelLime}" />
      <rect x="32" y="10" width="4" height="4" rx="1" fill="${pixelCyan}" />
      <rect x="37" y="7.5" width="2.8" height="2.8" rx="0.8" fill="${pixelCyan}" opacity="0.9" />

      <!-- Bottom-Right Arm (Data Pixels) -->
      <rect x="24.5" y="24.5" width="6.5" height="6.5" rx="1.8" fill="${pixelCyan}" />
      <rect x="31.5" y="31.5" width="5.5" height="5.5" rx="1.5" fill="${pixelCyan}" />
      <rect x="37" y="36" width="3" height="3" rx="0.8" fill="${pixelLime}" />
      <rect x="32" y="26" width="4" height="4" rx="1" fill="${pixelCyan}" />
      <rect x="37" y="30" width="2.8" height="2.8" rx="0.8" fill="${pixelCyan}" opacity="0.9" />
    </g>

    <g transform="translate(52, 0)">
      <text x="0" y="26" 
            font-family="'Space Grotesk', -apple-system, sans-serif" 
            font-size="25" 
            font-weight="700" 
            letter-spacing="-0.02em" 
            fill="${textColor}">
        Xelox
      </text>
      <text x="0.5" y="40" 
            font-family="'IBM Plex Mono', 'Space Grotesk', monospace" 
            font-size="8.5" 
            font-weight="600" 
            letter-spacing="0.25em" 
            fill="${subColor}">
        SOLUTIONS
      </text>
    </g>
  </svg>`;
}

function getOption2(isDark) {
  // Asymmetrical authentic brand fidelity matching xeloxlogoo.jpeg
  const textColor = isDark ? '#FFFFFF' : '#0F172A';
  const subColor = isDark ? '#19D5D0' : '#0891B2';
  const pixelCyan = '#19D5D0';
  const pixelLime = '#B8FF3D';

  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 48" width="210" height="48" fill="none">
    <!-- Asymmetric X based on xeloxlogoo.jpeg -->
    <g transform="translate(2, 4)">
      <!-- Central crossing block -->
      <rect x="15" y="15" width="10" height="10" rx="2.5" fill="${pixelCyan}" />
      
      <!-- Left side: dispersing digital stream -->
      <!-- Top-left diagonal pixels -->
      <rect x="9" y="9.5" width="6.5" height="6.5" rx="1.8" fill="${pixelCyan}" />
      <rect x="3" y="3.5" width="5.5" height="5.5" rx="1.5" fill="${pixelCyan}" />
      <rect x="0" y="1.5" width="3" height="3" rx="0.8" fill="${pixelLime}" />
      <rect x="1" y="8" width="3" height="3" rx="0.8" fill="${pixelCyan}" opacity="0.85" />
      <rect x="7" y="1" width="3.2" height="3.2" rx="0.8" fill="${pixelCyan}" />

      <!-- Bottom-left diagonal pixels -->
      <rect x="9" y="24" width="6.5" height="6.5" rx="1.8" fill="${pixelCyan}" />
      <rect x="3" y="31" width="5.5" height="5.5" rx="1.5" fill="${pixelCyan}" />
      <rect x="0" y="35.5" width="3" height="3" rx="0.8" fill="${pixelLime}" />
      <rect x="1" y="29" width="3" height="3" rx="0.8" fill="${pixelCyan}" opacity="0.85" />
      <rect x="7" y="35.5" width="3.2" height="3.2" rx="0.8" fill="${pixelCyan}" />

      <!-- Right side: solid modern modular blocks -->
      <rect x="23" y="7" width="14" height="11" rx="2.5" fill="${pixelCyan}" />
      <rect x="23" y="22" width="14" height="11" rx="2.5" fill="${pixelCyan}" />
      <rect x="33" y="1" width="7" height="6.5" rx="1.8" fill="${pixelCyan}" />
      <rect x="33" y="32.5" width="7" height="6.5" rx="1.8" fill="${pixelCyan}" />
    </g>

    <g transform="translate(52, 0)">
      <text x="0" y="26" 
            font-family="'Space Grotesk', -apple-system, sans-serif" 
            font-size="25" 
            font-weight="700" 
            letter-spacing="-0.02em" 
            fill="${textColor}">
        Xelox
      </text>
      <text x="0.5" y="40" 
            font-family="'IBM Plex Mono', 'Space Grotesk', monospace" 
            font-size="8.5" 
            font-weight="600" 
            letter-spacing="0.25em" 
            fill="${subColor}">
        SOLUTIONS
      </text>
    </g>
  </svg>`;
}

function getOption3(isDark) {
  // Uppercase XELOX with symmetrical network
  const textColor = isDark ? '#FFFFFF' : '#0F172A';
  const subColor = isDark ? '#19D5D0' : '#0891B2';
  const pixelCyan = '#19D5D0';
  const pixelLime = '#B8FF3D';

  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 48" width="210" height="48" fill="none">
    <g transform="translate(2, 4)">
      <rect x="15" y="15" width="10" height="10" rx="2.5" fill="${pixelCyan}" />
      <rect x="9" y="9" width="6.5" height="6.5" rx="1.8" fill="${pixelCyan}" />
      <rect x="3" y="3" width="5.5" height="5.5" rx="1.5" fill="${pixelCyan}" />
      <rect x="0" y="1" width="3" height="3" rx="0.8" fill="${pixelLime}" />
      <rect x="1" y="7.5" width="2.8" height="2.8" rx="0.8" fill="${pixelCyan}" opacity="0.9" />
      <rect x="7.5" y="1" width="3" height="3" rx="0.8" fill="${pixelCyan}" opacity="0.95" />

      <rect x="9" y="24.5" width="6.5" height="6.5" rx="1.8" fill="${pixelCyan}" />
      <rect x="3" y="31.5" width="5.5" height="5.5" rx="1.5" fill="${pixelCyan}" />
      <rect x="0" y="36" width="3" height="3" rx="0.8" fill="${pixelLime}" />
      <rect x="1" y="30" width="2.8" height="2.8" rx="0.8" fill="${pixelCyan}" opacity="0.9" />
      <rect x="7.5" y="36" width="3" height="3" rx="0.8" fill="${pixelCyan}" opacity="0.95" />

      <rect x="24.5" y="9" width="6.5" height="6.5" rx="1.8" fill="${pixelCyan}" />
      <rect x="31.5" y="3" width="5.5" height="5.5" rx="1.5" fill="${pixelCyan}" />
      <rect x="37" y="1" width="3" height="3" rx="0.8" fill="${pixelLime}" />
      <rect x="32" y="10" width="4" height="4" rx="1" fill="${pixelCyan}" />
      <rect x="37" y="7.5" width="2.8" height="2.8" rx="0.8" fill="${pixelCyan}" opacity="0.9" />

      <rect x="24.5" y="24.5" width="6.5" height="6.5" rx="1.8" fill="${pixelCyan}" />
      <rect x="31.5" y="31.5" width="5.5" height="5.5" rx="1.5" fill="${pixelCyan}" />
      <rect x="37" y="36" width="3" height="3" rx="0.8" fill="${pixelLime}" />
      <rect x="32" y="26" width="4" height="4" rx="1" fill="${pixelCyan}" />
      <rect x="37" y="30" width="2.8" height="2.8" rx="0.8" fill="${pixelCyan}" opacity="0.9" />
    </g>

    <g transform="translate(54, 0)">
      <text x="0" y="26" 
            font-family="'Space Grotesk', -apple-system, sans-serif" 
            font-size="22" 
            font-weight="800" 
            letter-spacing="0.05em" 
            fill="${textColor}">
        XELOX
      </text>
      <text x="0.5" y="40" 
            font-family="'IBM Plex Mono', 'Space Grotesk', monospace" 
            font-size="8.5" 
            font-weight="600" 
            letter-spacing="0.28em" 
            fill="${subColor}">
        SOLUTIONS
      </text>
    </g>
  </svg>`;
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 600 });
  
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&family=IBM+Plex+Mono:wght@600&display=swap" rel="stylesheet">
    <style>
      body { margin: 0; padding: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; font-family: sans-serif; background: #222; }
      .theme-col { display: flex; flex-direction: column; gap: 16px; }
      .dark-card { background: #050608; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; }
      .light-card { background: #F6F6F2; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; padding: 20px; }
      .label { font-size: 11px; text-transform: uppercase; font-family: monospace; color: #888; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="theme-col">
      <div class="dark-card">
        <div class="label">Option 1 (Titlecase 'Xelox' + Symmetrical Pixel Mark) - Dark</div>
        ${getOption1(true)}
      </div>
      <div class="dark-card">
        <div class="label">Option 2 (Titlecase 'Xelox' + Asymmetric Brand Fidelity) - Dark</div>
        ${getOption2(true)}
      </div>
      <div class="dark-card">
        <div class="label">Option 3 (Uppercase 'XELOX' + Symmetrical Pixel Mark) - Dark</div>
        ${getOption3(true)}
      </div>
    </div>
    <div class="theme-col">
      <div class="light-card">
        <div class="label">Option 1 (Titlecase 'Xelox' + Symmetrical Pixel Mark) - Light</div>
        ${getOption1(false)}
      </div>
      <div class="light-card">
        <div class="label">Option 2 (Titlecase 'Xelox' + Asymmetric Brand Fidelity) - Light</div>
        ${getOption2(false)}
      </div>
      <div class="light-card">
        <div class="label">Option 3 (Uppercase 'XELOX' + Symmetrical Pixel Mark) - Light</div>
        ${getOption3(false)}
      </div>
    </div>
  </body>
  </html>
  `;
  
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const outPath = 'C:\\Users\\ramku\\.gemini\\antigravity-ide\\brain\\5f1bb91b-e5ed-4c0d-85b6-005a5c9c167e\\logo_comparison_options.png';
  await page.screenshot({ path: outPath, fullPage: true });
  console.log('Saved options comparison to ' + outPath);
  await browser.close();
})();
