const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function fixImageRotation() {
  const imagePath = path.join(__dirname, '..', 'public', 'overgrown-hedge-before-trimming-ct.jpg');
  const webpPath = path.join(__dirname, '..', 'public', 'overgrown-hedge-before-trimming-ct.webp');

  console.log('Fixing rotation for overgrown-hedge-before-trimming-ct...\n');

  // Check original metadata
  const metadata = await sharp(imagePath).metadata();
  console.log('Original metadata:');
  console.log('  Dimensions:', metadata.width, 'x', metadata.height);
  console.log('  Orientation:', metadata.orientation || 'undefined');
  console.log('  Format:', metadata.format);

  // Original file size
  const originalSize = fs.statSync(imagePath).size;
  const originalWebpSize = fs.statSync(webpPath).size;

  console.log('\nOriginal sizes:');
  console.log('  JPG:', (originalSize / 1024).toFixed(2), 'KB');
  console.log('  WebP:', (originalWebpSize / 1024).toFixed(2), 'KB');

  // Re-optimize with proper rotation handling
  // Sharp automatically handles EXIF orientation with rotate()
  await sharp(imagePath)
    .rotate() // Auto-rotate based on EXIF orientation
    .resize(1200, null, { // Resize to reasonable width
      withoutEnlargement: true,
      fit: 'inside'
    })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(imagePath + '.fixed.jpg');

  await sharp(imagePath)
    .rotate() // Auto-rotate based on EXIF orientation
    .resize(1200, null, {
      withoutEnlargement: true,
      fit: 'inside'
    })
    .webp({ quality: 80, effort: 6 })
    .toFile(webpPath + '.fixed.webp');

  // Check new sizes
  const newJpgSize = fs.statSync(imagePath + '.fixed.jpg').size;
  const newWebpSize = fs.statSync(webpPath + '.fixed.webp').size;

  console.log('\nFixed sizes:');
  console.log('  JPG:', (newJpgSize / 1024).toFixed(2), 'KB');
  console.log('  WebP:', (newWebpSize / 1024).toFixed(2), 'KB');

  // Backup originals
  fs.renameSync(imagePath, imagePath + '.backup');
  fs.renameSync(webpPath, webpPath + '.backup');

  // Replace with fixed versions
  fs.renameSync(imagePath + '.fixed.jpg', imagePath);
  fs.renameSync(webpPath + '.fixed.webp', webpPath);

  console.log('\n✅ Fixed! Images have been corrected and replaced.');
  console.log('Backups saved with .backup extension');
}

fixImageRotation().catch(console.error);
