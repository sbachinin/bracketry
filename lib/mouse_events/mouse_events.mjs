import { try_highlight_team } from './try_highlight_team.mjs'
import { try_update_hovered_team } from './try_update_hovered_team.mjs'
import { handle_hor_buttons_clicks } from './handle_hor_buttons_clicks.mjs'
import { handle_vert_buttons_clicks } from './handle_vert_buttons_clicks.mjs'
import { MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL } from '../constants.mjs'
import { debounce } from '../utils/utils.mjs'

// here the_root_element is passed instead of main_canvas_el
// because wheel event has to be handled on both main_canvas_el and hor scroll buttons
export const install_mouse_events = (
    all_data,
    options,
    store,
    root_elements,
) => {
    root_elements.the_root_element.addEventListener(
        'mousemove',
        e => {
            if (store.state.window_recently_scrolled) return
            try_update_hovered_team(e, all_data, store, options)
        }
    )



    root_elements.the_root_element.addEventListener('mouseup',
        e => {
            if (e.button !== 0) return

            if (e.target == root_elements.main_canvas_el) {
                if (options.highlight_team_history_on_click) {
                    try_highlight_team(e, all_data, store, options)
                }
                return
            }

            if (root_elements.hor_buttons !== null) {
                handle_hor_buttons_clicks(e, root_elements, all_data, store, options)
            }

            if (root_elements.vert_buttons !== null) {
                handle_vert_buttons_clicks(e, root_elements.vert_buttons, all_data, store, options)
            }
        }
    )



    root_elements.main_canvas_el.addEventListener('mouseleave', e => {
        setTimeout(() => store.update_state({ hovered_team_id: null }), 100)
    })






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
