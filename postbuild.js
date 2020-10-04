const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

(async () => {
  const distDir = path.join(__dirname, 'dist');
  const htmlFile = path.join(distDir, 'index.html');

  let html = await fsPromises.readFile(htmlFile);
  html = html.toString();

  // Lazy Loading
  html = html.replace(/lazy" src="([^"]+)"/g, 'lazy" data-src="$1"');

  // Time
  const now = new Date().toISOString().slice(0, 10);
  html = html.replace(/<time datetime="now"><\/time>/g, `<time datetime="${now}">${now}</time>`);
  html = html.replace(/datetime="now"/g, `datetime="${now}"`);

  await fsPromises.writeFile(htmlFile, html);

  const manifestFile = path.join(distDir, 'manifest.webmanifest');
  const manifest = JSON.parse(await fsPromises.readFile(manifestFile));

  const distFiles = await fsPromises.readdir(distDir);
  manifest.icons.forEach((icon) => {
    icon.src = distFiles.find((file) => file.startsWith(path.parse(icon.src).name));
  });

  await fsPromises.writeFile(manifestFile, JSON.stringify(manifest));
})();
