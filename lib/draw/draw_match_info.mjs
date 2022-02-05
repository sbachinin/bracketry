import { draw_scores } from './draw_scores.mjs'
import { should_draw_seed, draw_seed } from './draw_seed.mjs'
import { draw_teams_titles } from './draw_teams_titles.mjs'

export const get_team_title_X = (round_left_X, round_index, options) => {
    let x = round_left_X + options.match_padding_left
    if (should_draw_seed(round_index, options)) {
        x += options.seed_width
    }
    return x
}

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
    
    if (should_draw_seed(round_index, options)) {
        draw_seed({
            match,
            x: left_X + options.match_padding_left,
            options,
            ctx
        })
    }

    const team_title_X = get_team_title_X(left_X, round_index, options)
    draw_teams_titles({
        match,
        x: team_title_X,
        options,
        ctx
    })

    if (!options.reduce_match_until_clicked && !options.reduce_match_until_hovered) {
        draw_scores({
            ctx,
            match,
            x: team_title_X + team_title_width + options.scores_left_margin,
            options
        })
    }
}