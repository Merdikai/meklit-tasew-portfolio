const { execSync } = require('child_process');
const v2 = 'C:/Users/hp/.gemini/antigravity/brain/4516e213-83ee-4afb-b906-6f4af4ad472c/.user_uploaded/media_1795141912786_dffcddf6.mp4';

const times = ['0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0'];
times.forEach((t, i) => {
  execSync(`ffmpeg -y -ss 00:00:0${t} -i "${v2}" -vf "crop=560:420:640:150" -vframes 1 -update 1 "./scratch/frame_${i}.png"`);
});
console.log('Frames extracted');
