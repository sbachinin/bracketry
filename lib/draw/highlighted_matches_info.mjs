import { draw_match_info } from './draw_match_info.mjs'
import { is_round_visible_X } from '../utils/sizes.mjs'
import { get_match_center_scroll_Y } from '../utils/sizes.mjs'

export const draw_highlighted_matches_info = (
    all_data,
    state,
    options,
    highlight_ctx
) => {
    all_data.rounds.forEach((r, round_index) => {
        const round_scroll_X = r.left_X - state.scroll_X
        if (!is_round_visible_X(r.width, round_scroll_X, options, highlight_ctx.canvas.width)) return
        
        r.matches.forEach((match, match_index) => {
            if (match.sides.find(s => s.id === state.highlighted_team_id)) {
                const center_scroll_Y = get_match_center_scroll_Y(r, state.scroll_Y, match_index, options)

            // hide original non-highlighted match under bg
                highlight_ctx.fillStyle = options.background_color
                highlight_ctx.fillRect(
                    round_scroll_X,
                    center_scroll_Y - options.min_height_per_match/2,
                    all_data.rounds[round_index].width - options.connection_lines_width,
                    options.min_height_per_match
                )

                draw_match_info({
                    team_title_width: all_data.team_title_width,
                    round_index,
                    left_X: round_scroll_X,
                    match: { ...match, center_scroll_Y },
                    highlighted_team_id: state.highlighted_team_id,
                    options,
                    ctx: highlight_ctx
                })
            }
        })
    })
}