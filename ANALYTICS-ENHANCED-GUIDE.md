# 📊 GUÍA COMPLETA: Sistema de Analytics Mejorado

**DealTech365 - Enhanced Analytics System**

---

## 🎯 ¿QUÉ ES ESTO?

Has recibido un sistema de Analytics MEJORADO que incluye:

✅ **Todo lo básico** (tracking de eventos, productos, newsletter)
✅ **E-commerce tracking avanzado** (estimación de ingresos por comisiones)
✅ **Scroll depth tracking** (qué tan profundo leen los usuarios)
✅ **Time on page tracking** (cuánto tiempo permanecen)
✅ **Outbound link tracking** (clicks en links externos)
✅ **UTM parameter tracking** (seguimiento de campañas)
✅ **Engagement scoring** (puntuación de engagement del usuario)
✅ **Error tracking** (errores JavaScript)
✅ **Performance tracking** (velocidad de carga)
✅ **Conversion funnels** (seguimiento del viaje del usuario)

---

## 🚀 QUICK START

### Opción 1: Usar el Sistema Mejorado (Recomendado para sitios en producción)

```bash
# 1. Reemplaza el archivo actual con el mejorado
copy js\analytics-enhanced.js js\analytics.js

# 2. Edita tu Measurement ID en la línea 20
# Abre: js/analytics.js
# Cambia: const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';
# Por tu ID real de Google Analytics

# 3. Reconstruye
npm run build

# 4. Sube actualizado
npm run deploy:prepare
```

### Opción 2: Mantener Ambos (Para testing)

Puedes mantener ambos archivos:
- `analytics.js` - Versión básica (actual)
- `analytics-enhanced.js` - Versión mejorada

Y cambiar en `index.html` cuál usar.

---

## 📋 COMPARACIÓN: Básico vs Mejorado

### Sistema BÁSICO (analytics.js):
```
✅ Page views
✅ Product clicks
✅ Newsletter signup
✅ Search
✅ Favorites
✅ Cookie consent
```

### Sistema MEJORADO (analytics-enhanced.js):
```
✅ Todo lo del básico +
✅ Scroll depth tracking (25%, 50%, 75%, 90%, 100%)
✅ Time on page (10s, 30s, 60s, 120s, 300s)
✅ Outbound link tracking
✅ UTM campaign tracking
✅ E-commerce enhanced (revenue estimation)
✅ Engagement scoring
✅ Funnel step tracking
✅ Error tracking (JavaScript errors)
✅ Performance metrics (page load speed)
✅ Session tracking (session duration, engagement)
✅ Social share tracking
✅ Filter usage tracking
✅ Notification signup tracking
```

---

## 🔧 CONFIGURACIÓN DETALLADA

### 1. Configurar Measurement ID

**Archivo**: `js/analytics-enhanced.js` (o `js/analytics.js` si lo reemplazaste)

**Línea 20**:
```javascript
const CONFIG = {
  GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX', // ← Cambia esto por tu ID real
  // ...
};
```

**Obtener tu ID**:
1. Ve a https://analytics.google.com
2. Admin → Data Streams → Web
3. Copia el Measurement ID (G-XXXXXXXXXX)

### 2. Configurar Tasas de Comisión

El sistema estima los ingresos por comisiones de afiliados.

**Líneas 30-35**:
```javascript
COMMISSION_RATES: {
  laptops: 0.02,      // 2% comisión
  smartphones: 0.015,  // 1.5% comisión
  audio: 0.03,        // 3% comisión
  gaming: 0.025       // 2.5% comisión
}
```

**Personaliza** según tus tasas reales de Amazon Associates u otros programas.

### 3. Modo Debug

Para ver logs en la consola durante desarrollo:

**Línea 23**:
```javascript
DEBUG: true,  // Muestra logs en consola
```

**En producción**:
```javascript
DEBUG: false, // No muestra logs (mejor performance)
```

---

## 📊 EVENTOS TRACKEADOS

### 1. Page View
**Automático** - Se dispara al cargar cada página
```javascript
Analytics.trackPageView('Página de Laptops', '/pages/laptops.html');
```

