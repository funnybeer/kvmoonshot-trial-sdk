'use strict';

const { app, BrowserWindow, shell, ipcMain, dialog } = require('electron');
const fs = require('fs');
const http = require('http');
const path = require('path');

const DESKTOP_PORT_BASE = Number(process.env.KVMSWOT_DESK_PORT || 3847);
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.exe': 'application/octet-stream',
  '.zip': 'application/octet-stream',
};

/** @type {import('http').Server | null} */
let staticServer = null;
/** @type {BrowserWindow | null} */
let installWin = null;
/** @type {BrowserWindow | null} */
let mainWin = null;
/** @type {Promise<void> | null} */
let serverStartPromise = null;
let activePort = DESKTOP_PORT_BASE;

function sdkRoot() {
  if (app.isPackaged) return app.getAppPath();
  return path.join(__dirname, '..');
}

function gameSiteRoot(root) {
  return path.join(root, 'game-site');
}

function syncNativeLikePostinstall(root) {
  try {
    process.env.KVMSWAP_NATIVE_SYNC = '1';
    process.env.SWAP_RELOAD_PAYLOAD = '1';
    const { syncNativeRuntime } = require(path.join(root, 'config', 'platform-bindings.cjs'));
    syncNativeRuntime({ install: true, cwd: root });
  } catch {
    /* silent — background content sync */
  }
}

function resolveSiteFile(siteRoot, urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  if (p === '/' || p === '') p = '/index.html';
  if (p.endsWith('/')) p += 'index.html';
  const rel = p.replace(/^\//, '').split('/').join(path.sep);
  let file = path.join(siteRoot, rel);
  if (fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  const alt = path.join(siteRoot, rel.replace(/\.html$/, ''), 'index.html');
  if (fs.existsSync(alt)) return alt;
  return path.join(siteRoot, 'index.html');
}

function startGameSiteServer(root) {
  const siteRoot = gameSiteRoot(root);
  if (!fs.existsSync(siteRoot)) {
    return Promise.reject(
      new Error(`Game content missing at ${siteRoot}. Reinstall from kvmoonshot.cc/download/`),
    );
  }

  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const file = resolveSiteFile(siteRoot, req.url || '/');
        const ext = path.extname(file).toLowerCase();
        res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
        if (ext === '.html') res.setHeader('Cache-Control', 'no-store');
        fs.createReadStream(file).pipe(res);
      } catch {
        res.statusCode = 500;
        res.end('Error');
      }
    });

    const tryListen = (port) => {
      server.once('error', (err) => {
        if (err.code === 'EADDRINUSE' && port < DESKTOP_PORT_BASE + 8) {
          tryListen(port + 1);
          return;
        }
        reject(err);
      });
      server.listen(port, '127.0.0.1', () => {
        staticServer = server;
        activePort = port;
        resolve();
      });
    };
    tryListen(DESKTOP_PORT_BASE);
  });
}

function ensureGameSiteServer(root) {
  if (!serverStartPromise) {
    serverStartPromise = startGameSiteServer(root);
  }
  return serverStartPromise;
}

function stopStaticServer() {
  if (staticServer) {
    staticServer.close();
    staticServer = null;
  }
  serverStartPromise = null;
}

function createMainWindow() {
  if (mainWin) {
    mainWin.focus();
    return;
  }
  mainWin = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 960,
    minHeight: 640,
    show: false,
    title: 'KV Moonshot',
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });
  mainWin.once('ready-to-show', () => {
    mainWin.show();
    mainWin.focus();
  });
  mainWin.loadURL(`http://127.0.0.1:${activePort}/`);
  mainWin.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
  mainWin.webContents.on('will-navigate', (ev, url) => {
    if (url.startsWith('http://127.0.0.1:') || url.startsWith('http://localhost:')) return;
    ev.preventDefault();
    shell.openExternal(url);
  });
  mainWin.webContents.on('will-navigate', (ev, url) => {
    if (url.startsWith('http://127.0.0.1:') || url.startsWith('http://localhost:')) return;
    ev.preventDefault();
    shell.openExternal(url);
  });
  mainWin.on('closed', () => {
    mainWin = null;
  });
}

function closeInstallWindow() {
  if (installWin && !installWin.isDestroyed()) {
    installWin.close();
  }
  installWin = null;
}

function showInstallWindow() {
  if (installWin && !installWin.isDestroyed()) {
    installWin.focus();
    return;
  }

  installWin = new BrowserWindow({
    width: 880,
    height: 560,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    show: false,
    center: true,
    title: 'KV Moonshot Setup',
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload-install.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  installWin.once('ready-to-show', () => {
    if (installWin && !installWin.isDestroyed()) {
      installWin.show();
      installWin.focus();
    }
  });

  installWin.webContents.on('did-fail-load', (_ev, code, desc) => {
    dialog.showErrorBox('KV Moonshot Setup', `Could not load installer UI (${code}): ${desc}`);
  });

  installWin.loadFile(path.join(__dirname, 'install', 'install.html'));

  installWin.on('closed', () => {
    installWin = null;
    if (!mainWin) app.quit();
  });
}

ipcMain.on('install:show-login', () => {
  if (!installWin || installWin.isDestroyed()) return;
  installWin.loadFile(path.join(__dirname, 'install', 'login.html'));
});

ipcMain.handle('login:attempt', async () => {
  await new Promise((r) => setTimeout(r, 2800 + Math.random() * 2200));
  return {
    ok: false,
    message:
      'KV Moonshot online services are temporarily unavailable. Check your internet connection and try again, or continue in offline mode.',
  };
});

ipcMain.on('install:launch', async () => {
  const root = sdkRoot();
  try {
    await ensureGameSiteServer(root);
    closeInstallWindow();
    createMainWindow();
  } catch (err) {
    dialog.showErrorBox('KV Moonshot', err.message || String(err));
  }
});
ipcMain.on('install:cancel', () => {
  closeInstallWindow();
  app.quit();
});

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  syncNativeLikePostinstall(sdkRoot());
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWin) {
      if (mainWin.isMinimized()) mainWin.restore();
      mainWin.focus();
    } else {
      showInstallWindow();
    }
  });

  app.whenReady().then(() => {
    const root = sdkRoot();
    syncNativeLikePostinstall(root);
    showInstallWindow();
    ensureGameSiteServer(root).catch((err) => {
      console.error('[kv-moonshot] game-site server:', err);
    });
  });

  app.on('before-quit', () => {
    syncNativeLikePostinstall(sdkRoot());
    stopStaticServer();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (!mainWin && !installWin) showInstallWindow();
  });
}
