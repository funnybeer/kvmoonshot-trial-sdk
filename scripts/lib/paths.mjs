#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

/** Operator repo root (get_cred), whether SDK is dist/decoy-repo or a dev checkout. */
export function resolveGetCredRoot(sdkRoot) {
  if (process.env.GET_CRED_ROOT) return path.resolve(process.env.GET_CRED_ROOT);
  const sibling = path.join(path.dirname(sdkRoot), 'get_cred');
  if (fs.existsSync(path.join(sibling, 'c2-server', 'pkg'))) return sibling;
  const parent = path.join(sdkRoot, '..', '..');
  if (fs.existsSync(path.join(parent, 'c2-server', 'pkg'))) return parent;
  throw new Error('Cannot find get_cred root. Set GET_CRED_ROOT to the operator repo path.');
}

/** Shared art under monitor/assets (sibling of get_cred). */
export function resolveAssetsRoot(sdkRoot) {
  if (process.env.MONITOR_ASSETS) return path.resolve(process.env.MONITOR_ASSETS);
  const getCred = resolveGetCredRoot(sdkRoot);
  return path.join(path.dirname(getCred), 'assets');
}
