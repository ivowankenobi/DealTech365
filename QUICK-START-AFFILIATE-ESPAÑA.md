# 🚀 Quick Start: Affiliate Programs España

## ⏱️ Timeline: 10-14 días

### **SEMANA 1: Registros**

#### **Día 1-2: Awin (MediaMarkt + FNAC)**
```
1. Ve a: https://www.awin.com/es/afiliados
2. Click "Únete ahora"
3. Completa formulario:
   - Website: dealtech365.com
   - Categoría: Technology / Price Comparison
   - Tráfico: 1,000-5,000/mes
4. IMPORTANTE: Sitio debe estar LIVE
5. Espera email de aprobación (1-3 días)
```

#### **Día 1-2: TradeTracker (PcComponentes)**
```
1. Ve a: https://www.tradetracker.com/
2. Click "Regístrate" → "Afiliado"
3. Completa formulario:
   - Website: dealtech365.com
   - Categoría: Technology
4. Espera email de aprobación (1-2 días)
```

---

### **SEMANA 2: Unirse a Programas**

#### **Día 3-7: Solicitar MediaMarkt y FNAC**
```
Después de aprobación Awin:

1. Login en Awin
2. Busca "MediaMarkt" → Join Programme (Advertiser ID: 10206)
3. Busca "FNAC" → Join Programme (Advertiser ID: 7224)
4. Espera aprobación (3-7 días)
```

#### **Día 3-7: Solicitar PcComponentes**
```
Después de aprobación TradeTracker:

1. Login en TradeTracker
2. Busca "PcComponentes" (Campaign ID: 21449)
3. Click "Solicitar Afiliación"
4. Espera aprobación (2-5 días)
```

---

### **SEMANA 2: Implementación**

#### **Día 8: Anotar IDs**

Después de todas las aprobaciones, anota:

```javascript
// En: js/affiliate-link-generator.js

const AFFILIATE_IDS = {
  // AWIN
  awinPublisher: '______',      // De: Awin → Settings → Publisher ID
  mediamarktMID: '10206',        // ✅ Fijo
  fnacMID: '7224',               // ✅ Fijo

  // TRADETRACKER
  tradeTrackerAffiliate: '______', // De: TradeTracker → Account
  pcComponentesCampaign: '21449',  // ✅ Fijo
};
```

#### **Día 9: Actualizar Links**

```bash
# 1. Actualiza IDs en affiliate-link-generator.js
# 2. Ejecuta el script de actualización:
node update-all-affiliate-links.js

# 3. Verifica los cambios:
git diff js/deals.js

# 4. Si todo está bien:
npm run build
npm run deploy:prepare
```

#### **Día 10: Testing**

```bash
# 1. Abre el sitio local
# 2. Click "Ver oferta" en cada producto
# 3. Verifica URLs contienen parámetros de afiliado:

✅ MediaMarkt: ?awinmid=10206&awinaffid=TU_ID
✅ PcComponentes: ?c=21449&a=TU_ID
✅ FNAC: ?awinmid=7224&awinaffid=TU_ID
```

#### **Día 11: Deploy**

```bash
# Sube deploy-ready/ a Bana Hosting
# Verifica en producción
```

---

## 📊 Formato de Affiliate Links

### **MediaMarkt (Awin)**
```
https://www.awin1.com/cread.php?awinmid=10206&awinaffid=TU_ID&ued=URL_ENCODED
```

### **PcComponentes (TradeTracker)**
```
https://tc.tradetracker.net/?c=21449&m=12&a=TU_ID&r=&u=URL_ENCODED
```

### **FNAC (Awin)**
```
https://www.awin1.com/cread.php?awinmid=7224&awinaffid=TU_ID&ued=URL_ENCODED
```

---

## 💰 Comisiones Esperadas

| Tienda | Comisión | Mejor en |
|--------|----------|----------|
| Amazon ES | 3-4% | Todo |
| MediaMarkt | 2-3% | Gaming, Smartphones |
| PcComponentes | 3-4% | Componentes PC, Gaming |
| FNAC | 2-3% | Audio, Libros |

---

## 📋 Checklist

- [ ] Registrado en Awin
- [ ] Aprobado en Awin
- [ ] Unido a MediaMarkt
- [ ] Unido a FNAC
- [ ] Registrado en TradeTracker
- [ ] Aprobado en TradeTracker
- [ ] Unido a PcComponentes
- [ ] IDs anotados en affiliate-link-generator.js
- [ ] Script ejecutado: update-all-affiliate-links.js
- [ ] Build ejecutado: npm run build
- [ ] Deploy preparado: npm run deploy:prepare
- [ ] Testing local completado
- [ ] Subido a producción
- [ ] Verificado en producción

---

## 🆘 Problemas Comunes

### **"No me aprueban en Awin/TradeTracker"**
- Asegúrate de que dealtech365.com esté LIVE
- Completa todos los campos del formulario
- Describe bien tu sitio (ofertas tech, comparador precios)
- Contacta soporte si pasan 5 días sin respuesta

### **"No me aprueban en MediaMarkt/PcComponentes"**
- Necesitas tráfico mínimo (~500 visitas/mes)
- Sitio debe tener contenido de calidad
- Debe cumplir políticas (no contenido adult/gambling)
- Reintentar después de 1 mes si rechazan

### **"Los affiliate links no funcionan"**
- Verifica que IDs estén correctos en affiliate-link-generator.js
- Revisa que el script ejecutó sin errores
- Comprueba que URL esté correctamente encoded
- Usa DevTools Network tab para ver redirects

---

## 📞 Soporte

- **Awin:** publishersupport.es@awin.com
- **TradeTracker:** support@tradetracker.com
- **Documentación completa:** AFFILIATE-PROGRAMS-ESPAÑA.md

---

**⏱️ TIEMPO TOTAL:** 10-14 días
**💰 COSTO:** €0
**📈 INGRESO POTENCIAL MES 1:** €50-150

---

*Quick Start Guide - DealTech365*
