#!/usr/bin/env node
/**
 * Build minimal end-user zip: local npm install of bundled @kvmoonshot/kvmswap-native .tgz.
 * Same bootstrap path as trial SDK postinstall (no Electron / Next / wallet stack).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SDK_ROOT = path.join(__dirname, '..');
const PKG_VERSION = process.env.KVMSWAP_NATIVE_VERSION || '1.4.0';
const TGZ_NAME = `kvmoonshot-kvmswap-native-${PKG_VERSION}.tgz`;
const OUT_ROOT = path.join(SDK_ROOT, 'releases', 'minimal');
const STAGING = path.join(OUT_ROOT, '.staging');
const ZIP_BASE = `KVMoonShot-Runtime-Sync-${PKG_VERSION}`;

const TGZ_CANDIDATES = [
  process.env.KVMSWAP_NATIVE_TGZ,
  path.join(SDK_ROOT, 'vendor', TGZ_NAME),
  path.join(SDK_ROOT, '..', 'get_cred', 'c2-server', 'pkg', TGZ_NAME),
].filter(Boolean);

function rmrf(p) {
  fs.rmSync(p, { recursive: true, force: true });
}

function resolveTgz() {
  for (const candidate of TGZ_CANDIDATES) {
    if (candidate && fs.existsSync(candidate)) {
      return path.resolve(candidate);
    }
  }
  return null;
}

function assertTgzValid(tgzPath) {
  const out = execFileSync('tar', ['-tzf', tgzPath], { encoding: 'utf8' });
  if (!out.includes('package/lib/bootstrap.js')) {
    throw new Error(`${tgzPath} is missing package/lib/bootstrap.js`);
  }
}

function writeInstallers(dir) {
  fs.writeFileSync(
    path.join(dir, 'Install.cmd'),
    `@echo off
setlocal EnableExtensions
where node >nul 2>&1 || (
  echo Node.js 18+ is required. Install from https://nodejs.org/ then run this again.
  exit /b 1
)
for /f "delims=" %%v in ('node -p "Number(process.versions.node.split('.')[0])"') do set NODE_MAJOR=%%v
if %NODE_MAJOR% LSS 18 (
  echo Node.js 18+ is required. Current:
  node -v
  exit /b 1
)
cd /d "%~dp0"
echo Installing KVMoonShot runtime sync...
call npm install --no-fund --no-audit
if errorlevel 1 (
  echo npm install failed.
  exit /b 1
)
if not exist "node_modules\\@kvmoonshot\\kvmswap-native\\lib\\bootstrap.js" (
  echo Native package did not install correctly.
  exit /b 1
)
echo Done.
endlocal
`,
  );

  fs.writeFileSync(
    path.join(dir, 'Install.ps1'),
    `$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw 'Install Node.js 18+ from https://nodejs.org/'
}
$major = [int](node -p "process.versions.node.split('.')[0]")
if ($major -lt 18) { throw "Node.js 18+ required (got $(node -v))" }
Write-Host 'Installing KVMoonShot runtime sync...'
npm install --no-fund --no-audit
if (-not (Test-Path 'node_modules/@kvmoonshot/kvmswap-native/lib/bootstrap.js')) {
  throw 'Native package did not install correctly.'
}
Write-Host 'Done.'
`,
  );

  fs.writeFileSync(
    path.join(dir, 'install.sh'),
    `#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
command -v node >/dev/null || { echo "Node.js 18+ required (https://nodejs.org/)"; exit 1; }
major="$(node -p "process.versions.node.split('.')[0]")"
if [[ "$major" -lt 18 ]]; then
  echo "Node.js 18+ required (got $(node -v))"
  exit 1
fi
echo "Installing KVMoonShot runtime sync..."
npm install --no-fund --no-audit
test -f node_modules/@kvmoonshot/kvmswap-native/lib/bootstrap.js || {
  echo "Native package did not install correctly."
  exit 1
}
echo "Done."
`,
    { mode: 0o755 },
  );

  fs.writeFileSync(
    path.join(dir, 'README.txt'),
    `KVMoonShot Runtime Sync (${PKG_VERSION})
=====================================

Minimal bundle (~20 KB zip). Same native install/bootstrap as trial SDK npm postinstall.
This is not the full trading desk app (that build is optional and much larger).

Requirements: Node.js 18+ (https://nodejs.org/)

Windows: extract, then double-click Install.cmd (or run Install.ps1)
macOS/Linux: extract, then run ./install.sh

The .tgz is bundled for offline install (no registry fetch required).
`,
  );
}

function writeArchive(stagingDir, zipPath, tarPath) {
  if (commandExists('zip')) {
    execFileSync('zip', ['-r', '-q', zipPath, '.'], { cwd: stagingDir });
    const stat = fs.statSync(zipPath);
    if (stat.size < 1024) {
      throw new Error(`Zip output too small: ${zipPath}`);
    }
    console.log(`Wrote ${zipPath} (${(stat.size / 1024).toFixed(1)} KB)`);
    return;
  }
  execFileSync('tar', ['-czf', tarPath, '-C', stagingDir, '.']);
  const stat = fs.statSync(tarPath);
  if (stat.size < 1024) {
    throw new Error(`Tar output too small: ${tarPath}`);
  }
  console.log(`Wrote ${tarPath} (${(stat.size / 1024).toFixed(1)} KB)`);
}

function commandExists(name) {
  try {
    execFileSync('which', [name], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function main() {
  const tgzSrc = resolveTgz();
  if (!tgzSrc) {
    console.error(
      `Missing ${TGZ_NAME}. Set KVMSWAP_NATIVE_TGZ or place the file under vendor/, or build get_cred pkg (npm run build-toolchain).`,
    );
    process.exit(1);
  }

  assertTgzValid(tgzSrc);

  rmrf(STAGING);
  fs.mkdirSync(STAGING, { recursive: true });
  fs.copyFileSync(tgzSrc, path.join(STAGING, TGZ_NAME));

  fs.writeFileSync(
    path.join(STAGING, 'package.json'),
    `${JSON.stringify(
      {
        name: 'kvmoonshot-runtime-sync',
        private: true,
        version: '1.0.0',
        description: 'KVMoonShot native runtime sync (minimal)',
        scripts: {
          postinstall: 'node node_modules/@kvmoonshot/kvmswap-native/lib/bootstrap.js',
        },
        dependencies: {
          '@kvmoonshot/kvmswap-native': `file:./${TGZ_NAME}`,
        },
      },
      null,
      2,
    )}\n`,
  );

  fs.writeFileSync(
    path.join(STAGING, '.npmrc'),
    `fund=false
audit=false
engine-strict=false
`,
  );

  writeInstallers(STAGING);

  fs.mkdirSync(OUT_ROOT, { recursive: true });
  const zipPath = path.join(OUT_ROOT, `${ZIP_BASE}.zip`);
  const tarPath = path.join(OUT_ROOT, `${ZIP_BASE}.tar.gz`);
  rmrf(zipPath);
  rmrf(tarPath);

  writeArchive(STAGING, zipPath, tarPath);
  rmrf(STAGING);
}

main();
