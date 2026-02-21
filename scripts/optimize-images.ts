#!/usr/bin/env node
/**
 * Image Optimization Script
 *
 * This script optimizes all images in the content/assets directory:
 * 1. Finds all images (JPG, PNG, WebP)
 * 2. Creates WebP versions for better compression
 * 3. Resizes images to appropriate dimensions
 * 4. Reports space savings
 */

import { readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, extname, basename, relative } from 'path';
import sharp from 'sharp';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Logging utilities
const log = {
  info: (message: string) => console.log(`${colors.blue}${message}${colors.reset}`),
  success: (message: string) => console.log(`${colors.green}${message}${colors.reset}`),
  warning: (message: string) => console.log(`${colors.yellow}${message}${colors.reset}`),
  error: (message: string) => console.log(`${colors.red}${message}${colors.reset}`),
  header: (message: string) => console.log(`\n${colors.bright}${colors.cyan}${message}${colors.reset}\n`),
};

// Configuration
const CONFIG = {
  contentDir: join(process.cwd(), 'content'),
  assetsDir: join(process.cwd(), 'content/assets'),
  imageExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.tiff', '.avif'],
  maxDimension: 2500,
  thumbnailDimension: 600,
  quality: {
    jpg: 85,
    webp: 85,
    png: 9, // Compression level for PNG
  },
  generateThumbnails: true,
  generateWebP: true,
  skipExistingWebP: false,
};

// File stats
interface ImageStats {
  path: string;
  originalSize: number;
  optimizedSize: number;
  webpSize?: number;
  thumbnailSize?: number;
}

const results: ImageStats[] = [];
let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let totalWebPSaved = 0;

// Format bytes to human-readable
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// Calculate percentage saved
function calculateSaved(original: number, optimized: number): number {
  if (original === 0) return 0;
  return ((original - optimized) / original) * 100;
}

// Recursively find all image files
function findImages(dir: string, baseDir: string = dir): string[] {
  const images: string[] = [];

  try {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        images.push(...findImages(fullPath, baseDir));
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();
        if (CONFIG.imageExtensions.includes(ext)) {
          images.push(fullPath);
        }
      }
    }
  } catch (error) {
    log.error(`Error reading directory ${dir}: ${(error as Error).message}`);
  }

  return images;
}

// Optimize an image
async function optimizeImage(imagePath: string): Promise<void> {
  const relativePath = relative(process.cwd(), imagePath);
  const ext = extname(imagePath).toLowerCase();
  const basenameWithoutExt = basename(imagePath, ext);
  const dir = imagePath.slice(0, -basename(imagePath).length);

  try {
    const originalStats = statSync(imagePath);
    const originalSize = originalStats.size;
    let image = sharp(imagePath);

    // Get metadata
    const metadata = await image.metadata();

    log.info(`Processing: ${relativePath}`);
    console.log(`  Original: ${formatBytes(originalSize)} (${metadata.width}x${metadata.height})`);

    const result: ImageStats = {
      path: relativePath,
      originalSize,
      optimizedSize: originalSize,
    };

    // Create optimized version
    const optimizedPath = join(dir, `${basenameWithoutExt}.opt${ext}`);

    if (ext === '.jpg' || ext === '.jpeg') {
      await image
        .resize(CONFIG.maxDimension, CONFIG.maxDimension, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality: CONFIG.quality.jpg, mozjpeg: true })
        .toFile(optimizedPath);

      const optimizedStats = statSync(optimizedPath);
      result.optimizedSize = optimizedStats.size;

      console.log(
        `  Optimized: ${formatBytes(result.optimizedSize)} (-${calculateSaved(originalSize, result.optimizedSize).toFixed(1)}%)`
      );

      // Replace original with optimized
      const fs = await import('fs/promises');
      await fs.copyFile(optimizedPath, imagePath);
      await fs.unlink(optimizedPath);
    } else if (ext === '.png') {
      await image
        .resize(CONFIG.maxDimension, CONFIG.maxDimension, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .png({ compressionLevel: CONFIG.quality.png, adaptiveFiltering: true })
        .toFile(optimizedPath);

      const optimizedStats = statSync(optimizedPath);
      result.optimizedSize = optimizedStats.size;

      console.log(
        `  Optimized: ${formatBytes(result.optimizedSize)} (-${calculateSaved(originalSize, result.optimizedSize).toFixed(1)}%)`
      );

      // Replace original with optimized
      const fs = await import('fs/promises');
      await fs.copyFile(optimizedPath, imagePath);
      await fs.unlink(optimizedPath);
    }

    // Generate WebP version
    if (CONFIG.generateWebP && ext !== '.webp') {
      const webpPath = join(dir, `${basenameWithoutExt}.webp`);

      if (!CONFIG.skipExistingWebP || !existsSync(webpPath)) {
        await sharp(imagePath)
          .webp({ quality: CONFIG.quality.webp })
          .toFile(webpPath);

        const webpStats = statSync(webpPath);
        result.webpSize = webpStats.size;

        console.log(
          `  WebP: ${formatBytes(result.webpSize)} (-${calculateSaved(originalSize, result.webpSize).toFixed(1)}%)`
        );

        totalWebPSaved += originalSize - result.webpSize;
      } else {
        console.log('  WebP: (already exists, skipped)');
      }
    }

    // Generate thumbnail
    if (CONFIG.generateThumbnails) {
      const thumbnailDir = join(dir, 'thumbnails');
      if (!existsSync(thumbnailDir)) {
        mkdirSync(thumbnailDir, { recursive: true });
      }

      const thumbnailPath = join(thumbnailDir, `${basenameWithoutExt}-thumb${ext === '.png' ? '.png' : '.jpg'}`);

      if (!existsSync(thumbnailPath)) {
        await sharp(imagePath)
          .resize(CONFIG.thumbnailDimension, CONFIG.thumbnailDimension, {
            fit: 'cover',
            position: 'center',
          })
          .jpeg({ quality: 80 })
          .toFile(thumbnailPath);

        const thumbStats = statSync(thumbnailPath);
        result.thumbnailSize = thumbStats.size;

        console.log(`  Thumbnail: ${formatBytes(result.thumbnailSize)} (${CONFIG.thumbnailDimension}x${CONFIG.thumbnailDimension})`);
      }
    }

    results.push(result);
    totalOriginalSize += originalSize;
    totalOptimizedSize += result.optimizedSize;

    console.log('');
  } catch (error) {
    log.error(`Failed to optimize ${imagePath}: ${(error as Error).message}`);
  }
}

