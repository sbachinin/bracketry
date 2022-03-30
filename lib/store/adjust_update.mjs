import { deep_clone_object } from '../utils/utils.mjs'

const scroll_X_has_changed = (state, update) => {
    return 'scroll_X' in update && update.scroll_X !== state.scroll_X
}

export const scroll_Y_has_changed = (state, update) => {
    return 'scroll_Y' in update && update.scroll_Y !== state.scroll_Y
}

export const get_adjusted_update = (state, update) => {
    const adjusted_update = deep_clone_object(update)

    if (scroll_X_has_changed(state, update)) {
        adjusted_update.scroll_X = update.scroll_X
    }

    if (scroll_Y_has_changed(state, update)) {
        adjusted_update.was_recently_scrolled_Y = true
    }

    return adjusted_update
}