import { draw_scores } from './draw_scores.mjs'
import { should_draw_seed, draw_seed } from './draw_seed.mjs'
import { draw_teams_titles } from './draw_teams_titles.mjs'

export const draw_match_info = ({
    team_title_width,
    round_index,
    left_X,
    match,
    highlighted_team_id, // not provided when drawing static rounds
    options,
    ctx
}) => {
    ctx.textBaseline = 'middle'
    
    let current_X = left_X + options.match_padding_left
    
    if (should_draw_seed(round_index, options)) {
        draw_seed({ match, current_X, options, ctx })
        current_X += options.seed_width
    }

    draw_teams_titles({
        match,
        current_X,
        highlighted_team_id,
        options,
        ctx
    })

    current_X += team_title_width + options.scores_left_margin
    if (!options.reduce_match_until_clicked && !options.reduce_match_until_hovered) {
        draw_scores({ ctx, match, current_X, highlighted_team_id, options })
    }
}