import { debounce } from './utils.mjs'

export const createCanvas = (canvasContainer, drawFn) => {
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
            drawFn(canvasEl)
        }),
        false
    );

    return canvasEl
}