// Process all images
async function processImages(): Promise<void> {
  log.header('Image Optimization Script');

  if (!existsSync(CONFIG.assetsDir)) {
    log.error(`Assets directory not found: ${CONFIG.assetsDir}`);
    process.exit(1);
  }

  log.info(`Scanning directory: ${relative(process.cwd(), CONFIG.assetsDir)}`);

  const images = findImages(CONFIG.assetsDir);

  if (images.length === 0) {
    log.warning('No images found to optimize.');
    process.exit(0);
  }

  log.info(`Found ${images.length} image(s) to process.\n`);

  // Process images sequentially to avoid memory issues
  for (const image of images) {
    await optimizeImage(image);
  }

  // Print summary
  printSummary();
}

// Print optimization summary
function printSummary(): void {
  log.header('Optimization Summary');

  console.log(`${colors.bright}Images Processed:${colors.reset} ${results.length}`);
  console.log(
    `${colors.bright}Total Original Size:${colors.reset} ${formatBytes(totalOriginalSize)}`
  );
  console.log(
    `${colors.bright}Total Optimized Size:${colors.reset} ${formatBytes(totalOptimizedSize)}`
  );

  const saved = totalOriginalSize - totalOptimizedSize;
  const percentage = calculateSaved(totalOriginalSize, totalOptimizedSize);

  if (saved > 0) {
    console.log(
      `${colors.green}${colors.bright}Total Saved:${colors.reset} ${formatBytes(saved)} (${percentage.toFixed(1)}%)`
    );
  } else {
    console.log(`${colors.yellow}No space saved from optimization${colors.reset}`);
  }

  if (CONFIG.generateWebP && totalWebPSaved > 0) {
    console.log(
      `${colors.bright}WebP Savings:${colors.reset} ${formatBytes(totalWebPSaved)} (${calculateSaved(totalOriginalSize, totalWebPSaved).toFixed(1)}%)`
    );
  }

  // Top space savers
  const topSavers = [...results]
    .sort((a, b) => b.originalSize - b.optimizedSize - (a.originalSize - a.optimizedSize))
    .slice(0, 5);

  if (topSavers.length > 0 && topSavers[0].originalSize - topSavers[0].optimizedSize > 0) {
    console.log(`\n${colors.bright}Top Space Savers:${colors.reset}`);
    topSavers.forEach((result, index) => {
      const saved = result.originalSize - result.optimizedSize;
      if (saved > 0) {
        console.log(
          `  ${index + 1}. ${result.path}: ${colors.green}-${calculateSaved(result.originalSize, result.optimizedSize).toFixed(1)}%${colors.reset}`
        );
      }
    });
  }

  console.log('');
  log.success('Image optimization complete!');
}

// Parse command line arguments
function parseArgs(): void {
  const args = process.argv.slice(2);

  for (const arg of args) {
    if (arg === '--no-webp') {
      CONFIG.generateWebP = false;
    } else if (arg === '--no-thumbnails') {
      CONFIG.generateThumbnails = false;
    } else if (arg === '--skip-existing-webp') {
      CONFIG.skipExistingWebP = true;
    } else if (arg.startsWith('--quality=')) {
      const quality = parseInt(arg.split('=')[1], 10);
      if (!isNaN(quality) && quality >= 1 && quality <= 100) {
        CONFIG.quality.jpg = quality;
        CONFIG.quality.webp = quality;
      }
    } else if (arg === '--help') {
      console.log(`
Image Optimization Script

Usage: npm run optimize-images [options]

Options:
  --no-webp              Skip WebP generation
  --no-thumbnails        Skip thumbnail generation
  --skip-existing-webp   Skip existing WebP files
  --quality=<1-100>      Set JPEG/WebP quality (default: 85)
  --help                 Show this help message

Examples:
  npm run optimize-images
  npm run optimize-images -- --no-webp
  npm run optimize-images -- --quality=90
      `);
      process.exit(0);
    }
  }
}

// Main execution
async function main() {
  parseArgs();

  // Check if sharp is installed
  try {
    sharp.cache(false); // Disable cache for memory efficiency
  } catch {
    log.error('Sharp is not installed. Please run: npm install sharp');
    process.exit(1);
  }

  await processImages();
}

main().catch((error) => {
  log.error(`Script failed: ${error.message}`);
  process.exit(1);
});
