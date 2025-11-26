#!/usr/bin/env node

/**
 * Generate optional images for DealTech365
 * - og-image.png (1200x630 for social media)
 * - favicon.ico (multi-size ICO file)
 */

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const PRIMARY_COLOR = '#22C55E';
const SECONDARY_COLOR = '#10B981';
const BG_COLOR = '#000000';
const TEXT_COLOR = '#FFFFFF';

console.log('\n🎨 Generando imágenes opcionales - DealTech365\n');
console.log('═══════════════════════════════════════════════════\n');

// Generate Open Graph image (1200x630)
function generateOGImage() {
  console.log('📦 Generando og-image.png (1200x630)...');

  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, 1200, 630);

  // Draw diamond icon
  ctx.beginPath();
  ctx.moveTo(200, 150);
  ctx.lineTo(340, 315);
  ctx.lineTo(200, 480);
  ctx.lineTo(60, 315);
  ctx.closePath();
  ctx.fillStyle = PRIMARY_COLOR;
  ctx.fill();
  ctx.strokeStyle = PRIMARY_COLOR;
  ctx.lineWidth = 4;
  ctx.stroke();

  // Main title
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = 'bold 84px Arial';
  ctx.fillText('DealTech365', 420, 280);

  // Subtitle
  ctx.fillStyle = PRIMARY_COLOR;
  ctx.font = '36px Arial';
  ctx.fillText('Ofertas en Tecnología Todo el Año', 420, 360);

  // Description
  ctx.fillStyle = '#CCCCCC';
  ctx.font = '28px Arial';
  ctx.fillText('Laptops • Smartphones • Audio • Gaming', 420, 420);

  // URL
  ctx.fillStyle = SECONDARY_COLOR;
  ctx.font = 'bold 32px Arial';
  ctx.fillText('dealtech365.com', 420, 500);

  // Decorative circles
  ctx.fillStyle = PRIMARY_COLOR;
  ctx.globalAlpha = 0.2;
  ctx.beginPath();
  ctx.arc(1100, 100, 40, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = SECONDARY_COLOR;
  ctx.globalAlpha = 0.15;
  ctx.beginPath();
  ctx.arc(1050, 550, 60, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = PRIMARY_COLOR;
  ctx.globalAlpha = 0.25;
  ctx.beginPath();
  ctx.arc(950, 480, 30, 0, Math.PI * 2);
  ctx.fill();

  // Save
  const buffer = canvas.toBuffer('image/png');
  const outputPath = path.join(__dirname, 'images', 'og-image.png');
  fs.writeFileSync(outputPath, buffer);

  const fileSizeKB = (buffer.length / 1024).toFixed(2);
  console.log(`   ✅ og-image.png (${fileSizeKB} KB)\n`);
}

// Generate favicon.ico by converting the 32x32 PNG
function generateFaviconICO() {
  console.log('📦 Generando favicon.ico...');

  try {
    // Read the 32x32 PNG
    const favicon32Path = path.join(__dirname, 'images', 'favicon-32x32.png');
    const favicon16Path = path.join(__dirname, 'images', 'favicon-16x16.png');

    if (fs.existsSync(favicon32Path)) {
      // For simplicity, just copy the 32x32 PNG as favicon.ico
      // Modern browsers will display it correctly
      const faviconData = fs.readFileSync(favicon32Path);
      const outputPath = path.join(__dirname, 'favicon.ico');
      fs.writeFileSync(outputPath, faviconData);

      console.log(`   ✅ favicon.ico (en raíz del proyecto)`);
      console.log(`   📝 Basado en favicon-32x32.png\n`);
    } else {
      console.log(`   ⚠️  favicon-32x32.png no encontrado\n`);
    }
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}\n`);
  }
}

// Main execution
async function generateOptionalImages() {
  try {
    generateOGImage();
    generateFaviconICO();

    console.log('═══════════════════════════════════════════════════');
    console.log('🎉 ¡IMÁGENES OPCIONALES GENERADAS!');
    console.log('═══════════════════════════════════════════════════\n');
    console.log('✅ Archivos creados:');
    console.log('   • images/og-image.png (1200x630)');
    console.log('   • favicon.ico (raíz)\n');
    console.log('📋 Siguiente paso: npm run verify\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message, '\n');
    process.exit(1);
  }
}

generateOptionalImages();
