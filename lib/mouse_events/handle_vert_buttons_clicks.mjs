import { analyze_anchor_round_height } from '../utils/sizes.mjs'
import { animate_scroll } from '../utils/animate_scroll.mjs'
import { within_range } from '../utils/utils.mjs'

export const handle_vert_buttons_clicks = (e, vert_buttons, all_data, store, options) => {

    const up_was_clicked = e.target == vert_buttons.up_button.wrapper
        || vert_buttons.up_button.wrapper.contains(e.target)
    const down_was_clicked = e.target == vert_buttons.down_button.wrapper
        || vert_buttons.down_button.wrapper.contains(e.target)

    if (!up_was_clicked && !down_was_clicked) return

    if (up_was_clicked && store.state.scroll_Y <= 0) return
    if (up_was_clicked && store.state.destination_scroll_Y <= 0) return

    if (down_was_clicked && store.state.scroll_Y >= 100) return
    if (down_was_clicked && store.state.destination_scroll_Y >= 100) return

    // here: one of vert buttons was clicked, and there's some vertical space left to scroll in that direction

    const delta_px = options.vertical_shift_on_button_clicks * (up_was_clicked ? -1 : 1)
    const { anchor_round_height_deficit } = analyze_anchor_round_height(all_data, store.state, options)
    const delta = delta_px / anchor_round_height_deficit * 100

    animate_scroll({
        store,
        destination_scroll_Y: within_range(
            store.state.destination_scroll_Y + delta,
            0,
            100
        ),
        duration: options.vertical_scroll_animation_duration
    })
}