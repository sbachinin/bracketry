import {
    UPDATE_CANVAS_SCROLLABILITY,
    FULL_REDRAW,
    REDRAW_CANVAS
} from './names.mjs'
import { full_redraw_matches } from '../draw/full_redraw_matches.mjs'
import { redraw_canvas } from '../draw/lines_canvas.mjs'


export const get_effects = (
    store,
    all_data,
    options,
    stable_elements
) => {
    return {
        // [SCHEDULE_FORGET_SCROLL_Y]: () => {
        //     schedule_forget_scroll_Y(store.update_state)
        // },

        justidea____handle_anchor_index: () => {
            // set new style.left to horizontal scroller
            // set new height to content_area
            // set scrollTop
            // redraw lines
            // update buttons active and disabled state
            // update scrollbar
        },

        [FULL_REDRAW]: () => {
            full_redraw_matches(all_data, options, store, stable_elements)
            redraw_canvas(
                all_data,
                store.state,
                options,
                stable_elements)
        },

        [REDRAW_CANVAS]: () => {
            redraw_canvas(
                all_data,
                store.state,
                options,
                stable_elements)
        },

        [UPDATE_CANVAS_SCROLLABILITY]: () => {
            stable_elements.matches_vertical_scroller.style.overflowY = (
                store.state.window_recently_scrolled
                    ? 'hidden'
                    : 'scroll'
            )
        }
    }
}