const { execSync } = require('child_process');
const fs = require('fs');

const v1 = 'C:/Users/hp/.gemini/antigravity/brain/4516e213-83ee-4afb-b906-6f4af4ad472c/.user_uploaded/media_1795141912680_d9de09f9.mp4';
const v2 = 'C:/Users/hp/.gemini/antigravity/brain/4516e213-83ee-4afb-b906-6f4af4ad472c/.user_uploaded/media_1795141912786_dffcddf6.mp4';

const outDir = './scratch/clips';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Let's inspect the sections in v1 and v2
console.log('Extracting clips...');
try {
  // v1: 0 to 3s (Hero with celestial sphere)
  execSync(`ffmpeg -y -ss 00:00:00 -to 00:00:03.5 -i "${v1}" -c:v libx264 -crf 18 -an "${outDir}/v1_hero.mp4"`);
  // v1: 3.5s to 6.5s (Jurisprudence book)
  execSync(`ffmpeg -y -ss 00:00:03.5 -to 00:00:06.5 -i "${v1}" -c:v libx264 -crf 18 -an "${outDir}/v1_jurisprudence.mp4"`);
  // v1: 6.5s to 10s (Certificates)
  execSync(`ffmpeg -y -ss 00:00:06.5 -to 00:00:10.0 -i "${v1}" -c:v libx264 -crf 18 -an "${outDir}/v1_certificates.mp4"`);

  // v2: 0 to 3s (Golden scale pedestal)
  execSync(`ffmpeg -y -ss 00:00:00 -to 00:00:03.0 -i "${v2}" -c:v libx264 -crf 18 -an "${outDir}/v2_hero_scale.mp4"`);
  // v2: 3.0 to 6.5s (Four pillars & jurisprudence)
  execSync(`ffmpeg -y -ss 00:00:03.0 -to 00:00:06.5 -i "${v2}" -c:v libx264 -crf 18 -an "${outDir}/v2_pillars_jurisprudence.mp4"`);
  // v2: 6.5 to 10s (Certificates & references)
  execSync(`ffmpeg -y -ss 00:00:06.5 -to 00:00:10.0 -i "${v2}" -c:v libx264 -crf 18 -an "${outDir}/v2_certificates.mp4"`);

  console.log('Clips generated:', fs.readdirSync(outDir));
} catch(e) {
  console.error('Error extracting clips:', e.message);
}
