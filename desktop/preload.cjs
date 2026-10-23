'use strict';

const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('kvmoonshotDesk', {
  version: 'desktop-1.0.0',
});
