import { createCanvas } from './utils/createCanvas.mjs'
import { drawAll } from './utils/draw_all.mjs'

export const createBrackets = (allData, canvasContainer) => {
    const canvasEl = createCanvas(
        canvasContainer,
        el => drawAll(allData, el)
    )

    drawAll(allData, canvasEl)
}