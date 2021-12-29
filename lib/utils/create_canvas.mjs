export const create_canvas = (root_bracket_container, options) => {
    // create canvas to fill a given element
    const canvas_el = document.createElement('canvas')
    canvas_el.className = 'sport-brackets-canvas'
    canvas_el.width = root_bracket_container.clientWidth
    canvas_el.height = root_bracket_container.clientHeight
    canvas_el.style.backgroundColor = options.background_color
    canvas_el.style.border = 'none'

    // have to insert canvas before buttons 
    // to make a 'sibling' css selector work properly
    // (it displays buttons on canvas:hover)
    root_bracket_container.append(canvas_el)

    return canvas_el
}