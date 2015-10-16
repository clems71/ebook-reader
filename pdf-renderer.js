'use strict'

let EventEmitter = require('events')
let Watchdog = require('ya-watchdog')
let co = require('co')

// PDFJS comes from global scope, no RequireJS support for the moment

const HQ_SCALE = 3.0
const LQ_SCALE = 0.75

class PDFRenderer extends EventEmitter {
  constructor (pdfFile) {
    super()

    this._canvas = document.createElement('canvas')
    this._ctx = this._canvas.getContext('2d')

    this._idle = true
    this._nextJob = null
    this._lastJob = null

    let self = this
    co(function * () {
      self._book = yield PDFJS.getDocument(pdfFile)
      self._page = 0

      // Output some stats
      console.log(`Num pages = ${self._book.numPages}`)

      self._watchdog = new Watchdog(150)
      self._watchdog.on('timeout', function () {
        self._render()
      })

      self._pushRenderJob(HQ_SCALE)
      self._render()

      self.emit('ready')
    })
  }

  nextPage () {
    this._page++
    if (this._page >= this._book.numPages) this._page = this._book.numPages - 1 // Saturate
    this._pushRenderJob(LQ_SCALE)
    this._render()
  }

  prevPage () {
    this._page--
    if (this._page < 0) this._page = 0
    this._pushRenderJob(LQ_SCALE)
    this._render()
  }

  destroy () {
    this._book.destroy()
  }

  _upToDate () {
    return this._lastJob.page === this._page && this._lastJob.quality === HQ_SCALE
  }

  _pushRenderJob (quality) {
    this._nextJob = {
      page: this._page,
      quality: quality
    }
  }

  _render () {
    if (!this._idle) return

    if (this._nextJob === null) {
      if (this._upToDate()) return
      this._pushRenderJob(HQ_SCALE)
      this._watchdog.kick()
      return
    }

    let job = this._nextJob
    this._idle = false
    this._nextJob = null

    let self = this

    co(function * () {
      let p = yield self._book.getPage(job.page + 1)
      let viewport = p.getViewport(job.quality)
      self._canvas.height = viewport.height
      self._canvas.width = viewport.width
      yield p.render({
        canvasContext: self._ctx,
        viewport: viewport
      })
      self.emit('data', self._canvas.toDataURL())
      self._idle = true
      self._lastJob = job

      // If there is any new job
      self._render()
    })
  }
}

module.exports = PDFRenderer
