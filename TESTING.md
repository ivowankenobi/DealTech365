# Guía de Testing - Black Friday Tech 2025

## 🚀 Cómo Abrir la Aplicación

### Opción 1 - URL Directa
Copia y pega en tu navegador:
```
file:///c:/BLACK%20FRIDAY%20EVERYDAY/index.html
```

### Opción 2 - Explorador de Archivos
1. Navega a `c:\BLACK FRIDAY EVERYDAY\`
2. Doble clic en `index.html`

### Opción 3 - Arrastra y Suelta
Arrastra `index.html` directamente a tu navegador

---

## ✅ Funcionalidades Implementadas

### 1. **Menú de Navegación Superior** ✨ NUEVO
- **Ubicación**: Parte superior izquierda (fijo)
- **Elementos**:
  - 🛍️ Logo (Black Friday Tech)
  - Blog - Lleva a la sección de blog
  - Ofertas - Página de productos con ofertas
  - Negocio - Sección de modelo de negocio
  - Perfil - Configuración de usuario
  - Indicador de región y moneda

**Cómo probar**:
- Haz scroll en la página - el menú se mantiene fijo
- Haz clic en cada opción del menú
- En móvil, el menú se adapta responsivamente

---

### 2. **Sistema de Detección de Región y Moneda** ✨ NUEVO

#### Detección Automática
El sistema detecta tu ubicación mediante:
1. **API de geolocalización IP** (ipapi.co)
2. **Timezone del navegador** (fallback)
3. **LocalStorage** (caché)

#### Conversión de Monedas
- **Europa**: Precios en **€ (Euros)**
- **Resto del mundo**: Precios en **$ (Dólares)**
- **Tasa de conversión**: 1 USD = 0.92 EUR

**Cómo probar**:
1. Abre la página y observa el indicador superior derecho
2. Verás tu país detectado y moneda (ej: "🇪🇺 Spain | €")
3. Ve a "Ofertas" (My Favorites) y verifica que los precios estén en tu moneda
4. Para simular otra región:
   - Abre DevTools (F12)
   - Console: `localStorage.removeItem('userRegion')`
   - Edita manualmente:
   ```javascript
   localStorage.setItem('userRegion', JSON.stringify({
     isEurope: true,
     currency: 'EUR',
     currencySymbol: '€',
     country: 'Spain'
   }))
   ```
   - Recarga la página

---

### 3. **Imágenes de Productos** ✨ NUEVO

#### Fuente de Imágenes
- Usamos **Unsplash** (servicio gratuito de imágenes de alta calidad)
- 20 productos con imágenes reales
- Categorías: Laptops, Audio, Smartphones, Gaming

**Cómo probar**:
1. Ve a "Ofertas" en el menú
2. Verás tarjetas con imágenes reales de productos
3. Las imágenes se cargan desde Unsplash CDN
4. Hover sobre las tarjetas para ver efectos

**Nota**: Si no tienes conexión a internet, las imágenes no cargarán, pero verás el icono emoji de la categoría.

---

### 4. **Acceso al Blog** ✨ NUEVO

El blog está accesible desde:
- **Menú superior**: Opción "Blog"
- **Hero section**: Botón "Ver publicaciones destacadas"

**Contenido del Blog**:
- Mejores laptops Black Friday 2025
- Ofertas relámpago audio premium
- Comparador de smartphones top

**Cómo probar**:
1. Haz clic en "Blog" en el menú
2. Scroll hacia la sección de blog
3. Haz clic en "Ver oferta" en cualquier artículo
4. Te llevará a Amazon/Newegg/Best Buy

---

## 🧪 Testing Completo

### Test 1: Página Principal (index.html)
- [x] Menú de navegación visible
- [x] Indicador de región muestra país y moneda
- [x] Newsletter funciona (validación de email)
- [x] Sección de blog visible
- [x] Links de afiliados funcionan
- [x] Perfil con 6 opciones clickeables

### Test 2: Ofertas (pages/favorites.html)
- [x] Menú de navegación presente
- [x] 20 productos con imágenes reales
- [x] Precios en moneda correcta (EUR o USD)
- [x] Búsqueda funciona en tiempo real
- [x] Filtro por categoría funciona
- [x] Botón "Actualizar" genera nuevos descuentos
- [x] Favoritos (❤️) se guardan en localStorage
- [x] "Ver oferta" abre enlace de afiliado
- [x] Responsive en móvil

### Test 3: Editar Perfil (pages/edit-profile.html)
- [x] Formulario completo
- [x] Guardado en localStorage
- [x] Mensaje de éxito aparece
- [x] Checkboxes de intereses funcionan

### Test 4: Notificaciones (pages/notifications.html)
- [x] 5 notificaciones visibles
- [x] Iconos y tiempos correctos
- [x] Hover effects funcionan

### Test 5: Configuración de Idioma y Región (pages/language.html)
- [x] Selector de idioma (ES, EN, PT, FR)
- [x] Selector de región (Auto, Europa, USA, México, LATAM)
- [x] Botón "Guardar configuración" funciona
- [x] Botón "Restablecer" funciona
- [x] Configuración se guarda en localStorage
- [x] Configuración manual sobrescribe detección automática
- [x] Mensaje de éxito aparece al guardar
- [x] Región se actualiza en tiempo real

### Test 6: Responsive Design
- [x] Menú se adapta a móvil
- [x] Cards de productos en 1 columna
- [x] Textos legibles
- [x] Botones accesibles

---

## 📊 Datos de Testing

### Productos Disponibles
| Categoría | Cantidad | Descuento Range |
|-----------|----------|-----------------|
| Laptops | 5 | 15% - 30% |
| Audio | 5 | 20% - 40% |
| Smartphones | 5 | 15% - 35% |
| Gaming | 5 | 8% - 20% |

### Redes de Afiliados
Cada producto tiene **links específicos** (no búsquedas genéricas):
- **Amazon**: Links directos con ASIN (ej: amazon.com/dp/B0B3C2R8MP)
- **Newegg**: SKUs específicos de producto
- **Best Buy**: URLs directas de producto

Los links rotan aleatoriamente entre las 3 redes, pero siempre apuntan al producto exacto con su oferta específica.

### Conversión de Monedas (Ejemplos)
| Producto | USD | EUR |
|----------|-----|-----|
| MacBook Air M2 | $899 | €827 |
| AirPods Pro 2 | $199 | €183 |
| PlayStation 5 | $449 | €413 |

---

## ⚙️ Configuración de Idioma y Región

### Cómo Cambiar la Región Manualmente

1. **Ve a la página de configuración**:
   - Desde el perfil, haz clic en "Language"
   - O abre directamente: `file:///c:/BLACK%20FRIDAY%20EVERYDAY/pages/language.html`

