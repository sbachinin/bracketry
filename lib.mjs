import { createCanvas } from './utils/createCanvas.mjs'
import { drawAll } from './utils/draw_all.mjs'
import { create_horizontal_scroll_buttons } from './utils/create_horizontal_scroll_buttons.mjs'
import { installMouseEvents } from './utils/install_mouse_events.mjs'

export const createBrackets = (allData, canvasContainer, options) => {
    const state = {
        scrollY: 0,
        scrollX: 0
    }
    
    options.horizontalScrollTriggeredBy === 'buttons'
        && create_horizontal_scroll_buttons(canvasContainer, options)
    
    const canvasEl = createCanvas(
        canvasContainer,
        options,
        el => drawAll(allData, state, el)
    )

    drawAll(allData, state, canvasEl)

    installMouseEvents(allData, options, state, drawAll, canvasEl)
}
