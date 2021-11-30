import { drawMatchesForRound } from './draw_matches_for_round.mjs'
import * as sizes from './sizes.mjs'
export const drawRounds = (allRounds, ctx) => {
    allRounds.forEach((roundData, roundIndex) => {
        ctx.font = sizes.HEADING_FONT_SIZE + 'px sans-serif';
        ctx.fillText(
            roundData.name,
            sizes.ROUND_WIDTH * roundIndex + sizes.MATCH_HOR_MARGIN + sizes.MATCH_HOR_PADDING,
            50);
    
        ctx.font = sizes.FONT_SIZE + 'px sans-serif';
        drawMatchesForRound(roundIndex, allRounds, ctx)
    })
}