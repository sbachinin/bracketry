import { draw_rounds } from './draw_rounds.mjs'
import { get_round_title_height } from '../sizes.mjs'

export const draw_all = (
    all_rounds_data,
    state,
    canvas_el,
    options,
    basic_drawing_attrs
) => {
    // have to get all matches' centerY before drawing
    // because centerYs of 'parent' matches are needed to draw connections
    const rounds_with_drawing_data = all_rounds_data
        .map((round_data, round_index) => {
            const {
                height_deficit,
                height_per_match
            } = basic_drawing_attrs.rounds_drawing_attrs[round_index]

            const round_scroll_Y = height_deficit > 0
                ? height_deficit / 100 * state.scroll_Y
                : 0

            return {
                ...round_data,
                matches: round_data.matches
                    .map(match_data => {
                        return {
                            ...match_data,
                            center_Y: get_round_title_height(options)
                                + height_per_match * (match_data.order - 0.5)
                                - round_scroll_Y
                        }
                    })
            }
        })

    draw_rounds(
        rounds_with_drawing_data,
        state,
        canvas_el,
        options,
        basic_drawing_attrs
    )
}