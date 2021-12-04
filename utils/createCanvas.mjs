export const createCanvas = (rootContainer, options) => {
    // create canvas to fill a given element
    const canvasEl = document.createElement('canvas')
    canvasEl.className = 'sport-brackets-canvas'
    canvasEl.width = rootContainer.clientWidth
    canvasEl.height = rootContainer.clientHeight
    canvasEl.style.backgroundColor = options.backgroundColor
    canvasEl.style.border = 'none'

    // have to insert canvas before buttons 
    // to make a 'sibling' css selector work properly
    // (it displays buttons on canvas:hover)
    rootContainer.prepend(canvasEl)

    return canvasEl
}