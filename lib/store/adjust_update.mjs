import { deep_clone_object } from '../utils/utils.mjs'

export const get_adjusted_update = (state, update) => {
    const adjusted_update = deep_clone_object(update)

// don't let the base_round_index go negative
    if ('base_round_index' in update && update.base_round_index !== state.base_round_index) {
        adjusted_update.base_round_index = Math.max(update.base_round_index, 0)
    }

    return adjusted_update
}