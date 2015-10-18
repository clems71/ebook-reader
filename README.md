# ebook-reader

[![Build Status](https://travis-ci.org/clems71/ebook-reader.svg)](https://travis-ci.org/clems71/ebook-reader)

## Why a new ebook reader?

This application is a simple ebook reader. It currently supports PDF and EPUB files out of the box. The motivation behind this tool is that I never found an easy to use eBook application under linux, supporting both PDF and EPUB natively.

I sort my eBooks through directory organization instead of metadata/tags and Calibre is not that great to do that. Moreover, I always found it's UI terrible.

## Future plan

I plan to support better navigation gestures (pan, zoom) and a slider to quickly navigate between pages far from each other. Bookmarking pages is also planned as well as note taking on pages.

## Technical details

The whole application is written in modern Javascript and targets Electron. Two main libraries are used to perform the book rendering:

- [ePub.js](https://github.com/futurepress/epub.js/)
- [PDF.js](https://mozilla.github.io/pdf.js/)

PDF rendering is made in a smart way to get fast and smooth book navigation, while maintaining high quality rendering.
