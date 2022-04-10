import { within_range, get_max_scroll_round_index } from '../utils/utils.mjs'

export const try_update_scroll_round_index = (change, all_data, store, the_root_element, options) => {
    store.update_state({
        scroll_X_anchor_round_index: within_range(
            store.state.scroll_X_anchor_round_index + change,
            0,
            get_max_scroll_round_index(the_root_element, all_data, options)
        )
    })
}