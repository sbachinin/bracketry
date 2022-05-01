import { MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL } from '../constants.mjs'
import { debounce } from '../utils/utils.mjs'
import { try_update_scroll_round_index } from '../hor_scroll/try_update_scroll_round_index.mjs'
import { update_scrollbar } from '../root_elements/scrollbar.mjs'

export const install_mouse_events = (
    all_data,
    options,
    store,
    root_elements,
) => {

    const { matches_vertical_scroller, scrollbar, rounds_elements_wrapper,
        left_scroll_button, right_scroll_button } = root_elements

    rounds_elements_wrapper.addEventListener(
        'mouseup',
        e => {
            if (e.button !== 0) return
            if (options.highlight_team_history_on_click) {
                const is_team_title = e.target.classList.contains('team-title-item')
                store.update_state({
                    highlighted_team_id: is_team_title ? e.target.getAttribute('team-id') : null
                })
            }
        }
    )

    left_scroll_button.addEventListener(
        'mouseup',
        e => e.button === 0 && try_update_scroll_round_index(-1, all_data, store, root_elements)
    )
    right_scroll_button.addEventListener(
        'mouseup',
        e => e.button === 0 && try_update_scroll_round_index(1, all_data, store, root_elements)
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
        update_scrollbar(root_elements, options)
    })
}
