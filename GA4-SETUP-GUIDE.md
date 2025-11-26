# Google Analytics 4 Setup Guide

Esta guía te ayudará a configurar Google Analytics 4 (GA4) para tu sitio Black Friday Tech.

---

## 📋 RESUMEN

El sitio ya tiene integrado el código de Google Analytics 4 que:
- ✅ Respeta las preferencias de cookies del usuario (GDPR/CCPA)
- ✅ Solo se carga cuando el usuario acepta cookies analíticas
- ✅ Rastrea eventos importantes: clicks en productos, favoritos, newsletter, búsquedas
- ✅ Anonimiza IPs para privacidad
- ✅ Se integra automáticamente con el sistema de cookie consent

**Solo necesitas**: Obtener tu ID de medición de GA4 y configurarlo en el código.

---

## 🚀 CONFIGURACIÓN RÁPIDA (10 minutos)

### Paso 1: Crear cuenta de Google Analytics

1. Ve a https://analytics.google.com
2. Haz click en **"Empezar a medir"** o **"Admin"** (si ya tienes cuenta)
3. Click en **"Crear propiedad"**
4. Completa el formulario:
   - **Nombre de la propiedad**: "Black Friday Tech"
   - **Zona horaria**: Tu zona horaria (ej: UTC-5 para Colombia/Perú)
   - **Moneda**: USD (o tu moneda local)
5. Click en **"Siguiente"**
6. Selecciona categoría: **"Shopping"** o **"Technology"**
7. Tamaño del negocio: Elige el apropiado
8. Objetivos: Selecciona **"Generate leads"** y **"Measure user behavior"**
9. Click en **"Crear"**
10. Acepta los términos y condiciones

### Paso 2: Obtener tu Measurement ID

1. En Google Analytics, ve a **Admin** (icono de engranaje ⚙️ abajo a la izquierda)
2. En la columna "Propiedad", click en **"Flujos de datos"** (Data Streams)
3. Click en **"Añadir flujo"** → **"Web"**
4. Completa:
   - **URL del sitio web**: `https://blackfridaytech.app`
   - **Nombre del flujo**: "Black Friday Tech - Production"
5. Click en **"Crear flujo"**
6. Verás tu **MEASUREMENT ID** - Se ve así: `G-XXXXXXXXXX`
   - Copia este ID (lo necesitarás en el siguiente paso)

### Paso 3: Configurar el ID en tu código

1. Abre el archivo: `js/analytics.js`
2. En la **línea 10**, encuentra:
   ```javascript
   const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with real ID
   ```
3. Reemplaza `'G-XXXXXXXXXX'` con tu ID real:
   ```javascript
   const GA4_MEASUREMENT_ID = 'G-ABC1234567'; // ← Tu ID real aquí
   ```
4. Guarda el archivo

### Paso 4: Verificar que funciona

1. Abre tu sitio en un navegador
2. Abre la consola del navegador (F12 → Console)
3. Verás mensajes como:
   ```
   Analytics module loaded. Waiting for consent...
   ```
4. Acepta las cookies analíticas en el banner de consentimiento
5. Deberías ver:
   ```
   Analytics cookies accepted. Initializing GA4...
   Google Analytics 4 initialized successfully
   ```
6. Realiza algunas acciones (click en producto, favorito, búsqueda)
7. Verás mensajes como:
   ```
   GA4 Event tracked: select_item {item_id: "laptop-001", ...}
   ```

### Paso 5: Verificar en Google Analytics

1. Vuelve a Google Analytics
2. En el menú izquierdo, click en **"Informes"** → **"Tiempo real"**
3. Abre tu sitio en otra pestaña
4. En el informe de tiempo real, deberías ver:
   - Tu visita registrada
   - La página que estás viendo
   - Eventos que se están disparando
5. **Espera 24-48 horas** para que aparezcan datos en los informes históricos

---

## 📊 EVENTOS QUE SE RASTREAN

El sitio automáticamente rastrea estos eventos:

### 1. **Product Click** (`select_item`)
Cuando un usuario hace click en "Ver oferta":
```javascript
{
  item_list_name: "Product Grid",
  items: [{
    item_id: "laptop-001",
    item_name: "MacBook Pro M3",
    item_category: "laptops",
    price: 1799.99,
    quantity: 1
  }]
}
```

### 2. **Newsletter Signup** (`sign_up`)
Cuando un usuario se suscribe al newsletter:
```javascript
{
  method: "newsletter",
  success: true
}
```

### 3. **Search** (`search`)
Cuando un usuario busca productos:
```javascript
{
  search_term: "macbook"
}
```

### 4. **Add to Wishlist** (`add_to_wishlist`)
Cuando un usuario marca un producto como favorito:
```javascript
{
  items: [{
    item_id: "laptop-001",
    item_name: "MacBook Pro M3",
    item_category: "laptops"
  }]
}
```

### 5. **Remove from Wishlist** (`remove_from_wishlist`)
Cuando un usuario desmarca un favorito.

### 6. **Page View** (automático)
Cada vez que se carga una página.

---

## 🔧 CONFIGURACIÓN AVANZADA (Opcional)

