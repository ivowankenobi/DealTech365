#!/usr/bin/env node

/**
 * Upgrade Analytics to Enhanced Version
 *
 * This script helps you upgrade from the basic analytics.js
 * to the enhanced analytics-enhanced.js version
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Colors for terminal
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const BLUE = '\x1b[36m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

console.log(`\n${BOLD}${BLUE}📊 Upgrade to Enhanced Analytics${RESET}\n`);
console.log(`${BLUE}${'═'.repeat(60)}${RESET}\n`);

// File paths
const BASIC_FILE = path.join(__dirname, 'js', 'analytics.js');
const ENHANCED_FILE = path.join(__dirname, 'js', 'analytics-enhanced.js');
const BACKUP_FILE = path.join(__dirname, 'js', 'analytics-basic-backup.js');

// Check if files exist
if (!fs.existsSync(BASIC_FILE)) {
  console.error(`${RED}❌ Error: analytics.js not found${RESET}`);
  process.exit(1);
}

if (!fs.existsSync(ENHANCED_FILE)) {
  console.error(`${RED}❌ Error: analytics-enhanced.js not found${RESET}`);
  process.exit(1);
}

console.log(`${GREEN}✅ Files found:${RESET}`);
console.log(`   ${BASIC_FILE}`);
console.log(`   ${ENHANCED_FILE}\n`);

// Show comparison
console.log(`${YELLOW}📋 COMPARISON:${RESET}\n`);

console.log(`${BOLD}BASIC VERSION (current):${RESET}`);
console.log(`   ✅ Page views`);
console.log(`   ✅ Product clicks`);
console.log(`   ✅ Newsletter signup`);
console.log(`   ✅ Search`);
console.log(`   ✅ Favorites`);
console.log(`   ✅ Cookie consent\n`);

console.log(`${BOLD}ENHANCED VERSION (new):${RESET}`);
console.log(`   ${GREEN}✅ Everything from basic +${RESET}`);
console.log(`   ${GREEN}✅ Scroll depth tracking${RESET}`);
console.log(`   ${GREEN}✅ Time on page tracking${RESET}`);
console.log(`   ${GREEN}✅ Outbound link tracking${RESET}`);
console.log(`   ${GREEN}✅ UTM campaign tracking${RESET}`);
console.log(`   ${GREEN}✅ E-commerce revenue estimation${RESET}`);
console.log(`   ${GREEN}✅ Engagement scoring${RESET}`);
console.log(`   ${GREEN}✅ Funnel tracking${RESET}`);
console.log(`   ${GREEN}✅ Error tracking${RESET}`);
console.log(`   ${GREEN}✅ Performance metrics${RESET}\n`);

console.log(`${BLUE}${'═'.repeat(60)}${RESET}\n`);

// Ask user
rl.question(`${YELLOW}Do you want to upgrade to the enhanced version? (y/n): ${RESET}`, (answer) => {
  if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
    console.log(`\n${YELLOW}⚠️  Upgrade cancelled${RESET}\n`);
    rl.close();
    return;
  }

  console.log(`\n${BLUE}🔄 Starting upgrade...${RESET}\n`);

  try {
    // Step 1: Create backup
    console.log(`${BLUE}1. Creating backup...${RESET}`);
    fs.copyFileSync(BASIC_FILE, BACKUP_FILE);
    console.log(`${GREEN}   ✅ Backup created: ${BACKUP_FILE}${RESET}\n`);

    // Step 2: Copy enhanced version
    console.log(`${BLUE}2. Installing enhanced version...${RESET}`);
    fs.copyFileSync(ENHANCED_FILE, BASIC_FILE);
    console.log(`${GREEN}   ✅ Enhanced version installed${RESET}\n`);

    // Step 3: Check if Measurement ID needs to be transferred
    const backupContent = fs.readFileSync(BACKUP_FILE, 'utf8');
    const measurementIdMatch = backupContent.match(/GA4_MEASUREMENT_ID\s*=\s*['"]([^'"]+)['"]/);

    if (measurementIdMatch && measurementIdMatch[1] !== 'G-XXXXXXXXXX') {
      const oldId = measurementIdMatch[1];
      console.log(`${BLUE}3. Transferring Measurement ID...${RESET}`);

      let enhancedContent = fs.readFileSync(BASIC_FILE, 'utf8');
      enhancedContent = enhancedContent.replace(
        /GA4_MEASUREMENT_ID:\s*['"]G-XXXXXXXXXX['"]/,
        `GA4_MEASUREMENT_ID: '${oldId}'`
      );
      fs.writeFileSync(BASIC_FILE, enhancedContent, 'utf8');

      console.log(`${GREEN}   ✅ Measurement ID transferred: ${oldId}${RESET}\n`);
    } else {
      console.log(`${YELLOW}3. No Measurement ID to transfer${RESET}`);
      console.log(`${YELLOW}   ⚠️  Remember to configure your GA4 Measurement ID${RESET}\n`);
    }

    // Success message
    console.log(`${BLUE}${'═'.repeat(60)}${RESET}`);
    console.log(`${BOLD}${GREEN}🎉 UPGRADE SUCCESSFUL!${RESET}`);
    console.log(`${BLUE}${'═'.repeat(60)}${RESET}\n`);

    console.log(`${YELLOW}📋 NEXT STEPS:${RESET}\n`);
    console.log(`   1. ${GREEN}Verify Measurement ID${RESET}`);
    console.log(`      Open: js/analytics.js`);
    console.log(`      Line 20: Check GA4_MEASUREMENT_ID\n`);

    console.log(`   2. ${GREEN}Configure commission rates (optional)${RESET}`);
    console.log(`      Lines 30-35: Update with your real rates\n`);

    console.log(`   3. ${GREEN}Rebuild the site${RESET}`);
    console.log(`      Run: npm run build\n`);

    console.log(`   4. ${GREEN}Test in browser${RESET}`);
    console.log(`      Open site, accept cookies, check console (F12)\n`);

    console.log(`   5. ${GREEN}Setup GA4 custom dimensions${RESET}`);
    console.log(`      Follow: ANALYTICS-ENHANCED-GUIDE.md\n`);

    console.log(`   6. ${GREEN}Deploy to production${RESET}`);
    console.log(`      Run: npm run deploy:prepare\n`);

    console.log(`${YELLOW}💡 TIP:${RESET} Your old version is backed up at:`);
    console.log(`   ${BACKUP_FILE}\n`);

    console.log(`${YELLOW}📖 DOCUMENTATION:${RESET}`);
    console.log(`   ANALYTICS-ENHANCED-GUIDE.md - Complete guide`);
    console.log(`   analytics-dashboard-config.json - Dashboard configuration\n`);

    console.log(`${BLUE}${'═'.repeat(60)}${RESET}\n`);

  } catch (error) {
    console.error(`\n${RED}❌ Error during upgrade:${RESET}`, error.message);
    console.log(`\n${YELLOW}⚠️  Attempting rollback...${RESET}`);

    try {
      if (fs.existsSync(BACKUP_FILE)) {
        fs.copyFileSync(BACKUP_FILE, BASIC_FILE);
        console.log(`${GREEN}✅ Rollback successful. Original file restored.${RESET}\n`);
      }
    } catch (rollbackError) {
      console.error(`${RED}❌ Rollback failed:${RESET}`, rollbackError.message);
      console.log(`${YELLOW}⚠️  Manual intervention required${RESET}\n`);
    }
  }

  rl.close();
});
