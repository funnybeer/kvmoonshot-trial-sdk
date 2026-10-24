'use strict';
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('installApi', {
  cancel: () => ipcRenderer.send('install:cancel'),
  launch: () => ipcRenderer.send('install:launch'),
  showLogin: () => ipcRenderer.send('install:show-login'),
  tryAuth: (payload) => ipcRenderer.invoke('login:attempt', payload),
});