### Mejorar el seguimiento de conversiones

1. En Google Analytics, ve a **Admin** → **Eventos**
2. Click en **"Crear evento"**
3. Crea eventos de conversión personalizados basados en los eventos existentes

### Eventos sugeridos para marcar como conversiones:
- `sign_up` (newsletter signup) ✅ **Alta prioridad**
- `select_item` cuando el usuario hace click en afiliado ✅ **Alta prioridad**

### Configurar objetivos:

1. Ve a **Admin** → **Objetivos de conversión**
2. Click en **"Nuevo objetivo de conversión"**
3. Selecciona el evento `sign_up`
4. Asigna un valor (ej: $5 por cada suscripción)
5. Repite para `select_item` (ej: $0.10 por click)

### Habilitar Google Signals (audiencias mejoradas)

1. Ve a **Admin** → **Recopilación de datos**
2. Activa **"Señales de Google"**
3. Esto mejora:
   - Remarketing
   - Informes demográficos
   - Informes de intereses
   - Seguimiento entre dispositivos

---

## 🎯 MÉTRICAS IMPORTANTES A MONITOREAR

### Métricas clave para tu sitio de afiliados:

1. **Usuarios activos** (Users)
   - Total de visitantes únicos
   - Meta: Crecimiento mensual de 20%+

2. **Sesiones** (Sessions)
   - Número de visitas al sitio
   - Meta: 1000+ sesiones/mes al inicio

3. **Tasa de rebote** (Bounce Rate)
   - Porcentaje que se va sin interactuar
   - Meta: < 60%

4. **Duración promedio de sesión**
   - Tiempo en el sitio
   - Meta: > 2 minutos

5. **Clicks en productos** (select_item events)
   - Cuántos clicks en "Ver oferta"
   - **Meta crítica**: 5-10% de conversion rate (clicks/visitantes)

6. **Newsletter signups** (sign_up events)
   - Cuántos se suscriben
   - Meta: 2-5% de conversion rate

7. **Búsquedas** (search events)
   - Qué buscan los usuarios
   - Meta: Identificar productos demandados

8. **Favoritos** (add_to_wishlist events)
   - Productos más guardados
   - Meta: Indicador de interés real

---

## 📈 INFORMES PERSONALIZADOS RECOMENDADOS

### Informe 1: Rendimiento de productos

1. Ve a **Explorar** → **Crear nueva exploración**
2. Tipo: **Exploración libre**
3. Dimensiones: `item_name`, `item_category`
4. Métricas: `event_count` (para select_item)
5. Filtro: `event_name = select_item`

**Resultado**: Verás qué productos tienen más clicks.

### Informe 2: Embudo de conversión

1. **Explorar** → **Análisis de embudo**
2. Pasos:
   - Paso 1: `page_view` (homepage)
   - Paso 2: `page_view` (favoritos/ofertas)
   - Paso 3: `select_item` (click en producto)
   - Paso 4: `sign_up` (newsletter)
3. **Resultado**: Verás dónde pierdes usuarios

### Informe 3: Términos de búsqueda populares

1. **Explorar** → **Exploración libre**
2. Dimensión: `search_term`
3. Métrica: `event_count`
4. Filtro: `event_name = search`

**Resultado**: Verás qué buscan más los usuarios (agrega esos productos!).

---

## 🔒 PRIVACIDAD Y CUMPLIMIENTO

### Configuraciones de privacidad ya implementadas:

✅ **IP Anonymization**: Habilitada en el código
```javascript
gtag('config', GA4_MEASUREMENT_ID, {
  'anonymize_ip': true,  // ← Cumple GDPR
  ...
});
```

✅ **Cookie Consent**: Solo carga GA4 si el usuario acepta

✅ **Data Deletion**: Las cookies se eliminan si el usuario rechaza analytics

### Configuración adicional recomendada en GA4:

1. Ve a **Admin** → **Configuración de datos**
2. **Retención de datos de eventos**: Elige **14 meses** (máximo para cuenta gratis)
3. **Restablecer datos de usuario al recibir nueva actividad**: **Desactivado** (mejor para privacidad)

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Problema 1: "GA4 no se carga"

**Causa probable**: Usuario no ha aceptado cookies analíticas

**Solución**:
1. Abre la consola (F12)
2. Busca el mensaje: "Analytics cookies not accepted"
3. Acepta las cookies analíticas en el banner
4. Recarga la página

### Problema 2: "Los eventos no aparecen en GA4"

**Posibles causas**:
1. **Espera 24-48 horas**: Los datos no son instantáneos en informes históricos
2. **Revisa Tiempo Real**: Ve a Informes → Tiempo real (los eventos aparecen aquí al instante)
3. **Verifica el Measurement ID**: Asegúrate de haber puesto el ID correcto en `analytics.js`

### Problema 3: "Error: gtag is not defined"

**Causa**: El script de GA4 no se cargó

**Solución**:
1. Verifica que el usuario aceptó cookies analíticas
2. Revisa la consola para errores de red
3. Asegúrate de que no tienes bloqueador de anuncios activo

