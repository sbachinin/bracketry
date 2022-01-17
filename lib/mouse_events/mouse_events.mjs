import { debounce, throttle } from '../utils/utils.mjs'
import { find_match_under_cursor } from './find_match_under_cursor.mjs'
import { try_scroll_X_on_mousemove } from './try_scroll_X_on_mousemove.mjs'
import { was_window_recently_scrolled } from './remember_window_scroll.mjs'
import { get_wheel_handler } from './get_wheel_handler.mjs'
import { animate_with_easing } from '../utils/animate_with_easing.mjs'
import { CANVAS_CLASS_NAME } from '../constants.mjs'

const switch_expanded_match = (e, all_data, state, options, update_state) => {
    const expanded_match_id = find_match_under_cursor(e, all_data.rounds, state.scroll_X, options)?.id
    if (expanded_match_id === state.expanded_match_id) return
    update_state({
        expanded_match_id,
        previous_expanded_match_id: state.expanded_match_id
    })
    animate_with_easing(
        easing_value => {
            update_state({ expanded_match_opacity: easing_value })
        },
        200
    )
}

// here root_brackets_el is passed instead of canvas_el
// because wheel event has to be handled on both canvas_el and hor scroll buttons
export const install_mouse_events = (
    all_data,
    options,
    { state, update_state },
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
            if (options.should_reduce_match_until_clicked) {
                if (find_match_under_cursor(e, all_data.rounds, state.scroll_X, options)) {
                    update_state({ is_cursor_pointer: true })
                } else {
                    update_state({ is_cursor_pointer: false })
                }
            }
        }, 50)
    )
    
    if (options.should_reduce_match_until_hovered) {
        root_brackets_el.addEventListener(
            'mousemove',
            debounce(e => {
                if (!state.canvas_scrolled_recently) {
                    switch_expanded_match(e, all_data, state, options, update_state)
                }                
            }, 70)
        )
    }

    if (options.should_reduce_match_until_clicked) {
        root_brackets_el.addEventListener(
            'click',
            e => {
                if (e.target.classList.contains(CANVAS_CLASS_NAME)) {
                    switch_expanded_match(e, all_data, state, options, update_state)
                }
            }
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
