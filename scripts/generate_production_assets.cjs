const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

// SVG Generator for Xelox Solutions Logo
function generateSvg({ theme, width = 220, height = 50, iconOnly = false }) {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#0F172A';
  const subColor = isDark ? '#19D5D0' : '#0891B2';
  const pixelCyan = '#19D5D0';
  const pixelLime = '#B8FF3D';

  if (iconOnly) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 46" width="46" height="46" fill="none">
  <!-- Xelox Modular Pixel X Mark -->
  <g transform="translate(2, 2)">
    <!-- Center Core Block -->
    <rect x="16" y="16" width="10" height="10" rx="2.5" fill="${pixelCyan}" />
    
    <!-- Top-Left Digital Data Stream -->
    <rect x="9.5" y="9.5" width="7" height="7" rx="2" fill="${pixelCyan}" />
    <rect x="3" y="3" width="6" height="6" rx="1.8" fill="${pixelCyan}" />
    <rect x="0" y="1" width="3.2" height="3.2" rx="0.9" fill="${pixelLime}" />
    <rect x="1" y="8" width="3" height="3" rx="0.8" fill="${pixelCyan}" opacity="0.85" />
    <rect x="8" y="1" width="3.2" height="3.2" rx="0.9" fill="${pixelCyan}" />

    <!-- Bottom-Left Digital Data Stream -->
    <rect x="9.5" y="25.5" width="7" height="7" rx="2" fill="${pixelCyan}" />
    <rect x="3" y="33" width="6" height="6" rx="1.8" fill="${pixelCyan}" />
    <rect x="0" y="37.8" width="3.2" height="3.2" rx="0.9" fill="${pixelLime}" />
    <rect x="1" y="31" width="3" height="3" rx="0.8" fill="${pixelCyan}" opacity="0.85" />
    <rect x="8" y="37.8" width="3.2" height="3.2" rx="0.9" fill="${pixelCyan}" />

    <!-- Right-Hand Solid Crossing Modules -->
    <rect x="25.5" y="7" width="14" height="11" rx="2.6" fill="${pixelCyan}" />
    <rect x="25.5" y="24" width="14" height="11" rx="2.6" fill="${pixelCyan}" />
    <rect x="36" y="1" width="6" height="6" rx="1.8" fill="${pixelCyan}" />
    <rect x="36" y="35" width="6" height="6" rx="1.8" fill="${pixelCyan}" />
  </g>
</svg>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 48" width="${width}" height="${height}" fill="none">
  <!-- Xelox Modular Pixel X Mark -->
  <g transform="translate(3, 3)">
    <!-- Center Core Block -->
    <rect x="16" y="16" width="10" height="10" rx="2.5" fill="${pixelCyan}" />
    
    <!-- Top-Left Digital Data Stream -->
    <rect x="9.5" y="9.5" width="7" height="7" rx="2" fill="${pixelCyan}" />
    <rect x="3" y="3" width="6" height="6" rx="1.8" fill="${pixelCyan}" />
    <rect x="0" y="1" width="3.2" height="3.2" rx="0.9" fill="${pixelLime}" />
    <rect x="1" y="8" width="3" height="3" rx="0.8" fill="${pixelCyan}" opacity="0.85" />
    <rect x="8" y="1" width="3.2" height="3.2" rx="0.9" fill="${pixelCyan}" />

    <!-- Bottom-Left Digital Data Stream -->
    <rect x="9.5" y="25.5" width="7" height="7" rx="2" fill="${pixelCyan}" />
    <rect x="3" y="33" width="6" height="6" rx="1.8" fill="${pixelCyan}" />
    <rect x="0" y="37.8" width="3.2" height="3.2" rx="0.9" fill="${pixelLime}" />
    <rect x="1" y="31" width="3" height="3" rx="0.8" fill="${pixelCyan}" opacity="0.85" />
    <rect x="8" y="37.8" width="3.2" height="3.2" rx="0.9" fill="${pixelCyan}" />

    <!-- Right-Hand Solid Crossing Modules -->
    <rect x="25.5" y="7" width="14" height="11" rx="2.6" fill="${pixelCyan}" />
    <rect x="25.5" y="24" width="14" height="11" rx="2.6" fill="${pixelCyan}" />
    <rect x="36" y="1" width="6" height="6" rx="1.8" fill="${pixelCyan}" />
    <rect x="36" y="35" width="6" height="6" rx="1.8" fill="${pixelCyan}" />
  </g>

  <!-- Wordmark Lockup -->
  <g transform="translate(56, 0)">
    <!-- Primary Brand: Xelox -->
    <text x="0" y="27" 
          font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          font-size="26" 
          font-weight="700" 
          letter-spacing="-0.02em" 
          fill="${textColor}">
      Xelox
    </text>

    <!-- Descriptor / Full Name: SOLUTIONS -->
    <text x="1" y="41" 
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

async function renderAssets() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new'
  });

  const publicDir = path.join(__dirname, '..', 'frontend', 'public');

  // 1. Save SVGs directly
  const darkSvg = generateSvg({ theme: 'dark' });
  const lightSvg = generateSvg({ theme: 'light' });
  const iconSvg = generateSvg({ theme: 'dark', iconOnly: true });

  fs.writeFileSync(path.join(publicDir, 'logo-dark.svg'), darkSvg);
  fs.writeFileSync(path.join(publicDir, 'logo-light.svg'), lightSvg);
  fs.writeFileSync(path.join(publicDir, 'logo.svg'), darkSvg); // default transparent SVG
  fs.writeFileSync(path.join(publicDir, 'logo-icon.svg'), iconSvg);

  console.log('Saved SVG assets in frontend/public');

  // 2. Render high-res PNGs & WebPs with transparent backgrounds
  const page = await browser.newPage();
  await page.setViewport({ width: 864, height: 192, deviceScaleFactor: 2 });

  async function renderTransparentImage(svgContent, baseName, w = 432, h = 96) {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=IBM+Plex+Mono:wght@600&display=swap" rel="stylesheet">
      <style>
        body { margin: 0; padding: 0; background: transparent; overflow: hidden; display: flex; align-items: center; justify-content: center; }
      </style>
    </head>
    <body>
      <div style="width: ${w}px; height: ${h}px; display: flex; align-items: center; justify-content: center;">
        ${svgContent.replace('width="216" height="48"', `width="${w}" height="${h}"`)}
      </div>
    </body>
    </html>`;

    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await new Promise(res => setTimeout(res, 300));
    const targetElement = await page.$('div');
    
    // Save PNG
    const pngPath = path.join(publicDir, `${baseName}.png`);
    await targetElement.screenshot({ path: pngPath, omitBackground: true });
    
    // Save WebP
    const webpPath = path.join(publicDir, `${baseName}.webp`);
    await targetElement.screenshot({ path: webpPath, omitBackground: true, type: 'webp' });

    console.log(`Rendered: ${baseName}.png and ${baseName}.webp`);
  }

  await renderTransparentImage(darkSvg, 'logo-dark');
  await renderTransparentImage(lightSvg, 'logo-light');
  await renderTransparentImage(darkSvg, 'logo'); // replaces legacy logo.png and logo.webp!

  // Render Icon PNG (48x48 @2x = 96x96)
  await page.setViewport({ width: 192, height: 192, deviceScaleFactor: 2 });
  const iconHtml = `
  <!DOCTYPE html>
  <html>
  <body style="margin:0; padding:0; background:transparent; overflow:hidden; display:flex; align-items:center; justify-content:center;">
    <div style="width: 96px; height: 96px; display: flex; align-items: center; justify-content: center;">
      ${iconSvg.replace('width="46" height="46"', 'width="96" height="96"')}
    </div>
  </body>
  </html>`;
  await page.setContent(iconHtml, { waitUntil: 'domcontentloaded' });
  await new Promise(res => setTimeout(res, 200));
  const iconDiv = await page.$('div');
  await iconDiv.screenshot({ path: path.join(publicDir, 'logo-icon.png'), omitBackground: true });
  await iconDiv.screenshot({ path: path.join(publicDir, 'logo-icon-dark.png'), omitBackground: true });

  console.log('All production assets successfully generated!');
  await browser.close();
}

renderAssets().catch(console.error);
