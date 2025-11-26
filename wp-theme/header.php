<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Modelo Web App + Blog SEO 2.0 para ofertas tech con IA, afiliación y contenido evergreen optimizado para Black Friday 2025.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <?php wp_head(); ?>
</head>
<body <?php body_class( 'bftech-theme' ); ?>>
<?php wp_body_open(); ?>
<div class="page">
    <header class="site-header">
        <div class="site-branding">
            <a class="site-title" href="<?php echo esc_url( home_url( '/' ) ); ?>">
                Plataforma Black Friday Tech
            </a>
            <p class="site-tagline">Blog SEO + Web App afiliada enfocada en tecnología</p>
        </div>
        <nav class="site-nav" aria-label="Menú principal">
            <?php
            wp_nav_menu(
                array(
                    'theme_location' => 'primary',
                    'container'      => '',
                    'menu_class'     => 'nav-links',
                    'fallback_cb'    => function() {
                        echo '<div class="nav-links"><a href="#blog">Blog</a><a href="#roadmap">Roadmap</a><a href="#business">Modelo</a></div>';
                    },
                )
            );
            ?>
        </nav>
    </header>
