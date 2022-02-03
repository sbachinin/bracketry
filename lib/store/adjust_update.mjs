const scroll_X_has_changed = (state, update) => {
    return 'scroll_X' in update && update.scroll_X !== state.scroll_X
}

const scroll_has_changed = (state, update) => {
    return (
        ('scroll_Y' in update && update.scroll_Y !== state.scroll_Y)
        || scroll_X_has_changed(state, update)
    )
}

export const get_adjusted_update = (state, update) => {
    const adjusted_update = JSON.parse(JSON.stringify(update))

    if (scroll_has_changed(state, update)) {
        adjusted_update.canvas_scrolled_recently = true
        adjusted_update.tooltip = null
    }

    if (scroll_X_has_changed(state, update)) {
        adjusted_update.scroll_X = Math.floor(update.scroll_X)
    }

    return adjusted_update
}