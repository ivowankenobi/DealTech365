/**
 * Deals Service
 * Handles fetching deals from Firestore with fallback to local data.
 */
class DealsService {
    constructor() {
        this.collection = 'deals';
    }

    /**
     * Get all active deals for a specific region
     * @param {string} region - 'EU' or 'NA'
     * @returns {Promise<Array>} Array of deal objects
     */
    async getAllDeals(region = 'EU') {
        let deals = [];
        let source = 'local';

        try {
            // 1. Try Firestore if available
            if (window.db && navigator.onLine) {
                const snapshot = await window.db.collection(this.collection)
                    .where('active', '==', true)
                    .get();

                if (!snapshot.empty) {
                    snapshot.forEach(doc => {
                        deals.push(doc.data());
                    });
                    source = 'firestore';
                    console.log(`✅ Loaded ${deals.length} deals from Firestore`);
                }
            }
        } catch (error) {
            console.warn('⚠️ Firestore fetch failed, falling back to local:', error);
        }

        // 2. Fallback to local deals.js if Firestore failed or was empty
        if (deals.length === 0) {
            if (typeof window.generateDeals === 'function') {
                // Convert region string to userRegion object
                const userRegion = {
                    isEurope: region === 'EU',
                    currency: region === 'EU' ? 'EUR' : 'USD',
                    currencySymbol: region === 'EU' ? '€' : '$'
                };
                deals = window.generateDeals(userRegion);
                source = 'local';
                console.log(`FYI: Loaded ${deals.length} deals from local fallback`);
            } else {
                console.error('❌ generateDeals not found');
            }
        } else {
            // If we got deals from Firestore, we might need to process them for the region
            // (e.g. currency symbols, though ideally stored in DB)
            deals = this.processDealsForRegion(deals, region);
        }

        return { deals, source };
    }

    processDealsForRegion(deals, region) {
        // Simple processing if needed. 
        // Currently deals.js generates region specific data.
        // If Firestore stores generic data, we'd adapt it here.
        // For now, assuming Firestore has the exact object structure.
        return deals;
    }
}

// Export global instance
window.dealsService = new DealsService();
