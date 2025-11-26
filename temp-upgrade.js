const fs = require('fs');
const path = require('path');

console.log('🔄 Starting upgrade...\n');

// Paths
const BASIC = path.join(__dirname, 'js', 'analytics.js');
const ENHANCED = path.join(__dirname, 'js', 'analytics-enhanced.js');
const BACKUP = path.join(__dirname, 'js', 'analytics-basic-backup.js');

// Step 1: Create backup
if (!fs.existsSync(BACKUP)) {
  fs.copyFileSync(BASIC, BACKUP);
  console.log('✅ 1. Backup created: js/analytics-basic-backup.js');
} else {
  console.log('⚠️  1. Backup already exists, skipping...');
}

// Step 2: Copy enhanced to basic
fs.copyFileSync(ENHANCED, BASIC);
console.log('✅ 2. Enhanced version installed as js/analytics.js');

// Step 3: Check if Measurement ID needs transfer
const backupContent = fs.readFileSync(BACKUP, 'utf8');
const idMatch = backupContent.match(/GA4_MEASUREMENT_ID[:\s=]+['"]([^'"]+)['"]/);

if (idMatch && idMatch[1] !== 'G-XXXXXXXXXX') {
  const oldId = idMatch[1];
  let newContent = fs.readFileSync(BASIC, 'utf8');
  newContent = newContent.replace(
    /GA4_MEASUREMENT_ID:\s*['"]G-XXXXXXXXXX['"]/,
    `GA4_MEASUREMENT_ID: '${oldId}'`
  );
  fs.writeFileSync(BASIC, newContent, 'utf8');
  console.log(`✅ 3. Measurement ID transferred: ${oldId}`);
} else {
  console.log('⚠️  3. No Measurement ID to transfer (using default placeholder)');
}

console.log('\n🎉 UPGRADE COMPLETE!\n');
console.log('📋 NEXT STEPS:');
console.log('   1. Configure your Measurement ID in js/analytics.js (line 20)');
console.log('   2. Run: npm run build');
console.log('   3. Test in browser (F12 → Console)');
console.log('   4. Run: npm run deploy:prepare');
console.log('   5. Upload to cPanel\n');
