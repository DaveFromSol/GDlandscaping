const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function optimizeLogo() {
  const inputPath = path.join(__dirname, '..', 'public', 'GD.png');
  const outputPngPath = path.join(__dirname, '..', 'public', 'GD-optimized.png');
  const outputWebpPath = path.join(__dirname, '..', 'public', 'GD-optimized.webp');

  console.log('Optimizing logo for 200x200 display (creating 400x400 for retina)...\n');

  // Original sizes
  const originalPngSize = fs.statSync(inputPath).size;
  const originalWebpPath = path.join(__dirname, '..', 'public', 'GD.webp');
  const originalWebpSize = fs.existsSync(originalWebpPath) ? fs.statSync(originalWebpPath).size : 0;

  // Create 400x400 version (2x for retina displays showing at 200x200)
  await sharp(inputPath)
    .resize(400, 400, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(outputPngPath);

  await sharp(inputPath)
    .resize(400, 400, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .webp({ quality: 90, effort: 6 })
    .toFile(outputWebpPath);

  // Get new sizes
  const newPngSize = fs.statSync(outputPngPath).size;
  const newWebpSize = fs.statSync(outputWebpPath).size;

  console.log('Results:');
  console.log('========================================');
  console.log(`Original PNG (500x500): ${(originalPngSize / 1024).toFixed(2)} KB`);
  console.log(`Optimized PNG (400x400): ${(newPngSize / 1024).toFixed(2)} KB`);
  console.log(`Reduction: ${((1 - newPngSize / originalPngSize) * 100).toFixed(1)}%`);
  console.log('');
  console.log(`Original WebP (500x500): ${(originalWebpSize / 1024).toFixed(2)} KB`);
  console.log(`Optimized WebP (400x400): ${(newWebpSize / 1024).toFixed(2)} KB`);
  console.log(`Reduction: ${((1 - newWebpSize / originalWebpSize) * 100).toFixed(1)}%`);
  console.log('========================================');
  console.log('\nOptimized files created:');
  console.log('  - GD-optimized.png (400x400)');
  console.log('  - GD-optimized.webp (400x400)');
  console.log('\nReady to replace original files!');
}

optimizeLogo().catch(console.error);
