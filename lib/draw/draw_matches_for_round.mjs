import { draw_scores } from './draw_scores.mjs'
import { should_draw_seed, draw_seed } from './draw_seed.mjs'
import { draw_teams_titles } from './draw_teams_titles.mjs'

export const draw_matches_for_round = (
    round_index,
    all_data,
    canvas_el,
    options
) => {


    const round_data = all_data.rounds[round_index]
    round_data.matches.forEach((match, match_index) => {
        const { center_Y, sides } = match
        
        // match is invisible in this scrollY position
        // if (center_Y < get_round_title_height(options) || center_Y > canvas_el.height) return
        
        // if (
        //     match.id === state.expanded_match_id
        //     || match.id === state.previous_expanded_match_id
        // ) {
        //     add_match_to_expand({
        //         ...match,
        //         collapsed_left_X: round_data.left_X,
        //         collapsed_width: round_data.width
        //     })
        // }

        const ctx = canvas_el.getContext('2d', { alpha: false })
        ctx.textBaseline = 'middle'
        
        let current_X = round_data.left_X + options.match_padding_left
        
        if (should_draw_seed(round_index, options)) {
            draw_seed(sides, current_X, center_Y, options, ctx)
            current_X += options.seed_width
        }

        draw_teams_titles(sides, current_X, center_Y, options, ctx)

        current_X += all_data.team_title_width + options.scores_left_margin
        if (!options.reduce_match_until_clicked && !options.reduce_match_until_hovered) {
            draw_scores(ctx, match, current_X, options)
        }

    })
}