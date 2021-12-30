import { draw_rounds } from './draw_rounds.mjs'
import { get_round_left_X, get_round_title_height } from './sizes.mjs'

export const draw_all = (all_data, state, canvas_el, options) => {
    if (!canvas_el.getContext) return
    const ctx = canvas_el.getContext('2d');

    ctx.clearRect(0, 0, canvas_el.width, canvas_el.height);

    const rounds_with_drawing_data = all_data.rounds
        .map((round_data, round_index) => {
            const visible_height_for_matches = canvas_el.height - get_round_title_height(options)

            const visible_height_per_match = visible_height_for_matches / round_data.matches.length

            const height_per_match = Math.max(
                visible_height_per_match,
                options.minimal_height_per_match
            )

            const height_deficit = Math.max(
                0,
                round_data.matches.length * height_per_match - visible_height_for_matches
            )
            
            const round_scrollY = state.scrollY * height_deficit / 1000

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