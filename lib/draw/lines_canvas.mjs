import { draw_normal_lines } from './normal_lines.mjs'
import { maybe_draw_highlighted_line } from './highlighted_line.mjs'

export const refresh_canvas = (
    all_data,
    state,
    options,
    stable_elements
) => {
    stable_elements.lines_canvas.width = stable_elements.lines_canvas.clientWidth
    stable_elements.lines_canvas.height = stable_elements.lines_canvas.clientHeight
    redraw_canvas(
        all_data,
        state,
        options,
        stable_elements
    )
}

export const redraw_canvas = (
    all_data,
    state,
    options,
    stable_elements
) => {
    draw_normal_lines(stable_elements, options)
    maybe_draw_highlighted_line(
        all_data,
        state,
        options,
        stable_elements
    )
}