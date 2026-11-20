const { execSync } = require('child_process');
const path = require('path');

const outDir = path.resolve('./public/videos');
const v2 = 'C:/Users/hp/.gemini/antigravity/brain/4516e213-83ee-4afb-b906-6f4af4ad472c/.user_uploaded/media_1795141912786_dffcddf6.mp4';

console.log('Testing crop 2...');
// crop=560:420:640:150
execSync(`ffmpeg -y -ss 00:00:00.2 -to 00:00:02.4 -i "${v2}" -vf "crop=560:420:640:150" -c:v libx264 -crf 17 -preset slow -an "${outDir}/golden_pedestal_exact.mp4"`);

// Extract single frame
execSync(`ffmpeg -y -ss 00:00:00.8 -i "${outDir}/golden_pedestal_exact.mp4" -vframes 1 -update 1 "./scratch/test_crop2.png"`);
console.log('Done!');
