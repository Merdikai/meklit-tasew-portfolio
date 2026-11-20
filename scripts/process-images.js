import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = path.resolve('images');
const outputDir = path.resolve('public/images');
const cvInputDir = path.resolve('CV');
const cvOutputDir = path.resolve('public/cv');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(cvOutputDir)) {
  fs.mkdirSync(cvOutputDir, { recursive: true });
}

// Copy CV
const cvFile = path.join(cvInputDir, 'Meklit Tasew cv.pdf');
if (fs.existsSync(cvFile)) {
  fs.copyFileSync(cvFile, path.join(cvOutputDir, 'Meklit_Tasew_CV.pdf'));
  console.log('Copied CV to public/cv/Meklit_Tasew_CV.pdf');
}

async function processImages() {
  try {
    const file1 = path.join(inputDir, '117A4390.JPG'); // Hand on chin, thoughtful & dignified
    const file2 = path.join(inputDir, '117A4381.JPG'); // Arms crossed, direct gaze
    const file3 = path.join(inputDir, 'me.jpg');        // Headshot in blazer

    console.log('Analyzing dimensions...');
    const meta1 = await sharp(file1).metadata();
    const meta2 = await sharp(file2).metadata();
    const meta3 = await sharp(file3).metadata();

    console.log('117A4390:', meta1.width, 'x', meta1.height);
    console.log('117A4381:', meta2.width, 'x', meta2.height);
    console.log('me.jpg:', meta3.width, 'x', meta3.height);

    // 1. Process 117A4390 -> Hero Editorial Portrait (Upper body & expression, crop out watermark at bottom)
    // Watermark is at the bottom left (approx bottom 10%).
    // For hero portrait, let's crop upper 68% of the image, centered on her upper body and face
    const cropWidth1 = Math.round(meta1.width * 0.85);
    const cropHeight1 = Math.round(meta1.height * 0.70);
    const left1 = Math.round((meta1.width - cropWidth1) / 2);
    const top1 = Math.round(meta1.height * 0.03); // slight headroom

    await sharp(file1)
      .extract({ left: left1, top: top1, width: cropWidth1, height: cropHeight1 })
      .resize({ width: 1200, height: 1450, fit: 'cover' })
      .modulate({
        brightness: 1.03, // subtle lift
        saturation: 1.08, // rich vibrant royal blue & healthy skin tone
      })
      .sharpen({ sigma: 1.2, m1: 0.5, m2: 2.0 })
      .webp({ quality: 90 })
      .toFile(path.join(outputDir, 'hero-editorial.webp'));

    await sharp(file1)
      .extract({ left: left1, top: top1, width: cropWidth1, height: cropHeight1 })
      .resize({ width: 1200, height: 1450, fit: 'cover' })
      .modulate({
        brightness: 1.03,
        saturation: 1.08,
      })
      .sharpen({ sigma: 1.2, m1: 0.5, m2: 2.0 })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(outputDir, 'hero-editorial.jpg'));

    console.log('Created hero-editorial.webp & .jpg');

    // 2. Process 117A4390 -> Focus Close-up Portrait (Head & shoulders, judicial gaze)
    const faceWidth = Math.round(meta1.width * 0.50);
    const faceHeight = Math.round(meta1.height * 0.40);
    const faceLeft = Math.round(meta1.width * 0.25);
    const faceTop = Math.round(meta1.height * 0.04);

    await sharp(file1)
      .extract({ left: faceLeft, top: faceTop, width: faceWidth, height: faceHeight })
      .resize({ width: 800, height: 950, fit: 'cover' })
      .modulate({
        brightness: 1.04,
        saturation: 1.06,
      })
      .sharpen({ sigma: 1.0 })
      .webp({ quality: 92 })
      .toFile(path.join(outputDir, 'portrait-closeup.webp'));

    await sharp(file1)
      .extract({ left: faceLeft, top: faceTop, width: faceWidth, height: faceHeight })
      .resize({ width: 800, height: 950, fit: 'cover' })
      .modulate({
        brightness: 1.04,
        saturation: 1.06,
      })
      .sharpen({ sigma: 1.0 })
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(path.join(outputDir, 'portrait-closeup.jpg'));

    console.log('Created portrait-closeup.webp & .jpg');

    // 3. Process 117A4381 -> Full-length standing poise (crop bottom 16% to eliminate watermark cleanly)
    const fullWidth2 = meta2.width;
    const fullHeight2 = Math.round(meta2.height * 0.84); // cuts off watermark cleanly

    await sharp(file2)
      .extract({ left: 0, top: 0, width: fullWidth2, height: fullHeight2 })
      .resize({ width: 1000, height: 1350, fit: 'cover' })
      .modulate({
        brightness: 1.02,
        saturation: 1.06,
      })
      .sharpen({ sigma: 1.1 })
      .webp({ quality: 90 })
      .toFile(path.join(outputDir, 'full-standing.webp'));

    await sharp(file2)
      .extract({ left: 0, top: 0, width: fullWidth2, height: fullHeight2 })
      .resize({ width: 1000, height: 1350, fit: 'cover' })
      .modulate({
        brightness: 1.02,
        saturation: 1.06,
      })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(outputDir, 'full-standing.jpg'));

    console.log('Created full-standing.webp & .jpg');

    // 4. Process me.jpg -> Executive Academic & Practice Headshot
    await sharp(file3)
      .resize({ width: 640, height: 640, fit: 'cover', position: 'top' })
      .modulate({
        brightness: 1.03,
        saturation: 1.05,
      })
      .sharpen({ sigma: 0.8 })
      .webp({ quality: 92 })
      .toFile(path.join(outputDir, 'executive-headshot.webp'));

    await sharp(file3)
      .resize({ width: 640, height: 640, fit: 'cover', position: 'top' })
      .modulate({
        brightness: 1.03,
        saturation: 1.05,
      })
      .sharpen({ sigma: 0.8 })
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(path.join(outputDir, 'executive-headshot.jpg'));

    console.log('Created executive-headshot.webp & .jpg');

    // Also copy original images for fallback
    fs.copyFileSync(file3, path.join(outputDir, 'me-original.jpg'));
    console.log('Image processing completed successfully!');
  } catch (err) {
    console.error('Error during image processing:', err);
  }
}

processImages();
