import { within_range } from '../utils/utils.mjs'
import {
    get_height_deficit_for_round,
    get_round_title_height
} from '../utils/sizes.mjs'
import { animate_scroll_Y } from './animate_scroll_Y.mjs'
import { was_window_recently_scrolled } from './remember_window_scroll.mjs'

export const get_wheel_handler = (all_data, options, state, update_state) => {
    let destination_scroll_Y = null // this var is to handle fast clicks

    return e => {
        if (options.auto_canvas_height) return
        if (was_window_recently_scrolled()) return
        
        const longest_round_height_deficit = get_height_deficit_for_round(
            all_data.rounds[0].matches.length,
            options,
            e.target.clientHeight
        )

        if (e.offsetY < get_round_title_height(options)) return
        e.preventDefault();

        const initial_scroll_Y = state.scroll_Y

        const amount = options.vertical_scroll_amount > 0
            ? options.vertical_scroll_amount
            : options.min_height_per_match

        const delta = e.deltaY
            * amount
            / longest_round_height_deficit

        destination_scroll_Y = within_range(
            (destination_scroll_Y || initial_scroll_Y) + delta,
            0,
            100
        )

        animate_scroll_Y(initial_scroll_Y, destination_scroll_Y, options, update_state)
    }
}
