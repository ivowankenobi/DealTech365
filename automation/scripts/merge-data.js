/**
 * Merge scraped data with manually added products
 */
const fs = require('fs').promises;
const path = require('path');

async function mergeData() {
    try {
        console.log('🔄 Combinando datos scrapeados con productos manuales...\n');

        // Leer datos scrapeados (audio + smartphones)
        const scrapedPath = path.join(__dirname, '../data/deals-ES-2025-11-26T14-09-29.json');
        const scrapedData = JSON.parse(await fs.readFile(scrapedPath, 'utf8'));
        console.log(`✅ Datos scrapeados: ${scrapedData.deals.length} productos`);

        // Leer productos adicionales (laptops + gaming)
        const additionalPath = path.join(__dirname, '../data/additional-products.json');
        const additionalData = JSON.parse(await fs.readFile(additionalPath, 'utf8'));
        console.log(`✅ Productos adicionales: ${additionalData.deals.length} productos`);

        // Combinar todos los productos
        const allDeals = [...scrapedData.deals, ...additionalData.deals];

        // Eliminar duplicados por ASIN
        const seenASINs = new Set();
        const uniqueDeals = allDeals.filter(deal => {
            if (seenASINs.has(deal.asin)) {
                return false;
            }
            seenASINs.add(deal.asin);
            return true;
        });

        console.log(`✅ Productos únicos: ${uniqueDeals.length} (eliminados ${allDeals.length - uniqueDeals.length} duplicados)`);

        // Contar por categoría
        const byCategory = {};
        uniqueDeals.forEach(deal => {
            byCategory[deal.category] = (byCategory[deal.category] || 0) + 1;
        });

        console.log('\n📊 Productos por categoría:');
        Object.entries(byCategory).forEach(([cat, count]) => {
            console.log(`  ${cat}: ${count} productos`);
        });

        // Crear archivo combinado
        const mergedData = {
            metadata: {
                mergedAt: new Date().toISOString(),
                region: 'ES',
                totalProducts: uniqueDeals.length,
                sources: ['scraper', 'manual'],
                categories: Object.keys(byCategory)
            },
            deals: uniqueDeals
        };

        // Guardar como deals-latest-ES.json
        const outputPath = path.join(__dirname, '../data/deals-latest-ES.json');
        await fs.writeFile(outputPath, JSON.stringify(mergedData, null, 2));

        console.log(`\n💾 Archivo combinado guardado: ${outputPath}`);
        console.log('\n✅ ¡Combinación completada exitosamente!');

        return mergedData;

    } catch (error) {
        console.error('❌ Error:', error.message);
        throw error;
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    mergeData().catch(console.error);
}

module.exports = mergeData;
