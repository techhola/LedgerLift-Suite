const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: 'LedgerLift Suite',
    icon: path.join(__dirname, 'src', 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'src', 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Load CA Desk by default
  mainWindow.loadFile(path.join(__dirname, 'src', 'cadesk.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Switch between CA Desk and Ledgify
ipcMain.on('switch-app', (event, appName) => {
  if (!mainWindow) return;
  if (appName === 'ledgify') {
    mainWindow.loadFile(path.join(__dirname, 'src', 'ledgify.html'));
    mainWindow.setTitle('Ledgify – SME Accounting');
  } else {
    mainWindow.loadFile(path.join(__dirname, 'src', 'cadesk.html'));
    mainWindow.setTitle('CA Desk – Practice Management');
  }
});

ipcMain.handle('get-version', () => app.getVersion());

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
