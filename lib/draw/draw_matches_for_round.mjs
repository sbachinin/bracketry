import { draw_scores } from './draw_scores.mjs'
import { should_draw_seed, draw_seed } from './draw_seed.mjs'
import { draw_teams_titles } from './draw_teams_titles.mjs'

export const draw_matches_for_round = (
    round_index,
    all_data,
    canvas_el,
    options
) => {


    const round = all_data.rounds[round_index]
    round.matches.forEach(match => {
        const match_center_Y = round.height_per_match * (match.order - 0.5)
        
        // match is invisible in this scrollY position
        // if (match_center_Y < get_round_title_height(options) || match_center_Y > canvas_el.height) return
        
        // if (
        //     match.id === state.expanded_match_id
        //     || match.id === state.previous_expanded_match_id
        // ) {
        //     add_match_to_expand({
        //         ...match,
        //         collapsed_left_X: round.left_X,
        //         collapsed_width: round.width
        //     })
        // }

        const ctx = canvas_el.getContext('2d', { alpha: false })
        ctx.textBaseline = 'middle'
        
        let current_X = round.left_X + options.match_padding_left
        
        if (should_draw_seed(round_index, options)) {
            draw_seed(match.sides, current_X, match_center_Y, options, ctx)
            current_X += options.seed_width
        }

        draw_teams_titles(match.sides, current_X, match_center_Y, options, ctx)

        current_X += all_data.team_title_width + options.scores_left_margin
        if (!options.reduce_match_until_clicked && !options.reduce_match_until_hovered) {
            draw_scores(ctx, match, current_X, match_center_Y, options)
        }

    })
}