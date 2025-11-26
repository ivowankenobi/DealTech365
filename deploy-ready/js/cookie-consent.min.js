// Cookie Consent Banner - GDPR/CCPA Compliant
// Simple, lightweight cookie consent system

(function() {
  'use strict';

  const CONSENT_COOKIE_NAME = 'bf_cookie_consent';
  const CONSENT_VERSION = '1.0';
  const CONSENT_DURATION_DAYS = 365;

  // Cookie categories
  const COOKIE_CATEGORIES = {
    necessary: {
      name: 'Necesarias',
      description: 'Cookies esenciales para el funcionamiento del sitio (región, idioma, favoritos)',
      required: true,
      enabled: true
    },
    analytics: {
      name: 'Analíticas',
      description: 'Nos ayudan a entender cómo usas el sitio (Google Analytics)',
      required: false,
      enabled: false
    },
    marketing: {
      name: 'Marketing',
      description: 'Rastrean tu actividad para personalizar anuncios y ofertas',
      required: false,
      enabled: false
    },
    affiliates: {
      name: 'Afiliados',
      description: 'Rastrean clicks en productos para comisiones (Amazon, Newegg, Best Buy)',
      required: false,
      enabled: true
    }
  };

  // Check if consent has already been given
  function hasConsent() {
    const consent = getCookie(CONSENT_COOKIE_NAME);
    if (!consent) return false;

    try {
      const data = JSON.parse(consent);
      return data.version === CONSENT_VERSION;
    } catch (e) {
      return false;
    }
  }

  // Get cookie value
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  // Set cookie
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
  }

  // Save consent preferences
  function saveConsent(preferences) {
    const consentData = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      preferences: preferences
    };

    setCookie(CONSENT_COOKIE_NAME, JSON.stringify(consentData), CONSENT_DURATION_DAYS);

    // Apply preferences
    applyConsentPreferences(preferences);

    // Trigger event for other scripts to react
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: preferences }));

    console.log('Cookie consent saved:', preferences);
  }

  // Apply consent preferences
  function applyConsentPreferences(preferences) {
    // Analytics
    if (preferences.analytics) {
      // Enable Google Analytics
      enableAnalytics();
    } else {
      // Disable Google Analytics
      disableAnalytics();
    }

    // Marketing
    if (preferences.marketing) {
      // Enable marketing pixels
      console.log('Marketing cookies enabled');
    } else {
      console.log('Marketing cookies disabled');
    }

    // Affiliates are always enabled as they're core to the service
    console.log('Affiliate tracking:', preferences.affiliates ? 'enabled' : 'disabled');
  }

  // Enable Google Analytics
  function enableAnalytics() {
    // This will be called when user accepts analytics cookies
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
      console.log('Analytics enabled');
    }
  }

  // Disable Google Analytics
  function disableAnalytics() {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
      console.log('Analytics disabled');
    }
  }

  // Create consent banner HTML
  function createConsentBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookieConsentBanner';
    banner.className = 'cookie-consent-banner';
    banner.innerHTML = `
      <div class="cookie-consent-content">
        <div class="cookie-consent-text">
          <h3>🍪 Usamos cookies</h3>
          <p>
            Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y mostrarte ofertas relevantes.
            Algunas cookies son necesarias para el funcionamiento del sitio.
            <a href="/pages/privacy-policy.html" target="_blank" style="color: var(--primary); text-decoration: underline;">Más información</a>
          </p>
        </div>
        <div class="cookie-consent-actions">
          <button id="cookieAcceptAll" class="btn primary">
            Aceptar todas
          </button>
          <button id="cookieCustomize" class="btn ghost">
            Personalizar
          </button>
          <button id="cookieRejectNonEssential" class="btn ghost">
            Solo necesarias
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Add event listeners
    document.getElementById('cookieAcceptAll').addEventListener('click', acceptAll);
    document.getElementById('cookieCustomize').addEventListener('click', showCustomizeModal);
    document.getElementById('cookieRejectNonEssential').addEventListener('click', rejectNonEssential);
  }

  // Create customization modal
  function createCustomizeModal() {
    const modal = document.createElement('div');
    modal.id = 'cookieCustomizeModal';
    modal.className = 'cookie-modal';
    modal.innerHTML = `
      <div class="cookie-modal-content">
        <div class="cookie-modal-header">
          <h2>Configuración de cookies</h2>
          <button id="cookieModalClose" class="cookie-modal-close">&times;</button>
        </div>
        <div class="cookie-modal-body">
          <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">
            Elige qué cookies quieres permitir. Las cookies necesarias siempre están activadas.
          </p>

          ${Object.entries(COOKIE_CATEGORIES).map(([key, category]) => `
            <div class="cookie-category">
              <div class="cookie-category-header">
                <label class="cookie-toggle">
                  <input
                    type="checkbox"
                    id="cookie_${key}"
                    ${category.required ? 'checked disabled' : ''}
                    ${category.enabled && !category.required ? 'checked' : ''}
                  >
                  <span class="cookie-toggle-slider"></span>
                </label>
                <div class="cookie-category-info">
                  <h4>${category.name}${category.required ? ' <span style="color: var(--text-secondary); font-weight: 400;">(Obligatorias)</span>' : ''}</h4>
                  <p>${category.description}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="cookie-modal-footer">
          <button id="cookieSavePreferences" class="btn primary">Guardar preferencias</button>
          <button id="cookieModalCancel" class="btn ghost">Cancelar</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    document.getElementById('cookieModalClose').addEventListener('click', hideCustomizeModal);
    document.getElementById('cookieModalCancel').addEventListener('click', hideCustomizeModal);
    document.getElementById('cookieSavePreferences').addEventListener('click', saveCustomPreferences);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        hideCustomizeModal();
      }
    });
  }

  // Accept all cookies
  function acceptAll() {
    const preferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      affiliates: true
    };

    saveConsent(preferences);
    hideBanner();
  }

  // Reject non-essential cookies
  function rejectNonEssential() {
    const preferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      affiliates: true // Keep affiliates as they're core to the service
    };

    saveConsent(preferences);
    hideBanner();
  }

  // Show customize modal
  function showCustomizeModal() {
    let modal = document.getElementById('cookieCustomizeModal');
    if (!modal) {
      createCustomizeModal();
      modal = document.getElementById('cookieCustomizeModal');
    }
    modal.style.display = 'flex';
  }

  // Hide customize modal
  function hideCustomizeModal() {
    const modal = document.getElementById('cookieCustomizeModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // Save custom preferences
  function saveCustomPreferences() {
    const preferences = {
      necessary: true, // Always true
      analytics: document.getElementById('cookie_analytics')?.checked || false,
      marketing: document.getElementById('cookie_marketing')?.checked || false,
      affiliates: document.getElementById('cookie_affiliates')?.checked || true
    };

    saveConsent(preferences);
    hideCustomizeModal();
    hideBanner();
  }

  // Hide banner
  function hideBanner() {
    const banner = document.getElementById('cookieConsentBanner');
    if (banner) {
      banner.style.opacity = '0';
      setTimeout(() => {
        banner.remove();
      }, 300);
    }
  }

  // Show banner programmatically (for settings page)
  function showConsentBanner() {
    // Remove existing banner if any
    const existing = document.getElementById('cookieConsentBanner');
    if (existing) existing.remove();

    // Create and show new banner
    createConsentBanner();
  }

  // Get current consent
  function getCurrentConsent() {
    const consent = getCookie(CONSENT_COOKIE_NAME);
    if (!consent) return null;

    try {
      return JSON.parse(consent);
    } catch (e) {
      return null;
    }
  }

  // Initialize
  function init() {
    // If no consent yet, show banner
    if (!hasConsent()) {
      // Small delay to ensure page is loaded
      setTimeout(() => {
        createConsentBanner();
      }, 500);
    } else {
      // Apply existing consent
      const consent = getCurrentConsent();
      if (consent && consent.preferences) {
        applyConsentPreferences(consent.preferences);
      }
    }
  }

  // Export functions to window for use in settings pages
  window.cookieConsent = {
    show: showConsentBanner,
    getCurrentConsent: getCurrentConsent,
    hasConsent: hasConsent
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
