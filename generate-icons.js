#!/usr/bin/env node

/**
 * Generate PNG icons for DealTech365
 * This script generates all required PNG icons programmatically
 */

const fs = require('fs');
const path = require('path');

// We'll use a pure Node.js approach without external dependencies
// by reading the SVG files and converting them

const PRIMARY_COLOR = '#22C55E';
const SECONDARY_COLOR = '#10B981';
const BG_COLOR = '#000000';

const icons = [
  { size: 16, filename: 'favicon-16x16.png' },
  { size: 32, filename: 'favicon-32x32.png' },
  { size: 180, filename: 'apple-touch-icon.png' },
  { size: 192, filename: 'icon-192x192.png' },
  { size: 512, filename: 'icon-512x512.png' }
];

console.log('\n🎨 Generador de Iconos PNG - DealTech365\n');
console.log('═══════════════════════════════════════════════════\n');

// Check if we have canvas package
let Canvas;
try {
  Canvas = require('canvas');
  console.log('✅ Módulo canvas detectado\n');
} catch (e) {
  console.log('⚠️  Módulo canvas no encontrado');
  console.log('📦 Instalando canvas...\n');

  const { execSync } = require('child_process');
  try {
    execSync('npm install canvas', { stdio: 'inherit' });
    Canvas = require('canvas');
    console.log('\n✅ Canvas instalado correctamente\n');
  } catch (installError) {
    console.error('\n❌ Error al instalar canvas');
    console.error('   Por favor instala manualmente: npm install canvas');
    console.error('\n💡 ALTERNATIVA: Abre auto-generate-icons.html en tu navegador\n');
    process.exit(1);
  }
}

const { createCanvas } = Canvas;

function drawIcon(canvas, size) {
  const ctx = canvas.getContext('2d');

  // Clear canvas
  ctx.clearRect(0, 0, size, size);

  // Background
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, size, size);

  // Draw diamond shape
  const center = size / 2;
  const diamondSize = size * 0.5;

  ctx.beginPath();
  ctx.moveTo(center, center - diamondSize);
  ctx.lineTo(center + diamondSize, center);
  ctx.lineTo(center, center + diamondSize);
  ctx.lineTo(center - diamondSize, center);
  ctx.closePath();

  // Gradient fill (approximated with solid color for simplicity)
  ctx.fillStyle = PRIMARY_COLOR;
  ctx.fill();

  // Add text for larger icons
  if (size >= 72) {
    ctx.fillStyle = BG_COLOR;
    ctx.font = `bold ${size * 0.25}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (size >= 144) {
      ctx.fillText('DT', center, center - size * 0.05);
      ctx.font = `${size * 0.12}px Arial`;
      ctx.fillText('365', center, center + size * 0.12);
    } else {
      ctx.fillText('DT', center, center);
    }
  }

  // Add border
  ctx.strokeStyle = PRIMARY_COLOR;
  ctx.lineWidth = Math.max(1, size / 64);
  ctx.strokeRect(0, 0, size, size);
}

async function generateIcon(iconConfig) {
  const { size, filename } = iconConfig;
  const canvas = createCanvas(size, size);

  console.log(`📦 Generando ${filename}...`);

  drawIcon(canvas, size);

  const buffer = canvas.toBuffer('image/png');
  const outputPath = path.join(__dirname, 'images', filename);

  fs.writeFileSync(outputPath, buffer);

  const fileSizeKB = (buffer.length / 1024).toFixed(2);
  console.log(`   ✅ ${filename} (${fileSizeKB} KB)`);
}

async function generateAllIcons() {
  try {
    // Ensure images directory exists
    const imagesDir = path.join(__dirname, 'images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    console.log('🚀 Iniciando generación...\n');

    for (const icon of icons) {
      await generateIcon(icon);
    }

    console.log('\n═══════════════════════════════════════════════════');
    console.log('🎉 ¡TODOS LOS ICONOS GENERADOS EXITOSAMENTE!');
    console.log('═══════════════════════════════════════════════════\n');
    console.log('📁 Ubicación: /images/\n');
    console.log('✅ Los siguientes archivos fueron creados:');
    icons.forEach(icon => {
      console.log(`   • ${icon.filename}`);
    });
    console.log('\n📋 Siguiente paso: npm run verify\n');

  } catch (error) {
    console.error('\n❌ Error generando iconos:', error.message);
    console.error('\n💡 ALTERNATIVA: Abre auto-generate-icons.html en tu navegador\n');
    process.exit(1);
  }
}

// Run the generator
generateAllIcons();
