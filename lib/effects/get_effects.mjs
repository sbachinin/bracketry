import { animate_scroll_X_to_anchor_round } from '../horizontal_scroll/animate_scroll_X_to_anchor_round.mjs'
import { UPDATE_CURSOR, SCROLL, SCROLL_X, HANDLE_NEW_ANCHOR_ROUND,
    REDRAW_ROUNDS,
    SCROLL_ON_HIGHLIGHT, REDRAW_HIGHLIGHT, UPDATE_VERT_BUTTONS_DISABLED_STATE
} from './names.mjs'
import { maybe_draw_round_titles } from '../draw/round_titles.mjs'
import { draw_rounds } from '../draw/draw_rounds.mjs'
import { draw_highlighted_stuff } from '../draw/highlighted_stuff.mjs'
import { scroll_Y_to_round1_highlighted_match } from './scroll_Y_to_round1_highlighted_match.mjs'
import { handle_scroll } from './handle_scroll.mjs'
import { update_cursor } from './update_cursor.mjs'

export const get_effects = (
    store,
    all_data,
    options,
    root_elements
) => {
    const {
        main_canvas_el,
        round_titles_canvas_el,
        highlight_canvas_el
    } = root_elements

    return {
        [UPDATE_CURSOR]: () => update_cursor(store.state, options, main_canvas_el),

        [SCROLL]: () => handle_scroll(store),

        [SCROLL_X]: () => {            
            maybe_draw_round_titles(all_data, store.state, options, round_titles_canvas_el)
        },

        [UPDATE_VERT_BUTTONS_DISABLED_STATE]: () => {            
            root_elements.vert_buttons?.update_visibility(options, store.state.destination_scroll_Y)
        },

        [HANDLE_NEW_ANCHOR_ROUND]: () => {
            animate_scroll_X_to_anchor_round(all_data, store, main_canvas_el, options)
            
            root_elements.hor_buttons?.update_visibility(
                all_data, options, store.state.scroll_X_anchor_round_index)
        },

        [SCROLL_ON_HIGHLIGHT]: () => {
            scroll_Y_to_round1_highlighted_match(all_data.rounds, store, options, main_canvas_el.height)
        },

        [REDRAW_HIGHLIGHT]: () => {
            draw_highlighted_stuff(all_data, store.state, options, highlight_canvas_el)
        },

        [REDRAW_ROUNDS]: () => {
            draw_rounds(all_data, store.state, root_elements, options)
        }
    }
}