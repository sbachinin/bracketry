import { maybe_draw_expanded_match } from './maybe_draw_expanded_match.mjs'
import { draw_lines_for_match } from './draw_lines_for_match.mjs'
import { is_match_visible_Y } from '../utils/sizes.mjs'

const is_round_visible = (round, scroll_X, options, canvas_width) => {
    return (round.left_X + round.width) > scroll_X
        && (round.left_X - options.distance_between_rounds) < (scroll_X + canvas_width)
}


export const draw_rounds = (
    all_data,
    state,
    canvas_el,
    offscreen_canvas_el,
    options,
) => {
    const ctx = canvas_el.getContext('2d', { alpha: false })
    ctx.clearRect(0, 0, canvas_el.width, canvas_el.height)
    
    // there are 2 expanded matches when new match fades in and old fades out
    let matches_to_expand = []

    // draw rounds in reverse order
    // because score on hover must be drawn on top of next round
    for (let i=all_data.rounds.length-1; i>=0; i--) {
        if (is_round_visible(all_data.rounds[i], state.scroll_X, options, canvas_el.width)) {
            
            const round = all_data.rounds[i]
            const round_scroll_Y = round.height_deficit > 0
                ? Math.floor(round.height_deficit / 100 * state.scroll_Y)
                : 0
            
            ctx.drawImage(
                offscreen_canvas_el,
                round.left_X,
                round_scroll_Y,
                round.width,
                canvas_el.height,
                round.left_X,
                0,
                round.width,
                canvas_el.height,
            )

            // const round_scroll_Y_px = Math.floor(round.height_deficit / 100 * state.scroll_Y)

            round.matches.forEach(
                (m, m_i) => {
                    if (is_match_visible_Y(m, canvas_el.height)) {
                        draw_lines_for_match(all_data, i, m_i, m.center_Y, options, ctx)
                    }
                }
            )
        }
    }

    matches_to_expand.forEach(m => maybe_draw_expanded_match(m, state, canvas_el, options))

}