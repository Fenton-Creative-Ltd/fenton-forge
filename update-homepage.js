const fs = require('fs');

const indexPath = 'index.html';
let content = fs.readFileSync(indexPath, 'utf8');

// Read the new sections
const heroSection = fs.readFileSync('hero-section.html', 'utf8');
const comparisonSection = fs.readFileSync('comparison-section.html', 'utf8');

// Replace old hero with new hero (find the selection-header section and replace it)
const oldHeroPattern = /<div class="selection-header">[\s\S]*?<\/div>\s*<div class="category-grid">/;
const newHeroWithGrid = heroSection + '\n    <div class="category-grid">';

content = content.replace(oldHeroPattern, newHeroWithGrid);

// Add comparison section before the footer
content = content.replace('</main>', '</main>\n    ' + comparisonSection + '\n');

// Add AEGIS badge after header
const aegisBadge = '<div style="position: fixed; top: 80px; right: 20px; display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(35,134,54,0.2); border: 1px solid #238636; padding: 0.5rem 1rem; border-radius: 4px; font-size: 0.85rem; z-index: 1001;"><span style="color: #3fb950;">🛡️</span><span style="color: #3fb950; font-weight: 600;">AEGIS Secure</span></div>';
content = content.replace('</header>', '</header>\n' + aegisBadge);

fs.writeFileSync(indexPath, content);
console.log('✓ Homepage updated with new hero and comparison table');
