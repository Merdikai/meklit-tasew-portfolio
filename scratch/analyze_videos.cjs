const { execSync } = require('child_process');

const v1 = 'C:/Users/hp/.gemini/antigravity/brain/4516e213-83ee-4afb-b906-6f4af4ad472c/.user_uploaded/media_1795141912680_d9de09f9.mp4';
const v2 = 'C:/Users/hp/.gemini/antigravity/brain/4516e213-83ee-4afb-b906-6f4af4ad472c/.user_uploaded/media_1795141912786_dffcddf6.mp4';

console.log('=== V1 INFO ===');
try {
  const res1 = execSync(`ffprobe -v error -show_entries format=duration,bit_rate:stream=width,height,codec_name -of json "${v1}"`).toString();
  console.log(res1);
} catch(e) {
  console.error(e.message);
}

console.log('=== V2 INFO ===');
try {
  const res2 = execSync(`ffprobe -v error -show_entries format=duration,bit_rate:stream=width,height,codec_name -of json "${v2}"`).toString();
  console.log(res2);
} catch(e) {
  console.error(e.message);
}