### 2. Product View
**Cuando un usuario ve un producto**
```javascript
Analytics.trackProductView({
  name: 'MacBook Air M2',
  brand: 'Apple',
  category: 'laptops',
  basePrice: 1199,
  discount: 25,
  asin: 'B0B3C2R8MP'
});
```

### 3. Product Click (Affiliate Link)
**Cuando hace click en "Ver oferta"**
```javascript
Analytics.trackProductClick(product, 'amazon'); // retailer: amazon, newegg, etc.
```

**Datos enviados**:
- Nombre del producto
- Categoría
- Precio final
- Descuento
- Retailer (Amazon, Newegg, etc.)
- **Estimación de comisión** (calculado automáticamente)

### 4. Search
**Cuando busca productos**
```javascript
Analytics.trackSearch('macbook', 15); // término, número de resultados
```

### 5. Filter Applied
**Cuando usa filtros**
```javascript
Analytics.trackFilter('category', 'laptops');
Analytics.trackFilter('price', '500-1000');
```

### 6. Add to Wishlist
```javascript
Analytics.trackAddToWishlist(product);
```

### 7. Newsletter Signup
```javascript
Analytics.trackNewsletterSignup('user@example.com', 'footer');
```

### 8. Notification Signup
```javascript
Analytics.trackNotificationSignup('laptop-001', 'MacBook Air M2');
```

### 9. Social Share
```javascript
Analytics.trackSocialShare('twitter', {
  type: 'product',
  id: 'laptop-001'
});
```

### 10. Scroll Depth
**Automático** - Se dispara al alcanzar:
- 25% de scroll
- 50% de scroll
- 75% de scroll
- 90% de scroll
- 100% de scroll

### 11. Time on Page
**Automático** - Se dispara a los:
- 10 segundos
- 30 segundos
- 60 segundos
- 120 segundos (2 minutos)
- 300 segundos (5 minutos)

### 12. Outbound Links
**Automático** - Trackea todos los clicks en links externos

### 13. UTM Parameters
**Automático** - Detecta y almacena parámetros de campaña:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

### 14. Engagement Score
**Automático** - Calcula puntuación de engagement basado en acciones:
- Page view: +1 punto
- Select item: +10 puntos
- Affiliate click: +15 puntos
- Add to wishlist: +8 puntos
- Search: +5 puntos
- Filter: +3 puntos
- Newsletter signup: +20 puntos
- Scroll depth: +2 puntos
- Time on page: +3 puntos
- Share: +12 puntos

### 15. Funnel Steps
```javascript
Analytics.trackFunnelStep('landing'); // Usuario llega al sitio
Analytics.trackFunnelStep('browse_products'); // Navega productos
Analytics.trackFunnelStep('view_product'); // Ve detalles de producto
Analytics.trackFunnelStep('click_affiliate'); // Hace click en afiliado
Analytics.trackFunnelStep('newsletter_signup'); // Se suscribe
```

### 16. Performance Metrics
**Automático** - Al cargar la página:
- Page load time
- DOM ready time
- Server response time
- DNS lookup time
- TCP connection time

### 17. Error Tracking
**Automático** - Captura:
- JavaScript errors
- Promise rejections

---

## 🎨 CÓMO INTEGRAR EN TU CÓDIGO

### En `deals.js` - Product Click Handler

```javascript
// Cuando un usuario hace click en "Ver oferta"
function handleProductClick(product, retailer) {
  // Track en Analytics
  if (window.Analytics) {
    Analytics.trackProductClick(product, retailer);
  }

  // Abrir link
  window.open(product.affiliateLinks[region][retailer], '_blank');
}
```

### En `search.js` - Search Handler

```javascript
function handleSearch(query) {
  const results = searchProducts(query);

  // Track en Analytics
  if (window.Analytics) {
    Analytics.trackSearch(query, results.length);
  }

  displayResults(results);
}
```

### En `filters.js` - Filter Handler

```javascript
function applyFilter(filterType, filterValue) {
  // Track en Analytics
  if (window.Analytics) {
    Analytics.trackFilter(filterType, filterValue);
  }

  // Aplicar filtro
  filterProducts(filterType, filterValue);
}
```

### En Newsletter Form

