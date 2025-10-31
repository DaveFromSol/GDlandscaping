const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const MAX_SIZE_KB = 300;
const TARGET_SIZE_BYTES = MAX_SIZE_KB * 1024;

// Image extensions to process
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif'];

// Function to get all image files recursively
function getAllImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllImages(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

// Function to convert and optimize a single image
async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const dir = path.dirname(inputPath);
  const baseName = path.basename(inputPath, ext);
  const outputPath = path.join(dir, `${baseName}.webp`);

  console.log(`\nProcessing: ${path.relative(PUBLIC_DIR, inputPath)}`);

  try {
    // Get original size
    const originalStats = fs.statSync(inputPath);
    const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);
    console.log(`  Original size: ${originalSizeMB} MB`);

    // Start with quality 80
    let quality = 80;
    let attempt = 0;
    let outputBuffer;

    // Try to get file size under target
    while (attempt < 5) {
      outputBuffer = await sharp(inputPath)
        .webp({ quality, effort: 6 })
        .toBuffer();

      if (outputBuffer.length <= TARGET_SIZE_BYTES || quality <= 60) {
        break;
      }

      // Reduce quality for next attempt
      quality -= 5;
      attempt++;
    }

    // If still too large, resize the image
    if (outputBuffer.length > TARGET_SIZE_BYTES) {
      console.log(`  File still large, resizing...`);

      const metadata = await sharp(inputPath).metadata();
      let width = metadata.width;
      let height = metadata.height;

      // Calculate scale factor to target file size
      const scaleFactor = Math.sqrt(TARGET_SIZE_BYTES / outputBuffer.length);
      width = Math.floor(width * scaleFactor * 0.9); // 0.9 for safety margin

      outputBuffer = await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: 75, effort: 6 })
        .toBuffer();
    }

    // Write the optimized file
    fs.writeFileSync(outputPath, outputBuffer);

    const finalSizeKB = (outputBuffer.length / 1024).toFixed(2);
    const reduction = ((1 - outputBuffer.length / originalStats.size) * 100).toFixed(1);

    console.log(`  ✓ WebP created: ${finalSizeKB} KB (${reduction}% reduction)`);

    return {
      input: path.relative(PUBLIC_DIR, inputPath),
      output: path.relative(PUBLIC_DIR, outputPath),
      originalSize: originalStats.size,
      newSize: outputBuffer.length,
      reduction: reduction
    };

  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    return null;
  }
}

// Main execution
async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('================================\n');
  console.log(`Target: Under ${MAX_SIZE_KB} KB per image`);
  console.log(`Format: WebP\n`);

  const images = getAllImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images to optimize\n`);

  const results = [];

  for (const imagePath of images) {
    const result = await optimizeImage(imagePath);
    if (result) {
      results.push(result);
    }
  }

  // Summary
  console.log('\n================================');
  console.log('📊 Optimization Summary');
  console.log('================================\n');

  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalNew = results.reduce((sum, r) => sum + r.newSize, 0);
  const totalReduction = ((1 - totalNew / totalOriginal) * 100).toFixed(1);

  console.log(`Total images processed: ${results.length}`);
  console.log(`Original total size: ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`New total size: ${(totalNew / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total reduction: ${totalReduction}%`);

  console.log('\n✓ Optimization complete!');
  console.log('\nNote: Original files are preserved. WebP versions created alongside them.');
}

main().catch(console.error);
