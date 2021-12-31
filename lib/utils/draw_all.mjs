import { draw_rounds } from './draw_rounds.mjs'
import { get_match_center_Y, get_round_drawing_attrs } from './sizes.mjs'

export const draw_all = (all_data, state, canvas_el, options) => {
    if (!canvas_el.getContext) return
    const ctx = canvas_el.getContext('2d')

    ctx.clearRect(0, 0, canvas_el.width, canvas_el.height)

    // have to get all matches' centerY before drawing
    // because centerYs of 'parent' matches are needed to draw connections
    const rounds_with_drawing_data = all_data.rounds
        .map(round_data => {
            const { round_scroll_Y, height_per_match } = get_round_drawing_attrs(
                round_data,
                options,
                state.scroll_Y,
                canvas_el.height
            )

            return {
                ...round_data,
                matches: round_data.matches
                    .map(match_data => ({
                        ...match_data,
                        center_Y: get_match_center_Y(
                            options,
                            height_per_match,
                            match_data.order,
                            round_scroll_Y
                        )
                    }))
            }
        })

    draw_rounds(rounds_with_drawing_data, state, ctx, options)
}