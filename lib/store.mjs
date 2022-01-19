import { debounce } from './utils/utils.mjs'

const scroll_has_changed = (state, update) => {
    return (
        ('scroll_Y' in update && update.scroll_Y !== state.scroll_Y)
        || ('scroll_X' in update && update.scroll_X !== state.scroll_X)
    )
}

const schedule_forget_scroll = debounce((update_state) => {
    update_state({ canvas_scrolled_recently: false })
})

export const create_store = () => {
    const state = {
        scroll_Y: 0,
        scroll_X: 0,
        expanded_match_id: undefined,
        expanded_match_opacity: 0,
        canvas_scrolled_recently: false,
        is_cursor_pointer: false,
        selected_team_id: '163911'
    }

    let change_handler = null

    const update_state = (update = {}, force_redraw = false) => {
        if (scroll_has_changed(state, update)) {
            update.canvas_scrolled_recently = true
            // update.expanded_match_id = undefined
            schedule_forget_scroll(update_state)
        }
        const old_state = JSON.parse(JSON.stringify(state))
        Object.assign(state, update, {
            scroll_X: update.scroll_X ? Math.floor(update.scroll_X) : state.scroll_X
        })
        change_handler?.(state, old_state, force_redraw)
    }

    return {
        state,
        update_state,
        onchange: cb => { change_handler = cb }
    }
}