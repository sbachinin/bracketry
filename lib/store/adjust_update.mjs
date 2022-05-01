import { deep_clone_object } from '../utils/utils.mjs'

// const scroll_Y_has_changed = (state, update) => {
//     return 'scroll_Y' in update && update.scroll_Y !== state.scroll_Y
// }

export const get_adjusted_update = (state, update) => {
    const adjusted_update = deep_clone_object(update)

    // if (scroll_Y_has_changed(state, update)) {
    //     adjusted_update.was_recently_scrolled_Y = true
    // }

// don't let the anchor_round_index go negative
    if ('anchor_round_index' in update && update.anchor_round_index !== state.anchor_round_index) {
        adjusted_update.anchor_round_index = Math.max(update.anchor_round_index, 0)
    }

    return adjusted_update
}