# 🌐 SISTEMA DE IDIOMAS - DealTech365

**Estado**: ✅ **IMPLEMENTADO Y LISTO**
**Idiomas soportados**: Español 🇪🇸 | English 🇺🇸

---

## 📋 ¿QUÉ SE IMPLEMENTÓ?

### ✅ Sistema Completo de Internacionalización (i18n)
1. **Sistema de traducción dinámico** (`js/i18n.js`)
2. **Selector de idioma en el navbar** (`js/language-switcher.js`)
3. **Estilos personalizados** para el selector
4. **Detección automática** del idioma del navegador
5. **Persistencia** del idioma seleccionado (localStorage)

---

## 🎯 CARACTERÍSTICAS

### 1. Detección Automática
- Detecta el idioma del navegador del usuario
- Si es español → muestra el sitio en español
- Si es inglés u otro → muestra el sitio en inglés
- El usuario puede cambiar manualmente en cualquier momento

### 2. Selector de Idioma
- Ubicado en la barra de navegación (reemplaza el indicador de región)
- Muestra el idioma actual (ES/EN)
- Click para ver dropdown con opciones
- Banderas y checkmark para el idioma activo

### 3. Persistencia
- El idioma seleccionado se guarda en localStorage
- Persiste entre sesiones
- Se mantiene al navegar entre páginas

### 4. Traducciones Completas
- Navegación (Blog, Ofertas, Favoritos, etc.)
- Hero section (título, descripción, CTAs)
- Sección de ofertas
- Tarjetas de productos
- Newsletter
- Footer
- Página de favoritos
- Cookie consent
- Mensajes comunes

---

## 📁 ARCHIVOS CREADOS

```
js/
├── i18n.js                    ← Sistema de traducción (nuevo)
├── i18n.min.js                ← Versión minificada (nuevo)
├── language-switcher.js       ← Componente selector (nuevo)
└── language-switcher.min.js   ← Versión minificada (nuevo)

css/
└── styles.css                 ← +100 líneas de estilos para selector

SISTEMA-IDIOMAS.md             ← Esta documentación (nuevo)
```

---

## 🚀 CÓMO USAR

### Para Usuarios (Frontend)
1. **Cambiar idioma**: Click en el botón 🌐 ES/EN en la navbar
2. **Seleccionar idioma**: Click en Español 🇪🇸 o English 🇺🇸
3. **Automático**: El sitio se recarga con el nuevo idioma

### Para Desarrolladores

#### Agregar Nueva Traducción

**1. Edita `js/i18n.js`:**
```javascript
const translations = {
  es: {
    // Español
    nueva_clave: 'Texto en español',
  },
  en: {
    // English
    nueva_clave: 'Text in English',
  }
};
```

**2. Usa en HTML:**
```html
<!-- Con atributo data-i18n -->
<button data-i18n="nueva_clave">Texto</button>

<!-- Para placeholders -->
<input placeholder="Texto" data-i18n="nueva_clave">
```

**3. Usa en JavaScript:**
```javascript
const traduccion = window.i18n.t('nueva_clave');
console.log(traduccion); // "Texto en español" o "Text in English"
```

#### Obtener Idioma Actual

```javascript
const idioma = window.i18n.getCurrentLanguage();
console.log(idioma); // "es" o "en"
```

#### Cambiar Idioma Programáticamente

```javascript
window.i18n.setLanguage('en'); // Cambia a inglés y recarga
window.i18n.setLanguage('es'); // Cambia a español y recarga
```

#### Escuchar Cambios de Idioma

```javascript
window.addEventListener('languageChanged', (event) => {
  const nuevoIdioma = event.detail.language;
  console.log('Idioma cambiado a:', nuevoIdioma);
});
```

---

## 📖 TRADUCCIONES DISPONIBLES

### Navegación
- `nav_blog` → Blog
- `nav_deals` → Ofertas / Deals
- `nav_favorites` → Favoritos / Favorites
- `nav_newsletter` → Newsletter
- `nav_profile` → Perfil / Profile

### Hero Section
- `hero_title` → Título principal
- `hero_description` → Descripción
- `hero_cta_primary` → "Ver ofertas destacadas" / "View featured deals"
- `hero_cta_secondary` → "Leer blog" / "Read blog"

### Productos
- `product_discount` → "de descuento" / "off"
- `product_view_deal` → "Ver oferta" / "View deal"
- `product_add_favorite` → "Agregar a favoritos" / "Add to favorites"

### Categorías
- `category_laptops` → Laptops
- `category_smartphones` → Smartphones
- `category_audio` → Audio
- `category_gaming` → Gaming

### Newsletter
- `newsletter_title` → "No te pierdas ninguna oferta" / "Don't miss any deal"
- `newsletter_btn_subscribe` → "Suscribirse" / "Subscribe"

### Footer
- `footer_copyright` → "© 2025 DealTech365. Todos los derechos reservados" / "All rights reserved"
- `footer_affiliate_disclosure` → Disclosure de afiliados

### Común
- `common_loading` → "Cargando..." / "Loading..."
- `common_error` → "Error"
- `common_success` → "Éxito" / "Success"

**... y muchas más** (ver `js/i18n.js` para la lista completa)

---

## 🎨 DISEÑO DEL SELECTOR

### Desktop
```
┌─────────────────┐
│ 🌐 ES ▼         │ ← Botón
└─────────────────┘
        │
        ▼
┌───────────────────┐
│ 🇪🇸 Español    ✓ │ ← Activo
│ 🇺🇸 English      │
└───────────────────┘
```

### Mobile
- Se adapta al tamaño de pantalla
- Dropdown centrado
- Touch-friendly

---

## ⚙️ CONFIGURACIÓN TÉCNICA

