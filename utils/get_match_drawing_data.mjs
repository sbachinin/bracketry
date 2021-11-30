import * as sizes from './sizes.mjs'

export const getMatchDrawingData = (matchData, freeHeightPerMatch, roundIndex, state) => {
    const score = matchData.teams[1].score.map(score => score.game)
    const positionX = state.scrollX + sizes.ROUND_WIDTH * roundIndex
    const positionY = sizes.ROUNDS_TITLE_HEIGHT + freeHeightPerMatch * (matchData.order - 1)

    const matchBodyWidth = sizes.ROUND_WIDTH - sizes.MATCH_HOR_MARGIN * 2
    const matchBodyHeight = Math.min(freeHeightPerMatch, sizes.MATCH_MAX_HEIGHT) * 0.8
    const centerY = positionY + freeHeightPerMatch / 2
    const matchBodyY = centerY - matchBodyHeight / 2
    const firstTeamTitle = matchData.teams[0].players[0].shortName
    const secondTeamTitle = matchData.teams[1].players[0].shortName

    return {
        positionX,
        positionY,
        matchBodyWidth,
        matchBodyHeight,
        centerY,
        matchBodyY,
        score,
        firstTeamTitle,
        secondTeamTitle
    }
}
