#!/usr/bin/env node

/**
 * DealTech365 - Verification Script
 * Checks if all files are ready for deployment
 */

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

// Verification checks
const checks = {
  critical: [],
  warnings: [],
  info: []
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function header(title) {
  log(`\n${'═'.repeat(60)}`, 'cyan');
  log(`  ${title}`, 'bold');
  log('═'.repeat(60), 'cyan');
}

function checkFile(filepath, description, required = true) {
  const exists = fs.existsSync(filepath);
  if (exists) {
    log(`✅ ${description}`, 'green');
    return true;
  } else {
    if (required) {
      log(`❌ ${description} - MISSING`, 'red');
      checks.critical.push(description);
    } else {
      log(`⚠️  ${description} - Recomendado`, 'yellow');
      checks.warnings.push(description);
    }
    return false;
  }
}

function checkMinifiedFiles() {
  header('1. ARCHIVOS MINIFICADOS');

  checkFile('css/styles.min.css', 'CSS minificado');
  checkFile('js/region.min.js', 'region.js minificado');
  checkFile('js/cookie-consent.min.js', 'cookie-consent.js minificado');
  checkFile('js/analytics.min.js', 'analytics.js minificado');
  checkFile('js/deals.min.js', 'deals.js minificado');
}

function checkProductionFile() {
  header('2. ARCHIVO DE PRODUCCIÓN');

  if (checkFile('index.production.html', 'index.production.html')) {
    log('   📝 Recuerda renombrarlo a "index.html" al subir', 'cyan');
  }
}

function checkSEOFiles() {
  header('3. ARCHIVOS SEO');

  checkFile('sitemap.xml', 'Sitemap');
  checkFile('robots.txt', 'Robots.txt');
  checkFile('manifest.json', 'PWA Manifest');

  // Check sitemap content
  if (fs.existsSync('sitemap.xml')) {
    const content = fs.readFileSync('sitemap.xml', 'utf8');
    if (content.includes('dealtech365.com')) {
      log('   ✅ Sitemap tiene dominio correcto (dealtech365.com)', 'green');
    } else {
      log('   ❌ Sitemap NO tiene dominio dealtech365.com', 'red');
      checks.critical.push('Actualizar URLs en sitemap.xml');
    }
  }
}

function checkCriticalImages() {
  header('4. ICONOS PWA CRÍTICOS');

  const criticalIcons = [
    { path: 'images/icon-192x192.png', desc: 'PWA Icon 192x192' },
    { path: 'images/icon-512x512.png', desc: 'PWA Icon 512x512' }
  ];

  criticalIcons.forEach(icon => {
    checkFile(icon.path, icon.desc, true);
  });
}

function checkRecommendedImages() {
  header('5. IMÁGENES RECOMENDADAS');

  const recommendedImages = [
    { path: 'images/favicon-16x16.png', desc: 'Favicon 16x16' },
    { path: 'images/favicon-32x32.png', desc: 'Favicon 32x32' },
    { path: 'images/apple-touch-icon.png', desc: 'Apple Touch Icon' },
    { path: 'images/og-image.png', desc: 'Open Graph Image' },
    { path: 'favicon.ico', desc: 'Favicon.ico (raíz)' }
  ];

  recommendedImages.forEach(img => {
    checkFile(img.path, img.desc, false);
  });
}

function checkPages() {
  header('6. PÁGINAS HTML');

  const pages = [
    'pages/favorites.html',
    'pages/notifications.html',
    'pages/contact.html',
    'pages/privacy-policy.html',
    'pages/terms.html',
    'pages/affiliate-disclosure.html'
  ];

  pages.forEach(page => {
    checkFile(page, path.basename(page));
  });
}

function checkBlogPosts() {
  header('7. BLOG POSTS');

  const posts = [
    'blog/laptops-black-friday-2025.html',
    'blog/gadgets-imprescindibles-2025.html',
    'blog/auriculares-premium-descuento.html',
    'blog/smartphones-cual-comprar.html',
    'blog/top-accesorios-gaming.html',
    'blog/consejos-black-friday.html'
  ];

  posts.forEach(post => {
    checkFile(post, path.basename(post));
  });
}

function checkAnalyticsConfig() {
  header('8. CONFIGURACIÓN DE ANALYTICS');

  if (fs.existsSync('js/analytics.min.js')) {
    const content = fs.readFileSync('js/analytics.min.js', 'utf8');

    if (content.includes('G-XXXXXXXXXX')) {
      log('⚠️  Google Analytics - ID NO configurado', 'yellow');
      log('   📝 Edita js/analytics.js línea 10 y ejecuta npm run build', 'cyan');
      checks.warnings.push('Configurar Google Analytics Measurement ID');
    } else if (content.includes('G-')) {
      log('✅ Google Analytics - ID configurado', 'green');
    } else {
      log('⚠️  Google Analytics - No detectado', 'yellow');
    }
  }
}

function checkHostingConfig() {
  header('9. CONFIGURACIONES DE HOSTING');

  checkFile('.htaccess', '.htaccess (Apache/cPanel)', false);
  checkFile('netlify.toml', 'netlify.toml (Netlify)', false);
  checkFile('vercel.json', 'vercel.json (Vercel)', false);
  checkFile('_redirects', '_redirects (Netlify)', false);
  checkFile('_headers', '_headers (Netlify)', false);

  log('\n   💡 Usa el archivo apropiado según tu hosting:', 'cyan');
  log('      - Apache/cPanel: .htaccess', 'cyan');
  log('      - Netlify: netlify.toml, _redirects, _headers', 'cyan');
  log('      - Vercel: vercel.json', 'cyan');
}

function checkFileSizes() {
  header('10. TAMAÑOS DE ARCHIVOS');

  const filesToCheck = [
    'css/styles.min.css',
    'js/deals.min.js',
    'js/cookie-consent.min.js',
    'js/analytics.min.js',
    'js/region.min.js'
  ];

  filesToCheck.forEach(file => {
    if (fs.existsSync(file)) {
      const stats = fs.statSync(file);
      const sizeKB = (stats.size / 1024).toFixed(2);
      log(`   📦 ${path.basename(file)}: ${sizeKB} KB`, 'cyan');
    }
  });
}

function generateReport() {
  header('📊 RESUMEN FINAL');

  if (checks.critical.length === 0 && checks.warnings.length === 0) {
    log('\n🎉 ¡TODO LISTO PARA DEPLOYMENT!', 'green');
    log('\nPróximos pasos:', 'cyan');
    log('1. Abre generate-icons.html si no has generado los iconos', 'cyan');
    log('2. Lee DEPLOYMENT-DEALTECH365.md para instrucciones', 'cyan');
    log('3. Revisa FILES-TO-UPLOAD.txt para la lista de archivos', 'cyan');
    log('4. Sube los archivos a tu hosting', 'cyan');
    log('5. Renombra index.production.html → index.html', 'cyan');
  } else {
    if (checks.critical.length > 0) {
      log(`\n❌ ${checks.critical.length} PROBLEMAS CRÍTICOS:`, 'red');
      checks.critical.forEach(item => {
        log(`   • ${item}`, 'red');
      });
    }

    if (checks.warnings.length > 0) {
      log(`\n⚠️  ${checks.warnings.length} ADVERTENCIAS:`, 'yellow');
      checks.warnings.forEach(item => {
        log(`   • ${item}`, 'yellow');
      });
    }

    if (checks.critical.length > 0) {
      log('\n⚠️  Corrige los problemas críticos antes de deployment', 'red');
    } else {
      log('\n✅ No hay problemas críticos, pero revisa las advertencias', 'green');
    }
  }

  log('\n' + '═'.repeat(60), 'cyan');
}

// Run all checks
function runVerification() {
  log('\n🔍 VERIFICACIÓN DE DEPLOYMENT - DealTech365', 'bold');
  log('Versión: 1.0.0', 'cyan');
  log('Dominio: dealtech365.com', 'cyan');

  checkMinifiedFiles();
  checkProductionFile();
  checkSEOFiles();
  checkCriticalImages();
  checkRecommendedImages();
  checkPages();
  checkBlogPosts();
  checkAnalyticsConfig();
  checkHostingConfig();
  checkFileSizes();
  generateReport();

  // Exit with appropriate code
  process.exit(checks.critical.length > 0 ? 1 : 0);
}

// Run verification
runVerification();
