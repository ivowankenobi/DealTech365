# Siguiente fase de desarrollo

## 1. Documentar el MVP WordPress
- Objetivo: describir cada seccion que requiere contenido dinamico o CTA para que el equipo de contenido y marketing pueda trabajar sin tocar codigo.
- Tareas:
  1. Listado de secciones principales (hero, metricas, CTA de monetizacion, blog, proyecciones, roadmap, footer).
  2. Definir que debe ser editable desde WordPress (entradas de blog, CTA de menu, enlaces de afiliados).
  3. Registrar las dependencias SEO y afiliacion (keywords prioritarias, redes Amazon/CJ/ShareASale, automatizaciones IA).
  4. Establecer metricas de exito (trafico organico, CTR afiliados, ROI).
- Entregable actual: este documento + `index.php` con estructura inicial.

## 2. Hacer administrables las secciones
- Objetivo: construir funciones/shortcodes/menus que permitan actualizar textos, CTAs y filtros sin tocar PHP.
- Tareas:
  1. Registrar menu primario (ya en funciones) y mostrarlo con `wp_nav_menu` si se activa.
  2. Considerar customizer settings o widgets para modificar el contenido del hero/CTA.
  3. Anadir bloques o shortcodes para mostrar las ofertas destacadas y el roadmap.
  4. Preparar campos personalizados o ACF-lite para enlaces de afiliados y estadisticas clave.
- Status: pendiente hasta completar fase 1.

## 3. Validacion y ajustes finales
- Objetivo: activar el tema en un WordPress real, poblar contenido, revisar responsive y SEO, documentar pruebas.
- Tareas:
  1. Activar el tema en staging (hosting local o Docker) y crear entradas de blog de prueba.
  2. Verificar que el loop muestra posts y los CTA se mantienen accesibles.
  3. Medir velocidad/SEO (PageSpeed, meta tags), revisar enlaces.
  4. Documentar proximos pasos (test A/B, integracion automatizaciones IA, track KPIs).
- Status: pendiente.
