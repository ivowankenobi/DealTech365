# 🚀 Guía de Deployment - Bana Hosting (cPanel)

**Hosting**: Bana Hosting
**Tipo**: cPanel + Apache
**Dominio**: dealtech365.com

---

## 📋 PREPARACIÓN (5 minutos)

### Paso 1: Generar Iconos PWA

**Crítico - Sin esto PWA no funciona**:

1. Abre en tu navegador: **[generate-icons.html](generate-icons.html)**
2. Click en **"Generar Todos los Iconos"**
3. **Descarga los 2 críticos**:
   - Click derecho en `icon-192x192.png` → "Guardar imagen como..."
   - Guarda en tu carpeta `/images/` local
   - Click derecho en `icon-512x512.png` → "Guardar imagen como..."
   - Guarda en tu carpeta `/images/` local

4. **Recomendado** (descarga también):
   - `favicon-16x16.png` → `/images/`
   - `favicon-32x32.png` → `/images/`
   - `apple-touch-icon.png` → `/images/`

### Paso 2: Verificar Estado

```bash
npm run verify
```

Debe mostrar que los 2 iconos críticos están listos.

### Paso 3: Build Final

```bash
npm run build
```

Esto minifica todo y prepara para producción.

---

## 🌐 ACCEDER A BANA HOSTING

### Opción A: cPanel File Manager (Recomendado - Más fácil)

1. Ve a: `https://tu-dominio.com:2083` o `https://panel.banahosting.com`
2. Ingresa tu usuario y contraseña de cPanel
3. Busca **"Administrador de archivos"** o **"File Manager"**
4. Click para abrir

### Opción B: FTP (Cliente FileZilla)

**Descargar FileZilla**: https://filezilla-project.org/download.php

**Credenciales** (las obtuviste de Bana Hosting):
- **Host**: ftp.dealtech365.com o tu servidor FTP
- **Usuario**: Tu usuario FTP
- **Contraseña**: Tu contraseña FTP
- **Puerto**: 21 (FTP) o 22 (SFTP si está disponible)

---

## 📤 SUBIR ARCHIVOS (Método cPanel File Manager)

### Paso 1: Acceder a la carpeta pública

1. En cPanel File Manager, navega a: **`public_html`**
   - Si tienes addon domains, puede ser: `public_html/dealtech365.com`
2. Esta es tu carpeta raíz donde subirás todo

### Paso 2: Limpiar carpeta (Si ya hay archivos)

**⚠️ IMPORTANTE**: Si hay archivos de ejemplo o una página predeterminada:
1. Selecciona todos los archivos viejos
2. Click derecho → **"Delete"** o **"Eliminar"**
3. Confirma

**NO borres** (si existen):
- `.htaccess` (lo reemplazaremos)
- Carpetas como `cgi-bin`, `.well-known`

### Paso 3: Subir archivo principal

1. En cPanel File Manager, estando en `public_html`:
2. Click en **"Upload"** o **"Cargar"**
3. **Arrastra o selecciona**: `index.production.html` de tu computadora
4. Espera a que termine de subir (100%)
5. **Vuelve a la vista de archivos**
6. Click derecho en `index.production.html`
7. Selecciona **"Rename"** o **"Renombrar"**
8. Cámbialo a: **`index.html`** ⚠️ **MUY IMPORTANTE**
9. Click **"Save"** o **"Guardar"**

### Paso 4: Subir archivos de configuración

En `public_html`, sube estos archivos:

**Usando Upload**:
1. Click en **"Upload"**
2. Selecciona y sube:
   - `sitemap.xml`
   - `robots.txt`
   - `manifest.json`
   - `.htaccess` ⚠️ (Reemplaza el existente si hay uno)

**Nota sobre .htaccess**:
- Si no ves `.htaccess` en File Manager, es normal (archivos ocultos)
- En la parte superior derecha, busca **"Settings"** o **"Configuración"**
- Activa **"Show Hidden Files"** o **"Mostrar archivos ocultos"**
- Ahora deberías ver `.htaccess` si existe
- Si existe uno viejo, reemplázalo con el nuestro

### Paso 5: Crear y subir carpetas

**Necesitas crear estas carpetas en `public_html`**:

