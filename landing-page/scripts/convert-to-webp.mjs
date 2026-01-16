import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '../public/before&after');
const outputDir = path.join(__dirname, '../public/before-after');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all PNG files
const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.png'));

async function convertImages() {
  for (const file of files) {
    const inputPath = path.join(sourceDir, file);
    // Convert filename: "LEVEL 1 BEFORE 1.png" -> "level1-before-1.webp"
    const outputName = file
      .toLowerCase()
      .replace('.png', '.webp')
      .replace(/\s+/g, '-')
      .replace('level-', 'level');

    const outputPath = path.join(outputDir, outputName);

    try {
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      console.log(`Converted: ${file} -> ${outputName}`);
    } catch (error) {
      console.error(`Error converting ${file}:`, error);
    }
  }
  console.log('\nAll images converted successfully!');
}

convertImages();