### Problema 4: "Muchos datos de spam/bots"

**Solución**:
1. Ve a **Admin** → **Configuración de datos**
2. Activa **"Excluir referencias de bots y arañas conocidos"**
3. Configura filtros para excluir tráfico interno (tu IP)

---

## 📱 MONITOREO EN MÓVIL

Descarga la app de Google Analytics:
- **iOS**: https://apps.apple.com/app/google-analytics/id881599038
- **Android**: https://play.google.com/store/apps/details?id=com.google.android.apps.giant

Podrás ver:
- Usuarios activos en tiempo real
- Eventos importantes
- Métricas clave
- Alertas personalizadas

---

## 💡 CONSEJOS PRO

### 1. Configura alertas personalizadas

1. En la app móvil, ve a **Insights**
2. Activa notificaciones para:
   - Picos de tráfico (ej: +100% vs promedio)
   - Caídas de tráfico (ej: -50% vs promedio)
   - Nuevas conversiones (sign_up, select_item)

### 2. Integra con Google Search Console

1. Ve a **Admin** → **Vínculos de Search Console**
2. Click en **"Vincular"**
3. Selecciona tu propiedad de Search Console
4. **Beneficios**:
   - Ver búsquedas de Google que llevan a tu sitio
   - Identificar oportunidades de SEO
   - Mejorar posicionamiento

### 3. Usa segmentos personalizados

Crea segmentos para analizar:
- Usuarios que hicieron click en productos pero no se suscribieron al newsletter
- Usuarios que buscaron pero no encontraron nada (0 results)
- Usuarios que marcaron favoritos pero no hicieron click en "Ver oferta"

### 4. Configura audiencias para remarketing

1. **Admin** → **Audiencias**
2. Crea audiencia: "Usuarios que hicieron click en productos"
   - Condición: `event_name = select_item`
   - Duración: 30 días
3. Crea audiencia: "Suscriptores de newsletter"
   - Condición: `event_name = sign_up`
4. **Uso futuro**: Retargeting en Google Ads o Facebook Ads

---

## 🔄 MANTENIMIENTO

### Semanal:
- [ ] Revisar informe de Tiempo Real para verificar funcionamiento
- [ ] Revisar eventos de la semana (productos más clickeados)
- [ ] Analizar términos de búsqueda populares

### Mensual:
- [ ] Revisar informe de conversiones (newsletter signups, product clicks)
- [ ] Analizar embudo de conversión (dónde se pierden usuarios)
- [ ] Revisar fuentes de tráfico (orgánico, directo, social, referral)
- [ ] Comparar métricas mes vs mes (usuarios, sesiones, conversiones)
- [ ] Actualizar estrategia basada en datos (agregar productos populares, mejorar páginas con alta tasa de rebote)

### Trimestral:
- [ ] Auditoría completa de eventos (verificar que todos se disparan correctamente)
- [ ] Revisión de objetivos y conversiones
- [ ] Análisis de comportamiento de usuarios (mapas de calor, grabaciones de sesión con Hotjar/Microsoft Clarity)

---

## 🎓 RECURSOS DE APRENDIZAJE

### Cursos gratis de Google:
- **Google Analytics Academy**: https://analytics.google.com/analytics/academy/
  - "Google Analytics for Beginners" (1 hora)
  - "Advanced Google Analytics" (3 horas)
  - "Getting Started with Google Analytics 4" (2 horas)

### Documentación oficial:
- **GA4 Help Center**: https://support.google.com/analytics/
- **GA4 Developer Guide**: https://developers.google.com/analytics/devguides/collection/ga4

### Comunidad:
- **r/analytics** (Reddit): https://reddit.com/r/analytics
- **Measure Slack**: https://www.measure.chat/

---

## ✅ CHECKLIST DE CONFIGURACIÓN

- [ ] Cuenta de Google Analytics creada
- [ ] Propiedad GA4 creada
- [ ] Flujo de datos web configurado
- [ ] Measurement ID obtenido (G-XXXXXXXXXX)
- [ ] ID configurado en `js/analytics.js`
- [ ] Sitio probado en navegador
- [ ] Consola del navegador revisada (sin errores)
- [ ] Eventos verificados en Tiempo Real
- [ ] Google Signals habilitado (opcional)
- [ ] Search Console vinculado (opcional)
- [ ] Objetivos de conversión configurados
- [ ] Alertas configuradas en app móvil
- [ ] Informe personalizado de productos creado
- [ ] Informe de embudo de conversión creado

---

## 📞 SOPORTE

Si tienes problemas:

1. **Revisa la consola del navegador** (F12 → Console) para mensajes de error
2. **Verifica que el cookie consent está funcionando** correctamente
3. **Comprueba que el Measurement ID es correcto** en `analytics.js`
4. **Consulta el FAQ de Google Analytics**: https://support.google.com/analytics/

---

**¡Listo!** Tu sitio ahora tiene Google Analytics 4 completamente funcional y compatible con GDPR/CCPA. 🎉

Los datos comenzarán a aparecer en los informes en 24-48 horas. Usa el informe de **Tiempo Real** para verificación inmediata.
