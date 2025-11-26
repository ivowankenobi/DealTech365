/**
 * Sync scraped deals to web's deals.js file
 * Convierte JSON scrapeado a formato deals.js
 */

const fs = require('fs').promises;
const path = require('path');

class WebSyncer {
    constructor() {
        this.scrapedDataPath = path.join(__dirname, '../data/deals-latest-ES.json');
        this.webDealsPath = path.join(__dirname, '../../js/deals.js');
    }

    /**
     * Convertir producto scrapeado a formato web
     */
    convertToWebFormat(product) {
        // Calcular precio actual
        const currentPrice = Math.round(product.basePrice * (1 - product.discount / 100));

        return {
            name: product.name,
            brand: product.brand,
            basePrice: product.basePrice,
            discount: product.discount,
            image: product.image,
            asin: product.asin,
            specs: this.extractSpecs(product.name),
            affiliateLinks: product.affiliateLinks
        };
    }

    /**
     * Extraer specs del nombre del producto
     */
    extractSpecs(name) {
        const specs = {};

        // RAM
        const ramMatch = name.match(/(\d+)\s*GB\s*(RAM|de RAM)/i);
        if (ramMatch) specs.ram = `${ramMatch[1]}GB`;

        // Storage
        const storageMatch = name.match(/(\d+)\s*(GB|TB)\s*(SSD|HDD|NVMe)?/i);
        if (storageMatch) {
            specs.storage = storageMatch[3]
                ? `${storageMatch[1]}${storageMatch[2]} ${storageMatch[3]}`
                : `${storageMatch[1]}${storageMatch[2]}`;
        }

        // Screen
        const screenMatch = name.match(/(\d+\.?\d*)\s*("|pulgadas|inch)/i);
        if (screenMatch) specs.screen = `${screenMatch[1]}"`;

        // Processor (para laptops)
        const processorMatch = name.match(/(Intel|AMD|Ryzen|Core)\s*[^\s,]*/i);
        if (processorMatch) specs.processor = processorMatch[0];

        // Bluetooth/Audio specs
        if (name.match(/bluetooth\s*(\d+\.?\d*)/i)) {
            const btMatch = name.match(/bluetooth\s*(\d+\.?\d*)/i);
            specs.bluetooth = `Bluetooth ${btMatch[1]}`;
        }

        // Battery
        const batteryMatch = name.match(/(\d+)\s*h\s*(batería|battery)/i);
        if (batteryMatch) specs.battery = `${batteryMatch[1]}h`;

        return specs;
    }

    /**
     * Escapar comillas simples en strings para JavaScript
     */
    escapeJS(str) {
        if (!str) return '';
        return str
            .replace(/'/g, "\\'")           // Escapar comillas simples
            .replace(/\n/g, ' ')             // Saltos de línea → espacio
            .replace(/\r/g, ' ')             // Retorno de carro → espacio
            .replace(/\s+/g, ' ')            // Múltiples espacios → un espacio
            .trim();                         // Eliminar espacios al inicio/fin
    }

    /**
     * Generar código JavaScript para deals.js
     */
    generateDealsJS(dealsByCategory) {
        let jsCode = `// Real Products - Amazon Affiliate Links
// Auto-generated from scraper on ${new Date().toISOString()}
// Last update: ${new Date().toLocaleString('es-ES')}

const DEAL_CATEGORIES = {\n`;

        for (const [categoryKey, categoryData] of Object.entries(dealsByCategory)) {
            const categoryName = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
            const icon = this.getCategoryIcon(categoryKey);

            jsCode += `  ${categoryKey}: {
    name: '${categoryName}',
    icon: '${icon}',
    products: [\n`;

            categoryData.forEach((product, index) => {
                jsCode += `      {\n`;
                jsCode += `        name: '${this.escapeJS(product.name)}',\n`;
                jsCode += `        brand: '${this.escapeJS(product.brand)}',\n`;
                jsCode += `        basePrice: ${product.basePrice},\n`;
                jsCode += `        discount: ${product.discount},\n`;
                jsCode += `        image: '${product.image}',\n`;
                jsCode += `        asin: '${product.asin}',\n`;

                if (Object.keys(product.specs).length > 0) {
                    jsCode += `        specs: {\n`;
                    for (const [key, value] of Object.entries(product.specs)) {
                        jsCode += `          ${key}: '${this.escapeJS(value)}',\n`;
                    }
                    jsCode += `        },\n`;
                }

                jsCode += `        affiliateLinks: {\n`;
                if (product.affiliateLinks.US) {
                    jsCode += `          US: {\n`;
                    jsCode += `            amazon: '${product.affiliateLinks.US.amazon}'\n`;
                    jsCode += `          },\n`;
                }
                if (product.affiliateLinks.EU) {
                    jsCode += `          EU: {\n`;
                    jsCode += `            amazon: '${product.affiliateLinks.EU.amazon}'\n`;
                    jsCode += `          }\n`;
                }
                jsCode += `        }\n`;
                jsCode += `      }${index < categoryData.length - 1 ? ',' : ''}\n`;
            });

            jsCode += `    ]\n  },\n`;
        }

        jsCode += `};\n\n`;
        jsCode += `// Generate deals with pricing\n`;
        jsCode += `function generateDeals(userRegion) {\n`;
        jsCode += `  const region = userRegion.isEurope ? 'EU' : 'US';\n`;
        jsCode += `  const currency = userRegion.currency;\n`;
        jsCode += `  const currencySymbol = userRegion.currencySymbol;\n\n`;
        jsCode += `  const allDeals = [];\n\n`;
        jsCode += `  Object.keys(DEAL_CATEGORIES).forEach(categoryKey => {\n`;
        jsCode += `    const category = DEAL_CATEGORIES[categoryKey];\n\n`;
        jsCode += `    category.products.forEach(product => {\n`;
        jsCode += `      const finalPrice = Math.round(product.basePrice * (1 - product.discount / 100));\n\n`;
        jsCode += `      // Always use Amazon link for this region\n`;
        jsCode += `      const regionLinks = product.affiliateLinks[region];\n`;
        jsCode += `      const affiliateLink = regionLinks.amazon;\n\n`;
        jsCode += `      allDeals.push({\n`;
        jsCode += `        ...product,\n`;
        jsCode += `        category: categoryKey,\n`;
        jsCode += `        categoryName: category.name,\n`;
        jsCode += `        finalPrice: finalPrice,\n`;
        jsCode += `        savings: product.basePrice - finalPrice,\n`;
        jsCode += `        currency: currency,\n`;
        jsCode += `        currencySymbol: currencySymbol,\n`;
        jsCode += `        affiliateLink: affiliateLink,\n`;
        jsCode += `        network: 'amazon'\n`;
        jsCode += `      });\n`;
        jsCode += `    });\n`;
        jsCode += `  });\n\n`;
        jsCode += `  return allDeals;\n`;
        jsCode += `}\n\n`;
        jsCode += `// Export for module usage\nif (typeof module !== 'undefined' && module.exports) {\n`;
        jsCode += `  module.exports = { DEAL_CATEGORIES };\n`;
        jsCode += `}\n`;

        return jsCode;
    }

    /**
     * Obtener icono por categoría
     */
    getCategoryIcon(category) {
        const icons = {
            laptops: '💻',
            audio: '🎧',
            smartphones: '📱',
            gaming: '🎮',
            tablets: '📱',
            monitors: '🖥️',
            accessories: '⌨️'
        };
        return icons[category] || '🔥';
    }

    /**
     * Sincronizar datos
     */
    async sync() {
        try {
            console.log('\n🔄 Sincronizando datos scrapeados con la web...\n');

            // Leer datos scrapeados
            const scrapedData = JSON.parse(await fs.readFile(this.scrapedDataPath, 'utf8'));
            console.log(`✅ Leídos ${scrapedData.metadata.totalProducts} productos scrapeados`);

            // Agrupar por categoría y eliminar duplicados por ASIN
            const dealsByCategory = {};
            const seenASINs = new Set();

            for (const deal of scrapedData.deals) {
                // Skip duplicados
                if (seenASINs.has(deal.asin)) {
                    continue;
                }
                seenASINs.add(deal.asin);

                if (!dealsByCategory[deal.category]) {
                    dealsByCategory[deal.category] = [];
                }

                // Convertir a formato web
                const webProduct = this.convertToWebFormat(deal);
                dealsByCategory[deal.category].push(webProduct);
            }

            // Ordenar por descuento (mayor primero)
            for (const category in dealsByCategory) {
                dealsByCategory[category].sort((a, b) => b.discount - a.discount);

                // Limitar a top 20 por categoría
                dealsByCategory[category] = dealsByCategory[category].slice(0, 20);
            }

            console.log('\n📊 Productos por categoría:');
            for (const [cat, products] of Object.entries(dealsByCategory)) {
                console.log(`  ${cat}: ${products.length} productos`);
            }

            // Generar código JavaScript
            const jsCode = this.generateDealsJS(dealsByCategory);

            // Backup del archivo original
            try {
                const originalContent = await fs.readFile(this.webDealsPath, 'utf8');
                const backupPath = this.webDealsPath.replace('.js', `.backup.${Date.now()}.js`);
                await fs.writeFile(backupPath, originalContent);
                console.log(`\n💾 Backup creado: ${backupPath}`);
            } catch (err) {
                console.log('⚠️  No se encontró archivo original, creando nuevo');
            }

            // Escribir nuevo archivo
            await fs.writeFile(this.webDealsPath, jsCode);
            console.log(`✅ Archivo actualizado: ${this.webDealsPath}`);

            // Estadísticas finales
            const totalProducts = Object.values(dealsByCategory).reduce((sum, arr) => sum + arr.length, 0);
            console.log(`\n✨ Sincronización completada!`);
            console.log(`   Total productos en web: ${totalProducts}`);
            console.log(`   Categorías: ${Object.keys(dealsByCategory).join(', ')}`);

            return dealsByCategory;

        } catch (error) {
            console.error('❌ Error en sincronización:', error.message);
            throw error;
        }
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    const syncer = new WebSyncer();
    syncer.sync().catch(console.error);
}

module.exports = WebSyncer;
