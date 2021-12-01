import { throttle } from './utils.mjs'
import { tryScrollX } from './try_scroll_x.mjs'

export const installMouseEvents = (allData, options, state, drawAll, canvasEl) => {
    canvasEl.addEventListener(
        'mousemove',
        throttle(
            e => {
                options.scrollHorizontallyOnMouseMove
                && tryScrollX(allData, state, drawAll, canvasEl, e)
            },
            50
        )
    )
}
