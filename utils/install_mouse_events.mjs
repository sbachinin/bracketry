import { throttle } from './utils.mjs'
import { handleMouseMove } from './handle_mouse_move.mjs'

export const installMouseEvents = (allData, state, drawAll, canvasEl) => {
    canvasEl.addEventListener(
        'mousemove',
        throttle(e => handleMouseMove(allData, state, drawAll, canvasEl, e), 50)
    )
}
