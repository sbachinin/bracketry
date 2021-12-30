import { throttle, debounce, within_range } from './utils.mjs'
import { try_scroll_X } from './try_scroll_x.mjs'
import { stopAnimation } from './animate.mjs'
import { get_all_content_width, get_height_deficit_for_round } from './sizes.mjs'

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

export const install_mouse_events = (
    all_data,
    options,
    state,
    handle_new_scrollX,
    handle_new_scrollY,
    canvas_el
) => {
    if (options.horizontal_scroll_triggered_by === 'mousemove') {
        canvas_el.addEventListener(
            'mousemove',
            throttle(
                e => {
                    !window_scrolled_recently
                    && try_scroll_X(
                        get_all_content_width(options, all_data.rounds.length),
                        state,
                        handle_new_scrollX,
                        canvas_el,
                        e
                    )
                },
                50
            )
        )

            
        // * possible optimization here
        // currently requestAnimationF is stopped only here.
        // RAF is still running when mouse moves to the middle of the canvas
        // and is still running when animation reaches the end
        canvas_el.addEventListener('mouseleave', stopAnimation)
    }

    prevent_bracket_scroll_on_window_scroll(options)

    const longest_round_height_deficit = get_height_deficit_for_round(
        all_data.rounds[0].matches.length,
        options,
        canvas_el.height
    )

    canvas_el.addEventListener('wheel', e => {
        
        e.preventDefault();
        handle_new_scrollY(
            within_range(
                state.scrollY + e.deltaY * (options.min_height_per_match / 100),
                0,
                longest_round_height_deficit
            )
        )
    })
}
