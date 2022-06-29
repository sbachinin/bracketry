import { MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL } from '../constants.mjs'
import { debounce, throttle } from '../utils/utils.mjs'
import { try_update_anchor_round_index } from '../navigation/try_update_anchor_round_index.mjs'
import { update_scrollbar } from '../stable_elements/scrollbar.mjs'

let scrollbar_is_dragged = false
let drag_init_mouse_Y = null
let drag_init_scrollTop = null

export const install_mouse_events = (
    all_data,
    get_option,
    store,
    stable_elements,
) => {

    const { content_area, matches_vertical_scroller,
        scrollbar, matches_scrollable_area,
        navigation_buttons } = stable_elements

    matches_scrollable_area.addEventListener(
        'mouseup',
        e => {
            if (scrollbar_is_dragged) return
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
                scrollbar_is_dragged = true
                drag_init_mouse_Y = e.clientY
                drag_init_scrollTop = matches_vertical_scroller.scrollTop
                scrollbar.classList.add('dragged')
            }
        }
    )

    window.addEventListener('mouseup', () => {
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
     





    const navigate_left = e => {
        e.button === 0
        && e.target.classList.contains('active')
        && !scrollbar_is_dragged
        && try_update_anchor_round_index(store.state.anchor_round_index-1, all_data, store, stable_elements, get_option)
    }
    const navigate_right = e => {
        e.button === 0
        && e.target.classList.contains('active')
        && !scrollbar_is_dragged
        && try_update_anchor_round_index(store.state.anchor_round_index+1, all_data, store, stable_elements, get_option)
    }
    navigation_buttons.left.addEventListener('mouseup', navigate_left)
    navigation_buttons.top_left.addEventListener('mouseup', navigate_left)
    navigation_buttons.right.addEventListener('mouseup', navigate_right)
    navigation_buttons.top_right.addEventListener('mouseup', navigate_right)






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




    matches_vertical_scroller.addEventListener('scroll', (e) => {
        if (!get_option('showScrollbar')) return
        update_scrollbar(stable_elements, get_option)
    })
}
