import * as constants from './constants.mjs'

export const draw_scores = (ctx, match_data) => {
    ctx.fillText(
        match_data.first_team_score.join(' '),
        match_data.positionX + constants.ROUND_WIDTH - 100,
        match_data.centerY - match_data.match_body_height / 10)
    ctx.fillText(
        match_data.second_team_score.join(' '),
        match_data.positionX + constants.ROUND_WIDTH - 100,
        match_data.centerY + constants.FONT_SIZE + match_data.match_body_height / 10)
}