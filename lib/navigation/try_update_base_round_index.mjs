import { within_range } from '../utils/utils.mjs'
import { get_max_base_round_index } from '../utils/sizes.mjs'

export const try_update_base_round_index = (
    new_index,
    all_data,
    store,
    stable_elements,
) => {
    const max_index = get_max_base_round_index(stable_elements, all_data)
    const base_round_index = within_range(new_index, 0, max_index)
    store.update_state({ base_round_index })
}