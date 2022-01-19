import { try_update_expanded_match } from './try_update_expanded_match.mjs'
import { try_scroll_X_on_mousemove } from './try_scroll_X_on_mousemove.mjs'
import { was_window_recently_scrolled } from './remember_window_scroll.mjs'
import { try_update_cursor } from './try_update_cursor.mjs'
import { get_wheel_handler } from './get_wheel_handler.mjs'
import { CANVAS_CLASS_NAME } from '../constants.mjs'

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
        e => {
            if (was_window_recently_scrolled()) return

            try_scroll_X_on_mousemove(
                e, all_data.all_content_width, state.scroll_X, options,
                scroll_X => update_state({ scroll_X }),
            )

            try_update_cursor(
                e, all_data.rounds, state.scroll_X, options,
                is_cursor_pointer => update_state({ is_cursor_pointer })
            )

            try_update_expanded_match(
                e, all_data.rounds, state, options, update_state
            )
        }
    )

    if (options.reduce_match_until_clicked) {
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
