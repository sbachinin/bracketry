import { debounce } from '../utils/utils.mjs'

const schedule_forget_scroll = debounce((update_state) => {
    update_state({ canvas_scrolled_recently: false })
}, 300)

const hide_tooltip = store => {
    if (store.state.tooltip !== null && !store.state.tooltip_is_scheduled_to_disappear) {
        store.update_state({ tooltip_is_scheduled_to_disappear: true })
        setTimeout(() => {
            store.update_state({ tooltip: null, tooltip_is_scheduled_to_disappear: false })
        }, 500)
    }
}

export const handle_scroll = (store) => {
    schedule_forget_scroll(store.update_state)
    hide_tooltip(store)
}