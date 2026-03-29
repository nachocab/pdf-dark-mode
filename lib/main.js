"use strict";

(function () {
  function loadConfig() {
    const elem = document.getElementById('pdf-preview-config')
    if (elem) {
      return JSON.parse(elem.getAttribute('data-config'))
    }
    throw new Error('Could not load configuration.')
  }
  function cursorTools(name) {
    if (name === 'hand') {
      return 1
    }
    return 0
  }
  function scrollMode(name) {
    switch (name) {
      case 'vertical':
        return 0
      case 'horizontal':
        return 1
      case 'wrapped':
        return 2
      default:
        return -1
    }
  }
  function spreadMode(name) {
    switch (name) {
      case 'none':
        return 0
      case 'odd':
        return 1
      case 'even':
        return 2
      default:
        return -1
    }
  }
  function sidebarView(name) {
    switch (name) {
      case 'thumbnails':
        return 1
      case 'outline':
        return 2
      default:
        return -1
    }
  }
  window.addEventListener('load', async function () {
    const config = loadConfig()
    const historyBackButton = document.getElementById('historyBack')
    const historyForwardButton = document.getElementById('historyForward')
    const customPrintButton = document.getElementById('customPrint')
    PDFViewerApplicationOptions.set('cMapUrl', config.cMapUrl)
    PDFViewerApplicationOptions.set('standardFontDataUrl', config.standardFontDataUrl)
    const loadOpts = {
      url:config.path,
      useWorkerFetch: false,
      cMapUrl: config.cMapUrl,
      cMapPacked: true,
      standardFontDataUrl: config.standardFontDataUrl
    }
    PDFViewerApplication.initializedPromise.then(() => {
      const defaults = config.defaults
      const pageBackHistory = []
      const pageForwardHistory = []
      let lastTrackedPage = null
      let isNavigatingHistory = false
      const updateHistoryBackButton = function () {
        if (historyBackButton) {
          historyBackButton.disabled = pageBackHistory.length === 0
        }
        if (historyForwardButton) {
          historyForwardButton.disabled = pageForwardHistory.length === 0
        }
      }
      const preferredSidebarView = sidebarView(defaults.sidebarView)
      let sidebarViewApplied = preferredSidebarView !== 2
      const maybeApplySidebarView = function () {
        if (sidebarViewApplied || preferredSidebarView < 0) {
          return
        }
        if (preferredSidebarView === 2 && PDFViewerApplication.pdfSidebar.outlineButton.disabled) {
          return
        }
        PDFViewerApplication.pdfSidebar.switchView(preferredSidebarView)
        sidebarViewApplied = true
      }

      PDFViewerApplication.eventBus.on('outlineloaded', maybeApplySidebarView)
      PDFViewerApplication.eventBus.on('pagechanging', (event) => {
        const pageNumber = event.pageNumber
        if (lastTrackedPage === null) {
          lastTrackedPage = pageNumber
          updateHistoryBackButton()
          return
        }
        if (isNavigatingHistory) {
          lastTrackedPage = pageNumber
          isNavigatingHistory = false
          updateHistoryBackButton()
          return
        }
        if (pageNumber !== lastTrackedPage) {
          pageBackHistory.push(lastTrackedPage)
          pageForwardHistory.length = 0
          lastTrackedPage = pageNumber
        }
        updateHistoryBackButton()
      })

      if (historyBackButton) {
        historyBackButton.addEventListener('click', () => {
          if (pageBackHistory.length === 0 || lastTrackedPage === null) {
            return
          }
          const targetPage = pageBackHistory.pop()
          pageForwardHistory.push(lastTrackedPage)
          isNavigatingHistory = true
          PDFViewerApplication.pdfViewer.currentPageNumber = targetPage
          updateHistoryBackButton()
        })
      }
      if (historyForwardButton) {
        historyForwardButton.addEventListener('click', () => {
          if (pageForwardHistory.length === 0 || lastTrackedPage === null) {
            return
          }
          const targetPage = pageForwardHistory.pop()
          pageBackHistory.push(lastTrackedPage)
          isNavigatingHistory = true
          PDFViewerApplication.pdfViewer.currentPageNumber = targetPage
          updateHistoryBackButton()
        })
      }
      if (customPrintButton) {
        customPrintButton.addEventListener('click', () => {
          if (PDFViewerApplication.supportsPrinting) {
            PDFViewerApplication.triggerPrinting()
            return
          }
          window.print()
        })
      }

      const optsOnLoad = () => {
        PDFViewerApplication.pdfCursorTools.switchTool(cursorTools(defaults.cursor))
        PDFViewerApplication.pdfViewer.currentScaleValue = defaults.scale
        maybeApplySidebarView()
        PDFViewerApplication.pdfViewer.scrollMode = scrollMode(defaults.scrollMode)
        PDFViewerApplication.pdfViewer.spreadMode = spreadMode(defaults.spreadMode)
        if (defaults.sidebar) {
          PDFViewerApplication.pdfSidebar.open()
        } else {
          PDFViewerApplication.pdfSidebar.close()
        }
        lastTrackedPage = PDFViewerApplication.pdfViewer.currentPageNumber
        updateHistoryBackButton()
        PDFViewerApplication.eventBus.off('documentloaded', optsOnLoad)
        PDFViewerApplication.eventBus.off('outlineloaded', maybeApplySidebarView)
      }
      PDFViewerApplication.eventBus.on('documentloaded', optsOnLoad)
      
      // load() cannot be called before pdf.js is initialized
      // open() makes sure pdf.js is initialized before load()
      PDFViewerApplication.open(config.path).then(async function () {
        const doc = await pdfjsLib.getDocument(loadOpts).promise
        doc._pdfInfo.fingerprints = [config.path]
        PDFViewerApplication.load(doc)
      })
    })

    window.addEventListener('message', async function (event) {
      if (!event.data || event.data.type !== 'reload') {
        return
      }

      // Prevents flickering of page when PDF is reloaded
      const oldResetView = PDFViewerApplication.pdfViewer._resetView
      PDFViewerApplication.pdfViewer._resetView = function () {
        this._firstPageCapability = (0, pdfjsLib.createPromiseCapability)()
        this._onePageRenderedCapability = (0, pdfjsLib.createPromiseCapability)()
        this._pagesCapability = (0, pdfjsLib.createPromiseCapability)()

        this.viewer.textContent = ""
      }

      // Changing the fingerprint fools pdf.js into keeping scroll position
      const doc = await pdfjsLib.getDocument(loadOpts).promise
      doc._pdfInfo.fingerprints = [config.path]
      PDFViewerApplication.load(doc)

      PDFViewerApplication.pdfViewer._resetView = oldResetView
    });
  }, { once: true });

  window.onerror = function () {
    const msg = document.createElement('body')
    msg.innerText = 'An error occurred while loading the file. Please open it again.'
    document.body = msg
  }
}());
