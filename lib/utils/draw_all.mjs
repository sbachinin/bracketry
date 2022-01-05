import { draw_rounds } from './draw_rounds.mjs'
import { get_match_center_Y } from './sizes.mjs'

export const draw_all = (
    all_rounds_data,
    state,
    canvas_el,
    options,
    basic_drawing_attrs
) => {
    if (!canvas_el.getContext) return
    const ctx = canvas_el.getContext('2d')

    ctx.clearRect(0, 0, canvas_el.width, canvas_el.height)

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
                            center_Y: get_match_center_Y(
                                options,
                                height_per_match,
                                match_data.order,
                                round_scroll_Y
                            )
                        }
                    })
            }
        })

    draw_rounds(
        rounds_with_drawing_data,
        state,
        ctx,
        options,
        basic_drawing_attrs
    )
}