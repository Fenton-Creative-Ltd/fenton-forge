const fs = require('fs');

const newFooter = `
<footer style="background: #1a1a2e; color: white; padding: 2rem; margin-top: 3rem;">
  <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
    <div>
      <h4>Product</h4>
      <ul style="list-style: none; padding: 0;">
        <li><a href="/" style="color: #ffd700; text-decoration: none;">Home</a></li>
        <li><a href="/categories/personal/" style="color: white; text-decoration: none;">Personal</a></li>
        <li><a href="/categories/small-business/" style="color: white; text-decoration: none;">Small Business</a></li>
        <li><a href="/categories/voluntary-organisation/" style="color: white; text-decoration: none;">Voluntary</a></li>
        <li><a href="/categories/corporate/" style="color: white; text-decoration: none;">Corporate</a></li>
      </ul>
    </div>
    <div>
      <h4>Company</h4>
      <ul style="list-style: none; padding: 0;">
        <li><a href="https://fenton-creative.co" style="color: #ffd700; text-decoration: none;">Fenton Creative</a></li>
        <li><a href="https://dataprune.co" style="color: #ffd700; text-decoration: none;">DataPrune</a></li>
        <li><a href="/csr.html" style="color: white; text-decoration: none;">CSR Policy</a></li>
      </ul>
    </div>
    <div>
      <h4>Legal</h4>
      <ul style="list-style: none; padding: 0;">
        <li><a href="/privacy.html" style="color: #ffd700; text-decoration: none;">Privacy Policy</a></li>
        <li><a href="/terms.html" style="color: #ffd700; text-decoration: none;">Terms of Service</a></li>
        <li><a href="/cookies.html" style="color: #ffd700; text-decoration: none;">Cookie Policy</a></li>
        <li><span style="font-size: 0.8rem; color: #888;">Patents: GB2620950.2, GB2619170.0, GB2619136.1, GB2619169.2</span></li>
      </ul>
    </div>
  </div>
  <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #333;">
    <p>&copy; 2026 Fenton Creative Ltd. All rights reserved.</p>
    <p style="font-size: 0.8rem; color: #888;">Powered by AEGIS™ Architecture | SecureBridge™ Protected</p>
  </div>
</footer>
`;

// Find and replace footer in all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Replace old footer with new one
  content = content.replace(/<footer[\s\S]*?<\/footer>/, newFooter);
  fs.writeFileSync(file, content);
  console.log('Updated:', file);
});