1. Click en **"+ New Folder"** o **"Nueva Carpeta"**
2. Crea carpeta: **`css`**
3. Entra a la carpeta `css` (doble click)
4. Click **"Upload"**, sube: `styles.min.css`
5. Vuelve a `public_html` (click en el icono arriba)

6. Crea carpeta: **`js`**
7. Entra a `js`
8. Sube los archivos minificados:
   - `region.min.js`
   - `cookie-consent.min.js`
   - `analytics.min.js`
   - `deals.min.js`
9. Vuelve a `public_html`

10. Crea carpeta: **`images`**
11. Entra a `images`
12. Sube todos los iconos que generaste:
    - `icon-192x192.png` ⚠️ CRÍTICO
    - `icon-512x512.png` ⚠️ CRÍTICO
    - `favicon-16x16.png`
    - `favicon-32x32.png`
    - `apple-touch-icon.png`
    - `logo.svg`
    - Todas las demás imágenes de productos que tengas
13. Vuelve a `public_html`

14. Crea carpeta: **`pages`**
15. Entra a `pages`
16. Sube TODOS los archivos .html de tu carpeta local `pages/`:
    - `favorites.html`
    - `notifications.html`
    - `edit-profile.html`
    - `language.html`
    - `theme.html`
    - `about.html`
    - `contact.html`
    - `privacy-policy.html`
    - `terms.html`
    - `affiliate-disclosure.html`
17. Vuelve a `public_html`

18. Crea carpeta: **`blog`**
19. Entra a `blog`
20. Sube todos los archivos .html de tu carpeta local `blog/`:
    - `laptops-black-friday-2025.html`
    - `gadgets-imprescindibles-2025.html`
    - `auriculares-premium-descuento.html`
    - `smartphones-cual-comprar.html`
    - `top-accesorios-gaming.html`
    - `consejos-black-friday.html`

### Paso 6: Verificar estructura final

Tu `public_html` debe verse así:

```
public_html/
├── index.html (era index.production.html) ✅
├── sitemap.xml ✅
├── robots.txt ✅
├── manifest.json ✅
├── .htaccess ✅
│
├── css/
│   └── styles.min.css ✅
│
├── js/
│   ├── region.min.js ✅
│   ├── cookie-consent.min.js ✅
│   ├── analytics.min.js ✅
│   └── deals.min.js ✅
│
├── images/
│   ├── icon-192x192.png ✅
│   ├── icon-512x512.png ✅
│   └── [otros iconos e imágenes] ✅
│
├── pages/
│   └── [10 archivos .html] ✅
│
└── blog/
    └── [6 archivos .html] ✅
```

---

## 🔧 CONFIGURACIÓN DE BANA HOSTING

### Verificar que el dominio apunte correctamente

1. En cPanel, busca **"Dominios"** o **"Addon Domains"**
2. Verifica que `dealtech365.com` esté listado
3. Debe apuntar a `public_html` o `public_html/dealtech365.com`

### Activar SSL/HTTPS (Gratis con Let's Encrypt)

**Bana Hosting incluye SSL gratis**:

1. En cPanel, busca **"SSL/TLS Status"** o **"AutoSSL"**
2. Busca tu dominio `dealtech365.com`
3. Si no está activo:
   - Click en **"Run AutoSSL"** o **"Ejecutar AutoSSL"**
   - Espera 5-10 minutos
4. Verifica que aparezca certificado válido
5. En navegador, accede: `https://dealtech365.com`
   - Debe mostrar candado verde 🔒

### Forzar HTTPS (Ya configurado en .htaccess)

El archivo `.htaccess` que subiste ya fuerza HTTPS automáticamente.

**Para verificar**:
1. Visita: `http://dealtech365.com` (sin S)
2. Debe redirigir automáticamente a: `https://dealtech365.com`

---

## ✅ VERIFICACIÓN POST-DEPLOYMENT

### 1. Verificar que el sitio carga

Abre en tu navegador: **https://dealtech365.com**

**Debe mostrar**:
- ✅ Logo "💎 DealTech365" en navbar
- ✅ Hero section con título
- ✅ Productos (mínimo 6 visibles)
- ✅ Estilos aplicados (NO solo texto plano)
- ✅ Cookie banner aparece en la parte inferior

### 2. Verificar funcionalidades

**Prueba cada una**:

- [ ] **Cookie banner**:
  - Aparece al cargar
  - Puedes hacer click en "Aceptar todo"
  - Banner desaparece
  - No vuelve a aparecer al recargar

