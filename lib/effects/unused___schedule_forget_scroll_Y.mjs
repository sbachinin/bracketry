import { debounce } from '../utils/utils.mjs'

export const schedule_forget_scroll_Y = debounce(
    update_state => {
        update_state({ was_recently_scrolled_Y: false })
    },
    500
)