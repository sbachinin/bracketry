import * as constants from './constants.mjs'

export const draw_scores = (ctx, matchData) => {
    ctx.fillText(
        matchData.first_team_score.join(' '),
        matchData.positionX + constants.ROUND_WIDTH - 100,
        matchData.centerY - matchData.match_body_height / 10)
    ctx.fillText(
        matchData.second_team_score.join(' '),
        matchData.positionX + constants.ROUND_WIDTH - 100,
        matchData.centerY + constants.FONT_SIZE + matchData.match_body_height / 10)
}