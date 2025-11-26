# Black Friday Tech Hub WordPress Theme

## Instalación rápida
1. Copia la carpeta `wp-theme` en `wp-content/themes/` dentro de tu instalación de WordPress.
2. Activa el tema desde el panel de administración (`Apariencia → Temas`).
3. Crea entradas de blog y asigna categorías para que el bloque de publicaciones dinámicas sirva contenido real.
4. Personaliza el menú desde `Apariencia → Menús` para que los enlaces principales apunten al blog, roadmap y modelo financiero.

## Qué incluye
- `style.css`: estilo moderno y responsive con gradientes, botones pill, grids y estilos para la cabecera/nav.
- `index.php`: landing + blog + roadmap + blog loop con fallback de artículos predefinidos.
- `header.php`/`footer.php`: estructura HTML que agrega una cabecera con logo textual y menú principal, además de `wp_head()`/`wp_footer()`.
- `functions.php`: encola la fuente Space Grotesk y la hoja de estilo, registra el menú primario y agrega settings del Customizer para hero, CTA y blog.
- `functions.php`: también registra nuevas secciones del Customizer para métricas clave y la newsletter/lista de espera (valores estimados del PRD) para poder actualizarlos desde Apariencia → Personalizar.
- `edit-profile.php`: plantilla “Editar mi perfil” que puedes asignar a una página para que cualquier usuario autenticado modifique su nombre, email, bio y newsletter opt-in, incluyendo validaciones básicas.

## Consideraciones SEO
- Ajusta la descripción y el título desde `Apariencia → Personalizar` si usas plugins como Yoast.
- Mantén el blog activo (keywords como “Black Friday tech deals 2025”, “Mejores laptops Black Friday”) para alimentar el loop dinámico.
- Usa plugins de afiliación (Amazon, CJ, ShareASale) para insertar CTA dentro del contenido de cada entrada.

## Próximos pasos recomendados
1. Define un menú y enlázalo con las secciones hero/blog/roadmap para mejorar la navegación.
2. Agrega widgets o bloques adicionales según necesites (testimonios, listas de espera, comparadores).
3. Instala un plugin de caché + CDN (Cloudflare o WP Rocket) para mantener velocidad alta durante el tráfico de Black Friday.
