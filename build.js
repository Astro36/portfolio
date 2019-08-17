/* eslint-disable no-param-reassign, import/no-extraneous-dependencies */
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
  const dom = new JSDOM(html.toString());
  const { window: { document } } = dom;

  // Lazy Loading
  document.querySelectorAll('img.lazy')
    .forEach((image) => {
      image.dataset.src = image.src;
      image.removeAttribute('src');
    });

  // Time
  const now = new Date().toISOString().slice(0, 10);
  document.querySelectorAll('time[datetime="now"]')
    .forEach((time) => {
      time.setAttribute('datetime', now);
    });

  await fsPromises.writeFile(outFile, dom.serialize());
});

bundler.bundle();
