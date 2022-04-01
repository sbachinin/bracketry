import { within_range } from '../utils/utils.mjs'
import { analyze_anchor_round_height, get_min_height_per_match } from '../utils/sizes.mjs'
import { animate_scroll } from '../utils/animate_scroll.mjs'
import { was_window_recently_scrolled } from './remember_window_scroll.mjs'

export const get_wheel_handler = (all_data, options, store) => {
    return e => {
        if (store.state.was_recently_scrolled_Y) {
            e.preventDefault()
        }

        if (options.vertical_scroll_triggered_by !== 'wheel') return
        if (store.state.destination_scroll_Y <= 0 && e.deltaY < 0) return
        if (store.state.destination_scroll_Y >= 100 && e.deltaY > 0) return
        if (options.auto_canvas_size) return
        if (was_window_recently_scrolled()) return
        
        const { anchor_round_height_deficit } = analyze_anchor_round_height(
            all_data,
            store.state,
            options,
        )

        e.preventDefault()

        const amount = options.vertical_scroll_amount > 0
            ? options.vertical_scroll_amount
            : get_min_height_per_match(options)

        const delta = e.deltaY
            * amount
            / anchor_round_height_deficit

        const maybe_scroll_Y = (store.state.destination_scroll_Y || store.state.scroll_Y) + delta

        animate_scroll({
            store,
            destination_scroll_Y: within_range(maybe_scroll_Y, 0, 100),
            duration: options.vertical_scroll_animation_duration
        })
    }
}
