import { debounce } from '../utils/utils.mjs'

const MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL = 200

let window_recently_scrolled = false

const try_forget_window_scroll = debounce(
    () => { window_recently_scrolled = false },
    MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL
)

window.addEventListener(
    'scroll',
    () => {
        window_recently_scrolled = true
        try_forget_window_scroll()
    }
)

export const was_window_recently_scrolled = () => window_recently_scrolled