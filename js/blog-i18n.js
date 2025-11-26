/**
 * Blog Articles i18n Support
 * Automatically translates common blog elements
 */

(function () {
  'use strict';

  // Common translations for blog articles
  const blogTranslations = {
    es: {
      back_to_blog: '← Volver al blog',
      min_read: 'min de lectura',
      views: 'vistas',
      pros: 'Ventajas',
      cons: 'Desventajas',
      specifications: 'Especificaciones',
      price: 'Precio',
      see_offer: 'Ver oferta',
      buy_now: 'Comprar ahora',
      excellent: 'EXCELENTE',
      very_good: 'MUY BUENO',
      good: 'BUENO',
      regular: 'REGULAR',
      // Smartphones article
      smartphones_title: 'Mejores Smartphones Black Friday 2025: ¿Cuál Comprar? Guía Completa',
      smartphones_category: '📱 Smartphones',
      smartphones_intro: 'El mercado de smartphones 2025 está más competitivo que nunca. Hemos probado 25+ modelos en condiciones reales durante 3 semanas: fotos en 15+ escenarios, benchmarks de rendimiento, pruebas de batería exhaustivas y análisis de pantalla en laboratorio. Esta guía te ayudará a elegir el smartphone perfecto según tu presupuesto y necesidades.',
      // Gadgets article
      gadgets_title: 'Los 10 Gadgets Imprescindibles de 2025',
      gadgets_category: '💡 Tech & Innovación',
      // Gaming article
      gaming_title: 'Top 7 Accesorios Gaming 2025',
      gaming_category: '🎮 Gaming',
      // Headphones article
      headphones_title: 'Los 5 Mejores Auriculares Premium',
      headphones_category: '🎧 Audio & Sonido',
      // Black Friday tips
      blackfriday_title: 'Consejos Black Friday 2025',
      blackfriday_category: '💰 Guías & Tips',
      // Laptops article
      laptops_title: 'Mejores Laptops Black Friday 2025',
      laptops_category: '💻 Laptops'
    },
    en: {
      back_to_blog: '← Back to blog',
      min_read: 'min read',
      views: 'views',
      pros: 'Pros',
      cons: 'Cons',
      specifications: 'Specifications',
      price: 'Price',
      see_offer: 'See offer',
      buy_now: 'Buy now',
      excellent: 'EXCELLENT',
      very_good: 'VERY GOOD',
      good: 'GOOD',
      regular: 'REGULAR',
      // Smartphones article
      smartphones_title: 'Best Smartphones Black Friday 2025: Which One to Buy? Complete Guide',
      smartphones_category: '📱 Smartphones',
      smartphones_intro: 'The 2025 smartphone market is more competitive than ever. We tested 25+ models in real conditions for 3 weeks: photos in 15+ scenarios, performance benchmarks, exhaustive battery tests, and lab screen analysis. This guide will help you choose the perfect smartphone according to your budget and needs.',
      // Gadgets article
      gadgets_title: 'Top 10 Essential Gadgets of 2025',
      gadgets_category: '💡 Tech & Innovation',
      // Gaming article
      gaming_title: 'Top 7 Gaming Accessories 2025',
      gaming_category: '🎮 Gaming',
      // Headphones article
      headphones_title: 'The 5 Best Premium Headphones',
      headphones_category: '🎧 Audio & Sound',
      // Black Friday tips
      blackfriday_title: 'Black Friday 2025 Tips',
      blackfriday_category: '💰 Guides & Tips',
      // Laptops article
      laptops_title: 'Best Laptops Black Friday 2025',
      laptops_category: '💻 Laptops'
    }
  };

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    translateBlogElements();

    // Re-translate on language change
    window.addEventListener('languageChanged', translateBlogElements);
  }

  function translateBlogElements() {
    const currentLang = localStorage.getItem('language') || 'es';
    const t = blogTranslations[currentLang];

    if (!t) return;

    console.log('Translating blog article to:', currentLang);

    // Translate back link
    const backLink = document.querySelector('.blog-post__back');
    if (backLink) {
      backLink.textContent = t.back_to_blog;
    }

    // Translate meta items
    document.querySelectorAll('.blog-post__meta-item').forEach(item => {
      const text = item.textContent;
      if (text.includes('min de lectura')) {
        item.innerHTML = item.innerHTML.replace('min de lectura', t.min_read);
      }
      if (text.includes('vistas')) {
        item.innerHTML = item.innerHTML.replace('vistas', t.views);
      }
    });

    // Translate pros/cons headers
    document.querySelectorAll('.pros h4').forEach(el => {
      if (el.textContent.includes('Ventajas') || el.textContent.includes('Pros')) {
        const icon = el.querySelector('.icon') || '';
        el.textContent = `✓ ${t.pros}`;
      }
    });

    document.querySelectorAll('.cons h4').forEach(el => {
      if (el.textContent.includes('Desventajas') || el.textContent.includes('Cons')) {
        const icon = el.querySelector('.icon') || '';
        el.textContent = `✗ ${t.cons}`;
      }
    });

    // Translate score labels
    document.querySelectorAll('.product-card__score-label').forEach(el => {
      const text = el.textContent.trim();
      if (text === 'EXCELENTE') el.textContent = t.excellent;
      if (text === 'MUY BUENO') el.textContent = t.very_good;
      if (text === 'BUENO') el.textContent = t.good;
      if (text === 'REGULAR') el.textContent = t.regular;
    });

    // Translate CTA buttons
    document.querySelectorAll('.btn, .cta-box .btn, a[href*="amazon"]').forEach(el => {
      const text = el.textContent.trim();
      if (text.includes('Ver oferta') || text.includes('See offer')) {
        el.textContent = el.textContent.replace(/Ver oferta|See offer/, t.see_offer);
      }
      if (text.includes('Comprar ahora') || text.includes('Buy now')) {
        el.textContent = el.textContent.replace(/Comprar ahora|Buy now/, t.buy_now);
      }
    });

    // Translate article-specific titles and categories
    const pageTitle = document.querySelector('.blog-post__title');
    const pageCategory = document.querySelector('.blog-post__category');
    const pageIntro = document.querySelector('.blog-post__intro strong');

    // Detect which article we're on and translate accordingly
    const url = window.location.pathname;

    if (url.includes('smartphones')) {
      if (pageTitle) pageTitle.textContent = t.smartphones_title;
      if (pageCategory) pageCategory.textContent = t.smartphones_category;
      if (pageIntro) {
        const intro = document.querySelector('.blog-post__intro');
        if (intro) {
          intro.innerHTML = `<strong>${t.smartphones_intro.split('.')[0]}.</strong> ${t.smartphones_intro.split('.').slice(1).join('.')}`;
        }
      }
    } else if (url.includes('gadgets')) {
      if (pageTitle) pageTitle.textContent = t.gadgets_title;
      if (pageCategory) pageCategory.textContent = t.gadgets_category;
    } else if (url.includes('gaming')) {
      if (pageTitle) pageTitle.textContent = t.gaming_title;
      if (pageCategory) pageCategory.textContent = t.gaming_category;
    } else if (url.includes('auriculares') || url.includes('headphones')) {
      if (pageTitle) pageTitle.textContent = t.headphones_title;
      if (pageCategory) pageCategory.textContent = t.headphones_category;
    } else if (url.includes('black-friday') || url.includes('consejos')) {
      if (pageTitle) pageTitle.textContent = t.blackfriday_title;
      if (pageCategory) pageCategory.textContent = t.blackfriday_category;
    } else if (url.includes('laptops')) {
      if (pageTitle) pageTitle.textContent = t.laptops_title;
      if (pageCategory) pageCategory.textContent = t.laptops_category;
    }

    // Update document title
    if (pageTitle) {
      document.title = `${pageTitle.textContent} - DealTech365`;
    }

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    console.log('Blog article translation complete');
  }
})();
