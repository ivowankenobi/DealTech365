#!/usr/bin/env node

/**
 * Actualiza tags de afiliado de Amazon en deals.js
 * Uso: node update-affiliate-tags.js TU-TAG-US TU-TAG-EU
 */

const fs = require('fs');
const path = require('path');

// Colores para terminal
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const BLUE = '\x1b[36m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

console.log(`\n${BOLD}${BLUE}🔗 Actualizador de Tags de Afiliado Amazon${RESET}\n`);
console.log(`${BLUE}${'═'.repeat(60)}${RESET}\n`);

// Obtener tags de argumentos de línea de comando
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`${YELLOW}💡 USO:${RESET}\n`);
  console.log(`   node update-affiliate-tags.js TU-TAG-US [TU-TAG-EU]\n`);
  console.log(`${YELLOW}📝 EJEMPLOS:${RESET}\n`);
  console.log(`   ${GREEN}# Mismo tag para US y EU:${RESET}`);
  console.log(`   node update-affiliate-tags.js dealtech365-20\n`);
  console.log(`   ${GREEN}# Tags diferentes para US y EU:${RESET}`);
  console.log(`   node update-affiliate-tags.js dealtech365-20 dealtech365-21\n`);
  console.log(`${YELLOW}📋 CÓMO OBTENER TU TAG:${RESET}\n`);
  console.log(`   1. Ve a tu dashboard de Amazon Associates`);
  console.log(`   2. Busca "Associate ID" o "Tag ID"`);
  console.log(`   3. Copia el tag (ejemplo: dealtech365-20)\n`);
  console.log(`${BLUE}${'═'.repeat(60)}${RESET}\n`);
  process.exit(0);
}

const tagUS = args[0];
const tagEU = args[1] || tagUS; // Si no se provee tag EU, usa el mismo que US

console.log(`${GREEN}✅ Tags configurados:${RESET}`);
console.log(`   US (Amazon.com): ${BOLD}${tagUS}${RESET}`);
console.log(`   EU (Amazon.es): ${BOLD}${tagEU}${RESET}\n`);

// Leer archivo deals.js
const dealsPath = path.join(__dirname, 'js', 'deals.js');

if (!fs.existsSync(dealsPath)) {
  console.error(`${RED}❌ Error: No se encontró js/deals.js${RESET}\n`);
  process.exit(1);
}

console.log(`${BLUE}📖 Leyendo js/deals.js...${RESET}`);
let content = fs.readFileSync(dealsPath, 'utf8');

// Contar cuántos links se van a actualizar
const matchesUS = content.match(/amazon\.com\/dp\/[A-Z0-9]+\?tag=[^'"]*/g);
const matchesEU = content.match(/amazon\.es\/dp\/[A-Z0-9]+(\?tag=[^'"]*)?/g);

const countUS = matchesUS ? matchesUS.length : 0;
const countEU = matchesEU ? matchesEU.length : 0;

console.log(`${YELLOW}📊 Links encontrados:${RESET}`);
console.log(`   Amazon US: ${countUS} links`);
console.log(`   Amazon EU: ${countEU} links\n`);

// Backup del archivo original
const backupPath = dealsPath + '.backup';
fs.copyFileSync(dealsPath, backupPath);
console.log(`${GREEN}💾 Backup creado: ${backupPath}${RESET}\n`);

// Actualizar tags en US (Amazon.com)
console.log(`${BLUE}🔄 Actualizando tags US...${RESET}`);
content = content.replace(
  /amazon\.com\/dp\/([A-Z0-9]+)\?tag=[^'"']*/g,
  `amazon.com/dp/$1?tag=${tagUS}`
);

// Actualizar tags en EU (Amazon.es)
console.log(`${BLUE}🔄 Actualizando tags EU...${RESET}`);

// Si el link EU no tiene tag, agregarlo
content = content.replace(
  /amazon\.es\/dp\/([A-Z0-9]+)(?!\?tag)/g,
  `amazon.es/dp/$1?tag=${tagEU}`
);

// Si el link EU ya tiene tag, reemplazarlo
content = content.replace(
  /amazon\.es\/dp\/([A-Z0-9]+)\?tag=[^'"']*/g,
  `amazon.es/dp/$1?tag=${tagEU}`
);

// Guardar archivo actualizado
fs.writeFileSync(dealsPath, content, 'utf8');

console.log(`${GREEN}✅ Archivo actualizado exitosamente${RESET}\n`);

console.log(`${BLUE}${'═'.repeat(60)}${RESET}`);
console.log(`${BOLD}${GREEN}🎉 ¡TAGS ACTUALIZADOS!${RESET}`);
console.log(`${BLUE}${'═'.repeat(60)}${RESET}\n`);

console.log(`${YELLOW}📋 SIGUIENTES PASOS:${RESET}\n`);
console.log(`   1. ${GREEN}Verifica los cambios:${RESET}`);
console.log(`      Abre js/deals.js y revisa que los tags son correctos\n`);
console.log(`   2. ${GREEN}Reconstruye el sitio:${RESET}`);
console.log(`      npm run build\n`);
console.log(`   3. ${GREEN}Actualiza en el servidor:${RESET}`);
console.log(`      npm run deploy:prepare`);
console.log(`      Sube la carpeta deploy-ready/ actualizada\n`);

console.log(`${YELLOW}💡 TIP:${RESET} Si algo sale mal, restaura el backup:`);
console.log(`   ${BLUE}copy js\\deals.js.backup js\\deals.js${RESET}\n`);

console.log(`${BLUE}${'═'.repeat(60)}${RESET}\n`);
