import { draw_match_info } from './draw_match_info.mjs'

export const draw_highlighted_match = ({
    all_data,
    round_index,
    left_X,
    match,
    highlighted_team_id,
    options,
    ctx
}) => {
    // hide original non-highlighted match
    ctx.fillStyle = options.background_color
    ctx.fillRect(left_X, match.center_scroll_Y - options.min_height_per_match/2, all_data.rounds[round_index].width - 4, options.min_height_per_match)

    draw_match_info({
        team_title_width: all_data.team_title_width,
        round_index,
        left_X,
        match,
        highlighted_team_id,
        options,
        ctx
    })
}