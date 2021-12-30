import { get_round_left_X, get_round_title_height } from './sizes.mjs'
import * as constants from './constants.mjs'

export const get_match_drawing_data = (
    match_data,
    free_height_per_match,
    round_index,
    state,
    options
) => {
    const first_team_score = match_data.teams[0].score.map(score => score.game)
    const second_team_score = match_data.teams[1].score.map(score => score.game)

    const positionX = get_round_left_X(options, round_index) + state.scrollX

    const positionY = get_round_title_height(options)
        + free_height_per_match * (match_data.order - 1)

    const match_body_height = free_height_per_match * 0.8
    const centerY = positionY + free_height_per_match / 2
    const match_body_Y = centerY - match_body_height / 2
    const first_team_title = match_data.teams[0].players[0].shortName
    const second_team_title = match_data.teams[1].players[0].shortName

    return {
        positionX,
        positionY,
        match_body_height,
        centerY,
        match_body_Y,
        first_team_title,
        second_team_title,
        first_team_score,
        second_team_score
    }
}
