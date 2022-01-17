import { within_range } from '../utils/utils.mjs'
import {
    get_height_deficit_for_round,
    get_round_title_height
} from '../utils/sizes.mjs'
import { animate_with_easing } from '../utils/animate_with_easing.mjs'
import { was_window_recently_scrolled } from './remember_window_scroll.mjs'

export const get_wheel_handler = (all_rounds_data, options, state, update_state) => {
    let destination_scroll_Y = null // this var is to handle fast clicks

    return e => {
        if (was_window_recently_scrolled()) return
        
        const longest_round_height_deficit = get_height_deficit_for_round(
            all_rounds_data[0].matches.length,
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

        const distance = destination_scroll_Y - initial_scroll_Y
        if (distance === 0) return

        if (options.vertical_scroll_animation_duration > 0) {
            animate_with_easing({
                type: 'scroll_Y',
                handle_new_value: easing_value => {
                    update_state({ scroll_Y: initial_scroll_Y + distance * easing_value })
                },
                duration: options.vertical_scroll_animation_duration
            })
        } else {
            update_state({ scroll_Y: destination_scroll_Y })
        }
    }
}
