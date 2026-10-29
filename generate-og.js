/**
 * generate-og.js
 * Programmatically generates 1200x630 Cyberpunk OpenGraph banner images
 * with deep obsidian background, cyan/pink radial gradients, CRT gridlines,
 * HUD corner brackets, glowing scanlines, and tactical telemetry.
 */

const fs = require('fs');
const path = require('path');

// Resolve @napi-rs/canvas from local or scratch directory
let createCanvas, GlobalFonts;
try {
  const canvasPkg = require('@napi-rs/canvas');
  createCanvas = canvasPkg.createCanvas;
  GlobalFonts = canvasPkg.GlobalFonts;
} catch (e) {
  const scratchPath = 'C:/Users/sarwa/.gemini/antigravity/brain/93345f11-2fb3-41b9-ac80-b24c84088119/scratch/node_modules/@napi-rs/canvas';
  const canvasPkg = require(scratchPath);
  createCanvas = canvasPkg.createCanvas;
  GlobalFonts = canvasPkg.GlobalFonts;
}

// Register fonts if available
if (GlobalFonts && GlobalFonts.registerFromPath) {
  if (fs.existsSync('C:/Windows/Fonts/consola.ttf')) {
    GlobalFonts.registerFromPath('C:/Windows/Fonts/consola.ttf', 'CyberMono');
  }
}