- [ ] **Filtros de productos**:
  - Click en "Laptops"
  - Solo se muestran laptops
  - Click en "Todos" vuelve a mostrar todo

- [ ] **Favoritos**:
  - Click en corazón de un producto
  - Cambia de 🤍 a ❤️
  - Recarga página, sigue en ❤️

- [ ] **Newsletter**:
  - Ingresa email en formulario
  - Click en "Suscribirme"
  - Muestra mensaje de éxito

- [ ] **Navegación**:
  - Click en "Ofertas" → Va a `/pages/favorites.html`
  - Click en "Blog" → Scroll a sección blog
  - Click en un blog post → Abre el artículo

### 3. Verificar archivos críticos

Accede directamente a estas URLs:

- ✅ https://dealtech365.com/sitemap.xml
  - Debe mostrar XML con todas las páginas
- ✅ https://dealtech365.com/robots.txt
  - Debe mostrar texto plano con reglas
- ✅ https://dealtech365.com/manifest.json
  - Debe mostrar JSON con configuración PWA
- ✅ https://dealtech365.com/images/icon-192x192.png
  - Debe mostrar el icono
- ✅ https://dealtech365.com/images/icon-512x512.png
  - Debe mostrar el icono

### 4. Verificar en consola del navegador

1. Abre el sitio
2. Presiona **F12** (o click derecho → Inspeccionar)
3. Ve a tab **"Console"**

**NO debe haber**:
- ❌ Errores rojos
- ❌ "Failed to load resource" (404 errors)
- ❌ "Uncaught TypeError"

**Es normal ver**:
- ⚠️ Warnings amarillos sobre cookies (normales)
- ✅ Mensajes de cookie consent
- ✅ "Analytics module loaded"

### 5. Test de velocidad

**Google PageSpeed Insights**:
1. Ve a: https://pagespeed.web.dev/
2. Ingresa: `https://dealtech365.com`
3. Click **"Analyze"**
4. Espera resultados (1-2 minutos)

**Objetivos**:
- 🎯 **Móvil**: >80 (Bueno) / >90 (Excelente)
- 🎯 **Desktop**: >90 (Bueno) / >95 (Excelente)

**Si la puntuación es baja** (<70):
- El .htaccess ya activa compresión GZIP
- Verifica que .htaccess se subió correctamente
- Contacta soporte de Bana Hosting para activar mod_deflate

### 6. Test responsive (Móvil)

**Opción A - Chrome DevTools**:
1. F12 → Click icono móvil (📱) arriba
2. Selecciona "iPhone 12 Pro"
3. Navega el sitio
4. Todo debe verse bien

**Opción B - Tu celular**:
1. Abre navegador en móvil
2. Ve a: https://dealtech365.com
3. Navega normalmente
4. Todo debe funcionar

---

## 🔍 CONFIGURACIÓN ADICIONAL EN BANA HOSTING

### Activar compresión (Si no funciona automáticamente)

1. En cPanel, busca **"MultiPHP INI Editor"**
2. Selecciona tu dominio
3. Busca `zlib.output_compression`
4. Cambia a: **On**
5. Click **"Apply"** o **"Aplicar"**

### Aumentar límites de PHP (Opcional)

1. En cPanel → **"MultiPHP INI Editor"**
2. Ajusta:
   - `upload_max_filesize`: 64M
   - `post_max_size`: 64M
   - `max_execution_time`: 300
3. Click **"Apply"**

### Configurar correo electrónico

**Para recibir emails de formulario de contacto**:

1. En cPanel → **"Email Accounts"** o **"Cuentas de correo"**
2. Click **"Create"** o **"Crear"**
3. Email: `hello@dealtech365.com`
4. Contraseña: (elige una segura)
5. Click **"Create"**

**Luego actualiza el formulario** (futuro):
- Necesitarás configurar un script PHP para enviar emails
- O usar un servicio como Formspree, EmailJS

---

## 🐛 TROUBLESHOOTING ESPECÍFICO BANA HOSTING

### Problema: "Error 500 - Internal Server Error"

**Causa**: .htaccess mal configurado

**Solución**:
1. En cPanel File Manager, renombra `.htaccess` → `.htaccess.bak`
2. Recarga el sitio
3. Si funciona, el problema era .htaccess
4. Edita .htaccess y comenta líneas problemáticas con `#`

