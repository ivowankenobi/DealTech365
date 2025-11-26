# Build Guide - Black Friday Tech

Guía para preparar el sitio para producción con archivos optimizados.

---

## 📦 ARCHIVOS MINIFICADOS

### Resultados de minificación:

| Archivo | Original | Minificado | Ahorro |
|---------|----------|------------|--------|
| **styles.css** | 26 KB | 21 KB | **19% ↓** |
| **region.js** | 6.0 KB | 3.6 KB | **40% ↓** |
| **cookie-consent.js** | 11 KB | 6.0 KB | **45% ↓** |
| **analytics.js** | 6.3 KB | 2.8 KB | **56% ↓** |
| **deals.js** | 28 KB | 19 KB | **32% ↓** |
| **TOTAL** | **77.3 KB** | **52.4 KB** | **32% ↓** |

**Beneficios**:
- ✅ Carga ~25 KB menos (reducción del 32%)
- ✅ Tiempo de carga más rápido
- ✅ Mejor rendimiento en redes lentas
- ✅ Mejor puntuación en Google PageSpeed
- ✅ Menos consumo de datos para usuarios móviles

---

## 🚀 COMANDOS DE BUILD

### Minificar todo (CSS + JS):
```bash
npm run build
```

### Minificar solo CSS:
```bash
npm run minify:css
```

### Minificar solo JavaScript:
```bash
npm run minify:js
```

### Minificar archivos individuales:
```bash
npm run minify:js:region      # Solo region.js
npm run minify:js:cookie      # Solo cookie-consent.js
npm run minify:js:analytics   # Solo analytics.js
npm run minify:js:deals       # Solo deals.js
```

