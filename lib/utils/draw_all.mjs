import { draw_rounds } from './draw_rounds.mjs'
import { get_round_left_X, get_round_title_height } from './sizes.mjs'

export const draw_all = (all_data, state, canvas_el, options) => {
    if (!canvas_el.getContext) return
    const ctx = canvas_el.getContext('2d');

    ctx.clearRect(0, 0, canvas_el.width, canvas_el.height);

    const rounds_with_drawing_data = all_data.rounds
        .map((round_data, round_index) => {
            const total_available_height = canvas_el.height - get_round_title_height(options)
            
            const height_deficit = round_data.matches.length * options.min_height_per_match
                - total_available_height
            
            const height_per_match = height_deficit < 0
                ? total_available_height / round_data.matches.length
                : options.min_height_per_match
            
            const round_scrollY = state.scrollY * Math.max(0, height_deficit) / 1000

            return {
                ...round_data,
                matches: round_data.matches.map(
                    match_data => ({
                        ...match_data,
                        positionX: get_round_left_X(options, round_index) + state.scrollX,
                        centerY: (
                            get_round_title_height(options)
                            + height_per_match * (match_data.order - 0.5)
                            + round_scrollY
                        )
                    })
                )
            }
        })

    draw_rounds(rounds_with_drawing_data, state, ctx, options)
}