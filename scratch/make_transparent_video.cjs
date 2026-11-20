const { execSync } = require('child_process');
const path = require('path');

const outDir = path.resolve('./public/videos');

console.log('Generating true transparent alpha WebM and testing canvas...');

// Using ffmpeg colorkey to turn pure black #000000 into true alpha channel
// colorkey=0x000000:0.15:0.1 -> removes pure dark backgrounds into alpha
execSync(`ffmpeg -y -i "${outDir}/golden_pedestal_seamless.mp4" -vf "colorkey=0x000000:0.12:0.08,format=yuva420p" -c:v libvpx-vp9 -b:v 0 -crf 20 -auto-alt-ref 0 "${outDir}/golden_pedestal_alpha.webm"`);

console.log('Done alpha webm!');