### Idiomas Soportados
```javascript
const LANGUAGES = {
  es: 'Español',
  en: 'English'
};
```

### Lógica de Detección
1. **localStorage**: `language` key
2. **Navegador**: `navigator.language`
3. **Default**: `en` (inglés)

### Estructura de Traducción
```javascript
translations = {
  es: { /* Todas las traducciones en español */ },
  en: { /* All translations in English */ }
}
```

---

## 🔧 BUILD Y DEPLOYMENT

### Comandos NPM
```bash
# Minificar archivos i18n
npm run minify:js:i18n
npm run minify:js:language

# Build completo (incluye i18n)
npm run build

# Deploy
npm run deploy
```

### Archivos a Subir
```
deploy-ready/
├── js/
│   ├── i18n.min.js              ← NUEVO
│   ├── language-switcher.min.js ← NUEVO
│   ├── (otros archivos JS)
├── css/
│   └── styles.min.css           ← Actualizado con estilos selector
└── (otros archivos)
```

---

## 🌍 AGREGAR NUEVO IDIOMA

Si quieres agregar otro idioma (por ejemplo, Francés):

**1. Actualiza LANGUAGES:**
```javascript
const LANGUAGES = {
  es: 'Español',
  en: 'English',
  fr: 'Français'  // ← Nuevo
};
```

**2. Agrega traducciones:**
```javascript
const translations = {
  es: { /* ... */ },
  en: { /* ... */ },
  fr: {  // ← Nuevo
    nav_blog: 'Blog',
    nav_deals: 'Offres',
    // ... todas las traducciones
  }
};
```

**3. Actualiza bandera en language-switcher.js:**
```javascript
<span class="language-switcher__flag">
  ${code === 'es' ? '🇪🇸' : code === 'en' ? '🇺🇸' : '🇫🇷'}
</span>
```

**4. Rebuild:**
```bash
npm run build
```

---

## 📊 ESTADÍSTICAS

### Tamaños de Archivos
```
i18n.js:                ~12 KB (código fuente)
i18n.min.js:            ~4 KB (minificado)

language-switcher.js:   ~3 KB (código fuente)
language-switcher.min.js: ~1.5 KB (minificado)

Total agregado:         ~5.5 KB minificado
```

### Traducciones Incluidas
- **Español**: 80+ strings traducidos
- **English**: 80+ translated strings
- **Total**: 160+ translation keys

---

## 🐛 TROUBLESHOOTING

### El selector no aparece
**Solución**: Verifica que los scripts estén cargados:
```html
<script src="js/i18n.min.js"></script>
<script src="js/language-switcher.min.js"></script>
```

### Las traducciones no funcionan
**Solución**: Asegúrate de tener el atributo `data-i18n`:
```html
<!-- Correcto -->
<h1 data-i18n="hero_title">Título</h1>

<!-- Incorrecto -->
<h1>Título</h1>
```

### El idioma no persiste
**Solución**: Verifica que localStorage esté habilitado en el navegador

### Algunas traducciones faltan
**Solución**: Agrega las traducciones en `js/i18n.js` y rebuild

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

```
[✅] Sistema i18n creado (i18n.js)
[✅] Componente selector creado (language-switcher.js)
[✅] Estilos CSS agregados
[✅] package.json actualizado
[✅] Archivos minificados generados
[✅] 80+ traducciones español
[✅] 80+ traducciones inglés
[✅] Detección automática de idioma
[✅] Persistencia en localStorage
[✅] Selector visual en navbar
[✅] Responsive design
[✅] Documentación completa
```

---

## 🎯 PRÓXIMOS PASOS

### Inmediato
- [ ] Ejecutar `npm run build`
- [ ] Ejecutar `npm run deploy:prepare`
- [ ] Subir `deploy-ready/` a cPanel
- [ ] Probar cambio de idioma en el sitio live

### Futuro (Opcional)
- [ ] Agregar más idiomas (Francés, Alemán, Portugués)
- [ ] Traducir contenido de blog posts
- [ ] Traducir nombres de productos
- [ ] SEO multiidioma (hreflang tags)
- [ ] URLs específicas por idioma (/es/, /en/)

---

## 💡 MEJORES PRÁCTICAS

### 1. Usa Claves Descriptivas
```javascript
// ✅ Bueno
'hero_title': 'Título del hero'

// ❌ Malo
't1': 'Título del hero'
```

### 2. Agrupa por Sección
```javascript
// Navegación
nav_blog, nav_deals, nav_favorites

// Hero
hero_title, hero_description, hero_cta

// Footer
footer_copyright, footer_privacy
```

### 3. Mantén Consistencia
- Mismo tono en ambos idiomas
- Longitud similar de textos
- CTAs claros y directos

### 4. Testa en Ambos Idiomas
- Verifica diseño con textos más largos
- Revisa errores ortográficos
- Prueba en móvil y desktop

---

## 🎉 RESULTADO

### Antes
- Solo español 🇪🇸
- Sin opción de cambio
- Audiencia limitada

### Ahora
- **Bilingüe** 🇪🇸 🇺🇸
- **Cambio fácil** (1 click)
- **Audiencia global**
- **Detección automática**
- **Experiencia mejorada**

---

## 📚 RECURSOS

### Archivos del Sistema
- `js/i18n.js` - Sistema principal
- `js/language-switcher.js` - Componente UI
- `css/styles.css` (líneas 1522-1640) - Estilos
- `package.json` - Scripts de build

### Documentación
- Este archivo: `SISTEMA-IDIOMAS.md`
- README principal: `README-LANZAMIENTO.md`

---

**Sistema de Idiomas Implementado** ✅
**Versión**: 1.0.0
**Fecha**: 2025-11-19
**Idiomas**: Español 🇪🇸 | English 🇺🇸
