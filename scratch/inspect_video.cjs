const { execSync } = require('child_process');
const v2 = 'C:/Users/hp/.gemini/antigravity/brain/4516e213-83ee-4afb-b906-6f4af4ad472c/.user_uploaded/media_1795141912786_dffcddf6.mp4';
try {
  const info = execSync(`ffprobe -v error -show_entries format=duration,size,bit_rate -show_entries stream=width,height,r_frame_rate,nb_frames -of json "${v2}"`).toString();
  console.log(info);
} catch (e) {
  console.error(e.message);
}
