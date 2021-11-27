import { createMatchDrawingData } from './utils/createMatchDrawingData.mjs'
import { drawMatch } from './utils/drawMatch.mjs'
import * as sizes from './utils/sizes.mjs'

export const drawBrackets = (data, canvasEl) => {
    if (canvasEl.getContext) {
        var ctx = canvasEl.getContext('2d');

        // draw rounds
        ctx.font = sizes.FONT_SIZE + 'px sans-serif';
        data.rounds.forEach((round, index) => {
            ctx.fillText(round.name, 150 * index, 50);
        })

        data.matches
            .map(match => createMatchDrawingData(match, data, canvasEl))
            .forEach(match => drawMatch(match, ctx))
    }
}