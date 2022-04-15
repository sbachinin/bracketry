import { within_range } from '../utils/utils.mjs'
import { get_max_scroll_round_index } from '../utils/sizes.mjs'

export const try_update_scroll_round_index = (change, all_data, store, root_elements, options) => {
    store.update_state({
        anchor_round_index: within_range(
            store.state.anchor_round_index + change,
            0,
            get_max_scroll_round_index(root_elements, all_data, options)
        )
    })
}