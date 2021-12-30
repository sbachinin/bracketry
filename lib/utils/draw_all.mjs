import { draw_rounds } from './draw_rounds.mjs'
import { get_matches_drawing_data } from './get_matches_drawing_data.mjs'

export const draw_all = (all_data, state, canvas_el, options) => {
    if (!canvas_el.getContext) return
    const ctx = canvas_el.getContext('2d');

    ctx.clearRect(0, 0, canvas_el.width, canvas_el.height);

    const rounds_with_drawing_data = all_data.rounds
        .map((round_data, round_index) => ({
            ...round_data,
            matches: get_matches_drawing_data(
                round_data,
                options,
                round_index,
                state,
                canvas_el
            )
        }))

    draw_rounds(rounds_with_drawing_data, state, ctx, options)
}