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

    const props_to_reset_on_full_update = {
        expanded_match: undefined,
        previous_expanded_match: undefined,
        expanded_match_opacity: 0,
        canvas_scrolled_recently: false,
        cursor: 'auto',
        highlighted_team_id: undefined,

        dragging: false, drag_start_scroll_coords: [], drag_start_mouse_coords: []
    }

    const state = {
        scroll_Y: 0,
        destination_scroll_Y: undefined,
        scroll_X: 0,
        destination_scroll_X: undefined,
        ...props_to_reset_on_full_update
    }

    let change_handler = null

    const update_state = (update = {}, force_redraw = false) => {
        if (scroll_has_changed(state, update)) {
            update.canvas_scrolled_recently = true
            schedule_forget_scroll(update_state)
        }
        const old_state = JSON.parse(JSON.stringify(state))
        Object.assign(state, update, {
            scroll_X: update.scroll_X ? Math.floor(update.scroll_X) : state.scroll_X
        })
        change_handler?.(state, old_state, force_redraw)
    }

    const reset_some_props = () => Object.assign(state, props_to_reset_on_full_update)

    return {
        state,
        update_state,
        reset_some_props,
        onchange: cb => { change_handler = cb }
    }
}