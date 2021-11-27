import { createMatchDrawingData } from './utils/createMatchDrawingData.mjs'
import { debounce } from './utils/utils.mjs'
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
    // create canvas to fill a given element
    const canvasEl = document.createElement('canvas');
    canvasEl.width = canvasContainer.clientWidth;
    canvasEl.height = canvasContainer.clientHeight;
    canvasContainer.appendChild(canvasEl);

    window.addEventListener(
        'resize',
        debounce(() => {
            canvasEl.width = canvasContainer.clientWidth;
            canvasEl.height = canvasContainer.clientHeight;
            draw(data, canvasEl)
        }),
        false
    );

    draw(data, canvasEl)
}