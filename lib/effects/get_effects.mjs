import {
    UPDATE_CANVAS_SCROLLABILITY,
    FULL_REDRAW
} from './names.mjs'
import { full_redraw_matches } from '../draw/full_redraw_matches.mjs'

export const get_effects = (
    store,
    all_data,
    options,
    root_elements
) => {
    return {
        // [SCHEDULE_FORGET_SCROLL_Y]: () => {
        //     schedule_forget_scroll_Y(store.update_state)
        // },

        [FULL_REDRAW]: () => {
            full_redraw_matches(all_data, options, store, root_elements)
        },

        [UPDATE_CANVAS_SCROLLABILITY]: () => {
            root_elements.matches_vertical_scroller.style.overflowY = (
                store.state.window_recently_scrolled
                    ? 'hidden'
                    : 'scroll'
            )
        }
    }
}