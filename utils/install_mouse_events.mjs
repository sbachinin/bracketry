import { throttle } from './utils.mjs'
import { tryScrollX } from './try_scroll_x.mjs'

const defaultOptions = {
    horizontalScrollTriggeredBy: 'mousemove'
}

export const installMouseEvents = (allData, options = defaultOptions, state, drawAll, canvasEl) => {
    canvasEl.addEventListener(
        'mousemove',
        throttle(
            e => {
                options.horizontalScrollTriggeredBy === 'mousemove'
                && tryScrollX(allData, state, drawAll, canvasEl, e)
            },
            50
        )
    )
}
