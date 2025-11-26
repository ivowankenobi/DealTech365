# 🔄 Workflow de Automatización - DealTech365

Este documento explica el flujo completo de automatización, desde el scraping hasta la publicación.

---

## 📊 Estado Actual del Sistema

✅ **Scraper funcionando**: 88 productos extraídos
✅ **Sincronización automática a web**: deals.js actualizado
✅ **Precios correctos**: basePrice + discount calculados
✅ **Enlaces de afiliado**: ES y US configurados

---

## 🚀 Flujo de Trabajo Completo

### 1. Scraping de Amazon (Automático)

```bash
npm run scrape
```

**Qué hace:**
- ✅ Abre navegador headless (Puppeteer)
- ✅ Scrapea Amazon ES en categorías: laptops, audio, smartphones
- ✅ Extrae: ASIN, nombre, marca, precios, descuento, imagen, rating
- ✅ Filtra productos con descuento ≥ 10%
- ✅ Genera affiliate links automáticos
- ✅ Guarda en: `data/deals-ES-YYYY-MM-DD.json`
- ✅ Copia a: `data/deals-latest-ES.json`

**Tiempo:** ~60-90 segundos
**Productos típicos:** 80-100

---

### 2. Sincronización a Web (Automático)

```bash
npm run sync-web
```

**Qué hace:**
- ✅ Lee `data/deals-latest-ES.json`
- ✅ Agrupa por categoría (audio, smartphones, etc.)
- ✅ Ordena por descuento (mayor primero)
- ✅ Limita a top 20 por categoría
- ✅ Extrae specs automáticamente (RAM, storage, screen, etc.)
- ✅ Genera código JavaScript válido
- ✅ Crea backup automático del archivo anterior
- ✅ Actualiza `js/deals.js` con nuevos productos
- ✅ Incluye función `generateDeals()` para calcular precios

**Resultado:**
- Archivo `js/deals.js` actualizado
- Backup en `js/deals.backup.[timestamp].js`
- Web muestra precios correctos automáticamente

---

### 3. Actualización Completa (Un solo comando)

```bash
npm run update
```

**Ejecuta automáticamente:**
1. `npm run scrape` → Scrapea Amazon
2. `npm run sync-web` → Actualiza web

**Tiempo total:** ~90 segundos
**Resultado:** Web actualizada con productos frescos

---

## 📋 Comandos Disponibles

| Comando | Descripción | Tiempo |
|---------|-------------|--------|
| `npm run scrape` | Solo scraping de Amazon ES | 60-90s |
| `npm run scrape:us` | Scraping de Amazon US | 60-90s |
| `npm run scrape:headful` | Scraping con navegador visible (debug) | 60-90s |
| `npm run sync-web` | Solo sincronización a web | 5s |
| `npm run update` | Scraping + Sincronización web | 90s |
| `npm run sync` | Scraping + Import a Firestore | 90s+ |
| `npm run import` | Solo importar a Firestore | 10s |

---

## 🔄 Automatización con Cron Jobs

### Windows (Task Scheduler)

Crear tarea para ejecutar cada 6 horas:

1. Abrir **Task Scheduler**
2. Create Basic Task → "DealTech365 Update"
3. Trigger: **Daily**
4. Repeat every: **6 hours**
5. Action: **Start a program**
   - Program: `C:\\Program Files\\nodejs\\npm.cmd`
   - Arguments: `run update`
   - Start in: `C:\\Dealtech365\\automation`
6. ✅ Done

---

### Linux/Mac (crontab)

```bash
crontab -e
```

Añadir:

```cron
# Ejecutar cada 6 horas (0:00, 6:00, 12:00, 18:00)
0 */6 * * * cd /path/to/Dealtech365/automation && npm run update >> logs/cron.log 2>&1
```

---

## 📊 Estructura de Datos

### Producto Scrapeado (JSON)

```json
{
  "asin": "B0B5GP9FXN",
  "name": "JBL Tune Flex TWS, Auriculares...",
  "brand": "JBL",
  "category": "audio",
  "basePrice": 99.99,
  "currentPrice": 48,
  "discount": 52,
  "image": "https://m.media-amazon.com/images/I/...",
  "affiliateLinks": {
    "EU": {
      "amazon": "https://www.amazon.es/dp/B0B5GP9FXN?tag=dealtech365-21"
    },
    "US": {
      "amazon": "https://www.amazon.com/dp/B0B5GP9FXN?tag=blackfridaytech-20"
    }
  },
  "active": true,
  "featured": true,
  "source": "scraper",
  "metadata": {
    "scrapedFrom": "ES",
    "rating": 4.5,
    "reviewCount": 1234,
    "stockStatus": "available"
  }
}
```

### Producto en Web (deals.js)

