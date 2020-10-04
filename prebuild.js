const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

/** @async */
const listDirents = (dir) => fsPromises.readdir(dir, { withFileTypes: true });

/** @async */
const copyFiles = (srcDir, destDir) => listDirents(srcDir)
  .then((dirents) => Promise.all(dirents
    .map((dirent) => dirent.name)
    .map((file) => fsPromises.copyFile(path.join(srcDir, file), path.join(destDir, file)))));

(async () => {
  const distDir = path.join(__dirname, 'dist');

  // Remove bundle files
  if (fs.existsSync(distDir)) {
    const distDirents = await listDirents(distDir);
    await Promise.all(distDirents
      .filter((distDirent) => distDirent.isFile())
      .map((distDirent) => fsPromises.unlink(path.join(distDir, distDirent.name))));
  } else {
    await fsPromises.mkdir(distDir);
  }

  // Copy old files
  const oldDir = path.join(__dirname, 'old');
  if (fs.existsSync(oldDir)) {
    const versionDirents = await listDirents(oldDir);
    versionDirents
      .map((versionDirent) => versionDirent.name)
      .forEach(async (versionDir) => {
        const distVersionDir = path.join(distDir, versionDir);
        if (!fs.existsSync(distVersionDir)) {
          await fsPromises.mkdir(distVersionDir);
          await copyFiles(path.join(oldDir, versionDir), distVersionDir);
        }
      });
  }

  // Create CNAME
  await fsPromises.writeFile(path.join(distDir, 'CNAME'), 'astro36.me');
})();
