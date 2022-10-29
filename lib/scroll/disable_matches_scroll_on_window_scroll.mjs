import { debounce } from '../utils.mjs'

const MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL = 200

const try_forget_window_scroll = debounce(
    (matches_scroller) => matches_scroller.classList.remove('noscroll-y'),
    MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL
)


export const disable_matches_scroll_on_window_scroll = (matches_scroller, get_option) => {

    if (get_option('verticalScrollMode') !== 'mousewheel') {
        return () => void 0
    }

    const handle_window_scroll = () => {
        matches_scroller.classList.add('noscroll-y')
        try_forget_window_scroll(matches_scroller)
    }

    window.addEventListener('scroll', handle_window_scroll)
    
    return () => window.removeEventListener('scroll', handle_window_scroll)
}