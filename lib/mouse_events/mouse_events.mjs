import { throttle, debounce } from '../utils/utils.mjs'
import { get_hovered_match } from './get_hovered_match.mjs'
import { try_scroll_X_on_mousemove } from './try_scroll_X_on_mousemove.mjs'
import { was_window_recently_scrolled } from './remember_window_scroll.mjs'
import { get_wheel_handler } from './get_wheel_handler.mjs'

// here root_brackets_el is passed instead of canvas_el
// because wheel event has to be handled on both canvas_el and hor scroll buttons
export const install_mouse_events = (
    all_data,
    options,
    state,
    update_state,
    root_brackets_el,
) => {
    root_brackets_el.addEventListener(
        'mousemove',
        throttle(e => {
            if (was_window_recently_scrolled()) return
            if (options.horizontal_scroll_triggered_by === 'mousemove') {
                try_scroll_X_on_mousemove(
                    all_data.all_content_width,
                    state,
                    options.mousemove_horizontal_scroll_speed,
                    scroll_X => update_state({ scroll_X }),
                    e
                )
            }
            if (options.show_scores_only_on_hover) {
                const hovered_match = get_hovered_match(e, all_data, state, options)
                if (!hovered_match && state.hovered_match_id) {
                    update_state({ hovered_match_id: undefined })
                }
            }
        }, 50)
    )
    if (options.show_scores_only_on_hover) {
        root_brackets_el.addEventListener(
            'mousemove',
            debounce(e => {
                    const hovered_match = get_hovered_match(e, all_data, state, options)
                    update_state({ hovered_match_id: hovered_match?.id })
            }, 70)
        )
    }
    // - state.scroll_Y is expressed not in pixels (because every round has its own pixel scroll_Y)
    // but in % of "overall scroll height" (or "height_deficit").
    // - When matches are drawn later,
    // they transform this % into pixel scroll_Y according to their particular width deficits.
    // - Single wheel move changes the scroll_Y of the leftmost (longest) round by 1 match height.
    // And, accordingly, it changes the 2nd round scroll_Y by 1/2 match height etc etc
    const handle_wheel = get_wheel_handler(all_data.rounds, options, state, update_state)
    if (!options.auto_canvas_height) {
        root_brackets_el.addEventListener('wheel', handle_wheel)
    }
}
