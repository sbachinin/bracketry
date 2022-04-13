import { try_highlight_team } from './try_highlight_team.mjs'
import { try_update_hovered_team } from './try_update_hovered_team.mjs'
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
        the_root_element,
        main_canvas_el,
        hor_buttons
    } = root_elements

    main_canvas_el.addEventListener(
        'mousemove',
        e => {
            if (store.state.window_recently_scrolled) return
            try_update_hovered_team(e, all_data, store, options)
        }
    )

    main_canvas_el.addEventListener(
        'mouseup',
        e => {
            if (e.button !== 0) return
            if (options.highlight_team_history_on_click) {
                try_highlight_team(e, all_data, store, options)
            }
        }
    )

    hor_buttons?.left_button.wrapper.addEventListener(
        'mouseup',
        e => e.button === 0 && try_update_scroll_round_index(-1, all_data, store, the_root_element, options)
    )
    hor_buttons?.right_button.wrapper.addEventListener(
        'mouseup',
        e => e.button === 0 && try_update_scroll_round_index(1, all_data, store, the_root_element, options)
    )




    root_elements.matches_scroller.addEventListener('scroll', e => {
        const max_scroll_top = root_elements.match_bodies_positioner.clientHeight - e.target.clientHeight
        e.target.scrollTop = Math.min(e.target.scrollTop, max_scroll_top)
    })



    main_canvas_el.addEventListener('mouseleave', e => {
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
