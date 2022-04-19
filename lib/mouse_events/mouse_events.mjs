import { MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL } from '../constants.mjs'
import { debounce } from '../utils/utils.mjs'
import { try_update_scroll_round_index } from './try_update_scroll_round_index.mjs'

export const install_mouse_events = (
    all_data,
    options,
    store,
    root_elements,
) => {

    const {
        rounds_elements_wrapper,
        hor_buttons
    } = root_elements

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

    hor_buttons?.left_button.wrapper.addEventListener(
        'mouseup',
        e => e.button === 0 && try_update_scroll_round_index(-1, all_data, store, root_elements, options)
    )
    hor_buttons?.right_button.wrapper.addEventListener(
        'mouseup',
        e => e.button === 0 && try_update_scroll_round_index(1, all_data, store, root_elements, options)
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
}
