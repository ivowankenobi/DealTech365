<?php
get_header();

$hero_title = get_theme_mod(
    'bftech_hero_title',
    'Plataforma Web de Ofertas Black Friday Tech con Blog SEO'
);
$hero_description = get_theme_mod(
    'bftech_hero_description',
    'Web app responsive + blog alimentado por IA que reune las ofertas mas agresivas de tecnologia, monetizada 100% por afiliacion y optimizada para rankings organicos.'
);
$hero_cta_label = get_theme_mod( 'bftech_hero_cta_label', 'Ver publicaciones destacadas' );
$hero_cta_url = get_theme_mod( 'bftech_hero_cta_url', '#blog' );
$blog_intro = get_theme_mod(
    'bftech_blog_intro',
    'Articulos evergreen, actualizaciones diarias y comparativas perpetuas apoyados en keywords como "Black Friday tech deals 2025".'
);
$cta_title = get_theme_mod( 'bftech_cta_title', 'Afiliacion + Blog SEO + Ads inteligentes' );
$cta_text = get_theme_mod(
    'bftech_cta_text',
    'Amazon Associates, CJ Affiliate y ShareASale integrados desde el dia 1. Display ads con Ezoic/AdSense post 10K visitas.'
);
?>

<?php
$metric_defaults = array(
    array(
        'value' => '70%',
        'label' => 'clics afiliados de contenido organico',
    ),
    array(
        'value' => '320-792%',
        'label' => 'ROI proyectado ano 1',
    ),
    array(
        'value' => '5-7 meses',
        'label' => 'break-even',
    ),
);

$metrics = array();
foreach ( range( 1, 3 ) as $index ) :
    $metrics[] = array(
        'value' => get_theme_mod( "bftech_metric_{$index}_value", $metric_defaults[ $index - 1 ]['value'] ),
        'label' => get_theme_mod( "bftech_metric_{$index}_label", $metric_defaults[ $index - 1 ]['label'] ),
    );
endforeach;

$newsletter_title = get_theme_mod(
    'bftech_newsletter_title',
    'Recibe alertas de las ofertas más disruptivas'
);
$newsletter_subtitle = get_theme_mod(
    'bftech_newsletter_subtitle',
    'Suscríbete y te avisamos cuando haya drops 50%+ en laptops, smartphones y audio premium.'
);
$newsletter_button = get_theme_mod( 'bftech_newsletter_button', 'Sumarme a la lista' );
?>

