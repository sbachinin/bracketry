import { MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL } from '../constants.mjs'
import { debounce, throttle } from '../utils.mjs'
import { update_scrollbar } from '../stable_elements/scrollbar.mjs'
import { update_highlight } from '../effects/highlight.mjs'


export const install_mouse_events = (
    all_data,
    get_option,
    stable_elements,
    navigation
) => {

    let drag_init_mouse_Y = null
    let drag_init_scrollTop = null
    let scrollbar_is_dragged = false

    const { the_root_element, content_area, matches_vertical_scroller,
        scrollbar, matches_positioner
    } = stable_elements

    the_root_element.addEventListener(
        'mouseup',
        e => {
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
                    get_option('onMatchClick')(all_data.matches.find(m => m.match_id === match_id))
                }
                return
            }

        // on side click
            if (get_option('onMatchSideClick') !== null) {
                if (e.target.classList.contains('side-wrapper')) {
                    const match_id = e.target.closest('.match-wrapper')?.getAttribute('match-id')
                    const match = all_data.matches.find(m => m.match_id === match_id)
                    const contestant_id = e.target.getAttribute('contestant-id')
                    const contestant = all_data.contestants[contestant_id]
                    get_option('onMatchSideClick')(contestant, contestant_id, match)
                }
                return
            }

        // default: highlight team history
            if (!e.target.classList.contains('side-wrapper')) {
                update_highlight(matches_positioner, null)
            } else {
                update_highlight(
                    matches_positioner,
                    e.target.closest('.side-wrapper').getAttribute('contestant-id')
                )
            }
        }
    )



    scrollbar.addEventListener(
        'mousedown',
        e => {
            if (e.button === 0) {
                scrollbar_is_dragged = true
                drag_init_mouse_Y = e.clientY
                drag_init_scrollTop = matches_vertical_scroller.scrollTop
                scrollbar.classList.add('dragged')
            }
        }
    )


    window.addEventListener('mouseup', (e) => {
        scrollbar_is_dragged = false
        drag_init_mouse_Y = null
        drag_init_scrollTop = null
        scrollbar.classList.remove('dragged')
    })

    window.addEventListener(
        'mousemove',
        throttle(e => {
            if (scrollbar_is_dragged) {
                const drag_distance_fraction = (e.clientY - drag_init_mouse_Y) / content_area.clientHeight
                matches_vertical_scroller.scrollTop = drag_init_scrollTop + (drag_distance_fraction * matches_vertical_scroller.scrollHeight)
            }
        }, 15)
    )
     



    const try_forget_window_scroll = debounce(
        () => { matches_vertical_scroller.style.overflowY = 'scroll' },
        MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL)
    window.addEventListener(
        'scroll',
        () => {
            matches_vertical_scroller.style.overflowY = 'hidden'
            try_forget_window_scroll()
        }
    )




    matches_vertical_scroller.addEventListener('scroll', () => update_scrollbar(stable_elements))

    
}
