const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const v2 = 'C:/Users/hp/.gemini/antigravity/brain/4516e213-83ee-4afb-b906-6f4af4ad472c/.user_uploaded/media_1795141912786_dffcddf6.mp4';
const outDir = path.resolve('./public/videos');

console.log('Generating seamless loops...');

// Filter: crop to exact golden pedestal bounds, contrast boost so background becomes pure dark
const vf = 'crop=520:410:640:160,eq=contrast=1.1:brightness=-0.06:saturation=1.15';

// Forward clip (1 second)
execSync(`ffmpeg -y -ss 00:00:00.1 -to 00:00:01.15 -i "${v2}" -vf "${vf}" -c:v libx264 -crf 16 -preset slow -an "./scratch/forward.mp4"`);

// Reverse clip (1 second)
execSync(`ffmpeg -y -i "./scratch/forward.mp4" -vf "reverse" -c:v libx264 -crf 16 -preset slow -an "./scratch/reverse.mp4"`);

// Concat list
fs.writeFileSync('./scratch/concat.txt', "file 'forward.mp4'\nfile 'reverse.mp4'\n");
execSync(`ffmpeg -y -f concat -safe 0 -i "./scratch/concat.txt" -c copy "${outDir}/golden_pedestal_seamless.mp4"`);

// Also generate WebM VP9
execSync(`ffmpeg -y -i "${outDir}/golden_pedestal_seamless.mp4" -c:v libvpx-vp9 -b:v 0 -crf 22 -an "${outDir}/golden_pedestal_seamless.webm"`);

// Extract first and middle frames for preview/poster
execSync(`ffmpeg -y -ss 00:00:00.5 -i "${outDir}/golden_pedestal_seamless.mp4" -vframes 1 -update 1 "./public/videos/golden_pedestal_poster.png"`);
execSync(`ffmpeg -y -ss 00:00:00.5 -i "${outDir}/golden_pedestal_seamless.mp4" -vframes 1 -update 1 "./scratch/golden_pedestal_poster.png"`);

console.log('Seamless loops created successfully!');
