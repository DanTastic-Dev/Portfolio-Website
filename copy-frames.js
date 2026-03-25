const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'sequence');
const destDir = path.join(__dirname, 'public', 'sequence');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  if (file.endsWith('.png')) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    console.log(`Copied ${file}`);
  }
});

console.log('Copy complete');
