// Real Products - Amazon Affiliate Links
// All products with real ASINs and working affiliate links

const DEAL_CATEGORIES = {
  laptops: {
    name: 'Laptops',
    icon: '💻',
    products: [
      {
        name: 'HP 15-fd2013ns',
        brand: 'HP',
        basePrice: 1299,
        discount: 23,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
        asin: 'B0FCG2D89G',
        specs: {
          ram: '32GB',
          storage: '1TB SSD',
          screen: '15.6" FHD',
          processor: 'Intel Ultra 7-255U'
        },
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/B0FCG2D89G?tag=blackfridaytech-20'
          },
          EU: {
            amazon: 'https://www.amazon.es/dp/B0FCG2D89G?tag=dealtech365-21'
          }
        }
      },
      {
        name: 'ASUS Zenbook Duo OLED',
        brand: 'ASUS',
        basePrice: 2299,
        discount: 18,
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop',
        asin: 'B0DT4S1SS9',
        specs: {
          ram: '32GB',
          storage: '1TB SSD',
          screen: '14" OLED Dual',
          processor: 'Intel Ultra 9 285H'
        },
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/B0DT4S1SS9?tag=blackfridaytech-20'
          },
          EU: {
            amazon: 'https://www.amazon.es/dp/B0DT4S1SS9?tag=dealtech365-21'
          }
        }
      },
      {
        name: 'HP Omnibook X Flip',
        brand: 'HP',
        basePrice: 1799,
        discount: 20,
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop',
        asin: 'B0FND2Y84Z',
        specs: {
          ram: '32GB',
          storage: '1TB SSD',
          screen: '14" OLED 3K',
          processor: 'Intel Ultra 7-258V'
        },
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/B0FND2Y84Z?tag=blackfridaytech-20'
          },
          EU: {
            amazon: 'https://www.amazon.es/dp/B0FND2Y84Z?tag=dealtech365-21'
          }
        }
      },
      {
        name: 'ASUS Vivobook S 14',
        brand: 'ASUS',
        basePrice: 1099,
        discount: 22,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop',
        asin: 'B0F1TSDNPB',
        specs: {
          ram: '16GB',
          storage: '1TB SSD',
          screen: '14" WUXGA',
          processor: 'Intel Ultra 7 255H'
        },
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/B0F1TSDNPB?tag=blackfridaytech-20'
          },
          EU: {
            amazon: 'https://www.amazon.es/dp/B0F1TSDNPB?tag=dealtech365-21'
          }
        }
      },
      {
        name: 'Acer Chromebook Plus 514',
        brand: 'Acer',
        basePrice: 499,
        discount: 25,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
        asin: 'B0DS69JPHH',
        specs: {
          ram: '8GB',
          storage: '256GB SSD',
          screen: '14" FullHD',
          processor: 'Ryzen 3 7320C'
        },
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/B0DS69JPHH?tag=blackfridaytech-20'
          },
          EU: {
            amazon: 'https://www.amazon.es/dp/B0DS69JPHH?tag=dealtech365-21'
          }
        }
      },
      {
        name: 'ASUS Vivobook 15',
        brand: 'ASUS',
        basePrice: 799,
        discount: 21,
        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop',
        asin: 'B0DP5RBZC2',
        specs: {
          ram: '16GB',
          storage: '512GB SSD',
          screen: '15.6" FullHD',
          processor: 'Core i7-1355U'
        },
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/B0DP5RBZC2?tag=blackfridaytech-20'
          },
          EU: {
            amazon: 'https://www.amazon.es/dp/B0DP5RBZC2?tag=dealtech365-21'
          }
        }
      },
      {
        name: 'HP 15-fc0240ns',
        brand: 'HP',
        basePrice: 899,
        discount: 24,
        image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=300&fit=crop',
        asin: 'B0FCG33M6K',
        specs: {
          ram: '32GB',
          storage: '1TB SSD',
          screen: '15.6" FHD',
          processor: 'Ryzen 7-7730U'
        },
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/B0FCG33M6K?tag=blackfridaytech-20'
          },
          EU: {
            amazon: 'https://www.amazon.es/dp/B0FCG33M6K?tag=dealtech365-21'
          }
        }
      },
      {
        name: 'ASUS ProArt P16 OLED',
        brand: 'ASUS',
        basePrice: 2599,
        discount: 15,
        image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop',
        asin: 'B0F9PJLCC3',
        specs: {
          ram: '32GB',
          storage: '1TB SSD',
          screen: '16" OLED',
          processor: 'Ryzen AI 9 HX 370',
          gpu: 'RTX 5060 8GB'
        },
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/B0F9PJLCC3?tag=blackfridaytech-20'
          },
          EU: {
            amazon: 'https://www.amazon.es/dp/B0F9PJLCC3?tag=dealtech365-21'
          }
        }
      },
      {
        name: 'ASUS Zenbook 14 OLED',
        brand: 'ASUS',
        basePrice: 1899,
        discount: 19,
        image: 'https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=400&h=300&fit=crop',
        asin: 'B0DT4TPD3Q',
        specs: {
          ram: '32GB',
          storage: '1TB SSD',
          screen: '14" OLED 120Hz',
          processor: 'Intel Ultra 9 285H'
        },
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/B0DT4TPD3Q?tag=blackfridaytech-20'
          },
          EU: {
            amazon: 'https://www.amazon.es/dp/B0DT4TPD3Q?tag=dealtech365-21'
          }
        }
      }
    ]
  },

  smartphones: {
    name: 'Smartphones',
    icon: '📱',
    products: [
      {
        name: 'Google Pixel 10',
        brand: 'Google',
        basePrice: 799,
        discount: 15,
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop',
        asin: 'B0FHK7S5RX',
        specs: {
          storage: '128GB',
          screen: '6.3" AMOLED',
          camera: 'Triple AI',
          battery: '24h+'
        },
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/B0FHK7S5RX?tag=blackfridaytech-20'
          },
          EU: {
            amazon: 'https://www.amazon.es/dp/B0FHK7S5RX?tag=dealtech365-21'
          }
        }
      },
      {
        name: 'Google Pixel 10 Pro XL',
        brand: 'Google',
        basePrice: 1099,
        discount: 12,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
        asin: 'B0FHL7TPXC',
        specs: {
          storage: '256GB',
          screen: '6.8" Super Actua',
          camera: 'Triple AI',
          battery: '24h+'
        },
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/B0FHL7TPXC?tag=blackfridaytech-20'
          },
          EU: {
            amazon: 'https://www.amazon.es/dp/B0FHL7TPXC?tag=dealtech365-21'
          }
        }
      },
      {
        name: 'Google Pixel 9a',
        brand: 'Google',
        basePrice: 549,
        discount: 18,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
        asin: 'B0DSWJDNY4',
        specs: {
          storage: '256GB',
          screen: '6.3" OLED',
          camera: 'AI Camera',
          battery: 'All-day'
        },
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/B0DSWJDNY4?tag=blackfridaytech-20'
          },
          EU: {
            amazon: 'https://www.amazon.es/dp/B0DSWJDNY4?tag=dealtech365-21'
          }
        }
      },
      {
        name: 'Samsung Galaxy A26 5G',
        brand: 'Samsung',
        basePrice: 349,
        discount: 20,
        image: 'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=400&h=300&fit=crop',
        asin: 'B0DWFY6M3Z',
        specs: {
          ram: '6GB',
          storage: '256GB',
          screen: '6.5" AMOLED',
          camera: '50MP'
        },
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/B0DWFY6M3Z?tag=blackfridaytech-20'
          },
          EU: {
            amazon: 'https://www.amazon.es/dp/B0DWFY6M3Z?tag=dealtech365-21'
          }
        }
      },
      {
        name: 'Xiaomi POCO X7 Pro',
        brand: 'Xiaomi',
        basePrice: 399,
        discount: 22,
        image: 'https://images.unsplash.com/photo-1592286927505-c0d0eb5e6d08?w=400&h=300&fit=crop',
        asin: 'B0DKP7F2GZ',
        specs: {
          ram: '12GB',
          storage: '512GB',
          screen: '6.67" AMOLED',
          camera: '108MP'
        },
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/B0DKP7F2GZ?tag=blackfridaytech-20'
          },
          EU: {
            amazon: 'https://www.amazon.es/dp/B0DKP7F2GZ?tag=dealtech365-21'
          }
        }
      }
    ]
  },

  audio: {
    name: 'Audio',
    icon: '🎧',
    products: [
      {
        name: 'JBL Tune Flex TWS',
        brand: 'JBL',
        basePrice: 99,
        discount: 30,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
        asin: 'B0B5GP9FXN',
        specs: {
          type: 'In-ear TWS',
          anc: 'Active Noise Cancelling',
          battery: '8-24h',
          resistance: 'IPX4'
        },
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/B0B5GP9FXN?tag=blackfridaytech-20'
          },
          EU: {
            amazon: 'https://www.amazon.es/dp/B0B5GP9FXN?tag=dealtech365-21'
          }
        }
      },
      {
        name: 'HUAWEI FreeClip',
        brand: 'HUAWEI',
        basePrice: 149,
        discount: 25,
        image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?w=400&h=300&fit=crop',
        asin: 'B0CNH1DVWB',
        specs: {
          type: 'Open-ear Clip',
          anc: 'AI Call Noise Cancelling',
          battery: 'Long duration',
          resistance: 'IP54'
        },
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/B0CNH1DVWB?tag=blackfridaytech-20'
          },
          EU: {
            amazon: 'https://www.amazon.es/dp/B0CNH1DVWB?tag=dealtech365-21'
          }
        }
      },
      {
        name: 'Logitech G435 Gaming',
        brand: 'Logitech',
        basePrice: 89,
        discount: 28,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=300&fit=crop',
        asin: 'B07W7LNTM5',
        specs: {
          type: 'Gaming Headset',
          wireless: 'LIGHTSPEED + Bluetooth',
          battery: '18h',
          compatibility: 'PC, PS5, Switch'
        },
        affiliateLinks: {
          US: {
            amazon: 'https://www.amazon.com/dp/B07W7LNTM5?tag=blackfridaytech-20'
          },
          EU: {
            amazon: 'https://www.amazon.es/dp/B07W7LNTM5?tag=dealtech365-21'
          }
        }
      }
    ]
  }
};

