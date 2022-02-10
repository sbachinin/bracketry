import {
    set_new_expanded_match,
    update_expanded_match_on_mousemove
} from './try_update_expanded_match.mjs'
import { try_scroll_X_on_mousemove } from '../horizontal_scroll/try_scroll_X_on_mousemove.mjs'
import { maybe_start_dragging, maybe_drag, maybe_stop_drag } from './drag.mjs'
import { try_highlight_team } from './try_highlight_team.mjs'
import { was_window_recently_scrolled } from './remember_window_scroll.mjs'
import { try_set_tooltip } from './try_set_tooltip.mjs'
import { get_wheel_handler } from './get_wheel_handler.mjs'
import { try_update_hovered_stuff } from './try_update_hovered_stuff.mjs'
import { handle_hor_buttons_clicks } from './handle_hor_buttons_clicks.mjs'
import { handle_vert_buttons_clicks } from './handle_vert_buttons_clicks.mjs'

// here wrapper is passed instead of main_canvas_el
// because wheel event has to be handled on both main_canvas_el and hor scroll buttons
export const install_mouse_events = (
    all_data,
    options,
    store,
    root_elements,
) => {
    root_elements.wrapper.addEventListener(
        'mousemove',
        e => {
            if (was_window_recently_scrolled()) return
            
            try_scroll_X_on_mousemove(
                e, all_data.all_content_width, store.state, options,
                scroll_X => store.update_state({ scroll_X }),
            )
            
            maybe_drag(e, all_data, store, options)

            if (e.target === root_elements.main_canvas_el) {
                try_update_hovered_stuff(e, all_data.rounds, store, options)
    
                try_set_tooltip(e, all_data.rounds, store.state, options, store.update_state)
    
                options.reduce_match_until_hovered && update_expanded_match_on_mousemove(
                    e, all_data.rounds, store, options
                )
            }            
        }
    )



    root_elements.wrapper.addEventListener('mouseup',
        e => {            
            if (e.button !== 0) return

            if (e.target == root_elements.main_canvas_el) {
                if (options.reduce_match_until_clicked && !store.state.dragging) {
                    set_new_expanded_match(e, all_data.rounds, store, options)
                }
    
                if (options.highlight_team_history_on_click && !store.state.dragging) {
                    try_highlight_team(e, all_data.rounds, store, options)
                }
    
                maybe_stop_drag(e, all_data.all_content_width, store, options)

                return
            }
            
            if (root_elements.hor_buttons !== null) {
                handle_hor_buttons_clicks(e, root_elements.hor_buttons, all_data, store, options)
            }

            if (root_elements.vert_buttons !== null) {
                handle_vert_buttons_clicks(e, root_elements.vert_buttons, store, options)
            }
        }
    )



    // - state.scroll_Y is expressed not in pixels (because every round has its own pixel scroll_Y)
    // but in % of "overall scroll height" (or "height_deficit").
    // - When matches are drawn later,
    // they transform this % into pixel scroll_Y according to their particular width deficits.
    // - Single wheel move changes the scroll_Y of the leftmost (longest) round by 1 match height.
    // And, accordingly, it changes the 2nd round scroll_Y by 1/2 match height etc etc
    root_elements.wrapper.addEventListener('wheel', get_wheel_handler(all_data, options, store))



    root_elements.main_canvas_el.addEventListener("mousedown", e => maybe_start_dragging(e, all_data.rounds, store, options));
    
    root_elements.main_canvas_el.addEventListener('mouseleave', e => {
        maybe_stop_drag(e, all_data.all_content_width, store, options)
        
        setTimeout(() => store.update_state({ hovered_team_id: null, hovered_match_id: null }), 100)
    })
}