<main>
  <header class="hero">
    <div class="hero__badge">Version 2.0 - Noviembre 2025</div>
    <h1><?php echo esc_html( $hero_title ); ?></h1>
    <p><?php echo nl2br( esc_html( $hero_description ) ); ?></p>
    <div class="hero__actions">
      <a class="btn primary" href="<?php echo esc_url( $hero_cta_url ); ?>"><?php echo esc_html( $hero_cta_label ); ?></a>
      <a class="btn ghost" href="#roadmap">Descargar roadmap</a>
    </div>
    <div class="hero__metrics">
      <?php foreach ( $metrics as $metric ) : ?>
        <div>
          <span><?php echo esc_html( $metric['value'] ); ?></span>
          <p><?php echo esc_html( $metric['label'] ); ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </header>

  <section class="stats" aria-label="Datos del mercado">
    <article>
      <h3>Affiliate Marketing 2025</h3>
      <p class="number">$37.3B</p>
      <p>Crecimiento 8% CAGR. 80% de advertisers usan afiliacion.</p>
      <p>Comisiones tech 2-10% por clic sin inventario ni soporte.</p>
    </article>
    <article>
      <h3>Apps Cashback/Ofertas</h3>
      <p class="number">$3.5-12B</p>
      <p>7-13% CAGR. Web app + blog es mas rapido de lanzar y 100% indexable.</p>
    </article>
    <article>
      <h3>Electronica de Consumo</h3>
      <p class="number">$1.2T</p>
      <p>5-6.6% CAGR. Las guias evergreen dirigen a productos tech premium.</p>
    </article>
  </section>

  <section class="grid" aria-label="Ventajas principales">
    <article>
      <h2>Solucion</h2>
      <ul>
        <li>Web app responsive + blog SEO integrado con IA (70-80% contenido automatizado).</li>
        <li>Monetizacion hibrida: afiliacion 70%, blog SEO 25%, display ads 5%.</li>
        <li>Automatizaciones Make/Zapier para scraper, social media y email.</li>
      </ul>
    </article>
    <article>
      <h2>Ventaja competitiva</h2>
      <ul>
        <li>Especializacion en tecnologia + contenido evergreen en espanol.</li>
        <li>Diseno visual moderno inspirado en WordPress premium.</li>
        <li>Transito organico gratuito con CAC $0.30-1.50 vs apps costosas.</li>
      </ul>
    </article>
    <article>
      <h2>IA y automatizaciones</h2>
      <ul>
        <li>Flow IA: keyword research -> outline -> borrador -> humanizacion -> publicacion.</li>
        <li>Produccion en 2-3 horas vs 6-8 horas manuales.</li>
        <li>Automatizaciones salvando 10-15 horas/semana.</li>
      </ul>
    </article>
  </section>

  <section class="workflow" aria-label="Flujo de contenido con IA">
    <header>
      <p class="eyebrow">Producción inteligente</p>
      <h2>Flujo IA 70-80% automatizado</h2>
      <p>Keywords, outlines, borradores y automatizaciones diseñadas para reducir el ciclo de producción a 2-3 horas por artículo.</p>
    </header>
    <div class="workflow__grid">
      <?php
      $steps = array(
        array(
          'title' => 'Investigación de keywords',
          'copy'  => 'Ahrefs/Semrush identifican keywords con volumen realista (Black Friday tech deals 2025, mejores laptops).',
        ),
        array(
          'title' => 'Outline con IA',
          'copy'  => 'Claude/ChatGPT generan la estructura H2/H3 antes de redactar.',
        ),
        array(
          'title' => 'Borrador automático',
          'copy'  => 'IA entrega el 70% del artículo con datos 2025; se humaniza e insertan enlaces afiliados.',
        ),
        array(
          'title' => 'Distribución y automatización',
          'copy'  => 'Publica en WordPress, programa redes sociales y activa alertas con Make.com o Zapier.',
        ),
      );
      foreach ( $steps as $step ) :
        ?>
        <article class="workflow__card">
          <p class="eyebrow">Paso</p>
          <h3><?php echo esc_html( $step['title'] ); ?></h3>
          <p><?php echo esc_html( $step['copy'] ); ?></p>
        </article>
        <?php
      endforeach;
      ?>
    </div>
  </section>

  <section class="affiliate-networks" aria-label="Redes de afiliados">
    <header>
      <p class="eyebrow">Monetización híbrida</p>
      <h2>Redes de afiliación activas desde el día 1</h2>
      <p>Amazon, CJ Affiliate y ShareASale ofrecen comisiones de 2-10% y cookies entre 24 y 90 días para maximizar tech deals.</p>
    </header>
    <div class="network-grid">
      <?php
      $networks = array(
        array(
          'name'    => 'Amazon Associates',
          'details' => 'Catálogo tech masivo, cookie de 24h y conversión inmediata.',
        ),
        array(
          'name'    => 'CJ Affiliate',
          'details' => 'Samsung, HP y Best Buy con cookies de 30-90 días.',
        ),
        array(
          'name'    => 'ShareASale',
          'details' => 'Newegg, B&H Photo y marcas premium con comisiones 3-10%.',
        ),
      );
      foreach ( $networks as $network ) :
        ?>
        <article class="network-card">
          <h3><?php echo esc_html( $network['name'] ); ?></h3>
          <p><?php echo esc_html( $network['details'] ); ?></p>
        </article>
        <?php
      endforeach;
      ?>
    </div>
  </section>

  <section class="cta" aria-label="Llamado a la accion">
    <div>
      <p class="eyebrow">Modelo de monetizacion</p>
      <h2><?php echo esc_html( $cta_title ); ?></h2>
      <p><?php echo nl2br( esc_html( $cta_text ) ); ?></p>
    </div>
    <a class="btn primary" href="#business">Ver modelo financiero</a>
  </section>

  <section id="blog" class="blog" aria-label="Blog SEO">
    <header>
      <p class="eyebrow">Blog SEO</p>
      <h2>Contenido optimizado para Black Friday 2025</h2>
      <p><?php echo wpautop( esc_html( $blog_intro ) ); ?></p>
    </header>
    <div class="blog__grid">
      <?php
      $blog_query = new WP_Query(
        array(
          'posts_per_page' => 3,
        )
      );

      if ( $blog_query->have_posts() ) :
        while ( $blog_query->have_posts() ) :
          $blog_query->the_post();
          $categories = get_the_category();
          ?>
          <article>
            <p class="eyebrow"><?php esc_html_e( 'Actualidad', 'bftech' ); ?></p>
            <h3><?php the_title(); ?></h3>
            <p><?php the_excerpt(); ?></p>
            <div class="tag-row">
              <?php
              if ( $categories ) {
                echo '<span>' . esc_html( $categories[0]->name ) . '</span>';
              }
              ?>
              <span>#AffiliateSEO</span>
            </div>
            <a class="btn ghost" href="<?php the_permalink(); ?>"><?php esc_html_e( 'Leer post', 'bftech' ); ?></a>
          </article>
          <?php
        endwhile;
        wp_reset_postdata();
      else :
        $fallback_articles = array(
          array(
            'label' => 'Evergreen',
            'title' => 'Mejores laptops Black Friday 2025',
            'copy'  => 'Guia comparativa con 5 modelos premium, analisis de specs y enlaces afiliados a Amazon y Newegg.',
            'tags'  => array( '#Laptops', '#BlackFridayTech' ),
            'url'   => 'https://www.amazon.com/s?k=black+friday+laptops',
            'cta'   => 'Ver oferta',
          ),
          array(
            'label' => 'Actualidad',
            'title' => 'Ofertas relampago audio premium',
            'copy'  => 'Daily brief con descuentos en audifonos de alta gama, actualizado automaticamente con scripts de scraper.',
            'tags'  => array( '#Audio', '#DailyDeals' ),
            'url'   => 'https://www.cj.com/',
            'cta'   => 'Explorar',
          ),
          array(
            'label' => 'Perpetuo',
            'title' => 'Comparador de smartphones top',
            'copy'  => 'Tabla interactiva con precios, historial y CTA para ver oferta en retailers como HP o Best Buy.',
            'tags'  => array( '#Smartphones', '#Comparativo' ),
            'url'   => 'https://www.shareasale.com/',
            'cta'   => 'Ir al comparador',
          ),
        );
        foreach ( $fallback_articles as $post ) :
          ?>
          <article>
            <p class="eyebrow"><?php echo esc_html( $post['label'] ); ?></p>
            <h3><?php echo esc_html( $post['title'] ); ?></h3>
            <p><?php echo esc_html( $post['copy'] ); ?></p>
            <div class="tag-row">
              <?php foreach ( $post['tags'] as $tag ) : ?>
                <span><?php echo esc_html( $tag ); ?></span>
              <?php endforeach; ?>
            </div>
            <a class="btn ghost" href="<?php echo esc_url( $post['url'] ); ?>" target="_blank" rel="noreferrer"><?php echo esc_html( $post['cta'] ); ?></a>
          </article>
          <?php
        endforeach;
      endif;
      ?>
    </div>
  </section>

  <section class="newsletter" aria-label="Lista de espera / newsletter">
    <header>
      <p class="eyebrow">Lista de espera</p>
      <h2><?php echo esc_html( $newsletter_title ); ?></h2>
      <p><?php echo esc_html( $newsletter_subtitle ); ?></p>
    </header>
    <form class="newsletter__form" action="#" method="post">
      <label class="sr-only" for="newsletter-email">Correo electrónico</label>
      <input id="newsletter-email" type="email" name="email" placeholder="tu@email.com" required>
      <button type="submit" class="btn primary"><?php echo esc_html( $newsletter_button ); ?></button>
    </form>
  </section>

  <section id="business" class="financial">
    <header>
      <p class="eyebrow">Proyecciones</p>
      <h2>Ingresos y costos realistas</h2>
    </header>
    <div class="financial__grid">
      <article>
        <h3>Meses 1-2</h3>
        <p>Trafico 3K-5K, ingresos $200-500, neto -$400 a -$100.</p>
      </article>
      <article>
        <h3>Meses 3-6</h3>
        <p>15K-25K visitas, $2,200-4,200 ingresos, neto positivo $1,500-3,500.</p>
      </article>
      <article>
        <h3>Meses 7-10</h3>
        <p>40K-60K trafico, $5,300-9,300 ingresos, neto $4,400-8,400.</p>
      </article>
      <article>
        <h3>Meses 11-12</h3>
        <p>Pico Black Friday: 120K-200K visitas, $21,500-35,500 ingresos, ROI 320-792%.</p>
      </article>
    </div>
    <p class="note">Break-even esperado en 5-7 meses con inversion inicial $9K-15K.</p>
  </section>

  <section class="roadmap" id="roadmap">
    <header>
      <p class="eyebrow">Timeline 10-12 semanas</p>
      <h2>Implementacion por fases</h2>
    </header>
    <ol>
      <li>Semana 1-4: dominio, hosting, WordPress, 5 articulos fundacionales, registros de redes de afiliacion y diseno UI/UX.</li>
      <li>Semana 5-8: desarrollo MVP, 10 articulos SEO especializados, setup analitica, enlaces afiliados y landing waitlist.</li>
      <li>Semana 9-10: beta testing, optimizacion PageSpeed, automatizaciones y secuencias de email.</li>
      <li>Semana 11: lanzamiento publico, Product Hunt, outreach Reddit y monitoreo 24/7.</li>
    </ol>
    <a class="btn primary" href="#">Empieza tu validacion</a>
  </section>

  <footer>
    <div>
      <p class="eyebrow">Proximos pasos</p>
      <p>Validacion usuarios, registros legales, contratacion de UI/UX, setup WordPress y primer articulo IA.</p>
    </div>
    <div>
      <p class="eyebrow">Contacto</p>
      <p>Equipo operativo - Email: hello@blackfridaytech.app</p>
    </div>
  </footer>
</main>
<?php
get_footer();