```javascript
function handleNewsletterSubmit(email) {
  // Track en Analytics
  if (window.Analytics) {
    Analytics.trackNewsletterSignup(email, 'footer');
  }

  // Enviar a servidor
  submitNewsletter(email);
}
```

---

## 📈 INFORMES PERSONALIZADOS EN GA4

### Informe 1: Revenue Estimation (Ingresos Estimados)

**Crear en GA4:**
1. **Explorar** → **Exploración libre**
2. **Dimensiones**:
   - `event_name` = `affiliate_click`
   - `retailer`
   - `product_category`
3. **Métricas**:
   - `event_count`
   - `estimated_commission` (parámetro personalizado)
4. **Fórmula calculada**:
   - `SUM(estimated_commission)` = Ingresos estimados totales

**Resultado**: Verás cuánto has ganado (estimado) por categoría y retailer.

### Informe 2: Engagement Score Analysis

1. **Explorar** → **Exploración libre**
2. **Dimensiones**:
   - `page_path`
   - `session_duration` (agrupado en rangos)
3. **Métricas**:
   - `AVG(engagement_score)` (promedio de puntuación)
   - `event_count`

**Resultado**: Verás qué páginas generan más engagement.

### Informe 3: Scroll & Time Analysis

1. **Explorar** → **Exploración libre**
2. **Dimensiones**:
   - `event_name` = `scroll_depth`
   - `percent` (25, 50, 75, 90, 100)
3. **Métricas**:
   - `event_count`

**Resultado**: Verás qué porcentaje de usuarios llega a cada profundidad.

### Informe 4: Affiliate Performance

1. **Explorar** → **Exploración libre**
2. **Dimensiones**:
   - `product_name`
   - `retailer`
3. **Métricas**:
   - `event_count` (para `affiliate_click`)
   - `SUM(estimated_revenue)`

**Resultado**: Productos y retailers que generan más clicks y revenue.

### Informe 5: Conversion Funnel

1. **Explorar** → **Análisis de embudo**
2. **Pasos**:
   1. `page_view` (homepage)
   2. `funnel_step` where `step_name` = `browse_products`
   3. `funnel_step` where `step_name` = `view_product`
   4. `affiliate_click`
   5. `sign_up` (newsletter)

**Resultado**: Verás el % de usuarios que completa cada paso.

---

## 🎯 MÉTRICAS CLAVE A MONITOREAR

### Diarias:
- ✅ **Usuarios activos** (cuántos visitantes hoy)
- ✅ **Affiliate clicks** (cuántos clicks en "Ver oferta")
- ✅ **Revenue estimado** (ingresos estimados del día)
- ✅ **Newsletter signups** (nuevos suscriptores)

### Semanales:
- ✅ **Top products** (productos más clickeados)
- ✅ **Top retailers** (qué retailer genera más clicks)
- ✅ **Engagement score promedio** (qué tan enganchados están)
- ✅ **Scroll depth promedio** (qué tan profundo leen)
- ✅ **Time on page promedio** (cuánto tiempo permanecen)

### Mensuales:
- ✅ **Conversion rate** (clicks / visitantes)
- ✅ **Newsletter conversion rate** (signups / visitantes)
- ✅ **Bounce rate** (% que se va sin interactuar)
- ✅ **Returning users** (usuarios que vuelven)
- ✅ **Revenue total estimado** (ingresos del mes)

---

## 🔒 PRIVACIDAD Y GDPR

El sistema mejorado mantiene **total compliance** con GDPR/CCPA:

✅ **Solo carga si el usuario acepta** cookies analíticas
✅ **Anonimiza IPs** automáticamente
✅ **Elimina cookies** si el usuario rechaza
✅ **No permite personalización de anuncios** (GDPR)
✅ **Respeta "Do Not Track"** del navegador

---

## 🐛 TROUBLESHOOTING

### "Los eventos no aparecen en GA4"

**1. Verifica en Tiempo Real:**
- GA4 → Informes → Tiempo real
- Realiza una acción en tu sitio
- Debe aparecer INMEDIATAMENTE en Tiempo Real
- Si no aparece, hay un problema de configuración

