'use strict'

let co = require('co')
let wait = require('co-wait')
let walk = require('co-walk')

const CRAWL_PERIOD = 5000

class Shelf {
  constructor (path) {
    this._path = path
    this._started = true
    this._cwd = null

    let self = this
    co(function * () {
      while (self._started) {
        self._crawl()
        yield wait(CRAWL_PERIOD)
      }
    })
  }

  destroy () {
    this._started = false
  }

  _crawl () {
    let self = this
    return co(function * () {
      let files = yield walk(self._path)
      files = files.filter((f) => { return f.endsWith('.pdf') || f.endsWith('.epub') })
      console.log(files)
    })
  }
}

module.exports = Shelf

function homeDir () {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
}

let shelfTest = new Shelf(homeDir() + '/Books')
