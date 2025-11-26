/**
 * Amazon Deals Scraper
 * Extrae ofertas de Amazon de forma ética y legal
 *
 * Uso: node amazon-scraper.js
 *
 * Requisitos:
 * npm install puppeteer cheerio axios
 */

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

class AmazonScraper {
    constructor(config = {}) {
        this.config = {
            headless: config.headless !== false,
            maxPages: config.maxPages || 3,
            delayBetweenRequests: config.delay || 3000, // 3 segundos entre requests
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            region: config.region || 'ES', // ES, US, UK, DE
            affiliateTag: config.affiliateTag || {
                ES: 'dealtech365-21',
                US: 'blackfridaytech-20'
            }
        };

        this.results = [];
        this.errors = [];
    }

    /**
     * URLs de Amazon por categoría y región
     */
    getAmazonUrls() {
        const baseUrls = {
            ES: 'https://www.amazon.es',
            US: 'https://www.amazon.com',
            UK: 'https://www.amazon.co.uk',
            DE: 'https://www.amazon.de'
        };

        const base = baseUrls[this.config.region];

        return {
            deals: `${base}/gp/goldbox`,
            laptops: `${base}/s?k=laptop&rh=n:937957031,p_36:50000-200000`,
            headphones: `${base}/s?k=auriculares&rh=n:937957031`,
            smartphones: `${base}/s?k=smartphone&rh=n:937957031`,
            gaming: `${base}/s?k=gaming&rh=n:937957031`
        };
    }

