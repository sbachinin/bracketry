import { draw_rounds } from './draw_rounds.mjs'
import { get_match_drawing_data } from './get_match_drawing_data.mjs'
import * as constants from './constants.mjs'

export const draw_all = (allData, state, canvasEl, options) => {
    if (!canvasEl.getContext) return
    const ctx = canvasEl.getContext('2d');

    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    const rounds_with_drawing_data = allData.rounds.map((round_data, round_index) => {
        const visible_height_per_match = (
            (canvasEl.height - constants.ROUNDS_TITLE_HEIGHT)
            / round_data.matches.length
        )
        const free_height_per_match = Math.max(
            visible_height_per_match,
            constants.MATCH_MIN_HEIGHT
        )

        return {
            ...round_data,
            matches_to_draw: round_data.matches.map(
                match => get_match_drawing_data(match, free_height_per_match, round_index, state))
        }
    })

    draw_rounds(rounds_with_drawing_data, state, ctx, options)
}