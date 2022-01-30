import { maybe_draw_expanded_match } from './maybe_draw_expanded_match.mjs'
import { draw_lines_for_match } from './draw_lines_for_match.mjs'
import { is_match_visible_Y } from '../utils/sizes.mjs'

const is_round_visible = (round_width, round_scroll_X, options, canvas_width) => {
    return (round_scroll_X + round_width) > 0
        && (round_scroll_X - options.distance_between_rounds) < canvas_width
}


export const draw_rounds = (
    all_data,
    state,
    main_canvas_el,
    offscreen_canvas_el,
    options,
) => {
    const ctx = main_canvas_el.getContext('2d', { alpha: false })
    ctx.clearRect(0, 0, main_canvas_el.width, main_canvas_el.height)
    
    // there are 2 expanded matches when new match fades in and old fades out
    let matches_to_expand = []

    // draw rounds in reverse order
    // because score on hover must be drawn on top of next round
    for (let r_i=all_data.rounds.length-1; r_i>=0; r_i--) {
        const round = all_data.rounds[r_i]
        const round_scroll_X = round.left_X - state.scroll_X

        if (is_round_visible(round.width, round_scroll_X, options, main_canvas_el.width)) {
            const round_scroll_Y = round.height_deficit > 0
                ? Math.floor(round.height_deficit / 100 * state.scroll_Y)
                : 0
        
    // draw matches without lines
            ctx.drawImage(
                offscreen_canvas_el,
                round.left_X,
                round_scroll_Y,
                round.width,
                main_canvas_el.height,
                round_scroll_X,
                0,
                round.width,
                main_canvas_el.height,
            )

            const matches_to_expand = []

            round.matches.forEach(
                match => {
    // draw lines
                    if (is_match_visible_Y(match, main_canvas_el.height)) {
                        draw_lines_for_match({
                            this_round: round,
                            this_round_scroll_X: round_scroll_X,
                            previous_round: all_data.rounds[r_i - 1],
                            match,
                            state,
                            options,
                            ctx
                        })

        
                        if (
                            match.id === state.expanded_match_id
                            || match.id === state.previous_expanded_match_id
                        ) {
                            matches_to_expand.push({
                                ...match,
                                collapsed_left_X: round.left_X,
                                collapsed_width: round.width
                            })
                        }
                    }
                }
            )

    // draw highlighted match + previously highlighted match, if transition isn't finished
            // (must be drawn after all collapsed matches to be on top of them)
            matches_to_expand.forEach(match => maybe_draw_expanded_match({match, state, main_canvas_el, options}))
        }
    }


}