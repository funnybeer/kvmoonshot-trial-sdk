'use strict';

const { app, BrowserWindow, shell } = require('electron');
const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

const DESKTOP_PORT = Number(process.env.KVMSWOT_DESK_PORT || 3847);
const START_TIMEOUT_MS = 120_000;

/** @type {import('child_process').ChildProcess | null} */
let nextProc = null;

function sdkRoot() {
  return path.join(__dirname, '..');
}

function nextBin(root) {
  return path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next');
}

function ensureProductionBuild(root) {
  const nextDir = path.join(root, '.next');
  if (!fs.existsSync(nextDir)) {
    throw new Error(
      'Missing .next build. Run "npm run build" before packaging the desktop app.',
    );
  }
}

function waitForHttp(url, timeoutMs) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(url, (res) => {
        res.resume();
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 500) {
          resolve();
          return;
        }
        retry();
      });
      req.on('error', retry);
      req.setTimeout(2_000, () => {
        req.destroy();
        retry();
      });
    };
    const retry = () => {
      if (Date.now() - started > timeoutMs) {
        reject(new Error(`Timed out waiting for ${url}`));
        return;
      }
      setTimeout(tick, 350);
    };
    tick();
  });
}

function startNextServer(root) {
  ensureProductionBuild(root);
  const bin = nextBin(root);
  if (!fs.existsSync(bin)) {
    throw new Error('Next.js is not installed in the packaged SDK tree.');
  }

  nextProc = spawn(process.execPath, [bin, 'start', '-p', String(DESKTOP_PORT)], {
    cwd: root,
    env: {
      ...process.env,
      ELECTRON_RUN_AS_NODE: '1',
      NODE_ENV: 'production',
      PORT: String(DESKTOP_PORT),
    },
    stdio: 'inherit',
    windowsHide: true,
  });

  nextProc.on('exit', (code, signal) => {
    if (code !== null && code !== 0) {
      console.error(`Next server exited: code=${code} signal=${signal}`);
    }
    nextProc = null;
  });

  return waitForHttp(`http://127.0.0.1:${DESKTOP_PORT}/`, START_TIMEOUT_MS);
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 960,
    minHeight: 640,
    title: 'KVMoonShot Desk',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.loadURL(`http://127.0.0.1:${DESKTOP_PORT}/`);

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

function stopNextServer() {
  if (nextProc && !nextProc.killed) {
    nextProc.kill('SIGTERM');
  }
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    const [win] = BrowserWindow.getAllWindows();
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app.whenReady().then(async () => {
    const root = sdkRoot();
    try {
      await startNextServer(root);
      createWindow();
    } catch (err) {
      console.error(err);
      app.exit(1);
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      stopNextServer();
      app.quit();
    }
  });

  app.on('before-quit', () => {
    stopNextServer();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}
