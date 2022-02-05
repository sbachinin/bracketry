import { draw_team_title } from './draw_team_title.mjs'
import { get_team_title_X } from './draw_match_info.mjs'
import { is_round_visible_X } from '../utils/sizes.mjs'
import { get_match_center_scroll_Y } from '../utils/sizes.mjs'

// actually it's now just a team title with bg
export const draw_highlighted_matches_info = (
    all_data,
    state,
    options,
    highlight_ctx
) => {
    all_data.rounds.forEach((r, r_i) => {
        const round_scroll_X = r.left_X - state.scroll_X
        if (!is_round_visible_X(r.width, round_scroll_X, options, highlight_ctx.canvas.width)) return
        
        r.matches.forEach((match, match_index) => {
            const highlighted_side_index = match.sides.findIndex(s => s.id === state.highlighted_team_id)

            if (highlighted_side_index > -1) {
                const x = get_team_title_X(round_scroll_X, r_i, options)
                const center_scroll_Y = get_match_center_scroll_Y(r, state.scroll_Y, match_index, options)

            // hide original non-highlighted match under bg
                highlight_ctx.fillStyle = options.background_color
                highlight_ctx.textBaseline = 'middle'

                const bg_Y = center_scroll_Y
                    - (highlighted_side_index === 0 ? options.min_height_per_match/2 : 0)
                highlight_ctx.fillRect(
                    x,
                    bg_Y,
                    all_data.team_title_width,
                    options.min_height_per_match/2
                )

                const offset = options.vert_gap_between_opponents/2 + options.team_title_font_size/2
                const text_center_Y = center_scroll_Y
                    - (highlighted_side_index === 0 ? offset : -offset) + 2

                draw_team_title({
                    title: match.sides[highlighted_side_index].title_to_display,
                    x,
                    y: text_center_Y,
                    is_highlighted: true,
                    is_winner: match.sides[highlighted_side_index].isWinner,
                    options,
                    ctx: highlight_ctx
                })
            }
        })
    })
}