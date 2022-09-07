import { MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL } from '../constants.mjs'
import { debounce, throttle } from '../utils.mjs'
import { update_scrollbar } from '../html_shell/scrollbar.mjs'
import { update_highlight } from './highlight.mjs'


export const install_mouse_events = (
    all_data,
    get_option,
    html_shell,
    navigation
) => {

    let drag_init_mouse_Y = null
    let drag_init_scrollTop = null
    let scrollbar_is_dragged = false

    const { the_root_element, content_area, matches_vertical_scroller,
        scrollbar, matches_positioner
    } = html_shell



    const handle_root_mouseup = e => {
        if (scrollbar_is_dragged) return
        if (e.button !== 0) return

        if (e.target.classList.contains('navigation-button')) {
            navigation.handle_click(e)
            return
        }

    // on match click
        if (get_option('onMatchClick') !== null) {
            if (e.target.classList.contains('match-body')) {
                const match_id = e.target.closest('.match-wrapper')?.getAttribute('match-id')
                get_option('onMatchClick')(all_data.matches?.find(m => m.id === match_id))
            }
            return
        }

    // on side click
        if (get_option('onMatchSideClick') !== null) {
            if (e.target.classList.contains('side-wrapper')) {
                const match_id = e.target.closest('.match-wrapper')?.getAttribute('match-id')
                const match = all_data.matches?.find(m => m.id === match_id)
                const contestantId = e.target.getAttribute('contestant-id')
                const contestant = all_data.contestants?.[contestantId]
                get_option('onMatchSideClick')(contestant, contestantId, match)
            }
            return
        }

    // default: highlight team history
        if (e.target.closest('.matches-positioner')) {
            if (e.target.closest('.side-wrapper[contestant-id]')) {
                update_highlight(
                    matches_positioner,
                    e.target.closest('.side-wrapper').getAttribute('contestant-id')
                )
            } else {
                update_highlight(matches_positioner, null)
            }
        }
    }





    const handle_scrollbar_mousedown = e => {
        if (e.button === 0) {
            scrollbar_is_dragged = true
            drag_init_mouse_Y = e.clientY
            drag_init_scrollTop = matches_vertical_scroller.scrollTop
            if (!scrollbar.classList.contains('dragged')) { scrollbar.classList.add('dragged') }
        }
    }


    const handle_window_mouseup = () => {
        scrollbar_is_dragged = false
        drag_init_mouse_Y = null
        drag_init_scrollTop = null
        if (scrollbar.classList.contains('dragged')) { scrollbar.classList.remove('dragged') }
    }
    const handle_window_mousemove = throttle(e => {
        if (scrollbar_is_dragged) {
            const drag_distance_fraction = (e.clientY - drag_init_mouse_Y) / content_area.clientHeight
            matches_vertical_scroller.scrollTop = drag_init_scrollTop + (drag_distance_fraction * matches_vertical_scroller.scrollHeight)
        }
    }, 15)

    const try_forget_window_scroll = debounce(
        () => { matches_vertical_scroller.style.overflowY = 'scroll' },
        MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL)

    const handle_window_scroll = () => {
        matches_vertical_scroller.style.overflowY = 'hidden'
        try_forget_window_scroll()
    }
    
    const handle_matches_scroll = () => update_scrollbar(html_shell)

    the_root_element.addEventListener('mouseup', handle_root_mouseup)
    window.addEventListener('mouseup', handle_window_mouseup)
    window.addEventListener('mousemove', handle_window_mousemove)
    window.addEventListener('scroll', handle_window_scroll)
    scrollbar.addEventListener('mousedown', handle_scrollbar_mousedown)
    matches_vertical_scroller.addEventListener('scroll', handle_matches_scroll)

    const uninstall = () => {
        the_root_element?.removeEventListener('mouseup', handle_root_mouseup)
        window.removeEventListener('scroll', handle_window_scroll)
        window.removeEventListener('mouseup', handle_window_mouseup)
        window.removeEventListener('mousemove', handle_window_mousemove)
        scrollbar?.removeEventListener('mousedown', handle_scrollbar_mousedown)
        matches_vertical_scroller.removeEventListener('scroll', handle_matches_scroll)
    }

    return { uninstall }
}
