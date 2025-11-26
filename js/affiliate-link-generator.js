/**
 * Affiliate Link Generator
 * Genera links de afiliados para MediaMarkt, PcComponentes, FNAC y Game
 *
 * Uso:
 * 1. Obtén tus IDs de los programas de afiliados
 * 2. Actualiza la configuración AFFILIATE_IDS
 * 3. Ejecuta: node update-all-affiliate-links.js
 */

const AFFILIATE_IDS = {
  // ======================================
  // AMAZON
  // ======================================
  amazonES: 'dealtech365-21',        // ✅ Ya configurado
  amazonUS: 'blackfridaytech-20',    // ⚠️ Pendiente aprobación real

  // ======================================
  // AWIN (MediaMarkt + FNAC)
  // ======================================
  // Obtener de: https://ui.awin.com/merchant-profile/account-details
  awinPublisher: 'XXXXXX',           // ❌ REEMPLAZAR con tu Publisher ID

  // IDs fijos de los advertisers
  mediamarktMID: '10206',            // ✅ MediaMarkt Advertiser ID
  fnacMID: '7224',                   // ✅ FNAC Advertiser ID

  // ======================================
  // TRADETRACKER (PcComponentes)
  // ======================================
  // Obtener de: https://publisher.tradetracker.com/
  tradeTrackerAffiliate: 'XXXXXX',   // ❌ REEMPLAZAR con tu Affiliate ID

  // ID fijo de la campaña
  pcComponentesCampaign: '21449',    // ✅ PcComponentes Campaign ID

  // ======================================
  // TRADEDOUBLER (Game) - OPCIONAL
  // ======================================
  // Obtener de: https://publisher.tradedoubler.com/
  tradeDoublerAffiliate: 'XXXXXX',   // ❌ REEMPLAZAR con tu Affiliate ID
  tradeDoublerProgram: 'XXXXXX'      // ❌ REEMPLAZAR con Program ID
};

/**
 * Genera MediaMarkt affiliate link usando Awin
 * @param {string} productURL - URL original del producto en MediaMarkt
 * @returns {string} - Affiliate link de MediaMarkt
 */
function generateMediaMarktLink(productURL) {
  // Verificar si el ID de Awin está configurado
  if (AFFILIATE_IDS.awinPublisher === 'XXXXXX') {
    console.warn('⚠️  Awin Publisher ID no configurado. Usando link directo.');
    return productURL;
  }

  const encodedURL = encodeURIComponent(productURL);
  return `https://www.awin1.com/cread.php?awinmid=${AFFILIATE_IDS.mediamarktMID}&awinaffid=${AFFILIATE_IDS.awinPublisher}&ued=${encodedURL}`;
}

/**
 * Genera PcComponentes affiliate link usando TradeTracker
 * @param {string} productURL - URL original del producto en PcComponentes
 * @returns {string} - Affiliate link de PcComponentes
 */
function generatePcComponentesLink(productURL) {
  // Verificar si el ID de TradeTracker está configurado
  if (AFFILIATE_IDS.tradeTrackerAffiliate === 'XXXXXX') {
    console.warn('⚠️  TradeTracker Affiliate ID no configurado. Usando link directo.');
    return productURL;
  }

  const encodedURL = encodeURIComponent(productURL);
  return `https://tc.tradetracker.net/?c=${AFFILIATE_IDS.pcComponentesCampaign}&m=12&a=${AFFILIATE_IDS.tradeTrackerAffiliate}&r=&u=${encodedURL}`;
}

/**
 * Genera FNAC affiliate link usando Awin
 * @param {string} productURL - URL original del producto en FNAC
 * @returns {string} - Affiliate link de FNAC
 */
function generateFnacLink(productURL) {
  // Verificar si el ID de Awin está configurado
  if (AFFILIATE_IDS.awinPublisher === 'XXXXXX') {
    console.warn('⚠️  Awin Publisher ID no configurado. Usando link directo.');
    return productURL;
  }

  const encodedURL = encodeURIComponent(productURL);
  return `https://www.awin1.com/cread.php?awinmid=${AFFILIATE_IDS.fnacMID}&awinaffid=${AFFILIATE_IDS.awinPublisher}&ued=${encodedURL}`;
}

