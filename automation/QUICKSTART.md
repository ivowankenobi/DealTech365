# 🚀 QUICKSTART - DealTech365 Automation

Guía rápida de 5 minutos para empezar a automatizar DealTech365.

---

## ⚡ Setup Rápido (5 minutos)

### 1️⃣ Instalar Node.js

Si no tienes Node.js instalado:
- **Windows/Mac:** https://nodejs.org/ (descarga LTS)
- **Linux:** `sudo apt install nodejs npm`

Verificar:
```bash
node --version  # Debe ser v18 o superior
npm --version
```

---

### 2️⃣ Instalar Dependencias

```bash
cd automation
npm install
```

**Tiempo:** ~2 minutos

---

### 3️⃣ Configurar Firebase (Opcional pero recomendado)

#### Sin Firebase (Solo scraping local)
✅ **Ya está listo!** Puedes saltarte al paso 4.

#### Con Firebase (Para automatización completa)

**A) Obtener credenciales:**

1. Abre [Firebase Console](https://console.firebase.google.com/)
2. Proyecto: **dealtech365**
3. ⚙️ Settings → **Service accounts**
4. Click **"Generate new private key"**
5. Guarda como: `automation/firebase-admin-key.json`

**B) Configurar Firestore:**

1. Firebase Console → **Firestore Database**
2. Click **"Create database"**
3. Modo: **Production**
4. Ubicación: **europe-west** (más cercano a España)

---

### 4️⃣ Configurar Variables

```bash
cp .env.example .env
```

Edita `.env` si quieres cambiar configuración (opcional).

---

## 🎯 Primer Uso

### Test Local (Sin Firebase)

```bash
npm run scrape
```

**Qué hace:**
- Scrapea Amazon España
- Busca ofertas en laptops, audio, smartphones
- Guarda en `data/deals-latest-ES.json`

**Resultado esperado:**
```
🎯 Amazon Scraper - DealTech365
================================

🚀 Iniciando navegador...
✅ Navegador iniciado

📦 Scraping categoría: laptops
🔗 URL: https://www.amazon.es/s?k=laptop...
✅ Encontrados 60 elementos con ASIN
  ✓ HP 15-fd2013ns... (23% OFF)
  ✓ ASUS Zenbook Duo... (18% OFF)
...

✅ Scraping completado!
⏱️  Tiempo total: 45.23s
📊 Total productos: 25
💾 Resultados guardados en: automation/data/deals-ES-2025-01-26...
```

---

### Con Firebase (Automatización completa)

```bash
npm run sync
```

**Qué hace:**
1. Scrapea Amazon
2. Importa automáticamente a Firestore
3. Tu web se actualiza sola

---

## 📊 Ver Resultados

### Opción 1: Ver JSON

```bash
cat data/deals-latest-ES.json
```

### Opción 2: Dashboard Admin

```bash
start admin-dashboard.html
```

O abre manualmente: `automation/admin-dashboard.html`

---

## 🔄 Automatizar (Ejecutar cada 6 horas)

### Windows

1. Abre **Task Scheduler**
2. "Create Basic Task"
3. Name: "DealTech365 Scraper"
4. Trigger: **Daily**, Repeat every **6 hours**
5. Action: **Start a program**
   - Program: `C:\Program Files\nodejs\npm.cmd`
   - Arguments: `run sync`
   - Start in: `C:\Dealtech365\automation`

### Linux/Mac

```bash
crontab -e
```

Añade:
```cron
0 */6 * * * cd /path/to/dealtech365/automation && npm run sync
```

---

## ✅ Checklist Completo

- [ ] Node.js instalado
- [ ] `npm install` ejecutado
- [ ] Firebase configurado (opcional)
- [ ] `npm run scrape` funciona
- [ ] Datos aparecen en `data/`
- [ ] (Opcional) `npm run import` funciona
- [ ] (Opcional) Cron job configurado

---

## 🆘 Problemas Comunes

### "Error: Cannot find module 'puppeteer'"
```bash
npm install
```

### Scraper no encuentra productos
- Amazon puede bloquear temporalmente
- Espera 1 hora e intenta de nuevo
- Ejecuta con: `HEADLESS=false npm run scrape` para ver qué pasa

### No se conecta a Firebase
- Verifica que `firebase-admin-key.json` existe
- Verifica que Firestore está creado en Firebase Console

---

## 📚 Siguientes Pasos

1. ✅ **Ejecuta el scraper manualmente** para familiarizarte
2. ✅ **Configura Firebase** para sincronización automática
3. ✅ **Configura cron job** para automatización completa
4. 📖 Lee el [README completo](README.md) para funciones avanzadas

---

## 💡 Tips

- Ejecuta el scraper **máximo 4 veces al día** para evitar bloqueos
- Usa delay mínimo de **3 segundos** entre requests
- Revisa los logs en `logs/` si algo falla
- Abre el dashboard admin para ver estadísticas

---

**¡Listo! Tu sistema de automatización está configurado 🎉**

Si tienes problemas, lee el [README completo](README.md) o revisa los logs.
