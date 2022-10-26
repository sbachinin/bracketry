import { debounce } from '../utils.mjs'

const MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL = 200

const try_forget_window_scroll = debounce(
    (matches_scroller) => {
        if (matches_scroller.style.overflowY !== 'scroll') {
            matches_scroller.style.overflowY = 'scroll'
        }
    },
    MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL
)


export const disable_matches_scroll_on_window_scroll = (matches_scroller) => {

    const handle_window_scroll = () => {
        if (matches_scroller.style.overflowY !== 'hidden') {
            matches_scroller.style.overflowY = 'hidden'
        }
        try_forget_window_scroll(matches_scroller)
    }

    window.addEventListener('scroll', handle_window_scroll)
    
    return () => window.removeEventListener('scroll', handle_window_scroll)
}