import { throttle, within_range } from '../utils/utils.mjs'
import { try_scroll_X } from './try_scroll_x.mjs'
import {
    get_height_deficit_for_round,
    get_round_title_height
} from '../utils/sizes.mjs'
import { animate_with_easing } from '../utils/animate-with-easing.mjs'
import { was_window_recently_scrolled } from './remember_window_scroll.mjs'

// here root_brackets_el is passed instead of canvas_el
// because wheel event has to be handled on both canvas_el and hor scroll buttons
export const install_mouse_events = (
    all_rounds_data,
    options,
    state,
    update_state,
    root_brackets_el,
    all_content_width
) => {
    if (options.horizontal_scroll_triggered_by === 'mousemove') {
        root_brackets_el.addEventListener(
            'mousemove',
            throttle(
                e => {
                    !was_window_recently_scrolled()
                    && try_scroll_X(
                        all_content_width,
                        state,
                        options.mousemove_horizontal_scroll_speed,
                        scroll_X => update_state({ scroll_X }),
                        root_brackets_el.clientWidth,
                        e
                    )
                },
                50
            )
        )
    }

    const longest_round_height_deficit = get_height_deficit_for_round(
        all_rounds_data[0].matches.length,
        options,
        root_brackets_el.clientHeight
    )
    let destination_scroll_Y = null
    // - state.scroll_Y is expressed not in pixels (because every round has its own pixel scroll_Y)
    // but in % of "overall scroll height" (or "height_deficit").
    // - When matches are drawn later,
    // they transform this % into pixel scroll_Y according to their particular width deficits.
    // - Single wheel move changes the scroll_Y of the leftmost (longest) round by 1 match height.
    // And, accordingly, it changes the 2nd round scroll_Y by 1/2 match height etc etc
    
    if (!options.auto_canvas_height) {
        root_brackets_el.addEventListener('wheel', e => {
            if (was_window_recently_scrolled()) return
            
            if (e.offsetY < get_round_title_height(options)) return
            e.preventDefault();
    
            const initial_scroll_Y = state.scroll_Y
    
            const delta = e.deltaY
                * options.min_height_per_match
                / longest_round_height_deficit
    
            destination_scroll_Y = within_range(
                (destination_scroll_Y || initial_scroll_Y) + delta,
                0,
                100
            )
    
            const distance = destination_scroll_Y - initial_scroll_Y
            if (distance === 0) return

            animate_with_easing(
                easing_value => {
                    update_state({ scroll_Y: initial_scroll_Y + distance * easing_value })
                },
                options.vertical_scroll_speed
            )
        })
    }
}
