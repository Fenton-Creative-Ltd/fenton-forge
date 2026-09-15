const fs = require('fs');
const path = require('path');

const header = `
<header style="background: #1a1a2e; padding: 1rem 2rem; position: sticky; top: 0; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">
  <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
    <div style="display: flex; align-items: center; gap: 1rem;">
      <a href="/" style="text-decoration: none;">
        <span style="color: #ffd700; font-size: 1.5rem; font-weight: bold;">FENTON FORGE™</span>
      </a>
    </div>
    <nav style="display: flex; gap: 2rem; align-items: center;">
      <a href="/" style="color: white; text-decoration: none; font-weight: 500;">Home</a>
      <a href="/categories/personal/" style="color: white; text-decoration: none;">Personal</a>
      <a href="/categories/small-business/" style="color: white; text-decoration: none;">Small Business</a>
      <a href="/categories/voluntary-organisation/" style="color: white; text-decoration: none;">Voluntary</a>
      <a href="/categories/corporate/" style="color: white; text-decoration: none;">Corporate</a>
      <a href="/builder/" style="background: #ffd700; color: #1a1a2e; padding: 0.5rem 1rem; text-decoration: none; font-weight: bold; border-radius: 4px;">Start Building</a>
    </nav>
  </div>
</header>
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
  
  // Add header after <body> tag
  content = content.replace(/<body[^>]*>/, match => match + header);
  
  fs.writeFileSync(file, content);
  console.log('Added header to:', file);
});

console.log('Done! Added headers to', htmlFiles.length, 'pages');