**2. Verifica la consola:**
```javascript
// Abre consola (F12)
// Verás mensajes como:
[Analytics] Enhanced Analytics module loaded. Waiting for consent...
[Analytics] Analytics cookies accepted. Initializing GA4...
[Analytics] Google Analytics 4 initialized successfully
[Analytics] GA4 Event tracked: affiliate_click {...}
```

**3. Verifica el Measurement ID:**
- Abre `js/analytics.js`
- Verifica que `GA4_MEASUREMENT_ID` es correcto (G-XXXXXXXXXX)

### "Estimated revenue no aparece"

Los parámetros personalizados (como `estimated_commission`) requieren configuración:

1. GA4 → **Admin** → **Definiciones personalizadas**
2. Click en **"Crear dimensión personalizada"**
3. Nombre: `Estimated Commission`
4. Parámetro de evento: `estimated_commission`
5. Tipo: `Número`

Repite para:
- `estimated_revenue`
- `engagement_score`
- `retailer`

### "Scroll depth no trackea"

Verifica que:
1. La página tiene suficiente contenido para hacer scroll
2. El usuario aceptó cookies analíticas
3. En consola (con DEBUG: true) ves mensajes de scroll_depth

---

## 💡 CONSEJOS PRO

### 1. Usa UTM Parameters en campañas

Cuando compartas en redes sociales:
```
https://dealtech365.com?utm_source=twitter&utm_medium=social&utm_campaign=black_friday_2025
```

Verás en GA4 de dónde viene cada visitante.

### 2. Configura alertas

En GA4:
- **Admin** → **Alertas personalizadas**
- Alerta cuando `affiliate_click` > 100 en un día
- Alerta cuando `sign_up` < 5 en un día (indicador de problema)

### 3. Crea cohortes

GA4 → **Explorar** → **Análisis de cohortes**
- Cohort 1: Usuarios que hicieron click en producto
- Cohort 2: Usuarios que NO hicieron click
- Compara retention entre ambos

### 4. Integra con Data Studio (Looker Studio)

1. Ve a https://lookerstudio.google.com
2. Crea nuevo informe
3. Conecta con GA4
4. Crea dashboard personalizado con:
   - Revenue chart (ingresos estimados por día)
   - Top products table
   - Conversion funnel
   - Engagement score trend

---

## 📦 ARCHIVOS DEL SISTEMA

```
js/
├── analytics.js              ← Versión básica (actual)
├── analytics-enhanced.js     ← Versión mejorada (NUEVO)
└── analytics.min.js          ← Minificado (se genera con npm run build)
```

**Para usar el mejorado:**
1. Opción A: Renombra `analytics.js` a `analytics-basic.js` (backup)
2. Opción B: Copia `analytics-enhanced.js` a `analytics.js`
3. Opción C: Actualiza `index.html` para cargar `analytics-enhanced.min.js`

---

## 🚀 SIGUIENTE PASO

1. **Decide** qué versión usar:
   - **Básica**: Si quieres simplicidad
   - **Mejorada**: Si quieres datos avanzados (recomendado)

2. **Configura** tu Measurement ID en la línea 20

3. **Rebuild**:
   ```bash
   npm run build
   npm run deploy:prepare
   ```

4. **Sube** al servidor:
   - Sube `deploy-ready/` a cPanel

5. **Verifica** en GA4 Tiempo Real

6. **Espera 24-48 horas** para datos históricos

---

## 📚 RECURSOS

- **Guía básica**: [GA4-SETUP-GUIDE.md](GA4-SETUP-GUIDE.md)
- **Guía mejorada**: Este archivo
- **GA4 Documentation**: https://support.google.com/analytics/
- **Custom parameters**: https://developers.google.com/analytics/devguides/collection/ga4/custom-parameters

---

**¡Tu sistema de Analytics está listo para nivel PRO!** 📊🚀

Con este sistema podrás:
- Medir el ROI real de tu sitio de afiliados
- Identificar qué productos vender más
- Optimizar el funnel de conversión
- Entender el comportamiento de tus usuarios
- Tomar decisiones basadas en datos

**Última actualización**: 2025-11-19
**Versión**: 2.0.0 Enhanced
