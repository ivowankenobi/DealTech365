# 🚀 Guía de Deployment - DealTech365.com

Instrucciones paso a paso para lanzar tu sitio en **dealtech365.com**

---

## ✅ ESTADO ACTUAL

**Dominio**: dealtech365.com ✅
**Hosting**: Ya configurado ✅
**Código**: 98% listo para producción ⚡

---

## 📋 CHECKLIST PRE-DEPLOYMENT (5 pasos)

### Paso 1: Generar Iconos (15 minutos)

1. **Abre en tu navegador**: [generate-icons.html](generate-icons.html)
2. Click en **"Generar Todos los Iconos"**
3. **Descarga los iconos críticos** (click derecho → Guardar imagen como):
   - ⚠️ **CRÍTICO**: `icon-192x192.png` → guardar en `/images/`
   - ⚠️ **CRÍTICO**: `icon-512x512.png` → guardar en `/images/`
   - **Recomendado**: `favicon-16x16.png` → guardar en `/images/`
   - **Recomendado**: `favicon-32x32.png` → guardar en `/images/`
   - **Recomendado**: `apple-touch-icon.png` → guardar en `/images/`

4. **Favicon.ico** (opcional pero recomendado):
   - Ve a https://favicon.io/favicon-converter/
   - Sube `icon-192x192.png`
   - Descarga el favicon.ico generado
   - Guárdalo en la **raíz del proyecto** (junto a index.html)

**Resultado**: Tienes los iconos mínimos necesarios para PWA.

---

### Paso 2: Crear OG Image (10 minutos)

El Open Graph image se muestra cuando compartes tu sitio en redes sociales.

