# 🚀 Roadmap de Mejoras - DealTech365

## Estado Actual ✅

**Lo que funciona:**
- ✅ 40 productos reales en 3 categorías (Audio, Smartphones, Gaming)
- ✅ Sistema de afiliados Amazon EU/US
- ✅ Newsletter con Netlify Forms
- ✅ Email hello@dealtech365.com configurado
- ✅ Dominio dealtech365.com activo
- ✅ i18n bilingüe (ES/EN) parcialmente implementado
- ✅ Blog con 6 artículos
- ✅ PWA configurada

**Lo que falta:**
- ⚠️ Scraper bloqueado por Amazon
- ⚠️ Sin actualización automática de precios
- ⚠️ Sin base de datos (todo en JSON estático)
- ⚠️ Falta categoría Laptops con productos
- ⚠️ Blog sin traducción completa al inglés

---

## 🎯 FASE 1: Base sólida (Semanas 1-2)

### 1.1 Implementar Amazon Product Advertising API

**Objetivo:** Reemplazar el scraper con la API oficial de Amazon

**Beneficios:**
- ✅ Datos oficiales y confiables
- ✅ No más bloqueos
- ✅ Precios en tiempo real
- ✅ Información completa de productos
- ✅ Imágenes de alta calidad

**Requisitos:**
1. Cuenta de Amazon Associates activa
2. Al menos 3 ventas en 180 días (para mantener acceso a API)
3. Registrarse en Amazon Product Advertising API

**Pasos de implementación:**

#### A) Registrarse en Amazon PA-API

1. **Ve a**: https://afiliados.amazon.es/assoc_credentials/home
2. **Sección**: "Product Advertising API"
3. **Solicita acceso** a la API
4. **Obtén tus credenciales**:
   - Access Key ID
   - Secret Access Key
   - Associate Tag (tu tag: `dealtech365-21`)

#### B) Instalar librería

```bash
cd automation
npm install paapi5-nodejs-sdk
```

#### C) Crear nuevo scraper con API

**Archivo:** `automation/scraper/amazon-api-scraper.js`

```javascript
const ProductAdvertisingAPIv1 = require('paapi5-nodejs-sdk');

// Configuración
const accessKey = process.env.AMAZON_ACCESS_KEY;
const secretKey = process.env.AMAZON_SECRET_KEY;
const partnerTag = 'dealtech365-21';

// Crear cliente
const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;
defaultClient.accessKey = accessKey;
defaultClient.secretKey = secretKey;
defaultClient.host = 'webservices.amazon.es'; // Para Amazon ES
defaultClient.region = 'eu-west-1';

const api = new ProductAdvertisingAPIv1.DefaultApi();

// Buscar productos por categoría
async function searchProducts(category, keywords) {
    const searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();

    searchItemsRequest.Keywords = keywords;
    searchItemsRequest.PartnerTag = partnerTag;
    searchItemsRequest.PartnerType = 'Associates';
    searchItemsRequest.Marketplace = 'www.amazon.es';
    searchItemsRequest.ItemCount = 10;
    searchItemsRequest.Resources = [
        'Images.Primary.Large',
        'ItemInfo.Title',
        'ItemInfo.Features',
        'Offers.Listings.Price',
        'Offers.Listings.SavingBasis',
    ];

    try {
        const response = await api.searchItems(searchItemsRequest);
        return parseProducts(response.SearchResult.Items, category);
    } catch (error) {
        console.error('Error fetching from Amazon API:', error);
        return [];
    }
}

// Parsear productos
function parseProducts(items, category) {
    return items.map(item => ({
        asin: item.ASIN,
        name: item.ItemInfo.Title.DisplayValue,
        brand: extractBrand(item.ItemInfo.Title.DisplayValue),
        category: category,
        currentPrice: parsePrice(item.Offers.Listings[0].Price.Amount),
        basePrice: parsePrice(item.Offers.Listings[0].SavingBasis?.Amount) || null,
        discount: calculateDiscount(item.Offers.Listings[0]),
        image: item.Images.Primary.Large.URL,
        affiliateLinks: {
            EU: {
                amazon: `https://www.amazon.es/dp/${item.ASIN}?tag=${partnerTag}`
            },
            US: {
                amazon: `https://www.amazon.com/dp/${item.ASIN}?tag=blackfridaytech-20`
            }
        },
        active: true,
        featured: false,
        source: 'amazon-api',
        metadata: {
            scrapedFrom: 'amazon-api',
            lastUpdated: new Date().toISOString()
        }
    }));
}

