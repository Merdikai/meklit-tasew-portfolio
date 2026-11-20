const { createCanvas, loadImage } = require('canvas') || {};
const fs = require('fs');

// We have sharp or can use ffmpeg to crop exact coordinates
// Let's test a few crops:
// Crop A: x=600, y=180, w=540, h=480
// Let's check where the stats card top border is:
// In full_frame_05.png (1280x720):
// Stats boxes start at y ≈ 580!
// Golden pedestal base sits at y ≈ 560!
// Acorn top is at y ≈ 190!
// So height from 180 to 575 is 395px!
// Width: from x = 620 to x = 1140 (w = 520px).
console.log('Coordinates identified');
