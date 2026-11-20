const { execSync } = require('child_process');

// Let's test crop: w=520, h=410, x=640, y=160
execSync(`ffmpeg -y -i "./scratch/full_frame_05.png" -vf "crop=520:410:640:160" "./scratch/test_crop_precise.png"`);
console.log('Precise crop generated');
