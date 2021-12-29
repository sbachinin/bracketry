import { draw_matches_for_round } from './draw_matches_for_round.mjs'
import { get_round_left_X } from './sizes.mjs'
import * as constants from './constants.mjs'

export const draw_rounds = (allRounds, state, ctx, options) => {
    allRounds.forEach((round_data, round_index) => {
        ctx.font = constants.HEADING_FONT_SIZE + 'px sans-serif'
        ctx.fillText(
            round_data.name,
            (
                get_round_left_X(options, round_index) + state.scrollX
                + constants.MATCH_HOR_PADDING
            ),
            constants.ROUNDS_TITLE_UPPER_MARGIN)

        draw_matches_for_round(round_index, allRounds, ctx, options)
    })
}