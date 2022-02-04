import { draw_expanded_matches } from '../draw/draw_expanded_matches.mjs'
import { animate_scroll_X_to_anchor_round } from '../horizontal_scroll/animate_scroll_X_to_anchor_round.mjs'
import { CURSOR, SCROLL_X, SCROLL_TO_NEW_ANCHOR_ROUND,
    REDRAW_ALL, REDRAW_EXPANDED_MATCHES, ANIMATE_EXPANDED_MATCH_CHANGE
} from '../store/effects.mjs'
import { animate_expanded_match } from './animate_expanded_match.mjs'
import { maybe_draw_round_titles } from '../draw/round_titles.mjs'
import { draw_rounds } from '../draw/draw_rounds.mjs'

export const set_effects = (
    all_data,
    options,
    store,
    buttons,
    main_canvas_el,
    round_titles_canvas_el,
    expand_canvas_el,
    offscreen_canvas,
    highlight_canvas_el
) => {
    store.on_update(CURSOR, () => {
        main_canvas_el.style.cursor = store.state.cursor
    })
    store.on_update(SCROLL_X, () => {
        buttons.update_visibility()
        maybe_draw_round_titles(all_data, store.state, options, round_titles_canvas_el)
    })
    store.on_update(SCROLL_TO_NEW_ANCHOR_ROUND, () => {
        animate_scroll_X_to_anchor_round(all_data, store, main_canvas_el, options)
    })
    store.on_update(REDRAW_EXPANDED_MATCHES, () => {
        draw_expanded_matches(all_data.rounds, store.state, expand_canvas_el, options)
    })
    store.on_update(ANIMATE_EXPANDED_MATCH_CHANGE, () => {
        animate_expanded_match(store.update_state)
    })
    store.on_update(REDRAW_ALL, () => {
        draw_rounds(
            all_data, store.state, main_canvas_el,
            offscreen_canvas.el, highlight_canvas_el,
            options)
    })
}