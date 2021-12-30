import { draw_rounds } from './draw_rounds.mjs'
import { get_round_title_height } from './sizes.mjs'
import { get_match_drawing_data } from './get_match_drawing_data.mjs'
import * as constants from './constants.mjs'

export const draw_all = (all_data, state, canvas_el, options) => {
    if (!canvas_el.getContext) return
    const ctx = canvas_el.getContext('2d');

    ctx.clearRect(0, 0, canvas_el.width, canvas_el.height);

    const rounds_with_drawing_data = all_data.rounds.map((round_data, round_index) => {
        const visible_height_per_match = (
            (canvas_el.height - get_round_title_height(options))
            / round_data.matches.length
        )
        const free_height_per_match = Math.max(
            visible_height_per_match,
            options.minimal_height_per_match
        )

        return {
            ...round_data,
            matches_to_draw: round_data.matches.map(
                match => get_match_drawing_data(
                    match,
                    free_height_per_match,
                    round_index,
                    state,
                    options
                ))
        }
    })

    draw_rounds(rounds_with_drawing_data, state, ctx, options)
}