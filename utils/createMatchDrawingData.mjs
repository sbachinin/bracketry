import { getPlayerMeta } from './getPlayerMeta.mjs'
import * as sizes from './sizes.mjs'

const getHeightPerMatch = (roundIndex, allData, canvasEl) => {
    const distanceFromFinal = allData.rounds.length - roundIndex - 1
    const numberOfMatches = Math.pow(2, distanceFromFinal)
    const visibleHeightPerMatch = (canvasEl.height - sizes.ROUNDS_TITLE_HEIGHT) / numberOfMatches
    return Math.max(visibleHeightPerMatch, sizes.MATCH_MIN_HEIGHT)
}

export const createMatchDrawingData = (match, allData, canvasEl) => {
    const roundIndex = allData.rounds.findIndex(r => r.uuid.match(match.round_id))
    const heightPerMatch = getHeightPerMatch(roundIndex, allData, canvasEl)

    return {
        firstPlayer: {
            name: getPlayerMeta(match, 0, allData).short_name,
            score: match.teams[0].score.map(score => score.game)
        },
        secondPlayer: {
            name: getPlayerMeta(match, 1, allData).short_name,
            score: match.teams[1].score.map(score => score.game)
        },
        positionX: sizes.ROUND_WIDTH * roundIndex,
        positionY: sizes.ROUNDS_TITLE_HEIGHT + heightPerMatch * (match.order - 1),
        availableHeight: heightPerMatch
    }
}