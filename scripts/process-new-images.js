import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = path.resolve('images');
const outputDir = path.resolve('public/images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processNewImages() {
  try {
    const fileDesk = path.join(inputDir, 'Confident Professional in Modern Office.png');
    const fileDoor = path.join(inputDir, 'Confident Office Portrait by the Door.png');

    console.log('Processing new images...');
    const metaDesk = await sharp(fileDesk).metadata();
    const metaDoor = await sharp(fileDoor).metadata();

    console.log('Desk:', metaDesk.width, 'x', metaDesk.height);
    console.log('Door:', metaDoor.width, 'x', metaDoor.height);

    // 1. Desk Executive Hero Portrait (Upper 85% with subtle warmth and clarity)
    await sharp(fileDesk)
      .resize({ width: 1200, height: 1600, fit: 'cover', position: 'top' })
      .modulate({
        brightness: 1.02,
        saturation: 1.05,
      })
      .sharpen({ sigma: 1.0 })
      .webp({ quality: 92 })
      .toFile(path.join(outputDir, 'executive-desk-hero.webp'));

    await sharp(fileDesk)
      .resize({ width: 1200, height: 1600, fit: 'cover', position: 'top' })
      .modulate({
        brightness: 1.02,
        saturation: 1.05,
      })
      .sharpen({ sigma: 1.0 })
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(path.join(outputDir, 'executive-desk-hero.jpg'));

    console.log('Generated executive-desk-hero');

    // 2. Focused Executive Portrait Crop (Head & Shoulders for glass frame)
    const cropWidthDesk = Math.round(metaDesk.width * 0.75);
    const cropHeightDesk = Math.round(metaDesk.height * 0.65);
    const leftDesk = Math.round((metaDesk.width - cropWidthDesk) / 2);

    await sharp(fileDesk)
      .extract({ left: leftDesk, top: 0, width: cropWidthDesk, height: cropHeightDesk })
      .resize({ width: 900, height: 1150, fit: 'cover' })
      .modulate({
        brightness: 1.03,
        saturation: 1.06,
      })
      .sharpen({ sigma: 1.0 })
      .webp({ quality: 92 })
      .toFile(path.join(outputDir, 'executive-desk-focus.webp'));

    await sharp(fileDesk)
      .extract({ left: leftDesk, top: 0, width: cropWidthDesk, height: cropHeightDesk })
      .resize({ width: 900, height: 1150, fit: 'cover' })
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(path.join(outputDir, 'executive-desk-focus.jpg'));

    console.log('Generated executive-desk-focus');

    // 3. Standing Suit Full-Length
    await sharp(fileDoor)
      .resize({ width: 1000, height: 1600, fit: 'cover', position: 'top' })
      .modulate({
        brightness: 1.02,
        saturation: 1.04,
      })
      .sharpen({ sigma: 1.0 })
      .webp({ quality: 92 })
      .toFile(path.join(outputDir, 'standing-suit-full.webp'));

    await sharp(fileDoor)
      .resize({ width: 1000, height: 1600, fit: 'cover', position: 'top' })
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(path.join(outputDir, 'standing-suit-full.jpg'));

    console.log('Generated standing-suit-full');

    // 4. Standing Suit 3/4 Portrait Crop
    const cropHeightDoor = Math.round(metaDoor.height * 0.75);
    await sharp(fileDoor)
      .extract({ left: 0, top: 0, width: metaDoor.width, height: cropHeightDoor })
      .resize({ width: 900, height: 1200, fit: 'cover' })
      .modulate({
        brightness: 1.02,
        saturation: 1.05,
      })
      .sharpen({ sigma: 1.0 })
      .webp({ quality: 92 })
      .toFile(path.join(outputDir, 'standing-suit-portrait.webp'));

    await sharp(fileDoor)
      .extract({ left: 0, top: 0, width: metaDoor.width, height: cropHeightDoor })
      .resize({ width: 900, height: 1200, fit: 'cover' })
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(path.join(outputDir, 'standing-suit-portrait.jpg'));

    console.log('Generated standing-suit-portrait');
    console.log('All new images processed successfully!');
  } catch (err) {
    console.error('Error processing new images:', err);
  }
}

processNewImages();
