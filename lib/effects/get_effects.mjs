import { draw_expanded_matches } from '../draw/draw_expanded_matches.mjs'
import { animate_scroll_X_to_anchor_round } from '../horizontal_scroll/animate_scroll_X_to_anchor_round.mjs'
import { CURSOR, SCROLL_X, SCROLL_TO_NEW_ANCHOR_ROUND,
    REDRAW_ALL, REDRAW_EXPANDED_MATCHES, ANIMATE_EXPANDED_MATCH_CHANGE,
    HANDLE_NEW_HIGHLIGHT
} from './names.mjs'
import { animate_expanded_match } from './animate_expanded_match.mjs'
import { maybe_scrollX_to_expanded_match } from './maybe_scrollX_to_expanded_match.mjs'
import { maybe_draw_round_titles } from '../draw/round_titles.mjs'
import { draw_rounds } from '../draw/draw_rounds.mjs'
import { scroll_Y_to_round1_highlighted_match } from './scroll_Y_to_round1_highlighted_match.mjs'

export const get_effects = (
    store,
    all_data,
    options,
    buttons,
    root_elements
) => {
    const { main_canvas_el, expand_canvas_el, round_titles_canvas_el } = root_elements

    return {
        [CURSOR]: () => {
            main_canvas_el.style.cursor = store.state.cursor
        },

        [SCROLL_X]: () => {
            buttons.update_visibility()
            maybe_draw_round_titles(all_data, store.state, options, round_titles_canvas_el)
        },

        [SCROLL_TO_NEW_ANCHOR_ROUND]: () => {
            animate_scroll_X_to_anchor_round(all_data, store, main_canvas_el, options)
        },

        [REDRAW_EXPANDED_MATCHES]: () => {
            draw_expanded_matches(all_data.rounds, store.state, expand_canvas_el, options)
        },

        [HANDLE_NEW_HIGHLIGHT]: () => {
            scroll_Y_to_round1_highlighted_match(all_data.rounds, store, options, main_canvas_el.height)
        },

        [ANIMATE_EXPANDED_MATCH_CHANGE]: () => {
            animate_expanded_match(store.update_state)
            maybe_scrollX_to_expanded_match(all_data.rounds, options, store, main_canvas_el.width)
        },

        [REDRAW_ALL]: () => {
            draw_rounds(all_data, store.state, root_elements, options)
        }
    }
}