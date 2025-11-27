/**
 * Amazon Scraper - Versión Mejorada
 * Características:
 * - User agents rotativos
 * - Delays aleatorios
 * - Retry logic con backoff exponencial
 * - Mejor manejo de errores
 * - Detección de bloqueos
 */

const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// User agents rotativos para evitar detección
const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
];

// Configuración
const CONFIG = {
    headless: true,
    timeout: 30000,
    maxRetries: 3,
    delayMin: 2000,  // Mínimo 2 segundos entre peticiones
    delayMax: 5000,  // Máximo 5 segundos
    viewport: {
        width: 1920,
        height: 1080
    }
};

// URLs de búsqueda
const SEARCH_URLS = {
    laptops: 'https://www.amazon.es/s?k=laptop+gaming&rh=n%3A937997031&s=review-rank&page=',
    audio: 'https://www.amazon.es/s?k=auriculares+bluetooth&rh=n%3A599370031&s=review-rank&page=',
    smartphones: 'https://www.amazon.es/s?k=smartphone&rh=n%3A599370031&s=review-rank&page=',
    gaming: 'https://www.amazon.es/s?k=gaming+accesorios&rh=n%3A599370031&s=review-rank&page='
};

class AmazonScraperImproved {
    constructor() {
        this.browser = null;
        this.page = null;
        this.scrapedASINs = new Set();
    }

