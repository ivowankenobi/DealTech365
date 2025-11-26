# 🔗 GUÍA COMPLETA: Amazon Associates y Links de Afiliado

**Para DealTech365 - dealtech365.com**

---

## 📋 TABLA DE CONTENIDOS

1. [Registrarse en Amazon Associates](#paso-1-registrarse)
2. [Obtener tu Tag de Afiliado](#paso-2-obtener-tag)
3. [Actualizar Links en tu Sitio](#paso-3-actualizar-links)
4. [Verificar y Desplegar](#paso-4-verificar)
5. [Generar Links de Productos](#paso-5-generar-links)
6. [Tips y Mejores Prácticas](#tips)

---

## PASO 1: Registrarse en Amazon Associates {#paso-1-registrarse}

### Para España (Recomendado si tu audiencia es española):

1. **Ve a**: https://afiliados.amazon.es
2. **Click en**: "Únete ahora gratis"
3. **Inicia sesión** con tu cuenta de Amazon (o crea una)

### Para Latinoamérica:

- **México**: https://afiliados.amazon.com.mx
- **Brasil**: https://associados.amazon.com.br

### Para Estados Unidos:

- **USA**: https://affiliate-program.amazon.com

### Completar el Formulario:

```
✅ Información de tu sitio web:
   - Nombre: DealTech365
   - URL: https://dealtech365.com
   - Descripción: "Sitio web de ofertas y descuentos en tecnología"
   - Contenido: "Reseñas de productos tech, guías de compra, ofertas"

✅ Perfil:
   - Tipo de sitio: Blog/Comparador de productos
   - Categorías: Electrónica, Ordenadores, Tecnología
   - Tráfico mensual: Nuevo sitio (puedes actualizarlo después)

✅ Método de pago:
   - Transferencia bancaria (recomendado)
   - Cheque
   - Tarjeta regalo Amazon
```

### ⏳ Tiempo de Aprobación:

- **España/EU**: 1-3 días hábiles
- **USA**: Instantáneo (pero revisión posterior)
- **Requisitos**:
  - Tener contenido original (✅ Tu sitio ya cumple)
  - Al menos 10 posts/páginas (✅ Tienes 20 productos + 6 blog posts)
  - Primeras 3 ventas en 180 días para mantener cuenta activa

---

## PASO 2: Obtener tu Tag de Afiliado {#paso-2-obtener-tag}

Una vez aprobado:

1. **Accede** a tu dashboard de Amazon Associates
2. **Ve a**: "Account Settings" o "Configuración de cuenta"
3. **Busca**: "Associate ID" o "Tag ID" o "Tracking ID"
4. **Copia** tu tag (formato típico):

```
dealtech365-21        (España)
dealtech365-20        (USA)
dealtech3650c-20      (México)
```

**IMPORTANTE**: El número al final (20, 21) es asignado por Amazon automáticamente.

---

## PASO 3: Actualizar Links en tu Sitio {#paso-3-actualizar-links}

### OPCIÓN A: Script Automático (RECOMENDADO - 2 min)

**1. Ejecuta el script de actualización:**

```bash
# Si tienes el mismo tag para US y EU:
node update-affiliate-tags.js dealtech365-21

# Si tienes tags diferentes:
node update-affiliate-tags.js dealtech365-20 dealtech365-21
```

**2. El script hace:**
- ✅ Crea backup de deals.js
- ✅ Actualiza TODOS los links de Amazon US
- ✅ Actualiza TODOS los links de Amazon EU
- ✅ Muestra resumen de cambios

**Ejemplo de salida:**
```
🔗 Actualizador de Tags de Afiliado Amazon
═══════════════════════════════════════════════

✅ Tags configurados:
   US (Amazon.com): dealtech365-20
   EU (Amazon.es): dealtech365-21

📖 Leyendo js/deals.js...
📊 Links encontrados:
   Amazon US: 20 links
   Amazon EU: 20 links

💾 Backup creado: js/deals.js.backup

🔄 Actualizando tags US...
🔄 Actualizando tags EU...
✅ Archivo actualizado exitosamente

🎉 ¡TAGS ACTUALIZADOS!
```

### OPCIÓN B: Manual (Si prefieres editar tú mismo)

1. **Abre**: `js/deals.js`

2. **Busca y reemplaza**:

```javascript
// ANTES (tag de ejemplo):
amazon: 'https://www.amazon.com/dp/B0B3C2R8MP?tag=blackfridaytech-20'

// DESPUÉS (con tu tag):
amazon: 'https://www.amazon.com/dp/B0B3C2R8MP?tag=TU-TAG-AQUI-20'
```

3. **Para links EU que no tienen tag**, agrégalo:

```javascript
// ANTES:
amazon: 'https://www.amazon.es/dp/B0B3C2R8MP'

// DESPUÉS:
amazon: 'https://www.amazon.es/dp/B0B3C2R8MP?tag=TU-TAG-AQUI-21'
```

4. **Repite para todos los productos** (hay 20 en total)

---

## PASO 4: Verificar y Desplegar {#paso-4-verificar}

### 1. Verifica los Cambios:

```bash
# Abre el archivo y revisa que los tags son correctos
notepad js/deals.js
```

**Busca ejemplos como:**
```javascript
amazon: 'https://www.amazon.com/dp/B0B3C2R8MP?tag=dealtech365-20'
amazon: 'https://www.amazon.es/dp/B0B3C2R8MP?tag=dealtech365-21'
```

### 2. Reconstruye el Sitio:

```bash
npm run build
```

Esto minifica el archivo deals.js → deals.min.js

### 3. Prepara para Deployment:

```bash
npm run deploy:prepare
```

Esto crea la carpeta `deploy-ready/` con los archivos actualizados.

### 4. Sube al Servidor:

**Si ya está en producción:**
1. Accede a cPanel de Bana Hosting
2. File Manager → public_html/js/
3. Sube **solo** el archivo `deals.min.js` actualizado
4. ¡Listo! Los nuevos links ya están activos

**Si aún no has lanzado:**
1. Sigue la guía normal de deployment
2. Los links ya estarán correctos desde el inicio

---

## PASO 5: Generar Links de Productos Nuevos {#paso-5-generar-links}

### Método 1: SiteStripe (Más Rápido)

1. **Instala** la barra de Amazon Associates (se instala automáticamente al aprobar tu cuenta)
2. **Ve** a cualquier producto en Amazon.com o Amazon.es
3. **Verás** una barra superior con "Get Link"
4. **Click** en "Get Link" → "Text and Image"
5. **Copia** el link corto que aparece

### Método 2: Link Builder en Dashboard

1. **Ve** a tu dashboard de Amazon Associates
2. **Click** en "Product Linking" → "Link to Any Page"
3. **Busca** el producto por nombre o ASIN
4. **Click** en "Get Link"
5. **Copia** el link generado

### Método 3: Manual (Agregar Tag a URL)

```javascript
// URL del producto en Amazon:
https://www.amazon.es/dp/B0CTKZ8R19

// Agrega tu tag:
https://www.amazon.es/dp/B0CTKZ8R19?tag=dealtech365-21

// ¡Listo! Ya es un link de afiliado
```

### Agregar al Sitio:

1. **Abre**: `js/deals.js`
2. **Busca** la categoría apropiada (laptops, smartphones, etc.)
3. **Agrega** el nuevo producto:

```javascript
{
  name: 'Nuevo Producto',
  brand: 'Marca',
  basePrice: 999,
  discount: 20,
  image: 'URL_IMAGEN',
  asin: 'B0XXXXXXXX',  // Copia del link de Amazon
  specs: {
    // Especificaciones
  },
  affiliateLinks: {
    US: {
      amazon: 'https://www.amazon.com/dp/B0XXXXXXXX?tag=dealtech365-20'
    },
    EU: {
      amazon: 'https://www.amazon.es/dp/B0XXXXXXXX?tag=dealtech365-21'
    }
  }
}
```

4. **Guarda**, ejecuta `npm run build`, y sube actualización

---

## TIPS Y MEJORES PRÁCTICAS {#tips}

### ✅ Comisiones de Amazon Associates:

**Categorías con mejor comisión** (España):
- 📱 Electrónica: 1-4%
- 💻 Ordenadores: 1-3%
- 🎮 Videojuegos: 1-3%
- 📚 Libros/Kindle: 5-10%

**Para maximizar ganancias:**
- Enfócate en productos de precio medio-alto (comisión fija mayor)
- Promociona categorías con comisión más alta
- Crea contenido de calidad (reseñas, comparativas)

### ✅ Tracking y Analytics:

1. **Dashboard de Amazon Associates** muestra:
   - Clicks en tus links
   - Conversiones (ventas)
   - Ganancias estimadas
   - Productos más vendidos

2. **Integra con Google Analytics** (ya está configurado en tu sitio)
   - Los clicks en productos se trackean automáticamente
   - Puedes ver qué productos tienen más clicks

### ✅ Reglas Importantes:

**Prohibido por Amazon:**
- ❌ No usar tus propios links para comprar
- ❌ No pedir a amigos/familia que usen tus links
- ❌ No usar en emails (solo en sitios web)
- ❌ No modificar los precios mostrados

**Permitido:**
- ✅ Compartir en redes sociales (con disclosure)
- ✅ Usar en blogs y sitios web
- ✅ Comparar productos
- ✅ Hacer reseñas honestas

### ✅ Disclosure Legal:

**Tu sitio ya tiene** la disclosure en:
- Footer de todas las páginas
- Página dedicada: `/pages/affiliate-disclosure.html`

**Texto actual** (conforme a normativas):
> "Como Asociado de Amazon, gano por compras cualificadas"

### ✅ Mantener Cuenta Activa:

**Requisitos**:
- Al menos 3 ventas en los primeros 180 días
- Después, mantener actividad regular
- Si no hay ventas por 1 año, pueden cerrar la cuenta

**Tips para primeras ventas**:
1. Promociona en redes sociales
2. Comparte en grupos de tecnología
3. Escribe blog posts de calidad
4. Usa SEO para atraer tráfico orgánico

### ✅ Otros Programas de Afiliados (Opcional):

Tu sitio ya incluye links a:
- **Newegg**: https://www.newegg.com/promotions/affiliate/
- **Best Buy**: https://www.bestbuy.com/site/affiliate-program
- **MediaMarkt**: Programa de afiliados europeo
- **PC Componentes**: Programa de afiliados España

Puedes registrarte en estos también para diversificar ingresos.

---

## 🔧 TROUBLESHOOTING

### "No me aprueba Amazon Associates"

**Motivos comunes**:
- Sitio sin contenido suficiente (necesitas al menos 10 posts)
- Sitio no accesible (asegúrate de que dealtech365.com esté live)
- Información incompleta en el formulario

**Solución**:
- Espera a que el sitio esté live
- Completa al menos 10 posts en el blog
- Reaplica después de 30 días

### "Los links no generan comisiones"

**Verifica**:
1. ✅ Tag correcto en los links
2. ✅ Links apuntan a Amazon (no redireccionan a otros sitios)
3. ✅ Cookie de Amazon activa (dura 24 horas)
4. ✅ Compra completada por el usuario

### "Quiero cambiar mi tag"

1. No puedes cambiar el tag principal
2. Pero puedes crear "Tracking IDs" adicionales:
   - Ve a "Manage Your Tracking IDs"
   - Crea nuevos tags para diferentes campañas
   - Ejemplo: `dealtech365-blog-21`, `dealtech365-social-21`

---

## 📊 RESUMEN RÁPIDO

```
1️⃣ Regístrate en Amazon Associates
   → https://afiliados.amazon.es (España)
   → Espera aprobación (1-3 días)

2️⃣ Obtén tu Tag de Afiliado
   → Dashboard → Account Settings → Associate ID
   → Ejemplo: dealtech365-21

3️⃣ Actualiza Links en tu Sitio
   → node update-affiliate-tags.js dealtech365-21
   → Verifica js/deals.js

4️⃣ Reconstruye y Despliega
   → npm run build
   → npm run deploy:prepare
   → Sube deploy-ready/ al servidor

5️⃣ ¡Empieza a Ganar!
   → Trackea en dashboard de Amazon Associates
   → Optimiza productos con más ventas
```

---

## 📞 RECURSOS

**Amazon Associates:**
- Dashboard España: https://afiliados.amazon.es
- Centro de ayuda: https://afiliados.amazon.es/help
- Políticas: https://afiliados.amazon.es/help/operating/agreement

**Herramientas:**
- `update-affiliate-tags.js` - Actualiza tags automáticamente
- `js/deals.js` - Archivo con todos los productos
- Dashboard Analytics - Trackea clicks en productos

**Documentación del Sitio:**
- `/pages/affiliate-disclosure.html` - Disclosure legal
- `GUIA-AMAZON-ASSOCIATES.md` - Esta guía

---

**Última actualización**: 2025-11-19
**Versión**: 1.0.0
**Sitio**: dealtech365.com

---

**¿Necesitas ayuda?**
- Soporte Amazon: afiliados-soporte@amazon.es
- Documentación del sitio: [START-HERE.md](START-HERE.md)
