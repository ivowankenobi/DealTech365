#!/usr/bin/env node

/**
 * Auto Scrape and Update Script
 *
 * Este script automatiza:
 * 1. Ejecutar el scraper de Amazon
 * 2. Actualizar deals-real-v2.js con los nuevos datos
 * 3. Hacer commit y push a GitHub
 * 4. Opcional: Subir a Banahosting vía FTP
 *
 * Uso: node auto-scrape-and-update.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuración
const CONFIG = {
  projectRoot: path.resolve(__dirname, '../..'),
  scraperPath: path.join(__dirname, '../scraper/amazon-scraper-improved.js'),
  dataDir: path.join(__dirname, '../data'),
  jsDir: path.join(__dirname, '../../js'),
  outputFile: 'deals-real-v2.js',
  logFile: path.join(__dirname, '../logs/auto-update.log'),
  maxRetries: 3,
  retryDelay: 5000 // 5 segundos
};

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Función para logging
function log(message, level = 'info') {
  const timestamp = new Date().toISOString();
  const colorMap = {
    info: colors.cyan,
    success: colors.green,
    error: colors.red,
    warning: colors.yellow
  };

  const color = colorMap[level] || colors.reset;
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

  console.log(`${color}${logMessage}${colors.reset}`);

  // Guardar en archivo de log
  const logDir = path.dirname(CONFIG.logFile);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  fs.appendFileSync(CONFIG.logFile, logMessage + '\n');
}

// Función para ejecutar comandos con reintentos
function executeWithRetry(command, description, retries = CONFIG.maxRetries) {
  for (let i = 0; i < retries; i++) {
    try {
      log(`${description} (intento ${i + 1}/${retries})...`, 'info');
      const output = execSync(command, {
        cwd: CONFIG.projectRoot,
        encoding: 'utf8',
        stdio: 'pipe'
      });
      log(`✅ ${description} - Exitoso`, 'success');
      return output;
    } catch (error) {
      log(`❌ ${description} - Error: ${error.message}`, 'error');
      if (i < retries - 1) {
        log(`Reintentando en ${CONFIG.retryDelay/1000} segundos...`, 'warning');
        execSync(`timeout /t ${CONFIG.retryDelay/1000} /nobreak`, { stdio: 'ignore' });
      } else {
        throw error;
      }
    }
  }
}

// Paso 1: Ejecutar el scraper
async function runScraper() {
  log('🚀 PASO 1: Ejecutando scraper de Amazon...', 'info');

  try {
    const output = executeWithRetry(
      `node "${CONFIG.scraperPath}"`,
      'Scraper de Amazon'
    );

    // Extraer información del output
    const productsMatch = output.match(/Total de productos scrapeados: (\d+)/);
    const productsCount = productsMatch ? productsMatch[1] : 'desconocido';

    log(`✅ Scraper completado: ${productsCount} productos`, 'success');
    return true;
  } catch (error) {
    log(`❌ Error ejecutando scraper: ${error.message}`, 'error');
    return false;
  }
}

// Paso 2: Encontrar el archivo JSON más reciente
function findLatestJsonFile() {
  log('📁 PASO 2: Buscando archivo JSON más reciente...', 'info');

  const files = fs.readdirSync(CONFIG.dataDir)
    .filter(f => f.startsWith('deals-ES-') && f.endsWith('.json'))
    .map(f => ({
      name: f,
      path: path.join(CONFIG.dataDir, f),
      time: fs.statSync(path.join(CONFIG.dataDir, f)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time);

  if (files.length === 0) {
    throw new Error('No se encontraron archivos JSON de datos');
  }

  log(`✅ Archivo más reciente: ${files[0].name}`, 'success');
  return files[0];
}

// Paso 3: Generar deals-real-v2.js desde JSON
function generateDealsFile(jsonFile) {
  log('🔄 PASO 3: Generando deals-real-v2.js...', 'info');

  try {
    // Leer el JSON
    const jsonData = JSON.parse(fs.readFileSync(jsonFile.path, 'utf8'));
    const { deals, metadata } = jsonData;

    log(`Procesando ${deals.length} productos...`, 'info');

    // Agrupar deals por categoría
    const categorizedDeals = {
      audio: [],
      smartphones: [],
      gaming: [],
      laptops: []
    };

    deals.forEach(deal => {
      if (categorizedDeals[deal.category]) {
        categorizedDeals[deal.category].push(deal);
      }
    });

    // Generar el contenido del archivo JavaScript
    const jsContent = generateJavaScriptContent(categorizedDeals, metadata);

    // Escribir el archivo
    const outputPath = path.join(CONFIG.jsDir, CONFIG.outputFile);
    fs.writeFileSync(outputPath, jsContent, 'utf8');

    log(`✅ Archivo generado: ${CONFIG.outputFile}`, 'success');
    log(`   - Audio: ${categorizedDeals.audio.length} productos`, 'info');
    log(`   - Smartphones: ${categorizedDeals.smartphones.length} productos`, 'info');
    log(`   - Gaming: ${categorizedDeals.gaming.length} productos`, 'info');
    log(`   - Laptops: ${categorizedDeals.laptops.length} productos`, 'info');

    return outputPath;
  } catch (error) {
    log(`❌ Error generando archivo: ${error.message}`, 'error');
    throw error;
  }
}

// Función auxiliar para generar el contenido JavaScript
function generateJavaScriptContent(categorizedDeals, metadata) {
  const header = `// Real Products - Amazon Affiliate Links
// Auto-generated from scraper on ${metadata.scrapedAt}
// Last update: ${new Date().toLocaleString('es-ES')}
// Total products: ${metadata.totalProducts}
// Region: ${metadata.region}

`;

  const categoryObjects = Object.entries(categorizedDeals).map(([category, products]) => {
    const categoryName = {
      audio: 'Audio',
      smartphones: 'Smartphones',
      gaming: 'Gaming',
      laptops: 'Laptops'
    }[category];

    const categoryIcon = {
      audio: '🎧',
      smartphones: '📱',
      gaming: '🎮',
      laptops: '💻'
    }[category];

    const productsArray = products.map(deal => `      {
        name: '${deal.name.replace(/'/g, "\\'")}',
        brand: '${deal.brand}',
        basePrice: ${deal.basePrice},
        discount: ${deal.discount},
        image: '${deal.image}',
        asin: '${deal.asin}',
        specs: {},
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/${deal.asin}?tag=blackfridaytech-20'
          },
          EU: {
            amazon: '${deal.affiliateLinks.EU.amazon}'
          }
        }
      }`).join(',\n');

    return `  ${category}: {
    name: '${categoryName}',
    icon: '${categoryIcon}',
    products: [
${productsArray}
    ]
  }`;
  }).join(',\n');

  const dealsConstruction = `const DEAL_CATEGORIES = {
${categoryObjects}
};

// Build allDeals array
window.allDeals = [];
Object.keys(DEAL_CATEGORIES).forEach(category => {
  DEAL_CATEGORIES[category].products.forEach(product => {
    window.allDeals.push({
      ...product,
      category: category,
      currencySymbol: '€',
      finalPrice: product.basePrice * (1 - product.discount / 100),
      affiliateLink: product.affiliateLinks.EU.amazon
    });
  });
});

console.log(\`✅ Loaded \${window.allDeals.length} deals from ${metadata.scrapedAt}\`);
`;

  // Agregar función displayDeals
  const displayFunction = `
// Display deals function
function displayDeals(dealsToShow = null) {
  const container = document.getElementById('dealsGrid');
  if (!container) return;

  const deals = dealsToShow || window.allDeals;

  if (!deals || deals.length === 0) {
    container.innerHTML = '<p style="text-align:center;padding:40px;color:#666;">No se encontraron productos.</p>';
    return;
  }

  container.innerHTML = deals.map(deal => \`
    <div class="deal-card" data-category="\${deal.category}" data-brand="\${deal.brand.toLowerCase()}">
      <div class="deal-image" style="background-image: url('\${deal.image}')">
        <div class="deal-badge">\${deal.discount}% OFF</div>
      </div>
      <div class="deal-content">
        <div class="deal-header">
          <h3 class="deal-title">\${deal.name}</h3>
          <div class="deal-store-badge" data-store="amazon">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" style="height: 14px; width: auto; vertical-align: middle;">
          </div>
        </div>

        <div class="deal-content-main">
          <p class="deal-brand">\${deal.brand}</p>

          <div class="deal-specs">
            \${deal.specs && Object.keys(deal.specs).length > 0 ? Object.entries(deal.specs).map(([key, value]) =>
    \`<span class="spec-item"><strong>\${key}:</strong> \${value}</span>\`
  ).join('') : ''}
          </div>
        </div>

        <div class="deal-price">
          <span class="deal-price-current">\${deal.currencySymbol}\${deal.finalPrice.toFixed(2)}</span>
          <span class="deal-price-original">\${deal.currencySymbol}\${deal.basePrice.toFixed(2)}</span>
        </div>

        <div class="deal-actions">
          <a href="\${deal.affiliateLink}"
             target="_blank"
             rel="noopener noreferrer"
             class="deal-btn-premium"
             data-asin="\${deal.asin}"
             data-product-name="\${deal.name.replace(/"/g, '&quot;')}"
             data-product-category="\${deal.category}"
             data-product-brand="\${deal.brand}"
             data-product-price="\${deal.finalPrice.toFixed(2)}"
             data-product-discount="\${deal.discount}">
            Ver oferta
          </a>
          <button class="deal-btn-favorite" onclick="toggleFavorite('\${deal.asin}')" aria-label="Add to favorites">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  \`).join('');
}

// Favorites functionality
function toggleFavorite(asin) {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const index = favorites.indexOf(asin);

  if (index === -1) {
    favorites.push(asin);
  } else {
    favorites.splice(index, 1);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoriteButtons();
}

function updateFavoriteButtons() {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  document.querySelectorAll('.deal-btn-favorite').forEach(btn => {
    const card = btn.closest('.deal-card');
    const asin = btn.onclick.toString().match(/'([^']+)'/)[1];

    if (favorites.includes(asin)) {
      btn.classList.add('active');
      btn.querySelector('svg').setAttribute('fill', 'currentColor');
    } else {
      btn.classList.remove('active');
      btn.querySelector('svg').setAttribute('fill', 'none');
    }
  });
}

// Initialize on page load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    displayDeals();
    updateFavoriteButtons();
  });
}
`;

  return header + dealsConstruction + displayFunction;
}

// Paso 4: Commit y push a GitHub
function commitAndPush() {
  log('📤 PASO 4: Haciendo commit y push a GitHub...', 'info');

  try {
    // Verificar si hay cambios
    const status = execSync('git status --porcelain', {
      cwd: CONFIG.projectRoot,
      encoding: 'utf8'
    });

    if (!status.trim()) {
      log('ℹ️  No hay cambios para commitear', 'info');
      return false;
    }

    // Add
    executeWithRetry(
      `git add "${path.join(CONFIG.jsDir, CONFIG.outputFile)}"`,
      'Git add',
      1
    );

    // Commit
    const commitMessage = `Auto-update deals from scraper - ${new Date().toISOString()}

- Updated deals-real-v2.js with fresh Amazon data
- Auto-generated by automation script

🤖 Generated with [Claude Code](https://claude.com/claude-code)`;

    executeWithRetry(
      `git commit -m "${commitMessage}"`,
      'Git commit',
      1
    );

    // Push
    executeWithRetry(
      'git push',
      'Git push'
    );

    log('✅ Cambios subidos a GitHub exitosamente', 'success');
    return true;
  } catch (error) {
    log(`❌ Error en git operations: ${error.message}`, 'error');
    return false;
  }
}

// Función principal
async function main() {
  const startTime = Date.now();

  log('═══════════════════════════════════════════════════', 'info');
  log('🚀 INICIANDO AUTOMATIZACIÓN DE SCRAPER', 'info');
  log('═══════════════════════════════════════════════════', 'info');

  try {
    // Paso 1: Ejecutar scraper
    const scraperSuccess = await runScraper();
    if (!scraperSuccess) {
      throw new Error('Scraper falló después de múltiples intentos');
    }

    // Paso 2: Encontrar JSON más reciente
    const jsonFile = findLatestJsonFile();

    // Paso 3: Generar deals-real-v2.js
    generateDealsFile(jsonFile);

    // Paso 4: Commit y push
    commitAndPush();

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    log('═══════════════════════════════════════════════════', 'success');
    log(`✅ AUTOMATIZACIÓN COMPLETADA EN ${duration}s`, 'success');
    log('═══════════════════════════════════════════════════', 'success');

    process.exit(0);
  } catch (error) {
    log('═══════════════════════════════════════════════════', 'error');
    log(`❌ AUTOMATIZACIÓN FALLÓ: ${error.message}`, 'error');
    log('═══════════════════════════════════════════════════', 'error');

    process.exit(1);
  }
}

// Ejecutar
if (require.main === module) {
  main();
}

module.exports = { main };
