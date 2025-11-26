/**
 * Script para actualizar TODOS los affiliate links en deals.js
 * Ejecutar después de obtener los IDs de afiliados
 *
 * Uso:
 * 1. Actualiza AFFILIATE_IDS en affiliate-link-generator.js
 * 2. Ejecuta: node update-all-affiliate-links.js
 * 3. Revisa el backup en js/deals.backup.js
 * 4. Si todo está bien: npm run build && npm run deploy:prepare
 */

const fs = require('fs');
const path = require('path');
const {
  generateMediaMarktLink,
  generatePcComponentesLink,
  generateFnacLink,
  generateGameLink,
  checkConfiguration,
  AFFILIATE_IDS
} = require('./js/affiliate-link-generator.js');

// Rutas de archivos
const DEALS_PATH = path.join(__dirname, 'js', 'deals.js');
const BACKUP_PATH = path.join(__dirname, 'js', 'deals.backup.js');

/**
 * Actualiza un link de tienda si está presente
 * @param {object} links - Objeto con links de tiendas
 * @param {string} store - Nombre de la tienda
 * @param {function} generator - Función generadora de affiliate link
 */
function updateStoreLink(links, store, generator) {
  if (links[store]) {
    const originalURL = links[store];
    const affiliateURL = generator(originalURL);

    // Solo actualizar si el link cambió (si el generador añadió parámetros)
    if (affiliateURL !== originalURL) {
      links[store] = affiliateURL;
      return true;
    }
  }
  return false;
}

/**
 * Procesa el archivo deals.js y actualiza los affiliate links
 */
function updateAffiliateLinks() {
  console.log('\n🚀 Iniciando actualización de affiliate links...\n');

  // 1. Verificar configuración
  const config = checkConfiguration();

  if (!config.awin && !config.tradetracker && !config.tradedoubler) {
    console.error('\n❌ ERROR: Ningún ID de afiliado está configurado.');
    console.error('   Por favor actualiza AFFILIATE_IDS en affiliate-link-generator.js\n');
    process.exit(1);
  }

  // 2. Crear backup
  console.log('📋 Creando backup de deals.js...');
  try {
    fs.copyFileSync(DEALS_PATH, BACKUP_PATH);
    console.log(`✅ Backup creado: ${BACKUP_PATH}\n`);
  } catch (error) {
    console.error('❌ Error creando backup:', error.message);
    process.exit(1);
  }

  // 3. Leer deals.js
  console.log('📖 Leyendo deals.js...');
  let dealsContent;
  try {
    dealsContent = fs.readFileSync(DEALS_PATH, 'utf8');
  } catch (error) {
    console.error('❌ Error leyendo deals.js:', error.message);
    process.exit(1);
  }

  // 4. Evaluar el objeto deals (extraer el objeto JavaScript)
  let deals;
  try {
    // Extraer solo la definición del objeto deals
    const dealsMatch = dealsContent.match(/const deals = (\{[\s\S]*?\});/);
    if (!dealsMatch) {
      throw new Error('No se pudo encontrar el objeto deals en el archivo');
    }
    deals = eval(`(${dealsMatch[1]})`);
  } catch (error) {
    console.error('❌ Error parseando deals.js:', error.message);
    console.error('   El archivo podría tener errores de sintaxis.');
    process.exit(1);
  }

  // 5. Actualizar links
  console.log('🔄 Actualizando affiliate links...\n');

  let stats = {
    totalProducts: 0,
    mediamarkt: 0,
    pccomponentes: 0,
    fnac: 0,
    game: 0
  };

  // Iterar sobre todas las categorías
  for (const category in deals) {
    const products = deals[category].products || [];

    products.forEach(product => {
      stats.totalProducts++;

      // Solo actualizar links EU (España)
      if (product.affiliateLinks && product.affiliateLinks.EU) {
        const euLinks = product.affiliateLinks.EU;

        // MediaMarkt
        if (config.awin && updateStoreLink(euLinks, 'mediamarkt', generateMediaMarktLink)) {
          stats.mediamarkt++;
          console.log(`✅ ${product.name}: MediaMarkt → Affiliate link generado`);
        }

        // PcComponentes
        if (config.tradetracker && updateStoreLink(euLinks, 'pccomponentes', generatePcComponentesLink)) {
          stats.pccomponentes++;
          console.log(`✅ ${product.name}: PcComponentes → Affiliate link generado`);
        }

        // FNAC
        if (config.awin && updateStoreLink(euLinks, 'fnac', generateFnacLink)) {
          stats.fnac++;
          console.log(`✅ ${product.name}: FNAC → Affiliate link generado`);
        }

        // Game
        if (config.tradedoubler && updateStoreLink(euLinks, 'game', generateGameLink)) {
          stats.game++;
          console.log(`✅ ${product.name}: Game → Affiliate link generado`);
        }
      }
    });
  }

  // 6. Escribir el archivo actualizado
  console.log('\n💾 Guardando cambios...');

  try {
    // Convertir el objeto deals de vuelta a string
    const updatedDealsStr = `const deals = ${JSON.stringify(deals, null, 2)};`;

    // Reemplazar la definición del objeto en el contenido original
    const updatedContent = dealsContent.replace(
      /const deals = \{[\s\S]*?\};/,
      updatedDealsStr
    );

    fs.writeFileSync(DEALS_PATH, updatedContent, 'utf8');
    console.log('✅ Archivo deals.js actualizado correctamente\n');
  } catch (error) {
    console.error('❌ Error escribiendo deals.js:', error.message);
    console.error('   Restaurando backup...');
    fs.copyFileSync(BACKUP_PATH, DEALS_PATH);
    console.error('   Backup restaurado.\n');
    process.exit(1);
  }

  // 7. Mostrar estadísticas
  console.log('📊 Resumen de Actualización:\n');
  console.log(`Total de productos procesados: ${stats.totalProducts}`);
  console.log(`MediaMarkt links actualizados:  ${stats.mediamarkt}`);
  console.log(`PcComponentes links actualizados: ${stats.pccomponentes}`);
  console.log(`FNAC links actualizados:        ${stats.fnac}`);
  console.log(`Game links actualizados:        ${stats.game}`);
  console.log('');

  // 8. Siguiente paso
  console.log('✨ ¡Actualización completada!\n');
  console.log('📋 Próximos pasos:');
  console.log('   1. Revisa los cambios: git diff js/deals.js');
  console.log('   2. Prueba localmente: npm start');
  console.log('   3. Build producción: npm run build');
  console.log('   4. Deploy: npm run deploy:prepare');
  console.log('   5. Sube a Bana Hosting\n');
}

// Ejecutar
if (require.main === module) {
  updateAffiliateLinks();
}

module.exports = { updateAffiliateLinks };
