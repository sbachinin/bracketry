import { drawMatchesForRound } from './draw_matches_for_round.mjs'
import * as constants from './constants.mjs'

export const drawRounds = (allRounds, state, ctx) => {
    allRounds.forEach((roundData, roundIndex) => {
        ctx.font = constants.HEADING_FONT_SIZE + 'px sans-serif'
        ctx.fillText(
            roundData.name,
            state.scrollX + constants.ROUND_WIDTH * roundIndex + constants.MATCH_HOR_MARGIN + constants.MATCH_HOR_PADDING,
            constants.ROUNDS_TITLE_UPPER_MARGIN)
    
        ctx.font = constants.FONT_SIZE + 'px sans-serif'
        drawMatchesForRound(roundIndex, allRounds, ctx)
    })
}