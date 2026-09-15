const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Find the Sitemap link and add Showcase before it
const updated = content.replace(
  '<li><a href="/sitemap.html">Full Sitemap</a></li>',
  '<li><a href="/showcase/">Showcase</a></li>\n                    <li><a href="/sitemap.html">Full Sitemap</a></li>'
);

fs.writeFileSync('index.html', updated);
console.log('Showcase link added');
