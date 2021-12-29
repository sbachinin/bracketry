export const create_canvas = (root_bracket_container, options) => {
    // create canvas to fill a given element
    const canvasEl = document.createElement('canvas')
    canvasEl.className = 'sport-brackets-canvas'
    canvasEl.width = root_bracket_container.clientWidth
    canvasEl.height = root_bracket_container.clientHeight
    canvasEl.style.backgroundColor = options.background_color
    canvasEl.style.border = 'none'

    // have to insert canvas before buttons 
    // to make a 'sibling' css selector work properly
    // (it displays buttons on canvas:hover)
    root_bracket_container.append(canvasEl)

    return canvasEl
}