### Modo desarrollo (watch CSS):
```bash
npm run dev
```
Este comando regenera automáticamente el CSS minificado cada vez que guardas cambios en `styles.css`.

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
/
├── css/
│   ├── styles.css           ← Archivo fuente (desarrollo)
│   └── styles.min.css       ← Archivo minificado (producción) ✅
├── js/
│   ├── region.js            ← Fuente
│   ├── region.min.js        ← Minificado ✅
│   ├── cookie-consent.js    ← Fuente
│   ├── cookie-consent.min.js ← Minificado ✅
│   ├── analytics.js         ← Fuente
│   ├── analytics.min.js     ← Minificado ✅
│   ├── deals.js             ← Fuente
│   └── deals.min.js         ← Minificado ✅
├── index.html               ← Desarrollo (usa archivos sin minificar)
├── index.production.html    ← Producción (usa archivos minificados) ✅
└── package.json             ← Configuración de npm
```

---

## 🔧 WORKFLOW RECOMENDADO

### Durante el desarrollo:

1. **Edita los archivos fuente**:
   - `css/styles.css`
   - `js/*.js` (región, cookie-consent, analytics, deals)

2. **Usa `index.html`** para desarrollo (carga archivos sin minificar para debugging)

3. **Ejecuta `npm run dev`** si quieres auto-minificación de CSS

### Antes de deployment:

1. **Ejecuta el build**:
   ```bash
   npm run build
   ```

2. **Verifica los archivos minificados** se generaron correctamente:
   ```bash
   ls -lh css/*.min.css js/*.min.js
   ```

3. **Usa `index.production.html`** para producción (carga archivos minificados)

4. **Sube a producción**:
   - Opción A: Sube `index.production.html` como `index.html` en el servidor
   - Opción B: Configura tu servidor para servir archivos minificados automáticamente

---

## 🌐 DEPLOYMENT

### Opción 1: Netlify (Recomendado)

1. **Crea `netlify.toml`** en la raíz:
   ```toml
   [build]
     command = "npm run build"
     publish = "."

   [[redirects]]
     from = "/*"
     to = "/index.production.html"
     status = 200
     force = false
   ```

2. **Conecta tu repo a Netlify**:
   - Push tu código a GitHub
   - Conecta Netlify a tu repo
   - Netlify ejecutará `npm run build` automáticamente

3. **Configura variables de entorno** (si las necesitas):
   - `GA4_MEASUREMENT_ID` - Tu ID de Google Analytics

### Opción 2: Vercel

1. **Crea `vercel.json`**:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".",
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.production.html" }
     ]
   }
   ```

2. **Deploy**:
   ```bash
   npm install -g vercel
   vercel
   ```

### Opción 3: Manual (cualquier hosting)

1. **Ejecuta build localmente**:
   ```bash
   npm run build
   ```

2. **Renombra archivo de producción**:
   ```bash
   cp index.production.html index.html
   ```

3. **Sube estos archivos vía FTP/SFTP**:
   - `index.html` (el de producción)
   - `/css/styles.min.css`
   - `/js/*.min.js`
   - `/images/`
   - `/pages/`
   - `/blog/`
   - `manifest.json`
   - `sitemap.xml`
   - `robots.txt`

---

## 🔍 TESTING DE PRODUCCIÓN

### Test local de archivos minificados:

1. Abre `index.production.html` en tu navegador

2. Abre DevTools (F12):
   - **Network tab**: Verifica que carga archivos `.min.css` y `.min.js`
   - **Console tab**: No debe haber errores JavaScript
   - **Sources tab**: Verifica que los archivos están minificados

3. Prueba todas las funcionalidades:
   - [ ] Cookie consent funciona
   - [ ] Filtros de productos funcionan
   - [ ] Favoritos funcionan
   - [ ] Newsletter funciona
   - [ ] Detección de región funciona
   - [ ] Analytics se inicializa (si cookies aceptadas)

### Test de rendimiento:

1. **Google PageSpeed Insights**:
   - https://pagespeed.web.dev/
   - Pega tu URL de producción
   - Objetivo: >90 en móvil, >95 en desktop

2. **GTmetrix**:
   - https://gtmetrix.com/
   - Analiza velocidad de carga
   - Objetivo: <2s para First Contentful Paint

3. **WebPageTest**:
   - https://www.webpagetest.org/
   - Test desde múltiples ubicaciones
   - Objetivo: <3s para Speed Index

---

## 📊 OPTIMIZACIONES ADICIONALES

### Ya implementadas ✅:
- [x] Minificación de CSS y JavaScript
- [x] Preload de recursos críticos
- [x] Lazy loading de imágenes
- [x] Compresión de assets

### Recomendadas para el futuro:

1. **Compresión Gzip/Brotli** (configurar en servidor):
   ```nginx
   # Nginx example
   gzip on;
   gzip_types text/css application/javascript application/json;
   gzip_min_length 1000;
   ```

2. **CDN para librerías**:
   - Considera usar CDN para fuentes de Google
   - Ya implementado con `preconnect`

3. **Service Worker** (para PWA completa):
   - Cache de assets para funcionamiento offline
   - Precaching de páginas importantes

4. **Image Optimization**:
   - Convertir imágenes a WebP
   - Usar `srcset` para responsive images
   - Compresión con TinyPNG o Squoosh

5. **Code Splitting** (si crece mucho el JS):
   - Separar código por página
   - Cargar solo lo necesario

---

## 🐛 TROUBLESHOOTING

### Error: "npm: command not found"
**Solución**: Instala Node.js desde https://nodejs.org

### Error: "Cannot find module 'terser'" o "Cannot find module 'clean-css-cli'"
**Solución**:
```bash
npm install
```

### Los archivos minificados no se generan
**Solución**:
1. Verifica que los archivos fuente existen
2. Ejecuta con verbose:
   ```bash
   npm run build --verbose
   ```
3. Revisa permisos de escritura en carpetas

### Errores JavaScript en producción pero no en desarrollo
**Causa**: La minificación puede romper código con errores de sintaxis

**Solución**:
1. Revisa la consola del navegador
2. Compara archivo minificado vs original
3. Si un archivo específico falla, usa el original temporalmente:
   ```html
   <script src="js/problematic-file.js"></script>
   ```
4. Arregla el error en el código fuente y vuelve a minificar

### CSS roto en producción
**Solución**:
1. Verifica que no hay comentarios mal cerrados en CSS
2. Chequea que todas las `url()` usan comillas
3. Regenera el CSS minificado:
   ```bash
   npm run minify:css
   ```

---

## 📝 CHECKLIST PRE-DEPLOYMENT

Antes de lanzar a producción:

### Build:
- [ ] `npm run build` ejecutado sin errores
- [ ] Todos los archivos `.min.css` y `.min.js` generados
- [ ] Tamaños de archivos verificados (menores que originales)

### Testing:
- [ ] `index.production.html` abierto y probado localmente
- [ ] Cookie consent funciona
- [ ] Todas las funcionalidades JS funcionan
- [ ] No hay errores en consola del navegador
- [ ] Network tab muestra archivos minificados cargándose
- [ ] Google Analytics se inicializa correctamente

### Assets:
- [ ] Favicon creado (favicon.ico)
- [ ] Open Graph image creado (og-image.jpg)
- [ ] PWA icons creados (192x192, 512x512 mínimo)
- [ ] Apple touch icon creado (180x180)
- [ ] Screenshots creados (opcional)

### Configuración:
- [ ] GA4 Measurement ID configurado en `analytics.js`
- [ ] Affiliate IDs configurados en enlaces (cuando los obtengas)
- [ ] Email configurado para newsletter backend
- [ ] Domain configurado en meta tags y manifest.json

### SEO:
- [ ] sitemap.xml actualizado con todas las páginas
- [ ] robots.txt configurado
- [ ] Meta tags verificados (title, description, OG)
- [ ] Canonical URLs correctos

### Legal:
- [ ] Privacy policy revisada por abogado (recomendado)
- [ ] Terms & conditions revisadas
- [ ] Affiliate disclosure presente y visible
- [ ] Cookie consent funcional

---

## 📈 MONITOREO POST-DEPLOYMENT

Después de lanzar:

### Primera semana:
- [ ] Monitorear Google Analytics (usuarios, sesiones, errores)
- [ ] Revisar Google Search Console (errores de rastreo, indexación)
- [ ] Verificar que todos los enlaces funcionan
- [ ] Probar desde diferentes dispositivos y navegadores
- [ ] Monitorear uptime (usar UptimeRobot.com gratis)

### Mensual:
- [ ] Revisar métricas de rendimiento (PageSpeed)
- [ ] Analizar productos más clickeados
- [ ] Optimizar contenido basado en búsquedas
- [ ] Actualizar ofertas y precios
- [ ] Regenerar archivos minificados si hubo cambios

---

## 🆘 SOPORTE

Si tienes problemas con el build:

1. **Revisa la consola** para mensajes de error específicos
2. **Ejecuta `npm install`** para asegurar que todas las dependencias están instaladas
3. **Limpia y regenera**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```
4. **Verifica versiones**:
   ```bash
   node --version  # Debe ser v14+
   npm --version   # Debe ser v6+
   ```

---

**¡Listo para producción!** 🚀

Ejecuta `npm run build`, prueba `index.production.html`, y estarás listo para deployment.
