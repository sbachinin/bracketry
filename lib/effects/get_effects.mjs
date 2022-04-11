import {
    UPDATE_CURSOR, REDRAW_ROUND_TITLES, UPDATE_CANVAS_SCROLLABILITY,
    FULL_REDRAW_MATCHES, UPDATE_VERT_BUTTONS_DISABLED_STATE,
    SCHEDULE_FORGET_SCROLL_Y, HANDLE_ANCHOR_ROUND
} from './names.mjs'
import { maybe_draw_round_titles } from '../draw/round_titles.mjs'
import { full_redraw_matches } from '../draw/full_redraw_matches.mjs'
import { update_cursor } from './update_cursor.mjs'
import { schedule_forget_scroll_Y } from './schedule_forget_scroll_Y.mjs'
import { switch_anchor_round } from './switch_anchor_round.mjs'

export const get_effects = (
    store,
    all_data,
    options,
    root_elements
) => {
    return {
        [UPDATE_CURSOR]: () => update_cursor(store.state, options, root_elements.main_canvas_el),

        [REDRAW_ROUND_TITLES]: () => {
            maybe_draw_round_titles(all_data, store.state, options, root_elements.round_titles_canvas_el)
        },

        [SCHEDULE_FORGET_SCROLL_Y]: () => {
            schedule_forget_scroll_Y(store.update_state)
        },

        [UPDATE_VERT_BUTTONS_DISABLED_STATE]: () => {
            root_elements.vert_buttons?.update_visibility(options, store.state.destination_scroll_Y)
        },

        [HANDLE_ANCHOR_ROUND]: (state, old_state) => {
            switch_anchor_round(
                all_data,
                state, old_state,
                options,
                root_elements
            )
        },

        [FULL_REDRAW_MATCHES]: () => {
            full_redraw_matches(all_data, options, store, root_elements)
        },

        [UPDATE_CANVAS_SCROLLABILITY]: () => {
            root_elements.matches_scroller.style.overflowY = (
                store.state.window_recently_scrolled
                    ? 'hidden'
                    : 'scroll'
            )
        }
    }
}