// Region and Currency Detection System
// Initialize with timezone detection immediately
const initialTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const initialIsEurope = initialTimezone.includes('Europe');

let userRegion = {
  continent: initialIsEurope ? 'EU' : 'AM',
  country: initialIsEurope ? 'Europe' : 'Americas',
  countryCode: initialIsEurope ? 'EU' : 'US',
  currency: initialIsEurope ? 'EUR' : 'USD',
  currencySymbol: initialIsEurope ? '€' : '$',
  isEurope: initialIsEurope,
  timezone: initialTimezone
};

console.log('Initial region set:', userRegion);

// European countries ISO codes
const EUROPEAN_COUNTRIES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'NO', 'CH',
  'IS', 'LI', 'MC', 'SM', 'VA', 'AD', 'AL', 'BA', 'BY', 'MD',
  'MK', 'RS', 'ME', 'UA'
];

// Detect user region
async function detectUserRegion() {
  try {
    // First check timezone as primary indicator
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isEuropeTimezone = timezone.includes('Europe');

    console.log('🌍 Detecting region...');
    console.log('📍 Current timezone:', timezone);
    console.log('🇪🇺 Is Europe timezone?', isEuropeTimezone);

    // Check if we have cached data and validate it against current timezone
    const savedRegion = localStorage.getItem('userRegion');
    if (savedRegion) {
      const cached = JSON.parse(savedRegion);
      console.log('💾 Found cached region:', cached);

      // If this is a manual override, always respect it
      if (cached.manual === true) {
        cached.timezone = timezone;
        userRegion = cached;
        updateRegionIndicator();
        console.log('✅ Using manual region override:', userRegion);
        return userRegion;
      }

      // Validate automatic detection: if timezone says Europe but cache says not Europe (or vice versa), ignore cache
      if (cached.isEurope !== isEuropeTimezone) {
        console.log('⚠️ Cache mismatch! Timezone says Europe:', isEuropeTimezone, 'but cache says:', cached.isEurope);
        console.log('🔄 Clearing invalid cache and re-detecting...');
        localStorage.removeItem('userRegion');
      } else {
        // Cache is valid, but still update timezone field
        cached.timezone = timezone;
        userRegion = cached;
        updateRegionIndicator();
        console.log('✅ Using validated cache:', userRegion);
        return userRegion;
      }
    }

    // Try to get more precise info from IP geolocation API
    try {
      const response = await fetch('https://ipapi.co/json/', { timeout: 3000 });
      const data = await response.json();

      if (data && data.country_code) {
        const countryCode = data.country_code;
        const isEurope = EUROPEAN_COUNTRIES.includes(countryCode);

        userRegion = {
          continent: data.continent_code || 'unknown',
          country: data.country_name || (isEurope ? 'Europe' : 'Unknown'),
          countryCode: countryCode,
          currency: isEurope ? 'EUR' : 'USD',
          currencySymbol: isEurope ? '€' : '$',
          isEurope: isEurope,
          timezone: data.timezone || timezone
        };

        // Save to localStorage
        localStorage.setItem('userRegion', JSON.stringify(userRegion));
        updateRegionIndicator();
        console.log('✅ Region detected via IP:', userRegion);
        return userRegion;
      }
    } catch (apiError) {
      console.log('⚠️ IP API failed, using timezone detection:', apiError.message);
    }

    // Fallback to timezone detection
    userRegion = {
      continent: isEuropeTimezone ? 'EU' : 'AM',
      country: isEuropeTimezone ? 'Europe' : 'Americas',
      countryCode: isEuropeTimezone ? 'EU' : 'US',
      currency: isEuropeTimezone ? 'EUR' : 'USD',
      currencySymbol: isEuropeTimezone ? '€' : '$',
      isEurope: isEuropeTimezone,
      timezone: timezone
    };

    localStorage.setItem('userRegion', JSON.stringify(userRegion));
    updateRegionIndicator();
    console.log('✅ Region detected via timezone:', userRegion);
    return userRegion;

  } catch (error) {
    console.error('❌ Error detecting region:', error);

    // Final fallback - use the initial timezone detection
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isEuropeTimezone = timezone.includes('Europe');

    userRegion = {
      continent: isEuropeTimezone ? 'EU' : 'AM',
      country: isEuropeTimezone ? 'Europe' : 'Americas',
      countryCode: isEuropeTimezone ? 'EU' : 'US',
      currency: isEuropeTimezone ? 'EUR' : 'USD',
      currencySymbol: isEuropeTimezone ? '€' : '$',
      isEurope: isEuropeTimezone,
      timezone: timezone
    };

    localStorage.setItem('userRegion', JSON.stringify(userRegion));
    updateRegionIndicator();
    console.log('✅ Region defaulted via timezone fallback:', userRegion);
    return userRegion;
  }
}

function updateRegionIndicator() {
  const indicator = document.getElementById('regionIndicator');
  if (indicator) {
    const flag = userRegion.isEurope ? '🇪🇺' : '🌎';
    indicator.innerHTML = `${flag} ${userRegion.country || 'Unknown'} | ${userRegion.currencySymbol}`;
  }
}

function formatPrice(priceUSD) {
  if (userRegion.isEurope) {
    // Convert USD to EUR (approximate rate: 1 USD = 0.92 EUR)
    const priceEUR = priceUSD * 0.92;
    return `€${priceEUR.toFixed(2)}`;
  } else {
    return `$${priceUSD.toFixed(2)}`;
  }
}

function getCurrency() {
  return userRegion.currency;
}

function getCurrencySymbol() {
  return userRegion.currencySymbol;
}

function getRegion() {
  return userRegion;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  detectUserRegion();
});

// Export functions
window.userRegion = userRegion;
window.detectUserRegion = detectUserRegion;
window.formatPrice = formatPrice;
window.getCurrency = getCurrency;
window.getCurrencySymbol = getCurrencySymbol;
window.getRegion = getRegion;
