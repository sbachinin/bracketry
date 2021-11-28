import { createCanvas } from './utils/createCanvas.mjs'
import { drawMatchesForRound } from './utils/drawMatchesForRound.mjs'
import * as sizes from './utils/sizes.mjs'

const draw = (allData, canvasEl) => {
    if (!canvasEl.getContext) return
    const ctx = canvasEl.getContext('2d');

    allData.rounds.forEach((round, roundIndex) => {
        ctx.font = sizes.HEADING_FONT_SIZE + 'px sans-serif';
        ctx.fillText(
            round.name,
            sizes.ROUND_WIDTH * roundIndex + sizes.MATCH_HOR_MARGIN + sizes.MATCH_HOR_PADDING,
            50);

            ctx.font = sizes.FONT_SIZE + 'px sans-serif';
        drawMatchesForRound(round, roundIndex, canvasEl)
    })
}

export const createBrackets = (allData, canvasContainer) => {
    const canvasEl = createCanvas(
        canvasContainer,
        el => draw(allData, el)
    )

    draw(allData, canvasEl)
}