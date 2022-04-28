import {
    UPDATE_CANVAS_SCROLLABILITY,
    HANDLE_NEW_HIGHLIGHT,
    SCHEDULE_FORGET_SCROLL_Y, HANDLE_ANCHOR_ROUND
} from './names.mjs'
import { full_redraw_matches } from '../draw/full_redraw_matches.mjs'
import { schedule_forget_scroll_Y } from './schedule_forget_scroll_Y.mjs'

export const get_effects = (
    store,
    all_data,
    options,
    root_elements
) => {
    return {
        [SCHEDULE_FORGET_SCROLL_Y]: () => {
            schedule_forget_scroll_Y(store.update_state)
        },

        // [UPDATE_VERT_BUTTONS_DISABLED_STATE]: () => {
        //     root_elements.vert_buttons?.update_visibility(options, store.state.destination_scroll_Y)
        // },

        [HANDLE_ANCHOR_ROUND]: () => {
            full_redraw_matches(all_data, options, store, root_elements)
        },

        [HANDLE_NEW_HIGHLIGHT]: () => {
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