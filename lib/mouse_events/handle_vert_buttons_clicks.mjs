import { animate_scroll } from '../utils/animate_scroll.mjs'
import { within_range } from '../utils/utils.mjs'

export const handle_vert_buttons_clicks = (e, vert_buttons, store, options) => {
    let delta = 0

    if (e.target == vert_buttons.up_button.wrapper
        || vert_buttons.up_button.wrapper.contains(e.target)
    ) {
        delta = -options.vertical_shift_on_button_clicks
    }
    if (e.target == vert_buttons.down_button.wrapper
        || vert_buttons.down_button.wrapper.contains(e.target)
    ) {
        delta = options.vertical_shift_on_button_clicks
    }

    if (delta !== 0) {
        animate_scroll({
            store,
            destination_scroll_Y: within_range(
                (store.state.destination_scroll_Y || store.state.scroll_Y) + delta,
                0,
                100
            ),
            duration: options.vertical_scroll_animation_duration
        })
    }
}