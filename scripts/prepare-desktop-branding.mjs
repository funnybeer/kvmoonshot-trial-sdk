#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolveAssetsRoot } from './lib/paths.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SDK = path.join(__dirname, '..');
const ASSETS = resolveAssetsRoot(SDK);
const BUILD = path.join(SDK, 'desktop', 'build');
const INSTALL = path.join(SDK, 'desktop', 'install');

const ICON_SRC = path.join(ASSETS, 'KV Moonshot silver lunar emblem-2.png');
const BG_SRC = path.join(ASSETS, 'KV-Moonshot-Layered-Page-Designs', 'assets', 'backgrounds', 'hangar.png');

function copy(src, dest) {
  if (!fs.existsSync(src)) throw new Error(`Missing asset: ${src}`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

copy(ICON_SRC, path.join(BUILD, 'icon.png'));
copy(BG_SRC, path.join(INSTALL, 'install-bg.png'));
console.log('[prepare-desktop-branding] icon + install background ready');
