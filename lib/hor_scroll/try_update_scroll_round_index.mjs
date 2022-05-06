import { within_range } from '../utils/utils.mjs'
import { get_max_scroll_round_index } from '../utils/sizes.mjs'

export const try_update_scroll_round_index = (
    change,
    all_data,
    store,
    stable_elements
) => {
    let new_index = store.state.anchor_round_index + change

    // in case of fractional index, gently return to integer:
    if (store.state.anchor_round_index % 1 < 0.5) {
        new_index = Math.floor(new_index)
    } else {
        new_index = Math.ceil(new_index)
    }

    const max_index = get_max_scroll_round_index(stable_elements, all_data)
    const anchor_round_index = within_range(new_index, 0, max_index)
    store.update_state({ anchor_round_index })
}