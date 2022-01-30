import { draw_scores } from './draw_scores.mjs'
import { should_draw_seed, draw_seed } from './draw_seed.mjs'
import { draw_teams_titles } from './draw_teams_titles.mjs'

export const draw_static_matches_for_round = (
    round_index,
    all_data,
    offscreen_canvas_el,
    options
) => {
    const round = all_data.rounds[round_index]
    round.matches.forEach(match => {
        const match_center_Y = round.height_per_match * (match.order - 0.5)

        const ctx = offscreen_canvas_el.getContext('2d', { alpha: false })
        ctx.textBaseline = 'middle'
        
        let current_X = round.left_X + options.match_padding_left
        
        if (should_draw_seed(round_index, options)) {
            draw_seed(match.sides, current_X, match_center_Y, options, ctx)
            current_X += options.seed_width
        }

        draw_teams_titles({
            sides: match.sides,
            current_X,
            match_center_Y,
            options,
            ctx
        })

        current_X += all_data.team_title_width + options.scores_left_margin
        if (!options.reduce_match_until_clicked && !options.reduce_match_until_hovered) {
            draw_scores(ctx, match, current_X, match_center_Y, options)
        }

    })
}