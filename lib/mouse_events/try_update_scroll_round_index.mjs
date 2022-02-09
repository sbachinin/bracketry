import { within_range } from '../utils/utils.mjs'
import { get_max_scroll_round_index } from '../horizontal_scroll/get_max_scroll_round_index.mjs'

export const try_update_scroll_round_index = (change, all_data, store, options) => {
    store.update_state({
        scroll_X_anchor_round_index: within_range(
            store.state.scroll_X_anchor_round_index + change,
            0,
            get_max_scroll_round_index(all_data, options)
        )
    })
}