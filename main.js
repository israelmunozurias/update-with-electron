const { app, BrowserWindow, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");

let mainWindow;

app.on("ready", () => {
  createWindow();
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadFile("index.html");
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  autoUpdater.checkForUpdatesAndNotify(); // Revisa si hay actualizaciones
}
/* *********************Update Automatic********************* */
autoUpdater.on("update-available", () => {
  mainWindow.webContents.send("update_available");
});

autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("update_downloaded");
});

ipcMain.on("restart_app", () => {
  autoUpdater.quitAndInstall();
});
/* *********************Update Automatic********************* */
