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
  const card = document.createElement('article');
  card.className = 'deal-card';
  card.dataset.category = deal.category;
  card.dataset.brand = deal.brand;

  const currentPrice = deal.currentPrice || (deal.basePrice * (1 - deal.discount / 100));
  const savings = deal.basePrice - currentPrice;

  card.innerHTML = `
    <div class="deal-card__badge">${deal.discount}% OFF</div>
    <div class="deal-card__image">
      <img src="${deal.image}" alt="${deal.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
    </div>
    <div class="deal-card__content">
      <span class="deal-card__category">${deal.categoryIcon} ${deal.categoryName}</span>
      <h3 class="deal-card__title">${deal.name}</h3>
      <div class="deal-card__price">
        <span class="deal-card__price-current">€${currentPrice.toFixed(2)}</span>
        <span class="deal-card__price-original">€${deal.basePrice.toFixed(2)}</span>
      </div>
      <div class="deal-card__savings">Ahorras: €${savings.toFixed(2)}</div>
      <div class="deal-card__actions">
        <a href="${deal.affiliateLinks.EU.amazon}"
           class="deal-card__button"
           target="_blank"
           rel="nofollow noopener">
          Ver Oferta en Amazon →
        </a>
      </div>
    </div>
  `;

  return card;
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

// Make functions available globally for event listeners
window.filterByCategory = filterByCategory;
window.filterByBrand = filterByBrand;
window.searchDeals = searchDeals;
window.sortDeals = sortDeals;
window.generateDeals = generateDeals;
window.loadDeals = loadDeals;
