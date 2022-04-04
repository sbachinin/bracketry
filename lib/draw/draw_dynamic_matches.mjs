import { maybe_draw_lines_for_match } from './lines_for_match.mjs'
import { allocate_match } from './allocate_match.mjs'
import { draw_highlighted_line } from './highlighted_line.mjs'

import {
    is_round_visible_X,
    get_match_body_height,
    get_match_center_Y
} from '../utils/sizes.mjs'

// draw scroll-aware rounds with connection lines
export const draw_dynamic_matches = (
    all_data,
    state,
    { main_canvas_el, offscreen_canvas },
    options
) => {

    const ctx = main_canvas_el.getContext('2d', { alpha: false })
    ctx.clearRect(0, 0, main_canvas_el.width, main_canvas_el.height)
    ctx.lineJoin = 'round'

    all_data.rounds.forEach((round, round_index) => {
        if (!is_round_visible_X(all_data.width_per_round, round.static_left_X)) return

        round.matches.forEach(
            (match, match_index) => {
                const match_body_center_Y = get_match_center_Y(all_data, round_index, match_index, state, options)

                const match_body_top_Y = match_body_center_Y - get_match_body_height(options) / 2

                if (
                    match_body_top_Y > main_canvas_el.height
                    || (match_body_top_Y + get_match_body_height(options)) < 0
                ) return
                
                allocate_match(
                    all_data,
                    match.id,
                    match_body_top_Y,
                    round.static_left_X,
                    options,
                    offscreen_canvas
                )

                maybe_draw_lines_for_match({
                    all_data,
                    match_id: match.id,
                    state,
                    options,
                    ctx
                })
            }
        )
    })

    if (typeof state.highlighted_team_id === 'string') {
        draw_highlighted_line({
            all_data,
            state,
            options,
            ctx
        })
    }
}