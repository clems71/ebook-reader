'use strict'

// let co = require('co')

class EPUBRenderer {
  constructor (epubFile, elmt) {
    this._book = ePub(epubFile)
    this._book.renderTo(elmt)

    // co(function * () {
    //   let toc = yield book.getToc()
    //   console.log(toc)
    // })

    // this._canvas = document.createElement('canvas')
    // this._ctx = this._canvas.getContext('2d')
  }

  nextPage () {
    this._book.nextPage()
  }

  prevPage () {
    this._book.prevPage()
  }

  destroy () {
    this._book.destroy()
  }
}

module.exports = EPUBRenderer