    /**
     * Delay aleatorio para simular comportamiento humano
     */
    async randomDelay() {
        const delay = Math.random() * (CONFIG.delayMax - CONFIG.delayMin) + CONFIG.delayMin;
        console.log(`⏳ Esperando ${(delay / 1000).toFixed(1)}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    /**
     * Obtener user agent aleatorio
     */
    getRandomUserAgent() {
        return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
    }

    /**
     * Inicializar browser con configuración mejorada
     */
    async initBrowser() {
        console.log('🚀 Iniciando navegador...');

        this.browser = await puppeteer.launch({
            headless: CONFIG.headless ? 'new' : false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--window-size=1920,1080',
                '--disable-blink-features=AutomationControlled' // Evitar detección
            ]
        });

        this.page = await this.browser.newPage();

        // Configurar viewport
        await this.page.setViewport(CONFIG.viewport);

        // User agent aleatorio
        await this.page.setUserAgent(this.getRandomUserAgent());

        // Inyectar scripts para evitar detección
        await this.page.evaluateOnNewDocument(() => {
            // Sobrescribir webdriver flag
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false
            });

            // Sobrescribir plugins
            Object.defineProperty(navigator, 'plugins', {
                get: () => [1, 2, 3, 4, 5]
            });

            // Sobrescribir languages
            Object.defineProperty(navigator, 'languages', {
                get: () => ['es-ES', 'es', 'en']
            });
        });

        // Configurar timeout
        this.page.setDefaultNavigationTimeout(CONFIG.timeout);

        console.log('✅ Navegador iniciado');
    }

    /**
     * Cerrar browser
     */
    async closeBrowser() {
        if (this.browser) {
            await this.browser.close();
            console.log('🔒 Navegador cerrado');
        }
    }

    /**
     * Scrape una categoría con retry logic
     */
    async scrapeCategory(category, maxPages = 3) {
        console.log(`\n📦 Scraping categoría: ${category.toUpperCase()}`);
        console.log(`📄 Páginas a scrapear: ${maxPages}\n`);

        const products = [];
        let retryCount = 0;

        for (let page = 1; page <= maxPages; page++) {
            try {
                console.log(`📄 Página ${page}/${maxPages}...`);

                const url = `${SEARCH_URLS[category]}${page}`;
                await this.page.goto(url, {
                    waitUntil: 'networkidle2',
                    timeout: CONFIG.timeout
                });

                // Verificar si fuimos bloqueados
                const isBlocked = await this.checkIfBlocked();
                if (isBlocked) {
                    console.log('⚠️ Página bloqueada detectada. Esperando más tiempo...');
                    await this.randomDelay();
                    await this.randomDelay(); // Doble delay
                    retryCount++;

                    if (retryCount >= CONFIG.maxRetries) {
                        console.log('❌ Máximo de reintentos alcanzado. Saltando categoría.');
                        break;
                    }

                    page--; // Reintentar misma página
                    continue;
                }

                // Esperar a que carguen los productos
                await this.page.waitForSelector('[data-asin]:not([data-asin=""])', {
                    timeout: 10000
                }).catch(() => {
                    console.log('⚠️ No se encontraron productos en esta página');
                });

                // Extraer productos
                const pageProducts = await this.extractProducts(category);
                products.push(...pageProducts);

                console.log(`✅ ${pageProducts.length} productos encontrados en página ${page}`);

                // Delay antes de siguiente página
                if (page < maxPages) {
                    await this.randomDelay();
                }

                retryCount = 0; // Resetear contador de reintentos

            } catch (error) {
                console.error(`❌ Error en página ${page}:`, error.message);

                retryCount++;
                if (retryCount < CONFIG.maxRetries) {
                    console.log(`🔄 Reintentando... (${retryCount}/${CONFIG.maxRetries})`);
                    await this.randomDelay();
                    page--; // Reintentar misma página
                } else {
                    console.log('❌ Máximo de reintentos alcanzado');
                    break;
                }
            }
        }

        console.log(`\n✅ Total: ${products.length} productos en ${category}\n`);
        return products;
    }

    /**
     * Verificar si la página está bloqueada
     */
    async checkIfBlocked() {
        const bodyText = await this.page.evaluate(() => document.body.innerText);

        const blockSignals = [
            'robot',
            'captcha',
            'unusual traffic',
            'sorry',
            'blocked'
        ];

        return blockSignals.some(signal =>
            bodyText.toLowerCase().includes(signal)
        );
    }

    /**
     * Extraer productos de la página actual
     */
    async extractProducts(category) {
        const products = await this.page.evaluate((cat, scrapedSet) => {
            const products = [];
            const items = document.querySelectorAll('[data-asin]:not([data-asin=""])');

            items.forEach(item => {
                try {
                    const asin = item.getAttribute('data-asin');

                    // Evitar duplicados
                    if (!asin || scrapedSet.includes(asin)) return;

                    // Extraer datos con selectores alternativos
                    const titleEl = item.querySelector('h2 a span') ||
                                   item.querySelector('h2 span') ||
                                   item.querySelector('[data-cy="title-recipe"] h2');
                    const priceEl = item.querySelector('.a-price .a-offscreen') ||
                                   item.querySelector('.a-price-whole');
                    const originalPriceEl = item.querySelector('.a-price[data-a-strike="true"] .a-offscreen');
                    const imageEl = item.querySelector('img.s-image') ||
                                   item.querySelector('img[data-image-index="0"]');
                    const ratingEl = item.querySelector('.a-icon-star-small span') ||
                                    item.querySelector('i.a-icon-star-small span');

                    if (!titleEl || !priceEl) return;

                    const name = titleEl.textContent.trim();
                    const currentPrice = parseFloat(priceEl.textContent.replace(/[€,]/g, '').replace('.', '').trim()) / 100;
                    const basePrice = originalPriceEl ?
                        parseFloat(originalPriceEl.textContent.replace(/[€,]/g, '').replace('.', '').trim()) / 100 :
                        currentPrice * 1.3;

                    const discount = Math.round(((basePrice - currentPrice) / basePrice) * 100);
                    const rating = ratingEl ? parseFloat(ratingEl.textContent.split(' ')[0].replace(',', '.')) : 4;

                    // Solo productos con descuento significativo
                    if (discount < 10) return;

                    products.push({
                        asin,
                        name,
                        brand: name.split(' ')[0],
                        category: cat,
                        basePrice: Math.round(basePrice * 100) / 100,
                        currentPrice: Math.round(currentPrice * 100) / 100,
                        discount,
                        image: imageEl ? imageEl.src : '',
                        affiliateLinks: {
                            EU: {
                                amazon: `https://www.amazon.es/dp/${asin}?tag=dealtech365-21`
                            },
                            US: {
                                amazon: `https://www.amazon.com/dp/${asin}?tag=blackfridaytech-20`
                            }
                        },
                        active: true,
                        featured: discount >= 40,
                        source: 'scraper-improved',
                        metadata: {
                            scrapedFrom: 'scraper-improved',
                            rating: Math.round(rating * 10) / 10,
                            reviewCount: 0,
                            stockStatus: 'available',
                            scrapedAt: new Date().toISOString()
                        }
                    });

                } catch (error) {
                    // Error silencioso para no interrumpir el scraping
                }
            });

            return products;
        }, category, Array.from(this.scrapedASINs));

        return products;
    }

    /**
     * Scrape todas las categorías
     */
    async scrapeAll(categories = Object.keys(SEARCH_URLS), maxPagesPerCategory = 2) {
        try {
            await this.initBrowser();

            const allProducts = [];

            for (const category of categories) {
                const products = await this.scrapeCategory(category, maxPagesPerCategory);
                allProducts.push(...products);

                // Marcar ASINs como scrapeados
                products.forEach(p => this.scrapedASINs.add(p.asin));

                // Delay entre categorías
                if (categories.indexOf(category) < categories.length - 1) {
                    console.log('⏳ Pausa entre categorías...\n');
                    await this.randomDelay();
                    await this.randomDelay(); // Extra delay entre categorías
                }
            }

            return allProducts;

        } finally {
            await this.closeBrowser();
        }
    }

    /**
     * Guardar resultados
     */
    async saveResults(products) {
        const timestamp = new Date().toISOString().split('.')[0].replace(/:/g, '-');
        const filename = `deals-ES-${timestamp}.json`;
        const filepath = path.join(__dirname, '../data', filename);

        const data = {
            metadata: {
                scrapedAt: new Date().toISOString(),
                region: 'ES',
                totalProducts: products.length,
                source: 'scraper-improved',
                categories: [...new Set(products.map(p => p.category))]
            },
            deals: products
        };

        await fs.writeFile(filepath, JSON.stringify(data, null, 2));
        console.log(`\n💾 Datos guardados: ${filename}`);
        console.log(`📊 Total de productos: ${products.length}`);

        return filepath;
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    (async () => {
        console.log('🔄 Amazon Scraper Mejorado - Iniciando...\n');

        const scraper = new AmazonScraperImproved();

        try {
            // Scrape todas las categorías (2 páginas por categoría)
            const products = await scraper.scrapeAll(
                ['audio', 'smartphones', 'gaming', 'laptops'],
                2  // Páginas por categoría
            );

            // Guardar resultados
            await scraper.saveResults(products);

            console.log('\n✅ ¡Scraping completado exitosamente!\n');

        } catch (error) {
            console.error('\n❌ Error fatal:', error.message);
            process.exit(1);
        }
    })();
}

module.exports = AmazonScraperImproved;