/**
 * Genera Game affiliate link usando TradeDoubler
 * @param {string} productURL - URL original del producto en Game
 * @returns {string} - Affiliate link de Game
 */
function generateGameLink(productURL) {
  // Verificar si los IDs de TradeDoubler están configurados
  if (AFFILIATE_IDS.tradeDoublerAffiliate === 'XXXXXX' || AFFILIATE_IDS.tradeDoublerProgram === 'XXXXXX') {
    console.warn('⚠️  TradeDoubler IDs no configurados. Usando link directo.');
    return productURL;
  }

  const encodedURL = encodeURIComponent(productURL);
  return `https://clk.tradedoubler.com/click?p=${AFFILIATE_IDS.tradeDoublerProgram}&a=${AFFILIATE_IDS.tradeDoublerAffiliate}&url=${encodedURL}`;
}

/**
 * Verifica si los IDs de afiliados están configurados
 * @returns {object} - Estado de configuración de cada red
 */
function checkConfiguration() {
  const status = {
    amazon: {
      ES: AFFILIATE_IDS.amazonES !== 'XXXXXX',
      US: AFFILIATE_IDS.amazonUS !== 'XXXXXX'
    },
    awin: AFFILIATE_IDS.awinPublisher !== 'XXXXXX',
    tradetracker: AFFILIATE_IDS.tradeTrackerAffiliate !== 'XXXXXX',
    tradedoubler: AFFILIATE_IDS.tradeDoublerAffiliate !== 'XXXXXX' && AFFILIATE_IDS.tradeDoublerProgram !== 'XXXXXX'
  };

  console.log('\n📊 Estado de Configuración de Affiliate IDs:\n');
  console.log(`Amazon España:     ${status.amazon.ES ? '✅ Configurado' : '❌ Pendiente'}`);
  console.log(`Amazon USA:        ${status.amazon.US ? '✅ Configurado' : '❌ Pendiente'}`);
  console.log(`Awin (MM + FNAC):  ${status.awin ? '✅ Configurado' : '❌ Pendiente'}`);
  console.log(`TradeTracker (PC): ${status.tradetracker ? '✅ Configurado' : '❌ Pendiente'}`);
  console.log(`TradeDoubler (GM): ${status.tradedoubler ? '✅ Configurado' : '❌ Pendiente (Opcional)'}`);
  console.log('');

  return status;
}

/**
 * Ejemplo de uso con un producto
 */
function example() {
  console.log('\n📝 Ejemplo de Generación de Links:\n');

  // URLs originales de ejemplo
  const urls = {
    mediamarkt: 'https://www.mediamarkt.es/es/product/_apple-macbook-air-13-6-m2-8-gb-256-gb-ssd-1662820.html',
    pccomponentes: 'https://www.pccomponentes.com/apple-macbook-air-apple-m2-8gb-256gb-ssd-134',
    fnac: 'https://www.fnac.es/Apple-AirPods-Pro-2-generacion-USB-C/a8897156',
    game: 'https://www.game.es/CONSOLAS/PLAYSTATION/PS5/HARDWARE/CONSOLA-PLAYSTATION-5-SLIM/217892'
  };

  console.log('🏪 MediaMarkt:');
  console.log('Original:', urls.mediamarkt);
  console.log('Affiliate:', generateMediaMarktLink(urls.mediamarkt));
  console.log('');

  console.log('💻 PcComponentes:');
  console.log('Original:', urls.pccomponentes);
  console.log('Affiliate:', generatePcComponentesLink(urls.pccomponentes));
  console.log('');

  console.log('📚 FNAC:');
  console.log('Original:', urls.fnac);
  console.log('Affiliate:', generateFnacLink(urls.fnac));
  console.log('');

  console.log('🎮 Game:');
  console.log('Original:', urls.game);
  console.log('Affiliate:', generateGameLink(urls.game));
  console.log('');
}

// Exportar funciones
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateMediaMarktLink,
    generatePcComponentesLink,
    generateFnacLink,
    generateGameLink,
    checkConfiguration,
    AFFILIATE_IDS
  };
}

// Si se ejecuta directamente
if (require.main === module) {
  checkConfiguration();
  example();
}