```javascript
{
  name: 'JBL Tune Flex TWS, Auriculares...',
  brand: 'JBL',
  basePrice: 99.99,
  discount: 52,
  image: 'https://m.media-amazon.com/images/I/...',
  asin: 'B0B5GP9FXN',
  specs: {
    bluetooth: 'Bluetooth 5.4',
    battery: '24h'
  },
  affiliateLinks: {
    US: {
      amazon: 'https://www.amazon.com/dp/B0B5GP9FXN?tag=blackfridaytech-20'
    },
    EU: {
      amazon: 'https://www.amazon.es/dp/B0B5GP9FXN?tag=dealtech365-21'
    }
  }
}
```

La función `generateDeals()` calcula automáticamente:
- `finalPrice = basePrice * (1 - discount / 100)`
- `savings = basePrice - finalPrice`
- Añade `currency`, `currencySymbol`, `affiliateLink`

---

## ⚙️ Configuración

### Variables de Entorno (`.env`)

```env
# Región de Amazon
REGION=ES

# Affiliate Tags
AFFILIATE_TAG_ES=dealtech365-21
AFFILIATE_TAG_US=blackfridaytech-20

# Scraper Settings
HEADLESS=true           # false para ver navegador
MAX_PAGES=3             # Páginas a scrapear por categoría
DELAY_MS=3000           # Delay entre requests (ms)
```

### Categorías Scrapeadas

Definidas en `scraper/amazon-scraper.js`:

```javascript
const searchConfig = {
  laptops: {
    query: 'laptop',
    refinements: 'n:937957031,p_36:50000-200000'
  },
  audio: {
    query: 'auriculares',
    refinements: 'n:937957031'
  },
  smartphones: {
    query: 'smartphone',
    refinements: 'n:937957031'
  }
};
```

Para añadir categorías: editar `amazon-scraper.js` línea 260-280.

---

## 🎯 Próximos Pasos

### ✅ Completado

- [x] Scraper de Amazon ES
- [x] Extracción de precios y descuentos
- [x] Generación de affiliate links
- [x] Sincronización automática a web
- [x] Extracción de specs desde nombre
- [x] Deduplicación por ASIN
- [x] Backup automático de deals.js

### 🚧 En Progreso

- [ ] Firebase Firestore (opcional)
- [ ] Scraper de Amazon US, UK, DE
- [ ] Categorías adicionales (tablets, monitores, gaming)

### 📅 Futuro

- [ ] Keepa API para historial de precios
- [ ] Amazon Affiliate Feeds
- [ ] Content generation con GPT-4
- [ ] Email notifications
- [ ] Price alerts
- [ ] SEO automation

---

## 📈 Estadísticas Actuales

**Último scraping:** 2025-11-26
**Total productos:** 88
**Categorías:** audio (53), smartphones (39), laptops (0)
**Descuento promedio:** 37.6%
**Descuento máximo:** 84%
**Tiempo total:** 67.8s
**Errores:** 0

---

## 🔍 Troubleshooting

### El scraper no encuentra productos

**Causa:** Amazon bloqueó temporalmente
**Solución:**
1. Esperar 1 hora
2. Ejecutar con `npm run scrape:headful` para ver qué pasa
3. Aumentar `DELAY_MS` en `.env`

### Precios aparecen como "undefined" en web

**Causa:** El archivo deals.js no tiene la función `generateDeals()`
**Solución:**
```bash
npm run sync-web  # Regenera deals.js con la función
```

### Productos duplicados

**Causa:** ASIN duplicados en scraping
**Solución:** El script ya deduplica por ASIN automáticamente

### Specs no se extraen correctamente

**Causa:** Formato de nombre del producto no reconocido
**Solución:** Editar `sync-to-web.js` función `extractSpecs()` línea 35-70

---

## 📝 Logs

### Ver logs de scraping

```bash
cat logs/scraper.log
```

### Ver logs de cron job

```bash
tail -f logs/cron.log
```

---

## 💡 Best Practices

1. ✅ **Ejecutar máximo 4 veces al día** para evitar bloqueos de Amazon
2. ✅ **Usar DELAY_MS mínimo de 3000ms** entre requests
3. ✅ **Revisar logs regularmente** para detectar errores
4. ✅ **Hacer backup de `data/` periódicamente** (los scraped JSONs)
5. ✅ **Probar con `headful` mode** antes de poner en producción

---

## 🆘 Soporte

Si algo falla:
1. Revisar logs en `logs/`
2. Ejecutar `npm run scrape:headful` para debug visual
3. Verificar `.env` configuración
4. Revisar [README.md](README.md) completo

---

**DealTech365 Automation v1.0** - Web Scraping sin API de Amazon
Última actualización: 2025-11-26
