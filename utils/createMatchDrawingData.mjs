import { getPlayerMeta } from './getPlayerMeta.mjs'
import * as sizes from './sizes.mjs'
        
const getRoundHighestY = (roundIndex, data, canvasEl) => {
    const distanceFromFinal = data.rounds.length - roundIndex - 1
    const numberOfMatches = Math.pow(2, distanceFromFinal)
    const roundHeight = numberOfMatches * (sizes.MATCH_HEIGHT + sizes.MATCH_VERT_MARGIN)

    // create an upper margin to center matches vertically in case they all fit the canvas
    const roundVerticalMargin = Math.max(0, (canvasEl.height - sizes.ROUNDS_TITLE_HEIGHT - roundHeight) / 2)
    return sizes.ROUNDS_TITLE_HEIGHT + roundVerticalMargin
}

export const createMatchDrawingData = (match, data, canvasEl) => {
    const roundIndex = data.rounds.findIndex(r => r.uuid.match(match.round_id))

    const roundHighestY = getRoundHighestY(roundIndex, data, canvasEl)

    return {
        firstPlayer: {
            name: getPlayerMeta(match, 0, data).short_name,
            score: match.teams[0].score.map(score => score.game)
        },
        secondPlayer: {
            name: getPlayerMeta(match, 1, data).short_name,
            score: match.teams[1].score.map(score => score.game)
        },
        positionX: sizes.ROUND_WIDTH * roundIndex,
        positionY: roundHighestY + (sizes.MATCH_HEIGHT + sizes.MATCH_VERT_MARGIN) * (match.order - 1)
    }
}