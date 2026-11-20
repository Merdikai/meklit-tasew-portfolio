const { execSync } = require('child_process');
const v1 = 'C:/Users/hp/.gemini/antigravity/brain/4516e213-83ee-4afb-b906-6f4af4ad472c/.user_uploaded/media_1795141912680_d9de09f9.mp4';

execSync(`ffmpeg -y -ss 00:00:00.5 -i "${v1}" -vframes 1 -update 1 "./scratch/v1_frame_05.png"`);
execSync(`ffmpeg -y -ss 00:00:02.0 -i "${v1}" -vframes 1 -update 1 "./scratch/v1_frame_20.png"`);
console.log('v1 frames extracted');
