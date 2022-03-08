import { draw_team_title } from './draw_team_title.mjs'
import { is_round_visible_X, get_team_texts_offset } from '../utils/sizes.mjs'
import { get_match_center_scroll_Y, is_match_visible_Y } from '../utils/sizes.mjs'
import { should_draw_seed } from './draw_seed.mjs'
import { should_draw_nationalities } from './nationalities.mjs'


export const get_team_title_left_margin = (round_index, options) => {
    let x = options.match_padding_left
    if (should_draw_seed(round_index, options)) {
        x += options.seed_width
    }
    if (should_draw_nationalities(round_index, options)) {
        x += options.nationality_width
    }
    return x
}


// actually it's now just a team title with bg
export const draw_highlighted_matches_info = (
    all_data,
    state,
    options,
    highlight_ctx
) => {
    all_data.rounds.forEach((r, r_i) => {
        const round_scroll_X = r.left_X - state.scroll_X
        if (!is_round_visible_X(r.width, round_scroll_X, options)) return
        
        r.matches.forEach((match, match_index) => {
            const highlighted_side_index = match.sides.findIndex(s => {
                return (
                    s.id === state.highlighted_team_id
                    || (s.id === state.hovered_team_id && match.id === state.hovered_match_id)
                )
            })

            if (highlighted_side_index > -1) {
                highlight_ctx.translate(round_scroll_X + get_team_title_left_margin(r_i, options), 0)

                const center_scroll_Y = get_match_center_scroll_Y(r, state.scroll_Y, match_index, options)

                if (!is_match_visible_Y(center_scroll_Y, options)) return

            // hide original non-highlighted match under bg
                highlight_ctx.fillStyle = options.background_color
                highlight_ctx.textBaseline = 'middle'

                const bg_Y = center_scroll_Y - (
                    highlighted_side_index === 0
                    ? options.min_height_per_match/2 + options.connection_lines_width/2
                    : -options.connection_lines_width/2
                )

                highlight_ctx.fillRect(
                    0,
                    bg_Y,
                    all_data.team_title_width,
                    options.min_height_per_match/2
                )

                const offset = get_team_texts_offset(options)
                const text_center_Y = center_scroll_Y
                    - (highlighted_side_index === 0 ? offset : -offset) + 2

                draw_team_title({
                    title: match.sides[highlighted_side_index].title_to_display,
                    y: text_center_Y,
                    is_highlighted: true,
                    is_winner: match.sides[highlighted_side_index].isWinner,
                    options,
                    ctx: highlight_ctx
                })

                highlight_ctx.setTransform(1, 0, 0, 1, 0, 0)
            }
        })
    })
}