    /**
     * Iniciar navegador
     */
    async initBrowser() {
        console.log('🚀 Iniciando navegador...');
        this.browser = await puppeteer.launch({
            headless: this.config.headless,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        this.page = await this.browser.newPage();

        // Set user agent
        await this.page.setUserAgent(this.config.userAgent);

        // Set viewport
        await this.page.setViewport({ width: 1920, height: 1080 });

        console.log('✅ Navegador iniciado');
    }

    /**
     * Extraer datos de un producto
     */
    extractProductData($, element, category) {
        try {
            const $product = $(element);

            // ASIN (Amazon Standard Identification Number)
            const asin = $product.attr('data-asin') ||
                         $product.find('[data-asin]').attr('data-asin');

            if (!asin || asin === '') return null;

            // Título
            const title = $product.find('h2 a span, .a-size-base-plus, .a-size-medium').first().text().trim();

            // Precio actual - intentar múltiples selectores
            let currentPrice = 0;
            let priceWhole = $product.find('.a-price-whole').first().text().replace(/[^0-9]/g, '');
            let priceFraction = $product.find('.a-price-fraction').first().text().replace(/[^0-9]/g, '');

            if (priceWhole) {
                currentPrice = parseFloat(`${priceWhole}.${priceFraction || '00'}`);
            } else {
                // Intentar selector alternativo
                const priceText = $product.find('.a-price .a-offscreen').first().text();
                if (priceText) {
                    const match = priceText.match(/[\d.,]+/);
                    if (match) {
                        currentPrice = parseFloat(match[0].replace(',', '.'));
                    }
                }
            }

            // Precio anterior (tachado)
            let oldPrice = null;
            const oldPriceText = $product.find('.a-price.a-text-price .a-offscreen').first().text();
            if (oldPriceText) {
                const match = oldPriceText.match(/[\d.,]+/);
                if (match) {
                    oldPrice = parseFloat(match[0].replace(',', '.'));
                }
            }

            // Imagen
            const image = $product.find('img').first().attr('src') ||
                         $product.find('img').first().attr('data-src');

            // Rating
            const ratingText = $product.find('.a-icon-alt').first().text();
            const rating = ratingText ? parseFloat(ratingText.match(/[\d.]+/)?.[0] || 0) : 0;

            // Número de reviews
            const reviewsText = $product.find('.a-size-base.s-underline-text').text();
            const reviewCount = reviewsText ? parseInt(reviewsText.replace(/[^0-9]/g, '')) : 0;

            // Validar que tengamos precio válido
            if (!currentPrice || currentPrice === 0 || isNaN(currentPrice)) {
                return null;
            }

            // Calcular descuento
            let discount = 0;
            if (oldPrice && oldPrice > currentPrice) {
                discount = Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
            }

            // Si no hay descuento significativo, saltar
            if (discount < 10) return null;

            // Extraer marca del título (aproximación)
            const brand = this.extractBrand(title);

            return {
                asin,
                name: title,
                brand: brand || 'Unknown',
                category: category,
                basePrice: oldPrice || currentPrice,
                currentPrice: currentPrice,
                discount: discount,
                image: image,
                affiliateLinks: this.generateAffiliateLinks(asin),
                active: true,
                featured: discount >= 30,
                source: 'scraper',
                metadata: {
                    scrapedFrom: this.config.region,
                    rating: rating,
                    reviewCount: reviewCount,
                    stockStatus: 'available'
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                lastPriceCheck: new Date().toISOString()
            };
        } catch (error) {
            console.error(`❌ Error extrayendo producto:`, error.message);
            return null;
        }
    }

    /**
     * Extraer marca del título
     */
    extractBrand(title) {
        const commonBrands = [
            'HP', 'ASUS', 'Lenovo', 'Dell', 'Acer', 'MSI', 'Apple', 'Samsung',
            'Sony', 'Bose', 'JBL', 'Sennheiser', 'Logitech', 'Razer', 'Corsair',
            'SteelSeries', 'HyperX', 'Xiaomi', 'OnePlus', 'Huawei', 'Motorola'
        ];

        for (const brand of commonBrands) {
            if (title.toUpperCase().includes(brand.toUpperCase())) {
                return brand;
            }
        }

        // Intenta extraer la primera palabra
        const firstWord = title.split(' ')[0];
        return firstWord.length > 2 ? firstWord : 'Unknown';
    }

    /**
     * Generar enlaces de afiliado
     */
    generateAffiliateLinks(asin) {
        const links = {
            EU: {
                amazon: `https://www.amazon.es/dp/${asin}?tag=${this.config.affiliateTag.ES}`
            },
            US: {
                amazon: `https://www.amazon.com/dp/${asin}?tag=${this.config.affiliateTag.US}`
            }
        };

        return links;
    }

    /**
     * Scrapear una categoría
     */
    async scrapeCategory(url, categoryName) {
        console.log(`\n📦 Scraping categoría: ${categoryName}`);
        console.log(`🔗 URL: ${url}`);

        try {
            await this.page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

            // Esperar a que carguen los productos
            await this.page.waitForSelector('[data-asin]', { timeout: 10000 });

            // Scroll para cargar imágenes lazy
            await this.autoScroll();

            // Obtener HTML
            const html = await this.page.content();
            const $ = cheerio.load(html);

            // Encontrar productos
            const products = $('[data-asin]:not([data-asin=""])').toArray();
            console.log(`✅ Encontrados ${products.length} elementos con ASIN`);

            let validProducts = 0;
            for (const product of products) {
                const productData = this.extractProductData($, product, categoryName);

                if (productData && productData.discount >= 15) {
                    this.results.push(productData);
                    validProducts++;
                    console.log(`  ✓ ${productData.name.substring(0, 50)}... (${productData.discount}% OFF)`);
                }
            }

            console.log(`✅ ${validProducts} productos válidos extraídos de ${categoryName}`);

        } catch (error) {
            console.error(`❌ Error scraping ${categoryName}:`, error.message);
            this.errors.push({ category: categoryName, error: error.message });
        }

        // Delay entre categorías
        await this.delay(this.config.delayBetweenRequests);
    }

    /**
     * Auto-scroll para cargar contenido lazy
     */
    async autoScroll() {
        await this.page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 100;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
    }

    /**
     * Delay helper
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Ejecutar scraper completo
     */
    async run() {
        const startTime = Date.now();
        console.log('🎯 Amazon Scraper - DealTech365');
        console.log('================================\n');

        try {
            await this.initBrowser();

            const urls = this.getAmazonUrls();

            // Scrapear categorías seleccionadas
            const categories = [
                { url: urls.laptops, name: 'laptops' },
                { url: urls.headphones, name: 'audio' },
                { url: urls.smartphones, name: 'smartphones' }
            ];

            for (const category of categories) {
                await this.scrapeCategory(category.url, category.name);
            }

            // Guardar resultados
            await this.saveResults();

            console.log('\n✅ Scraping completado!');
            console.log(`⏱️  Tiempo total: ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
            console.log(`📊 Total productos: ${this.results.length}`);
            console.log(`❌ Errores: ${this.errors.length}`);

        } catch (error) {
            console.error('❌ Error fatal:', error);
        } finally {
            if (this.browser) {
                await this.browser.close();
            }
        }
    }

    /**
     * Guardar resultados en JSON
     */
    async saveResults() {
        const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
        const outputDir = path.join(__dirname, '../data');

        // Crear directorio si no existe
        try {
            await fs.mkdir(outputDir, { recursive: true });
        } catch (err) {
            // Directory already exists
        }

        const filename = `deals-${this.config.region}-${timestamp}.json`;
        const filepath = path.join(outputDir, filename);

        const output = {
            metadata: {
                scrapedAt: new Date().toISOString(),
                region: this.config.region,
                totalProducts: this.results.length,
                errors: this.errors.length
            },
            deals: this.results,
            errors: this.errors
        };

        await fs.writeFile(filepath, JSON.stringify(output, null, 2));
        console.log(`\n💾 Resultados guardados en: ${filepath}`);

        // También guardar como latest
        const latestPath = path.join(outputDir, `deals-latest-${this.config.region}.json`);
        await fs.writeFile(latestPath, JSON.stringify(output, null, 2));
        console.log(`💾 Copia en: ${latestPath}`);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    const scraper = new AmazonScraper({
        region: process.env.REGION || 'ES',
        headless: process.env.HEADLESS !== 'false',
        maxPages: parseInt(process.env.MAX_PAGES) || 3
    });

    scraper.run().catch(console.error);
}

module.exports = AmazonScraper;
