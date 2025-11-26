/**
 * Import Scraped Deals to Firestore
 *
 * Lee los datos del scraper y los sube a Firebase Firestore
 *
 * Uso: node import-to-firestore.js
 */

const admin = require('firebase-admin');
const fs = require('fs').promises;
const path = require('path');

class FirestoreImporter {
    constructor() {
        this.initFirebase();
        this.stats = {
            added: 0,
            updated: 0,
            skipped: 0,
            errors: 0
        };
    }

    initFirebase() {
        try {
            // Inicializar Firebase Admin
            // IMPORTANTE: Necesitas crear un service account key en Firebase Console
            const serviceAccount = require('../firebase-admin-key.json');

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });

            this.db = admin.firestore();
            console.log('✅ Firebase Admin inicializado');
        } catch (error) {
            console.error('❌ Error inicializando Firebase:', error.message);
            console.log('\n⚠️  INSTRUCCIONES:');
            console.log('1. Ve a Firebase Console → Project Settings → Service Accounts');
            console.log('2. Genera una nueva clave privada');
            console.log('3. Guarda el archivo JSON como: automation/firebase-admin-key.json');
            process.exit(1);
        }
    }

    async loadLatestData(region = 'ES') {
        const filepath = path.join(__dirname, `../data/deals-latest-${region}.json`);

        try {
            const data = await fs.readFile(filepath, 'utf-8');
            const json = JSON.parse(data);
            console.log(`✅ Cargados ${json.deals.length} productos del scraper`);
            return json.deals;
        } catch (error) {
            console.error(`❌ Error leyendo archivo: ${filepath}`);
            console.error(error.message);
            return [];
        }
    }

    async importDeal(deal) {
        const dealsRef = this.db.collection('deals');

        try {
            // Buscar si ya existe por ASIN
            const existing = await dealsRef.where('asin', '==', deal.asin).limit(1).get();

            if (existing.empty) {
                // Nuevo producto - añadir
                await dealsRef.add(deal);
                console.log(`  ✅ AÑADIDO: ${deal.name.substring(0, 50)}...`);
                this.stats.added++;
            } else {
                // Producto existe - actualizar precio si cambió
                const doc = existing.docs[0];
                const existingData = doc.data();

                if (existingData.currentPrice !== deal.currentPrice ||
                    existingData.discount !== deal.discount) {

                    await doc.ref.update({
                        currentPrice: deal.currentPrice,
                        discount: deal.discount,
                        updatedAt: deal.updatedAt,
                        lastPriceCheck: deal.lastPriceCheck,
                        metadata: deal.metadata
                    });

                    // Guardar en historial de precios
                    await this.savePriceHistory(deal.asin, deal.currentPrice, deal.discount);

                    console.log(`  🔄 ACTUALIZADO: ${deal.name.substring(0, 50)}... (${deal.discount}%)`);
                    this.stats.updated++;
                } else {
                    // Sin cambios
                    await doc.ref.update({
                        lastPriceCheck: deal.lastPriceCheck
                    });
                    this.stats.skipped++;
                }
            }

        } catch (error) {
            console.error(`  ❌ ERROR: ${deal.name.substring(0, 30)}...`);
            console.error(`     ${error.message}`);
            this.stats.errors++;
        }
    }

    async savePriceHistory(asin, price, discount) {
        const historyRef = this.db.collection('price_history');

        await historyRef.add({
            asin: asin,
            price: price,
            discount: discount,
            timestamp: admin.firestore.Timestamp.now(),
            source: 'scraper'
        });
    }

    async deactivateOldDeals(currentAsins) {
        console.log('\n🔍 Buscando ofertas obsoletas...');

        const dealsRef = this.db.collection('deals');
        const snapshot = await dealsRef.where('active', '==', true).get();

        let deactivated = 0;

        for (const doc of snapshot.docs) {
            const data = doc.data();

            // Si no está en los productos actuales del scraper
            if (!currentAsins.includes(data.asin)) {
                // Solo desactivar si fue scrapeado (no manual)
                if (data.source === 'scraper') {
                    const daysSinceUpdate = (Date.now() - new Date(data.lastPriceCheck).getTime()) / (1000 * 60 * 60 * 24);

                    // Desactivar si no se ha actualizado en 2 días
                    if (daysSinceUpdate > 2) {
                        await doc.ref.update({
                            active: false,
                            updatedAt: admin.firestore.Timestamp.now()
                        });
                        console.log(`  ⚠️  DESACTIVADO: ${data.name.substring(0, 50)}...`);
                        deactivated++;
                    }
                }
            }
        }

        console.log(`✅ ${deactivated} ofertas obsoletas desactivadas`);
    }

    async run() {
        console.log('📤 Importador de Ofertas a Firestore');
        console.log('=====================================\n');

        const startTime = Date.now();

        // Cargar datos del scraper
        const deals = await this.loadLatestData('ES');

        if (deals.length === 0) {
            console.log('⚠️  No hay datos para importar');
            return;
        }

        console.log(`\n📊 Importando ${deals.length} productos...\n`);

        // Importar cada deal
        for (const deal of deals) {
            await this.importDeal(deal);
        }

        // Desactivar ofertas viejas
        const currentAsins = deals.map(d => d.asin);
        await this.deactivateOldDeals(currentAsins);

        // Resumen
        console.log('\n✅ Importación completada!');
        console.log('========================');
        console.log(`✨ Añadidos:     ${this.stats.added}`);
        console.log(`🔄 Actualizados: ${this.stats.updated}`);
        console.log(`⏭️  Sin cambios:  ${this.stats.skipped}`);
        console.log(`❌ Errores:      ${this.stats.errors}`);
        console.log(`⏱️  Tiempo:       ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
    }
}

// Ejecutar
if (require.main === module) {
    const importer = new FirestoreImporter();
    importer.run()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('❌ Error fatal:', error);
            process.exit(1);
        });
}

module.exports = FirestoreImporter;
