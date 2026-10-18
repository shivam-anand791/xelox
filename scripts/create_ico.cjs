const fs = require('fs');
const path = require('path');

// Read the genuine square logo icon
const logoPngPath = path.join(__dirname, '..', 'frontend', 'public', 'logo-icon.png');
const pngBuffer = fs.readFileSync(logoPngPath);

// Create valid ICO header + single PNG entry (PNG-compressed icon)
// ICONDIR (6 bytes):
// 2 bytes reserved = 0
// 2 bytes type = 1 (icon)
// 2 bytes count = 1
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);

// ICONDIRENTRY (16 bytes):
// 1 byte width = 0 (256 or variable)
// 1 byte height = 0
// 1 byte colors = 0
// 1 byte reserved = 0
// 2 bytes planes = 1
// 2 bytes bpp = 32
// 4 bytes size = pngBuffer.length
// 4 bytes offset = 22 (6 + 16)
const dirEntry = Buffer.alloc(16);
dirEntry.writeUInt8(0, 0); // 0 means 256px or auto
dirEntry.writeUInt8(0, 1);
dirEntry.writeUInt8(0, 2);
dirEntry.writeUInt8(0, 3);
dirEntry.writeUInt16LE(1, 4);
dirEntry.writeUInt16LE(32, 6);
dirEntry.writeUInt32LE(pngBuffer.length, 8);
dirEntry.writeUInt32LE(22, 12);

const icoBuffer = Buffer.concat([header, dirEntry, pngBuffer]);
const icoPath = path.join(__dirname, '..', 'frontend', 'public', 'favicon.ico');
fs.writeFileSync(icoPath, icoBuffer);

console.log('Successfully wrote valid favicon.ico, size:', icoBuffer.length);
console.log('First 6 bytes:', icoBuffer.subarray(0, 6));
console.log('First 4 bytes of embedded image:', icoBuffer.subarray(22, 26));
