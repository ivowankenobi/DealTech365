# Crear Email hello@dealtech365.com en Banahosting

## 📧 Pasos para crear el email (5 minutos)

### Paso 1: Acceder a cPanel

1. **Inicia sesión en Banahosting**
   - Ve a: https://www.banahosting.com/clientarea.php
   - Usuario: Tu email de registro
   - Contraseña: Tu contraseña de Banahosting

2. **Ve a tus servicios**
   - En el menú superior, haz clic en **"Servicios"** → **"Mis Servicios"**
   - Busca tu plan de hosting (donde está alojado dealtech365.com)

3. **Accede a cPanel**
   - Haz clic en el botón **"Iniciar sesión en cPanel"**
   - Se abrirá el panel de control de tu hosting

---

### Paso 2: Crear la cuenta de email

1. **Busca "Cuentas de correo"**
   - En cPanel, busca la sección **"CORREO ELECTRÓNICO"** o **"EMAIL"**
   - Haz clic en **"Cuentas de correo"** o **"Email Accounts"**

2. **Crear nueva cuenta**
   - Haz clic en el botón **"+ Crear"** o **"+ Create"**

3. **Completa el formulario:**
   ```
   📧 Correo electrónico: hello
   🌐 Dominio: dealtech365.com
   🔒 Contraseña: [Genera una contraseña segura]
      - Usa el generador de contraseñas
      - O crea una: mínimo 12 caracteres, con mayúsculas, números y símbolos
   💾 Cuota de buzón: 250 MB (o más si lo necesitas)
   ```

4. **Crear cuenta**
   - Haz clic en **"+ Crear"** o **"Create"**
   - ✅ Ya tienes `hello@dealtech365.com` creado!

---

### Paso 3: Guardar los datos de acceso

**IMPORTANTE**: Guarda esta información en un lugar seguro:

```
Email: hello@dealtech365.com
Contraseña: [la que generaste]
Webmail: https://dealtech365.com:2096
         o https://webmail.dealtech365.com

Configuración IMAP (para Gmail, Outlook, etc):
- Servidor entrante: mail.dealtech365.com
- Puerto IMAP: 993 (SSL)
- Servidor saliente: mail.dealtech365.com
- Puerto SMTP: 465 (SSL)
- Usuario: hello@dealtech365.com
- Contraseña: [la que generaste]
```

---

### Paso 4: Acceder al webmail

1. **Abre tu navegador** y ve a una de estas URLs:
   - https://dealtech365.com:2096
   - https://webmail.dealtech365.com

2. **Inicia sesión:**
   - Usuario: `hello@dealtech365.com`
   - Contraseña: [la que generaste]

3. **Elige un cliente de webmail:**
   - **Roundcube** (Recomendado - más moderno)
   - **Horde**
   - **SquirrelMail**

---

### Paso 5: (Opcional) Reenviar emails a tu email personal

Si prefieres que los emails de `hello@dealtech365.com` lleguen automáticamente a tu email personal:

1. **En cPanel, busca "Reenviadores"** o **"Forwarders"**
2. **Haz clic en "Agregar reenviador"** o **"Add Forwarder"**
3. **Configura:**
   ```
   Address to Forward: hello@dealtech365.com
   Forward to Email Address: tu-email-personal@gmail.com
   ```
4. **Guardar**

**Ventaja**: Recibirás los emails en tu Gmail/Outlook personal sin tener que revisar otro buzón.

---

### Paso 6: Probar el email

1. **Envía un email de prueba**
   - Desde tu email personal, envía un mensaje a `hello@dealtech365.com`
   - Asunto: "Prueba de email"

2. **Verifica que llegó**
   - Accede al webmail (https://dealtech365.com:2096)
   - O revisa tu email personal si configuraste reenvío

3. **Responde el email**
   - Para verificar que también puedes enviar desde `hello@dealtech365.com`

---

### Paso 7: Configurar notificaciones en Netlify

Ahora que el email funciona:

1. **Ve a Netlify Forms**
   - https://app.netlify.com/sites/dealtech365/forms

2. **Espera a que aparezca el formulario "newsletter"**
   - Si no aparece, haz una prueba de suscripción en tu sitio
   - Ve a: https://dealtech365.com
   - Scroll a Newsletter
   - Suscríbete con un email de prueba

3. **Configura notificaciones**
   - Haz clic en el formulario "newsletter"
   - Ve a "Form notifications"
   - "Add notification" → "Email notification"
   - Email: `hello@dealtech365.com`
   - Event: "New form submission"
   - Save

---

## ✅ Checklist final

- [ ] Email `hello@dealtech365.com` creado en cPanel
- [ ] Contraseña guardada en lugar seguro
- [ ] Probado enviando email desde tu email personal
- [ ] Probado recibiendo en webmail (o email personal si configuraste reenvío)
- [ ] Probado enviando desde `hello@dealtech365.com`
- [ ] Notificaciones configuradas en Netlify Forms
- [ ] Prueba final: Suscripción en dealtech365.com → Email recibido

---

## 🎯 Resultado final

Cuando alguien se suscriba a tu newsletter en dealtech365.com:

1. ✅ Los datos se guardan en Netlify Forms
2. ✅ Recibes un email en `hello@dealtech365.com` (o tu email personal si configuraste reenvío)
3. ✅ Puedes ver todas las suscripciones en el dashboard de Netlify
4. ✅ Puedes exportar la lista en CSV cuando quieras

---

## 🆘 ¿Problemas?

### El email no llega
- Revisa la carpeta de SPAM
- Verifica que el dominio esté correctamente configurado en Banahosting
- Espera 5-10 minutos (puede haber delay)

### No puedo acceder a cPanel
- Verifica tus credenciales de Banahosting
- Contacta al soporte de Banahosting: soporte@banahosting.com

### El webmail no carga
- Prueba con: https://dealtech365.com:2096
- O: https://mail.dealtech365.com
- Limpia la caché del navegador

---

## 📞 Soporte

- **Banahosting**: https://www.banahosting.com/submitticket.php
- **Email**: soporte@banahosting.com
- **WhatsApp**: Disponible en su sitio web

---

**¡Listo!** Siguiendo estos pasos tendrás tu email `hello@dealtech365.com` funcionando en menos de 5 minutos. 🎉
