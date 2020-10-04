const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

(async () => {
  const distDir = path.join(__dirname, 'dist');
  const entryFile = path.join(distDir, 'index.html');

  let html = await fsPromises.readFile(entryFile);
  html = html.toString();

  // Lazy Loading
  html = html.replace(/lazy" src="([^"]+)"/g, 'lazy" data-src="$1"');

  // Time
  const now = new Date().toISOString().slice(0, 10);
  html = html.replace(/<time datetime="now"><\/time>/g, `<time datetime="${now}">${now}</time>`);
  html = html.replace(/datetime="now"/g, `datetime="${now}"`);

  await fsPromises.writeFile(entryFile, html);
})();
