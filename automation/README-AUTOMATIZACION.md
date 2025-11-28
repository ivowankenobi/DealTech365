# 🤖 Automatización del Scraper - DealTech365

Sistema completo de automatización para mantener las ofertas siempre actualizadas.

## 📋 Tabla de Contenidos

1. [Qué hace](#qué-hace)
2. [Requisitos](#requisitos)
3. [Instalación](#instalación)
4. [Configuración](#configuración)
5. [Uso Manual](#uso-manual)
6. [Automatización Diaria](#automatización-diaria)
7. [FTP Automático (Opcional)](#ftp-automático-opcional)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Qué hace

El sistema de automatización:

1. ✅ **Ejecuta el scraper** de Amazon para obtener ofertas frescas
2. ✅ **Genera `deals-real-v2.js`** automáticamente con los nuevos datos
3. ✅ **Hace commit y push** a GitHub
4. ✅ **Sube a Banahosting** vía FTP (opcional)
5. ✅ **Registra logs** de todas las operaciones
6. ✅ **Reintenta** en caso de errores

---

## 📦 Requisitos

### Esenciales:
- ✅ Node.js (ya instalado)
- ✅ Git configurado
- ✅ Proyecto clonado en `c:\Dealtech365`

### Opcionales (para FTP):
- npm package: `basic-ftp`

---

## 🚀 Instalación

### Paso 1: Verificar estructura de carpetas

```bash
cd c:\Dealtech365
dir automation\scripts
```

Deberías ver:
- `auto-scrape-and-update.js` ✅
- `upload-to-banahosting.js` ✅

### Paso 2: Crear carpeta de logs

```bash
mkdir automation\logs
```

### Paso 3: (Opcional) Instalar dependencia FTP

```bash
npm install basic-ftp
```

---

## ⚙️ Configuración

### Git (Verificar que esté configurado)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### FTP (Solo si quieres auto-upload)

Crea un archivo `.env` en `c:\Dealtech365\`:

```env
FTP_HOST=ftp.dealtech365.com
FTP_USER=tu_usuario_ftp
FTP_PASSWORD=tu_contraseña_ftp
FTP_PORT=21
```

⚠️ **IMPORTANTE**: Nunca subas `.env` a GitHub (ya está en `.gitignore`)

---

## 🔧 Uso Manual

### Ejecutar el scraper y actualizar todo:

```bash
cd c:\Dealtech365
node automation\scripts\auto-scrape-and-update.js
```

Esto hará:
1. Scraping de Amazon (2-5 minutos)
2. Generar `deals-real-v2.js`
3. Commit y push a GitHub

### Solo subir a Banahosting (después de actualizar):

```bash
node automation\scripts\upload-to-banahosting.js
```

---

## ⏰ Automatización Diaria

### Windows Task Scheduler

#### Opción 1: Script Rápido (Recomendado)

1. **Abre PowerShell como Administrador**

2. **Ejecuta este comando:**

```powershell
$action = New-ScheduledTaskAction -Execute "c:\Dealtech365\automation\run-daily-scraper.bat"
$trigger = New-ScheduledTaskTrigger -Daily -At 3:00AM
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName "DealTech365 Daily Scraper" -Action $action -Trigger $trigger -Settings $settings -Description "Actualiza ofertas diariamente a las 3 AM"
```

3. **Verificar:**

```powershell
Get-ScheduledTask -TaskName "DealTech365 Daily Scraper"
```

#### Opción 2: Interfaz Gráfica

1. **Abrir Programador de Tareas:**
   - Presiona `Win + R`
   - Escribe: `taskschd.msc`
   - Enter

2. **Crear Tarea Básica:**
   - Click derecho en "Biblioteca del Programador de Tareas"
   - "Crear tarea básica..."

3. **Configurar:**
   - **Nombre:** `DealTech365 Daily Scraper`
   - **Desencadenador:** Diariamente a las 3:00 AM
   - **Acción:** Iniciar un programa
   - **Programa:** `c:\Dealtech365\automation\run-daily-scraper.bat`

4. **Opciones Avanzadas:**
   - ✅ Ejecutar con los privilegios más altos
   - ✅ Ejecutar aunque el usuario no haya iniciado sesión
   - ✅ Ejecutar sólo si hay conexión a internet

#### Horario Recomendado

**3:00 AM** es ideal porque:
- ✅ Menos tráfico en Amazon
- ✅ Ofertas ya actualizadas del día
- ✅ Tu computadora probablemente esté encendida
- ✅ Visitantes europeos ven ofertas frescas al despertar

---

## 📤 FTP Automático (Opcional)

### Método 1: Incluir en el script principal

Edita `auto-scrape-and-update.js` y agrega al final (antes de `process.exit(0)`):

```javascript
// Paso 5: Upload to Banahosting
if (process.env.ENABLE_FTP_UPLOAD === 'true') {
  const { uploadFiles } = require('./upload-to-banahosting');
  await uploadFiles();
}
```

Luego agrega a `.env`:
```env
ENABLE_FTP_UPLOAD=true
```

### Método 2: Tarea separada

Crea una segunda tarea programada que ejecute 5 minutos después:

```powershell
$action = New-ScheduledTaskAction -Execute "node" -Argument "c:\Dealtech365\automation\scripts\upload-to-banahosting.js"
$trigger = New-ScheduledTaskTrigger -Daily -At 3:05AM
Register-ScheduledTask -TaskName "DealTech365 FTP Upload" -Action $action -Trigger $trigger
```

---

## 📊 Verificar que funciona

### 1. Ver logs

```bash
type automation\logs\auto-update.log
type automation\logs\scheduler.log
```

### 2. Verificar última ejecución

```bash
git log --oneline -5
```

Deberías ver commits automáticos con:
```
Auto-update deals from scraper - 2025-11-29T03:00:00.000Z
```

### 3. Verificar archivo generado

```bash
type js\deals-real-v2.js | findstr "Last update"
```

Debería mostrar la fecha de hoy.

---

## 🔍 Troubleshooting

### Problema: "No se encontraron archivos JSON"

**Causa:** El scraper no generó datos

**Solución:**
```bash
node automation\scraper\amazon-scraper-improved.js
```

Verifica que genere `automation\data\deals-ES-*.json`

---

### Problema: "Git push failed"

**Causa:** Credenciales o permisos

**Solución:**
```bash
git config credential.helper store
git push
# Ingresa tus credenciales una vez
```

---

### Problema: "FTP connection refused"

**Causa:** Credenciales incorrectas o firewall

**Solución:**
1. Verifica `.env` tiene las credenciales correctas
2. Prueba conexión FTP manual con FileZilla
3. Verifica puerto (21 para FTP, 22 para SFTP)

---

### Problema: Task Scheduler no ejecuta

**Causa:** Configuración de permisos

**Solución:**
1. Click derecho en la tarea → Propiedades
2. Pestaña "General"
3. ✅ "Ejecutar con los privilegios más altos"
4. ✅ "Ejecutar aunque el usuario no haya iniciado sesión"

---

## 📈 Mejoras Futuras

### Ideas para expandir:

1. **Notificaciones por email** cuando hay errores
2. **Webhook a Discord/Slack** con resumen diario
3. **Gráficos de precio histórico** almacenando cada scrape
4. **Detección de mejores ofertas** (mayor descuento)
5. **Multiple sources** (no solo Amazon)
6. **Deploy automático** a Netlify/Vercel

---

## 📝 Resumen de Comandos

```bash
# Ejecutar scraper + actualización manual
node automation\scripts\auto-scrape-and-update.js

# Solo subir a FTP
node automation\scripts\upload-to-banahosting.js

# Ver logs
type automation\logs\auto-update.log

# Verificar tarea programada
Get-ScheduledTask -TaskName "DealTech365 Daily Scraper"

# Forzar ejecución inmediata de tarea
Start-ScheduledTask -TaskName "DealTech365 Daily Scraper"
```

---

## 🎉 ¡Listo!

Ahora tu sitio tendrá **ofertas frescas automáticamente cada día** sin intervención manual.

Las ofertas se actualizarán:
- ✅ Automáticamente cada día a las 3 AM
- ✅ Se subirán a GitHub
- ✅ (Opcional) Se desplegarán a Banahosting

**¿Preguntas?** Revisa los logs en `automation\logs\`
