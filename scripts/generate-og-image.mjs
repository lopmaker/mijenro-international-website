import { Resvg } from '@resvg/resvg-js';
import { writeFileSync, readFileSync } from 'node:fs';

const W = 1200, H = 630;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="navy" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#162444"/>
      <stop offset="100%" stop-color="#1A2B4C"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.35" r="0.65">
      <stop offset="0%" stop-color="#E3A65E" stop-opacity="0.14"/>
      <stop offset="60%" stop-color="#E3A65E" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grain" patternUnits="userSpaceOnUse" width="2" height="2">
      <rect width="2" height="2" fill="transparent"/>
      <circle cx="0.5" cy="0.5" r="0.22" fill="#FFFFFF" fill-opacity="0.02"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#navy)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#grain)"/>

  <!-- Top gold rule -->
  <rect x="80" y="64" width="60" height="2" fill="#E3A65E"/>

  <!-- Top eyebrow -->
  <text x="152" y="70" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="13" letter-spacing="5" fill="#E3A65E" font-weight="600">GARMENT WHOLESALE · SUPPLY CHAIN</text>

  <!-- Main serif wordmark -->
  <g transform="translate(80, 200)">
    <text font-family="Georgia, 'Noto Serif SC', serif" font-size="132" fill="#F5F2EB" font-weight="400" letter-spacing="-2">Mijenro</text>
    <text y="110" font-family="Georgia, 'Noto Serif SC', serif" font-size="132" fill="#F5F2EB" font-weight="400" font-style="italic" letter-spacing="-2">International</text>
  </g>

  <!-- Gold middle accent line -->
  <rect x="80" y="430" width="40" height="1.5" fill="#E3A65E"/>

  <!-- Subtitle -->
  <g transform="translate(80, 472)">
    <text font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="22" fill="#C9D2E2" font-weight="300" letter-spacing="0.5">Reliable garment wholesale manufacturing</text>
    <text y="32" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="22" fill="#C9D2E2" font-weight="300" letter-spacing="0.5">and supply chain management.</text>
  </g>

  <!-- Bottom rule -->
  <rect x="80" y="555" width="${W - 160}" height="1" fill="#E3A65E" fill-opacity="0.35"/>

  <!-- Footer: locations left -->
  <text x="80" y="590" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="13" letter-spacing="5" fill="#8FA0BE" font-weight="500">NEW YORK · SHANGHAI · HONG KONG</text>

  <!-- Footer: URL right -->
  <text x="${W - 80}" y="590" text-anchor="end" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="13" letter-spacing="3" fill="#E3A65E" font-weight="600">MIJENRO.COM</text>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: W },
  font: { loadSystemFonts: true },
  background: '#1A2B4C',
});

const pngData = resvg.render().asPng();
writeFileSync(new URL('../assets/og-image.png', import.meta.url), pngData);
writeFileSync(new URL('../assets/og-image.svg', import.meta.url), svg);
console.log(`Generated ${pngData.length} bytes → assets/og-image.png`);
