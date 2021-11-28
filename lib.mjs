import { createCanvas } from './utils/createCanvas.mjs'
import { createMatchDrawingData } from './utils/createMatchDrawingData.mjs'
import { drawMatch } from './utils/drawMatch.mjs'
import * as sizes from './utils/sizes.mjs'

const draw = (data, canvasEl) => {
    if (!canvasEl.getContext) return
    const ctx = canvasEl.getContext('2d');

    // draw rounds
    ctx.font = sizes.FONT_SIZE + 'px sans-serif';
    data.rounds.forEach((round, index) => {
        ctx.fillText(round.name, 150 * index, 50);
    })

    data.matches
        .map(match => createMatchDrawingData(match, data, canvasEl))
        .forEach(match => drawMatch(match, ctx))
}

export const drawBrackets = (data, canvasContainer) => {
    const canvasEl = createCanvas(
        canvasContainer,
        el => draw(data, el)
    )

    draw(data, canvasEl)
}