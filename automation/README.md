# 🤖 DealTech365 - Sistema de Automatización

Sistema híbrido de automatización de ofertas para DealTech365 usando **Web Scraping**, **Firebase Firestore** y **Amazon Affiliate Links**.

---

## 📁 Estructura del Proyecto

```
automation/
├── scraper/
│   └── amazon-scraper.js       # Web scraper de Amazon
├── scripts/
│   └── import-to-firestore.js  # Importador a Firebase
├── api/
│   └── server.js               # API local (opcional)
├── data/
│   └── deals-latest-ES.json    # Datos scrapeados (generado)
├── admin-dashboard.html        # Dashboard de administración
├── database-schema.json        # Esquema de la base de datos
├── package.json                # Dependencias
├── .env.example                # Variables de entorno
└── README.md                   # Esta documentación
```

---

## 🚀 Setup Inicial

### 1. Instalar Dependencias

```bash
cd automation
npm install
```

### 2. Configurar Firebase

#### A) Obtener Service Account Key

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto **dealtech365**
3. Settings → Service Accounts
4. Click "Generate New Private Key"
5. Guarda el archivo como `firebase-admin-key.json` en la carpeta `automation/`

#### B) Configurar Firestore

1. En Firebase Console → Firestore Database
2. Crear base de datos en modo producción
3. Reglas de seguridad (temporal para desarrollo):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /deals/{deal} {
      allow read: if true;  // Público para lectura
      allow write: if request.auth != null;  // Solo autenticados
    }
    match /price_history/{entry} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `automation/`:

```env
# Región de Amazon
REGION=ES  # ES, US, UK, DE

# Affiliate Tags
AFFILIATE_TAG_ES=dealtech365-21
AFFILIATE_TAG_US=blackfridaytech-20

# Scraper Config
HEADLESS=true  # false para ver el navegador
MAX_PAGES=3
DELAY_MS=3000  # Delay entre requests (ms)

# Firebase (opcional si usas firebase-admin-key.json)
FIREBASE_PROJECT_ID=dealtech365
```

---

## 📖 Uso

### Opción 1: Scraping Manual

#### 1.1 Scrapear Amazon (España)

```bash
npm run scrape
# o
npm run scrape:es
```

#### 1.2 Scrapear Amazon (USA)

```bash
npm run scrape:us
```

#### 1.3 Ver navegador mientras scrapea (debug)

```bash
npm run scrape:headful
```

**Resultado:** Crea archivos en `data/`
- `deals-ES-2025-01-26T12-00-00.json`
- `deals-latest-ES.json`

---

### Opción 2: Importar a Firestore

Después de scrapear, importa a Firebase:

```bash
npm run import
```

**Qué hace:**
- ✅ Lee `data/deals-latest-ES.json`
- ✅ Añade productos nuevos a Firestore
- ✅ Actualiza precios de productos existentes
- ✅ Guarda historial de precios
- ✅ Desactiva ofertas obsoletas

---

### Opción 3: Proceso Completo (Scrape + Import)

```bash
npm run sync
```

**Ejecuta:**
1. Scraper de Amazon
2. Importación automática a Firestore
3. Todo en un solo comando

---

## 🎯 Flujo de Trabajo Recomendado

### Desarrollo / Testing

```bash
# 1. Scrapear con navegador visible (para ver qué pasa)
HEADLESS=false npm run scrape

# 2. Verificar datos generados
cat data/deals-latest-ES.json

# 3. Importar a Firestore
npm run import
```

### Producción / Automatización

```bash
# Ejecutar todo de una vez
npm run sync
```

---

## 🔄 Automatización con Cron Jobs

### Linux/Mac (crontab)

Edita el crontab:

```bash
crontab -e
```

Añade (ejecutar cada 6 horas):

```cron
0 */6 * * * cd /path/to/dealtech365/automation && npm run sync >> logs/cron.log 2>&1
```

### Windows (Task Scheduler)

