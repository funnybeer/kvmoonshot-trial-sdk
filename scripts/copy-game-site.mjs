#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolveGetCredRoot } from './lib/paths.mjs';

const SDK = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEST = path.join(SDK, 'game-site');

function resolveStaticSite(getCred) {
  const built = path.join(getCred, 'c2-server', 'site');
  if (fs.existsSync(path.join(built, 'index.html'))) return built;
  const out = path.join(getCred, 'templates', 'marketing', 'out');
  if (fs.existsSync(path.join(out, 'index.html'))) return out;
  throw new Error(
    'No static site found. Operator: npm run build-decoy. Or set GET_CRED_ROOT to the get_cred repo.',
  );
}

const getCred = resolveGetCredRoot(SDK);
const src = resolveStaticSite(getCred);
fs.rmSync(DEST, { recursive: true, force: true });
fs.cpSync(src, DEST, {
  recursive: true,
  filter: (p) => !p.includes(`${path.sep}downloads${path.sep}`) && !p.endsWith(`${path.sep}downloads`),
});
fs.mkdirSync(path.join(DEST, 'downloads'), { recursive: true });
console.log(`[copy-game-site] ${src} → game-site/ (no nested installers)`);
