const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const outDir = path.resolve('./scratch/video_frames');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const v1 = 'C:/Users/hp/.gemini/antigravity/brain/4516e213-83ee-4afb-b906-6f4af4ad472c/.user_uploaded/media_1795141912680_d9de09f9.mp4';
const v2 = 'C:/Users/hp/.gemini/antigravity/brain/4516e213-83ee-4afb-b906-6f4af4ad472c/.user_uploaded/media_1795141912786_dffcddf6.mp4';

try {
  console.log('Extracting v1...');
  execSync(`ffmpeg -y -i "${v1}" -vf "fps=1" "${outDir}/v1_frame_%02d.jpg"`);
  console.log('Extracting v2...');
  execSync(`ffmpeg -y -i "${v2}" -vf "fps=1" "${outDir}/v2_frame_%02d.jpg"`);
  console.log('Extracted frames:', fs.readdirSync(outDir));
} catch (e) {
  console.error('Error:', e.message);
}
