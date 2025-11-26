<?php

function bftech_theme_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    register_nav_menu( 'primary', __( 'Primary Menu', 'bftech' ) );
}
add_action( 'after_setup_theme', 'bftech_theme_setup' );

function bftech_theme_enqueue_styles() {
    wp_enqueue_style( 'bftech-google-font', 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap', array(), null );
    wp_enqueue_style( 'bftech-style', get_stylesheet_uri(), array(), wp_get_theme()->get( 'Version' ) );
}
add_action( 'wp_enqueue_scripts', 'bftech_theme_enqueue_styles' );

function bftech_customize_register( $wp_customize ) {
    $wp_customize->add_section(
        'bftech_hero_section',
        array(
            'title'    => __( 'Hero principal', 'bftech' ),
            'priority' => 30,
        )
    );

    $wp_customize->add_setting(
        'bftech_hero_title',
        array(
            'default'           => 'Plataforma Web de Ofertas Black Friday Tech con Blog SEO',
            'sanitize_callback' => 'sanitize_text_field',
        )
    );
    $wp_customize->add_control(
        'bftech_hero_title',
        array(
            'label'    => __( 'Titulo del heroe', 'bftech' ),
            'section'  => 'bftech_hero_section',
            'type'     => 'text',
        )
    );

    $wp_customize->add_setting(
        'bftech_hero_description',
        array(
            'default'           => 'Web app responsive + blog alimentado por IA que reune las ofertas mas agresivas de tecnologia, monetizada 100% por afiliacion y optimizada para rankings organicos.',
            'sanitize_callback' => 'sanitize_textarea_field',
        )
    );
    $wp_customize->add_control(
        'bftech_hero_description',
        array(
            'label'    => __( 'Descripcion del heroe', 'bftech' ),
            'section'  => 'bftech_hero_section',
            'type'     => 'textarea',
        )
    );

    $wp_customize->add_setting(
        'bftech_hero_cta_label',
        array(
            'default'           => 'Ver publicaciones destacadas',
            'sanitize_callback' => 'sanitize_text_field',
        )
    );
    $wp_customize->add_control(
        'bftech_hero_cta_label',
        array(
            'label'    => __( 'Etiqueta CTA principal', 'bftech' ),
            'section'  => 'bftech_hero_section',
            'type'     => 'text',
        )
    );

    $wp_customize->add_setting(
        'bftech_hero_cta_url',
        array(
            'default'           => '#blog',
            'sanitize_callback' => 'esc_url_raw',
        )
    );
    $wp_customize->add_control(
        'bftech_hero_cta_url',
        array(
            'label'    => __( 'URL CTA principal', 'bftech' ),
            'section'  => 'bftech_hero_section',
            'type'     => 'url',
        )
    );

    $wp_customize->add_setting(
        'bftech_blog_intro',
        array(
            'default'           => 'Articulos evergreen, actualizaciones diarias y comparativas perpetuas apoyados en keywords como "Black Friday tech deals 2025".',
            'sanitize_callback' => 'sanitize_textarea_field',
        )
    );
    $wp_customize->add_control(
        'bftech_blog_intro',
        array(
            'label'    => __( 'Descripcion del blog', 'bftech' ),
            'section'  => 'bftech_hero_section',
            'type'     => 'textarea',
        )
    );

    $wp_customize->add_section(
        'bftech_cta_section',
        array(
            'title'    => __( 'Modelo de monetizacion', 'bftech' ),
            'priority' => 40,
        )
    );

    $wp_customize->add_setting(
        'bftech_cta_title',
        array(
            'default'           => 'Afiliacion + Blog SEO + Ads inteligentes',
            'sanitize_callback' => 'sanitize_text_field',
        )
    );
    $wp_customize->add_control(
        'bftech_cta_title',
        array(
            'label'    => __( 'Titulo CTA', 'bftech' ),
            'section'  => 'bftech_cta_section',
            'type'     => 'text',
        )
    );

    $wp_customize->add_setting(
        'bftech_cta_text',
        array(
            'default'           => 'Amazon Associates, CJ Affiliate y ShareASale integrados desde el dia 1. Display ads con Ezoic/AdSense post 10K visitas.',
            'sanitize_callback' => 'sanitize_textarea_field',
        )
    );
    $wp_customize->add_control(
        'bftech_cta_text',
        array(
            'label'    => __( 'Texto CTA', 'bftech' ),
            'section'  => 'bftech_cta_section',
            'type'     => 'textarea',
        )
    );

    $wp_customize->add_section(
        'bftech_metrics_section',
        array(
            'title'    => __( 'Metricas clave', 'bftech' ),
            'priority' => 45,
        )
    );

    $metrics_defaults = array(
        'value' => array( '70%', '320-792%', '5-7 meses' ),
        'label' => array( 'clics afiliados de contenido organico', 'ROI proyectado año 1', 'break-even' ),
    );

    foreach ( range( 1, 3 ) as $index ) {
        $wp_customize->add_setting(
            "bftech_metric_{$index}_value",
            array(
                'default'           => $metrics_defaults['value'][ $index - 1 ],
                'sanitize_callback' => 'sanitize_text_field',
            )
        );

        $wp_customize->add_control(
            "bftech_metric_{$index}_value",
            array(
                'label'   => sprintf( __( 'Valor métrica %d', 'bftech' ), $index ),
                'section' => 'bftech_metrics_section',
                'type'    => 'text',
            )
        );

        $wp_customize->add_setting(
            "bftech_metric_{$index}_label",
            array(
                'default'           => $metrics_defaults['label'][ $index - 1 ],
                'sanitize_callback' => 'sanitize_text_field',
            )
        );

        $wp_customize->add_control(
            "bftech_metric_{$index}_label",
            array(
                'label'   => sprintf( __( 'Etiqueta métrica %d', 'bftech' ), $index ),
                'section' => 'bftech_metrics_section',
                'type'    => 'text',
            )
        );
    }

    $wp_customize->add_section(
        'bftech_newsletter_section',
        array(
            'title'    => __( 'Newsletter y lista de espera', 'bftech' ),
            'priority' => 50,
        )
    );

    $wp_customize->add_setting(
        'bftech_newsletter_title',
        array(
            'default'           => 'Recibe alertas de las ofertas más disruptivas',
            'sanitize_callback' => 'sanitize_text_field',
        )
    );
    $wp_customize->add_control(
        'bftech_newsletter_title',
        array(
            'label'    => __( 'Título del newsletter', 'bftech' ),
            'section'  => 'bftech_newsletter_section',
            'type'     => 'text',
        )
    );

    $wp_customize->add_setting(
        'bftech_newsletter_subtitle',
        array(
            'default'           => 'Suscríbete y te avisamos cuando haya drops 50%+ en laptops, smartphones y audio premium.',
            'sanitize_callback' => 'sanitize_textarea_field',
        )
    );
    $wp_customize->add_control(
        'bftech_newsletter_subtitle',
        array(
            'label'    => __( 'Descripción del newsletter', 'bftech' ),
            'section'  => 'bftech_newsletter_section',
            'type'     => 'textarea',
        )
    );

    $wp_customize->add_setting(
        'bftech_newsletter_button',
        array(
            'default'           => 'Sumarme a la lista',
            'sanitize_callback' => 'sanitize_text_field',
        )
    );
    $wp_customize->add_control(
        'bftech_newsletter_button',
        array(
            'label'    => __( 'Texto del botón', 'bftech' ),
            'section'  => 'bftech_newsletter_section',
            'type'     => 'text',
        )
    );
}
add_action( 'customize_register', 'bftech_customize_register' );
