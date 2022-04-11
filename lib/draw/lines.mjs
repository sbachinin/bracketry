import { maybe_draw_lines_for_match } from './lines_for_match.mjs'
import { draw_highlighted_line } from './highlighted_line.mjs'
import { is_round_visible_X } from '../utils/sizes.mjs'

export const draw_lines = (
    all_data,
    state,
    { main_canvas_el },
    options
) => {
    const ctx = main_canvas_el.getContext('2d', { alpha: false })
    ctx.clearRect(0, 0, main_canvas_el.width, main_canvas_el.height)
    ctx.lineJoin = 'round'

    all_data.rounds.forEach((round) => {
        if (!is_round_visible_X(all_data.width_per_round, round.static_left_X)) return

        round.matches.forEach(
            (match) => {
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