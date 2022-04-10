import { UPDATE_CURSOR, REDRAW_ROUND_TITLES, UPDATE_CANVAS_SCROLLABILITY,
    FULL_REDRAW_MATCHES, UPDATE_VERT_BUTTONS_DISABLED_STATE,
    SCHEDULE_FORGET_SCROLL_Y, SCROLL_LEFT, SCROLL_RIGHT
} from './names.mjs'
import { maybe_draw_round_titles } from '../draw/round_titles.mjs'
import { full_redraw_matches } from '../draw/full_redraw_matches.mjs'
import { update_cursor } from './update_cursor.mjs'
import { schedule_forget_scroll_Y } from './schedule_forget_scroll_Y.mjs'

const scroll_to_new_anchor_round = (
    store,
    all_data,
    options,
    root_elements,
    direction
) => {
    const { matches_scroller: scroller } = root_elements
    
// move scrollable area to the left
    const marginLeft = -store.state.scroll_X_anchor_round_index * all_data.width_per_round + 'px'
    root_elements.matches_scrollable_area.style.marginLeft = marginLeft
    root_elements.round_titles_canvas_el.style.marginLeft = marginLeft

// shrink the positioner according to anchor round
    const anchor_round_height = Math.max(
        all_data.full_matches_content_height / Math.pow(2, store.state.scroll_X_anchor_round_index),
        scroller.clientHeight
    )
    root_elements.match_bodies_positioner.style.height = anchor_round_height + 'px'

// adjust scroll position to keep the same matches in the middle
    const scroll_factor = direction === 'left' ? 1/2 : 2
    scroller.scrollTop = (scroller.scrollTop + scroller.clientHeight / 2)
        * scroll_factor
        - scroller.clientHeight / 2
    


    root_elements.hor_buttons?.update_visibility(
        all_data, options, store.state.scroll_X_anchor_round_index)
}

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

        [SCROLL_LEFT]: () => {
            scroll_to_new_anchor_round(store,
                all_data,
                options,
                root_elements, 'left')
        },

        [SCROLL_RIGHT]: () => {
            scroll_to_new_anchor_round(store,
                all_data,
                options,
                root_elements, 'right')
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