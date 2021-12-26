import * as constants from './constants.mjs'

export const get_match_drawing_data = (match_data, freeHeightPerMatch, roundIndex, state) => {
    const first_team_score = match_data.teams[0].score.map(score => score.game)
    const second_team_score = match_data.teams[1].score.map(score => score.game)

    const positionX = state.scrollX + constants.ROUND_WIDTH * roundIndex
    const positionY = constants.ROUNDS_TITLE_HEIGHT + freeHeightPerMatch * (match_data.order - 1)

    const match_body_width = constants.ROUND_WIDTH - constants.MATCH_HOR_MARGIN * 2
    const match_body_height = Math.min(freeHeightPerMatch, constants.MATCH_MAX_HEIGHT) * 0.8
    const centerY = positionY + freeHeightPerMatch / 2
    const match_body_Y = centerY - match_body_height / 2
    const first_team_title = match_data.teams[0].players[0].shortName
    const second_team_title = match_data.teams[1].players[0].shortName

    return {
        positionX,
        positionY,
        match_body_width,
        match_body_height,
        centerY,
        match_body_Y,
        first_team_title,
        second_team_title,
        first_team_score,
        second_team_score
    }
}
