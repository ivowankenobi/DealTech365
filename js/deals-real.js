// Dynamic Deal Loader - Loads from data/deals-ES.json
// Auto-updated from scraper

let DEAL_CATEGORIES = {
  audio: { name: 'Audio', icon: '🎧', products: [] },
  smartphones: { name: 'Smartphones', icon: '📱', products: [] },
  gaming: { name: 'Gaming', icon: '🎮', products: [] },
  laptops: { name: 'Laptops', icon: '💻', products: [] }
};

// Load deals from JSON file
async function loadDeals() {
  try {
    const response = await fetch('data/deals-ES.json');
    if (!response.ok) throw new Error('Failed to load deals');

    const data = await response.json();

    // Clear existing products
    Object.keys(DEAL_CATEGORIES).forEach(cat => {
      DEAL_CATEGORIES[cat].products = [];
    });

    // Group deals by category
    data.deals.forEach(deal => {
      if (DEAL_CATEGORIES[deal.category]) {
        DEAL_CATEGORIES[deal.category].products.push({
          name: deal.name,
          brand: deal.brand,
          basePrice: deal.basePrice,
          currentPrice: deal.currentPrice,
          discount: deal.discount,
          image: deal.image,
          asin: deal.asin,
          specs: {},
          affiliateLinks: deal.affiliateLinks
        });
      }
    });

    console.log(`Loaded ${data.deals.length} deals from ${data.metadata.scrapedAt}`);

    // Generate deals after loading
    generateDeals();

  } catch (error) {
    console.error('Error loading deals:', error);
    // Fallback: show empty state or error message
  }
}

// Generate and display all deals
function generateDeals() {
  const container = document.querySelector('.deals__grid');
  if (!container) return;

  container.innerHTML = '';
  let allDeals = [];

  // Collect all products from all categories
  Object.keys(DEAL_CATEGORIES).forEach(category => {
    DEAL_CATEGORIES[category].products.forEach(product => {
      allDeals.push({
        ...product,
        category: category,
        categoryName: DEAL_CATEGORIES[category].name,
        categoryIcon: DEAL_CATEGORIES[category].icon
      });
    });
  });

  // Sort by discount (highest first)
  allDeals.sort((a, b) => b.discount - a.discount);

  displayDeals(allDeals);
  updateStats(allDeals);
}

// Display deals in the grid
function displayDeals(deals) {
  const container = document.querySelector('.deals__grid');
  if (!container) return;

  container.innerHTML = '';

  if (deals.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <p>No se encontraron ofertas</p>
      </div>
    `;
    return;
  }

  deals.forEach(deal => {
    const card = createDealCard(deal);
    container.appendChild(card);
  });
}

// Create a deal card element
function createDealCard(deal) {
  const card = document.createElement('div');
  card.className = 'deal-card';
  card.dataset.category = deal.category;
  card.dataset.brand = deal.brand.toLowerCase();

  const currentPrice = deal.currentPrice || (deal.basePrice * (1 - deal.discount / 100));

  card.innerHTML = `
    <div class="deal-image" style="background-image: url('${deal.image}')">
      <div class="deal-badge">${deal.discount}% OFF</div>
    </div>
    <div class="deal-content">
      <div class="deal-header">
        <h3 class="deal-title">${deal.name}</h3>
        <div class="deal-store-badge" data-store="amazon">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" style="height: 14px; width: auto; vertical-align: middle;">
        </div>
      </div>

      <div class="deal-content-main">
        <p class="deal-brand">${deal.brand}</p>
      </div>

      <div class="deal-price">
        <span class="deal-price-current">€${currentPrice.toFixed(2)}</span>
        <span class="deal-price-original">€${deal.basePrice.toFixed(2)}</span>
      </div>

      <div class="deal-actions">
        <a href="${deal.affiliateLinks.EU.amazon}"
           target="_blank"
           rel="noopener noreferrer"
           class="deal-btn-premium"
           data-asin="${deal.asin}"
           data-product-name="${deal.name.replace(/"/g, '&quot;')}"
           data-product-category="${deal.category}"
           data-product-brand="${deal.brand}"
           data-product-price="${currentPrice.toFixed(2)}"
           data-product-discount="${deal.discount}">
          Ver oferta
        </a>
        <button class="deal-btn-favorite" onclick="toggleFavorite('${deal.asin}')" aria-label="Add to favorites">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
    </div>
  `;

  return card;
}

// Favorites functionality
function toggleFavorite(asin) {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const index = favorites.indexOf(asin);

  if (index > -1) {
    favorites.splice(index, 1);

    // Track removal from favorites
    if (window.Analytics && typeof window.Analytics.trackRemoveFromWishlist === 'function') {
      window.Analytics.trackRemoveFromWishlist({ asin: asin });
    }
  } else {
    favorites.push(asin);

    // Track addition to favorites
    if (window.Analytics && typeof window.Analytics.trackAddToWishlist === 'function') {
      window.Analytics.trackAddToWishlist({ asin: asin });
    }
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoriteButtons();
}

function updateFavoriteButtons() {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  document.querySelectorAll('.deal-btn-favorite').forEach(btn => {
    const card = btn.closest('.deal-card');
    const asin = card.querySelector('.deal-btn-premium').href.match(/\/dp\/([A-Z0-9]+)/)?.[1];
    if (asin && favorites.includes(asin)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Filter by category
function filterByCategory(category) {
  let filtered;

  if (category === 'all') {
    filtered = [];
    Object.keys(DEAL_CATEGORIES).forEach(cat => {
      DEAL_CATEGORIES[cat].products.forEach(product => {
        filtered.push({
          ...product,
          category: cat,
          categoryName: DEAL_CATEGORIES[cat].name,
          categoryIcon: DEAL_CATEGORIES[cat].icon
        });
      });
    });
  } else {
    filtered = DEAL_CATEGORIES[category].products.map(product => ({
      ...product,
      category: category,
      categoryName: DEAL_CATEGORIES[category].name,
      categoryIcon: DEAL_CATEGORIES[category].icon
    }));
  }

  // Track filter usage
  if (window.Analytics && typeof window.Analytics.trackFilter === 'function') {
    window.Analytics.trackFilter('category', category);
  }

  // Update active button
  document.querySelectorAll('.filter-button').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-category="${category}"]`)?.classList.add('active');

  displayDeals(filtered);
  updateStats(filtered);
}