2. **Selecciona tu idioma preferido**:
   - 🇪🇸 Español
   - 🇺🇸 English
   - 🇧🇷 Português
   - 🇫🇷 Français

3. **Selecciona tu región**:
   - **🌍 Detección automática** (Recomendado) - Usa timezone + IP
   - **🇪🇺 Europa** - Muestra precios en € (EUR)
   - **🇺🇸 Estados Unidos** - Muestra precios en $ (USD)
   - **🇲🇽 México** - Muestra precios en $ (MXN)
   - **🌎 Latinoamérica** - Muestra precios en $ (USD)

4. **Haz clic en "Guardar configuración"**

5. **Verifica el cambio**:
   - Ve a "Ofertas" y comprueba que los precios estén en la moneda correcta
   - El indicador en la esquina superior derecha debe mostrar tu región

### Cómo Restablecer a Detección Automática

1. Ve a la página de configuración de idioma
2. Haz clic en el botón **"Restablecer"**
3. Confirma la acción
4. El sistema volverá a detectar automáticamente tu región

### Prioridad de Detección

El sistema usa este orden de prioridad:

1. **Configuración manual** (si la has establecido) ⭐
2. **Caché validado** (si coincide con timezone)
3. **API de geolocalización IP** (ipapi.co)
4. **Timezone del navegador** (fallback)

---

## 🐛 Solución de Problemas

### Las imágenes no cargan
**Causa**: Sin conexión a internet
**Solución**: Conéctate a internet o verás emojis como placeholders

### La región no se detecta
**Causa**: API bloqueada o sin internet
**Solución**: El sistema usa timezone como fallback, defaulteará a USD

### Los precios están en USD pero estoy en Europa
**Causa**: La API no detectó correctamente
**Solución**:
```javascript
// En la consola del navegador:
localStorage.setItem('userRegion', JSON.stringify({
  isEurope: true,
  currency: 'EUR',
  currencySymbol: '€',
  country: 'Spain'
}))
// Recarga la página
```

### El menú no se ve
**Causa**: CSS no cargado o cache
**Solución**: Ctrl + F5 para forzar recarga

---

## 🎯 Próximos Pasos

Para producción, necesitarías:
1. **Servidor web** (no file://)
2. **API real de geolocalización** con tu API key
3. **Imágenes locales** o CDN propio
4. **Base de datos** para productos
5. **API de afiliados** real (Amazon Product Advertising API)
6. **Backend** para newsletter y perfil

---

## 📧 Soporte

Si encuentras algún problema durante el testing:
1. Abre DevTools (F12)
2. Ve a Console y captura errores
3. Reporta en: hello@blackfridaytech.app

---

**Versión**: 2.0
**Última actualización**: Noviembre 2025
**Status**: ✅ Completamente funcional en local