// Exportar
module.exports = { searchProducts };
```

#### D) Script de actualización automática

**Archivo:** `automation/scripts/update-products-api.js`

```javascript
const { searchProducts } = require('../scraper/amazon-api-scraper');
const fs = require('fs').promises;
const path = require('path');

const CATEGORIES = {
    laptops: 'laptop gaming',
    audio: 'auriculares bluetooth',
    smartphones: 'smartphone',
    gaming: 'accesorios gaming'
};

async function updateAllProducts() {
    console.log('🔄 Actualizando productos desde Amazon API...\n');

    const allDeals = [];

    for (const [category, keywords] of Object.entries(CATEGORIES)) {
        console.log(`📦 Buscando productos de ${category}...`);
        const products = await searchProducts(category, keywords);
        console.log(`✅ ${products.length} productos encontrados\n`);
        allDeals.push(...products);
    }

    // Guardar
    const output = {
        metadata: {
            updatedAt: new Date().toISOString(),
            region: 'ES',
            totalProducts: allDeals.length,
            source: 'amazon-api'
        },
        deals: allDeals
    };

    const filename = `deals-latest-ES.json`;
    await fs.writeFile(
        path.join(__dirname, '../data', filename),
        JSON.stringify(output, null, 2)
    );

    console.log(`💾 ${allDeals.length} productos guardados en ${filename}`);
}

updateAllProducts().catch(console.error);
```

#### E) Configurar variables de entorno

**Archivo:** `.env`

```bash
AMAZON_ACCESS_KEY=tu_access_key_aqui
AMAZON_SECRET_KEY=tu_secret_key_aqui
AMAZON_PARTNER_TAG_EU=dealtech365-21
AMAZON_PARTNER_TAG_US=blackfridaytech-20
```

**Archivo:** `.gitignore` (agregar)

```
.env
```

#### F) Script npm

**Archivo:** `automation/package.json`

```json
{
  "scripts": {
    "scrape": "node scraper/amazon-scraper.js",
    "api-update": "node scripts/update-products-api.js",
    "sync-web": "node scripts/sync-to-web.js"
  }
}
```

**Uso:**

```bash
npm run api-update  # Actualizar productos desde API
npm run sync-web    # Sincronizar a web
```

---

### 1.2 Configurar Firebase Firestore

**Objetivo:** Migrar de JSON estático a base de datos en tiempo real

**Beneficios:**
- ✅ Actualización instantánea de precios
- ✅ Historial de precios
- ✅ Escalable a millones de productos
- ✅ Filtros y búsquedas rápidas
- ✅ Gratis hasta 50k lecturas/día

**Pasos de implementación:**

#### A) Crear proyecto Firebase

1. **Ve a**: https://console.firebase.google.com
2. **Crear proyecto**: "DealTech365"
3. **Agregar app web**: Copia la configuración

#### B) Configurar Firestore

```javascript
// automation/firebase/config.js
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "dealtech365.firebaseapp.com",
  projectId: "dealtech365",
  storageBucket: "dealtech365.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };
```

#### C) Script para migrar datos

**Archivo:** `automation/scripts/migrate-to-firestore.js`

```javascript
const { db } = require('../firebase/config');
const { collection, doc, setDoc } = require('firebase/firestore');
const dealsData = require('../data/deals-latest-ES.json');

