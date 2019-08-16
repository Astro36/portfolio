/* eslint no-param-reassign: off, import/no-extraneous-dependencies: off */
const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const Bundler = require('parcel-bundler');

const fsPromises = fs.promises;
const { JSDOM } = jsdom;

const entryFile = path.join(__dirname, './index.html');

const options = {
  outDir: './dist',
  outFile: 'index.html',
  publicUrl: './',
  watch: false,
  cache: true,
  cacheDir: '.cache',
  contentHash: false,
  minify: true,
  scopeHoist: true,
  target: 'browser',
  bundleNodeModules: false,
  logLevel: 3,
  sourceMaps: false,
  detailedReport: false,
  autoInstall: true,
};

const bundler = new Bundler(entryFile, options);

bundler.on('buildStart', async () => {
  const outDir = path.join(__dirname, options.outDir);
  if (fs.existsSync(outDir)) {
    const outFiles = await fsPromises.readdir(outDir);
    outFiles.forEach(async (outFile) => {
      await fsPromises.unlink(path.join(outDir, outFile));
    });
  }
});

bundler.on('buildEnd', async () => {
  const outFile = path.join(__dirname, options.outDir, options.outFile);
  const html = await fsPromises.readFile(outFile);
  const { window } = new JSDOM(html.toString());
  const { document } = window;
  document.querySelectorAll('img.lazy')
    .forEach((image) => {
      image.dataset.src = image.src;
      image.removeAttribute('src');
    });
  await fsPromises.writeFile(outFile, document.documentElement.outerHTML);
});

bundler.bundle();
