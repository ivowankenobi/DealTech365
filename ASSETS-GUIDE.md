# Guía para Crear Assets Faltantes

Esta guía te ayudará a crear todas las imágenes e íconos necesarios para completar el sitio.

---

## 📋 RESUMEN DE ASSETS NECESARIOS

### 🔴 CRÍTICO (Necesario antes del lanzamiento)
1. **Favicon** (favicon.ico, 16x16, 32x32)
2. **Open Graph Image** (1200x630px)
3. **Apple Touch Icon** (180x180px)
4. **PWA Icons** (192x192, 512x512)

### 🟡 IMPORTANTE (Recomendado)
5. **Todos los tamaños de PWA** (72, 96, 128, 144, 152, 384)
6. **Screenshots** para PWA (móvil y desktop)
7. **Logo SVG** para mejor calidad
8. **Shortcut icons** (96x96 cada uno)

---

## 🎨 1. FAVICON

### Qué es
El pequeño ícono que aparece en la pestaña del navegador.

### Tamaños necesarios
- `favicon.ico` - 16x16, 32x32, 48x48 (multi-size ICO file)
- `favicon-16x16.png` - 16x16px PNG
- `favicon-32x32.png` - 32x32px PNG

### Dónde guardar
```
/favicon.ico
/images/favicon-16x16.png
/images/favicon-32x32.png
```

### Cómo crear
**Opción 1 - Online (Gratis)**:
1. Ve a https://realfavicongenerator.net/
2. Sube un logo cuadrado (mínimo 260x260px)
3. Personaliza colores si quieres
4. Descarga el paquete completo
5. Extrae los archivos a las carpetas correspondientes

