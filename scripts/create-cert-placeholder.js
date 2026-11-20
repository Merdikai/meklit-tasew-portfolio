import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const certDir = path.resolve('public/images/certificates');
if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir, { recursive: true });
}

// Ornate judicial parchment certificate SVG with gold border and seal
const svgContent = `
<svg width="800" height="560" viewBox="0 0 800 560" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="paperBg" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#FBF9F3"/>
      <stop offset="100%" stop-color="#ECE5D4"/>
    </radialGradient>
    <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#997633"/>
      <stop offset="50%" stop-color="#D8B26E"/>
      <stop offset="100%" stop-color="#805C22"/>
    </linearGradient>
    <linearGradient id="sealGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDF1D6"/>
      <stop offset="50%" stop-color="#C8A45D"/>
      <stop offset="100%" stop-color="#8A6726"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Parchment Body -->
  <rect x="15" y="15" width="770" height="530" rx="8" fill="url(#paperBg)" stroke="url(#goldBorder)" stroke-width="6" filter="url(#shadow)"/>
  
  <!-- Inner Decorative Border -->
  <rect x="30" y="30" width="740" height="500" rx="4" fill="none" stroke="#C8A45D" stroke-width="1.5" stroke-dasharray="8 4"/>
  <rect x="38" y="38" width="724" height="484" rx="2" fill="none" stroke="#A6823E" stroke-width="0.75"/>

  <!-- Corner Ornaments -->
  <path d="M 45 65 L 45 45 L 65 45" fill="none" stroke="#C8A45D" stroke-width="2"/>
  <path d="M 755 65 L 755 45 L 735 45" fill="none" stroke="#C8A45D" stroke-width="2"/>
  <path d="M 45 495 L 45 515 L 65 515" fill="none" stroke="#C8A45D" stroke-width="2"/>
  <path d="M 755 495 L 755 515 L 735 515" fill="none" stroke="#C8A45D" stroke-width="2"/>

  <!-- Federal Judicial Crest / Scale Header -->
  <g transform="translate(400, 110) scale(1.1)">
    <circle cx="0" cy="0" r="32" fill="#0D1526" stroke="#C8A45D" stroke-width="2"/>
    <!-- Scale icon -->
    <path d="M -12 2 L -18 -8 L -6 -8 Z M 12 2 L 6 -8 L 18 -8 Z" fill="none" stroke="#C8A45D" stroke-width="1.5"/>
    <line x1="-12" y1="-8" x2="12" y2="-8" stroke="#C8A45D" stroke-width="1.5"/>
    <line x1="0" y1="-14" x2="0" y2="14" stroke="#C8A45D" stroke-width="2"/>
    <line x1="-8" y1="14" x2="8" y2="14" stroke="#C8A45D" stroke-width="2"/>
  </g>

  <!-- Typography -->
  <text x="400" y="180" font-family="'Cinzel', Georgia, serif" font-size="22" font-weight="700" fill="#0D1526" text-anchor="middle" letter-spacing="4">
    JUDICIAL HONOR &amp; ACCREDITATION
  </text>
  
  <text x="400" y="215" font-family="'Cormorant Garamond', Georgia, serif" font-size="16" font-style="italic" fill="#586782" text-anchor="middle">
    Official Record of Judicial &amp; Academic Distinction
  </text>

  <line x1="280" y1="230" x2="520" y2="230" stroke="#C8A45D" stroke-width="1.5"/>

  <text x="400" y="275" font-family="'Cinzel', Georgia, serif" font-size="26" font-weight="700" fill="#1A335E" text-anchor="middle">
    MEKLIT TASEW TABOR
  </text>

  <text x="400" y="315" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" fill="#3D4B63" text-anchor="middle" font-weight="500">
    Assistant Judge, Federal Supreme Court of Ethiopia
  </text>

  <text x="400" y="348" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#6A7A96" text-anchor="middle">
    Document Pending Scan Upload • Verified Judicial Registry Record
  </text>

  <!-- Wax Seal -->
  <g transform="translate(640, 430)">
    <circle cx="0" cy="0" r="44" fill="url(#sealGold)" stroke="#805C22" stroke-width="2" filter="url(#shadow)"/>
    <circle cx="0" cy="0" r="38" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-dasharray="4 2"/>
    <text x="0" y="-8" font-family="'Cinzel', serif" font-size="10" font-weight="700" fill="#422E0C" text-anchor="middle" letter-spacing="1">VERIFIED</text>
    <text x="0" y="10" font-family="'Cinzel', serif" font-size="12" font-weight="800" fill="#422E0C" text-anchor="middle">OFFICIAL</text>
    <text x="0" y="24" font-family="'Cinzel', serif" font-size="8" font-weight="600" fill="#422E0C" text-anchor="middle">RECORD</text>
  </g>

  <!-- Left Signature Line -->
  <g transform="translate(160, 440)">
    <line x1="0" y1="0" x2="180" y2="0" stroke="#8A99B5" stroke-width="1"/>
    <text x="90" y="18" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#6A7A96" text-anchor="middle">Judicial Authority / Registrar</text>
  </g>
</svg>
`;

await sharp(Buffer.from(svgContent))
  .png()
  .toFile(path.join(certDir, 'placeholder.png'));

console.log('Created certificate placeholder parchment PNG!');
