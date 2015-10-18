'use strict'

let spawn = require('child_process').spawn

function showInExplorer (path) {
  let launcher = null
  if (process.platform === 'win32') {
    launcher = 'explorer'
  } else if (process.platform === 'linux') {
    let session = process.env['DESKTOP_SESSION']
    if (session === 'gnome') {
      launcher = 'nautilus'
    }
  } else if (process.platform === 'darwin') {
    launcher = 'open'
  }

  if (!launcher) throw new Error('No launcher available for this platform')

  spawn(launcher, [path])
}

module.exports = showInExplorer
