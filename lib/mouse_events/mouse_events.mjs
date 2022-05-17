import { MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL } from '../constants.mjs'
import { debounce, throttle } from '../utils/utils.mjs'
import { find_match_data_by_id } from '../data/utils.mjs'
import { try_update_scroll_round_index } from '../hor_scroll/try_update_scroll_round_index.mjs'
import { update_scrollbar } from '../stable_elements/scrollbar.mjs'

let scrollbar_is_dragged = false
let drag_init_mouse_Y = null
let drag_init_scrollTop = null

export const install_mouse_events = (
    all_data,
    options,
    store,
    stable_elements,
) => {

    const { content_area, matches_vertical_scroller, scrollbar, matches_scrollable_area,
        left_scroll_button, right_scroll_button } = stable_elements

    matches_scrollable_area.addEventListener(
        'mouseup',
        e => {
            if (scrollbar_is_dragged) return
            if (e.button !== 0) return
            const click_is_on_titles = e.target.classList.contains('side-info-item')
                && !!e.target.closest('.match-info-pair.players-titles')
            store.update_state({
                highlighted_contestant_id: click_is_on_titles ? e.target.getAttribute('contestant-id') : null
            })
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
     

    left_scroll_button.addEventListener(
        'mouseup',
        e => e.button === 0 && !scrollbar_is_dragged && try_update_scroll_round_index(-1, all_data, store, stable_elements)
    )
    right_scroll_button.addEventListener(
        'mouseup',
        e => e.button === 0 && !scrollbar_is_dragged && try_update_scroll_round_index(1, all_data, store, stable_elements)
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




    matches_vertical_scroller.addEventListener('scroll', (e) => {
        if (!options.show_scrollbar) return
        update_scrollbar(stable_elements, options)
    })
}