const APPS = [
  {
    dir: '',
    subdomain: 'apps',
    title: 'CYBERTOOLS',
    subtitle: '50-IN-1 CLIENT-SIDE UTILITIES',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'calc',
    subdomain: 'calc',
    title: 'CYBERTOOLS // CALC',
    subtitle: 'BANDWIDTH & TELEMETRY CALCULATOR',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'clock',
    subdomain: 'clock',
    title: 'CYBERTOOLS // CLOCK',
    subtitle: 'ORBITAL WORLD CHRONOMETER & SCRUBBER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'clean',
    subdomain: 'clean',
    title: 'CYBERTOOLS // CLEAN',
    subtitle: 'TEXT STREAM PURIFIER & SANITIZER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'base64',
    subdomain: 'base64',
    title: 'CYBERTOOLS // BASE64',
    subtitle: 'CRYPTOGRAPHIC CIPHER CONVERTER & DATA URI',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'compress',
    subdomain: 'compress',
    title: 'CYBERTOOLS // COMPRESS',
    subtitle: 'PIXEL MATRIX IMAGE OPTIMIZER & WEBP',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'diff',
    subdomain: 'diff',
    title: 'CYBERTOOLS // DIFF',
    subtitle: 'CODE DIFFERENCE & CHECKSUM ANALYZER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'ip',
    subdomain: 'ip',
    title: 'CYBERTOOLS // IP',
    subtitle: 'SIGNAL IP INTELLIGENCE & RADAR HUD',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'json',
    subdomain: 'json',
    title: 'CYBERTOOLS // JSON',
    subtitle: 'DATA PAYLOAD DEBUGGER & TREE INSPECTOR',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'qr',
    subdomain: 'qr',
    title: 'CYBERTOOLS // QR',
    subtitle: 'OPTICAL MATRIX GENERATOR & LIVE SCANNER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'speed',
    subdomain: 'speed',
    title: 'CYBERTOOLS // SPEED',
    subtitle: 'TELEMETRY NETWORK BENCHMARK & LATENCY',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'pack',
    subdomain: 'pack',
    title: 'CYBERTOOLS // PACK',
    subtitle: 'LLM CONTEXT PACKER // CODEBASE REPO FLATTENER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'redact',
    subdomain: 'redact',
    title: 'CYBERTOOLS // REDACT',
    subtitle: 'STREAM REDACTOR // IN-BROWSER EXIF & DATA WIPER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'invoice',
    subdomain: 'invoice',
    title: 'CYBERTOOLS // INVOICE',
    subtitle: 'INVOICE STUDIO // ZERO-LOGIN BILLING GENERATOR',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'hash',
    subdomain: 'hash',
    title: 'CYBERTOOLS // HASH',
    subtitle: 'CHECKSUM & HMAC CRYPTO DIGEST ENGINE',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'jwt',
    subdomain: 'jwt',
    title: 'CYBERTOOLS // JWT',
    subtitle: 'AUTH PAYLOAD & TOKEN CLAIMS INSPECTOR',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'regex',
    subdomain: 'regex',
    title: 'CYBERTOOLS // REGEX',
    subtitle: 'PATTERN SYNTHESIZER & REGEXP MATRIX',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'cron',
    subdomain: 'cron',
    title: 'CYBERTOOLS // CRON',
    subtitle: 'CHRONOMETER SCHEDULE & VECTOR PARSER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'palette',
    subdomain: 'palette',
    title: 'CYBERTOOLS // PALETTE',
    subtitle: 'CHROMA MATRIX & WCAG CONTRAST AUDITOR',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'doc',
    subdomain: 'doc',
    title: 'CYBERTOOLS // DOC',
    subtitle: 'TACTICAL DOSSIER & MARKDOWN TO VECTOR PDF',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'uuid',
    subdomain: 'uuid',
    title: 'CYBERTOOLS // UUID',
    subtitle: 'UUID V4/V7, ULID & NANOID ENTROPY GENERATOR',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'url',
    subdomain: 'url',
    title: 'CYBERTOOLS // URL',
    subtitle: 'URI COMPONENT CODEC & QUERY STRING PARSER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'pass',
    subdomain: 'pass',
    title: 'CYBERTOOLS // PASS',
    subtitle: 'CRYPTO PASSPHRASE & DICEWARE MATRIX',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'epoch',
    subdomain: 'epoch',
    title: 'CYBERTOOLS // EPOCH',
    subtitle: 'UNIX TIMESTAMP & CHRONO TELEMETRY ENGINE',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'slug',
    subdomain: 'slug',
    title: 'CYBERTOOLS // SLUG',
    subtitle: 'STRING CASE TRANSFORMER & URL SLUGIFIER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'yaml',
    subdomain: 'yaml',
    title: 'CYBERTOOLS // YAML',
    subtitle: 'JSON TO YAML LOSSLESS SYNTAX MATRIX',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'csv',
    subdomain: 'csv',
    title: 'CYBERTOOLS // CSV',
    subtitle: 'TABULAR DATA & CSV/JSON CONVERTER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'sql',
    subdomain: 'sql',
    title: 'CYBERTOOLS // SQL',
    subtitle: 'SQL SYNTAX FORMATTER & PURIFIER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'curl',
    subdomain: 'curl',
    title: 'CYBERTOOLS // CURL',
    subtitle: 'CURL TO CODE TRANSPILER & SYNTAX ENGINE',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'subnet',
    subdomain: 'subnet',
    title: 'CYBERTOOLS // SUBNET',
    subtitle: 'IPV4/IPV6 CIDR & NETWORK CALCULATOR',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'svg',
    subdomain: 'svg',
    title: 'CYBERTOOLS // SVG',
    subtitle: 'VECTOR SVG OPTIMIZER & MINIFIER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'base',
    subdomain: 'base',
    title: 'CYBERTOOLS // BASE',
    subtitle: 'NUMBER BASE & BIT PATTERN CONVERTER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'cert',
    subdomain: 'cert',
    title: 'CYBERTOOLS // CERT',
    subtitle: 'SSL CERTIFICATE & X.509 PEM INSPECTOR',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'bcrypt',
    subdomain: 'bcrypt',
    title: 'CYBERTOOLS // BCRYPT',
    subtitle: 'BCRYPT CIPHER & HASH VERIFIER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'xml',
    subdomain: 'xml',
    title: 'CYBERTOOLS // XML',
    subtitle: 'XML TO JSON LOSSLESS SYNTAX MATRIX',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'favicon',
    subdomain: 'favicon',
    title: 'CYBERTOOLS // FAVICON',
    subtitle: 'FAVICON & PWA APP ICON GENERATOR',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'glass',
    subdomain: 'glass',
    title: 'CYBERTOOLS // GLASS',
    subtitle: 'CYBERPUNK GLASSMORPHISM CSS STUDIO',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'table',
    subdomain: 'table',
    title: 'CYBERTOOLS // TABLE',
    subtitle: 'MARKDOWN & CSV TABULAR GENERATOR',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'dns',
    subdomain: 'dns',
    title: 'CYBERTOOLS // DNS',
    subtitle: 'DNS RECORD SYNTHESIZER & BIND FORMATTER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'robots',
    subdomain: 'robots',
    title: 'CYBERTOOLS // ROBOTS',
    subtitle: 'CRAWLER GATEKEEPER & ROBOTS.TXT COMPILER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'meta',
    subdomain: 'meta',
    title: 'CYBERTOOLS // META',
    subtitle: 'OPENGRAPH & SOCIAL META TAG STUDIO',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'ua',
    subdomain: 'ua',
    title: 'CYBERTOOLS // UA',
    subtitle: 'USER AGENT ANALYZER & ENGINE PARSER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'chmod',
    subdomain: 'chmod',
    title: 'CYBERTOOLS // CHMOD',
    subtitle: 'UNIX OCTAL PERMISSIONS MATRIX',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'lorem',
    subdomain: 'lorem',
    title: 'CYBERTOOLS // LOREM',
    subtitle: 'CYBER TEXT & JARGON SYNTHESIZER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'ports',
    subdomain: 'ports',
    title: 'CYBERTOOLS // PORTS',
    subtitle: 'TCP/UDP SERVICE PORT PROTOCOL RECON',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'minify',
    subdomain: 'minify',
    title: 'CYBERTOOLS // MINIFY',
    subtitle: 'HTML, CSS & JS CODE CONDENSER',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'unescape',
    subdomain: 'unescape',
    title: 'CYBERTOOLS // UNESCAPE',
    subtitle: 'STRING ESCAPE & UNESCAPE MATRIX',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'list',
    subdomain: 'list',
    title: 'CYBERTOOLS // LIST',
    subtitle: 'ARRAY DEDUPLICATOR & LIST MATRIX',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'units',
    subdomain: 'units',
    title: 'CYBERTOOLS // UNITS',
    subtitle: 'DATA STORAGE & BANDWIDTH CALCULATOR',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'ascii',
    subdomain: 'ascii',
    title: 'CYBERTOOLS // ASCII',
    subtitle: 'ASCII CHARACTER TABLE TERMINAL',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  },
  {
    dir: 'markdown',
    subdomain: 'markdown',
    title: 'CYBERTOOLS // MARKDOWN',
    subtitle: 'MARKDOWN PREVIEW & CHEATSHEET STUDIO',
    telemetry: '[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]'
  }
];

