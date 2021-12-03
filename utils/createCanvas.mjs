import { debounce } from './utils.mjs'

export const createCanvas = (canvasContainer, options, drawFn) => {
    // create canvas to fill a given element
    const canvasEl = document.createElement('canvas')
    canvasEl.className = 'sport-brackets-canvas'
    canvasEl.width = canvasContainer.clientWidth
    canvasEl.height = canvasContainer.clientHeight
    canvasEl.style.backgroundColor = options.backgroundColor
    canvasEl.style.border = 'none'

    // have to insert canvas before buttons 
    // to make a 'sibling' css selector work properly
    // (it displays buttons on canvas:hover)
    canvasContainer.prepend(canvasEl)

    window.addEventListener(
        'resize',
        debounce(() => {
            canvasEl.width = canvasContainer.clientWidth
            canvasEl.height = canvasContainer.clientHeight
            drawFn(canvasEl)
        }),
        false
    )

    return canvasEl
}