const fs = require('fs');
const path = require('path');

// Refined header - yellow only on logo and CTA
const newHeader = `
<header style="background: #1a1a2e; padding: 1rem 2rem; position: sticky; top: 0; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">
  <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <a href="/" style="text-decoration: none;">
        <span style="color: #ffd700; font-size: 1.5rem; font-weight: bold;">FENTON FORGE™</span>
      </a>
    </div>
    <nav style="display: flex; gap: 2rem; align-items: center;">
      <a href="/" style="color: #ccc; text-decoration: none; font-weight: 500;">Home</a>
      <a href="/categories/personal/" style="color: #ccc; text-decoration: none;">Personal</a>
      <a href="/categories/small-business/" style="color: #ccc; text-decoration: none;">Small Business</a>
      <a href="/categories/voluntary-organisation/" style="color: #ccc; text-decoration: none;">Voluntary</a>
      <a href="/categories/corporate/" style="color: #ccc; text-decoration: none;">Corporate</a>
      <a href="/builder/" style="background: #ffd700; color: #1a1a2e; padding: 0.5rem 1rem; text-decoration: none; font-weight: bold; border-radius: 4px;">Start Building</a>
    </nav>
  </div>
</header>
`;

// Refined footer - white links, subtle hover
const newFooter = `
<footer style="background: #1a1a2e; color: #ccc; padding: 2rem; margin-top: 3rem; border-top: 1px solid #333;">
  <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
    <div>
      <h4 style="color: #ffd700; margin-bottom: 1rem;">Product</h4>
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li style="margin-bottom: 0.5rem;"><a href="/" style="color: #ccc; text-decoration: none;">Home</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="/categories/personal/" style="color: #ccc; text-decoration: none;">Personal</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="/categories/small-business/" style="color: #ccc; text-decoration: none;">Small Business</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="/categories/voluntary-organisation/" style="color: #ccc; text-decoration: none;">Voluntary</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="/categories/corporate/" style="color: #ccc; text-decoration: none;">Corporate</a></li>
      </ul>
    </div>
    <div>
      <h4 style="color: #ffd700; margin-bottom: 1rem;">Company</h4>
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li style="margin-bottom: 0.5rem;"><a href="https://fenton-creative.co" style="color: #ccc; text-decoration: none;">Fenton Creative</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="https://dataprune.co" style="color: #ccc; text-decoration: none;">DataPrune</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="/csr.html" style="color: #ccc; text-decoration: none;">CSR Policy</a></li>
      </ul>
    </div>
    <div>
      <h4 style="color: #ffd700; margin-bottom: 1rem;">Legal</h4>
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li style="margin-bottom: 0.5rem;"><a href="/privacy.html" style="color: #ccc; text-decoration: none;">Privacy Policy</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="/terms.html" style="color: #ccc; text-decoration: none;">Terms of Service</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="/cookies.html" style="color: #ccc; text-decoration: none;">Cookie Policy</a></li>
        <li style="font-size: 0.75rem; color: #666; margin-top: 1rem;">Patents Pending: GB2620950.2, GB2619170.0, GB2619136.1, GB2619169.2</li>
      </ul>
    </div>
  </div>
  <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #333;">
    <p style="margin: 0; color: #888;">&copy; 2026 Fenton Creative Ltd. All rights reserved.</p>
    <p style="font-size: 0.8rem; color: #666; margin-top: 0.5rem;">Powered by AEGIS™ Architecture | SecureBridge™ Protected</p>
  </div>
</footer>
`;

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

const htmlFiles = findHtmlFiles('.');
htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace header
  content = content.replace(/<header[\s\S]*?<\/header>/, newHeader);
  
  // Replace footer
  content = content.replace(/<footer[\s\S]*?<\/footer>/, newFooter);
  
  fs.writeFileSync(file, content);
  console.log('Updated:', file);
});

console.log('Done! Refined styling on', htmlFiles.length, 'pages');