1. Abre **Task Scheduler**
2. Create Basic Task
3. Trigger: **Daily** at 00:00, 06:00, 12:00, 18:00
4. Action: **Start a program**
5. Program: `C:\Program Files\nodejs\npm.cmd`
6. Arguments: `run sync`
7. Start in: `C:\Dealtech365\automation`

---

## 📊 Admin Dashboard

Abre el dashboard de administración:

```bash
# Opción 1: Abrir directamente
start admin-dashboard.html

# Opción 2: Servir con servidor local
npx http-server -p 8080
# Luego abre: http://localhost:8080/admin-dashboard.html
```

**Funciones del Dashboard:**
- 📊 Ver estadísticas en tiempo real
- 📦 Listar todas las ofertas
- ⚡ Ejecutar scraper/import (requiere backend)
- 🔄 Refrescar datos de Firestore

---

## 🛠️ Estructura de Datos

### Deal Object (Firestore)

```javascript
{
  "asin": "B0FCG2D89G",
  "name": "HP 15-fd2013ns Laptop",
  "brand": "HP",
  "category": "laptops",
  "basePrice": 1299,
  "currentPrice": 999,
  "discount": 23,
  "image": "https://...",
  "specs": {
    "ram": "32GB",
    "storage": "1TB SSD"
  },
  "affiliateLinks": {
    "EU": {
      "amazon": "https://www.amazon.es/dp/B0FCG2D89G?tag=dealtech365-21"
    },
    "US": {
      "amazon": "https://www.amazon.com/dp/B0FCG2D89G?tag=blackfridaytech-20"
    }
  },
  "active": true,
  "featured": false,
  "source": "scraper",  // manual | scraper | api | affiliate_feed
  "createdAt": "2025-01-26T10:00:00Z",
  "updatedAt": "2025-01-26T10:00:00Z",
  "lastPriceCheck": "2025-01-26T10:00:00Z",
  "metadata": {
    "scrapedFrom": "ES",
    "rating": 4.5,
    "reviewCount": 1234,
    "stockStatus": "available"
  }
}
```

---

## 🔍 Troubleshooting

### Error: "Cannot find module 'puppeteer'"

```bash
cd automation
npm install
```

### Error: "Firebase Admin not initialized"

Verifica que existe `firebase-admin-key.json` en la carpeta automation.

### Scraper no encuentra productos

1. Verifica la URL de Amazon (puede cambiar)
2. Ejecuta con `HEADLESS=false` para ver el navegador
3. Amazon puede bloquear el scraper temporalmente (espera 1 hora)

### Productos duplicados en Firestore

El sistema usa `ASIN` como identificador único. No debería haber duplicados. Si hay, ejecuta:

```bash
node scripts/clean-duplicates.js
```

---

## 📈 Próximos Pasos

### Fase 2: Mejoras

- [ ] Scraping de más categorías
- [ ] Integración con Keepa API
- [ ] Affiliate Feeds de Amazon Associates
- [ ] Notificaciones por email cuando hay nuevas ofertas
- [ ] Generación automática de contenido con GPT-4

### Fase 3: Producción

- [ ] Deploy del scraper en servidor (DigitalOcean, AWS Lambda)
- [ ] Cron jobs automáticos
- [ ] Monitoreo con Sentry
- [ ] Dashboard con autenticación

---

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs en `logs/cron.log`
2. Ejecuta con `HEADLESS=false` para debug visual
3. Verifica la configuración de Firebase

---

## ⚖️ Legal

**Importante:**
- Este scraper es para uso educativo y personal
- Respeta los Terms of Service de Amazon
- Usa delays apropiados entre requests (3+ segundos)
- No hagas scraping masivo (máx 3-5 páginas)
- Considera usar la API oficial de Amazon si necesitas datos en escala

---

## 📝 Changelog

### v1.0.0 (2025-01-26)
- ✅ Scraper básico de Amazon ES/US
- ✅ Importador a Firestore
- ✅ Dashboard de administración
- ✅ Historial de precios
- ✅ Sistema de fallback (Firestore → Local)

---

**DealTech365** - Automatización de Ofertas
