import { MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL } from '../constants.mjs'
import { debounce, throttle } from '../utils.mjs'
import { scrollbar_functions } from '../html_shell/scrollbar_functions.mjs'
import { update_highlight } from './highlight.mjs'


const get_match_data_for_element = (el, all_data) => {
    const round_index = +el.closest('.round-wrapper')?.getAttribute('round-index')
    const match_order = +el.closest('.match-wrapper')?.getAttribute('match-order')
    return all_data.matches?.find(m => {
        return m.roundIndex === round_index && m.order === match_order
    }) || { roundIndex: +round_index, order: +match_order }
}


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
        scrollbar: scrollbar_el, matches_positioner
    } = html_shell



    const handle_root_click = e => {
        if (e.button !== 0) return

        if (e.target.classList.contains('navigation-button')) {
            navigation.handle_click(e)
            return
        }

    // on match click
        if (get_option('onMatchClick') !== null) {
            if (e.target.classList.contains('match-body')) {
                const match_data = get_match_data_for_element(e.target, all_data)
                get_option('onMatchClick')(match_data)
            }
            return
        }

    // on side click
        if (get_option('onMatchSideClick') !== null) {
            const side_wrapper = e.target.closest('.side-wrapper')
            if (side_wrapper) {
                const match_data = get_match_data_for_element(e.target, all_data)
                const contestantId = side_wrapper.getAttribute('contestant-id')
                const contestant = all_data.contestants?.[contestantId]
                get_option('onMatchSideClick')(match_data, contestant, contestantId)
            }
            return
        }

    // default: highlight team history
        if (e.target.closest('.matches-positioner')) {
            if (
                get_option('disableHighlight') !== true
                && e.target.closest('.side-wrapper[contestant-id]')
            ) {
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
            if (!scrollbar_el.classList.contains('dragged')) { scrollbar_el.classList.add('dragged') }
        }
    }


    const handle_window_mouseup = () => {
        scrollbar_is_dragged = false
        drag_init_mouse_Y = null
        drag_init_scrollTop = null
        if (scrollbar_el.classList.contains('dragged')) { scrollbar_el.classList.remove('dragged') }
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
    
    const handle_matches_scroll = () => scrollbar_functions.update_position(html_shell, get_option)

    the_root_element.addEventListener('click', handle_root_click)
    window.addEventListener('mouseup', handle_window_mouseup)
    window.addEventListener('mousemove', handle_window_mousemove)
    window.addEventListener('scroll', handle_window_scroll)
    scrollbar_el.addEventListener('mousedown', handle_scrollbar_mousedown)
    matches_vertical_scroller.addEventListener('scroll', handle_matches_scroll)

    const uninstall = () => {
        the_root_element?.removeEventListener('click', handle_root_click)
        window.removeEventListener('scroll', handle_window_scroll)
        window.removeEventListener('mouseup', handle_window_mouseup)
        window.removeEventListener('mousemove', handle_window_mousemove)
        scrollbar_el?.removeEventListener('mousedown', handle_scrollbar_mousedown)
        matches_vertical_scroller.removeEventListener('scroll', handle_matches_scroll)
    }

    return { uninstall }
}
