import { draw_normal_lines } from './normal_lines.mjs'
import { maybe_draw_highlighted_line } from './highlighted_line.mjs'

export const refresh_canvas = (
    all_data,
    state,
    options,
    stable_elements,
    canvas_content_rect,
) => {
    stable_elements.lines_canvas.width = canvas_content_rect.width
    stable_elements.lines_canvas.height = canvas_content_rect.height
    draw_normal_lines(
        all_data.rounds.length,
        stable_elements,
        options
    )
    maybe_draw_highlighted_line(
        all_data,
        state,
        options,
        stable_elements
    )
}