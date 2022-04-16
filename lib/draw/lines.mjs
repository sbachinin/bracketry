import { maybe_draw_lines_for_match } from './lines_for_match.mjs'
import { draw_highlighted_line } from './highlighted_line.mjs'

export const draw_lines = (
    all_data,
    state,
    root_elements,
    options
) => {
    const ctx = root_elements.main_canvas_el.getContext('2d')
    ctx.clearRect(0, 0, root_elements.main_canvas_el.width, root_elements.main_canvas_el.height)
    ctx.lineJoin = 'round'

    all_data.rounds.forEach((round) => {
        round.matches.forEach(
            (match) => {
                maybe_draw_lines_for_match({
                    all_data,
                    match_id: match.id,
                    state,
                    options,
                    root_elements
                })
            }
        )
    })

    if (typeof state.highlighted_team_id === 'string') {
        draw_highlighted_line({
            all_data,
            state,
            options,
            root_elements
        })
    }
}