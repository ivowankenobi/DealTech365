#!/usr/bin/env node

/**
 * Prepare DealTech365 for Deployment
 * Creates a clean deployment folder with only necessary files
 */

const fs = require('fs');
const path = require('path');

const DEPLOY_FOLDER = 'deploy-ready';
const PRIMARY_COLOR = '\x1b[32m';
const WARNING_COLOR = '\x1b[33m';
const INFO_COLOR = '\x1b[36m';
const RESET_COLOR = '\x1b[0m';
const BOLD = '\x1b[1m';

console.log(`\n${BOLD}📦 PREPARANDO DEPLOYMENT - DealTech365${RESET_COLOR}\n`);
console.log(`${INFO_COLOR}${'═'.repeat(60)}${RESET_COLOR}\n`);

// Files and folders to copy
const deploymentStructure = {
  // Root files
  root: [
    'index.production.html', // Will be renamed to index.html
    'index.html',            // Copia también el index.html de desarrollo
    'deals.json',            // Archivo de ofertas dinámicas
    'sitemap.xml',
    'robots.txt',
    'manifest.json',
    '.htaccess',
    'favicon.ico'
  ],
  // Directories to copy entirely
  directories: [
    { src: 'css', dest: 'css', files: ['styles.min.css'] },
    { src: 'js', dest: 'js', files: ['i18n.min.js', 'language-switcher.min.js', 'deals.min.js', 'blog-carousel.min.js', 'region.min.js', 'cookie-consent.min.js', 'analytics.min.js'] },
    { src: 'images', dest: 'images', files: '*' }, // All images
    { src: 'pages', dest: 'pages', files: '*' }, // All pages
    { src: 'blog', dest: 'blog', files: '*' } // All blog posts
  ]
};

function log(message, color = INFO_COLOR) {
  console.log(`${color}${message}${RESET_COLOR}`);
}

function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  createDirectory(destDir);
  fs.copyFileSync(src, dest);
}

function copyDirectory(srcDir, destDir, files = '*') {
  createDirectory(destDir);

  if (!fs.existsSync(srcDir)) {
    log(`   ⚠️  ${srcDir} no encontrado, saltando...`, WARNING_COLOR);
    return 0;
  }

  const items = fs.readdirSync(srcDir);
  let count = 0;

  items.forEach(item => {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);
    const stat = fs.statSync(srcPath);

    if (stat.isFile()) {
      if (files === '*' || files.includes(item)) {
        copyFile(srcPath, destPath);
        count++;
      }
    } else if (stat.isDirectory() && files === '*') {
      // Recursively copy subdirectories
      const subCount = copyDirectory(srcPath, destPath, '*');
      count += subCount;
    }
  });

  return count;
}

function prepareDeployment() {
  try {
    // Remove old deployment folder if exists
    if (fs.existsSync(DEPLOY_FOLDER)) {
      log('🗑️  Eliminando carpeta de deployment anterior...\n');
      fs.rmSync(DEPLOY_FOLDER, { recursive: true, force: true });
    }

    // Create deployment folder
    log('📁 Creando carpeta de deployment...\n', PRIMARY_COLOR);
    createDirectory(DEPLOY_FOLDER);

    // Copy root files
    log('📄 Copiando archivos raíz...', BOLD);
    let rootCount = 0;
    deploymentStructure.root.forEach(file => {
      if (fs.existsSync(file)) {
        if (file === 'index.production.html') {
          // Rename to index.html in deployment folder
          copyFile(file, path.join(DEPLOY_FOLDER, 'index.html'));
          log(`   ✅ ${file} → index.html`, PRIMARY_COLOR);
        } else {
          copyFile(file, path.join(DEPLOY_FOLDER, file));
          log(`   ✅ ${file}`, PRIMARY_COLOR);
        }
        rootCount++;
      } else {
        log(`   ⚠️  ${file} no encontrado`, WARNING_COLOR);
      }
    });
    log(`   📊 ${rootCount} archivos copiados\n`);

    // Copy directories
    log('📂 Copiando directorios...', BOLD);
    deploymentStructure.directories.forEach(dir => {
      log(`\n   📁 ${dir.dest}/`);
      const count = copyDirectory(dir.src, path.join(DEPLOY_FOLDER, dir.dest), dir.files);
      log(`      ✅ ${count} archivos copiados`, PRIMARY_COLOR);
    });

    // Calculate total size
    log(`\n${INFO_COLOR}${'═'.repeat(60)}${RESET_COLOR}`);
    log(`${BOLD}📊 ESTADÍSTICAS${RESET_COLOR}\n`);

    function getDirSize(dirPath) {
      let size = 0;
      const items = fs.readdirSync(dirPath);
      items.forEach(item => {
        const itemPath = path.join(dirPath, item);
        const stat = fs.statSync(itemPath);
        if (stat.isFile()) {
          size += stat.size;
        } else if (stat.isDirectory()) {
          size += getDirSize(itemPath);
        }
      });
      return size;
    }

    const totalSize = getDirSize(DEPLOY_FOLDER);
    const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);

    log(`   📦 Tamaño total: ${totalSizeMB} MB`);
    log(`   📁 Ubicación: /${DEPLOY_FOLDER}/\n`);

    log(`${INFO_COLOR}${'═'.repeat(60)}${RESET_COLOR}`);
    log(`${PRIMARY_COLOR}${BOLD}🎉 ¡DEPLOYMENT PREPARADO!${RESET_COLOR}\n`);

    log(`${BOLD}📋 SIGUIENTE PASO:${RESET_COLOR}\n`);
    log(`   1. Abre la carpeta "${DEPLOY_FOLDER}/" en tu explorador de archivos`);
    log(`   2. Accede a cPanel de Bana Hosting`);
    log(`   3. File Manager → public_html`);
    log(`   4. Selecciona TODOS los archivos de "${DEPLOY_FOLDER}/"`);
    log(`   5. Sube todo a public_html (arrastra y suelta)`);
    log(`   6. Activa SSL en cPanel (AutoSSL)\n`);

    log(`${INFO_COLOR}💡 NOTA: index.production.html ya fue renombrado a index.html${RESET_COLOR}\n`);
    log(`${INFO_COLOR}📖 Guía completa: DEPLOYMENT-BANA-HOSTING.md${RESET_COLOR}\n`);

  } catch (error) {
    console.error(`\n${WARNING_COLOR}❌ Error:${RESET_COLOR}`, error.message, '\n');
    process.exit(1);
  }
}

// Run preparation
prepareDeployment();
