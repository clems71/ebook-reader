'use strict'

let co = require('co')
let fs = require('co-fs')
let path = require('path')

function _isBook (path) {
  return path.endsWith('.epub') || path.endsWith('.pdf')
}

class Shelf {
  constructor (path) {
    this._path = path
    this._cwd = path
  }

  list () {
    let self = this
    return co(function * () {
      let files = yield fs.readdir(self._cwd)
      let res = []
      for (let file of files) {
        let isDir = (yield fs.stat(self._cwd + '/' + file)).isDirectory()
        if (!isDir && !_isBook(file)) continue
        res.push({
          name: file,
          dir: isDir
        })
      }
      console.log(res)
      return res
    })
  }

  cwd () {
    return this._cwd
  }

  cd (dir) {
    if (!dir) {
      this._cwd = this._path
    } else {
      this._cwd = this._cwd + '/' + dir
    }
  }

  back () {
    this._cwd = path.dirname(this._cwd)
    if (this._cwd.length < this._path.length) this._cwd = this._path
  }
}

module.exports = Shelf

function homeDir () {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
}

let shelfTest = new Shelf(homeDir() + '/Books')
shelfTest.cd('3D Graphics')
shelfTest.list()
