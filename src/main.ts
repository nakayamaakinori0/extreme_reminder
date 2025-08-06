import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Remove menu bar
  mainWindow.setMenuBarVisibility(false);
  
  // Open DevTools only in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers for notification management
ipcMain.handle('show-notification', () => {
  if (mainWindow) {
    // 全画面表示
    mainWindow.setFullScreen(true);
    // 最前面に固定
    mainWindow.setAlwaysOnTop(true, 'screen-saver');
    // フォーカスを強制
    mainWindow.focus();
    mainWindow.show();
  }
});

ipcMain.handle('hide-notification', () => {
  if (mainWindow) {
    // 全画面解除
    mainWindow.setFullScreen(false);
    // 最前面固定を解除
    mainWindow.setAlwaysOnTop(false);
    // 元のサイズに戻す
    mainWindow.setSize(400, 300);
    mainWindow.center();
  }
});
