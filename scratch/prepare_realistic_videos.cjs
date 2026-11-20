const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve('./public/videos');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const v1 = 'C:/Users/hp/.gemini/antigravity/brain/4516e213-83ee-4afb-b906-6f4af4ad472c/.user_uploaded/media_1795141912680_d9de09f9.mp4';
const v2 = 'C:/Users/hp/.gemini/antigravity/brain/4516e213-83ee-4afb-b906-6f4af4ad472c/.user_uploaded/media_1795141912786_dffcddf6.mp4';

console.log('Generating high-res photorealistic video assets...');

try {
  // 1. Hero Armillary Celestial Sphere (from v1 at 00:00 to 00:03, crop right half: 560x560 from x=700, y=200)
  console.log('1. Cropping hero armillary sphere...');
  execSync(`ffmpeg -y -ss 00:00:00.2 -to 00:00:03.2 -i "${v1}" -vf "crop=540:540:700:200" -c:v libx264 -crf 18 -preset fast -an "${outDir}/hero_armillary_sphere.mp4"`);

  // 2. Golden Scales on Pedestal (from v2 at 00:00 to 00:02.8, crop center scale: 640x500 from x=500, y=40)
  console.log('2. Cropping golden scales of justice...');
  execSync(`ffmpeg -y -ss 00:00:00.2 -to 00:00:03.0 -i "${v2}" -vf "crop=600:460:540:20" -c:v libx264 -crf 18 -preset fast -an "${outDir}/hero_golden_scale.mp4"`);

  // 3. Jurisprudence Legal Codex Book (from v2 at 00:04.5 to 00:06.8, crop center book: 620:440 from x=330, y=280)
  console.log('3. Cropping jurisprudence 3D codex book...');
  execSync(`ffmpeg -y -ss 00:00:04.2 -to 00:00:06.8 -i "${v2}" -vf "crop=640:440:320:280" -c:v libx264 -crf 18 -preset fast -an "${outDir}/jurisprudence_book.mp4"`);

  // 4. Certificates & Diplomas 3D Display (from v2 at 00:07.0 to 00:09.5, crop certificates: 700:500 from x=320, y=250)
  console.log('4. Cropping certificates 3D stage...');
  execSync(`ffmpeg -y -ss 00:00:07.0 -to 00:00:09.6 -i "${v2}" -vf "crop=700:480:320:250" -c:v libx264 -crf 18 -preset fast -an "${outDir}/certificates_3d_stage.mp4"`);

  // 5. Ambient Cinematic Background Loop (v2 at 00:00 to 00:05 full background)
  console.log('5. Extracting ambient cinematic background loop...');
  execSync(`ffmpeg -y -ss 00:00:00 -to 00:00:04.0 -i "${v2}" -c:v libx264 -crf 20 -preset fast -an "${outDir}/ambient_cinematic_bg.mp4"`);

  console.log('Done! Created videos:', fs.readdirSync(outDir));
} catch(e) {
  console.error('Error generating video assets:', e.message);
}
