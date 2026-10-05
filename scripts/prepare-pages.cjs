const fs = require('node:fs');
const path = require('node:path');

// Pages serves this directory under base_path already. Vinext also nests
// prefixed assets on disk, so move them back to the artifact root.
const root = path.resolve('dist/client');
const prefix = (process.env.PAGES_BASE_PATH || '').replace(/^\/+|\/+$/g, '');
if (prefix) {
  const nestedAssets = path.join(root, prefix, '_next');
  if (!fs.existsSync(nestedAssets)) throw new Error(`Missing assets: ${nestedAssets}`);
  fs.renameSync(nestedAssets, path.join(root, '_next'));
}
if (!fs.existsSync(path.join(root, 'index.html'))) throw new Error('Missing static game page');
fs.writeFileSync(path.join(root, '.nojekyll'), '');
