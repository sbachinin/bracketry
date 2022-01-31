import { draw_scores } from './draw_scores.mjs'
import { should_draw_seed, draw_seed } from './draw_seed.mjs'
import { draw_teams_titles } from './draw_teams_titles.mjs'

export const draw_regular_match = ({
    all_data,
    round_index,
    round_scroll_X,
    match,
    highlighted_team_id, // not provided when drawing static rounds
    options,
    ctx
}) => {
    const left_X = round_scroll_X || all_data.rounds[round_index].left_X

    if (highlighted_team_id) { // hide original non-highlighted match
        ctx.fillStyle = options.background_color
        ctx.fillRect(left_X, match.center_Y - options.min_height_per_match/2, all_data.rounds[round_index].width - 4, options.min_height_per_match)
    }

    ctx.textBaseline = 'middle'
    
    let current_X = left_X + options.match_padding_left
    
    if (should_draw_seed(round_index, options)) {
        draw_seed(match.sides, current_X, match.center_Y, options, ctx)
        current_X += options.seed_width
    }

    draw_teams_titles({
        sides: match.sides,
        current_X,
        match_center_Y: match.center_Y,
        highlighted_team_id,
        options,
        ctx
    })

    current_X += all_data.team_title_width + options.scores_left_margin
    if (!options.reduce_match_until_clicked && !options.reduce_match_until_hovered) {
        draw_scores(ctx, match, current_X, match.center_Y, options)
    }
}