### Problema: "403 Forbidden"

**Causa**: Permisos de archivos incorrectos

**Solución**:
1. En File Manager, selecciona `index.html`
2. Click derecho → **"Permissions"** o **"Permisos"**
3. Establece: **644** (rw-r--r--)
4. Para carpetas: **755** (rwxr-xr-x)

### Problema: "Sitio carga pero sin estilos"

**Causa**: CSS no se encuentra

**Solución**:
1. Verifica que `/css/styles.min.css` existe en File Manager
2. Accede directamente: https://dealtech365.com/css/styles.min.css
3. Si da 404, re-sube el archivo
4. Verifica permisos: 644

### Problema: "Cookie banner no aparece"

**Causa**: JavaScript no carga

**Solución**:
1. F12 → Console
2. Busca errores rojos
3. Verifica que archivos .min.js están en `/js/`
4. Accede: https://dealtech365.com/js/cookie-consent.min.js
5. Si da 404, re-sube archivos

### Problema: "WWW sigue apareciendo"

**Causa**: .htaccess redirect no funciona

**Solución**:
1. En cPanel → **"Domains"** o **"Redirects"**
2. Crea redirect:
   - From: `www.dealtech365.com/*`
   - To: `https://dealtech365.com/$1`
   - Type: **Permanent (301)**

### Problema: "SSL no funciona (No secure)"

**Causa**: Certificado no instalado

**Solución**:
1. En cPanel → **"SSL/TLS Status"**
2. Click **"Run AutoSSL"**
3. Espera 10 minutos
4. Si falla, contacta soporte de Bana Hosting

---

## 📧 CONTACTAR SOPORTE BANA HOSTING

**Si algo no funciona**:

**Email**: soporte@banahosting.com
**Chat**: https://banahosting.com (esquina inferior derecha)
**Teléfono**: (Revisa en tu panel de Bana Hosting)

**Información a proporcionar**:
- Dominio: dealtech365.com
- Usuario cPanel: [tu usuario]
- Descripción del problema
- Screenshots si es posible

---

## ✅ CHECKLIST FINAL BANA HOSTING

### Pre-deployment:
- [ ] Iconos PWA generados (192x192 y 512x512)
- [ ] `npm run verify` sin errores críticos
- [ ] `npm run build` ejecutado
- [ ] Credenciales de cPanel a mano

### Durante deployment:
- [ ] Accedido a cPanel File Manager
- [ ] Navegado a `public_html`
- [ ] index.production.html subido y renombrado a index.html
- [ ] sitemap.xml, robots.txt, manifest.json subidos
- [ ] .htaccess subido
- [ ] Carpeta `/css/` creada con styles.min.css
- [ ] Carpeta `/js/` creada con 4 archivos .min.js
- [ ] Carpeta `/images/` creada con iconos
- [ ] Carpeta `/pages/` creada con 10 archivos HTML
- [ ] Carpeta `/blog/` creada con 6 archivos HTML

### Post-deployment:
- [ ] https://dealtech365.com carga correctamente
- [ ] SSL activo (candado verde)
- [ ] Cookie banner funciona
- [ ] Filtros funcionan
- [ ] Favoritos funcionan
- [ ] No hay errores en consola (F12)
- [ ] Sitemap accesible (/sitemap.xml)
- [ ] Manifest accesible (/manifest.json)
- [ ] Test de velocidad >80

---

## 🎉 ¡LISTO!

Si completaste todos los pasos, tu sitio DealTech365 está **100% LIVE** en:

**🌐 https://dealtech365.com**

### Próximos pasos recomendados:

1. **Google Search Console**:
   - Registra tu sitio
   - Envía sitemap.xml
   - Monitorea indexación

2. **Google Analytics**:
   - Si no lo hiciste, configura el ID
   - Edita `js/analytics.js` línea 10
   - Ejecuta `npm run build`
   - Re-sube `js/analytics.min.js`

3. **Contenido**:
   - Agrega más productos
   - Escribe más blog posts
   - Actualiza ofertas regularmente

4. **Marketing**:
   - Comparte en redes sociales
   - Únete a comunidades de tech deals
   - Considera Google Ads o Facebook Ads

---

**¡Felicitaciones por el lanzamiento de DealTech365!** 🚀💎

**Tiempo total**: ~45 minutos con cPanel File Manager