async function migrateToFirestore() {
    console.log('🔄 Migrando productos a Firestore...\n');

    for (const deal of dealsData.deals) {
        const docRef = doc(db, 'products', deal.asin);
        await setDoc(docRef, {
            ...deal,
            priceHistory: [{
                price: deal.currentPrice,
                date: new Date().toISOString()
            }]
        });
        console.log(`✅ ${deal.name}`);
    }

    console.log(`\n💾 ${dealsData.deals.length} productos migrados`);
}

migrateToFirestore();
```

#### D) Actualizar deals-service.js (ya existe)

Tu archivo `js/deals-service.js` ya está preparado para Firestore. Solo necesitas:

1. Agregar la configuración de Firebase al HTML
2. Descomentar el código de Firestore

**Archivo:** `index.html` (agregar antes de `</body>`)

```html
<!-- Firebase -->
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore-compat.js"></script>
<script>
  const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "dealtech365.firebaseapp.com",
    projectId: "dealtech365"
  };
  firebase.initializeApp(firebaseConfig);
</script>
```

---

## 🎯 FASE 2: Automatización (Semanas 3-4)

### 2.1 GitHub Actions para actualización automática

**Objetivo:** Actualizar productos automáticamente cada 12 horas

**Archivo:** `.github/workflows/update-products.yml`

```yaml
name: Update Products

on:
  schedule:
    - cron: '0 */12 * * *'  # Cada 12 horas
  workflow_dispatch:  # Trigger manual

jobs:
  update:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: |
          cd automation
          npm install

      - name: Update products from Amazon API
        env:
          AMAZON_ACCESS_KEY: ${{ secrets.AMAZON_ACCESS_KEY }}
          AMAZON_SECRET_KEY: ${{ secrets.AMAZON_SECRET_KEY }}
          FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
        run: |
          cd automation
          npm run api-update
          npm run sync-firestore

      - name: Commit changes
        run: |
          git config --local user.email "bot@dealtech365.com"
          git config --local user.name "DealTech365 Bot"
          git add automation/data/
          git commit -m "🤖 Auto-update products [$(date +'%Y-%m-%d %H:%M')]" || echo "No changes"
          git push
```

**Configurar secretos:**

1. Ve a: GitHub repo → Settings → Secrets → Actions
2. Agregar:
   - `AMAZON_ACCESS_KEY`
   - `AMAZON_SECRET_KEY`
   - `FIREBASE_API_KEY`

---

### 2.2 Sistema de Alertas de Precio

**Objetivo:** Notificar usuarios cuando baje el precio de un producto

**Implementación:**

#### A) Crear colección en Firestore

```javascript
// Estructura de datos
/alerts/{alertId}
  - email: string
  - asin: string
  - targetPrice: number
  - createdAt: timestamp
  - active: boolean
```

#### B) Cloud Function para chequear precios

**Archivo:** `functions/index.js`

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();
const db = admin.firestore();

// Chequear alertas cada 12 horas
exports.checkPriceAlerts = functions.pubsub
  .schedule('every 12 hours')
  .onRun(async (context) => {
    const alerts = await db.collection('alerts')
      .where('active', '==', true)
      .get();

    for (const alertDoc of alerts.docs) {
      const alert = alertDoc.data();
      const productDoc = await db.collection('products')
        .doc(alert.asin)
        .get();

      const product = productDoc.data();

      if (product.currentPrice <= alert.targetPrice) {
        await sendPriceAlert(alert.email, product);
        await alertDoc.ref.update({ active: false });
      }
    }
  });

async function sendPriceAlert(email, product) {
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: 'hello@dealtech365.com',
      pass: process.env.EMAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    from: 'DealTech365 <hello@dealtech365.com>',
    to: email,
    subject: `🔥 ¡Bajó el precio! ${product.name}`,
    html: `
      <h1>¡El precio bajó!</h1>
      <p><strong>${product.name}</strong></p>
      <p>Precio: <strong>${product.currentPrice}€</strong></p>
      <p>Descuento: <strong>${product.discount}%</strong></p>
      <a href="${product.affiliateLinks.EU.amazon}">Ver oferta</a>
    `
  });
}
```

#### C) Formulario en el sitio

**Agregar a cada producto:**

