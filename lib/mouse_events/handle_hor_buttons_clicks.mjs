import { try_update_scroll_round_index } from './try_update_scroll_round_index.mjs'

export const handle_hor_buttons_clicks = (e, { hor_buttons, the_root_element}, all_data, store, options) => {
    if (e.target == hor_buttons.left_button.wrapper
        || hor_buttons.left_button.wrapper.contains(e.target)
    ) {
        try_update_scroll_round_index(-1, all_data, store, the_root_element)
    }
    if (e.target == hor_buttons.right_button.wrapper
        || hor_buttons.right_button.wrapper.contains(e.target)
    ) {
        try_update_scroll_round_index(1, all_data, store, the_root_element)
    }
}