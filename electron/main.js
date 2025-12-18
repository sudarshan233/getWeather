const { app, BrowserWindow } = require("electron");
const path = require("path");

// Start backend (compiled JS)
require("../backend/dist/index.js");
console.log("Electron main process started");


function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            contextIsolation: true
        }
    });
    win.webContents.openDevTools();
    setTimeout(() => {
        win.loadFile(
            path.join(__dirname, "../frontend/dist/index.html")
        );
    }, 800);
}

app.whenReady().then(createWindow);
