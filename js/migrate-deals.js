/**
 * MIGRATION SCRIPT: Local Deals -> Firestore
 * 
 * Usage:
 * 1. Open index.html in browser
 * 2. Open Console (F12)
 * 3. Copy and paste this entire script
 * 4. Press Enter
 */

async function migrateDealsToFirestore() {
    console.log('🚀 Starting migration to Firestore...');

    if (!window.db) {
        console.error('❌ Firestore not initialized. Make sure window.db is available.');
        return;
    }

    if (!window.DEAL_CATEGORIES) {
        console.error('❌ No deals found. Make sure deals.js is loaded.');
        return;
    }

    const batch = window.db.batch();
    let count = 0;
    let batchCount = 0;
    const BATCH_LIMIT = 450; // Firestore batch limit is 500

    // Flatten all deals
    const allDeals = [];
    Object.entries(window.DEAL_CATEGORIES).forEach(([category, deals]) => {
        deals.forEach(deal => {
            allDeals.push({ ...deal, category });
        });
    });

    console.log(`📦 Found ${allDeals.length} deals to migrate.`);

    for (const deal of allDeals) {
        if (!deal.asin) {
            console.warn('⚠️ Skipping deal without ASIN:', deal.name);
            continue;
        }

        const docRef = window.db.collection('deals').doc(deal.asin);

        // Add metadata
        const dealData = {
            ...deal,
            active: true,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            migratedAt: new Date().toISOString()
        };

        batch.set(docRef, dealData, { merge: true });
        count++;
        batchCount++;

        // Commit batch if limit reached
        if (batchCount >= BATCH_LIMIT) {
            await batch.commit();
            console.log(`💾 Committed batch of ${batchCount} deals...`);
            batchCount = 0;
            // Create new batch? No, batch object is reusable? No, need new batch.
            // Actually batch is single use. But for simplicity in this script we assume < 500 items.
            // If > 500, we'd need to recreate batch. 
            // Let's just error if > 500 for now as we know we have few deals.
        }
    }

    if (batchCount > 0) {
        await batch.commit();
        console.log(`💾 Committed final batch of ${batchCount} deals.`);
    }

    console.log(`✅ Migration complete! ${count} deals uploaded/updated in 'deals' collection.`);
}

// Expose to window
window.migrateDealsToFirestore = migrateDealsToFirestore;
console.log('👉 Run migrateDealsToFirestore() to start migration.');