**Opción 2 - Canva (Gratis)**:
1. Crea diseño cuadrado 512x512px
2. Texto: "BF" o "🛍️"
3. Fondo: Negro (#000000)
4. Texto: Blanco o color primario
5. Exporta como PNG
6. Usa https://favicon.io/favicon-converter/ para convertir a ICO

**Opción 3 - Figma/Photoshop**:
1. Crea canvas 512x512px
2. Diseña logo simple y reconocible
3. Exporta a diferentes tamaños
4. Usa herramienta online para crear ICO

### Diseño sugerido
```
━━━━━━━━━━
█          █
█   🛍️    █   (emoji de bolsa de compras)
█   BF     █   (o las letras BF en grande)
█  Tech    █   (texto pequeño debajo)
█          █
━━━━━━━━━━
```

**Colores sugeridos**:
- Fondo: #000000 (negro)
- Icono/Texto: #FFFFFF (blanco) o #22C55E (verde primario)

---

## 📱 2. OPEN GRAPH IMAGE

### Qué es
La imagen que se muestra cuando compartes el sitio en redes sociales (Facebook, Twitter, LinkedIn, WhatsApp).

### Especificaciones
- **Tamaño**: 1200x630px (ratio 1.91:1)
- **Formato**: JPG o PNG
- **Peso máximo**: < 1MB (idealmente < 300KB)
- **Ubicación**: `/images/og-image.jpg`

### Qué debe incluir
1. **Título principal**: "Black Friday Tech 2025"
2. **Subtítulo**: "Las Mejores Ofertas en Tecnología"
3. **Visual atractivo**: Productos tech (laptops, smartphones, auriculares)
4. **Call to action**: "Descuentos hasta 40%"
5. **URL del sitio** (opcional): blackfridaytech.app

### Cómo crear

**Opción 1 - Canva (Recomendado)**:
1. Ve a https://www.canva.com
2. Busca template "Facebook Post" (1200x630)
3. Usa palabras clave: "Black Friday", "Tech Sale", "Cyber Monday"
4. Personaliza:
   - Cambia texto a "Black Friday Tech 2025"
   - Añade "Ofertas en Laptops, Smartphones, Audio y Gaming"
   - Usa colores: Negro, Blanco, Verde (#22C55E)
5. Descarga como JPG (alta calidad)

**Opción 2 - Unsplash + Editor**:
1. Busca foto de fondo en https://unsplash.com
   - Keywords: "technology", "laptop flatlay", "gadgets"
2. Usa editor (Photopea, Figma, o Canva gratis)
3. Añade overlay oscuro (30-50% opacidad)
4. Añade texto blanco grande
5. Exporta 1200x630px

**Template sugerido**:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
█  [Fondo: Imagen tech con overlay]  █
█                                     █
█   BLACK FRIDAY TECH 2025           █ (grande, bold)
█   Las Mejores Ofertas              █ (mediano)
█   en Tecnología                    █
█                                     █
█   💻 📱 🎧 🎮                       █ (iconos)
█                                     █
█   Descuentos hasta 40% OFF         █ (destacado)
█                                     █
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Herramientas recomendadas**:
- **Canva**: https://canva.com (gratis, fácil)
- **Photopea**: https://photopea.com (Photoshop gratis online)
- **Figma**: https://figma.com (profesional, gratis)
- **Remove.bg**: Para quitar fondos de imágenes

---

## 🍎 3. APPLE TOUCH ICON

### Qué es
El ícono que se muestra cuando alguien añade tu sitio a la pantalla de inicio en iOS.

### Especificaciones
- **Tamaño**: 180x180px
- **Formato**: PNG (sin transparencia, con fondo)
- **Ubicación**: `/images/apple-touch-icon.png`

### Cómo crear
1. Usa el mismo diseño del favicon
2. Exporta a 180x180px
3. Asegúrate de tener fondo sólido (no transparente)
4. iOS automáticamente redondeará las esquinas

**Nota**: Puedes reutilizar el logo del favicon, solo expórtalo a 180x180px.

---

## 📲 4. PWA ICONS (Progressive Web App)

### Qué son
Íconos para cuando el usuario instala tu sitio como app en su dispositivo.

### Tamaños necesarios
- `icon-72x72.png` - 72x72px
- `icon-96x96.png` - 96x96px
- `icon-128x128.png` - 128x128px
- `icon-144x144.png` - 144x144px
- `icon-152x152.png` - 152x152px
- **`icon-192x192.png`** - 192x192px (mínimo requerido)
- `icon-384x384.png` - 384x384px
- **`icon-512x512.png`** - 512x512px (mínimo requerido)

### Dónde guardar
Todos en `/images/`

### Cómo crear

**Método rápido - PWA Asset Generator**:
1. Ve a https://www.pwabuilder.com/imageGenerator
2. Sube tu logo 512x512px
3. Personaliza colores si quieres
4. Descarga todos los tamaños
5. Renombra según necesites

**Método manual - Canva/Figma**:
1. Crea logo base 512x512px
2. Exporta a todos los tamaños necesarios
3. Guarda en `/images/`

**Herramienta recomendada**:
```bash
# Si tienes Node.js instalado, puedes usar:
npx pwa-asset-generator logo.png ./images/
```

---

## 📸 5. SCREENSHOTS (Para PWA)

### Qué son
Capturas de pantalla que se muestran cuando alguien va a instalar tu PWA.

### Necesarios
1. **screenshot-mobile.png**:
   - Tamaño: 390x844px (iPhone 12/13)
   - Muestra: Página de ofertas en móvil
   - Ubicación: `/images/screenshot-mobile.png`

2. **screenshot-desktop.png**:
   - Tamaño: 1920x1080px
   - Muestra: Página principal en desktop
   - Ubicación: `/images/screenshot-desktop.png`

### Cómo crear
1. **Opción 1 - Captura real**:
   - Abre tu sitio
   - Usa DevTools responsive mode (390x844)
   - Captura pantalla (Ctrl+Shift+P → "Screenshot")
   - Repite para desktop (1920x1080)

2. **Opción 2 - Herramienta**:
   - https://smartmockups.com/ (mockups)
   - https://www.screely.com/ (añade marco bonito)
   - https://mockuphone.com/ (frame de dispositivo)

---

## 🎯 6. SHORTCUT ICONS (Opcional)

Para accesos directos en la PWA (cuando usuario instala la app).

### Necesarios
- `shortcut-deals.png` - 96x96px (ícono de ofertas)
- `shortcut-favorites.png` - 96x96px (ícono de corazón)
- `shortcut-blog.png` - 96x96px (ícono de blog/documento)

### Cómo crear
Diseños simples, monocromáticos:
- **Deals**: Etiqueta de precio o bolsa
- **Favorites**: Corazón
- **Blog**: Documento o texto

Puedes usar emojis:
- Deals: 🏷️ o 💰
- Favorites: ❤️
- Blog: 📝 o 📰

---

## 🎨 PALETA DE COLORES RECOMENDADA

Basada en tu sitio actual:

```css
Negro:          #000000  (fondo oscuro)
Blanco:         #FFFFFF  (texto/fondo claro)
Verde Primario: #22C55E  (botones, acentos)
Gris Oscuro:    #1A1A1A  (fondos secundarios)
Gris Claro:     #E5E5E5  (bordes)
```

---

## 📦 ESTRUCTURA FINAL DE CARPETA `/images/`

```
/images/
├── og-image.jpg                 (1200x630 - Open Graph)
├── favicon-16x16.png            (16x16 - Favicon)
├── favicon-32x32.png            (32x32 - Favicon)
├── apple-touch-icon.png         (180x180 - iOS)
├── icon-72x72.png               (PWA)
├── icon-96x96.png               (PWA)
├── icon-128x128.png             (PWA)
├── icon-144x144.png             (PWA)
├── icon-152x152.png             (PWA)
├── icon-192x192.png             (PWA - requerido)
├── icon-384x384.png             (PWA)
├── icon-512x512.png             (PWA - requerido)
├── screenshot-mobile.png        (390x844 - PWA)
├── screenshot-desktop.png       (1920x1080 - PWA)
├── shortcut-deals.png           (96x96 - PWA shortcuts)
├── shortcut-favorites.png       (96x96 - PWA shortcuts)
├── shortcut-blog.png            (96x96 - PWA shortcuts)
└── logo.png                     (512x512 - General)
```

---

## ⚡ QUICK START - Prioridades

Si tienes poco tiempo, crea en este orden:

1. **MÍNIMO VIABLE** (30 minutos):
   - ✅ favicon.ico (usa https://favicon.io con emoji 🛍️)
   - ✅ og-image.jpg (Canva template rápido)
   - ✅ icon-192x192.png (mismo logo que favicon)
   - ✅ icon-512x512.png (mismo logo que favicon)

2. **BUENO** (+15 minutos):
   - ✅ apple-touch-icon.png
   - ✅ favicon-16x16.png y favicon-32x32.png
   - ✅ Resto de PWA icons (usa generator)

3. **EXCELENTE** (+30 minutos):
   - ✅ Screenshots de alta calidad
   - ✅ Shortcut icons personalizados
   - ✅ Logo SVG vectorial

---

## 🛠️ HERRAMIENTAS RECOMENDADAS

### Gratis y Fáciles
1. **Canva** - https://canva.com
   - Para OG image, logos, cualquier diseño
   - Templates profesionales
   - Export de alta calidad

2. **Real Favicon Generator** - https://realfavicongenerator.net/
   - Genera TODOS los favicons necesarios
   - Test en diferentes dispositivos
   - Un solo upload

3. **PWA Builder** - https://www.pwabuilder.com/imageGenerator
   - Genera todos los íconos PWA
   - Un solo upload
   - Descarga zip con todo

4. **Remove.bg** - https://remove.bg
   - Quita fondos de imágenes
   - Gratis para baja resolución

5. **Unsplash** - https://unsplash.com
   - Fotos gratis de alta calidad
   - Keywords: technology, laptop, gadgets, black friday

### Profesionales (Opcional)
1. **Figma** - https://figma.com (gratis)
2. **Photopea** - https://photopea.com (Photoshop online gratis)
3. **GIMP** - https://gimp.org (Photoshop alternativo gratis)

---

## ✅ CHECKLIST DE ASSETS

Marca cuando completes cada uno:

### Críticos
- [ ] favicon.ico
- [ ] favicon-16x16.png
- [ ] favicon-32x32.png
- [ ] og-image.jpg (1200x630)
- [ ] icon-192x192.png
- [ ] icon-512x512.png

### Importantes
- [ ] apple-touch-icon.png
- [ ] icon-72x72.png
- [ ] icon-96x96.png
- [ ] icon-128x128.png
- [ ] icon-144x144.png
- [ ] icon-152x152.png
- [ ] icon-384x384.png

### Opcionales
- [ ] screenshot-mobile.png
- [ ] screenshot-desktop.png
- [ ] shortcut-deals.png
- [ ] shortcut-favorites.png
- [ ] shortcut-blog.png
- [ ] logo.png (512x512)
- [ ] logo.svg (vectorial)

---

## 🚀 TESTING

Después de crear los assets:

1. **Favicon**:
   - Abre tu sitio en Chrome
   - Verifica que aparece en la pestaña
   - Prueba también en Firefox/Safari

2. **Open Graph**:
   - Usa https://www.opengraph.xyz/
   - Pega tu URL
   - Verifica preview

3. **PWA**:
   - Chrome DevTools → Application → Manifest
   - Verifica todos los íconos
   - Prueba "Install App"

4. **Mobile**:
   - Abre en móvil
   - "Add to Home Screen"
   - Verifica ícono y splash screen

---

**¿Necesitas ayuda?** Contacta a un diseñador o usa Fiverr (desde $5-20 para un paquete completo de íconos).
