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
        canvas_scrolled_recently: false
        // hovered_match_opacity: 0
    }

    let change_handler = null
    let scroll_change_handler = null

    const update_state = (update = {}, force_redraw = false) => {
        if (scroll_has_changed(state, update)) {
            update.canvas_scrolled_recently = true
            update.expanded_match_id = undefined
            schedule_forget_scroll(update_state)
            scroll_change_handler?.(state)
        }
        const old_state_string = JSON.stringify(state)
        Object.assign(state, update)
        if (!force_redraw && JSON.stringify(state) === old_state_string) return
        
        change_handler?.(state)
    }

    return {
        state,
        update_state,
        onchange: cb => {
            change_handler = cb
        },
        on_scroll_change: cb => {
            scroll_change_handler = cb
        }
    }
}