**Opción A - Rápida (Canva)**:
1. Ve a https://www.canva.com
2. Busca template: "Facebook Post" o crea diseño 1200x630px
3. Usa estos elementos:
   - Fondo negro (#000000)
   - Texto grande: **"DealTech365"** en verde (#22C55E)
   - Subtítulo: "Ofertas en Tecnología Todo el Año"
   - Emoji: 💎 o 🛍️
4. Descarga como `og-image.jpg`
5. Guárdalo en `/images/og-image.jpg`

**Opción B - Muy Rápida (Placeholder)**:
Por ahora puedes usar el mismo `icon-512x512.png` renombrado como `og-image.jpg` en `/images/`

---

### Paso 3: Configurar Google Analytics (15 minutos)

**Si no tienes cuenta de Google Analytics**:
1. Ve a https://analytics.google.com
2. Click **"Empezar a medir"**
3. Crea cuenta y propiedad llamada "DealTech365"
4. Agrega flujo de datos web: `https://dealtech365.com`
5. Copia tu **Measurement ID** (formato: `G-XXXXXXXXXX`)

**Actualizar el código**:
1. Abre: [js/analytics.js](js/analytics.js)
2. Ve a la **línea 10**
3. Reemplaza:
   ```javascript
   const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with real ID
   ```
   Por:
   ```javascript
   const GA4_MEASUREMENT_ID = 'G-TU-ID-REAL'; // ← Pega tu ID aquí
   ```
4. Guarda el archivo

**Si NO quieres usar Analytics ahora**:
- Puedes lanzar sin él
- Los usuarios podrán navegar normalmente
- Solo no tendrás estadísticas

---

### Paso 4: Build Final (2 minutos)

Ejecuta el comando para minificar todos los archivos:

```bash
npm run build
```

**Verificar que funcionó**:
```bash
ls -lh css/*.min.css js/*.min.js
```

Deberías ver:
- ✅ `css/styles.min.css` (21 KB)
- ✅ `js/region.min.js` (3.6 KB)
- ✅ `js/cookie-consent.min.js` (6.0 KB)
- ✅ `js/analytics.min.js` (2.8 KB)
- ✅ `js/deals.min.js` (19 KB)

---

### Paso 5: Test Local (5 minutos)

Antes de subir, prueba la versión de producción:

1. Abre en tu navegador: [index.production.html](index.production.html)

2. **Pruebas críticas**:
   - [ ] La página carga correctamente
   - [ ] Cookie consent banner aparece
   - [ ] Puedes hacer click en "Aceptar cookies"
   - [ ] Los filtros de productos funcionan
   - [ ] Puedes agregar favoritos (corazón funciona)
   - [ ] El formulario de newsletter responde
   - [ ] No hay errores en consola (F12 → Console)

3. **Si algo falla**:
   - Revisa la consola del navegador (F12)
   - Verifica que los archivos `.min.js` y `.min.css` existen
   - Si un archivo específico da error, usa la versión sin minificar temporalmente

---

## 📦 ARCHIVOS A SUBIR AL HOSTING

### Estructura de carpetas a subir:

```
/ (raíz del hosting)
├── index.production.html         ← RENOMBRAR a "index.html" al subir
├── sitemap.xml                    ← SEO
├── robots.txt                     ← SEO
├── manifest.json                  ← PWA
├── favicon.ico                    ← (si lo creaste)
│
├── css/
│   └── styles.min.css            ← Solo el minificado
│
├── js/
│   ├── region.min.js             ← Solo los minificados
│   ├── cookie-consent.min.js
│   ├── analytics.min.js
│   └── deals.min.js
│
├── images/
│   ├── icon-192x192.png          ⚠️ CRÍTICO
│   ├── icon-512x512.png          ⚠️ CRÍTICO
│   ├── favicon-16x16.png         (recomendado)
│   ├── favicon-32x32.png         (recomendado)
│   ├── apple-touch-icon.png      (recomendado)
│   ├── og-image.jpg              (recomendado)
│   ├── logo.svg                  (opcional)
│   └── [todas las imágenes de productos existentes]
│
├── pages/
│   ├── favorites.html
│   ├── notifications.html
│   ├── edit-profile.html
│   ├── language.html
│   ├── theme.html
│   ├── about.html
│   ├── contact.html
│   ├── privacy-policy.html
│   ├── terms.html
│   └── affiliate-disclosure.html
│
└── blog/
    ├── laptops-black-friday-2025.html
    ├── gadgets-imprescindibles-2025.html
    ├── auriculares-premium-descuento.html
    ├── smartphones-cual-comprar.html
    ├── top-accesorios-gaming.html
    └── consejos-black-friday.html
```

### ⚠️ IMPORTANTE: Archivos a NO subir

**NO subas estos archivos** (son solo para desarrollo):
- ❌ `index.html` (versión de desarrollo)
- ❌ `css/styles.css` (sin minificar)
- ❌ `js/region.js`, `js/cookie-consent.js`, etc. (sin minificar)
- ❌ `node_modules/` (carpeta de npm)
- ❌ `package.json`, `package-lock.json`
- ❌ `.git/` (si usas git)
- ❌ Archivos `.md` (documentación)
- ❌ `generate-icons.html` (herramienta de desarrollo)

---

## 🌐 MÉTODOS DE DEPLOYMENT

### Opción 1: FTP/SFTP (Más común)

Si tu hosting usa FTP (FileZilla, Cyberduck, etc.):

1. **Conecta a tu hosting**:
   - Host: (proporcionado por tu hosting)
   - Usuario: (proporcionado por tu hosting)
   - Contraseña: (proporcionado por tu hosting)
   - Puerto: 21 (FTP) o 22 (SFTP)

2. **Navega a la carpeta pública**:
   - Usualmente es `/public_html/` o `/www/` o `/htdocs/`

3. **Sube los archivos**:
   - Sube toda la estructura de carpetas
   - **IMPORTANTE**: Renombra `index.production.html` → `index.html`

4. **Configurar archivo principal**:
   ```
   Asegúrate de que index.html esté en la raíz:
   /public_html/index.html ✅
   ```

---

### Opción 2: cPanel File Manager

Si tu hosting tiene cPanel:

1. **Accede a cPanel**
2. Click en **"Administrador de Archivos"** (File Manager)
3. Ve a `/public_html/`
4. Click **"Cargar"** (Upload)
5. Sube todos los archivos manteniendo la estructura de carpetas
6. Renombra `index.production.html` → `index.html`

---

### Opción 3: Git Deploy (Si tu hosting lo soporta)

Si tu hosting permite deploy desde Git:

1. **Sube tu código a GitHub**:
   ```bash
   git add .
   git commit -m "Ready for production - DealTech365"
   git push origin main
   ```

2. **Configura el deploy**:
   - Conecta tu hosting con GitHub
   - Configura el build command: `npm run build`
   - Configura el directorio: `.` (raíz)

3. **Post-deploy**:
   - Crea un script que renombre `index.production.html` → `index.html`

---

## 🔧 CONFIGURACIÓN POST-DEPLOYMENT

### 1. Verificar que el sitio funciona

Visita: https://dealtech365.com

**Checklist**:
- [ ] El sitio carga (no error 404 o 500)
- [ ] CSS se ve correctamente (colores, fuentes)
- [ ] JavaScript funciona (cookie banner aparece)
- [ ] Imágenes de productos cargan
- [ ] Links internos funcionan
- [ ] Formularios responden

### 2. Verificar HTTPS

- [ ] El sitio usa HTTPS (candado en navegador)
- [ ] No hay advertencias de contenido mixto
- [ ] Si no hay HTTPS, actívalo en tu hosting (usualmente gratis con Let's Encrypt)

### 3. Test de velocidad

**Google PageSpeed Insights**:
1. Ve a https://pagespeed.web.dev/
2. Ingresa: `https://dealtech365.com`
3. Revisa las puntuaciones:
   - **Móvil**: Objetivo >85
   - **Desktop**: Objetivo >90

**Si la puntuación es baja**:
- Activa compresión GZIP en tu hosting
- Habilita cache del navegador
- Considera usar un CDN (Cloudflare gratis)

### 4. Google Search Console

**Registrar tu sitio**:
1. Ve a https://search.google.com/search-console
2. Click **"Añadir propiedad"**
3. Ingresa: `https://dealtech365.com`
4. Verifica propiedad (método recomendado: HTML tag en `<head>`)
5. Una vez verificado, envía el sitemap:
   - Ve a "Sitemaps"
   - Añade: `https://dealtech365.com/sitemap.xml`

**Beneficios**:
- Google indexa tu sitio más rápido
- Recibes alertas de errores
- Ves qué búsquedas llevan a tu sitio

### 5. Probar en diferentes dispositivos

**Desktop**:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari (si tienes Mac)
- [ ] Edge

**Móvil**:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)

**Herramientas online**:
- BrowserStack (gratis trial): https://www.browserstack.com/
- Chrome DevTools (F12 → Toggle device toolbar)

---

## 🎯 TAREAS POST-LANZAMIENTO (Primera semana)

### Día 1: Monitoreo
- [ ] Verificar que el sitio está online y accesible
- [ ] Revisar Google Analytics (si lo configuraste)
- [ ] Probar todas las funcionalidades
- [ ] Buscar tu sitio en Google: `site:dealtech365.com`

### Día 2-3: SEO inicial
- [ ] Verificar que Google Search Console está activo
- [ ] Confirmar que sitemap fue procesado
- [ ] Revisar errores de rastreo (si los hay)

### Día 4-7: Optimización
- [ ] Analizar métricas de rendimiento
- [ ] Identificar productos más visitados
- [ ] Agregar más productos si es necesario
- [ ] Revisar conversión de newsletter

---

## 📊 MÉTRICAS PARA MONITOREAR

### Semana 1 (objetivos modestos):
- 50+ visitantes únicos
- 5+ newsletter signups
- 20+ clicks en productos afiliados
- 0 errores críticos en Search Console

### Mes 1:
- 500+ visitantes únicos
- 50+ newsletter signups
- 200+ clicks en productos
- 5+ páginas indexadas en Google

---

## 🐛 TROUBLESHOOTING

### Problema: "Sitio no carga (Error 404)"

**Causa**: Archivo index.html no está en la ubicación correcta

**Solución**:
1. Verifica que `index.html` esté en `/public_html/` (o carpeta raíz de tu hosting)
2. Verifica que el archivo se llame exactamente `index.html` (no `index.production.html`)
3. Algunos hostings requieren `index.php` - consulta con tu proveedor

---

### Problema: "Sitio carga pero sin estilos (solo texto plano)"

**Causa**: Archivo CSS no se encuentra

**Solución**:
1. Verifica que subiste la carpeta `/css/` con `styles.min.css`
2. Abre F12 → Network tab
3. Busca errores 404 en archivos CSS
4. Verifica que las rutas en `index.html` son relativas (`css/styles.min.css` no `/css/styles.min.css`)

---

### Problema: "Cookie banner no aparece"

**Causa**: JavaScript no carga

**Solución**:
1. F12 → Console, busca errores
2. Verifica que subiste la carpeta `/js/` con archivos `.min.js`
3. Revisa permisos de archivos (deben ser legibles: 644)

---

### Problema: "Google Analytics no registra visitas"

**Posibles causas**:
1. No actualizaste el Measurement ID en `analytics.js`
2. Usuarios no han aceptado cookies analíticas
3. Bloqueador de anuncios activo

**Solución**:
1. Verifica el ID en `js/analytics.min.js` línea 10
2. Acepta cookies analíticas en el banner
3. Prueba en modo incógnito sin extensiones
4. Revisa Google Analytics → Tiempo Real (datos instantáneos)

---

### Problema: "Imágenes de productos no cargan"

**Causa**: Rutas incorrectas o imágenes no subidas

**Solución**:
1. Verifica que subiste todas las imágenes de `/images/`
2. Abre F12 → Network, busca errores 404 en imágenes
3. Verifica que los nombres de archivos coinciden exactamente

---

## 📞 CONTACTO Y SOPORTE

### Recursos útiles:
- **Documentación del proyecto**: Ver otros archivos `.md` en la carpeta
- **Google Analytics Help**: https://support.google.com/analytics
- **Search Console Help**: https://support.google.com/webmasters

### Si necesitas ayuda:
1. Revisa la consola del navegador (F12) para errores específicos
2. Verifica que seguiste todos los pasos del checklist
3. Consulta con el soporte de tu hosting para configuraciones específicas

---

## ✅ CHECKLIST FINAL DE DEPLOYMENT

Antes de considerar el lanzamiento completo, verifica:

### Pre-deployment:
- [ ] Iconos generados y guardados en `/images/`
- [ ] OG image creado y guardado
- [ ] Google Analytics configurado (opcional)
- [ ] `npm run build` ejecutado exitosamente
- [ ] Test local en `index.production.html` exitoso

### Durante deployment:
- [ ] Todos los archivos subidos al hosting
- [ ] `index.production.html` renombrado a `index.html`
- [ ] Solo archivos minificados (`.min.css`, `.min.js`) subidos
- [ ] Estructura de carpetas correcta

### Post-deployment:
- [ ] Sitio accesible en https://dealtech365.com
- [ ] HTTPS funcionando (candado verde)
- [ ] Cookie banner funciona
- [ ] Productos se muestran correctamente
- [ ] Favoritos funcionan
- [ ] Newsletter funciona
- [ ] Sin errores en consola (F12)
- [ ] Test en móvil exitoso
- [ ] Google Search Console configurado
- [ ] Sitemap enviado

---

## 🎉 ¡LISTO PARA LANZAR!

Si completaste todos los pasos del checklist, **tu sitio está listo para producción**.

**Próximos pasos recomendados**:
1. Compartir en redes sociales
2. Agregar más productos regularmente
3. Escribir más blog posts
4. Monitorear Analytics semanalmente
5. Optimizar basándose en datos de usuarios

**¡Éxito con DealTech365!** 🚀

---

**Última actualización**: 2025-11-19
**Dominio**: dealtech365.com
**Versión**: 1.0.0 - Production Ready
