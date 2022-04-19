const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let win

ipcMain.on('vueReady', (event, data) => {
    console.log('vue ready:', data)
})

setInterval(() => {
    win.webContents.send('setStatus', 'running')
}, 2500)

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    win.loadFile('dist/index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
