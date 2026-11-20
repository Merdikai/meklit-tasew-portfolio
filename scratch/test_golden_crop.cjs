const { execSync } = require('child_process');
const path = require('path');

const outDir = path.resolve('./public/videos');
const v2 = 'C:/Users/hp/.gemini/antigravity/brain/4516e213-83ee-4afb-b906-6f4af4ad472c/.user_uploaded/media_1795141912786_dffcddf6.mp4';

// Crop ONLY the golden scale with the swirling aura:
// In 1280x720 video:
// Scale center is roughly around x=860, y=360
// Let's test a clean 480x480 crop around the scale
console.log('Testing crop...');
execSync(`ffmpeg -y -ss 00:00:00.2 -to 00:00:02.4 -i "${v2}" -vf "crop=560:520:640:200" -c:v libx264 -crf 17 -preset slow -an "${outDir}/golden_pedestal_exact.mp4"`);

// Also extract a frame to check the crop
execSync(`ffmpeg -y -i "${outDir}/golden_pedestal_exact.mp4" -vframes 1 "./scratch/test_crop.png"`);
console.log('Done!');
