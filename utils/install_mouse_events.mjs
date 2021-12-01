import { throttle } from './utils.mjs'
import { tryScrollX } from './try_scroll_x.mjs'
import { stopAnimation } from './animate.mjs'

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

    canvasEl.addEventListener(
        'mouseleave',
        e => {
            options.horizontalScrollTriggeredBy === 'mousemove'
            && stopAnimation()
            // * possible optimization here
            // currently requestAnimationF is stopped only here.
            // RAF is still running when mouse moves to the middle of the canvas
            // and is still running when animation reaches the end
        }
    )
}
