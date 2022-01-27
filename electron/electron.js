const path = require('path')
const { app, BrowserWindow, globalShortcut } = require('electron')
const storage = require('electron-json-storage')
const prompt = require('electron-prompt')

console.log(`storage path: ${storage.getDataPath()}`)
const storedUrl = storage.getSync('url')
console.log(`stored url: ${storedUrl}`)

const isDev = process.env.IS_DEV == 'true' ? true : false

let url = isDev
    ? 'http://localhost:3001'
    : `file://${path.join(__dirname, '../dist/index.html')}`

if (Object.keys(storedUrl).length > 0) {
    url = storedUrl
}

let mainWindow
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        // fullscreen: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        },
    })

    // and load the index.html of the app.
    // win.loadFile("index.html");

    mainWindow.loadURL(url)
    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools()
    }
    if (Object.keys(storedUrl).length == 0) {
	    console.log('prompting url input')
        prompt({
            title: 'Umfrage URL eintragen',
            label: 'URL:',
            value: 'https://evatool.twoavy.com/#/?survey=',
            inputAttrs: {
                type: 'url',
            },
            type: 'input',
        })
            .then((r) => {
                if (r) {
                    console.log(`setting new url: ${r}`)
                    storage.set('url', r)
                    mainWindow.loadURL(r)
                }
            })
            .catch(console.error)
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    globalShortcut.register('Alt+CommandOrControl+O', () => {
        prompt({
            title: 'Umfrage URL eintragen',
            label: 'URL:',
            value: 'https://evatool.twoavy.com/#/?survey=',
            inputAttrs: {
                type: 'url',
            },
            type: 'input',
        })
            .then((r) => {
                if (r) {
                    console.log(`setting new url: ${r}`)
                    storage.set('url', r)
                    mainWindow.loadURL(r)
                }
            })
            .catch(console.error)
    })
    createWindow()
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
