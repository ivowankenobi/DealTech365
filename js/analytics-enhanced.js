/**
 * ENHANCED Google Analytics 4 Integration
 * DealTech365 - Advanced Analytics System
 *
 * Features:
 * - E-commerce tracking for affiliate links
 * - Conversion funnels
 * - Scroll depth tracking
 * - Time on page tracking
 * - Outbound link tracking
 * - UTM parameter tracking
 * - User engagement metrics
 * - Revenue estimation for affiliate clicks
 * - GDPR/CCPA compliant
 */

(function() {
  'use strict';

  // =================================================================
  // CONFIGURATION
  // =================================================================

  const CONFIG = {
    // IMPORTANT: Replace with your actual GA4 Measurement ID
    GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX', // TODO: Replace with real ID

    // Debug mode (set to false in production)
    DEBUG: false,

    // Scroll depth tracking thresholds (%)
    SCROLL_THRESHOLDS: [25, 50, 75, 90, 100],

    // Time on page tracking intervals (seconds)
    TIME_INTERVALS: [10, 30, 60, 120, 300],

    // Estimated affiliate commission rates (for revenue estimation)
    COMMISSION_RATES: {
      laptops: 0.02,      // 2%
      smartphones: 0.015,  // 1.5%
      audio: 0.03,        // 3%
      gaming: 0.025       // 2.5%
    }
  };

  // =================================================================
  // STATE MANAGEMENT
  // =================================================================

  const state = {
    initialized: false,
    consentGiven: false,
    sessionStart: Date.now(),
    pageLoadTime: Date.now(),
    scrollDepthTracked: new Set(),
    timeIntervalsTracked: new Set(),
    lastActivity: Date.now(),
    engagementScore: 0
  };

  // =================================================================
  // CORE ANALYTICS FUNCTIONS
  // =================================================================

  /**
   * Initialize Google Analytics 4
   */
  function initGA4() {
    if (state.initialized) {
      log('Google Analytics already initialized');
      return;
    }

    log('Initializing Google Analytics 4...');

    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // Configure GA4
    gtag('js', new Date());
    gtag('config', CONFIG.GA4_MEASUREMENT_ID, {
      'anonymize_ip': true,
      'cookie_flags': 'SameSite=None;Secure',
      'send_page_view': true,
      'allow_google_signals': true,
      'allow_ad_personalization_signals': false, // GDPR compliance
      'page_location': window.location.href,
      'page_title': document.title
    });

    state.initialized = true;
    log('Google Analytics 4 initialized successfully');

    // Start tracking
    initializeTracking();
  }

  /**
   * Disable Google Analytics
   */
  function disableGA4() {
    log('Disabling Google Analytics 4...');
    window[`ga-disable-${CONFIG.GA4_MEASUREMENT_ID}`] = true;
    deleteGACookies();
  }

  /**
   * Delete all Google Analytics cookies
   */
  function deleteGACookies() {
    const gaCookies = ['_ga', '_gat', '_gid', '_gac_gb'];
    const hostname = window.location.hostname;
    const domains = [
      hostname,
      `.${hostname}`,
      hostname.replace('www.', '')
    ];

    gaCookies.forEach(cookieName => {
      domains.forEach(domain => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
    });
  }

  // =================================================================
  // EVENT TRACKING
  // =================================================================

  /**
   * Track custom event
   */
  function trackEvent(eventName, eventParams = {}) {
    if (!window.gtag || !state.consentGiven) {
      log('Analytics not ready or consent not given. Event not tracked:', eventName);
      return;
    }

    // Add common parameters
    const enrichedParams = {
      ...eventParams,
      timestamp: Date.now(),
      session_duration: Math.floor((Date.now() - state.sessionStart) / 1000),
      engagement_score: state.engagementScore
    };

    gtag('event', eventName, enrichedParams);
    log('GA4 Event tracked:', eventName, enrichedParams);

    // Update engagement score
    updateEngagementScore(eventName);
  }

  /**
   * Track page view
   */
  function trackPageView(pageTitle, pagePath) {
    if (!window.gtag || !state.consentGiven) return;

    gtag('event', 'page_view', {
      page_title: pageTitle || document.title,
      page_path: pagePath || window.location.pathname,
      page_location: window.location.href
    });

    log('Page view tracked:', pageTitle, pagePath);

    // Reset page tracking state
    state.pageLoadTime = Date.now();
    state.scrollDepthTracked.clear();
    state.timeIntervalsTracked.clear();
  }

  // =================================================================
  // E-COMMERCE TRACKING (Affiliate Links)
  // =================================================================

  /**
   * Track product view
   */
  function trackProductView(product) {
    trackEvent('view_item', {
      currency: 'USD',
      value: calculatePrice(product.basePrice, product.discount),
      items: [formatProductItem(product)]
    });
  }

  /**
   * Track product click (affiliate link)
   */
  function trackProductClick(product, retailer = 'unknown') {
    const price = calculatePrice(product.basePrice, product.discount);
    const estimatedRevenue = estimateAffiliateRevenue(product, price);

    trackEvent('select_item', {
      item_list_name: 'Product Grid',
      currency: 'USD',
      value: price,
      items: [formatProductItem(product)],
      // Custom parameters
      retailer: retailer,
      estimated_commission: estimatedRevenue,
      discount_percentage: product.discount,
      asin: product.asin || 'unknown'
    });

    // Also track as conversion event
    trackEvent('affiliate_click', {
      product_name: product.name,
      product_category: product.category,
      retailer: retailer,
      price: price,
      estimated_revenue: estimatedRevenue
    });
  }

  /**
   * Track add to wishlist
   */
  function trackAddToWishlist(product) {
    trackEvent('add_to_wishlist', {
      currency: 'USD',
      value: calculatePrice(product.basePrice, product.discount),
      items: [formatProductItem(product)]
    });
  }

  /**
   * Track remove from wishlist
   */
  function trackRemoveFromWishlist(product) {
    trackEvent('remove_from_wishlist', {
      currency: 'USD',
      value: calculatePrice(product.basePrice, product.discount),
      items: [formatProductItem(product)]
    });
  }

  /**
   * Format product item for GA4 e-commerce
   */
  function formatProductItem(product) {
    return {
      item_id: product.asin || product.id || 'unknown',
      item_name: product.name || 'Unknown Product',
      item_brand: product.brand || 'Unknown',
      item_category: product.category || 'Unknown',
      price: calculatePrice(product.basePrice, product.discount),
      discount: product.discount || 0,
      quantity: 1
    };
  }

  /**
   * Calculate final price after discount
   */
  function calculatePrice(basePrice, discount) {
    if (!basePrice) return 0;
    if (!discount) return basePrice;
    return basePrice * (1 - discount / 100);
  }

  /**
   * Estimate affiliate revenue
   */
  function estimateAffiliateRevenue(product, price) {
    const category = product.category || 'laptops';
    const commissionRate = CONFIG.COMMISSION_RATES[category] || 0.02;
    return (price * commissionRate).toFixed(2);
  }

  // =================================================================
  // USER ENGAGEMENT TRACKING
  // =================================================================

  /**
   * Track search
   */
  function trackSearch(searchTerm, resultsCount = 0) {
    trackEvent('search', {
      search_term: searchTerm,
      results_count: resultsCount
    });
  }

  /**
   * Track filter usage
   */
  function trackFilter(filterType, filterValue) {
    trackEvent('filter_applied', {
      filter_type: filterType,
      filter_value: filterValue
    });
  }

  /**
   * Track newsletter signup
   */
  function trackNewsletterSignup(email, source = 'footer') {
    trackEvent('sign_up', {
      method: 'newsletter',
      source: source,
      success: true
    });

    // Mark as conversion
    trackEvent('generate_lead', {
      lead_type: 'newsletter',
      value: 5 // Estimated value of a newsletter signup
    });
  }

  /**
   * Track notification signup
   */
  function trackNotificationSignup(productId, productName) {
    trackEvent('notification_signup', {
      product_id: productId,
      product_name: productName
    });
  }

  /**
   * Track social share
   */
  function trackSocialShare(platform, content) {
    trackEvent('share', {
      method: platform,
      content_type: content.type || 'product',
      item_id: content.id || 'unknown'
    });
  }

  // =================================================================
  // SCROLL DEPTH TRACKING
  // =================================================================

  function initScrollTracking() {
    let ticking = false;

    function checkScrollDepth() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = Math.floor((scrollTop / docHeight) * 100);

      CONFIG.SCROLL_THRESHOLDS.forEach(threshold => {
        if (scrollPercent >= threshold && !state.scrollDepthTracked.has(threshold)) {
          state.scrollDepthTracked.add(threshold);
          trackEvent('scroll_depth', {
            percent: threshold,
            page: window.location.pathname
          });
        }
      });

      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(checkScrollDepth);
        ticking = true;
      }
    }, { passive: true });
  }

  // =================================================================
  // TIME ON PAGE TRACKING
  // =================================================================

  function initTimeTracking() {
    CONFIG.TIME_INTERVALS.forEach(interval => {
      setTimeout(() => {
        if (!state.timeIntervalsTracked.has(interval)) {
          state.timeIntervalsTracked.add(interval);
          trackEvent('time_on_page', {
            seconds: interval,
            page: window.location.pathname,
            engaged: isUserEngaged()
          });
        }
      }, interval * 1000);
    });
  }

  /**
   * Check if user is engaged (not idle)
   */
  function isUserEngaged() {
    const idleTime = Date.now() - state.lastActivity;
    return idleTime < 30000; // Active within last 30 seconds
  }

  /**
   * Update last activity timestamp
   */
  function updateActivity() {
    state.lastActivity = Date.now();
  }

  // Track user activity
  ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, updateActivity, { passive: true });
  });

  // =================================================================
  // OUTBOUND LINK TRACKING
  // =================================================================

  function initOutboundLinkTracking() {
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Check if it's an external link
      const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);

      if (isExternal) {
        trackEvent('click_outbound', {
          link_url: href,
          link_text: link.textContent.trim().substring(0, 100),
          link_domain: new URL(href).hostname
        });
      }
    }, { passive: true });
  }

  // =================================================================
  // UTM PARAMETER TRACKING
  // =================================================================

  function trackUTMParameters() {
    const params = new URLSearchParams(window.location.search);
    const utmParams = {};

    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      if (params.has(param)) {
        utmParams[param] = params.get(param);
      }
    });

    if (Object.keys(utmParams).length > 0) {
      trackEvent('campaign_visit', utmParams);

      // Store in sessionStorage for attribution
      sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
    }
  }

  /**
   * Get stored UTM parameters
   */
  function getUTMParams() {
    try {
      return JSON.parse(sessionStorage.getItem('utm_params')) || {};
    } catch {
      return {};
    }
  }

  // =================================================================
  // ENGAGEMENT SCORE
  // =================================================================

  function updateEngagementScore(eventName) {
    const scores = {
      'page_view': 1,
      'select_item': 10,
      'affiliate_click': 15,
      'add_to_wishlist': 8,
      'search': 5,
      'filter_applied': 3,
      'sign_up': 20,
      'scroll_depth': 2,
      'time_on_page': 3,
      'share': 12
    };

    state.engagementScore += scores[eventName] || 1;
  }

  /**
   * Track session engagement on page unload
   */
  function trackSessionEnd() {
    const sessionDuration = Math.floor((Date.now() - state.sessionStart) / 1000);

    trackEvent('session_end', {
      session_duration: sessionDuration,
      engagement_score: state.engagementScore,
      pages_viewed: 1, // Will be updated if tracking multiple pages
      max_scroll: Math.max(...state.scrollDepthTracked, 0)
    });
  }

  // Track session end
  window.addEventListener('beforeunload', trackSessionEnd);
  window.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
      trackSessionEnd();
    }
  });

  // =================================================================
  // CONVERSION FUNNEL TRACKING
  // =================================================================

  /**
   * Track funnel step
   */
  function trackFunnelStep(stepName, stepData = {}) {
    trackEvent('funnel_step', {
      funnel_name: 'product_discovery',
      step_name: stepName,
      step_number: getFunnelStepNumber(stepName),
      ...stepData
    });
  }

  function getFunnelStepNumber(stepName) {
    const steps = {
      'landing': 1,
      'browse_products': 2,
      'view_product': 3,
      'click_affiliate': 4,
      'add_favorite': 5,
      'newsletter_signup': 6
    };
    return steps[stepName] || 0;
  }

  // =================================================================
  // ERROR TRACKING
  // =================================================================

  function initErrorTracking() {
    window.addEventListener('error', function(e) {
      trackEvent('javascript_error', {
        error_message: e.message,
        error_filename: e.filename,
        error_line: e.lineno,
        error_column: e.colno
      });
    });

    window.addEventListener('unhandledrejection', function(e) {
      trackEvent('promise_rejection', {
        error_message: e.reason ? e.reason.toString() : 'Unknown error'
      });
    });
  }

  // =================================================================
  // PERFORMANCE TRACKING
  // =================================================================

  function trackPerformanceMetrics() {
    if (!window.performance || !window.performance.timing) return;

    window.addEventListener('load', function() {
      setTimeout(function() {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
        const connectTime = timing.responseEnd - timing.requestStart;

        trackEvent('page_performance', {
          page_load_time: loadTime,
          dom_ready_time: domReadyTime,
          server_response_time: connectTime,
          dns_time: timing.domainLookupEnd - timing.domainLookupStart,
          tcp_time: timing.connectEnd - timing.connectStart
        });
      }, 0);
    });
  }

  // =================================================================
  // INITIALIZATION
  // =================================================================

  /**
   * Initialize all tracking features
   */
  function initializeTracking() {
    initScrollTracking();
    initTimeTracking();
    initOutboundLinkTracking();
    initErrorTracking();
    trackUTMParameters();
    trackPerformanceMetrics();

    log('All tracking features initialized');
  }

  /**
   * Check cookie consent and initialize
   */
  function checkConsentAndInit() {
    const consentCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('cookie_consent='));

    if (!consentCookie) {
      log('No cookie consent found. Waiting for user consent...');
      return;
    }

    try {
      const consentData = JSON.parse(decodeURIComponent(consentCookie.split('=')[1]));

      if (consentData.preferences && consentData.preferences.analytics) {
        log('Analytics cookies accepted. Initializing GA4...');
        state.consentGiven = true;
        initGA4();
      } else {
        log('Analytics cookies not accepted. GA4 will not load.');
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
      log('Analytics cookies accepted via consent update. Initializing GA4...');
      state.consentGiven = true;
      initGA4();
    } else {
      log('Analytics cookies rejected via consent update. Disabling GA4...');
      state.consentGiven = false;
      disableGA4();
    }
  });

  // =================================================================
  // UTILITY FUNCTIONS
  // =================================================================

  function log(...args) {
    if (CONFIG.DEBUG) {
      console.log('[Analytics]', ...args);
    }
  }

  // =================================================================
  // PUBLIC API
  // =================================================================

  window.Analytics = {
    // Core functions
    track: trackEvent,
    trackPageView: trackPageView,
    init: initGA4,
    disable: disableGA4,

    // E-commerce tracking
    trackProductView: trackProductView,
    trackProductClick: trackProductClick,
    trackAddToWishlist: trackAddToWishlist,
    trackRemoveFromWishlist: trackRemoveFromWishlist,

    // User engagement
    trackSearch: trackSearch,
    trackFilter: trackFilter,
    trackNewsletterSignup: trackNewsletterSignup,
    trackNotificationSignup: trackNotificationSignup,
    trackSocialShare: trackSocialShare,

    // Funnel tracking
    trackFunnelStep: trackFunnelStep,

    // Utility
    getUTMParams: getUTMParams,
    getEngagementScore: () => state.engagementScore,
    getSessionDuration: () => Math.floor((Date.now() - state.sessionStart) / 1000),

    // Configuration
    config: CONFIG
  };

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkConsentAndInit);
  } else {
    checkConsentAndInit();
  }

  log('Enhanced Analytics module loaded. Waiting for consent...');

})();
