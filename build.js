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
  // Remove build files
  const outDir = path.join(__dirname, options.outDir);
  if (fs.existsSync(outDir)) {
    const outFiles = await fsPromises.readdir(outDir, { withFileTypes: true });
    await Promise.all(outFiles
      .filter((outFile) => outFile.isFile())
      .map((outFile) => fsPromises.unlink(path.join(outDir, outFile.name))));
  } else {
    fsPromises.mkdir(outDir);
  }

  // Copy old files
  const oldDir = path.join(__dirname, 'old');
  if (fs.existsSync(oldDir)) {
    const verDirs = await fsPromises.readdir(oldDir);
    verDirs.forEach(async (verDir) => {
      const oldVerDir = path.join(oldDir, verDir);
      const outVerDir = path.join(outDir, verDir);
      const resFiles = await fsPromises.readdir(oldVerDir);
      if (!fs.existsSync(outVerDir)) {
        await fsPromises.mkdir(path.join(outVerDir));
        await Promise.all(resFiles
          .map((resFile) => fsPromises
            .copyFile(path.join(oldVerDir, resFile), path.join(outVerDir, resFile))));
      }
    });
  }

  // Create CNAME
  await fsPromises.writeFile(path.join(outDir, 'CNAME'), 'astro36.me');
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
      if (!time.textContent) {
        time.textContent = now;
      }
    });

  await fsPromises.writeFile(outFile, dom.serialize());
});

bundler.bundle();