// Generate deals with pricing
function generateDeals(userRegion) {
  const region = userRegion.isEurope ? 'EU' : 'US';
  const currency = userRegion.currency;
  const currencySymbol = userRegion.currencySymbol;

  const allDeals = [];

  Object.keys(DEAL_CATEGORIES).forEach(categoryKey => {
    const category = DEAL_CATEGORIES[categoryKey];

    category.products.forEach(product => {
      const finalPrice = Math.round(product.basePrice * (1 - product.discount / 100));

      // Always use Amazon link for this region
      const regionLinks = product.affiliateLinks[region];
      const affiliateLink = regionLinks.amazon;

      allDeals.push({
        ...product,
        category: categoryKey,
        categoryName: category.name,
        finalPrice: finalPrice,
        savings: product.basePrice - finalPrice,
        currency: currency,
        currencySymbol: currencySymbol,
        affiliateLink: affiliateLink,
        network: 'amazon'
      });
    });
  });

  return allDeals;
}

// Initialize deals on page load
let allDeals = [];

document.addEventListener('DOMContentLoaded', () => {
  // Get user region
  const userRegion = window.getUserRegion ? window.getUserRegion() : {
    isEurope: true,
    currency: 'EUR',
    currencySymbol: '€'
  };

  // Generate deals (Try service first, fallback to local generation)
  if (window.dealsService) {
    // Show loading state if needed, or just wait
    window.dealsService.getAllDeals(userRegion.isEurope ? 'EU' : 'US').then(result => {
      allDeals = result.deals;
      displayDeals();

      // Update favorite buttons after deals are loaded
      setTimeout(() => {
        updateFavoriteButtons();
      }, 100);
    });
  } else {
    allDeals = generateDeals(userRegion);
    displayDeals();
  }

  // Update favorite buttons after a short delay to ensure DOM is ready
  setTimeout(() => {
    updateFavoriteButtons();
    console.log('✅ Favorite buttons updated on page load');
  }, 100);

  // Also update when deals are displayed
  const dealsGrid = document.getElementById('dealsGrid');
  if (dealsGrid) {
    const observer = new MutationObserver(() => {
      updateFavoriteButtons();
    });
    observer.observe(dealsGrid, { childList: true, subtree: true });
  }
});