function generateBanner(app) {
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 1. Base Obsidian Background #05070d
  ctx.fillStyle = '#05070d';
  ctx.fillRect(0, 0, width, height);

  // 2. Subtle Cyan Radial Gradient (Top-Left / Center)
  const cyanGrad = ctx.createRadialGradient(280, 200, 10, 280, 200, 520);
  cyanGrad.addColorStop(0, 'rgba(0, 245, 255, 0.16)');
  cyanGrad.addColorStop(0.5, 'rgba(0, 245, 255, 0.04)');
  cyanGrad.addColorStop(1, 'rgba(0, 245, 255, 0)');
  ctx.fillStyle = cyanGrad;
  ctx.fillRect(0, 0, width, height);

  // 3. Subtle Neon-Pink Radial Gradient (Bottom-Right / Center)
  const pinkGrad = ctx.createRadialGradient(920, 420, 10, 920, 420, 520);
  pinkGrad.addColorStop(0, 'rgba(255, 43, 214, 0.14)');
  pinkGrad.addColorStop(0.5, 'rgba(255, 43, 214, 0.03)');
  pinkGrad.addColorStop(1, 'rgba(255, 43, 214, 0)');
  ctx.fillStyle = pinkGrad;
  ctx.fillRect(0, 0, width, height);

  // 4. Subtle Dark Grid Lines
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(0, 245, 255, 0.04)';
  const gridSize = 40;
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 5. Glowing Scanlines
  ctx.lineWidth = 1;
  for (let y = 0; y < height; y += 4) {
    ctx.strokeStyle = (y % 8 === 0) ? 'rgba(0, 245, 255, 0.015)' : 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 6. Outer HUD Tactical Framing
  const margin = 45;
  ctx.strokeStyle = 'rgba(0, 245, 255, 0.22)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

  // 7. Glowing Tactical Corner Brackets
  ctx.strokeStyle = '#00f5ff';
  ctx.lineWidth = 3.5;
  ctx.shadowColor = '#00f5ff';
  ctx.shadowBlur = 12;

  const bracket = 36;
  const offset = 6;
  const left = margin - offset;
  const top = margin - offset;
  const right = width - margin + offset;
  const bottom = height - margin + offset;

  // Top-Left
  ctx.beginPath();
  ctx.moveTo(left + bracket, top);
  ctx.lineTo(left, top);
  ctx.lineTo(left, top + bracket);
  ctx.stroke();

  // Top-Right
  ctx.beginPath();
  ctx.moveTo(right - bracket, top);
  ctx.lineTo(right, top);
  ctx.lineTo(right, top + bracket);
  ctx.stroke();

  // Bottom-Left
  ctx.beginPath();
  ctx.moveTo(left, bottom - bracket);
  ctx.lineTo(left, bottom);
  ctx.lineTo(left + bracket, bottom);
  ctx.stroke();

  // Bottom-Right
  ctx.beginPath();
  ctx.moveTo(right - bracket, bottom);
  ctx.lineTo(right, bottom);
  ctx.lineTo(right, bottom - bracket);
  ctx.stroke();

  // Reset shadow for crisp text
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  // 8. Status Header ("SARWARFX // NEURAL NETWORK SUITE")
  const monoFont = 'CyberMono, Consolas, "Courier New", monospace';
  ctx.font = `600 17px ${monoFont}`;
  ctx.fillStyle = '#00f5ff';
  ctx.fillText('SARWARFX // NEURAL NETWORK SUITE', margin + 25, margin + 28);

  ctx.font = `500 15px ${monoFont}`;
  ctx.fillStyle = '#10b981';
  ctx.textAlign = 'right';
  ctx.fillText('● ACTIVE // SECURE_ENCLAVE  [SYS_NODE: 0x7F]', width - margin - 25, margin + 28);
  ctx.textAlign = 'left';

  // Subtle separator line under header
  ctx.strokeStyle = 'rgba(0, 245, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(margin + 20, margin + 44);
  ctx.lineTo(width - margin - 20, margin + 44);
  ctx.stroke();

  // 9. Center Typography
  // Primary Title: "CYBERTOOLS" (Large, glowing cyan #00f5ff)
  ctx.font = `800 68px ${monoFont}`;
  ctx.fillStyle = '#00f5ff';
  ctx.shadowColor = '#00f5ff';
  ctx.shadowBlur = 24;
  ctx.fillText(app.title, margin + 50, 275);

  // Subtitle: "10-IN-1 CLIENT-SIDE UTILITIES" (Pink #ff2bd6)
  ctx.font = `700 28px ${monoFont}`;
  ctx.fillStyle = '#ff2bd6';
  ctx.shadowColor = '#ff2bd6';
  ctx.shadowBlur = 14;
  ctx.fillText(app.subtitle, margin + 52, 335);

  // Telemetry Tag: "[ 100% IN-BROWSER // ZERO LOGS // EDGE HOSTED ]"
  ctx.font = `600 19px ${monoFont}`;
  ctx.fillStyle = '#94a3b8';
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.fillText(app.telemetry, margin + 52, 385);

  // Tactical accent pill
  ctx.strokeStyle = 'rgba(255, 43, 214, 0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(margin + 48, 420, 280, 32);
  ctx.font = `600 13px ${monoFont}`;
  ctx.fillStyle = '#ff2bd6';
  ctx.fillText('● PURE CLIENT-SIDE SANDBOX', margin + 65, 441);

  // 10. Footer Section
  ctx.strokeStyle = 'rgba(0, 245, 255, 0.15)';
  ctx.beginPath();
  ctx.moveTo(margin + 20, height - margin - 46);
  ctx.lineTo(width - margin - 20, height - margin - 46);
  ctx.stroke();

  ctx.font = `600 16px ${monoFont}`;
  ctx.fillStyle = '#00f5ff';
  const appUrl = app.dir ? `HTTPS://APPS.SARWARFX.CFD/${app.dir.toUpperCase()}/` : 'HTTPS://APPS.SARWARFX.CFD/';
  ctx.fillText(appUrl, margin + 25, height - margin - 22);

  ctx.font = `500 14px ${monoFont}`;
  ctx.fillStyle = '#64748b';
  ctx.textAlign = 'right';
  ctx.fillText('CLOUDFLARE PAGES EDGE RUNTIME // AIRGAP SAFE', width - margin - 25, height - margin - 22);
  ctx.textAlign = 'left';

  return canvas.toBuffer('image/png');
}

// Generate for each directory
console.log('Generating 1200x630 Cyberpunk OpenGraph banner images...');
const baseDir = path.resolve(__dirname);

APPS.forEach(app => {
  const targetDir = app.dir ? path.join(baseDir, app.dir) : baseDir;
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
  const outPath = path.join(targetDir, 'og-cover.png');
  const buffer = generateBanner(app);
  fs.writeFileSync(outPath, buffer);
  console.log(`Generated: ${outPath} (${buffer.length} bytes)`);
});

console.log(`All ${APPS.length} OpenGraph banners generated successfully!`);
