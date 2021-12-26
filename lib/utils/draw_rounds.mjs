import { draw_matches_for_round } from './draw_matches_for_round.mjs'
import * as constants from './constants.mjs'

export const draw_rounds = (allRounds, state, ctx, options) => {
    allRounds.forEach((round_data, roundIndex) => {
        ctx.font = constants.HEADING_FONT_SIZE + 'px sans-serif'
        ctx.fillText(
            round_data.name,
            state.scrollX + constants.ROUND_WIDTH * roundIndex + constants.MATCH_HOR_MARGIN + constants.MATCH_HOR_PADDING,
            constants.ROUNDS_TITLE_UPPER_MARGIN)
    
        ctx.font = constants.FONT_SIZE + 'px sans-serif'
        draw_matches_for_round(roundIndex, allRounds, ctx, options)
    })
}