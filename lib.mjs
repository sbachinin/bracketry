import { createCanvas } from './utils/createCanvas.mjs'
import { createMatchDrawingData } from './utils/createMatchDrawingData.mjs'
import { drawMatch } from './utils/drawMatch.mjs'
import * as sizes from './utils/sizes.mjs'

const draw = (data, canvasEl) => {
    if (!canvasEl.getContext) return
    const ctx = canvasEl.getContext('2d');

    // draw round names
    ctx.font = sizes.HEADING_FONT_SIZE + 'px sans-serif';
    data.rounds.forEach((round, index) => {
        ctx.fillText(
            round.name,
            sizes.ROUND_WIDTH * index + sizes.MATCH_HOR_MARGIN + sizes.MATCH_HOR_PADDING,
            50);
    })

    ctx.font = sizes.FONT_SIZE + 'px sans-serif';

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