# URLs de Acceso al Webmail - DealTech365

## 🌐 Prueba estas URLs en orden:

### 1. URL principal de webmail
```
https://webmail.dealtech365.com
```

### 2. Puerto 2096 (SSL)
```
https://dealtech365.com:2096
```

### 3. Puerto 2095 (sin SSL)
```
http://dealtech365.com:2095
```

### 4. Servidor de mail directo
```
https://mail.dealtech365.com
```

### 5. Webmail a través del servidor de Banahosting
```
https://serverXX.banahosting.com:2096
```
*(Reemplaza XX con el número de tu servidor, encuéntralo en cPanel)*

### 6. Acceso directo a cPanel webmail
```
https://[tu-servidor-banahosting]:2096
```

---

## 🔍 ¿Cómo encontrar tu servidor de Banahosting?

1. **Inicia sesión en cPanel**
2. **Busca en la esquina superior derecha** el nombre del servidor
3. **Verás algo como**: `server45.banahosting.com`
4. **Usa esa URL**: `https://server45.banahosting.com:2096`

---

## ❌ Si ninguna URL funciona:

### Opción A: Acceder desde cPanel

1. **Ve a cPanel** (desde Banahosting client area)
2. **Busca "Webmail"** en el menú
3. **Haz clic directo** en el botón de Webmail
4. Te llevará directamente sin necesitar la URL

### Opción B: Configurar el email en Gmail/Outlook

En lugar de usar webmail, puedes configurar `hello@dealtech365.com` en tu cliente de email favorito:

#### Para Gmail (web):
1. Gmail → Configuración ⚙️ → "Ver toda la configuración"
2. Pestaña "Cuentas e importación"
3. "Consultar el correo de otras cuentas" → "Añadir una cuenta de correo"
4. Email: `hello@dealtech365.com`
5. Configuración:
   ```
   Usuario: hello@dealtech365.com
   Contraseña: [tu contraseña]
   Servidor POP: mail.dealtech365.com
   Puerto: 995 (SSL activado)
   ```

#### Para Outlook:
1. Archivo → Agregar cuenta
2. Email: `hello@dealtech365.com`
3. Configuración manual:
   ```
   Tipo de cuenta: IMAP
   Servidor entrante: mail.dealtech365.com
   Puerto: 993 (SSL)
   Servidor saliente: mail.dealtech365.com
   Puerto: 465 (SSL)
   Usuario: hello@dealtech365.com
   Contraseña: [tu contraseña]
   ```

### Opción C: Configurar en app de email móvil

#### Gmail app (Android/iOS):
1. Abre Gmail app
2. Menú ☰ → Configuración → Añadir cuenta
3. Selecciona "Otra"
4. Email: `hello@dealtech365.com`
5. Tipo: IMAP
6. Configuración igual que arriba

---

## ✅ Verificar si el email está creado

Antes de intentar acceder, asegúrate de que el email esté creado:

1. **Ve a cPanel**
2. **"Cuentas de correo"** o **"Email Accounts"**
3. **Busca `hello@dealtech365.com`** en la lista

Si NO aparece en la lista:
- ❌ El email aún no está creado
- ✅ Créalo siguiendo los pasos de CREAR-EMAIL-BANAHOSTING.md

Si SÍ aparece en la lista:
- ✅ El email existe
- Prueba las URLs alternativas de arriba

---

## 🆘 Solución rápida: Usar reenvío

Si tienes problemas accediendo al webmail, la forma más fácil es configurar un **reenviador**:

1. **En cPanel → "Reenviadores"** o **"Forwarders"**
2. **Agregar reenviador:**
   ```
   De: hello@dealtech365.com
   A: tu-email-personal@gmail.com
   ```
3. **Ahora todos los emails de hello@dealtech365.com llegarán a tu Gmail**
4. **Ya no necesitas el webmail** ✅

---

## 📞 Si nada funciona:

Contacta al soporte de Banahosting:
- **Ticket**: https://www.banahosting.com/submitticket.php
- **Email**: soporte@banahosting.com
- **Pregunta**: "¿Cuál es la URL correcta del webmail para mi dominio dealtech365.com?"

---

**Recomendación**: Configura el reenvío a tu Gmail personal. Es más fácil que usar webmail.
