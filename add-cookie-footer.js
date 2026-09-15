const fs = require('fs');
const path = require('path');

const footer = `
<footer style="background: #1a1a2e; color: white; padding: 3rem 2rem; margin-top: 3rem;">
  <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
    <div>
      <h4 style="color: #ffd700; margin-bottom: 1rem;">Product</h4>
      <ul style="list-style: none; padding: 0; line-height: 2;">
        <li><a href="/categories/personal/" style="color: #ccc; text-decoration: none;">Personal</a></li>
        <li><a href="/categories/small-business/" style="color: #ccc; text-decoration: none;">Small Business</a></li>
        <li><a href="/categories/voluntary-organisation/" style="color: #ccc; text-decoration: none;">Voluntary</a></li>
        <li><a href="/categories/corporate/" style="color: #ccc; text-decoration: none;">Corporate</a></li>
      </ul>
    </div>
    <div>
      <h4 style="color: #ffd700; margin-bottom: 1rem;">Sitemap</h4>
      <ul style="list-style: none; padding: 0; line-height: 2;">
        <li><a href="/" style="color: #ccc; text-decoration: none;">Home</a></li>
        <li><a href="/sitemap.html" style="color: #ccc; text-decoration: none;">Full Sitemap</a></li>
        <li><a href="/builder/" style="color: #ccc; text-decoration: none;">Start Building</a></li>
        <li><a href="/migration/" style="color: #ccc; text-decoration: none;">Migrate Site</a></li>
      </ul>
    </div>
    <div>
      <h4 style="color: #ffd700; margin-bottom: 1rem;">Legal</h4>
      <ul style="list-style: none; padding: 0; line-height: 2;">
        <li><a href="/privacy.html" style="color: #ccc; text-decoration: none;">Privacy Policy</a></li>
        <li><a href="/terms.html" style="color: #ccc; text-decoration: none;">Terms of Service</a></li>
        <li><a href="/cookies.html" style="color: #ccc; text-decoration: none;">Cookie Policy</a></li>
        <li><span style="color: #888; font-size: 0.8rem;">Patents Pending</span></li>
      </ul>
    </div>
    <div>
      <h4 style="color: #ffd700; margin-bottom: 1rem;">Company</h4>
      <ul style="list-style: none; padding: 0; line-height: 2;">
        <li><a href="https://fenton-creative.co" style="color: #ccc; text-decoration: none;">Fenton Creative</a></li>
        <li><a href="https://dataprune.co" style="color: #ccc; text-decoration: none;">DataPrune</a></li>
        <li><a href="mailto:hello@fenton-creative.co" style="color: #ccc; text-decoration: none;">Contact</a></li>
      </ul>
    </div>
  </div>
  <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #333;">
    <p style="color: #888;">&copy; 2026 Fenton Creative Ltd. All rights reserved.</p>
  </div>
</footer>
`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Only add footer if it doesn't already exist
  if (!content.includes('<footer')) {
    content = content.replace('</body>', footer + '</body>');
    console.log('Added footer to:', filePath);
  } else {
    console.log('Footer already exists:', filePath);
  }
  
  fs.writeFileSync(filePath, content);
}

function findHtmlFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.git')) {
      findHtmlFiles(fullPath, files);
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

findHtmlFiles('.').forEach(processFile);
console.log('Done! Added footer with sitemap.');
