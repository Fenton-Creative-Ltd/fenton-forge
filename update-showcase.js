const fs = require('fs');
let content = fs.readFileSync('showcase/index.html', 'utf8');

// Replace emoji placeholders with image URLs
const images = [
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', // bakery/food
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', // office/law
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800', // design/creative
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800', // pet
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800', // nonprofit/charity
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800'  // blog/tech
];

let imgIndex = 0;
content = content.replace(/<div class="showcase-img">[^<]+<\/div>/g, (match) => {
  const img = `<div class="showcase-img" style="background: url('${images[imgIndex]}') center/cover no-repeat;"></div>`;
  imgIndex = (imgIndex + 1) % images.length;
  return img;
});

fs.writeFileSync('showcase/index.html', content);
console.log('Showcase updated with real images');
