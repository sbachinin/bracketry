import { throttle, debounce } from './utils.mjs'
import { tryScrollX } from './try_scroll_x.mjs'
import { stopAnimation } from './animate.mjs'

const MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL = 500
let window_scrolled_recently = false

const prevent_bracket_scroll_on_window_scroll = options => {
    const try_forget_window_scroll = debounce(
        () => { window_scrolled_recently = false },
        MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL
    )

    window.addEventListener(
        'scroll',
        () => {
            if (options.horizontal_scroll_triggered_by === 'mousemove') {
                window_scrolled_recently = true
                try_forget_window_scroll()
            }
        }
    )
}

export const installMouseEvents = (allData, options, state, drawAll, canvasEl) => {
    canvasEl.addEventListener(
        'mousemove',
        throttle(
            e => {
                options.horizontal_scroll_triggered_by === 'mousemove'
                && !window_scrolled_recently
                && tryScrollX(allData, state, drawAll, canvasEl, e)
            },
            50
        )
    )

    canvasEl.addEventListener(
        'mouseleave',
        e => {
            options.horizontal_scroll_triggered_by === 'mousemove'
            && stopAnimation()
            // * possible optimization here
            // currently requestAnimationF is stopped only here.
            // RAF is still running when mouse moves to the middle of the canvas
            // and is still running when animation reaches the end
        }
    )

    prevent_bracket_scroll_on_window_scroll(options)
}
