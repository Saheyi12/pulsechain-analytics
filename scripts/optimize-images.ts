import fs from 'fs';
import path from 'path';

/**
 * Image optimization script
 * In production, integrate with sharp or cloudinary
 * For now, this validates and reports on images
 */

const IMAGE_DIR = path.join(process.cwd(), 'public', 'images');
const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.ico', '.gif'];
const MAX_SIZE_MB = 2;

interface ImageReport {
  file: string;
  size: number;
  sizeFormatted: string;
  extension: string;
  valid: boolean;
  issue?: string;
}

async function main() {
  console.log('🖼️  Analyzing images...\n');

  const report: ImageReport[] = [];
  const images = getAllImages(IMAGE_DIR);

  for (const imagePath of images) {
    const stats = fs.statSync(imagePath);
    const ext = path.extname(imagePath).toLowerCase();
    const sizeMB = stats.size / (1024 * 1024);
    const relativePath = path.relative(process.cwd(), imagePath);

    const entry: ImageReport = {
      file: relativePath,
      size: stats.size,
      sizeFormatted: sizeMB > 1 ? `${sizeMB.toFixed(1)} MB` : `${(stats.size / 1024).toFixed(1)} KB`,
      extension: ext,
      valid: true,
    };

    // Check extension
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      entry.valid = false;
      entry.issue = `Unsupported format: ${ext}`;
    }

    // Check size
    if (stats.size === 0) {
      entry.valid = false;
      entry.issue = 'Empty file (0 bytes)';
    } else if (sizeMB > MAX_SIZE_MB) {
      entry.issue = `Large file (${sizeMB.toFixed(1)} MB) - consider compressing`;
    }

    report.push(entry);
  }

  // Print report
  const validImages = report.filter((r) => r.valid);
  const invalidImages = report.filter((r) => !r.valid);
  const largeImages = report.filter((r) => r.issue?.includes('Large'));

  console.log('📊 Image Report:');
  console.log(`   Total images: ${report.length}`);
  console.log(`   Valid: ${validImages.length}`);
  console.log(`   Invalid: ${invalidImages.length}`);
  console.log(`   Needs optimization: ${largeImages.length}\n`);

  if (invalidImages.length > 0) {
    console.log('❌ Invalid Images:');
    invalidImages.forEach((img) => {
      console.log(`   ${img.file} - ${img.issue}`);
    });
    console.log('');
  }

  if (largeImages.length > 0) {
    console.log('⚠️  Large Images (consider compressing):');
    largeImages.forEach((img) => {
      console.log(`   ${img.file} - ${img.sizeFormatted}`);
    });
    console.log('');
  }

  // Placeholder check
  const placeholdersNeeded = checkPlaceholders();
  if (placeholdersNeeded.length > 0) {
    console.log('📌 Missing placeholder images:');
    placeholdersNeeded.forEach((p) => {
      console.log(`   ${p}`);
    });
    console.log('');
  }

  console.log('💡 Tips:');
  console.log('   - Use .webp format for photos');
  console.log('   - Keep images under 500KB when possible');
  console.log('   - Use SVGs for icons and logos');
  console.log('   - Consider using Cloudinary for automatic optimization\n');
}

function getAllImages(dir: string): string[] {
  const images: string[] = [];
  
  if (!fs.existsSync(dir)) return images;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      images.push(...getAllImages(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        images.push(fullPath);
      }
    }
  }

  return images;
}

function checkPlaceholders(): string[] {
  const required = [
    'public/favicon.ico',
    'public/og-image.png',
    'public/logo.svg',
    'public/logo-white.svg',
    'public/images/blog/default-blog-hero.webp',
  ];

  return required.filter((p) => {
    const fullPath = path.join(process.cwd(), p);
    if (!fs.existsSync(fullPath)) return true;
    return fs.statSync(fullPath).size === 0;
  });
}

main();