// Display deals function
function displayDeals(dealsToShow = null) {
  const container = document.getElementById('dealsGrid');
  if (!container) return;

  const deals = dealsToShow || allDeals;

  if (!deals || deals.length === 0) {
    container.innerHTML = '<p style="text-align:center;padding:40px;color:#666;">No se encontraron productos.</p>';
    return;
  }

  container.innerHTML = deals.map(deal => `
    <div class="deal-card" data-category="${deal.category}" data-brand="${deal.brand.toLowerCase()}">
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

          <div class="deal-specs">
            ${Object.entries(deal.specs).map(([key, value]) =>
    `<span class="spec-item"><strong>${key}:</strong> ${value}</span>`
  ).join('')}
          </div>
        </div>

        <div class="deal-price">
          <span class="deal-price-current">${deal.currencySymbol}${deal.finalPrice}</span>
          <span class="deal-price-original">${deal.currencySymbol}${deal.basePrice}</span>
        </div>

        <div class="deal-actions">
          <a href="${deal.affiliateLink}"
             target="_blank"
             rel="noopener noreferrer"
             class="deal-btn-premium">
            Ver oferta
          </a>
          <button class="deal-btn-favorite" onclick="toggleFavorite('${deal.asin}')" aria-label="Add to favorites">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Favorites functionality
function toggleFavorite(asin) {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const index = favorites.indexOf(asin);

  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(asin);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoriteButtons();

  // Sync with Firebase if user is logged in
  if (window.authSystem && window.authSystem.currentUser) {
    window.authSystem.saveFavorite(asin);
  }
}

function updateFavoriteButtons() {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  document.querySelectorAll('.deal-btn-favorite').forEach(btn => {
    const card = btn.closest('.deal-card');
    const asin = card.querySelector('.deal-btn-premium').href.match(/\/dp\/([A-Z0-9]+)/)[1];
    if (favorites.includes(asin)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Filter and search functions
function filterByCategory(category) {
  if (category === 'all') {
    displayDeals(allDeals);
  } else {
    const filtered = allDeals.filter(deal => deal.category === category);
    displayDeals(filtered);
  }
}

function filterByBrand(brand) {
  if (brand === 'all') {
    displayDeals(allDeals);
  } else {
    const filtered = allDeals.filter(deal => deal.brand.toLowerCase() === brand.toLowerCase());
    displayDeals(filtered);
  }
}

function searchDeals(query) {
  const lowerQuery = query.toLowerCase();
  const filtered = allDeals.filter(deal =>
    deal.name.toLowerCase().includes(lowerQuery) ||
    deal.brand.toLowerCase().includes(lowerQuery) ||
    Object.values(deal.specs).some(spec =>
      spec.toString().toLowerCase().includes(lowerQuery)
    )
  );
  displayDeals(filtered);
}

function sortDeals(sortBy) {
  let sorted = [...allDeals];

  switch (sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => a.finalPrice - b.finalPrice);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.finalPrice - a.finalPrice);
      break;
    case 'discount':
      sorted.sort((a, b) => b.discount - a.discount);
      break;
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  displayDeals(sorted);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEAL_CATEGORIES, generateDeals };
}

// Make functions available globally for event listeners
window.filterByCategory = filterByCategory;
window.filterByBrand = filterByBrand;
window.searchDeals = searchDeals;
window.sortDeals = sortDeals;
window.generateDeals = generateDeals;
