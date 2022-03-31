import { try_highlight_team } from './try_highlight_team.mjs'
import { was_window_recently_scrolled } from './remember_window_scroll.mjs'
import { get_wheel_handler } from './get_wheel_handler.mjs'
import { try_update_hovered_team } from './try_update_hovered_team.mjs'
import { handle_hor_buttons_clicks } from './handle_hor_buttons_clicks.mjs'
import { handle_vert_buttons_clicks } from './handle_vert_buttons_clicks.mjs'

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
            if (was_window_recently_scrolled()) return
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
                handle_hor_buttons_clicks(e, root_elements.hor_buttons, all_data, store, options)
            }

            if (root_elements.vert_buttons !== null) {
                handle_vert_buttons_clicks(e, root_elements.vert_buttons, all_data, store, options)
            }
        }
    )



    // - state.scroll_Y is expressed not in pixels (because every round has its own pixel scroll_Y)
    // but in % of "overall scroll height" (or "height_deficit").
    // - When matches are drawn later,
    // they transform this % into pixel scroll_Y according to their particular width deficits.
    // - Single wheel move changes the scroll_Y of the leftmost (longest) round by 1 match height.
    // And, accordingly, it changes the 2nd round scroll_Y by 1/2 match height etc etc
    root_elements.main_canvas_el.addEventListener('wheel', get_wheel_handler(all_data, options, store))
    
    root_elements.main_canvas_el.addEventListener('mouseleave', e => {
        setTimeout(() => store.update_state({ hovered_team_id: null }), 100)
    })
}
