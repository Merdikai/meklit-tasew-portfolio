const { execSync } = require('child_process');
const v2 = 'C:/Users/hp/.gemini/antigravity/brain/4516e213-83ee-4afb-b906-6f4af4ad472c/.user_uploaded/media_1795141912786_dffcddf6.mp4';

// Let's extract full 1280x720 frame at 0.5s
execSync(`ffmpeg -y -ss 00:00:00.5 -i "${v2}" -vframes 1 -update 1 "./scratch/full_frame_05.png"`);
console.log('Full frame extracted');
