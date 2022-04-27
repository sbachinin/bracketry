import { within_range } from '../utils/utils.mjs'
import { get_max_scroll_round_index } from '../utils/sizes.mjs'

export const try_update_scroll_round_index = (change, all_data, store, root_elements, options) => {
    let new_index = store.state.anchor_round_index + change

    if (change < 0) {
        new_index = Math.floor(new_index)
    }
    store.update_state({
        anchor_round_index: within_range(
            new_index,
            0,
            get_max_scroll_round_index(root_elements, all_data, options)
        )
    })
}