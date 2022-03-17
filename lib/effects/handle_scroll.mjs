import { debounce } from '../utils/utils.mjs'

const schedule_forget_scroll = debounce((update_state) => {
    update_state({ canvas_scrolled_recently: false })
}, 300)

export const handle_scroll = (store) => {
    schedule_forget_scroll(store.update_state)
}