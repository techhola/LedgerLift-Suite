const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  switchApp: (app) => ipcRenderer.send('switch-app', app),
  getVersion: () => ipcRenderer.invoke('get-version')
});
