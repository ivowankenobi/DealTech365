/**
 * Language Switcher Component
 * Provides UI for changing language
 */

(function() {
  'use strict';

  // Create language switcher HTML
  function createLanguageSwitcher() {
    const currentLang = window.i18n.getCurrentLanguage();
    const languages = window.i18n.getLanguages();

    const container = document.createElement('div');
    container.className = 'language-switcher';
    container.innerHTML = `
      <button class="language-switcher__button" aria-label="Change language">
        <span class="language-switcher__icon">🌐</span>
        <span class="language-switcher__current">${currentLang.toUpperCase()}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 5L6 8L9 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="language-switcher__dropdown">
        ${Object.entries(languages).map(([code, name]) => `
          <button
            class="language-switcher__option ${code === currentLang ? 'active' : ''}"
            data-lang="${code}"
            aria-label="${name}"
          >
            <span class="language-switcher__flag">${code === 'es' ? '🇪🇸' : '🇺🇸'}</span>
            <span>${name}</span>
            ${code === currentLang ? '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' : ''}
          </button>
        `).join('')}
      </div>
    `;

    return container;
  }

  // Initialize language switcher
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initSwitcher);
    } else {
      initSwitcher();
    }
  }

  function initSwitcher() {
    // Find region indicator and replace with language switcher
    const regionIndicator = document.querySelector('.navbar__region');
    if (!regionIndicator) return;

    // Create switcher
    const switcher = createLanguageSwitcher();
    regionIndicator.innerHTML = '';
    regionIndicator.appendChild(switcher);

    // Add event listeners
    const button = switcher.querySelector('.language-switcher__button');
    const dropdown = switcher.querySelector('.language-switcher__dropdown');
    const options = switcher.querySelectorAll('.language-switcher__option');

    // Toggle dropdown
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });

    // Language selection
    options.forEach(option => {
      option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        if (lang && window.i18n) {
          window.i18n.setLanguage(lang);
        }
      });
    });

    console.log('✅ Language switcher initialized');
  }

  // Auto-initialize
  init();

})();
