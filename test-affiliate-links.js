/**
 * Script de Testing de Affiliate Links
 * Muestra cómo se verán los links con y sin IDs configurados
 */

const {
  generateMediaMarktLink,
  generatePcComponentesLink,
  generateFnacLink,
  generateGameLink,
  checkConfiguration,
  AFFILIATE_IDS
} = require('./js/affiliate-link-generator.js');

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║         🧪 TEST DE AFFILIATE LINKS - DealTech365              ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

// Verificar configuración actual
checkConfiguration();

console.log('\n───────────────────────────────────────────────────────────────\n');

// URLs de ejemplo de productos reales
const testProducts = [
  {
    name: 'MacBook Air M2',
    urls: {
      mediamarkt: 'https://www.mediamarkt.es/es/product/_apple-macbook-air-13-6-m2-8-gb-256-gb-ssd-1662820.html',
      pccomponentes: 'https://www.pccomponentes.com/apple-macbook-air-apple-m2-8gb-256gb-ssd-134'
    }
  },
  {
    name: 'Sony WH-1000XM5',
    urls: {
      mediamarkt: 'https://www.mediamarkt.es/es/product/_sony-wh-1000xm5-auriculares-bluetooth-1662821.html',
      pccomponentes: 'https://www.pccomponentes.com/sony-wh-1000xm5-auriculares-bluetooth',
      fnac: 'https://www.fnac.es/Sony-WH-1000XM5-Negro/a8749023'
    }
  },
  {
    name: 'PlayStation 5 Slim',
    urls: {
      mediamarkt: 'https://www.mediamarkt.es/es/product/_sony-playstation-5-slim-1690363.html',
      pccomponentes: 'https://www.pccomponentes.com/sony-playstation-5-slim',
      game: 'https://www.game.es/CONSOLAS/PLAYSTATION/PS5/HARDWARE/CONSOLA-PLAYSTATION-5-SLIM/217892'
    }
  }
];

// Probar cada producto
testProducts.forEach((product, index) => {
  console.log(`📦 PRODUCTO ${index + 1}: ${product.name}`);
  console.log('─'.repeat(70));

  if (product.urls.mediamarkt) {
    console.log('\n🏪 MediaMarkt:');
    console.log('   Original:  ', product.urls.mediamarkt.substring(0, 80) + '...');
    const mmLink = generateMediaMarktLink(product.urls.mediamarkt);
    if (mmLink === product.urls.mediamarkt) {
      console.log('   ⚠️  Sin afiliación (falta Awin Publisher ID)');
    } else {
      console.log('   ✅ Con afiliación:', mmLink.substring(0, 80) + '...');
    }
  }

  if (product.urls.pccomponentes) {
    console.log('\n💻 PcComponentes:');
    console.log('   Original:  ', product.urls.pccomponentes.substring(0, 80) + '...');
    const pcLink = generatePcComponentesLink(product.urls.pccomponentes);
    if (pcLink === product.urls.pccomponentes) {
      console.log('   ⚠️  Sin afiliación (falta TradeTracker Affiliate ID)');
    } else {
      console.log('   ✅ Con afiliación:', pcLink.substring(0, 80) + '...');
    }
  }

  if (product.urls.fnac) {
    console.log('\n📚 FNAC:');
    console.log('   Original:  ', product.urls.fnac.substring(0, 80) + '...');
    const fnacLink = generateFnacLink(product.urls.fnac);
    if (fnacLink === product.urls.fnac) {
      console.log('   ⚠️  Sin afiliación (falta Awin Publisher ID)');
    } else {
      console.log('   ✅ Con afiliación:', fnacLink.substring(0, 80) + '...');
    }
  }

  if (product.urls.game) {
    console.log('\n🎮 Game:');
    console.log('   Original:  ', product.urls.game.substring(0, 80) + '...');
    const gameLink = generateGameLink(product.urls.game);
    if (gameLink === product.urls.game) {
      console.log('   ⚠️  Sin afiliación (falta TradeDoubler IDs)');
    } else {
      console.log('   ✅ Con afiliación:', gameLink.substring(0, 80) + '...');
    }
  }

  console.log('\n');
});

console.log('───────────────────────────────────────────────────────────────\n');

// Mostrar estructura de un affiliate link completo de ejemplo
console.log('📋 ESTRUCTURA DE AFFILIATE LINKS:\n');

console.log('MediaMarkt (Awin):');
console.log('  https://www.awin1.com/cread.php?');
console.log('    awinmid=10206              ← ID fijo de MediaMarkt');
console.log('    &awinaffid=TU_PUBLISHER_ID ← Tu ID de Awin');
console.log('    &ued=URL_ENCODED           ← URL del producto codificada\n');

console.log('PcComponentes (TradeTracker):');
console.log('  https://tc.tradetracker.net/?');
console.log('    c=21449                    ← ID fijo de PcComponentes');
console.log('    &m=12                      ← Material ID (deeplink)');
console.log('    &a=TU_AFFILIATE_ID         ← Tu ID de TradeTracker');
console.log('    &u=URL_ENCODED             ← URL del producto codificada\n');

console.log('───────────────────────────────────────────────────────────────\n');

// Calcular potencial de ingresos
console.log('💰 PROYECCIÓN DE INGRESOS:\n');

const scenarios = [
  {
    name: 'Conservador (Mes 1)',
    ventas: 3,
    ticketPromedio: 500,
    comision: 0.025
  },
  {
    name: 'Optimista (Mes 3)',
    ventas: 24,
    ticketPromedio: 600,
    comision: 0.025
  },
  {
    name: 'Black Friday',
    ventas: 150,
    ticketPromedio: 550,
    comision: 0.025
  }
];

scenarios.forEach(scenario => {
  const ingresos = scenario.ventas * scenario.ticketPromedio * scenario.comision;
  console.log(`${scenario.name}:`);
  console.log(`  ${scenario.ventas} ventas × €${scenario.ticketPromedio} × ${scenario.comision * 100}% = €${ingresos.toFixed(2)}`);
});

console.log('\n───────────────────────────────────────────────────────────────\n');

// Próximos pasos
console.log('🚀 PRÓXIMOS PASOS:\n');

if (AFFILIATE_IDS.awinPublisher === 'XXXXXX') {
  console.log('1. ❌ Registrarse en Awin');
  console.log('   → https://www.awin.com/es/afiliados');
  console.log('   → Tiempo: 1-3 días aprobación\n');
} else {
  console.log('1. ✅ Ya registrado en Awin (ID: ' + AFFILIATE_IDS.awinPublisher + ')\n');
}

if (AFFILIATE_IDS.tradeTrackerAffiliate === 'XXXXXX') {
  console.log('2. ❌ Registrarse en TradeTracker');
  console.log('   → https://www.tradetracker.com/');
  console.log('   → Tiempo: 1-2 días aprobación\n');
} else {
  console.log('2. ✅ Ya registrado en TradeTracker (ID: ' + AFFILIATE_IDS.tradeTrackerAffiliate + ')\n');
}

console.log('3. Después de obtener IDs:');
console.log('   → Editar: js/affiliate-link-generator.js');
console.log('   → Ejecutar: node update-all-affiliate-links.js');
console.log('   → Build: npm run build && npm run deploy:prepare\n');

console.log('───────────────────────────────────────────────────────────────\n');

console.log('📚 Documentación completa:');
console.log('   → AFFILIATE-PROGRAMS-ESPAÑA.md');
console.log('   → QUICK-START-AFFILIATE-ESPAÑA.md\n');

console.log('╚════════════════════════════════════════════════════════════════╝\n');
