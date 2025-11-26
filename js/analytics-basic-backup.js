/**
 * Google Analytics 4 Integration
 * Respects user cookie consent preferences
 * Only loads when user accepts analytics cookies
 */

(function() {
  'use strict';

  // IMPORTANT: Replace with your actual GA4 Measurement ID
  // Get it from: https://analytics.google.com/analytics/web/
  const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with real ID

  /**
   * Initialize Google Analytics 4
   */
  function initGA4() {
    // Check if GA is already loaded
    if (window.gtag) {
      console.log('Google Analytics already initialized');
      return;
    }

    console.log('Initializing Google Analytics 4...');

    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // Configure GA4
    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, {
      'anonymize_ip': true, // GDPR compliance
      'cookie_flags': 'SameSite=None;Secure',
      'send_page_view': true
    });

    console.log('Google Analytics 4 initialized successfully');
  }

  /**
   * Disable Google Analytics (when user rejects analytics cookies)
   */
  function disableGA4() {
    console.log('Disabling Google Analytics 4...');

    // Set window property to disable GA
    window[`ga-disable-${GA4_MEASUREMENT_ID}`] = true;

    // Delete GA cookies
    deleteGACookies();
  }

  /**
   * Delete all Google Analytics cookies
   */
  function deleteGACookies() {
    const gaCookies = ['_ga', '_gat', '_gid'];
    const hostname = window.location.hostname;
    const domains = [
      hostname,
      `.${hostname}`,
      window.location.hostname.replace('www.', '')
    ];

    gaCookies.forEach(cookieName => {
      domains.forEach(domain => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
    });
  }

  /**
   * Track custom event
   * @param {string} eventName - Event name (e.g., 'product_click', 'newsletter_signup')
   * @param {Object} eventParams - Event parameters
   */
  function trackEvent(eventName, eventParams = {}) {
    if (!window.gtag) {
      console.warn('Google Analytics not loaded. Event not tracked:', eventName);
      return;
    }

    gtag('event', eventName, eventParams);
    console.log('GA4 Event tracked:', eventName, eventParams);
  }

  /**
   * Track page view (for SPA navigation)
   * @param {string} pageTitle - Page title
   * @param {string} pagePath - Page path
   */
  function trackPageView(pageTitle, pagePath) {
    if (!window.gtag) {
      console.warn('Google Analytics not loaded. Page view not tracked.');
      return;
    }

    gtag('event', 'page_view', {
      page_title: pageTitle,
      page_path: pagePath
    });
    console.log('GA4 Page view tracked:', pageTitle, pagePath);
  }

  /**
   * Track product click (for affiliate links)
   * @param {Object} product - Product data
   */
  function trackProductClick(product) {
    trackEvent('select_item', {
      item_list_name: 'Product Grid',
      items: [{
        item_id: product.id || 'unknown',
        item_name: product.name || 'Unknown Product',
        item_category: product.category || 'Unknown',
        price: product.price || 0,
        quantity: 1
      }]
    });
  }

  /**
   * Track newsletter signup
   * @param {string} email - User email
   */
  function trackNewsletterSignup(email) {
    trackEvent('sign_up', {
      method: 'newsletter',
      success: true
    });
  }

  /**
   * Track search
   * @param {string} searchTerm - Search query
   */
  function trackSearch(searchTerm) {
    trackEvent('search', {
      search_term: searchTerm
    });
  }

  /**
   * Track favorite toggle
   * @param {Object} product - Product data
   * @param {boolean} isFavorited - Whether product was added or removed
   */
  function trackFavorite(product, isFavorited) {
    trackEvent(isFavorited ? 'add_to_wishlist' : 'remove_from_wishlist', {
      items: [{
        item_id: product.id || 'unknown',
        item_name: product.name || 'Unknown Product',
        item_category: product.category || 'Unknown'
      }]
    });
  }

  /**
   * Check cookie consent and initialize if analytics are allowed
   */
  function checkConsentAndInit() {
    // Get consent from cookie
    const consentCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('cookie_consent='));

    if (!consentCookie) {
      console.log('No cookie consent found. Waiting for user consent...');
      return;
    }

    try {
      const consentData = JSON.parse(decodeURIComponent(consentCookie.split('=')[1]));

      if (consentData.preferences && consentData.preferences.analytics) {
        console.log('Analytics cookies accepted. Initializing GA4...');
        initGA4();
      } else {
        console.log('Analytics cookies not accepted. GA4 will not load.');
        disableGA4();
      }
    } catch (error) {
      console.error('Error parsing cookie consent:', error);
    }
  }

  /**
   * Listen for cookie consent changes
   */
  window.addEventListener('cookieConsentUpdated', function(event) {
    const preferences = event.detail;

    if (preferences.analytics) {
      console.log('Analytics cookies accepted via consent update. Initializing GA4...');
      initGA4();
    } else {
      console.log('Analytics cookies rejected via consent update. Disabling GA4...');
      disableGA4();
    }
  });

  /**
   * Expose analytics API globally
   */
  window.Analytics = {
    track: trackEvent,
    trackPageView: trackPageView,
    trackProductClick: trackProductClick,
    trackNewsletterSignup: trackNewsletterSignup,
    trackSearch: trackSearch,
    trackFavorite: trackFavorite,
    init: initGA4,
    disable: disableGA4
  };

  // Check consent on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkConsentAndInit);
  } else {
    checkConsentAndInit();
  }

  console.log('Analytics module loaded. Waiting for consent...');

})();
