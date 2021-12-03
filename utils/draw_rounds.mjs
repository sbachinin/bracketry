import { drawMatchesForRound } from './draw_matches_for_round.mjs'
import * as sizes from './sizes.mjs'

export const drawRounds = (allRounds, state, ctx) => {
    allRounds.forEach((roundData, roundIndex) => {
        ctx.font = sizes.HEADING_FONT_SIZE + 'px sans-serif'
        ctx.fillText(
            roundData.name,
            state.scrollX + sizes.ROUND_WIDTH * roundIndex + sizes.MATCH_HOR_MARGIN * 2 + sizes.MATCH_HOR_PADDING,
            sizes.ROUNDS_TITLE_UPPER_MARGIN)
    
        ctx.font = sizes.FONT_SIZE + 'px sans-serif'
        drawMatchesForRound(roundIndex, allRounds, ctx)
    })
}