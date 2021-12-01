import { createCanvas } from './utils/createCanvas.mjs'
import { drawAll } from './utils/draw_all.mjs'
import { installMouseEvents } from './utils/install_mouse_events.mjs'

export const createBrackets = (allData, canvasContainer, options) => {
    const state = {
        scrollY: 0,
        scrollX: 0
    }

    const canvasEl = createCanvas(
        canvasContainer,
        el => drawAll(allData, state, el)
    )

    drawAll(allData, state, canvasEl)

    installMouseEvents(allData, options, state, drawAll, canvasEl)
}