// Filter by brand
function filterByBrand(brand) {
  let allDeals = [];

  Object.keys(DEAL_CATEGORIES).forEach(category => {
    DEAL_CATEGORIES[category].products.forEach(product => {
      if (product.brand.toLowerCase().includes(brand.toLowerCase())) {
        allDeals.push({
          ...product,
          category: category,
          categoryName: DEAL_CATEGORIES[category].name,
          categoryIcon: DEAL_CATEGORIES[category].icon
        });
      }
    });
  });

  displayDeals(allDeals);
  updateStats(allDeals);
}

// Search deals
function searchDeals(query) {
  if (!query || query.trim() === '') {
    generateDeals();
    return;
  }

  const searchTerm = query.toLowerCase().trim();
  let results = [];

  Object.keys(DEAL_CATEGORIES).forEach(category => {
    DEAL_CATEGORIES[category].products.forEach(product => {
      if (
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        DEAL_CATEGORIES[category].name.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          ...product,
          category: category,
          categoryName: DEAL_CATEGORIES[category].name,
          categoryIcon: DEAL_CATEGORIES[category].icon
        });
      }
    });
  });

  // Track search
  if (window.Analytics && typeof window.Analytics.trackSearch === 'function') {
    window.Analytics.trackSearch(searchTerm, results.length);
  }

  displayDeals(results);
  updateStats(results);
}

// Sort deals
function sortDeals(sortBy) {
  let allDeals = [];

  Object.keys(DEAL_CATEGORIES).forEach(category => {
    DEAL_CATEGORIES[category].products.forEach(product => {
      allDeals.push({
        ...product,
        category: category,
        categoryName: DEAL_CATEGORIES[category].name,
        categoryIcon: DEAL_CATEGORIES[category].icon,
        currentPrice: product.currentPrice || (product.basePrice * (1 - product.discount / 100))
      });
    });
  });

  let sorted = [...allDeals];

  switch(sortBy) {
    case 'discount':
      sorted.sort((a, b) => b.discount - a.discount);
      break;
    case 'price-low':
      sorted.sort((a, b) => a.currentPrice - b.currentPrice);
      break;
    case 'price-high':
      sorted.sort((a, b) => b.currentPrice - a.currentPrice);
      break;
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  displayDeals(sorted);
}

// Update statistics
function updateStats(deals) {
  const totalDeals = deals.length;
  const avgDiscount = deals.reduce((sum, deal) => sum + deal.discount, 0) / totalDeals;
  const totalSavings = deals.reduce((sum, deal) => {
    const currentPrice = deal.currentPrice || (deal.basePrice * (1 - deal.discount / 100));
    return sum + (deal.basePrice - currentPrice);
  }, 0);

  // Update UI if stats elements exist
  const statsContainer = document.querySelector('.stats');
  if (statsContainer) {
    statsContainer.innerHTML = `
      <div class="stat">
        <span class="stat__value">${totalDeals}</span>
        <span class="stat__label">Ofertas activas</span>
      </div>
      <div class="stat">
        <span class="stat__value">${avgDiscount.toFixed(0)}%</span>
        <span class="stat__label">Descuento promedio</span>
      </div>
      <div class="stat">
        <span class="stat__value">€${totalSavings.toFixed(0)}</span>
        <span class="stat__label">Ahorro total disponible</span>
      </div>
    `;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadDeals);
} else {
  loadDeals();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEAL_CATEGORIES, generateDeals, loadDeals };
}

// Track affiliate link clicks
function initAffiliateTracking() {
  document.addEventListener('click', function(e) {
    const affiliateLink = e.target.closest('.deal-btn-premium');
    if (!affiliateLink) return;

    // Extract product data from data attributes
    const productData = {
      asin: affiliateLink.dataset.asin,
      name: affiliateLink.dataset.productName,
      category: affiliateLink.dataset.productCategory,
      brand: affiliateLink.dataset.productBrand,
      basePrice: parseFloat(affiliateLink.dataset.productPrice),
      discount: parseInt(affiliateLink.dataset.productDiscount)
    };

    // Track with Analytics if available
    if (window.Analytics && typeof window.Analytics.trackProductClick === 'function') {
      window.Analytics.trackProductClick(productData, 'amazon');
    }
  });
}

// Initialize affiliate tracking when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAffiliateTracking);
} else {
  initAffiliateTracking();
}

// Make functions available globally for event listeners
window.filterByCategory = filterByCategory;
window.filterByBrand = filterByBrand;
window.searchDeals = searchDeals;
window.sortDeals = sortDeals;
window.generateDeals = generateDeals;
window.loadDeals = loadDeals;
window.toggleFavorite = toggleFavorite;
