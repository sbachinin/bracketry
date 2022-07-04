import { MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL } from '../constants.mjs'
import { debounce, throttle } from '../utils/utils.mjs'
import { update_scrollbar } from '../stable_elements/scrollbar.mjs'

let drag_init_mouse_Y = null
let drag_init_scrollTop = null

export const install_mouse_events = (
    all_data,
    get_option,
    store,
    stable_elements
) => {

    const { content_area, matches_vertical_scroller,
        scrollbar, matches_scrollable_area
    } = stable_elements

    matches_scrollable_area.addEventListener(
        'mouseup',
        e => {
            if (store.state.scrollbar_is_dragged) return
            if (e.button !== 0) return

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
                store.update_state({ highlighted_contestant_id: null })
            } else {
                store.update_state({
                    highlighted_contestant_id: e.target.closest('.side-wrapper').getAttribute('contestant-id')
                })
            }
        }
    )



    scrollbar.addEventListener(
        'mousedown',
        e => {
            if (e.button === 0) {
                store.update_state({ scrollbar_is_dragged: true })
                drag_init_mouse_Y = e.clientY
                drag_init_scrollTop = matches_vertical_scroller.scrollTop
                scrollbar.classList.add('dragged')
            }
        }
    )


    window.addEventListener('mouseup', (e) => {
        store.update_state({ scrollbar_is_dragged: false })
        drag_init_mouse_Y = null
        drag_init_scrollTop = null
        scrollbar.classList.remove('dragged')
    })

    window.addEventListener(
        'mousemove',
        throttle(e => {
            if (store.state.scrollbar_is_dragged) {
                const drag_distance_fraction = (e.clientY - drag_init_mouse_Y) / content_area.clientHeight
                matches_vertical_scroller.scrollTop = drag_init_scrollTop + (drag_distance_fraction * matches_vertical_scroller.scrollHeight)
            }
        }, 15)
    )
     






    const try_forget_window_scroll = debounce(
        () => { store.update_state({ window_recently_scrolled: false }) },
        MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL)

    window.addEventListener(
        'scroll',
        () => {
            store.update_state({ window_recently_scrolled: true })
            try_forget_window_scroll()
        }
    )




    matches_vertical_scroller.addEventListener('scroll', () => update_scrollbar(stable_elements))

    
}
