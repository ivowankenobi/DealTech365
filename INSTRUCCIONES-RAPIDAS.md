# Instrucciones Rápidas - Solución de Problemas

## ⚠️ Problema: Los precios están en dólares ($) en España

### ✅ Solución RÁPIDA (Recomendada)
El sistema ahora **detecta y corrige automáticamente** el problema de caché.

**Simplemente recarga la página:**
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

El sistema validará que tu timezone coincida con la moneda guardada y corregirá automáticamente cualquier inconsistencia.

### Solución 1: Borrar caché manualmente (si la recarga no funciona)
1. Abre la consola del navegador (F12)
2. Pega este código y presiona Enter:
```javascript
localStorage.clear();
location.reload();
```

### Solución 2: Forzar configuración manual para España
1. Abre la consola del navegador (F12)
2. Pega este código y presiona Enter:
```javascript
localStorage.setItem('userRegion', JSON.stringify({
  continent: 'EU',
  country: 'Spain',
  countryCode: 'ES',
  currency: 'EUR',
  currencySymbol: '€',
  isEurope: true,
  timezone: 'Europe/Madrid'
}));
location.reload();
```

### Solución 3: Verificar detección automática
1. Abre DevTools (F12)
2. Ve a la pestaña "Console"
3. Busca mensajes que digan "Region detected"
4. Deberías ver algo como: `Region detected via timezone: {isEurope: true, currency: "EUR"...}`

---

## 🌍 Cambios Implementados

### 1. Menú Superior Izquierda ✅
- El menú ahora está alineado a la izquierda
- Logo → Menú → Indicador de región (derecha)

### 2. Menú de Perfil Mejorado ✅
- Diseño en grid (2-3 columnas según pantalla)
- Tarjetas más grandes y espaciadas
- Efectos hover mejorados
- Iconos más grandes con gradiente azul

### 3. Sistema de Precios por Región ✅
- **Detección automática** por timezone primero
- **Fallback a IP API** si falla
- **Caché en localStorage** para velocidad
- **España = € (Euros)**
- **Resto del mundo = $ (Dólares)**

---

## 🧪 Cómo Testear

### Opción 1: Abrir directamente
```
file:///c:/BLACK%20FRIDAY%20EVERYDAY/index.html
```

### Opción 2: Doble clic
1. Ir a `c:\BLACK FRIDAY EVERYDAY\`
2. Doble clic en `index.html`

---

## 🔍 Ver el estado actual de tu región

Abre la consola (F12) y escribe:
```javascript
window.getRegion()
```

Deberías ver algo como:
```javascript
{
  continent: "EU",
  country: "Spain",
  currency: "EUR",
  currencySymbol: "€",
  isEurope: true
}
```

---

## 📸 Cómo debe verse

### Menú Superior
```
🛍️ Black Friday Tech  |  Blog  Ofertas  Negocio  Perfil  |  🇪🇺 Spain | €
└─ Izquierda                                                   Derecha ─┘
```

### Precios en España
- MacBook Air M2: **€899.25** ~~€1,103.08~~
- AirPods Pro 2: **€199.20** ~~€229.08~~
- iPhone 15 Pro: **€849.15** ~~€918.08~~

### Precios en USA
- MacBook Air M2: **$899.25** ~~$1,199.00~~
- AirPods Pro 2: **$199.20** ~~$249.00~~
- iPhone 15 Pro: **$849.15** ~~$999.00~~

---

## ⚡ Refresh Rápido

Si haces cambios y no se ven reflejados:
```
Ctrl + Shift + R  (Windows/Linux)
Cmd + Shift + R   (Mac)
```

Esto fuerza la recarga sin caché.

---

## 📁 Archivos Modificados en este Update

1. **css/styles.css** - Menú izquierda + Perfil mejorado
2. **js/region.js** - Detección mejorada con timezone primero
3. **js/deals.js** - Espera a región antes de generar ofertas

---

## 💡 Tips

- El sistema ahora detecta timezone primero (más confiable que IP)
- Si tu timezone es `Europe/Madrid` o cualquier `Europe/*`, verás €
- Los precios se convierten automáticamente (1 USD = 0.92 EUR)
- El caché se guarda en localStorage para velocidad

---

¿Sigues viendo dólares en España?
➡️ Usa **Solución 2** de arriba para forzar manualmente.
