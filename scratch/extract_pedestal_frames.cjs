const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve('./scratch/pedestal_frames');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const v2 = 'C:/Users/hp/.gemini/antigravity/brain/4516e213-83ee-4afb-b906-6f4af4ad472c/.user_uploaded/media_1795141912786_dffcddf6.mp4';

console.log('Extracting frames from v2...');
// Crop the golden scale area: width=600, height=650 from x=580, y=0
execSync(`ffmpeg -y -ss 00:00:00.0 -to 00:00:02.5 -i "${v2}" -vf "crop=600:680:600:0" "${outDir}/pedestal_%03d.png"`);
console.log('Extracted frames count:', fs.readdirSync(outDir).length);
