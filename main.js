'use strict'

let app = require('app')  // Module to control application life.
let BrowserWindow = require('browser-window')  // Module to create native browser window.

// Report crashes to our server.
// require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
let mainWindow = null

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit()
})

app.commandLine.appendSwitch('js-flags', '--es_staging')
// app.commandLine.appendSwitch('js-flags', '--harmony_arrow_functions');

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    title: 'Electron eBook Reader',
    'auto-hide-menu-bar': true
  })

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index_pdf.html')

  // Open the devtools.
  // mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
})