```html
<button class="btn-alert" data-asin="{{ product.asin }}">
  🔔 Crear alerta de precio
</button>

<script>
document.querySelectorAll('.btn-alert').forEach(btn => {
  btn.addEventListener('click', async () => {
    const asin = btn.dataset.asin;
    const email = prompt('¿A qué email enviamos la alerta?');
    const targetPrice = prompt('¿A qué precio quieres que te avisemos?');

    await firebase.firestore().collection('alerts').add({
      email,
      asin,
      targetPrice: parseFloat(targetPrice),
      createdAt: new Date(),
      active: true
    });

    alert('✅ Alerta creada! Te avisaremos cuando baje el precio.');
  });
});
</script>
```

---

## 🎯 FASE 3: Mejoras de UX (Mes 2)

### 3.1 Historial de Precios con Gráficas

**Librería:** Chart.js

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<canvas id="priceChart"></canvas>

<script>
async function loadPriceHistory(asin) {
  const doc = await firebase.firestore()
    .collection('products')
    .doc(asin)
    .get();

  const priceHistory = doc.data().priceHistory;

  new Chart(document.getElementById('priceChart'), {
    type: 'line',
    data: {
      labels: priceHistory.map(p => new Date(p.date).toLocaleDateString()),
      datasets: [{
        label: 'Precio (€)',
        data: priceHistory.map(p => p.price),
        borderColor: '#00C896',
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Historial de Precios'
        }
      }
    }
  });
}
</script>
```

---

### 3.2 Notificaciones Push (PWA)

**Service Worker** (ya tienes `sw.js`):

```javascript
// Agregar a sw.js
self.addEventListener('push', event => {
  const data = event.data.json();

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/images/icon-192x192.png',
    badge: '/images/badge.png',
    data: { url: data.url }
  });
});
```

**Suscribir usuario:**

```javascript
// En index.html
async function subscribeToPush() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'TU_VAPID_PUBLIC_KEY'
  });

  // Guardar suscripción en Firestore
  await firebase.firestore().collection('pushSubscriptions').add({
    subscription: subscription.toJSON(),
    createdAt: new Date()
  });
}
```

---

## 📊 Métricas de Éxito

**KPIs a medir:**

1. **Productos:**
   - Cantidad de productos activos
   - Porcentaje de descuentos >30%
   - Frecuencia de actualización

2. **Usuarios:**
   - Visitantes únicos/mes
   - Tasa de conversión (clicks en afiliados)
   - Suscriptores de newsletter
   - Alertas de precio creadas

3. **Ingresos:**
   - Comisiones de Amazon
   - CTR de enlaces de afiliados
   - Productos más vendidos

---

## 🛠️ Herramientas Recomendadas

**Desarrollo:**
- VS Code con extensiones: Firebase, ESLint
- Postman para probar Amazon API
- Firebase Local Emulator

**Monitoreo:**
- Google Analytics 4 (ya implementado)
- Firebase Analytics
- Sentry para errores
- Uptime Robot para monitoring

**Email:**
- SendGrid (100 emails/día gratis)
- Mailgun
- Amazon SES

---

## 💰 Costos Estimados

**Gratis:**
- ✅ Firebase Firestore (hasta 50k lecturas/día)
- ✅ Netlify (hosting + forms)
- ✅ GitHub Actions (2000 min/mes gratis)
- ✅ Amazon PA-API (requiere 3 ventas/180 días)

**De pago (opcional):**
- 📧 SendGrid Pro: $15/mes (hasta 100k emails)
- ☁️ Firebase Blaze: Pay-as-you-go
- 🔄 ScraperAPI (si no usas Amazon API): $50/mes

**Total estimado: $0-15/mes** (dependiendo de tráfico)

---

## 🚀 Siguiente Paso Recomendado

**Empezar por:**

1. ✅ **Amazon PA-API** (soluciona scraper bloqueado)
2. ✅ **Firebase Firestore** (moderniza tu stack)
3. ✅ **GitHub Actions** (automatización gratuita)

¿Por cuál quieres que empiece? 😊
