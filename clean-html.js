const fs = require('fs');
const path = require('path');

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

function cleanFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove cookie banner divs (multiple patterns)
  content = content.replace(/<div id="cookie-banner"[\s\S]*?<\/div>\s*<script[^>]*>[\s\S]*?<\/script>/g, '');
  content = content.replace(/<div id="cookie-banner"[\s\S]*?<\/div>/g, '');
  
  // Remove inline cookie scripts
  content = content.replace(/<script>function acceptCookies[\s\S]*?<\/script>/g, '');
  
  // Remove external cookie script
  content = content.replace(/<script src="\/js\/cookie-banner\.js"><\/script>/g, '');
  
  // Remove footer
  content = content.replace(/<footer[\s\S]*?<\/footer>/g, '');
  
  fs.writeFileSync(filePath, content);
  console.log('Cleaned:', filePath);
}

const files = findHtmlFiles('.');
files.forEach(cleanFile);
console.log('Done! Cleaned', files.length, 'files');
